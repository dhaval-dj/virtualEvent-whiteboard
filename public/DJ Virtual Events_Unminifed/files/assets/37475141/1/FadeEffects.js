var FadeEffects = pc.createScript('fadeEffects');
 

FadeEffects.prototype.initialize = function() {
    this.isShow=false;
};
 
FadeEffects.prototype.update = function(dt) {
     if(this.isShow)
         {
              this.alpha += 2*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
             this.entity.element.opacity=this.value;
             
         }else{
              this.alpha += 2*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
             this.entity.element.opacity=this.value;
         }
};

FadeEffects.prototype.show = function() {
     this.isShow=true;
      this.alpha = 0;
    this.start = 0;
    this.end = 1;
};
 
FadeEffects.prototype.hide = function() {
     this.isShow=false;
      this.alpha = 0;
    this.start = 1;
    this.end = 0;
};
 
 