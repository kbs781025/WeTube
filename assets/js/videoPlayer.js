const videoContainer = document.getElementById("jsVideoContainer");
const videoPlayer = document.querySelector("video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreenButton");

function onPlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        videoPlayer.pause();
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
    }
}

function onVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeButton.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else {
        videoPlayer.muted = true;
        volumeButton.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }
}

function exitFullScreen() {
    fullScreenButton.removeEventListener("click", exitFullScreen);
    fullScreenButton.addEventListener("click", onFullScreenClick);
    fullScreenButton.innerHTML = `<i class="fas fa-expand"></i>`;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function onFullScreenClick() {
    videoContainer.requestFullscreen();
    fullScreenButton.removeEventListener("click", onFullScreenClick);
    fullScreenButton.addEventListener("click", exitFullScreen);
    fullScreenButton.innerHTML = `<i class="fas fa-compress"></i>`;
}

function init() {
    playButton.addEventListener("click", onPlayClick);
    volumeButton.addEventListener("click", onVolumeClick);
    fullScreenButton.addEventListener("click", onFullScreenClick);
}

if (videoContainer) {
    init();
}
