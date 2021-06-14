var MediaPlayer = pc.createScript('mediaPlayer');

MediaPlayer.attributes.add('material', { type: 'asset', assetType: 'material', title: 'Materials' });

MediaPlayer.attributes.add('videoAsset', {type: 'asset',});

MediaPlayer.attributes.add('maskVideoAsset', {type: 'asset',});

MediaPlayer.attributes.add('isLoop', { type: 'boolean', title: 'Loop' });
MediaPlayer.attributes.add('doThis', { type: 'string', title: 'Call This function when finish video' });
MediaPlayer.attributes.add('isMute', { type: 'boolean', title: 'Mute Sound' });
MediaPlayer.attributes.add('passByURL', { type: 'boolean', title: 'Pass By URL' });
MediaPlayer.attributes.add('isHlsLink', { type: 'boolean'});

MediaPlayer.attributes.add('isAlpha', { type: 'boolean'});
MediaPlayer.attributes.add('video_url', { type: 'string'});
MediaPlayer.attributes.add('startVideoByDefault', { type: 'boolean'});

MediaPlayer.attributes.add('ui', {type: 'entity',});

MediaPlayer.prototype.createTexture = function () {
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

MediaPlayer.prototype.createMaskedTexture = function () {
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
    material.opacityMap = texture;
    material.update();
    return texture;
};

var myVideo;
MediaPlayer.prototype.initialize = function () {
    
    this.oldTime=0;
    
    var self = this;
    var rootPath=this.app.root;
    this.video_start_play=false;
    this.isVideo = false;
    this.updateEvery = 2;
    this.playing = false;
    this.frameCount = 0;
   this.entity.model.enabled=false;
 
    var texture = this.createTexture();
    
    var video = document.createElement('video');
    
    var maskedTexture = this.createMaskedTexture();
    
    var maskVideo = document.createElement('video');
    
    var image = new Image();
    
    var doOnce=false;
    myVideo=video;
    video.addEventListener('canplay', function (e) {
        if(!doOnce)
            {
                //console.log("emissib map video play");
                doOnce=true;
              //  texture.setSource(video);
              texture.setSource(video);
            }     
    });
    
    if(self.isAlpha)
    {
        maskVideo.addEventListener('canplay', function (e) {
                maskedTexture.setSource(maskVideo);     
    }); 
    }
   
    video.addEventListener("ended", function() {
      video.currentTime = 0;
        console.log('End');
      video.play();
    }, true);
    
    if(self.doThis !== '' && self.doThis)
        {
             video.onended = function() {
                var manager=rootPath.findByName('Manager').script.manager;
                manager.toDoFunction(self.doThis);
                 if(!self.isLoop)
                     {
                         self.pauseVideo();
                     }
              };
        }
 
     //https://storage.googleapis.com/virtual-event-273009.appspot.com/djStreamDemo.mp4
   // video.poster='https://miro.medium.com/max/1400/0*AfqBDiTV_BNa_sP7.png'; 
    
    if(this.passByURL)
        {
            if(this.isHlsLink)
            {
                if (Hls.isSupported()) 
                {
                    var hls = new Hls();
                    console.log("Hls Suppoerted");
                    hls.loadSource(self.video_url);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    });
                }  
                else if (video.canPlayType('application/vnd.apple.mpegurl')) 
                {
                    video.src = self.video_url;
                    video.addEventListener('loadedmetadata', function() {
                    //video.play();
                    });
                }
            }
            else
            {
                
                video.crossOrigin = 'anonymous';
                video.src = this.video_url;     
                video.type="video/mp4";
               
            }
           
        }else{
            video.crossOrigin = 'anonymous';
            video.type="video/mp4";
            video.src = this.videoAsset.getFileUrl(); 
            
             if(self.isAlpha)
                {
                    maskVideo.crossOrigin = 'anonymous';
                    maskVideo.src = this.maskVideoAsset.getFileUrl();     
                    maskVideo.type="video/webm";
                }
        }
    
    
    video.crossOrigin = 'anonymous';
    video.loop = this.isLoop;
    video.preload = true;
    video.playsinline=true;
    if(self.isAlpha)
    {
        maskVideo.loop = true;
        maskVideo.preload = true;
    }
    video.muted=this.isMute;
    
    this.isVideo = true;
    this.texture = texture;
    if(self.isAlpha)
    {
    this.maskedTexture = maskedTexture;
    this.maskedVideo = maskVideo;    
    }
    this.image = image;
    this.video = video;
    this.upload = true;
    
    if(this.startVideoByDefault)
    {
        this.playVideo();
    }
};

// Video API
MediaPlayer.prototype.isPlaying = function () {
    return this.isVideo && this.playing;
};


MediaPlayer.prototype.pauseVideo = function () {
      if(this.video)
         this.video.pause(); 
    this.playing=false;
};

MediaPlayer.prototype.playVideo = function () {
      if(this.video)
         this.video.play(); 
    
    this.playing=true;
};

MediaPlayer.prototype.muteAudio = function (flag) {
    this.video.muted=flag;
};

MediaPlayer.prototype.getCurrentTime = function () {
     var videoData={
        url:this.video.src,
        time:this.video.currentTime
    };
  return videoData;
};

MediaPlayer.prototype.setCurrentTime = function (time) {
     this.video.currentTime=time;
};

MediaPlayer.prototype.update = function (dt) {
    
    if(this.playing)
        {
               this.upload = !this.upload;
                if (this.upload) {
                    this.texture.upload();
                    if(this.ui){
                        
                        var texture = this.texture;
                        this.ui.element.texture=texture;
                        this.ui.element.texture.upload();
                    }
                       
                    if(this.isAlpha)
                    {
                        this.maskedTexture.upload();
                    }
                }
            
             if(this.video.currentTime>0.3)
            {
            this.entity.model.enabled=true;
            if(this.oldTime == this.video.currentTime)
                 {
                     this.oldTime=this.video.currentTime;
                      this.video.play(); 
                 }
            }
        }

   
   // console.log();
};


MediaPlayer.prototype.startVideo = function () {
     
    if(this.isHlsLink)
    {
        if (Hls.isSupported()) 
        {
            var hls = new Hls();
            console.log("Hls Suppoerted");
            hls.loadSource(this.video_url);
            hls.attachMedia( this.video);

            hls.on(Hls.Events.MANIFEST_PARSED, function() {
            });
        }
    }
    
    if(this.video){
         this.video.load();
        

       this.video.play(); 
       
        if(this.isAlpha)
        {
             this.maskedVideo.load();    
            this.maskedVideo.play();    
        }
        
        this.playing = true;  
    
    }
       
};

MediaPlayer.prototype.stopVideo = function () 
{
    
    this.entity.model.enabled=false;
    
    if(this.video){
         this.video.pause(); 
        
        if(this.isAlpha)
        {    
            this.maskedVideo.pause();    
        }
        
        this.playing = false;  
    }
    
};

