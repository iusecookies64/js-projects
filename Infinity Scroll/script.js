// to get custom loader animations visit loading.io
// we can get these in different formats like svg.

// ============================================================

// We will use unsplash api to get our images.

// Unsplash Credentials.
// access key - 2NgMaQnEeFupp53vPbyk7P5WEe_UpiOCSMrQ0RDjmRg
// secret key - KpLf6JH7Vl29HvfvwT5Vn1NnosqgD24r1kbQvqdu-4E

// credentials 2
// access key - uJKjMct0blMg-sTWBsVGnsvjYwHXhD-BfVwLZPxR4CY
// secret key - RU_GY42xm2H4p8cgo71qZwGHvMRENgKMi0HzLm5OR20

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imagesList;

// ready will be used to avoid multiple req on scroll
let ready, initiated;

let count = 5; // initializing to 5 then change to 30 after first load
const key = "uJKjMct0blMg-sTWBsVGnsvjYwHXhD-BfVwLZPxR4CY";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`; // let because count value will change later so along with it apiUrl must change
let x = 1;
// defining all functions

// set attribute function
const setAttributes = function (element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// images loaded function

function createImageEls(imagesList) {
  imagesList.forEach((img) => {
    const linkEl = document.createElement("a");
    setAttributes(linkEl, {
      href: img.links.html,
      target: "_blank",
    });
    const imgEl = document.createElement("img");
    setAttributes(imgEl, {
      src: img.urls.regular,
      alt: img.alt_description,
      title: img.alt_description,
    });
    linkEl.appendChild(imgEl);
    imageContainer.appendChild(linkEl);
  });
  // loading complete so setting ready to true so that next load req on scroll can be made
  ready = true;
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    imagesList = await response.json();
    createImageEls(imagesList);
    if (!initiated) {
      count = 30;
      apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;
      initiated = true;
      loader.hidden = true;
    }
  } catch (err) {
    console.log(err);
  }
}
setTimeout(getPhotos, 1000);

let checkScrollAndLoad = function () {
  // loading if 1000px above from bottom
  if (
    window.innerHeight + window.scrollY >= document.body.clientHeight - 1000 &&
    ready
  ) {
    getPhotos();
    // setting ready to false so that next req will only be made if previous images are done loading
    ready = false;
  }
};

window.addEventListener("scroll", checkScrollAndLoad);
