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
            console.log(new User({ userName: name, email }));
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
    //user.isAuthenticated = false;
    res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetails = (req, res) =>
    res.render("userDetails", { pageTitle: "User Details" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });
