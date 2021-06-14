var Spin = pc.createScript('spin');

//Spin.attributes.add("speed",{type:'number',default:-40});
// Spin.attributes.add("collectables",{type:'entity',array:true});

// initialize code called once per entity
Spin.prototype.initialize = function() {
    this.speed=130;
    
};

// update code called every frame
Spin.prototype.update = function(dt) {
    // for(var i=0;i<this.collectables.length;i++){
      //  this.entity.setLocalEulerAngles(0,this.entity.getLocalEulerAngles().y+dt*this.speed,0);
    //this.entity.rotate(0, this.dx, 0);
   // this.entity.rotate(0,dt*this.speed,0);
    // }
};

// swap method called for script hot-reloading
// inherit your script state here
// Spin.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/