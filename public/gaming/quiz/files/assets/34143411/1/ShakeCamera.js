var ShakeCamera = pc.createScript('shakeCamera');


ShakeCamera.prototype.initialize = function() {
    
    this.alpha = 0;
    this.start = 0;
    this.end = 0.5;
    
    this.state=0;
    this.doOnce=false;
    this.speed=0;
    this.value=0;
    this.loop=4;
    this.loopCount=0;
    
    this.startShake=false;
};

ShakeCamera.prototype.update = function(dt) {
    
    if(!this.startShake)
        return;
    
    switch(this.state){
            case 0:{
                if(!this.doOnce){
                    this.doOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = 0.5;
                    this.speed=12;
                }
                
                this.alpha += this.speed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                    this.doOnce=false;
                    this.state=1;
                }
            break;
        }
        case 1:{
                if(!this.doOnce){
                    this.doOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = -0.5;
                    this.speed=12;
                }
                
                this.alpha += this.speed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
               var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                    this.doOnce=false;
                    this.state=2;
                }
            break;
        } 
        case 2:{
                if(!this.doOnce){
                    this.doOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = 0.4;
                    this.speed=12;
                }
                
                this.alpha += this.speed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                    this.doOnce=false;
                    this.state=3;
                }
            break;
        }
        case 3:{
                if(!this.doOnce){
                    this.doOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = -0.3;
                    this.speed=12;
                }
                
                this.alpha += this.speed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
               var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                    this.doOnce=false;
                    this.state=4;
                }
            break;
        }
       case 4:{
                if(!this.doOnce){
                    this.doOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = 0;
                    this.speed=12;
                }
                
                this.alpha += this.speed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                    this.doOnce=false;
                    if(this.loopCount==this.loop)
                        this.state=5;
                    else
                        this.loopCount++;
                }
            break;
        }
        case 5:{
            this.startShake=false;
            break;
        }    
    }
    
    this.entity.setLocalPosition(this.value,this.entity.getLocalPosition().y,this.entity.getLocalPosition().z);
};

ShakeCamera.prototype.shakeTheCamera=function(){
    this.alpha = 0;
    this.start = 0;
    this.end = 0.5;
    
    this.state=0;
    this.doOnce=false;
    this.speed=0;
    this.value=0;
    this.loop=2;
    this.loopCount=0;
    
    this.startShake=true;
};
