import { Post, ReportedPost, User } from '../db/model/index.js'
import sharp from 'sharp'
import AppError, { ERR_VARIANT } from '../utils/AppError.js'
import { runInTransaction } from '../db/utils/runInTransaction.js'
import mongoose from 'mongoose'
import { deleteImage, getImageUrl, putImage } from '../utils/S3.js'
import { getForYouPostsQuery, getPostsQuery, getSavedPostsQuery } from '../db/queries/posts.js'
import { convertToUpperCase } from '../db/utils/lib.js'
import { addHours, isAfter } from 'date-fns'

const ObjectId = mongoose.Types.ObjectId

export const createPost = async (req, res) => {
  const file = req.file
  const {
    category,
    startDate,
    startTime,
    endTime,
    endDate,
    isAllDay,
    isEndDate,
    location,
    isRemoteHelp,
    title,
    description
  } = req.body

  // only if file uploaded
  let fileName = ''
  if (file) {
    // transform image
    file.buffer = await sharp(file.buffer).resize({ height: null, width: 600, fit: 'inside' }).toBuffer()

    // upload image to S3
    fileName = await putImage(file)
  }

  const newPost = {
    user: req.user._id,
    category,
    title,
    helpDate: {
      startDate,
      startTime,
      endTime,
      endDate,
      isAllDay,
      isEndDate
    },
    imgName: fileName,
    description,
    isRemoteHelp,
    ...(location?.lat &&
      location?.long &&
      !isRemoteHelp && {
        location: {
          geometry: {
            type: 'Point',
            coordinates: [+location.lat, +location.long]
          },
          country: location.country,
          city: location.city,
          address: location.address
        }
      })
  }
  console.log(newPost)

  await Post.create(newPost)

  res.status(201).send('Post Created Successfuly')
}

export const updatePost = async (req, res) => {
  const file = req.file
  const {
    postId,
    category,
    startDate,
    startTime,
    endTime,
    endDate,
    isAllDay,
    isEndDate,
    location,
    isRemoteHelp,
    title,
    description
  } = req.body
  console.log(postId)
  //update image if requested to update
  let imgName, imgUrl
  if (file) {
    file.buffer = await sharp(file.buffer).resize({ height: null, width: 600, fit: 'inside' }).toBuffer()

    imgName = await putImage(file)
    imgUrl = await getImageUrl(imgName)
  }

  const post = {
    user: req.user._id,
    category,
    title,
    helpDate: {
      startDate,
      startTime,
      endTime,
      endDate,
      isAllDay,
      isEndDate
    },
    ...(imgName && { imgName }),
    description,
    isRemoteHelp,
    ...(location?.lat &&
      location?.long &&
      !isRemoteHelp && {
        location: {
          geometry: {
            type: 'Point',
            coordinates: [+location.lat, +location.long]
          },
          country: location.country,
          city: location.city,
          address: location.address
        }
      })
  }
  console.log(postId, post)

  const updatedPost = await Post.updateOne({ _id: postId }, post, { new: true })

  if (imgUrl) updatedPost.imgUrl = imgUrl

  res.status(201).json(updatedPost)
}

export const getPosts = async (req, res) => {
  const { filters, cursor = 1 } = req.query || {}
  const DOC_LIMIT = 4
  if (filters) filters.category = filters?.category ? convertToUpperCase(filters?.category) : '' //convert the category to key

  //get all posts from DB
  const selfUserId_OI = req.user?._id ? new ObjectId(req.user._id) : null

  let posts = []
  const options = { page: cursor, limit: DOC_LIMIT }
  if (selfUserId_OI && filters.onlyPeopleIFollow) {
    // posts "for you"
    posts = await getForYouPostsQuery(selfUserId_OI, options)
  } else if (selfUserId_OI && filters.onlySavedPosts) {
    // saved posts
    posts = await getSavedPostsQuery(selfUserId_OI, options)
  } else {
    // explore/ discover
    posts = await getPostsQuery(selfUserId_OI, filters, options)
  }
  console.log(posts)
  // console.log('posts', posts)
  // get post image from S3 bucket
  if (posts?.docs) {
    for (const post of posts.docs) {
      // For each post, generate a signed URL and save it to the post object
      const imgNamePost = post.imgName
      const urlPost = imgNamePost ? await getImageUrl(imgNamePost) : ''
      post.imgUrl = urlPost

      // get profile image of the user
      const imgNameProfile = post.user.imgName
      const urlProfile = imgNameProfile ? await getImageUrl(imgNameProfile) : ''
      post.user.imgUrl = urlProfile
    }
  }

  res.status(200).json(posts)
}

