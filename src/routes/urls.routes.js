
import { Router } from "express";
import { getOpenShortUrls, getRanking, getUrlsById } from "../controllers/urls.controller.js";


const urlsRouter = Router();


urlsRouter.get("/urls/:id", getUrlsById);
urlsRouter.get("/urls/open/:shortUrl", getOpenShortUrls);
urlsRouter.get("/ranking", getRanking);


export default urlsRouter;