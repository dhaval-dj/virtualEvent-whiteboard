var ScreenFadeEfx = pc.createScript('screenFadeEfx');

ScreenFadeEfx.prototype.initialize = function() {
    this.isShow=false;
    this.callEvent=false;
    this.eventName='';
};
 
ScreenFadeEfx.prototype.update = function(dt) {
     if(this.isShow)
         {
              this.alpha += 2*dt;
            this.value = pc.math.lerp(this.start, this.end, this.alpha);
             if(this.value)
             {
                 this.entity.element.opacity=this.value;
                 if(this.callEvent && this.value===1){
                     this.callEvent=false;
                     this.app.fire(this.eventName);//sceneManager.js Pass by var so may change
                 }    
             }
         }else{
              this.alpha += 2*dt;
            
             this.value = pc.math.lerp(this.start, this.end, this.alpha);
            if(this.value){
             this.entity.element.opacity=this.value;
                 if(this.callEvent && this.value===1){
                     this.callEvent=false;  
                 }   
            }
             
         }
};

ScreenFadeEfx.prototype.show = function(evnt) {
    this.isShow=true;
    this.callEvent=true;
    this.eventName=evnt;
    
    this.value=0;
    this.alpha = 0;
    this.start = 0;
    this.end = 1;
};

 
ScreenFadeEfx.prototype.hide = function() {
    this.isShow=false;
    
    this.alpha = 0;
    this.start = 1;
    this.end = 0;
};
 
ScreenFadeEfx.prototype.isShowing = function() {
   return this.isShow;
};