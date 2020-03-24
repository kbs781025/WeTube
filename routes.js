// Global
const HOME = "/";
const JOIN = "/join";
const LOGINS = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const ME = "/me";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Social auth
const GITHUB_AUTH = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";
const GOOGLE_AUTH = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// API
const API = "/api";
const API_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete-comment";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGINS,
    logout: LOGOUT,
    search: SEARCH,
    me: ME,
    users: USERS,
    userDetail: id => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: id => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    githubAuth: GITHUB_AUTH,
    githubCallBack: GITHUB_CALLBACK,
    googleAuth: GOOGLE_AUTH,
    googleCallBack: GOOGLE_CALLBACK,
    api: API,
    apiView: API_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT
};

export default routes;
