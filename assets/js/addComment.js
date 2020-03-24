import axios from "axios";
const commentForm = document.getElementById("jsCommentForm");
const commentsList = document.getElementById("jsCommentsList");
const commentsNumber = document.getElementById("jsCommentsNumber");

function addComment(comment) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    list.appendChild(span);
    commentsList.appendChild(list);

    commentsNumber.innerHTML = parseInt(commentsNumber.innerHTML) + 1;
}

async function handleSubmit(event) {
    event.preventDefault();
    const commentInput = commentForm.querySelector("input");
    const comment = commentInput.value;
    commentInput.value = "";

    const videoId = window.location.href.split("videos")[1];
    const response = await axios({
        url: `/api${videoId}/comment`,
        method: "POST",
        data: { comment }
    });

    if (response.status == 200) {
        addComment(comment);
    }
}

function init() {
    commentForm.addEventListener("submit", handleSubmit);
}

if (commentForm) {
    init();
}
