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
import session from "express-session";
import passport from "passport";
import { localMiddleWare } from "./middleWares";

import "./passport";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "pug");
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleWare);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
