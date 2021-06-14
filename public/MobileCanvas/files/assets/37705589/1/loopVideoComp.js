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

    var self = this;
    var rootPath = this.app.root;

    this.video_start_play = false;
    this.isVideo = false;
    this.updateEvery = 2;
    this.playing = false;
    this.frameCount = 0;

    var texture = this.createTexture();
    var video = document.createElement('video');
    var image = new Image();

    this.doOnce = true;
    this.doOnceStart = false;
   

    //Setting video player 
    video.type = "video/mp4";
    video.crossOrigin = 'anonymous';
    video.loop = this.isLoop;
    video.preload = true;
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
        texture.setSource(video);
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
        this.video.play();
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

LoopVideoComp.prototype.startVideoFirstTime = function () {
    //Only Calling Begining  
    if (this.video && !this.playing) {
        this.video.play();
        this.playing = true;
         this.doOnce = false;
         var name= this.video.src;
 
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