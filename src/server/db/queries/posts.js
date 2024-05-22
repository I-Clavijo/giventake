import mongoose from 'mongoose'
import { Friends, Post, User } from '../model/index.js'
const ObjectId = mongoose.Types.ObjectId

export const getSavedPostsQuery = async (auth_userId, populate) => {
  const userIdObjectId = auth_userId ? new ObjectId(auth_userId) : null

  return await User.aggregate([
    {
      $match: {
        _id: userIdObjectId
      }
    },
    {
      $lookup: {
        from: Post.collection.name,
        as: 'posts',
        localField: 'savedPosts',
        foreignField: '_id'
      }
    },
    {
      $unwind: '$posts'
    },
    {
      $replaceRoot: {
        newRoot: '$posts'
      }
    },
    ...populate
  ])
}

export const getAllPostsQuery = async (auth_userId, filters) => {
  const userIdObjectId = auth_userId ? new ObjectId(auth_userId) : null

  const populate = [
    {
      $lookup: {
        from: User.collection.name,
        localField: 'user',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: { _id: 1, firstName: 1, lastName: 1, imgName: 1 } }]
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        user: 1,
        category: 1,
        city: 1,
        address: 1,
        helpDate: 1,
        imgName: 1,
        title: 1,
        description: 1,
        usersSaved: 1,
        createdAt: 1,
        updatedAt: 1,
        usersInterested: 1,
        usersReported: 1,
        ...(userIdObjectId && {
          isSavedByUser: { $in: [userIdObjectId, '$usersSaved'] },
          isUserInterested: { $in: [userIdObjectId, '$usersInterested'] },
          isUserReported: { $in: [userIdObjectId, '$usersReported'] }
        }),
        bumpDate: 1
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'usersSaved',
        foreignField: '_id',
        as: 'usersSaved',
        pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'usersInterested',
        foreignField: '_id',
        as: 'usersInterested',
        pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'usersReported',
        foreignField: '_id',
        as: 'usersReported',
        pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
      }
    },
    {
      $addFields: {
        isSelf: { $eq: ['$user._id', new ObjectId(auth_userId)] }
      }
    },
    {
      $sort: { createdAt: -1 } // Sort by createdAt field in descending order (newest first)
    }
  ]

  const sortByBumpDateFirst = [
    {
      $addFields: {
        sortField: { $ifNull: ['$bumpDate', '$createdAt'] }
      }
    },
    {
      $sort: {
        sortField: -1 // Sort by the conditional sortField in descending order
      }
    },
    {
      $project: {
        sortField: 0 // Optionally remove sortDate from the output
      }
    }
  ]

  if (userIdObjectId && filters?.onlyPeopleIFollow) {
    //  get ONLY posts from people that the auth user is following
    return await Friends.aggregate([
      {
        $match: {
          user: userIdObjectId
        }
      },
      {
        $group: {
          _id: '$user',
          following: {
            $addToSet: '$toUser'
          }
        }
      },
      {
        $lookup: {
          from: Post.collection.name,
          as: 'posts',
          localField: 'following',
          foreignField: 'user'
        }
      },
      {
        $unwind: '$posts'
      },
      {
        $replaceRoot: {
          newRoot: '$posts'
        }
      },
      ...populate,
      ...sortByBumpDateFirst
    ])
  } else if (userIdObjectId && filters?.onlySavedPosts) {
    return await getSavedPostsQuery(auth_userId, populate)
  }

  return await Post.aggregate([
    ...(filters?.userId
      ? [
          {
            // get ONLY posts that the user with userId created.
            $match: { user: new ObjectId(filters.userId) }
          }
        ]
      : []),
    ...(filters?.category
      ? [
          {
            // get ONLY posts from a specific category only if asked
            $match: { category: filters.category }
          }
        ]
      : []),
    ...(filters?.location && +filters?.radius > 0
      ? [
          {
            $match: {
              $or: [
                { remoteHelp: true }, // Include documents without location
                {
                  'location.geometry': {
                    $geoWithin: {
                      $centerSphere: [
                        [+filters.location.lat || 0, +filters.location.long || 0],
                        +filters?.radius / 6371
                      ]
                    }
                  }
                } // Perform geospatial query only if location exists
              ]
            }
          }
        ]
      : []),
    ...populate,
    ...sortByBumpDateFirst
  ])
}
