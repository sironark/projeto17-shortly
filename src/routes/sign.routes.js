import { Router } from "express";
import { postSignin, postSignup } from "../controllers/sign.controller.js";


const signRouter = Router();

signRouter.post("/signup", postSignup);
signRouter.post("/signin", postSignin);

export default signRouter;