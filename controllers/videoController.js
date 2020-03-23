import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = async (req, res) => {
    const keyWord = req.query.term;
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: keyWord, $options: "i" }
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { keyWord, videos, pageTitle: "Search" });
};

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
    try {
        const newVideo = await Video.create({
            fileUrl: req.file.path,
            title: req.body.title,
            description: req.body.description,
            creator: req.user._id
        });
        req.user.videos.push(newVideo._id);
        req.user.save();
        res.redirect(routes.videoDetail(newVideo._id));
    } catch (error) {
        console.log(error);
        res.render("upload", { pageTitle: "Upload" });
    }
};

export const videoDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await Video.findById(id).populate("creator");
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (video.creator !== req.user.id) {
            throw Error();
        }
        res.render("editVideo", {
            pageTitle: `Edit Video Title: ${video.title}`,
            id: req.params.id,
            video
        });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const id = req.params.id;
    try {
        await Video.findOneAndUpdate(id, {
            title: req.body.title,
            description: req.body.description
        });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.videoDetail(id));
    }
};

export const deleteVideo = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await Video.findById(req.params.id);
        if (video.creator !== req.user.id) {
            throw Error();
        }
        await Video.findOneAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

export const hitView = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        ++video.views;
        video.save();
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};
