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