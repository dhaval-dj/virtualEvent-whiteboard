var ChatHtmlhandler = pc.createScript('chatHtmlhandler');

var chatWindow;
ChatHtmlhandler.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

ChatHtmlhandler.prototype.initialize = function() {
    this.asset = null;
    chatWindow=this;
    this.assetId = 0;
    this.counter = 0;
};


ChatHtmlhandler.prototype.attachAsset = function(assetId, fn) {
    // remember current assetId
    this.assetId = assetId;
   
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


ChatHtmlhandler.prototype.template = function(asset, html) {
    // unsubscribe from old asset load event if required
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);

    // remember current asset
    this.asset = asset;
    this.element.innerHTML = html || '';
};



ChatHtmlhandler.prototype.showIFRMAE = function () {
    
     if(document.getElementById('container-chat'))
        {
            document.getElementById('container-chat').remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add('container-chat');
    this.element.setAttribute("id", 'container-chat');
    document.body.appendChild(this.element);
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
};


ChatHtmlhandler.prototype.removeIFRMAE = function () {
    this.element.remove();
};

function closeIframeHtmlHandler(){
      if(chatWindow)
         {
              chatWindow.removeIFRMAE();
          }

}


$('.counterBox').on("click", function(event){
     //console.log("jQ");
   event.stopPropagation();
   // code here
});

 
