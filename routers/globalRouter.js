import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleWares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.post(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
