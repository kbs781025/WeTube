import express from "express";
import routes from "../routes";
import { upLoad, videoDetail, editVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, upLoad);
videoRouter.get(`${routes.videoDetail}:id`, videoDetail);
videoRouter.get(`${routes.editVideo}:id`, editVideo);

export default videoRouter;