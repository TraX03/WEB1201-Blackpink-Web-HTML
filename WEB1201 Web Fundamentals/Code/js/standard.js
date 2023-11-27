window.onscroll = function () {scrollFunction()};

let topButton = document.getElementById("scrollTop");

// When the user scrolls down 100px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//responsive navbar
var isItResponsive = false;

function navFunction() {
  var x = document.getElementById("topNavR");

  if (x.className === "topNav") {
    x.className += " responsive";
    isItResponsive = true;
  } 
  else {
    x.className = "topNav";
    isItResponsive = false;
  }
}

//change menu bar colour
//since get more than one element, have to use for loop to make it work
var hoverBars = document.getElementsByClassName("barImg");

for (let i = 0; i < hoverBars.length; i++) {
  var hoverBar = hoverBars[i];

  if (!hoverBar.classList.contains("active")) {
    hoverBar.addEventListener("mouseover", function() {
      if (i === 0 && !isItResponsive) {
        return; // Skip hover effect if it's the first element and isItResponsive is true
      }
      document.getElementById("barColor").src = "images/menuBarBlack.png";}
    );

    hoverBar.addEventListener("mouseout", function() {
      document.getElementById("barColor").src = "images/menuBar.png";}
    );
  }
}
