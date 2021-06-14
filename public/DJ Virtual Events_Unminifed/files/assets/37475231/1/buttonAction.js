var ButtonAction = pc.createScript('buttonAction');

ButtonAction.attributes.add('popUp', { type: 'entity', });

ButtonAction.attributes.add('buttonIcon', { type: 'entity', });

ButtonAction.attributes.add('default', { type: 'rgba' });
ButtonAction.attributes.add('selected', { type: 'rgba' });


ButtonAction.prototype.initialize = function() {
    if(!this.buttonIcon){
        this.buttonIcon=this.entity;
    }
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);
    this.hover=false;
};
 
ButtonAction.prototype.update = function(dt) {
    
    if(this.hover){
        if(this.popUp)
            this.popUp.enabled=true;
    }else{
        if(this.popUp)
            this.popUp.enabled=false;
    }
    
    
};
 

ButtonAction.prototype.onEnter = function (event) {
    this.hover=true;
     this.buttonUpdate();
};

ButtonAction.prototype.onLeave = function (event) {
    this.hover=false;
     this.buttonUpdate();
};


ButtonAction.prototype.onRelease = function (event) {
    this.hover=false;
     this.buttonUpdate();
};

ButtonAction.prototype.buttonUpdate = function () {
   if(this.buttonIcon){
        if(this.hover){
            this.buttonIcon.element.color = this.selected;
        }else{
            this.buttonIcon.element.color = this.default;
        }
    }else{
        if(this.hover){
            this.buttonIcon.element.color = this.selected;
        }else{
            this.buttonIcon.element.color = this.default;
        }
    }
};

ButtonAction.prototype.isHover = function (event) {
   return this.hover;
};