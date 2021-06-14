var RandomPath = pc.createScript('randomPath');


RandomPath.attributes.add('obstacle',{
     type:  'entity',
     description: 'obstacle parent'
});

RandomPath.attributes.add('collecatble',{
     type:  'entity',
     description: 'Collectable Points'
});

RandomPath.prototype.initialize = function() {
    this.environments=[];
    
    for(var i=0;i<this.entity.children.length;i++){
        this.environments.push(this.entity.children[i]);
    }
    
    this.obstacleScripts=[];
    for(var i=0;i<this.obstacle.children.length;i++){
        this.obstacleScripts.push(this.obstacle.children[i]);
    }
    
    this.collectableCollection=[];
    for(var i=0;i<this.collecatble.children.length;i++){
        this.collectableCollection.push(this.collecatble.children[i]);
    }
    
};
RandomPath.prototype.madePath=function(r){
    
    if(r===0){
        this.environments[0].enabled=false;
        this.environments[1].enabled=false;
        this.environments[2].enabled=false;
    }else if(r===1){
        this.environments[0].enabled=true;
        this.environments[1].enabled=false;
        this.environments[2].enabled=false;
    }else if(r===2){
        this.environments[0].enabled=true;
        this.environments[1].enabled=true;
        this.environments[2].enabled=false;
    }else if(r==3){
        this.environments[0].enabled=true;
        this.environments[1].enabled=true;
        this.environments[2].enabled=true;
    }else if(r===4){
        this.environments[0].enabled=false;
        this.environments[1].enabled=true;
        this.environments[2].enabled=false;
    }else if(r===5){
        this.environments[0].enabled=false;
        this.environments[1].enabled=false;
        this.environments[2].enabled=true;
    }else if(r===6){
        this.environments[0].enabled=true;
        this.environments[1].enabled=false;
        this.environments[2].enabled=true;
    }else{
        this.environments[0].enabled=false;
        this.environments[1].enabled=true;
        this.environments[2].enabled=true;
    }
    
    for(var i=0;i<this.obstacleScripts.length;i++){
        this.obstacleScripts[i].script.obstacles.updateObstacle();
    }
    
    for(var i=0;i<this.collectableCollection.length;i++){
        this.collectableCollection[i].script.collectableRefresh.updateCollection();
    }
};

