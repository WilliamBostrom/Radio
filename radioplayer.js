// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

const url = "https://api.sr.se/api/v2/channels/?format=json";
const radios = document.querySelector(".radio-display");

let channels = [];
let radioPerPage = 1;
let currentStation = 1;

function radioData() {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Något gick snett");
      return res.json();
    })
    .then(({ channels: receivedChannels }) => {
      channels = receivedChannels;
      console.log(channels);
      displayRadioInfo();
    })
    .catch(console.err);
}

const prevStn = () => {
  if (currentStation > 1) {
    currentStation--;
    displayRadioInfo();
  }
};

const nextStn = () => {
  if (currentStation < Math.ceil(channels.length / radioPerPage)) {
    currentStation++;
    displayRadioInfo();
  }
};
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", nextStn, false);

const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", prevStn, false);

function displayRadioInfo() {
  const pages = [];
  for (let i = 0; i <= Math.ceil(channels.length / radioPerPage); i++) {
    pages.push(i);
  }

  const indexLastStation = currentStation * radioPerPage;
  const indexFirstStation = indexLastStation - radioPerPage;
  const currentPlay = channels.slice(indexFirstStation, indexLastStation);
  console.log(currentPlay);

  radios.innerHTML = currentPlay
    .map(({ image, liveaudio, name, tagline }, index) => {
      const tagSplice = tagline.substring(0, 70) + "...";
      return `<div class="radio-display-top" id="radios-${index}"  data-set="${index}">
        
        <img src="${image}" alt="" />
        <div id="channels">${name}</div>
      </div>
      <div id="tagLine">
        <p>${tagSplice}</p>
        <audio id="audio-${index}" controls>
          <source src="${liveaudio.url}" type="audio/mpeg" />
        </audio>
      </div>
        `;
    })
    .join("");
}
/* 
const audioElements = document.querySelectorAll("audio");
const playButton = document.querySelector(".play");
const stopButton = document.querySelector(".stop");

playButton.addEventListener("click", playAudio);
stopButton.addEventListener("click", stopAudio);
function playAudio() {
  audioElements.forEach((audio) => {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  });
}

function stopAudio() {
  audioElements.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
 */
radioData();
