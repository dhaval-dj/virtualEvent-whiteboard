var EvetFireButtonMultiOption = pc.createScript('evetFireButtonMultiOption');
EvetFireButtonMultiOption.attributes.add('eventName', {type: 'string',description: 'call this event when you press'});
EvetFireButtonMultiOption.attributes.add('breakoutname', {type: 'string',description: 'call this event when you press'});

EvetFireButtonMultiOption.prototype.initialize = function() {
     var self = this;
    this.isActive=true;
    this.entity.element.on('click', function (evt) {
         if(window.canvasManager)
        {
            if(window.canvasManager.isCanvasPaused)
            {
                return;
            }
        }
        if(self.isActive){
                 self.app.fire(self.eventName,self.breakoutname);          
        }
   
    }, this);
};

EvetFireButtonMultiOption.prototype.activeButton = function(act) {
    this.isActive=act;
};
 
 