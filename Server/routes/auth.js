import express from 'express'
import { registerUser, loginUser , getSingleUser, updateUser} from '../controllers/auth.js'
import { verifyToken } from '../middlewares/verifyToken.js'



const router = express.Router()

// post request

router.post('/register', registerUser)
router.post('/login', loginUser)

//get request
router.get('/user-profile/:username', verifyToken, getSingleUser)


//put request
router.put('/updateuser', verifyToken, updateUser)

export default router
