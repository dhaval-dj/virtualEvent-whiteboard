var ChildEnableDisable = pc.createScript('childEnableDisable');

ChildEnableDisable.attributes.add('turnOnEvent',{type:"string"});
ChildEnableDisable.attributes.add('turnOffEvent',{type:"string"});

/*ChildEnableDisable.attributes.add('child', {
    type: 'entity',
    array: true
});*/

ChildEnableDisable.prototype.initialize = function() {
    var self=this;
    
    this.app.on(this.turnOnEvent, function(){
        self.showAllChild(true);
        console.log('Hello asas');
    });
    
    this.app.on(this.turnOffEvent, function(){
        self.showAllChild(false);
    });
};

ChildEnableDisable.prototype.update = function(dt) {
    
};

ChildEnableDisable.prototype.showAllChild = function(isEnable) {
    for(var i=0;i<this.entity.children.length;i++){
        this.entity.children[i].enabled=isEnable;
    }
};
