var StallVideoPlayerManager = pc.createScript('stallVideoPlayerManager');

StallVideoPlayerManager.attributes.add('videos', { type: 'entity', array:true });

StallVideoPlayerManager.attributes.add('videos1', { type: 'entity' });
StallVideoPlayerManager.attributes.add('videos2', { type: 'entity'});
StallVideoPlayerManager.attributes.add('videos3', { type: 'entity'});


StallVideoPlayerManager.prototype.initialize = function() {
    
    var self=this;
    
     this.videos1.element.on('click', function (evt) {
            self.playMyThisVideo(0);
    }, this);
    
     this.videos2.element.on('click', function (evt) {
  self.playMyThisVideo(1);
    }, this);
    
     this.videos3.element.on('click', function (evt) {
  self.playMyThisVideo(2);
    }, this);
    
     this.app.on('closeAllStallVideo', function(){
         self.closeAllStallVideo();
    });
    
};


StallVideoPlayerManager.prototype.update = function(dt) {
    
};

StallVideoPlayerManager.prototype.closeAllStallVideo = function() {
    for(var i=0;i<this.videos.length;i++){
        this.videos[i].script.mediaPlayer.stopVideo();
        this.videos[i].enabled = false;
    }
};


StallVideoPlayerManager.prototype.playMyThisVideo = function(id) {
     this.closeAllStallVideo();
    
     this.videos[id].enabled = true;
    this.videos[id].script.mediaPlayer.startVideo();
};