const videoContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");
let videoRecorder = null;
let stream = null;

function stopRecording() {
    videoRecorder.stop();
    stream.getVideoTracks()[0].stop();
    recordButton.removeEventListener("click", stopRecording);
    recordButton.addEventListener("click", getMedia);
    recordButton.innerHTML = "Start Recording";
}

function handleData(event) {
    console.log(event);
    const videoFile = event.data;
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(videoFile);
    anchor.download = "recorded.mp4";
    document.body.appendChild(anchor);
    anchor.click();
}

function startRecording() {
    if (videoRecorder === null) {
        videoRecorder = new MediaRecorder(stream);
    }
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleData);
    recordButton.addEventListener("click", stopRecording);
    recordButton.removeEventListener("click", startRecording);
    recordButton.innerHTML = "Stop Recording";
}

async function getMedia() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();

        startRecording();
    } catch (error) {
        console.log(error);
        recordButton.innerHTML = "Cannot Record.";
    } finally {
        recordButton.removeEventListener("click", getMedia);
    }
}

function init() {
    recordButton.addEventListener("click", getMedia);
}

if (videoContainer) {
    init();
}
