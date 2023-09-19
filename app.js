const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
const musics = [
  {
    id: 1,
    title: "ID 230600",
    file: "anhtoan.mp3",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/284445388_3280760092207701_7199905642055604243_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=fe8171&_nc_ohc=lwCRgjgO018AX8tfUW3&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBvGPcEdMVD7uXSw1wbr2NpjowkBxyrXZ9MJKS-brpsyw&oe=650664BD",
  },
  {
    id: 2,
    title: "ID 050307",
    file: "parzival.mp3",
    image:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/310113171_388893960126794_6311075068310824141_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=fe8171&_nc_ohc=8vC3q5v7M1IAX8yQFMB&_nc_ht=scontent.fhan15-2.fna&oh=00_AfBIudOGuBax1OPxcfzCjg5Px1hLcNDI9e139blIz6VG7A&oe=65068BFF",
  },
];
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}

displayTimer();
init(indexSong);