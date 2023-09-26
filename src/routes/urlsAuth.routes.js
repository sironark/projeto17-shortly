import { Router } from "express";
import {validateAuth} from "../middlewares/validateAuth.js"
import { deleteUrlsById, getUserFull, postUrls } from "../controllers/urlsAuth.controller.js";

const urlsAuthRouter = Router();

urlsAuthRouter.post("/urls/shorten",validateAuth, postUrls);
urlsAuthRouter.delete("/urls/:id", validateAuth, deleteUrlsById);
urlsAuthRouter.get("/users/me", validateAuth, getUserFull);

export default urlsAuthRouter;