export const deletePost = async (req, res) => {
  const { postId } = req.query || {}
  console.log(postId)
  const post = await Post.findOne({ _id: postId }).exec()
  if (!post) throw new AppError('Post not found', 404)

  // delete post image from S3 bucket
  const imgName = post.imgName
  if (imgName) await deleteImage(imgName)

  // delete post from DB
  const userId_OI = new ObjectId(post.user._id)

  await User.updateOne(
    { _id: userId_OI },
    {
      $pull: {
        savedPosts: userId_OI,
        interestedPosts: userId_OI,
        reportedPosts: userId_OI
      }
    }
  )
  await Post.deleteOne({ _id: postId })

  res.sendStatus(201)
}

export const postAction = async (req, res) => {
  const { postId, actions } = req.body || {}
  console.log('postId: ', postId)
  console.log('actions: ', actions)

  let filter, updateQuery
  if (actions.hasOwnProperty('isSavedByUser')) {
    await runInTransaction(async session => {
      // update 'User' collection
      filter = { _id: req.user._id }
      updateQuery = actions.isSavedByUser ? { $addToSet: { savedPosts: postId } } : { $pull: { savedPosts: postId } }
      await User.updateOne(filter, updateQuery, { session })

      // update 'Post' collection
      filter = { _id: postId }
      updateQuery = actions.isSavedByUser
        ? { $addToSet: { usersSaved: req.user._id } }
        : { $pull: { usersSaved: req.user._id } }
      await Post.updateOne(filter, updateQuery, { session })
    })
  }

  if (actions.hasOwnProperty('isUserInterested')) {
    await runInTransaction(async session => {
      // update 'User' collection
      filter = { _id: req.user._id }
      updateQuery = actions.isUserInterested
        ? { $addToSet: { interestedPosts: postId } }
        : { $pull: { interestedPosts: postId } }
      await User.updateOne(filter, updateQuery, { session })

      // update 'Post' collection
      filter = { _id: postId }
      updateQuery = actions.isUserInterested
        ? { $addToSet: { usersInterested: req.user._id } }
        : { $pull: { usersInterested: req.user._id } }
      await Post.updateOne(filter, updateQuery, { session })
    })
  }

  if (actions.hasOwnProperty('isUserReported')) {
    const errorKey = actions.report.key || 'OTHER'
    const userId = new mongoose.Types.ObjectId(req.user._id)

    await runInTransaction(async session => {
      // update 'User' collection
      filter = { _id: req.user._id }
      updateQuery = {
        $addToSet: { reportedPosts: postId }
      }
      await User.updateOne(filter, updateQuery, { session })

      // update 'Post' collection
      filter = { _id: postId }
      updateQuery = {
        $addToSet: { usersReported: req.user._id }
      }
      await Post.updateOne(filter, updateQuery, { session })

      // update 'ReportedPost' collection
      // First, check if the document exists
      const existingDocument = await ReportedPost.findOne({ post: postId }, null, { session })
      const reportObj = { user: req.user._id, reasonKey: errorKey, description: actions.report.description || '' }

      // BEHAVIOR: if a user has already reported a post, his old report will remain and the new one will NOT be inserted
      if (existingDocument) {
        // If the document exists, update it
        filter = { post: postId, 'reports.user': { $ne: req.user._id } }
        updateQuery = { $addToSet: { reports: reportObj } }
        await ReportedPost.updateOne(filter, updateQuery, { session })
      } else {
        // If the document doesn't exist, create a new one
        const newReportObj = { post: postId, reports: [reportObj] }
        await ReportedPost.create([newReportObj], { session })
      }
    })
  }

  res.sendStatus(201)
}

export const bumpPost = async (req, res) => {
  const BUMP_TIME_HOURS = 24

  const { postId } = req.body || {}
  if (!postId) throw new AppError('post id is required', 400)

  const post = await Post.findOne({ _id: postId })
  if (!post) throw new AppError('post not found', 400)

  const now = new Date()

  if (post.bumpDate) {
    const bumpDateThreshold = addHours(post.bumpDate, BUMP_TIME_HOURS)
    if (isAfter(now, bumpDateThreshold)) {
      // Modify the bumpDate to the current date
      post.bumpDate = now
    } else {
      throw new AppError(`Post can't be bumped before ${bumpDateThreshold}`, 400, ERR_VARIANT.warning)
    }
  } else {
    post.bumpDate = now
  }

  const savedDocument = await post.save()

  res.sendStatus(201)
}
