//var videoSrc = 'https://mcdn.daserste.de/daserste/de/master.m3u8';
//var videoSrc = 'https://mcdn.daserste.de/daserste/int/master_1920p_5000.m3u8';
const proxy = "http://localhost:3000";

var videoSrc = proxy+"/getLive/" + window.localStorage.getItem("live")

console.log(videoSrc)
var video = document.getElementById('video');

// Agregamos el Token a cualquier solicitud Http 
XMLHttpRequest.prototype.open = (function (open) {
  return function (method, url, async) {
    open.apply(this, arguments);
    this.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem("token"));
  };
})(XMLHttpRequest.prototype.open);

// Realizamos la llamada al servidor HLS 
var hls = null;
if (Hls.isSupported()) {
  hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
}