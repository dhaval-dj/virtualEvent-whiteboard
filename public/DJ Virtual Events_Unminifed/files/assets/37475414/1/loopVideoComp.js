var LoopVideoComp = pc.createScript('loopVideoComp');

LoopVideoComp.attributes.add('material', { type: 'asset', assetType: 'material', title: 'Materials' });
LoopVideoComp.attributes.add('videoAsset', { type: 'asset', });

LoopVideoComp.attributes.add('isLoop', { type: 'boolean', title: 'Loop' });
LoopVideoComp.attributes.add('actionEvent', { type: 'string', title: 'Call This event when video got finished' });

LoopVideoComp.attributes.add('isMute', { type: 'boolean', title: 'Mute Sound' });
LoopVideoComp.attributes.add('passByURL', { type: 'boolean', title: 'Pass By URL' });
LoopVideoComp.attributes.add('video_url', { type: 'string' });

LoopVideoComp.attributes.add('video_plane', { type: 'entity' });
LoopVideoComp.attributes.add('ui', {type: 'entity',});
//LoopVideoComp.attributes.add('gm', {type: 'entity',});

var totalPercentage=0;
var count = 0;
LoopVideoComp.prototype.createTexture = function () {
    var app = this.app;
    var i, texture, material;

    texture = new pc.Texture(app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8,
        autoMipmap: false
    });
    texture.minFilter = pc.FILTER_LINEAR;
    texture.magFilter = pc.FILTER_LINEAR;
    texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

    material = this.material.resource;
    material.emissiveMap = texture;
    material.update();
    return texture;
};

LoopVideoComp.prototype.initialize = function () {

    this.oldTime = 0;
    this.notLoaded = true;
    var self = this;
    var rootPath = this.app.root;

    this.video_start_play = false;
    this.isVideo = false;
    this.updateEvery = 2;
    this.playing = false;
    this.frameCount = 0;
    this.updatedTexture = false;
    
    this.currentCallback = null;
    this.needForCallback = false;
    
    var texture = this.createTexture();
    var video = document.createElement('video');
    var image = new Image();

    this.doOnce = true;
    this.doOnceStart = false;
    this.Prog = 0;
    this.lastLoadProgress = 0;

    //Setting video player 
    video.type = "video/mp4";
    video.crossOrigin = 'anonymous';
    video.loop = this.isLoop;
    video.preload = "auto";
    // critical for iOS or the video won't initially play, and will go fullscreen when playing
    video.playsInline = true;

    video.muted = this.isMute;

    if (this.passByURL) {
        video.src = this.video_url;
    } else {
        video.src = this.videoAsset.getFileUrl();
    }

     // iOS video texture playback requires that you add the video to the DOMParser
    // with at least 1x1 as the video's dimensions
    var style = video.style;
    style.width = '1px';
    style.height = '1px';
    style.position = 'absolute';
    style.opacity = '0';
    style.zIndex = '-1000';
    style.pointerEvents = 'none';
    document.body.appendChild(video);
    
     //Calling This When Video got loaded
    video.addEventListener('canplay', function (e) {
        
        if(!this.updatedTexture)
        {
            texture.setSource(video);
            this.updatedTexture = true;
             //console.log("Can start playing video");
           // console.log("UPdated texture");
        }
    });
    
    video.addEventListener('waiting', function(e){
       //console.log("Wait! I need to buffer the next frame"); 
    });
    
    video.addEventListener('progress', function(e){
        if(self.video)
            {
       //           var loadedPercentage = e.srcElement.buffered.end(0) / e.srcElement.duration;
       // console.log("Downloading video",loadedPercentage);
       
                
              // IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
                
            //    if(isIpadPro())
            //        {
//console.log("This is IPAD");
            //            self.app.fire("allVideosLoaded");
            //        }
           //     else
          //          {
                         var r = self.video.buffered;
                         var numRanges = r.length;
                         var total = self.video.duration;
                
                         if (r.length >= 1)
                            {
                               //console.log("Buffer is meet");
                               var start=r.start(0);
                                var end = r.end(0);
                                var newValue = (end/total)*100;
                                self.Prog=Math.floor(newValue);
                
                            self.app.fire("addVideoLoadProgress", (self.Prog - self.lastLoadProgress));
                
                         self.lastLoadProgress = self.Prog; 
                         }
               //     }
                
               
                     

                 //var start = r.start(0);
               
                
//                 if(totalPercentage > 10)
//                 {
//                     var newPer= Math.floor(totalPercentage);
//                     console.log(newPer);
//                     self.ProggresbarText.element.text = newPer.toString() +" %";
//                     console.log("Loaded: ",self.Prog);    
//                 }
            }
       
    });
    
    video.addEventListener('loadeddata', function(e){
       //console.log("Browser has loaded the current frame");
    });
    
    video.addEventListener('canplaythrough', function(){
        self.app.fire("addVideoLoadProgress", (Math.abs(100 - self.lastLoadProgress)));
      // console.log("Can play through video without stopping");
    });
    
    video.addEventListener('loadeddata', function(e){
       // console.log("Browser has loaded the current frame");
    });
    this.isVideo = true;
    this.texture = texture;
    this.image = image;
    this.video = video;
    this.upload = true;

    //Event calling to start this video
    this.app.on('PlayAllVideo', function () {
        self.startVideoFirstTime();
    });

};

