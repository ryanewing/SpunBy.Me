var ytQueue = [];
var currentSong = "";
var ytplayer;

function SongEntry() {
  this.html = "";
  this.video_id = "";
}

function getData() {
  var pid = $('#party_id').val();
  $.getJSON('/party/'+pid+'/queue',function(data) {
    for (track in data) {
      // ytQueue.push(data[track].video_id);
      var newSong = new SongEntry();
      $html = generateEntry(data[track]);
      newSong.html = $html;
      newSong.html.appendTo($("#playlist"));
      newSong.video_id = data[track].video_id;
      ytQueue.push(newSong);
    }
  });
};

function generateEntry(track) {
  var $entry = $('<div class="entry">');
  var $info = $('<div class="info">');
  var $vote = $('<div class="vote">');
    var $upvote = $('<div class="upvote">');
    var $votecount = $('<div class="votecount">10</div>');//10
    var $downvote = $('<div class="downvote">');

  var $song_title = $('<h2></h2>');
  $song_title.text(track.title);
  var $artist = $('<h3></h3>');
  $artist.text(track.artist);

  $upvote.appendTo($vote);
  $votecount.appendTo($vote);
  $downvote.appendTo($vote);

  $vote.appendTo($info);
  $song_title.appendTo($info);
  $artist.appendTo($info);

  $info.appendTo($entry);
  // $entry.appendTo($("#playlist"));
  return $entry;
}


/*
 * Change out the video that is playing
 */

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// Loads the selected video into the player.
function loadVideo(songEntry) {
  // var selectBox = document.getElementById("videoSelection");
  // var videoID = selectBox.options[selectBox.selectedIndex].value
  
  if(ytplayer) {
    ytplayer.loadVideoById(songEntry.video_id);
  }
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  ytplayer.addEventListener("onError", "onPlayerError");
  ytplayer.addEventListener("onStateChange", "processStateChange");
}

function processStateChange(code) {
    if (code === 5) {
      if (ytQueue.length > 0) {
        current.html.fadeOut();
        currentSong = ytQueue.pop();
        loadVideo(currentSong);
      }
  }
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer(videoID) {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                     "?version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", "480", "295", "9", null, null, params, atts);
}
function _run() {
  loadPlayer("ylLzyHk54Z0");
  getData();
  if (ytQueue.length > 0) {
    currentSong = ytQueue.pop();
    loadVideo(currentSong);
  } 
}
google.setOnLoadCallback(_run);
