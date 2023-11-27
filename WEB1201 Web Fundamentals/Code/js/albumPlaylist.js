let now_playing = document.getElementById("songName");
let progress = document.getElementById("slider");
let volumeCont = document.getElementById("volume");
let volumeImg = volumeCont.querySelector("img");
let vSliderCont = volumeCont.querySelector(".vSliderCont");
let volumeSlider = document.getElementById("volumeSlider");
let volumeDisplay = document.querySelector(".vSliderCont p strong");
let player = document.getElementById("musicPlayer");
let shuffleCont = document.getElementById("shuffle");
//get img element from the element with id play 
let playImg = document.getElementById("play").querySelector("img");
//get all divs from element with tracklist class
let tracklistDivs = document.querySelectorAll(".tracklist div");
let soundwaveDivs = document.querySelectorAll(".soundwave div");

/*global control variables*/
let track_index = 0;
let isLoopEnabled = false;
let hideTimeout;
let originalVolume = volumeSlider.value;

/*tracklist array*/
let track_list = [
  {
    name: "How You Like That",
    path: "audio/BLACKPINK - 'How You Like That' MV.mp3",
    duration: "3&sdot;03"
  },
  {
    name: "Ice Cream",
    path: "audio/BLACKPINK - 'Ice Cream (with Selena Gomez)' MV.mp3",
    duration: "3&sdot;02"
  },
  {
    name: "Pretty Savage",
    path: "audio/Pretty Savage.mp3",
    duration: "3&sdot;19"
  },
  {
    name: "Lovesick Girls",
    path: "audio/BLACKPINK - 'Lovesick Girls' MV.mp3",
    duration: "3&sdot;21"
  },
  {
    name: "Love To Hate Me",
    path: "audio/Love To Hate Me.mp3",
    duration: "2&sdot;49"
  },
  {
    name: "Bet You Wanna",
    path: "audio/BLACKPINK - 'Bet You Wanna (with Cardi B)' MV.mp3",
    duration: "2&sdot;40"
  },
  {
    name: "Crazy Over You",
    path: "audio/Crazy Over You.mp3",
    duration: "2&sdot;41"
  },
  {
    name: "You Never Know",
    path: "audio/You Never Know.mp3",
    duration: "3&sdot;49"
  },
];

/*animation array*/
let animationClasses = [
  "quiet", "normal", "loud", "normal", "loud", "normal", "quiet", "normal", "quiet", "normal"
  , "loud", "normal", "quiet", "normal", "quiet", "normal", "loud", "normal", "loud", "normal"
  , "quiet", "normal", "quiet", "normal", "loud", "normal", "quiet"]

/*function start*/
/*settings*/
//data for audio player has been loaded
player.onloadedmetadata = function() {
  //set the max value of the slider
  progress.max = player.duration;
  //set the value of the slider according to current play time
  progress.value = player.currentTime;
}

//allow user to input, oninput make changes smoother than onchange
progress.oninput = function() {
  //straight play when change
  player.play();
  player.currentTime = progress.value;
  if (playImg.src.includes("play.png")) {
    playImg.src = "images/pause.png";
    //run the soundwave animation
    soundwaveDivs.forEach(div => {
      div.style.animationPlayState = "initial";
    });
  }
}

// Add event listener for timeupdate event
player.addEventListener("timeupdate", () => {
  let durationSpan = document.getElementById("duration");
  //straight modify the context of the span with above ID  
  durationSpan.textContent = formatTime(player.currentTime) + " / " + formatTime(player.duration);
});

//the time return by DOM duration and currentTime property is in seconds
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

/*event listeners*/
//for shuffle 
shuffleCont.addEventListener('mousedown', chgShuffle);
shuffleCont.addEventListener('mouseup', resetShuffle);

//for volume
volumeCont.addEventListener('mouseenter', showSlider);
volumeCont.addEventListener('mouseleave', hideSlider);

//toggle mute
volumeImg.addEventListener('click', function() {
  if (volumeSlider.value == 0) {
    //set the volume slider value back to the original volume
    volumeSlider.value = originalVolume;
  } else {
    //update the original volume
    originalVolume = volumeSlider.value;
    volumeSlider.value = 0;
  }
  //trigger the input event manually to update the volume and image
  volumeSlider.dispatchEvent(new Event('input'));
});

