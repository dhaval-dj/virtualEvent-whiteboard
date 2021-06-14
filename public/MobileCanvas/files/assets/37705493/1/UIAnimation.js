var Uianimation = pc.createScript('uianimation');

Uianimation.attributes.add('loop', {type: 'boolean'});
Uianimation.attributes.add('local', {type: 'boolean',default:true});
Uianimation.attributes.add('scale', {type: 'boolean'});
Uianimation.attributes.add('position', {type: 'boolean'});
Uianimation.attributes.add('opacity', {type: 'boolean'});

Uianimation.attributes.add('speed', {type: 'number'});
Uianimation.attributes.add('loopInterval', {type: 'number'});
Uianimation.attributes.add('onlyStart', {type: 'boolean'});

Uianimation.attributes.add('scaleStart', {type: 'number'});
Uianimation.attributes.add('scaleEnd', {type: 'number'});

Uianimation.attributes.add('positionStart', {type: 'number'});
Uianimation.attributes.add('positionEnd', {type: 'number'});

Uianimation.attributes.add('opacityStart', {type: 'number'});
Uianimation.attributes.add('opacityEnd', {type: 'number'});


Uianimation.prototype.initialize = function() {
    this.alpha = 0;
    this.start = 0;
    this.end = 0;
    
    this.alphaScale = 0;
    this.startScale = 0;
    this.endScale = 0;
    
    this.alphaPos = 0;
    this.startPos = 0;
    this.endPos = 0;
    
    this.alphaOpacity = 0;
    this.startOpacity = 0;
    this.endOpacity = 0;

};

Uianimation.prototype.update = function(dt) {
   
    if(this.scale){
        this.scaleAnimation(dt);
    }
    
    if(this.position){
        this.positionAnimation(dt);
    }
    
    if(this.opacity){
        this.opacityAnimation(dt);
    }
    
};

Uianimation.prototype.scaleAnimation = function(dt) {
    
    this.alphaScale += this.speed * dt;
    var value = pc.math.lerp(this.startScale, this.endScale, this.alphaScale);
    
    
         var scl= this.entity.getLocalScale(); 
         scl.x=value;
         scl.y=value;
         scl.z=value;
         this.entity.setLocalScale(scl); 
     
    var self=this;
    
    if(this.loop){
        if(value===this.endScale){
            
            if(this.onlyStart){
                 setTimeout(function(){
                    self.StartScaleAnimation();
                },self.loopInterval);
                this.onlyStart=false;
            }else{
               self.StartScaleAnimation();
            }
            
           
            
        }
    }
};

Uianimation.prototype.positionAnimation = function(dt) {
    
    this.alphaPos += this.speed * dt;
    var value = pc.math.lerp(this.startPos, this.endPos, this.alphaPos);
    
    if(this.local){
         var pos= this.entity.getLocalPosition(); 
         pos.x=value;
         pos.y=value;
         pos.z=value;
         this.entity.setLocalPosition(pos); 
    }else{
         var pos= this.entity.getPosition(); 
         pos.x=value;
         pos.y=value;
         pos.z=value;
         this.entity.setPosition(pos); 
    }
    
     var self=this;
    
    if(this.loop){
        if(value===this.endScale){
            
            if(this.onlyStart){
                 setTimeout(function(){
                    self.positionAnimation();
                },self.loopInterval);
                this.onlyStart=false;
            }else{
                self.positionAnimation();
            }
            
            
        }
    }
    
};

Uianimation.prototype.opacityAnimation = function(dt) {
    
    this.alphaOpacity += this.speed * dt;
    var value = pc.math.lerp(this.startOpacity, this.endOpacity, this.alphaOpacity);
    
    this.entity.element.opacity=value;
     
     var self=this;
    
    if(this.loop){
        if(value===this.endOpacity){
            
            if(this.onlyStart){
                setTimeout(function(){
               self.StartOpacityAnimation();
                },self.loopInterval);
                this.onlyStart=false;
            }else{
                 self.StartOpacityAnimation();
            }
            
            
            
        }
    }
};


Uianimation.prototype.StartScaleAnimation = function() {
    
    this.alphaScale = 0;
    this.startScale = this.scaleStart;
    this.endScale = this.scaleEnd;
    
};

Uianimation.prototype.StartPositionAnimation = function() {
    
    this.alphaPos = 0;
    this.startPos = this.positionStart;
    this.endPos = this.positionEnd;
    
};

Uianimation.prototype.StartOpacityAnimation = function() {
    
    this.alphaOpacity = 0;
    this.startOpacity = this.opacityStart;
    this.endOpacity = this.opacityEnd;
    
};
