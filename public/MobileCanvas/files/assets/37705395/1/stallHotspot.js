var StallHotspot = pc.createScript('stallHotspot');

StallHotspot.attributes.add('stallHandler', {
  type: 'entity',
});

StallHotspot.prototype.initialize = function () {
  this.entity.element.on('click', function (evt) {

    if (this.stallHandler) {
      if (this.stallHandler.script.stallHtmlHandler) {
        this.stallHandler.script.stallHtmlHandler.showStallContent();
      }
      window.ReactHomeManager.IClickedThisHTMLPage(this.stallHandler);
    }



    this.app.fire('pausesound');

    // Rishabh Start
    if (this.entity.name == "GAME8") {
      window.SceneManagerObj.changeStallStateForAnalytics(this.entity.name);
    }
    // Rishabh End
    // 
  }, this);
};


StallHotspot.prototype.openIframe = function () {
  this.stallHandler.script.stallHtmlHandler.showStallContent();
};
/*var StallHotspot = pc.createScript('stallHotspot');

StallHotspot.attributes.add('stallHandler', { type: 'entity', });
StallHotspot.attributes.add('hotspotId', { type: 'number',default: 0});
StallHotspot.attributes.add('videoUrl', { type: 'string'});
StallHotspot.attributes.add('hotspotType', {
    type: 'number',
    enum: [
        { 'Video': 1 },
        { 'Image': 2 },
        { 'Web': 3 },
    ],
    default: 1
});

StallHotspot.prototype.initialize = function() {
    var self = this;
    
    switch(this.hotspotType)
    {
        case 1:
           this.handler = this.app.root.findByName("VideoHotspotController");
            break;
        case 2:
           this.handler = this.app.root.findByName("ImageHotspotController");
            break;
        case 3:
           this.handler = this.app.root.findByName("WEBHotspotController");
            break;
    }
     this.entity.element.on('click', function (evt) {
        if(window.ReactHomeManager)
        {
            if(window.ReactHomeManager.getResourceCenterLinks)
            {
                this.videoUrl = window.ReactHomeManager.getResourceCenterLinks(self.hotspotId);
                window.ReactHomeManager.UpdateAnalytics(window.ReactHomeManager.getResourceCenterName(this.hotspotId));

            }
        }
         
        this.handler.script.stallHtmlHandler.showStallContent(self.hotspotId, self.videoUrl);
         // this.stallHandler.script.stallHtmlHandler.showStallContent(self.hotspotId, self.videoUrl);
    }, this);
};
*/