//set the default volume of the audio player
player.volume = 20 / 100;
volumeDisplay.textContent = 20;
//allow volume changes
volumeSlider.addEventListener('input', function() {
  //get the value of the volume slider (between 0 and 100)
  let volume = parseInt(this.value) / 100;
  //set the volume of the audio player
  player.volume = volume;
  //update the volume display
  volumeDisplay.textContent = Math.floor(volume * 100);

  if (this.value == 0) {
    //set the image source to the mute image
    volumeImg.src = "images/muteActive.png";
    //remove all animation classes from the div
    soundwaveDivs.forEach(div => {
      div.classList.remove(...animationClasses);
    });
  } else {
    //set the image source to the volume image
    volumeImg.src = "images/volumeActive.png";
    //if the song is playing and slider value not 0
    if (!player.paused) {
      soundwaveDivs.forEach((div, index) => {
        //add the animation class corresponding to the array index
        div.classList.add(animationClasses[index]);
      });
    }
  }
});

//()=>{} is shorthand syntax for function(){}
//if song is playing, update the slider value
player.addEventListener('playing', () => {
  setInterval(() => {
    progress.value = player.currentTime;
  }, 100);
});

//if song eneded call nextTrack()
player.addEventListener('ended', nextTrack);

/*GUI Setting*/
//allow tracklist division clickable and changeable
//add click event listener to each tracklist div
tracklistDivs.forEach((div, index) => {
  div.addEventListener('click', () => {
    //change the current playing div style
    selectDiv(index);
    // Update the tracklist UI
    updateTracklistUI(index);
    // Load and play the selected track
    loadTrack(index);
    playPause(true);
  });
});

function selectDiv(trackIndex) {
  //get the id of the div that hold the current song
  let trackIdToMatch = "song" + (trackIndex + 1);
  //forEach method to iterate over each element in the tracklistDivs array
  //div parameter represents each individual element in the array 
  tracklistDivs.forEach(div => {
    if (div.id === trackIdToMatch) {
      div.classList.add("playing");
    }
    else {
      div.classList.remove("playing");
    }
  });
}

function updateTracklistUI(trackIndex) {
  //loop through each tracklist div
  tracklistDivs.forEach((div, index) => {
    //check if it's the current track
    if (index === trackIndex) {
      //update the current track element
      //have to use backticks ````
      //Backticks are used for template literals, which allow you to use variables within a string using ${} syntax.
      div.innerHTML = `<img  src="images/playIcon.png" title="Now playing" alt="Play Symbol" width="3%">
                        <p>${track_list[index].name}</p><p>${track_list[index].duration}</p>`;
    } else {
      //update other track elements
      div.innerHTML = `<p>${index + 1}</p><p>${track_list[index].name}</p><p>${track_list[index].duration}</p>`;
    }
  });
}

//for volume*/
function showSlider() {
  clearTimeout(hideTimeout);
  vSliderCont.style.display = 'flex';
  volumeCont.style.opacity = 1;
  if (volumeImg.src.includes("volume.png")) {
    volumeImg.src = "images/volumeActive.png";
  }
  else if (volumeImg.src.includes("mute.png")) {
    volumeImg.src = "images/muteActive.png";
  }
}

function hideSlider() {
  //delay in milliseconds before hiding the slider
  hideTimeout = setTimeout(function() {
    vSliderCont.style.display = "none";
    volumeCont.style.opacity = 0.6;
    if (volumeImg.src.includes("volumeActive.png")) {
      volumeImg.src = "images/volume.png";
    }
    else if (volumeImg.src.includes("muteActive.png")) {
      volumeImg.src = "images/mute.png";
    }
  }, 500);
}

/*for being extra, shuffle :active*/
function chgShuffle() {
  let shuffleImg = shuffleCont.querySelector("img");
  if (shuffleImg.src.includes("shuffle.png")) {
    shuffleImg.src = "images/shuffleActive.png";
    shuffleCont.style.opacity = 1;
  }
}

