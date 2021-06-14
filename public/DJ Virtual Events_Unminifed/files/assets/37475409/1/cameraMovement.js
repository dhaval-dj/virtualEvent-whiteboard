// var CameraMovement = pc.createScript('cameraMovement');

// CameraMovement.attributes.add('camera', { type: 'entity', });
// CameraMovement.attributes.add('moveValue', { type: 'number' });
// CameraMovement.attributes.add('camSpeed', { type: 'number',default:2 });

// CameraMovement.attributes.add('moveLeft', { type: 'entity', });
// CameraMovement.attributes.add('moveRight', { type: 'entity', });

// CameraMovement.prototype.initialize = function() {
    
//     var self=this;
    
//     this.currentCamPos=this.camera.getPosition();
//     this.currentPos=0;
//     this.alpha = 0;
//     this.start = 0;
//     this.end = 0;

    
//     this.moveLeft.element.on('click', function (evt) {
//         this.currentPos++;
//         if (this.currentPos > 1)
//             this.currentPos = 1;

//         if (this.currentPos === 0) {
//             this.end = 0;
//         } else {
//             this.end = -this.moveValue;
//         }

//         this.start = this.camera.getPosition().x;
//         this.alpha = 0;
//     }, this);
    
    
//     this.moveRight.element.on('click', function (evt) {
//         this.currentPos--;
//         if (this.currentPos < -1)
//             this.currentPos = -1;

//         if (this.currentPos === 0) {
//             this.end = 0;
//         } else {
//             this.end = this.moveValue;
//         }

//         this.start = this.camera.getPosition().x;
//         this.alpha = 0;
//     }, this);
    
    
//     this.app.on('hideLeftRightArrow', function () {
//         self.moveLeft.enabled=false;
//         self.moveRight.enabled=false;
//     });
    
//     this.app.on('showLeftRightArrow', function () {
//         self.moveLeft.enabled=true;
//         self.moveRight.enabled=true;
//     });
    
//      this.app.on('keepCameraCenter', function () {
//          var currentCamPos=self.camera.getPosition();
//         currentCamPos.x = 0;
//         self.camera.setPosition(currentCamPos);
//          self.alpha=1;
//          self.value=1;
//          self.start=1; 
//          self.end=0;
//          this.currentPos=0;
//     });
    
// };

// CameraMovement.prototype.update = function(dt) {
    
//     this.alpha += this.camSpeed * dt;
//     this.value = pc.math.lerp(this.start, this.end, this.alpha);
//     var currentCamPos=this.camera.getPosition();
//     currentCamPos.x = this.value;
//     this.camera.setPosition(currentCamPos);
// };


var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('camera', { type: 'entity', });
CameraMovement.attributes.add('moveValue', { type: 'number' });
CameraMovement.attributes.add('camSpeed', { type: 'number', default: 2 });

CameraMovement.attributes.add('moveLeft', { type: 'entity', });
CameraMovement.attributes.add('moveRight', { type: 'entity', });

