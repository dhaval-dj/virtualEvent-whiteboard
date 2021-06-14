var IconChanger = pc.createScript('iconChanger');


IconChanger.attributes.add('buttonIcon', { type: 'entity', });

IconChanger.attributes.add('iconOn', {
    type: 'asset', 
    assetType: 'texture',
});

IconChanger.attributes.add('iconOff', {
    type: 'asset', 
    assetType: 'texture',
});


IconChanger.prototype.initialize = function() {

    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);
    this.hover=false;
     this.isMute=true;
    var self=this;
    
     this.app.on('playSound', function(){
        self.tunOnSound();
    });
    
    this.app.on('stopSound', function(){
        self.tunOffSound();
    });
    
};
 
IconChanger.prototype.update = function(dt) {
    
    if(this.isMute){
       var texture = this.iconOn.resource;
        this.buttonIcon.element.texture=texture;
        this.buttonIcon.element.texture.upload();
    }else{
        var texture = this.iconOff.resource;
        this.buttonIcon.element.texture=texture;
        this.buttonIcon.element.texture.upload();
    }
    
        
    
     this.buttonUpdate();
};
 

IconChanger.prototype.onEnter = function (event) {
    this.hover=true;
};

IconChanger.prototype.onLeave = function (event) {
   
    this.hover=false;
};

 

IconChanger.prototype.onRelease = function (event) {
   
    this.hover=false;

};

IconChanger.prototype.buttonUpdate = function () {
   if(this.buttonIcon){
        if(!this.hover){
                 this.buttonIcon.element.color = new pc.Color(202/255, 202/255, 202/255);
        }else{
            this.buttonIcon.element.color = new pc.Color(21/255, 39/255, 104/255);
      
            
          
        }
    }else{
        if(!this.hover){
          this.buttonIcon.element.color = new pc.Color(202/255, 202/255, 202/255);
            
        }else{
            
            this.buttonIcon.element.color = new pc.Color(21/255, 39/255, 104/255);
        }
    }
};

IconChanger.prototype.isHover = function (event) {
   return this.hover;
};

IconChanger.prototype.tunOnSound = function () {
   this.isMute=true;
        var texture = this.iconOff.resource;
        this.buttonIcon.element.texture=texture;
        this.buttonIcon.element.texture.upload();
};

IconChanger.prototype.tunOffSound = function () {
   this.isMute=false;
     
};
