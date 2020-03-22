const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");

function onPlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
    } else {
        videoPlayer.pause();
        playButton.innerHTML = `<i class="fas fa-pause"></i>`;
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

function init() {
    playButton.addEventListener("click", onPlayClick);
    volumeButton.addEventListener("click", onVolumeClick);
}

if (videoContainer) {
    init();
}
