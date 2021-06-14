var ObstacleHit = pc.createScript('obstacleHit');

// initialize code called once per entity
ObstacleHit.prototype.initialize = function() {
     this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
ObstacleHit.prototype.update = function(dt) {
    
};
 

ObstacleHit.prototype.onTriggerEnter = function(entity) {
   // var position = entity.getPosition();
   console.log("Hit");
    if(entity.tags.has('player'))
    {
        this.manager=this.app.root.findByName('Gamemanager').script.gamemanager;
        this.manager.gameOver();
/*        var efx=this.effect.clone();
        this.app.root.addChild(efx);
        efx.setPosition(this.entity.getPosition());
        efx.enabled=true;
        this.manager.addGift();
        this.manager.placeGift();
        this.entity.destroy();*/
    
    }
};
