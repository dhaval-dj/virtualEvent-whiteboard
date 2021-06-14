var Collectable = pc.createScript('collectable');

// initialize code called once per entity
Collectable.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.manager=this.app.root.findByName('Gamemanager').script.gamemanager;
    this.backStageActors=this.app.root.findByName('Back stage Actors').script.backStageActors;
    
    this.GetMyModelFromBackActors();
};

// update code called every frame
Collectable.prototype.update = function(dt) {
    
};

Collectable.prototype.onTriggerEnter = function(entity) {
    if(entity.tags.has('player'))
    {
        this.manager.addScore();
        this.entity.enabled=false;
    }
    if(entity.tags.has('GameOver'))
    {
        console.log("In Obstracle");
        this.entity.enabled=false;
    }
};


Collectable.prototype.GetMyModelFromBackActors = function(entity) {
    this.entity.model.enabled=false;
    
    //Taking New Model
    let newModel=this.backStageActors.GiveAModel().clone();
    //Adding as Child
    this.entity.addChild(newModel);
    newModel.setLocalPosition(0,0,0);
    newModel.setLocalScale(12,12,12);
    newModel.enabled=true;
};
