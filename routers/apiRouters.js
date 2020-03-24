import express from "express";
import routes from "../routes";
import {
    hitView,
    addComment,
    postDeleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.apiView, hitView);
apiRouter.post(routes.addComment, addComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
