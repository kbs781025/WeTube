import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password1, password2 }
    } = req;

    if (password1 !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "join" });
    } else {
        try {
            await User.register(new User({ userName: name, email }), password1);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login", userName: req.body.name });
};

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login
});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.login);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetails = (req, res) =>
    res.render("userDetails", { pageTitle: "User Details" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const githubCallBack = async (_, __, profile, cb) => {
    //const { _json: login, html_url, avatar_url, id } = profile;

    const name = profile._json.login;
    const html_url = profile._json.html_url;
    const avatar_url = profile._json.avatar_url;
    const id = profile._json.id;
    try {
        const user = await User.findOne({ email: html_url });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }

        const newUser = await User.create({
            userName: name,
            email: "abc@gmail.com",
            avataUrl: avatar_url,
            gitHubId: id
        });
        return cb(null, newUser);
    } catch (error) {
        console.log(error);
        return cb(error);
    }
};

export const githubLogin = passport.authenticate("github");

export const fromGithub = (req, res) => {
    res.redirect(routes.home);
};
