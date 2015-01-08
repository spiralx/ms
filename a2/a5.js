
function $(id) {
  return document.getElementById(id);
}

function icon(cls) {
  return '<span class="fa fa-' + cls + '"></span>';
}

document.addEventListener('DOMContentLoaded', function(ev) {
  var video = $('video'),
    playButton = $('play'),
    muteButton = $('mute'),
    fullScreenButton = $('fullscreen'),
    seekSlider = $('seek'),
    volumeSlider = $('volume');


  playButton.addEventListener('click', function(ev) {
    if (video.paused) {
      video.play();
      playButton.innerHTML = icon('pause');
    }
    else {
      video.pause();
      playButton.innerHTML = icon('play');
    }
  }, false);


  seekSlider.addEventListener('change', function(ev) {
    video.currentTime = video.duration * seekSlider.value / 100;
  }, false);
  seekSlider.addEventListener('mousedown', function(ev) {
    video.pause();
  }, false);
  seekSlider.addEventListener('mouseup', function(ev) {
    video.play();
  }, false);

  video.addEventListener('timeupdate', function(ev) {
    seekSlider.value = 100 * video.currentTime / video.duration;
  }, false);


  muteButton.addEventListener('click', function(ev) {
    video.muted = !video.muted;
    muteButton.innerHTML = icon(video.muted ? 'volume-off' : 'volume-up');
  }, false);


  volumeSlider.addEventListener('change', function(ev) {
    video.volume = volumeSlider.value;
  }, false);


  var fullScreenFunc = video.requestFullscreen || video.mozRequestFullScreen || video.webkitRequestFullscreen;

  if (!fullScreenFunc) {
    fullScreenButton.style.display = 'none';
  }
  else {
    fullScreenFunc = fullScreenFunc.bind(video);

    fullScreenButton.addEventListener('click', function(ev) {
      fullScreenFunc();
    }, false);
  }

}, false);
