var HotspotButton = pc.createScript('hotspotButton');

HotspotButton.attributes.add('html', {
    type: 'asset',
    assetType: 'html',
    title: 'HTML Asset'
});
HotspotButton.attributes.add('PhotoMosaic', {
    type: 'boolean',
    title: 'IsPhotoMosaic'
});
HotspotButton.attributes.add('RunnerGame', {
    type: 'boolean',
    title: 'IsRunnerGame'
});
HotspotButton.attributes.add('MeetTheTeam', {
    type: 'boolean',
    title: 'IsMeetTheTeam'
});
HotspotButton.attributes.add('PhotoMosaicTakePhoto', {
    type: 'boolean',
    title: 'IsPhotoMosaicTakePhoto'
});
HotspotButton.attributes.add('SocialWall', {
    type: 'boolean',
    title: 'IsSocialWall'
});

HotspotButton.attributes.add('useCustomURLParam', {
    type: 'boolean',
    title: 'useCustomURLParam'
});
HotspotButton.attributes.add('customURLParam', {
    type: 'string',
    title: 'customURLParam'
});
//HotspotButton.attributes.add('PhotoMosaic', {type: 'boolean',  title: 'IsPhotoMosaic'});
HotspotButton.attributes.add('eventName', {
    type: 'string',
    title: 'eventNameForCallThis'
});

HotspotButton.prototype.initialize = function () {
    var self = this;
    //for getting userName form reactConnector
    if (window.ReactHomeManager && this.useCustomURLParam) {
        var realUserParam = "userName=" + (window.ReactHomeManager.context.currentUser.displayName ?
            (window.ReactHomeManager.context.currentUser.displayName) : "unknown");

        this.customURLParam = realUserParam;
    }

    this.entity.element.on('click', function (evt) {
        this.openHTMLIframe();
    }, this);

    this.app.on(this.eventName, function (callback) {
        self.openHTMLIframe();
    });

};

HotspotButton.prototype.openHTMLIframe = function () {
    this.app.fire('pausesound');
    if (this.useCustomURLParam) {
        this.app.fire('openThisStallHotspot', this.html, this.customURLParam); //htmlManager.js                 
    } else {
        this.app.fire('openThisStallHotspot', this.html); //htmlManager.js             
    }


    if (window.ReactHomeManager) {
        if (this.PhotoMosaic) {
            //console.log("photo mosaic");
            window.ReactHomeManager.user_AnalyticsHandler("PhotoMosaic", "Enter");
        } else if (this.RunnerGame) {
            //console.log("runner game");
            window.ReactHomeManager.user_AnalyticsHandler("RunnerGame", "Enter");
        }
        // else if(this.SocialWall)
        //    {
        //        //console.log("Social Wall");
        //        window.FirebaseObj.user_AnalyticsHandler("SocialWall", "enter");
        //    } 
    }
};




HotspotButton.prototype.openIframe = function () {
    if (this.useCustomURLParam) {
        this.app.fire('openThisStallHotspot', this.html, this.customURLParam); //htmlManager.js                 
    } else {
        this.app.fire('openThisStallHotspot', this.html); //htmlManager.js             
    }
};