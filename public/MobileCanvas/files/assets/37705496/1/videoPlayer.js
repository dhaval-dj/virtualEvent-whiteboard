var VideoPlayer = pc.createScript('videoPlayer');

VideoPlayer.attributes.add('material', { type: 'asset', assetType: 'material', title: 'Materials' });

VideoPlayer.attributes.add('videoAsset', {type: 'asset',assetType: 'audio',});



VideoPlayer.prototype.createTexture = function () {
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


VideoPlayer.prototype.initialize = function() {
    this.isVideoIsPlaying=false;
    
    
     var self = this;
    
    this.isVideo = false;
    
    this.updateEvery = 2;
    this.frameCount = 0;

    
    this.texture = this.createTexture();
    this.video = document.createElement('video');
    this.image = new Image();
    
    this.video.addEventListener('canplay', function (e) {
            self.texture.setSource(self.video);
        });

    this.video.src = this.videoAsset.getFileUrl();
    this.video.loop = true;
    this.video.preload = true;
    
    self.video.play(); 
    self.isVideoIsPlaying = true;  
 
};


VideoPlayer.prototype.update = function(dt) {
    
     if (this.isVideoIsPlaying){
        if (this.frameCount++ % this.updateEvery === 0)
            this.texture.upload();
        } 
};

VideoPlayer.prototype.playVideo = function() {
    
};

VideoPlayer.prototype.stopVideo = function() {
    
};


