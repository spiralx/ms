
function loadImageData(callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'images.json', true);
  xmlhttp.onreadystatechange = function(ev) {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(JSON.parse(xmlhttp.responseText));
    }
  }
  xmlhttp.send();
}


function setImage(src, title) {
  var largeImg = document.getElementById('largeImg');

  largeImg.setAttribute('src', src);
  largeImg.setAttribute('alt', title);
}


document.addEventListener('DOMContentLoaded', function(ev) {
  var largeImg = document.getElementById('largeImg'),
    thumbs = document.querySelector('.thumbs');

  thumbs.addEventListener('click', function(ev) {
    var link, src, title;

    if (ev.target.tagName === "IMG") {
      link = ev.target.parentNode;

      src = link.getAttribute('href');
      title = link.getAttribute('title');

      setImage(src, title);

      ev.preventDefault();
      ev.stopPropagation();
    }
  }, false);

  loadImageData(function(data) {
    data.forEach(function(img, i) {
      var el = document.createElement('a');
      el.setAttribute('href', img.filename);
      el.setAttribute('title', img.title);

      var imgel = document.createElement('img');
      imgel.setAttribute('src', img.thumbnail);

      el.appendChild(imgel);
      thumbs.appendChild(el);

      if (i === 0) {
        setImage(img.filename, img.title);
      }
    });
  });

}, false);


