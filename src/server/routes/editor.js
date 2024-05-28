import express from 'express'
import { enforceAuth } from '../middleware/verifyAuth.js'
import verifyRoles from '../middleware/verifyRoles.js'
import { getReportedPosts } from '../controllers/posts.js'
import ROLES_LIST from '../config/roles_list.js'

const router = express.Router()

router.use(enforceAuth, verifyRoles(ROLES_LIST.Editor))
router.use(() => console.log('passed test'))

router.get('/reported-posts', getReportedPosts)

export default router
