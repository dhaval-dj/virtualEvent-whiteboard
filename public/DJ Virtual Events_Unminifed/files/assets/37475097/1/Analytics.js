

var Analytics = pc.createScript('analytics');

Analytics.attributes.add("analytics_liveUsers", {type:"entity"});
Analytics.attributes.add("sceneMan", {type:"entity"});
// initialize code called once per entity
Analytics.prototype.initialize = function() {
    
    var child = this.analytics_liveUsers.children;
    this.analytics_liveUsers = child[0];
    
  
};

// update code called every frame
// Rishabh Start
var temp;
Analytics.prototype.update = function(dt) {  
    // console.log("HI");
    this.analytics_liveUsers.element.text=window.liveCountInMyRoom;
    
};
// Rishabh End

