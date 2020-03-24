import axios from "axios";
const commentForm = document.getElementById("jsCommentForm");
const commentsList = document.getElementById("jsCommentsList");
const commentsNumber = document.getElementById("jsCommentsNumber");
const deleteCommentForms = document.getElementsByClassName("jsDeleteComment");

function getVideoId() {
    return window.location.href.split("videos")[1];
}

function incrementCommentsCount() {
    commentsNumber.innerHTML = parseInt(commentsNumber.innerHTML) + 1;
}

function decrementCommentsCount() {
    commentsNumber.innerHTML = parseInt(commentsNumber.innerHTML) - 1;
}

function addComment(comment) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    list.appendChild(span);
    commentsList.appendChild(list);
    incrementCommentsCount;
}

async function handleAddSubmit(event) {
    event.preventDefault();
    const commentInput = commentForm.querySelector("input");
    const comment = commentInput.value;
    commentInput.value = "";

    const videoId = getVideoId();
    const response = await axios({
        url: `/api${videoId}/comment`,
        method: "POST",
        data: { comment }
    });

    if (response.status === 200) {
        addComment(comment);
    }
}

function initAddComment() {
    commentForm.addEventListener("submit", handleAddSubmit);
}

async function sendDeleteComment(event) {
    const videoId = getVideoId();
    const comment = event.target.closest("li").childNodes[0].innerHTML;
    console.log(comment);
    const response = await axios({
        url: `/api${videoId}/delete-comment`,
        method: "POST",
        data: { comment }
    });

    if (response.status === 200) {
        deleteComment(event.target);
    }
}

function deleteComment(deleteInput) {
    const enclosingUl = deleteInput.closest("ul");
    enclosingUl.removeChild(deleteInput.closest("li"));
    decrementCommentsCount();
}

function handleDeleteSubmit(event) {
    event.preventDefault();
    sendDeleteComment(event);
}

function initDeleteComment() {
    Array.from(deleteCommentForms).forEach(form => {
        form.addEventListener("click", handleDeleteSubmit);
    });
}

if (commentForm) {
    initAddComment();
}

if (deleteCommentForms) {
    initDeleteComment();
}
