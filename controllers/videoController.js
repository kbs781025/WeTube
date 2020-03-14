import {videos} from "../db";

export const home = (req, res) => {
    res.render("home", {pageTitle: "Home", videos});
};
export const search = (req, res) => res.render("search", {pageTitle: "Search", searchKeyword: req.query.term, videos});;
export const upLoad = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "VideoDetail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "EditVideo"});