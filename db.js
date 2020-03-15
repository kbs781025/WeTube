import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("Database is connected");
const handleError = (error) => console.log(`Erron on database connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);