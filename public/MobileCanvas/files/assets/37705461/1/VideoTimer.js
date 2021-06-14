var VideoTimer = pc.createScript('videoTimer');



VideoTimer.attributes.add('material', { type: 'asset', assetType: 'material', title: 'Materials' });
VideoTimer.attributes.add('video_url', { type: 'string'});


VideoTimer.prototype.createTexture = function () {
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

VideoTimer.prototype.initialize = function () {
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
    var image = new Image();
    var doOnce=false;
    
    video.addEventListener('canplay', function (e) {
       
                doOnce=true;
                texture.setSource(video);
          
            
    });
    
 

    
    video.crossOrigin = 'anonymous';
    video.src = this.video_url;     
    video.type="video/mp4";
    
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.preload = true;
    //video.muted=true;
    
    this.isVideo = true;
    this.texture = texture;
    this.image = image;
    this.video = video;
    this.upload = true;
    self.video.play(); 
  
};


VideoTimer.prototype.update = function (dt) {
    

     this.upload = !this.upload;
    if (this.upload) {
        this.texture.upload();
    }
    
     if (this.app.keyboard.wasPressed(pc.KEY_A)) {
        this.video.currentTime = 50;
    }
    
    if (this.app.keyboard.wasPressed(pc.KEY_B)) {
        this.video.currentTime = 3.06;
    }
    
    if (this.app.keyboard.wasPressed(pc.KEY_C)) {
        this.video.currentTime = 186;
    }
    
    if (this.app.keyboard.wasPressed(pc.KEY_D)) {
        this.video.currentTime = 220;
    }
    
    if(this.video.currentTime>0.2)
    {
         this.entity.model.enabled=true;
    }

};


VideoTimer.prototype.startVideo = function () {
     
  
    if(this.video){
         this.video.load();
       this.video.play(); 
        this.playing = true;  
    }
       
};

VideoTimer.prototype.stopVideo = function () {
    
     this.entity.model.enabled=false;
    if(this.video){
         this.video.pause(); 
        this.playing = false;  
    }
    
};