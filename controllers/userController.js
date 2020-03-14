import routes from "../routes"

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = (req, res) => 
{
    const {
        body: {name, email, password1, password2}
    } = req;

    if(password1 !== password2) {
        res.status(400);
        res.render("join", {pageTitle: "join"});
    } else {
        res.redirect(routes.home);
    }
};
export const login = (req, res) => res.render("login", {pageTitle: "Login", userName: req.body.name});
export const logout = (req, res) => res.render("logout", {pageTitle: "Log out"});
export const users = (req, res) => res.render("users", {pageTitle: "Users"});
export const userDetails = (req, res) => res.render("userDetails", {pageTitle: "User Details"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});