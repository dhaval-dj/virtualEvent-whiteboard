var HotspotButton = pc.createScript('hotspotButton');

HotspotButton.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
HotspotButton.attributes.add('hotspotId', { type: 'number', default: -1 });
HotspotButton.attributes.add('resourceCenterPdf', { type: 'boolean' });

HotspotButton.attributes.add('addEvent', { type: 'string' });


HotspotButton.prototype.initialize = function () {
    
    var self=this;
 
    this.app.on(this.addEvent, function (pos) {
        self.openHTMLIframeEvent();
    });
  
    
    this.entity.element.on('click', function (evt) {
        this.openHTMLIframeEvent();
    }, this);
};


HotspotButton.prototype.openIframe = function () {
    this.app.fire('openThisStallHotspot', this.html);
};

HotspotButton.prototype.openHTMLIframeEvent = function (){

    if (window.canvasManager) {
        if (window.canvasManager.isCanvasPaused) {
            return;
        }
    }

    if (window.ReactHomeManager) {
        if (this.resourceCenterPdf) {
            if (window.ReactHomeManager.getResourceCenterLinks) {
                var link = window.ReactHomeManager.getResourceCenterLinks(this.hotspotId);
                window.ReactHomeManager.UpdateAnalytics(window.ReactHomeManager.getResourceCenterName(this.hotspotId));
                if (link) {
                    this.app.fire('openThisStallHotspot', this.html, link);
                    return;
                }
            }
        } else {
           // window.ReactHomeManager.UpdateAnalytics(this.html.name);
            console.log(this.html.name);
            if (this.html.name == "Agenda") {
                if (window.ReactHomeManager.agendaLink) {
                    this.app.fire('openThisStallHotspot', this.html, window.ReactHomeManager.agendaLink);
                    return;
                }
            }
            else if (this.html.name == "photoMosaic") {
                if (window.ReactHomeManager.photomosaicLink) {
                    this.app.fire('openThisStallHotspot', this.html, window.ReactHomeManager.photomosaicLink);
                    return;
                }
            }
            else if (this.html.name == "ContactUs") {
                if (window.ReactHomeManager.contactUsLink) {
                    this.app.fire('openThisStallHotspot', this.html, window.ReactHomeManager.contactUsLink);
                    return;
                }
            }
        }

    }
    this.app.fire('openThisStallHotspot', this.html);//htmlManager.js
}

