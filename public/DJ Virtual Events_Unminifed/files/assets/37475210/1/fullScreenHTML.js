var FullScreenHtml = pc.createScript('fullScreenHtml');

var thatForFullScreen;
var isFullScreen = false;
var firFirst = false;
FullScreenHtml.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
FullScreenHtml.attributes.add('className', { type: 'string', title: 'Class Name' });
FullScreenHtml.attributes.add('hsl_video_url', { type: 'string'});

FullScreenHtml.attributes.add('hsl', {  type: 'boolean', default: true});

FullScreenHtml.prototype.initialize = function () {
    this.hsl=true;
    
    thatForFullScreen = this;
    if(this.app.root.findByName('Manager'))
        this.manager=this.app.root.findByName('Manager').script.manager;
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
    if (this.autoStart) {
        this.showIFRMAE();
        openFullscreen();
    }

};

FullScreenHtml.prototype.attachAsset = function (assetId, fn) {
    this.assetId = assetId;
    if (!this.assetId)
        return fn.call(this);
    var asset = this.app.assets.get(this.assetId);
    var self = this;
    asset._onLoad = function (asset) {
        fn.call(self, asset, asset.resource);
    };
    asset.on('load', asset._onLoad);
    fn.call(this, asset, asset.resource);
    this.app.assets.load(asset);
};

FullScreenHtml.prototype.template = function (asset, html) {
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);
    this.asset = asset;
    this.element.innerHTML = html || '';
};

FullScreenHtml.prototype.update = function (dt) {
};

FullScreenHtml.prototype.showIFRMAE = function () {
    
     if(document.getElementById(this.className))
        {
            document.getElementById(this.className).remove();
        }
    
    
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
    this.element.setAttribute("id", this.className);
    document.body.appendChild(this.element);
    this.asset = null;
    this.assetId = 0;
    this.counter = 0;
    if (this.assetId !== this.html.id)
        this.attachAsset(this.html.id, this.template);
    
    
    if(this.hsl)
        {
                var video = document.getElementById('myFullScreenVideo');
                if (Hls.isSupported()) {
                  //console.log("HSL Support Full Screen");
                  var hls = new Hls();
                  hls.loadSource(this.hsl_video_url);
                  hls.attachMedia(video);
                  hls.on(Hls.Events.MANIFEST_PARSED, function() {
                     //console.log("Play Video");
                  });
                }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = self.video_url;
                        video.addEventListener('loadedmetadata', function() {
                              //  video.play();
                        });
                }
        }

    
};


FullScreenHtml.prototype.removeIFRMAE = function () {
    if (this.element)
        this.element.remove();
};

FullScreenHtml.prototype.showFullScreenVideo = function () {
    this.showIFRMAE();
    openFullscreen();
};

function closeIframe() {
    if (thatForFullScreen) {
        thatForFullScreen.removeIFRMAE();
    }

}

var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    firFirst = true;
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function fullScreenScreenController() {
    if (firFirst) {
        if (!isFullScreen) {
            isFullScreen = true;
            if(thatForFullScreen.manager)
                thatForFullScreen.manager.hideSomeButtonWhenCallFullScreen();
        } else {
            if(thatForFullScreen.manager)
                thatForFullScreen.manager.showSomeButtonWhenCallFullScreenClose();
            isFullScreen = false;
            firFirst = false;
            if (thatForFullScreen) {
                thatForFullScreen.removeIFRMAE();
                if (document.getElementById(thatForFullScreen.className)) {
                    document.getElementById(thatForFullScreen.className).remove();
                }
                
            }
        }
    }
}

document.addEventListener("fullscreenchange", function () {
    fullScreenScreenController();
});

document.addEventListener("mozfullscreenchange", function () {
    fullScreenScreenController();
});

document.addEventListener("webkitfullscreenchange", function () {
    fullScreenScreenController();
});

document.addEventListener("msfullscreenchange", function () {
    fullScreenScreenController();
});

 
  

 
  
 