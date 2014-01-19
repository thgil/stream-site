
var urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results ? results[1] : false;
}
var m = Math.random() + 1;
console.log(m);
console.log((m).toString(36));
console.log((m).toString(36).substring(2) );

var room =  urlParam('room') || (Math.random() + 1).toString(36).substring(2,7);

console.log('room',room);

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
  // var cont = '<a href="'+window.location.host+'?room='+room+'">'+window.location.host+'?room='+room+'</a>';
  $("#localImage").popover({ title: 'Add a friend!', content: 'Share link should go here. Also need to change the css styling for this.', placement: 'left', trigger: 'manual' });
  $("#localImage").popover('show');
  // document.getElementById('shareRoom').innerHTML = 'Add a friend : <a href="'+window.location.host+'?room='+room+'">'+window.location.host+'?room='+room+'</a>';
});

// this is called before the handlePeerStreamAdded() function
webrtc.on('peerStreamAdded', function (peer) {
});

// This gets called when a remote video is added - see handlePeerStreamAdded() function
webrtc.on('videoAdded', function (video, peer) {
  $(video).parent().addClass("card");
  $(video).parent().append("<img src='/img/hearthstone-blank-no-text.png'></img>");
  $(video).parent().append("<div class='cardText'><h3>Hello hello hello</h3></div>");
  $(video).parent().animate(
    {
      duration: 500,
      specialEasing: "slideIn"
    });
  //$(video).addClass("smallVideo");
});

var start = function() {
  document.getElementById('localImage').src = "/img/hearthstone-blank-no-text.png";
  document.getElementById('main-card').onclick = '';
  webrtc.startLocalVideo();
}
