var AuditoriumScreen = pc.createScript('auditoriumScreen');

AuditoriumScreen.attributes.add('material', { type: 'asset', assetType: 'material', title: 'Materials' });
AuditoriumScreen.attributes.add('isHSL', { type: 'boolean'});
AuditoriumScreen.attributes.add('video_url', { type: 'string'});
AuditoriumScreen.attributes.add('screen', {type: 'entity'});

AuditoriumScreen.attributes.add('eventName', { type: 'string'});
AuditoriumScreen.attributes.add('muteSound', {type: 'entity',});

AuditoriumScreen.prototype.createTexture = function () {
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

AuditoriumScreen.prototype.initialize = function() {
    
    this.upload = true;
    this.video=null;
    this.playing = false;
    this.texture=null;
    this.doOnce=false;
    var self=this;
    this.isMute=false;
    this.app.on(this.eventName, function(){
         self.fullscreenVideoPlayer();
    });
    
     this.app.on('stopVideoOnScreen', function(){
        self.screen.enabled=false;
         if(self.video)
            self.video.pause();
         self.playing=false;
        self.app.fire('deleteFullScreenElement');//->fullscreenVideoPlayer.js 
    });
    //self.app.fire('enterHall');//->loopVideoComp.js->var
 
    this.muteSound.element.on('click', function (evt) {
        //console.log('Hello');
        self.isMute=!self.isMute;
        document.getElementById('fullscreen-video').muted=self.isMute;
        if(self.isMute){
                      self.app.fire('stopSound');
                 }else{
                      self.app.fire('playSound');
                 }
    }, this);
};

AuditoriumScreen.prototype.update = function(dt) {
    
  
    if(this.video && this.playing){
        
        this.upload = !this.upload;
        if (this.upload) {
            if(this.texture)
                this.texture.upload();
        }
        
        if(!this.screen.enabled){
            this.screen.enabled=true;
        }
        
      /*if(this.video.currentTime > 0.2)
        {
            this.entity.model.enabled=true;
        }*/
        
        if(this.video.currentTime > 0.2)
        {
            if(!this.doOnce)
                {
                    this.doOnce=true;
                    this.video.muted=false;
                }
        }else{
            this.video.muted=true;
        }
    }
    
    if(document.getElementById('fullscreen-video'))
        {
            var video = document.getElementById('fullscreen-video');
            if(video.currentTime > 0.2 && !this.playing){
                var texture = this.createTexture();
                texture.setSource(video);
                this.playing = true;
                this.video=video;
                this.texture=texture;
            }
            
        }
};

//https://storage.googleapis.com/virtual-event-273009.appspot.com/Stall%20screen_Google.mp4

AuditoriumScreen.prototype.fullscreenVideoPlayer = function() {
  
    
    var video = document.getElementById('fullscreen-video');
    //var source = document.createElement('source');
   // source.setAttribute('type', 'video/mp4');

    if(this.isHSL){
        if (Hls.isSupported()) {
            //console.log("support");
            var hls = new Hls();
            hls.loadSource(this.video_url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
               // console.log("Play Video");
            });
        }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = self.video_url;
            video.addEventListener('loadedmetadata', function() {
                                  //  video.play();
            });
        }
    }else{
        video.src=this.video_url;
       // source.setAttribute('src', this.video_url);
        //video.appendChild(source);
    }
    
    var texture = this.createTexture();
    var self=this;
    //Calling This When Video got loaded

    
     video.addEventListener('canplay', function (e) {
        texture.setSource(video);
        video.play();
        self.playing = true;
    });
    this.video=video;
    this.texture=texture;
    this.doOnce=false;
};

 