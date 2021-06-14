var StallHtmlHandler = pc.createScript('stallHtmlHandler');

var stallComponent;

StallHtmlHandler.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});


StallHtmlHandler.prototype.initialize = function() {
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
};


StallHtmlHandler.prototype.attachAsset = function(assetId, fn, videoUrl) {
    // remember current assetId
    this.assetId = assetId;
    
    stallComponent=this;
    // might be no asset provided
    if (! this.assetId)
        return fn.call(this);

    // get asset from registry
    var asset = this.app.assets.get(this.assetId);

    // store callback of an asset load event
    var self = this;
    asset._onLoad = function(asset) {
        fn.call(self, asset, asset.resource);
    };

    // subscribe to changes on resource
    asset.on('load', asset._onLoad);
    // callback
    fn.call(this, asset, asset.resource);
    // load asset if not loaded
    this.app.assets.load(asset);
    console.log(videoUrl);
    
    if(videoUrl)
    {
        var videoIframe = document.querySelector(".videoIframe");
        console.log(videoUrl, videoIframe);
        if(videoIframe)
        {
           videoIframe.setAttribute("src", videoUrl);
        }else{
            console.log("dosesnot exits");
        }    
    }
    
};


StallHtmlHandler.prototype.template = function(asset, html) {
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);
    this.asset = asset;
    this.element.innerHTML = html || ''; 
};

StallHtmlHandler.prototype.showStallContent = function (hotspotid, videoUrl) {
    
    if(hotspotid !== undefined)
    {
        this.app.fire("hotspotCliked", hotspotid);//for react UI        
    }

    if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add('stall-container');
    //
    this.element.classList.add('popover-modal');
    //
    this.element.setAttribute("id", 'stall-container');
    
    var article = document.querySelector("#play");

    // if(article)
    // {
    //     article.appendChild(this.element);
    // }else
    // {
         
    // }
    document.body.appendChild(this.element);       
    var videoIframe = document.querySelector(".videoIframe");
    if(videoIframe)
    {
        console.log("exits");
    }else{
        console.log("dosesnot exits");
    }
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template, videoUrl);
};

StallHtmlHandler.prototype.removeIFRMAE = function () {
    this.element.remove();
    //event name: hotspotCliked, argument: hotspotId
    this.app.fire("hotspotCliked", -1);//for sending event to react
};

function closeStallConetent(){
      if(stallComponent)
          {
              stallComponent.removeIFRMAE();
          }
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
}


 