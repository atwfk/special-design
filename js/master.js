// check if there's local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // add active class on element with data-color === localstorage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}
// random background option
let backgroundOption = true;
// variable to controll the background interval
let backgroundInterval;
// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".random-backgrouns span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrouns .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrouns .no").classList.add("active");
  }
}
// toggle spin class on icon
document.querySelector(".toggle-settings .fa-cog").onclick = function () {
  // toggle spin class on self
  this.classList.toggle("fa-spin");
  // toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};
//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on list items
colorsLi.forEach((li) => {
  // click on every list item
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
//switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrouns span");
// loop on all spans
randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
// select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of images
let imagesArray = [
  "slide-1.jpg",
  "slide-2.jpg",
  "slide-3.jpg",
  "slide-4.jpg",
  "slide-5.jpg",
];
// function to randomize images
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randonNumber = Math.floor(Math.random() * imagesArray.length);

      // change background image url
      landingPage.style.backgroundImage =
        'url("images/' + imagesArray[randonNumber] + '")';
    }, 10000);
  }
}
randomizeImg();
// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOfsettTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window height
  let windowHeight = this.innerHeight;
  // window scroll top
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOfsettTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup box
    let popupBox = document.createElement("div");
    // add class to the popup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // create heading
      let imageHeading = document.createElement("h3");
      // create text for heading
      let imageText = document.createTextNode(img.alt);
      // append the text ot the heading
      imageHeading.appendChild(imageText);
      // append the heading to the popup box
      popupBox.appendChild(imageHeading);
    }
    // create the image
    let popupImage = document.createElement("img");
    // set image src
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup box to the body
    document.body.appendChild(popupBox);
    // create the close span
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("x");
    // appent text to the close button
    closeButton.appendChild(closeButtonText);
    // add class to the close button
    closeButton.className = "close-button";
    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});
// close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select all bullets
const allLinks = document.querySelectorAll(".links a");
function scrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);
// handle active state
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class on self
  event.target.classList.add("active");
}
// reset button
document.querySelector(".reset-options").onclick = () => {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  // reload window
  window.location.reload();
};
// toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
toggleButton.onclick = (e) => {
  // stop propagation
  e.stopPropagation();
  links.classList.toggle("open");
};
// click anywhere outside menu toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {
    // check if menu is open
    if (links.classList.contains("open")) {
      links.classList.toggle("open");
    }
  }
});
// stop propagation on menu
links.onclick = (e) => {
  e.stopPropagation();
};