CameraMovement.prototype.initialize = function () {

    var self = this;

    this.currentCamPos = this.camera.getPosition();
    this.currentPos = 0;
    this.alpha = 0;
    this.start = 0;
    this.end = 0;

    this.maxLimit = 1.2;
    this.moveValue = 1.47;

    self.orientChange();
    window.addEventListener("orientationchange", function () {
        self.orientChange();
    });
    window.addEventListener("resize", function () {
        self.orientChange();
    });
    this.canInteract = true;

    // var detector = new MobileDetect(window.navigator.userAgent);
    // if(!detector.phone())
    // {
    //     maxLimit = 2.5;
    //     this.moveValue = 1.47;
    // }

    this.moveLeft.element.on('click', function (evt) {

        if (this.canInteract) {
            this.canInteract = false;
            if (this.camera.getPosition().x - this.moveValue >= (-1 * this.maxLimit)) {
                this.end = this.camera.getPosition().x - this.moveValue;
            }
            this.start = this.camera.getPosition().x;
            this.alpha = 0;
            var self = this;
            setTimeout(function () {
                self.canInteract = true;
            }, 300);
        }

    }, this);


    this.moveRight.element.on('click', function (evt) {
        if (this.canInteract) {
            if (this.camera.getPosition().x + this.moveValue <= this.maxLimit) {
                this.end = this.camera.getPosition().x + this.moveValue;
            }

            this.start = this.camera.getPosition().x;
            this.alpha = 0;
            var self = this;
            setTimeout(function () {
                self.canInteract = true;
            }, 300);
        }
    }, this);


    this.app.on('hideLeftRightArrow', function () {
        self.moveLeft.enabled = false;
        self.moveRight.enabled = false;
    });

    this.app.on('showLeftRightArrow', function () {
        self.moveLeft.enabled = true;
        self.moveRight.enabled = true;
    });

    this.app.on('keepCameraCenter', function () {
        var currentCamPos = self.camera.getPosition();
        currentCamPos.x = 0;
        self.camera.setPosition(currentCamPos);
        self.alpha = 1;
        self.value = 1;
        self.start = 1;
        self.end = 0;
        this.currentPos = 0;
    });
};

CameraMovement.prototype.update = function (dt) {

    this.alpha += this.camSpeed * dt;
    this.value = pc.math.lerp(this.start, this.end, this.alpha);
    var currentCamPos = this.camera.getPosition();
    currentCamPos.x = this.value;
    this.camera.setPosition(currentCamPos);
};

CameraMovement.prototype.orientChange = function () {
    this.app.fire("keepCameraCenter");
    // if(screen.width > 1800)
    // {
    //     this.camera.camera.orthoHeight = 4.7;
    //     this.maxLimit = 1.2;
    // console.log("condifton: 1" , screen.width, screen.availWidth);

    // }
    // else if(screen.width > 1200)
    // {
    //     this.camera.camera.orthoHeight = 4.7;
    // console.log("condifton: 2", screen.width, screen.availWidth);
    //      this.maxLimit = 4.2;
    // }
    // else if(screen.width > 800)
    // {
    //      this.camera.camera.orthoHeight = 4.7;
    // console.log("condifton: 3" , screen.width);
    //      this.maxLimit = 4.7;
    // }else 
    // {
    //     this.camera.camera.orthoHeight = 6;
    // console.log("condifton: 4" , screen.width);
    //     this.maxLimit = 7;
    // }         
  
    if (window.innerWidth >= 1920) {
        this.maxLimit = 0;
        this.moveValue = 1.20;
       // console.log("condifton: 1", window.innerWidth);
    }
    else if (window.innerWidth >= 1440 && window.innerWidth < 1920) {
        this.maxLimit = 3;
        this.moveValue = 1.2;
       // console.log("condifton: 2", window.innerWidth);
    }
    else if (window.innerWidth >= 1280  && window.innerWidth < 1440) {
        this.maxLimit = 2.0;
        this.moveValue = 1.40;
       // console.log("condifton: 3", window.innerWidth);
    }
    else if (window.innerWidth >= 1024  && window.innerWidth < 1280) {
        this.maxLimit = 5.0;
        this.moveValue = 1.40;
       // console.log("condifton: 4", window.innerWidth);
    }
    else if (window.innerWidth >= 768  && window.innerWidth < 1024) {
        this.maxLimit = 8.4;
        this.moveValue = 1.80;
        //console.log("condifton: 5", window.innerWidth);
    }
    else if (window.innerWidth >= 425  && window.innerWidth < 768) {
        this.maxLimit = 10;
        this.moveValue = 1.80;
        //console.log("condifton: 6", window.innerWidth);
    }
    else if (window.innerWidth >= 320  && window.innerWidth < 425) {
        this.maxLimit = 9.0;
        this.moveValue = 1.40;
       // console.log("condifton: 7", window.innerWidth);
    }
};