function resetShuffle() {
  let shuffleImg = shuffleCont.querySelector("img");
  if (shuffleImg.src.includes("shuffleActive.png")) {
    shuffleImg.src = "images/shuffle.png";
    shuffleCont.style.opacity = 0.6;
  }
}

/*music player controls functions*/
//chg play/pause button, play/pause track
function playPause(autoplay) {
  soundwaveDivs.forEach((div, index) => {
    //check if the div has any animation classes
    let hasAnimationClass = animationClasses.some(className => div.classList.contains(className));
    //add the animation class corresponding to the array index if it doesn't have any animation class
    if (!hasAnimationClass) {
      div.classList.add(animationClasses[index]);
    }
  });
  //straight play the music when the next song is load or being shuffle
  if (autoplay) {
    if (playImg.src.includes("play.png")) {
      playImg.src = "images/pause.png";
      playImg.title = "Pause"
      //run the soundwave animation
      soundwaveDivs.forEach(div => {
        div.style.animationPlayState = "initial";
      });
    }

    player.play();
  }
  else {
    if (playImg.src.includes("play.png")) {
      playImg.src = "images/pause.png";
      playImg.title = "Pause"
      player.play();
      soundwaveDivs.forEach(div => {
        div.style.animationPlayState = "initial";
      });
    }
    else {
      playImg.src = "images/play.png";
      playImg.title = "Play"
      player.pause();
      //pause the soundwave animation
      soundwaveDivs.forEach(div => {
        div.style.animationPlayState = "paused";
      });
    }
  }
}

function nextTrack() {
  //find the index of the current song in the track_list, findIndex is an array method
  track_index = track_list.findIndex(track => track.name === now_playing.textContent);
  track_index++;
  //if the track_index exceeds the track_list length, back to beginning
  if (track_index >= track_list.length) {
    track_index = 0;
  }
  //change the current playing div style
  selectDiv(track_index);
  updateTracklistUI(track_index);
  //load the next track and play it
  loadTrack(track_index);
  playPause(true);
}

function previousTrack() {
  track_index = track_list.findIndex(track => track.name === now_playing.textContent);
  //if its alrdy the first song load the last song
  if (track_index === 0) {
    track_index = track_list.length - 1;
  }
  else {
    track_index--;
  }
  selectDiv(track_index);
  updateTracklistUI(track_index);
  loadTrack(track_index);
  playPause(true);
}

function loadTrack(trackIndex) {
  let track = track_list[trackIndex];
  //chg the text
  now_playing.textContent = track.name;
  //chg audio tag src
  player.src = track.path;
  player.load();
}

function toggleLoop() {
  //toggle the loop state
  isLoopEnabled = !isLoopEnabled;
  //set the loop attribute of the music player based on the loop state
  player.loop = isLoopEnabled;
  //update the loop button image based on the loop state
  let loopButton = document.getElementById("loop");
  let loopImage = loopButton.querySelector("img");

  if (isLoopEnabled) {
    loopButton.style.opacity = 1;
    loopImage.src = "images/loopActive.png";
    loopImage.title = "Loop is active";
  }
  else {
    loopButton.style.opacity = 0.6;
    loopImage.src = "images/loop.png";
    loopImage.title = "Loop";
  }
}

function toggleShuffle() {
  //get the current time of the player
  const currentTime = player.currentTime;
  //make a shallow copy of the track_list array using spread operator (...)
  const shuffledList = [...track_list];
  const track_index = shuffledList.findIndex(track => track.name === now_playing.textContent);
  //swap the current track with the first track
  //[a, b] = [b, a] syntax for swapping elements in an array
  //if use assign, the original shuffledList[0] will gone
  [shuffledList[0], shuffledList[track_index]] = [shuffledList[track_index], shuffledList[0]];
  //shuffle the remaining tracks starting from index 1
  for (let i = 1; i < shuffledList.length; i++) {
    let j = Math.floor(Math.random() * shuffledList.length);
    // Generate a new random number until it is non-zero
    while (j === 0) {
      j = Math.floor(Math.random() * shuffledList.length);
    }
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
  }
  //update the track_list with the shuffled list
  track_list = shuffledList;
  loadTrack(0);
  selectDiv(0);
  updateTracklistUI(0);
  //restore the current time and play the current song
  player.currentTime = currentTime;
  playPause(true)
}



