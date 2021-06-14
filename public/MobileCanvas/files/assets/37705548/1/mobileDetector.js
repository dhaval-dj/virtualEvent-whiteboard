var MobileDetector = pc.createScript('mobileDetector');

MobileDetector.attributes.add("sceneManager", {type: "entity"});
MobileDetector.attributes.add("cameraEntity", {type: "entity"});

var mobileDetectorInstance;
// initialize code called once per entity
MobileDetector.prototype.initialize = function() {
    mobileDetectorInstance = this;
    
    var detector = new MobileDetect(window.navigator.userAgent);    
    this.isMobile = detector.phone();
    
    if(detector.phone())
    {
        this.sceneManager.script.sceneManager.forReact = true;
        this.cameraEntity.camera.orthoHeight = 6;
    }else
    {
        this.sceneManager.script.sceneManager.forReact = false;
        this.cameraEntity.camera.orthoHeight = 4.7;
        this.entity.script.reactConnector.skipTutorial = false;
        console.log(this.entity.script.reactConnector.skipTutorial +": skip");
        //turn on tutorial--in react connector script
        //camera side distance -- in camera scrippt
    }
    console.log(this.cameraEntity.camera.orthoHeight);
};

MobileDetector.prototype.update = function(dt) {
    
};

// console.log( "Phone: " + detector.phone());
// console.log( "Tablet: " + detector.tablet());
// console.log( "OS: " + detector.os());
// console.log( "userAgent: " + detector.userAgent());


