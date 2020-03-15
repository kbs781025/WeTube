//const express = require('express
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouters";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleWare } from "./middleWares";

const app = express();

app.set("view engine", "pug");
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true} ));

app.use(localMiddleWare);

app.use("/uploads", express.static("uploads"));

app.use(routes.home, globalRouter);
// app.use(routes.join, globalRouter);
// app.use(routes.login, globalRouter);
// app.use(routes.logout, globalRouter);
// app.use(routes.search, globalRouter);

app.use(routes.users, userRouter);
// app.use(routes.userDetail, userRouter);
// app.use(routes.editProfile, userRouter);
// app.use(routes.changePassword, userRouter);

app.use(routes.videos, videoRouter);
// app.use(routes.upload, videoRouter);
// app.use(routes.videoDetail, videoRouter);
// app.use(routes.editVideo, videoRouter);
//app.use(routes.deleteVideo, videoRouter);

export default app;
