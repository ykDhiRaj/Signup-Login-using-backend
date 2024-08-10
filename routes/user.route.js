import express from "express";
import { login, signup } from "../controllers/user.controller.js";

const router = express.Router();

export const userRouter = router.post("/signup",signup);

export const loginRouter = router.post("/login",login)