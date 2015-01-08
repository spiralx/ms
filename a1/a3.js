
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


function Gallery(data) {
  this.imageData = data;

  this.index = 0;
  this.largeImg = document.getElementById('largeImg');

  this.updateImage();
}

Gallery.prototype = {
  prev: function() {
    this.index = (this.index || this.imageData.length) - 1;
    this.updateImage();
  },

  next: function() {
    this.index++;
    if (this.index === this.imageData.length) {
      this.index = 0;
    }
    this.updateImage();
  },

  setIndex: function(idx) {
    if (idx < 0) {
      idx = 0;
    }
    else if (idx >= this.imageData.length) {
      idx = this.imageData.length - 1;
    }

    this.index = idx;
    this.updateImage();
  },

  updateImage: function() {
    var data = this.imageData[this.index];

    this.largeImg.setAttribute('src', data.filename);
    this.largeImg.setAttribute('alt', data.title);
  }
};


document.addEventListener('DOMContentLoaded', function(ev) {
  var gallery;

  loadImageData(function(data) {
    var thumbs = document.querySelector('.thumbs');

    data.forEach(function(img, i) {
      var el = document.createElement('a');
      el.setAttribute('href', '#' + (i + 1));
      el.setAttribute('title', img.title);

      var imgel = document.createElement('img');
      imgel.setAttribute('src', img.thumbnail);

      el.appendChild(imgel);
      thumbs.appendChild(el);
    });

    thumbs.addEventListener('click', function(ev) {
      var link, idx;

      if (ev.target.tagName === "IMG") {
        link = ev.target.parentNode;
        idx = parseInt(link.getAttribute('href').substr(1)) - 1;

        gallery.setIndex(idx);

        ev.preventDefault();
        ev.stopPropagation();
      }
    }, false);

    document.querySelector('.gallery-image-nav-prev').addEventListener('click', function(ev) {
      gallery.prev();
      ev.preventDefault();
    });
    document.querySelector('.gallery-image-nav-next').addEventListener('click', function(ev) {
      gallery.next();
      ev.preventDefault();
    });

    gallery = new Gallery(data);
  });

}, false);
