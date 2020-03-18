import userModel from "./models/User";
import passport from "passport";
import GitHubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth20";
import routes from "./routes";
import { githubCallBack, googleCallBack } from "./controllers/userController";

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallBack}`
        },
        githubCallBack
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `http://localhost:4000${routes.googleCallBack}`
        },
        googleCallBack
    )
);
