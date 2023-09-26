import { Router } from "express";
import signRouter from "./sign.routes.js";
import urlsRouter from "./urls.routes.js";
import urlsAuthRouter from "./urlsAuth.routes.js";

const router = Router();

router.use(signRouter);
router.use(urlsRouter);
router.use(urlsAuthRouter)

export default router;