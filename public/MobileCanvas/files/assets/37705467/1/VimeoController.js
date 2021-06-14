var VimeoController = pc.createScript('vimeoController');

// initialize code called once per entity
VimeoController.prototype.initialize = function() {
  this.initVimeo();  
};

// update code called every frame
VimeoController.prototype.update = function(dt) {
    
};

VimeoController.prototype.initVimeo = function() {
//     var script = document.createElement("script");
//     script.src = "https://player.vimeo.com/api/player.js";
//     document.body.appendChild(videoDivContainer);
    
    console.log("vimeo Called");
    
    var videoDivContainer = document.createElement("div");
    videoDivContainer.id = "vimeoVideo";
    
    document.body.appendChild(videoDivContainer);
    
     var videoConfig = {
      id: "418424717",
      width: 600
    };
    
    // console.log(Vimeo.Player("vimeoVideo"));
    var vimeoPlayer =new Vimeo.Player("vimeoVideo", videoConfig);
    
    
    vimeoPlayer.setVolume(0);
    
    vimeoPlayer.on('play', function() {
      console.log('Played the first video');
    });
    vimeoPlayer.getVideoTitle().then(function(title) {
      console.log('title:', title);
    });
};

