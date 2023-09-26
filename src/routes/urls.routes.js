
import { Router } from "express";
import { getRanking, getShortUrls, getUrlsById } from "../controllers/urls.controller.js";


const urlsRouter = Router();


urlsRouter.get("/urls/:id", getUrlsById);
urlsRouter.get("/urls/open/:shortUrl", getShortUrls);
urlsRouter.get("/ranking", getRanking);


export default urlsRouter;