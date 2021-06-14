var EventFireButton = pc.createScript('eventFireButton');

EventFireButton.attributes.add('eventName', {type: 'string',description: 'call this event when you press'});

EventFireButton.prototype.initialize = function() {
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
                 self.app.fire(self.eventName);
            // console.log('Hi');
        }
   
    }, this);
};

EventFireButton.prototype.activeButton = function(act) {
    this.isActive=act;
};
 
 