import express from "express";
import routes from "../routes";
import {
    userDetails,
    editProfile,
    changePassword,
    postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatr } from "../middleWares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatr, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetails);

export default userRouter;
