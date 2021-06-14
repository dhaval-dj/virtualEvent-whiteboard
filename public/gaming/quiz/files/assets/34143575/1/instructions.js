var Instructions = pc.createScript('instructions');

Instructions.attributes.add('speed', {type: 'number'});
Instructions.attributes.add('Start', {type: 'entity'});
Instructions.attributes.add('textures', {
    type: 'asset', 
    assetType: 'texture',
    array: true
});


Instructions.prototype.initialize = function() {
    var self=this;
    this.id=0;
    this.Start.enabled=false;
    setInterval(function(){
         var texture = self.textures[self.id].resource;
        self.entity.element.texture=texture;
        self.entity.element.texture.upload();
        
        self.id++;
        
        if(self.id >= self.textures.length){
            self.id=0;
            self.Start.enabled=true;
            clearInterval(this);
        }
    },self.speed*1000);
};

Instructions.prototype.update = function(dt) {
    
};

