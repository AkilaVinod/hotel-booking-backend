import express from 'express'
import { loginUser, postUsers } from '../controllers/userControllers.js'

const userRouter = express.Router()

//userRouter.get("/",getUsers)

userRouter.post("/",postUsers)
userRouter.post("/login",loginUser)

//userRouter.delete("/",deleteUsers)

//userRouter.put("/",putUsers)

export default userRouter