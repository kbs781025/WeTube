//const express = require('express
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookeParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const handleListening = () =>
    console.log("Listening on: https://localhost:4000");

const handleHome = (req, res) =>
    res.send("Hello From Server.");

const handleProfile = (req, res) => res.send("You are on my profile.");

const betweenHome = (req, res, next) => {
    console.log("I'm in the middle of.");
    next();
}

app.use(logger("dev"));
app.use(helmet());
app.use(cookeParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", handleHome);

app.get("/profile", handleProfile);

// respond with "hello world" when a GET request is made to the homepage
app.listen(4000, handleListening);
