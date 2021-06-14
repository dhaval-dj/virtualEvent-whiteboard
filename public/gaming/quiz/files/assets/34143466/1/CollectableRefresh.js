var CollectableRefresh = pc.createScript('collectableRefresh');

// initialize code called once per entity
CollectableRefresh.prototype.initialize = function() {
     this.obstacleArray=[];
    
    for(var i=0;i<this.entity.children.length;i++){
        this.obstacleArray.push(this.entity.children[i]);
    }
};

// update code called every frame
CollectableRefresh.prototype.update = function(dt) {
    
};

CollectableRefresh.prototype.updateCollection=function(){
    
    var r=pc.math.random(0,this.obstacleArray.length);
    r=Math.floor(r);
    
    for(var i=0;i<this.obstacleArray.length;i++){
        this.obstacleArray[i].enabled=false;
    }
    this.obstacleArray[r].enabled=true;
};

 