import express from "express";
import routes from "../routes";
import {
    userDetails,
    editProfile,
    getChangePassword,
    postChangePassword,
    postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatr } from "../middleWares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatr, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetails);

export default userRouter;
