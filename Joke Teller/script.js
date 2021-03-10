// dom elements
const audioEl = document.getElementById("audio");
const button = document.getElementById("button");

// voice rss api key = b3f130ce5d934539a3fba9429b889437

let apiUrl = `https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?type=single`;

// function declarations

// text-to-speech
function tellMe(joke) {
  VoiceRSS.speech({
    key: "b3f130ce5d934539a3fba9429b889437",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// toggle joke button
function toggleButton() {
  console.log("toggling");
  button.disabled = !button.disabled;
}

// get joke function
async function getJoke() {
  const response = await fetch(apiUrl);
  const jokeObject = await response.json();
  let jokeText;
  if (jokeObject.setup) {
    jokeText = `${jokeObject.setup}...${jokeObject.delivery}`;
  } else {
    jokeText = jokeObject.joke;
  }

  // text-to-speech
  tellMe(jokeText);
  // disabling Button
  toggleButton();
}

// events listeners
audioEl.addEventListener("ended", toggleButton); // toggling when audio finished playing
button.addEventListener("click", getJoke);

// way to enable button again
// audioEl.oncanplaythrough = function () {
//   setTimeout(function () {
//     button.disabled = false;
//   }, audioEl.duration * 1000);
// };
