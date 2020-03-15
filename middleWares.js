import routes from "./routes";
import multer from "multer"

const multerVideo = multer({dest: "uploads/videos/"});

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 3
    }
    next();
}

export const uploadVideo = multerVideo.single("videoFile");