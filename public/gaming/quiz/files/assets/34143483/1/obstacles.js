var Obstacles = pc.createScript('obstacles');



Obstacles.prototype.initialize = function() {
    this.obstacleArray=[];
    
    for(var i=0;i<this.entity.children.length;i++){
        this.obstacleArray.push(this.entity.children[i]);
    }
};


Obstacles.prototype.update = function(dt) {
    
};

Obstacles.prototype.updateObstacle=function(){
    
    var r=pc.math.random(0,this.obstacleArray.length);
    r=Math.floor(r);
    
    for(var i=0;i<this.obstacleArray.length;i++){
        this.obstacleArray[i].enabled=false;
    }
    this.obstacleArray[r].enabled=true;
};

 