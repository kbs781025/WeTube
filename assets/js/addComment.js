import axios from "axios";
const commentForm = document.getElementById("jsCommentForm");

async function handleSubmit(event) {
    event.preventDefault();
    const commentInput = commentForm.querySelector("input");
    const comment = commentInput.value;
    commentInput.value = "";

    const videoId = window.location.href.split("videos")[1];
    await axios({
        url: `/api${videoId}/comment`,
        method: "POST",
        data: { comment }
    });
}

function init() {
    commentForm.addEventListener("submit", handleSubmit);
}

if (commentForm) {
    init();
}
