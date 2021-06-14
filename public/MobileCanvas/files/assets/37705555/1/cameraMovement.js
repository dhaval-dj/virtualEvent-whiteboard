var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('camera', { type: 'entity', });
CameraMovement.attributes.add('moveValue', { type: 'number' });
CameraMovement.attributes.add('camSpeed', { type: 'number',default:2 });

CameraMovement.attributes.add('moveLeft', { type: 'entity', });
CameraMovement.attributes.add('moveRight', { type: 'entity', });

CameraMovement.prototype.initialize = function() {
    
    var self=this;
    
    this.currentCamPos=this.camera.getPosition();
    this.currentPos=0;
    this.alpha = 1;
    this.start = 0;
    this.end = 0;

    this.maxLimit = 7.5;
    
     self.orientChange();
     window.addEventListener("orientationchange", function() {
        self.orientChange();
    });
    window.addEventListener('resize', function() {
        self.orientChange();
    });
    
    // var detector = new MobileDetect(window.navigator.userAgent);
    // if(!detector.phone())
    // {
    //     maxLimit = 2.5;
    //     this.moveValue = 1.47;
    // }
    
    this.moveLeft.element.on('click', function () { 
        self.moveCameraLeft();
    }, this);
    
    
    this.moveRight.element.on('click', function () {
       self.moveCameraRight();
    }, this);
    
    this.app.on("moveCameraRight", function(){
        self.moveCameraRight();
    });
    this.app.on("moveCameraLeft", function(){
        self.moveCameraLeft();
    });

    this.app.on('hideLeftRightArrow', function () {
        self.moveLeft.enabled=false;
        self.moveRight.enabled=false;
    });
    
    this.app.on('showLeftRightArrow', function () {
        self.moveLeft.enabled=true;
        self.moveRight.enabled=true;
    });
    
     this.app.on('keepCameraCenter', function () {
         var currentCamPos=self.camera.getPosition();
        currentCamPos.x = 0;
         self.camera.setPosition(currentCamPos);
         // self.camera.setPosition(0,0,50);
         self.alpha=1;
         self.value=1;
         self.start=1; 
         self.end=0;
         this.currentPos=0;
    });
    // this.app.fire('keepCameraCenter');
    console.log("camera init");
};

CameraMovement.prototype.update = function(dt) {
    
    this.alpha += this.camSpeed * dt;
    this.value = pc.math.lerp(this.start, this.end, this.alpha);
    var currentCamPos=this.camera.getPosition();
    currentCamPos.x = this.value;
    this.camera.setPosition(currentCamPos);
};

CameraMovement.prototype.orientChange = function() {
      this.app.fire("keepCameraCenter");
            // if(screen.width > 600)
            // {
            //     this.camera.camera.orthoHeight = 6;
            //     if(screen.width > 800)
            //     {
            //          this.camera.camera.orthoHeight = 4.7;
            //     }
            //     this.maxLimit = 1;
                
            // }else
            // {
            //     this.camera.camera.orthoHeight = 6;
            //     this.maxLimit = 7.5;
            // }  
              if (window.innerWidth >= 1920) {
                    this.maxLimit = 2.6;
                    this.moveValue = 1.20;
                    console.log("condifton: 1", window.innerWidth);
                }
                else if (window.innerWidth >= 1440) {
                    this.maxLimit = 3.6;
                    this.moveValue = 1.2;
                    console.log("condifton: 2", window.innerWidth);
                }
                else if (window.innerWidth >= 1280) {
                    this.maxLimit = 2.0;
                    this.moveValue = 1.40;
                    console.log("condifton: 3", window.innerWidth);
                }
                else if (window.innerWidth >= 1024) {
                    this.maxLimit = 5.0;
                    this.moveValue = 1.40;
                    console.log("condifton: 4", window.innerWidth);
                }
                else if (window.innerWidth >= 768) {
                    this.maxLimit = 8.4;
                    this.moveValue = 1.80;
                    console.log("condifton: 5", window.innerWidth);
                }
                else if (window.innerWidth >= 425) {
                    this.maxLimit = 10;
                    this.moveValue = 1.80;
                    console.log("condifton: 6", window.innerWidth);
                }
                else if (window.innerWidth >= 320) {
                    this.maxLimit = 8.2;
                    this.moveValue = 1.40;
                    console.log("condifton: 7", window.innerWidth);
                }
};


CameraMovement.prototype.moveCameraRight = function() {
    if(this.camera.getPosition().x + this.moveValue <= this.maxLimit)
    {
        this.end =this.camera.getPosition().x + this.moveValue;                
    }

    this.start = this.camera.getPosition().x;
    this.alpha = 0;
};

CameraMovement.prototype.moveCameraLeft = function() {
    if(this.camera.getPosition().x - this.moveValue >= (-1 * this.maxLimit))
    {
        this.end = this.camera.getPosition().x - this.moveValue;                
    }
    this.start = this.camera.getPosition().x;
    this.alpha = 0;
};

