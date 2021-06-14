var ChatbotTest = pc.createScript('chatbotTest');

ChatbotTest.attributes.add("onbtn", {type: "entity"});
ChatbotTest.attributes.add("offbtn", {type: "entity"});

ChatbotTest.attributes.add('chatBotOpenEventName',{type:"string"});
ChatbotTest.attributes.add('chatBotCloseEventName',{type:"string"});

// initialize code called once per entity
ChatbotTest.prototype.initialize = function() {
    var self = this;
    
    this.onbtn.element.on("click", function(){
        self.app.fire(self.chatBotOpenEventName);
    });

    
    this.offbtn.element.on("click", function(){
        self.app.fire(self.chatBotCloseEventName);
    });
};

// update code called every frame
ChatbotTest.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// ChatbotTest.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/