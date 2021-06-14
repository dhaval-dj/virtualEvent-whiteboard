var StallHtmlHandler = pc.createScript('stallHtmlHandler');

var stallComponent;

StallHtmlHandler.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});
StallHtmlHandler.attributes.add('isChat', {type: 'boolean'});

StallHtmlHandler.prototype.initialize = function() {
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
    
    this.app.on('comeBack',function(){
       closeStallConetent(); 
    });
};


StallHtmlHandler.prototype.attachAsset = function(assetId, fn) {
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
};


StallHtmlHandler.prototype.template = function(asset, html) {
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);
    this.asset = asset;
    this.element.innerHTML = html || ''; 
};

StallHtmlHandler.prototype.showStallContent = function () {
    
    if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    
    this.element = document.createElement('div');
    
    if(this.isChat){
        this.element.classList.add('loungeArea-chat');
    }else{
        this.element.classList.add('stall-container');
    }
    
    
    //
    this.element.classList.add('popover-modal');
    //
    this.element.setAttribute("id", 'stall-container');
    
    var article = document.querySelector("#play");

    if(article)
    {
        article.appendChild(this.element);
    }else
    {
        document.body.appendChild(this.element);        
    }
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
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


 