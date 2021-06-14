var LoadingBarHandler = pc.createScript('loadingBarHandler');


var videoLoaderFX;

LoadingBarHandler.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

LoadingBarHandler.attributes.add('className', {type: 'string', title: 'Class Name'});

LoadingBarHandler.attributes.add('autoStart', {type: 'boolean', title: 'Auto start html'});
LoadingBarHandler.attributes.add('loader', {type: 'entity'});





var LoadingBarHandlerInstance=null;
LoadingBarHandler.prototype.initialize = function() {

    LoadingBarHandlerInstance=this;
    // asset
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
    videoLoaderFX=this;
    
    if(this.autoStart){
        this.showIFRMAE(); 
    }
};


LoadingBarHandler.prototype.attachAsset = function(assetId, fn) {
    // remember current assetId
    this.assetId = assetId;
   
    // might be no asset provided
    if (! this.assetId)
        return fn.call(this);

    // get asset from registry
    var asset = this.app.assets.get(this.assetId);
    var selfthis=this;
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


LoadingBarHandler.prototype.template = function(asset, html) {
    // unsubscribe from old asset load event if required
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);

    // remember current asset
    this.asset = asset;

    // template element
    // you can use templating languages with renderers here
    // such as hogan, mustache, handlebars or any other
    this.element.innerHTML = html || '';

    
};


LoadingBarHandler.prototype.update = function (dt) {
   
};


LoadingBarHandler.prototype.showHTML = function () {
    
     if(document.getElementById(this.className))
        {
            document.getElementById(this.className).remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
     //this.element.classList.add('addVisible');
    
    this.element.setAttribute("id", this.className);
    document.body.appendChild(this.element);
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
};


LoadingBarHandler.prototype.removeHTML = function () {
    if(this.element)
        this.element.remove();
    
     if(document.getElementById(this.className))
        {
            document.getElementById(this.className).remove();
        }
};

LoadingBarHandler.prototype.something=function(show){
   
     if(videoLoaderFX){
        if(show){
           // videoLoaderFX.showHTML();
           this.loader.enabled=true;
        }else{
           // videoLoaderFX.removeHTML();
           this.loader.enabled=false;
        }
        
    }
};

function ShowLoadingBar(show){
   LoadingBarHandlerInstance.something(show);
}


