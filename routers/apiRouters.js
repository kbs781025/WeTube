import express from "express";
import routes from "../routes";
import { hitView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.apiView, hitView);

export default apiRouter;
