var StallEnter = pc.createScript('stallEnter');

StallEnter.attributes.add('stallsId', {
    type: 'number',
});
StallEnter.prototype.initialize = function() {
    var self = this;
    this.entity.element.on('click', function (evt) {
        self.app.fire('showStall',self.stallsId);//->stallManager.js
        //console.log('Hello Stall');
    }, this);
};

// update code called every frame
StallEnter.prototype.update = function(dt) {
    
};
