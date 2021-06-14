var StallManager = pc.createScript('stallManager');
var mobileStall;
//Attach scene Manager
StallManager.attributes.add('sceneManagerScript', {
    type: 'entity',
    description:'sceneManager script'
});

//All stalls Entity
StallManager.attributes.add('stalls', {
    type: 'entity',
    array: true
});


//Give An Event Name . It is help full for two stall with diffrent content
StallManager.attributes.add('stallCallEvent', {
    type: 'string',
    default: 'showStall'
});

StallManager.prototype.initialize = function() {
    var self=this;
    mobileStall=this;
    this.sceneManager=this.sceneManagerScript.script.sceneManager;
    this.isShowingAnyStall=false;
    //Show stall based on index id
    this.app.on(this.stallCallEvent, function(stall_id){
         //checking user in hall
       //  if(self.sceneManager.scene_state==6){
             self.showStallOnScene(stall_id);
        // }
    });
    
    //Hide all stall event
    this.app.on('hideAllStall', function(){
        //Just Hide all stall if anything visible
        self.hideAllStalls();
    });
    
};


StallManager.prototype.update = function(dt) {
    
};

StallManager.prototype.showStallOnScene = function(id) {
    
    //Just Hide all stall if anything visible
    this.hideAllStalls();
    this.stalls[id].enabled=true;
    
    this.sceneManager.changeStateFromOutside(19);
    this.isShowingAnyStall=true;
    // Rishabh Start
    this.sceneManager.changeStallStateForAnalytics(id);
    // Rishabh End
};

StallManager.prototype.hideAllStalls = function(dt) {
    for(var i=0;i<this.stalls.length;i++){
        this.stalls[i].enabled=false;
    }
};


 


