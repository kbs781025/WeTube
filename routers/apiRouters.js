import express from "express";
import routes from "../routes";
import { hitView, addComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.apiView, hitView);
apiRouter.post(routes.addComment, addComment);

export default apiRouter;
