import express from "express"
import { getUserData, SignIn, SignUp } from "../controllers/user.controllers.js";
import { check } from "../middleware/checkAuth.js";

export  const userRouter=express.Router();

userRouter.post('/signUp',SignUp)
userRouter.post("/signIn",SignIn)
userRouter.get('/get',check,getUserData)