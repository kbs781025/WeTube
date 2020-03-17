import express from "express";
import routes from "../routes";
import {
    userDetails,
    editProfile,
    changePassword
} from "../controllers/userController";
import { onlyPrivate } from "../middleWares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetails);

export default userRouter;
