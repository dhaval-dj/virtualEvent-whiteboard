var HtmlManager = pc.createScript('htmlManager');


var htmlManagerInstance;


HtmlManager.prototype.initialize = function() {
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
    htmlManagerInstance=this;
    var self=this;
     this.app.on('openThisStallHotspot',function(html, link){
        self.showStallContent(html, link);
        self.app.fire('stopBackSideInteraction');//emptyFadeController.js
    });
};


HtmlManager.prototype.attachAsset = function(assetId, fn, link) {
    this.assetId = assetId;
    if (! this.assetId)
        return fn.call(this);

    var asset = this.app.assets.get(this.assetId);
    var self = this;
    asset._onLoad = function(asset) {
        fn.call(self, asset, asset.resource);
    };
    asset.on('load', asset._onLoad);
    fn.call(this, asset, asset.resource);
    this.app.assets.load(asset);
    
    if(link)
    {
        var _iframe = document.querySelector(".iframe-css");
        console.log(link, _iframe);
        if(_iframe)
        {
           _iframe.setAttribute("src", link);
        }else{
            console.log("dosesnot exits");
        }    
    }
};


HtmlManager.prototype.template = function(asset, html) {
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);
    this.asset = asset;
    this.element.innerHTML = html || ''; 
};

HtmlManager.prototype.showStallContent = function (html, link) {
    
    if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add('stall-container');
    //
    this.element.classList.add("popover-modal");
    //
    this.element.setAttribute("id", 'stall-container');
    
    document.body.appendChild(this.element);
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== html.id)
        this.attachAsset(html.id, this.template, link);
};

HtmlManager.prototype.removeIFRMAE = function () {
    if(this.element)
        this.element.remove();
    this.app.fire('startBackSideInteraction');//emptyFadeController.js
    
    //for connecting the event to react 
     this.app.fire('resumeCanvas');//for reusming the canvas update function
    this.app.fire("hotspotCliked",-1);//to unselect if any hotspot is selected inside react
};

function closeStallConetent(){
        console.log("removinf iframe html Manager");
      if(htmlManagerInstance)
          {
              htmlManagerInstance.removeIFRMAE();
          }
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
}
