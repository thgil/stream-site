autoplay = autoplay == "false" ? false : true;

if (autoplay) {
  document.getElementById('localImage').src = "/img/hearthstone-blank-no-text.png";  
}

var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  // disable this for signup page
  autoRequestMedia: autoplay,
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  // this should be randomised for the demo site
  webrtc.joinRoom(room);
  $("#localImage").popover({ title: 'Add a friend!', html: true, content: '<a href="#" id="justatest">This is link</a>', placement: 'left', trigger: 'manual' });
  $("#localImage").popover('show');

  document.getElementById('justatest').href = window.location.host+'/'+room;
});

// this is called before the handlePeerStreamAdded() function
webrtc.on('peerStreamAdded', function (peer) {
});

// This gets called when a remote video is added - see handlePeerStreamAdded() function
webrtc.on('videoAdded', function (video, peer) {
  $("#localImage").popover('hide');
  $(video).parent().addClass("card");
  $(video).parent().append("<img src='/img/hearthstone-blank-no-text.png'></img>");
  $(video).parent().append("<div class='cardText'><h3>Hello hello hello</h3></div>");
  $(video).parent().animate(
    {
      duration: 500,
      specialEasing: "slideIn"
    });
});

var start = function() {
  document.getElementById('localImage').src = "/img/hearthstone-blank-no-text.png";
  document.getElementById('main-card').onclick = '';
  webrtc.startLocalVideo();
}
