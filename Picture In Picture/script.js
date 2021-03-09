// declaring dom variables

const videoEl = document.getElementById("video");
const button = document.getElementById("button");

// our async function to prompt user for mediaStream
const selectMediaStream = async function () {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoEl.srcObject = mediaStream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (error) {
    console.log("Error!", error);
  }
};

button.addEventListener("click", async function () {
  // disabling button
  button.disabled = true;
  // requesting picture in picture
  await videoEl.requestPictureInPicture();
  //   re enabling button
  button.disabled = false;
});

// onload
selectMediaStream();
