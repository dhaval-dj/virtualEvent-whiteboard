var Position = pc.createScript('position');

Position.attributes.add("name", {type:"string"});

Position.attributes.add("eventName", {type:"string"});//topLeft bottomLeft topRight

Position.attributes.add("cameraEntity", {type:"entity"});

// initialize code called once per entity
Position.prototype.initialize = function() {
    this.called = true;
    var self = this;
    this.app.on("resetVimeoPosition", function(){
        self.called = false;
        // console.log("changed");
    });
    setTimeout(function(){
        self.called = false;
    }, 100);
};

// update code called every frame
Position.prototype.postUpdate = function(dt) {
    if(!this.called)
    {
        this.position3d = this.entity.getPosition();
        var newpos = this.cameraEntity.camera.worldToScreen(this.position3d);
        // console.log("pos for :"+this.name);
       //  console.log(newpos);        
        this.called = true;
        this.app.fire(this.eventName, newpos);
        // console.log("sending event");
    }
};
