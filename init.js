import app from "./app";
import "./db";
import dotenv from "dotenv"
import "./models/Video";
import "./models/Comment"
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log("Listening");

app.listen(PORT, handleListening);