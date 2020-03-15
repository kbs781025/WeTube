import routes from "../routes"
import videoModel from "../models/Video"

export const home = async (req, res) => {
    try{
        const videos = await videoModel.find({});
        res.render("home", {pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
};

export const search = async (req, res) => {
    const keyWord = req.query.term;
    let videos = [];
    try {
        //(await videoModel.find({title: keyWord})).forEach(function(video) {videos.push(video)} );
        videos = await videoModel.find({title: {$regex: keyWord, $options: 'i'}});
    } catch(error) {
        console.log(error);
    }
    res.render("search", {keyWord, videos, pageTitle: "Search"});
};

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});

export const postUpload = async (req, res) => {
    try {
        const newVideo = await videoModel.create({
            fileUrl: req.file.path, 
            title: req.body.title, 
            description: req.body.description,
        });
        res.redirect(routes.videoDetail(newVideo._id));
    } catch(error) {
        console.log(error);
        res.render("upload", {pageTitle: "Upload"});
    }
};

export const videoDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await videoModel.findById(id);
        res.render("videoDetail", {pageTitle: video.title, video});
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    try{
        const video = await videoModel.findById(req.params.id);
        res.render("editVideo", {pageTitle: `Edit Video Title: ${video.title}`, id: req.params.id, video});
    } catch(error) {    
        console.log(error);
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const id = req.params.id;
    try {
        await videoModel.findOneAndUpdate(id, {title: req.body.title, description: req.body.description});
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        console.log(error);
        res.redirect(routes.videoDetail(id))
    }
};

export const deleteVideo = async (req, res) => {
    const id = req.params.id;
    try {
        await videoModel.findOneAndDelete(id);
    } catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
};