// Video API
LoopVideoComp.prototype.isPlaying = function () {
    return this.playing;
};

LoopVideoComp.prototype.muteAudio = function (flag) {
    this.video.muted = flag;
};

LoopVideoComp.prototype.pauseVideo = function () {
    if (this.video) {
        this.video.pause();
        this.playing = false;
    }
};

LoopVideoComp.prototype.playVideo = function () {
    if (this.video) {
//console.log("called");
        
        var videoPromise = this.video.play();
        if(videoPromise !== undefined)
        {
            playPromise.then( function(){
               // console.log("promise returned");
              // Automatic playback started!
              // Show playing UI.
            })
            .catch( function(error){
               // console.log(error);
              // Auto-play was prevented
              // Show paused UI.
            });
        }else
        {
            //console.log("videoPromise is not valid!!");
        }
        
        this.playing = true;
    }
};

LoopVideoComp.prototype.getCurrentTime = function () {
    var videoData = {
        url: this.video.src,
        time: this.video.currentTime
    };
    return this.video.currentTime;
};

LoopVideoComp.prototype.setCurrentTime = function (time) {
    this.video.currentTime = time;
};

LoopVideoComp.prototype.update = function (dt) {
    
    if(this.notLoaded)
    {
        count += 1;
      //  console.log("video's ready to play : "+ count);
        this.notLoaded = false;
    }
    
    if(this.needForCallback)
    {  
        if(this.video.readyState > 2)
        {
            this.currentCallback();
            this.playing = true;
            this.doOnce = false;
            this.currentCallback = null;
            this.needForCallback = false;
        }
    }
   
    if (this.video && this.playing) {

        this.upload = !this.upload;
        if (this.upload) {
            this.texture.upload();
            
            if(this.ui){    
                var texture = this.texture;
                this.ui.element.texture=texture;
                this.ui.element.texture.upload();
                }
        }

        var name= this.video.src;
        
        if (this.video.duration < (this.video.currentTime + 0.2)) {
            //Calling this when video got finish
            if (this.actionEvent && !this.doOnce) {
                this.doOnce = true;
                this.app.fire(this.actionEvent);//sceneManager.js Pass by var so may change
                this.pauseVideo();
            }
        }

        if (!this.doOnceStart && this.video.currentTime > 0.2) {
            this.doOnceStart = true;
            //Call Show Event
        }

        if (this.video.currentTime > 0.2) {
             //if(!this.video_plane.model.enabled)
                 //this.video_plane.model.enabled = true;
        }
    }else{
       //if(this.video_plane.model.enabled)
            //this.video_plane.model.enabled = false;
    }
};


//Repeatedly call
LoopVideoComp.prototype.startVideo = function () {
    if (this.video && !this.playing) {
        this.video.currentTime = 0;
        this.playing = true;
        this.doOnce = false;
         
        var name= this.video.src;
   
    }
};

LoopVideoComp.prototype.startVideoFirstTime = function (callback) {
    var self = this;
        // console.log("calling video play promise");
    //Only Calling Begining  
    if (this.video && !this.playing) {
        // console.log("calling video play promise");
        var playPromise = this.video.play();
        if(playPromise !== undefined)
        {
            playPromise.then( function(){
                
                if(self.video.readyState > 2)
                {
                     switch(self.video.readyState)
                   {
                       case 3:
                          // console.log("Data for the current playback position as well as for at least a little bit of time into the future is available");
                           break;
                       case 4:
                           //console.log("Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.");
                           break;
                   }
                    
                      if(callback)
                        {
                          //  console.log("found callback!!");
                            callback();
                        }
                        self.playing = true;
                        self.doOnce = false;
                        var name= self.video.src;
                    
                }else
                {
                   switch(self.video.readyState)
                   {
                       case 0:
                           // alert("No information is available about the media resource.");
                           break;
                       case 1:
                           // alert("Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.");
                           break;
                       case 2:
                           // alert("Data is available for the current playback position, but not enough to actually play more than one frame.");
                           break;
                   }
                    
                    if(callback)
                    {
                        self.currentCallback = callback;
                        self.needForCallback = true;                    
                    }
                }
                
                // console.log(self.video.readyState + ": readyState");
              
            })
            .catch( function(error){
                 //console.log("ye hi ha");
                console.log(error);
               
              // Auto-play was prevented
              // Show paused UI.
            });
        }else
        {
            //console.log("videoPromise is not valid!!");
        }
    }else if(this.video && this.playing)
    {
        if(callback)
        {
           // console.log("found callback!!");
            callback();
        }
    }
};

LoopVideoComp.prototype.stopVideo = function () {
  
     var name= this.video.src;

    if (this.video) {
        this.video.currentTime = 0;
        this.video.pause();
        this.playing = false; 
        
    }
};

// var videoDuration = self.video.attr('duration');

// var updateProgressBar = function(){
//  //if (self.video.attr('readyState')) {
//     var buffered = self.video.buffered.end(0);
//     var percent = 100 * buffered / videoDuration;

//     //Your code here

//     //If finished buffering buffering quit calling it
//     if (buffered >= videoDuration) {
//             clearInterval(this.watchBuffer);
//     }
// //}
// };
// var watchBuffer = setInterval(updateProgressBar, 500);