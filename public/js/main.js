var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  // disable this for signup page
  autoRequestMedia: false,
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  // this should be randomised for the demo site
  webrtc.joinRoom(room);
  document.getElementById('shareRoom').innerHTML = 'Add a friend : <a href="'+window.location.host+'?room='+room+'">'+window.location.host+'?room='+room+'</a>';
});

// this is called before the handlePeerStreamAdded() function
webrtc.on('peerStreamAdded', function (peer) {
});

// This gets called when a remote video is added - see handlePeerStreamAdded() function
webrtc.on('videoAdded', function (video, peer) {
  $(video).parent().addClass("card");
  $(video).parent().append("<img src='/img/hearthstone-final-click-me-sharp-text.png'></img>");
  $(video).parent().animate(
    {
      duration: 500,
      specialEasing: "slideIn"
    });
  //$(video).addClass("smallVideo");
});

var start = function() {
  webrtc.startLocalVideo();
}