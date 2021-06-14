var HtmlHandlerQna = pc.createScript('htmlHandlerQna');


var thatForQNA;
HtmlHandlerQna.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

HtmlHandlerQna.prototype.initialize = function() {

    // asset
    this.asset = null;
    this.assetId = 0;

    this.counter = 0;
};


HtmlHandlerQna.prototype.attachAsset = function(assetId, fn) {
    // remember current assetId
    this.assetId = assetId;
thatForQNA=this;
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


HtmlHandlerQna.prototype.template = function(asset, html) {
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



HtmlHandlerQna.prototype.update = function (dt) {
   
   
};


HtmlHandlerQna.prototype.showIFRMAE = function () {
    
    this.element = document.createElement('div');
    this.element.classList.add('container-qna');
        this.element.setAttribute("id", 'container-qna');
    document.body.appendChild(this.element);
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
};


HtmlHandlerQna.prototype.removeIFRMAE = function () {
    if(this.element)
        this.element.remove();
};

function closeIframe(){
      if(thatForQNA)
          {
              thatForQNA.removeIFRMAE();
          }

}