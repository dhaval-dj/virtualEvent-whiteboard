var GreenScreenInteractive = pc.createScript('greenScreenInteractive');


GreenScreenInteractive.attributes.add('shader', { type: 'asset', assetType: 'shader' });

GreenScreenInteractive.attributes.add('materials', {
    type: 'asset',
    assetType: 'material',
    array: true
});


GreenScreenInteractive.attributes.add('videoAsset', {
   type: 'asset',
   assetType: 'audio',
});

GreenScreenInteractive.attributes.add('playButton', { type: 'entity', title: 'Play button' });

GreenScreenInteractive.attributes.add('planeEntity', { type: 'entity', title: 'Entity on which video is rendered' });

// initialize code called once per entity
GreenScreenInteractive.prototype.initialize = function() {
    var self = this;
    var app = this.app;
    
   
    this.playButton.element.on('click', function(){
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

        self.upload = true;   
        self.frameCount = 0;
        self.updateEvery = 2;
        self.playing = true;
    });
   
};

// update code called every frame
GreenScreenInteractive.prototype.update = function(dt) {
    // Upload the video data to the texture every other frame
   // this.upload = !this.upload;
 if (this.app.keyboard.wasPressed(pc.KEY_G)) {
        console.log('Play Video');
        this.showGreenScren();
    }
    
    if (this.playing) {
        if (this.frameCount++ % this.updateEvery === 0)
            this.videoTexture.upload();
    } 
};
 

GreenScreenInteractive.prototype.showGreenScren = function(event) 
{
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

        self.upload = true;   
        self.frameCount = 0;
        self.updateEvery = 2;
        self.playing = true;
    
};