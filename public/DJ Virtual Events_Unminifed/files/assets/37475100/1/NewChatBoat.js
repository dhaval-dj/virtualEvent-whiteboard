var NewChatBoat = pc.createScript('newChatBoat');
 

var selfForBoat;

NewChatBoat.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

NewChatBoat.attributes.add('className', {type: 'string', title: 'Class Name'});

NewChatBoat.attributes.add('autoStart', {type: 'boolean', title: 'Auto start html'});

NewChatBoat.attributes.add("onbtn", {type: "entity"});
NewChatBoat.attributes.add("offbtn", {type: "entity"});

NewChatBoat.prototype.initialize = function() {

    var self=this;
    selfForBoat=this;
      this.onbtn.element.on("click", function(){
        self.showIFRMAE();
    });

    
//     this.offbtn.element.on("click", function(){
//         self.removeIFRMAE();
//     });
    
    // asset
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
     thatForAll=this;
    
    if(this.autoStart){
        this.showIFRMAE(); 
    }
    
};


NewChatBoat.prototype.attachAsset = function(assetId, fn) {
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


NewChatBoat.prototype.template = function(asset, html) {
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


NewChatBoat.prototype.update = function (dt) {
   
};


NewChatBoat.prototype.showIFRMAE = function () {
    
     if(document.getElementById(this.className))
        {
            document.getElementById(this.className).remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
     this.element.classList.add('addVisible');
    
    this.element.setAttribute("id", this.className);
    document.body.appendChild(this.element);
      this.asset = null;
    this.assetId = 0;

    this.counter = 0;
     if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
};


NewChatBoat.prototype.removeIFRMAE = function () {
    if(this.element)
        this.element.remove();
};

NewChatBoat.prototype.showFullScreenVideo = function () {
        this.showIFRMAE(); 
};



function closeIframeChat(){
      if(selfForBoat)
          {
              selfForBoat.removeIFRMAE();
          }
}


function closeIframeSpacialForChat(){
      if (document.getElementById("chat-container")) {
        document.getElementById("chat-container").remove();
    }

}

function ClosePool(){
    console.log('Close');
     if(document.getElementById('container-poll'))
        {
            document.getElementById('container-poll').style.visibility ='hidden';
        }
}
