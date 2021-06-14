var RingAnimation = pc.createScript('ringAnimation');

RingAnimation.attributes.add('loop', {type: 'boolean',default: true});
RingAnimation.attributes.add('speed', {type: 'number',default:0.3});
RingAnimation.attributes.add('loopInterval', {type: 'number',default:500});
RingAnimation.attributes.add('onlyStart', {type: 'boolean',default:true});
RingAnimation.attributes.add('scaleStart', {type: 'number',default:0.1});
RingAnimation.attributes.add('scaleEnd', {type: 'number',default:0.3});
RingAnimation.attributes.add('rings', {type: 'entity',array:true});

RingAnimation.prototype.initialize = function() {
      this.alphaScale = 0;
    this.startScale = 0;
    this.endScale = 0;
    if(this.rings.length===0)
        this.rings[0]=this.entity;
        
     var scl= this.entity.getLocalScale(); 
         scl.x=0;
         scl.y=0;
         scl.z=0;
        for(var i=0;i<this.rings.length;i++){
            if(this.rings[i]){
                 if(this.rings[i].enabled)
                    this.rings[i].setLocalScale(scl); 
            }
           
        }
    
    this.skipFrame=2;
    
     
};

RingAnimation.prototype.update = function(dt) {
    this.scaleAnimation(dt);
};


RingAnimation.prototype.scaleAnimation = function(dt) {
    
    this.alphaScale += this.speed * dt;
    var value = pc.math.lerp(this.startScale, this.endScale, this.alphaScale);
    
    
        this.skipFrame++;
    if(this.skipFrame%2==0){
         var scl= this.entity.getLocalScale(); 
         scl.x=value;
         scl.y=value;
         scl.z=value;
        for(var i=0;i<this.rings.length;i++){
             if(this.rings[i]){
                   if(this.rings[i].enabled)
                this.rings[i].setLocalScale(scl); 
             }
          
        }
        
    }
        
     
    var self=this;
    
    if(this.loop){
        if(value === this.endScale){
            
             setTimeout(function(){
                    self.StartScaleAnimation();
                    
                     if(self.onlyStart){
                        self.onlyStart=false;
                         self.loopInterval=0;
                    }
                },self.loopInterval);
            
           
        }
    }
};

RingAnimation.prototype.StartScaleAnimation = function() {
    
    this.alphaScale = 0;
    this.startScale = this.scaleStart;
    this.endScale = this.scaleEnd;
    
};