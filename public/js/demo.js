autoplay = autoplay == "false" ? false : true;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var cardText = new Array(
  "Easy setup with OBS. No messing around.",
  "Stream with any number of friends (well, as many as can fit).",
  "Lots of themes and skins.");

if (autoplay) {
  document.getElementById('localImage').src = "/img/hearthstone-blank-no-text.png";  
}

var simplewebrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  // disable this for signup page
  autoRequestMedia: autoplay,
  debug: true
});



simplewebrtc.connection.on('message', function (message) {
  //console.log(message.payload);
  if(message.type == 'position') {
    var position = message.payload;
    $("#draggable").css({left:position.left, top:position.top});
  }
});



// we have to wait until it's ready
simplewebrtc.on('readyToCall', function () {
  // you can name it anything
  // this should be randomised for the demo site
  simplewebrtc.joinRoom(room);


  $("#localImage").popover({ 
    html: true, 
    content: '<h4>Let your friends join your stream. Simply share this link: </h4><input onclick="this.select();" class="form-control input-lg" id="justatest" type="text" value=""/>', 
    placement: 'left', 
    trigger: 'manual' });

  $("#localImage").popover('show');

  document.getElementById('justatest').value = window.location.host+'/'+room;
});

// This gets called when a remote video is added - see handlePeerStreamAdded() function
simplewebrtc.on('videoAdded', function (video, peer) {

  $("#localImage").popover('hide');
  $(video).parent().addClass("card");
  $(video).parent().append("<img src='/img/hearthstone-blank-no-text.png'></img>");
  $(video).parent().append("<div class='cardText'><h3>" + cardText[getRandomInt(0, cardText.length)] + "</h3></div>");
  $(video).parent().animate({
      duration: 500,
      specialEasing: "slideIn"
    });
});

var start = function() {
  document.getElementById('localImage').src = "/img/hearthstone-blank-no-text.png";
  document.getElementById('main-card').onclick = '';
  //simplewebrtc.startLocalVideo();
}

$(function() {

  $( "#draggable" ).draggable({
    drag: function( event, ui ) {
      simplewebrtc.webrtc.sendToAll('position', ui.position );
    },
    stop: function( event, ui ) {
      simplewebrtc.webrtc.sendToAll('position', ui.position );
    }
  });
});



