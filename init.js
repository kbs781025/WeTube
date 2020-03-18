require("dotenv").config();

import app from "./app";
import "./db";
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log("Listening");

app.listen(PORT, handleListening);
