var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('paths',{
     type:  'entity',
     description: 'Path Sets'
});

CameraMovement.attributes.add('refresh',{
     type:  'number',
     description: 'Path refresh facter'
});

CameraMovement.attributes.add('target',{
     type:  'entity',
     description: 'Camera target'
});

CameraMovement.attributes.add('distance',{
     type:  'number',
     description: 'Camera distance from target'
});

CameraMovement.attributes.add('offsetCam', {
    type: 'vec3'
});

CameraMovement.prototype.initialize = function() {
    
    this._cameraPostion=this.entity.getPosition();
    this.isNeedRefresh=false;
    this.nextRefeesh=this.refresh;
    this.refreshId=1;
    this.indexID=0;
    
    this._roadsStartPosition=[];
    this.roads=[];
    for(var r=0;r<this.paths.children.length;r++)
        {
            this.roads.push(this.paths.children[r]);
            var vec3=new pc.Vec3();
            vec3.copy(this.paths.children[r].getLocalPosition());
            this._roadsStartPosition.push(vec3);
        }
    
    
};


CameraMovement.prototype.update = function(dt) {
    
    this.entity.setPosition(this.target.getPosition());
    this.entity.translateLocal(this.offsetCam);
    
    //Refresh road
    this.refreshRoadPostion(this.entity.getPosition().z);
};


CameraMovement.prototype.refreshRoadPostion=function(currentZPos){
    if(currentZPos >= this.nextRefeesh)
        {
            this.isNeedRefresh=true;
        }
    
    if(this.isNeedRefresh)
        {
            this.isNeedRefresh=false;
            this.refreshId++;
            this.nextRefeesh=this.refresh*this.refreshId;
            var r=pc.math.random(0,8);
                r=Math.floor(r);
            
            if(this.indexID === 0)
                {
                    this.roads[0].setPosition(0,0,this.nextRefeesh);
                    this.roads[0].script.randomPath.madePath(r);
                    this.indexID=1;
                }else{
                    this.roads[1].setPosition(0,0,this.nextRefeesh);
                    this.roads[1].script.randomPath.madePath(r);
                    this.indexID=0;
                }
        }
};

CameraMovement.prototype.resetCamera=function(){
    this.entity.setPosition(this._cameraPostion);
    this.isNeedRefresh=false;
    this.nextRefeesh=this.refresh;
    this.refreshId=1;
    this.indexID=0;
    
    var r=pc.math.random(0,8);
    r=Math.floor(r);
     this.roads[0].script.randomPath.madePath(r);
     this.roads[1].script.randomPath.madePath(r);
    
    for(var r=0;r<this.roads.length;r++)
        {
            this.roads[r].setLocalPosition(this._roadsStartPosition[r]);
            //To Do
            //Reset Obstacles
        }
};
