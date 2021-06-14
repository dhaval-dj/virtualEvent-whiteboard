var Videotexture = pc.createScript('videotexture');

Videotexture.attributes.add('shader', { type: 'asset', assetType: 'shader' });

Videotexture.attributes.add('materials', {
    type: 'asset',
    assetType: 'material',
    array: true
});


Videotexture.attributes.add('videoAsset', {
   type: 'asset',
   assetType: 'audio',
   description: 'all loop video keep oder'
});


Videotexture.attributes.add('planeEntity', { type: 'entity', title: 'Entity on which video is rendered' });

// initialize code called once per entity
Videotexture.prototype.initialize = function() {
    var self = this;
    var app = this.app;
    this.isShowing=false;

};

// update code called every frame
Videotexture.prototype.update = function(dt) {
    // Upload the video data to the texture every other frame
   // 
 if (this.app.keyboard.wasPressed(pc.KEY_G)) {
        console.log('Play Video');
        this.showGreenScren();
    }
    
    if (this.playing) {
        this.upload = !this.upload;
        
        if (this.upload)
            this.videoTexture.upload();
        
        if(this.video.currentTime>1)
            {
                if(this.isShowing)
                {
                    this.planeEntity.enabled = true;    
                }
            }
    } 
};


Videotexture.prototype.showGreenScren = function() 
{
    this.isShowing=!this.isShowing;
    if(!this.isShowing){
            this.planeEntity.enabled = false;    
        }
    
       var self = this;
    var app = this.app;
    
       console.log("playing");
        // Create a texture to hold the video frame data            
        var videoTexture = new pc.Texture(app.graphicsDevice, {
            format: pc.PIXELFORMAT_R5_G6_B5,
            autoMipmap: false
        });
        videoTexture.minFilter = pc.FILTER_LINEAR;
        videoTexture.magFilter = pc.FILTER_LINEAR;
        videoTexture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
        videoTexture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

        // Create HTML Video Element to play the video
        var video = document.createElement('video');
        video.addEventListener('canplay', function (e) {
            videoTexture.setSource(video);
        });
        video.src = self.videoAsset.getFileUrl();//this.videoUrl;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.play();

        // Get the material that we want to play the video on and assign the new video
        // texture to it.
        
        for (var i = 0; i < self.materials.length; i++) {
            var material = self.materials[i].resource;
            material.emissiveMap = videoTexture;
            material.opacityMap = videoTexture;
            material.chunks.opacityTexPS = self.shader.resource;

        
            material.update();
        }

        self.videoTexture = videoTexture;
        self.video=video;
        self.upload = true;   
        self.frameCount = 0;
        self.updateEvery = 2;
        self.playing = true;
    
};