var CameraSizeController = pc.createScript('cameraSizeController');

// initialize code called once per entity
CameraSizeController.prototype.initialize = function() {
    var self = this;
     var onWindowResize = function () {
        self._checkAspectRatio();
    };

    window.addEventListener('resize', onWindowResize, false);

    this._checkAspectRatio();
};

// update code called every frame
CameraSizeController.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// CameraSizeController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
// 
 CameraSizeController.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    // Match the axis of FOV to match the aspect ratio of the canvas so
    // the focused entities is always in frame
    this.entity.camera.horizontalFov = height > width;
};