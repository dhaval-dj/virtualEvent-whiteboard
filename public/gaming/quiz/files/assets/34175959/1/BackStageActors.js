var BackStageActors = pc.createScript('backStageActors');

var BackStageActors;

BackStageActors.attributes.add('models',{
     type:  'entity',
    array:true
});



BackStageActors.prototype.initialize = function() {
    BackStageActors=this;
    
};

BackStageActors.prototype.update = function(dt) {
    
};


BackStageActors.prototype.GiveAModel = function(dt) {
    
    let r=pc.math.random(0,this.models.length);
    r=Math.floor(r);
    console.log(r);
    return this.models[r];
    
};

