var OpacityAnimation = pc.createScript('opacityAnimation');

OpacityAnimation.attributes.add('loop', {type: 'boolean',default:true});
OpacityAnimation.attributes.add('speed', {type: 'number',default:0.3});
OpacityAnimation.attributes.add('loopInterval', {type: 'number',default:500});
OpacityAnimation.attributes.add('onlyStart', {type: 'boolean',default:true});

OpacityAnimation.attributes.add('opacityStart', {type: 'number',default:1});
OpacityAnimation.attributes.add('opacityEnd', {type: 'number',default:0});
OpacityAnimation.attributes.add('rings', {type: 'entity',array:true});
OpacityAnimation.attributes.add('addEventName', {type: 'string'});
OpacityAnimation.attributes.add('tagName', {type: 'string'});

OpacityAnimation.prototype.initialize = function() {
    
    this.allRing = this.app.root.findByTag(this.tagName);
    this.rings= this.allRing;
      this.alpha = 0;
    this.start = 0;
    this.end = 0;
    this.skipFrame=2;
    // console.log(this.rings);
    if(this.rings.length===0)
        this.rings[0]=this.entity;
};

OpacityAnimation.prototype.update = function(dt) {
    this.scaleAnimation(dt);
};


OpacityAnimation.prototype.scaleAnimation = function(dt) {
    
    this.alpha += this.speed * dt;
    var value = pc.math.lerp(this.start, this.end, this.alpha);
    this.skipFrame++;
    if(this.skipFrame%2==0){
        for(var i=0;i<this.rings.length;i++){
                if(this.rings[i])
                {
                    this.rings[i].element.opacity=value;                    
                }
        }
    }
        
     
    var self=this;
 
    
    if(this.loop){
        if(value === this.end){
            
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

OpacityAnimation.prototype.StartScaleAnimation = function() {
    
    this.alpha = 0;
    this.start = this.opacityStart;
    this.end = this.opacityEnd;
    
};