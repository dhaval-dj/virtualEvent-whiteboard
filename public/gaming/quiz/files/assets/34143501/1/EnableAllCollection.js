var EnableAllCollection = pc.createScript('enableAllCollection');

// initialize code called once per entity
EnableAllCollection.prototype.initialize = function() {
     this.obstacleArray=[];
    for(var i=0;i<this.entity.children.length;i++){
        this.obstacleArray.push(this.entity.children[i]);
    }
};

EnableAllCollection.prototype.updateAll = function() {
    for(var i=0;i<this.obstacleArray.length;i++){
        this.obstacleArray[i].enabled=true;
    }
};

