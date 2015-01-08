
document.addEventListener('DOMContentLoaded', function(ev) {
  var largeImg = document.getElementById('largeImg');

  document.querySelector('.thumbs').addEventListener('click', function(ev) {
    var link, src, title;

    if (ev.target.tagName === "IMG") {
      link = ev.target.parentNode;

      src = link.getAttribute('href');
      title = link.getAttribute('title');

      largeImg.setAttribute('src', src);
      largeImg.setAttribute('alt', title);

      ev.preventDefault();
      ev.stopPropagation();
    }
  }, false);

}, false);


