var OpenNewTab = pc.createScript('openNewTab');

OpenNewTab.attributes.add('link', {type:'string', default: ""});
OpenNewTab.attributes.add('hotspotId', { type: 'number',default: 1});

// initialize code called once per entity
OpenNewTab.prototype.initialize = function() {
     this.isClicked = false;
    this.entity.element.on('click', function (evt) {
        
        if(window.ReactHomeManager)
        {
            if(window.ReactHomeManager.getLobbyStallLinks)
            {
                this.link = window.ReactHomeManager.getLobbyStallLinks(this.hotspotId);
            }
            else if(window.ReactHomeManager.getLorealboothLink)
            {
                this.link = window.ReactHomeManager.getLorealboothLink();
            }
        }
         console.log("OPne New tab", this.entity.name);
        this.isClicked = true;
        setTimeout(()=>
        {
            this.isClicked = false;
        }, 200);
        window.open(this.link);
    }, this);
};
