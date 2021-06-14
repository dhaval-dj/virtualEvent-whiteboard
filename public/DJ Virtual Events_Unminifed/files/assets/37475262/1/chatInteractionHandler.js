var ChatInteractionHandler = pc.createScript('chatInteractionHandler');

ChatInteractionHandler.attributes.add('buttons',{type:"entity",array:true});

// initialize code called once per entity
ChatInteractionHandler.prototype.initialize = function() {
    
};

// update code called every frame
ChatInteractionHandler.prototype.update = function(dt) {
    var chatWindow=document.getElementsByClassName("chch-fixedPane chch-fixedPaneRight chch-fixedPaneBottom chch-reset");
    if(chatWindow[0]){
        if(chatWindow[0].style.display==="none"){
            for(var i=0;i<this.buttons.length;i++)
                this.buttons[i].element.useInput=true;
        }else
            for(var i=0;i<this.buttons.length;i++)
                this.buttons[i].element.useInput=false;
    }else{
        for(var i=0;i<this.buttons.length;i++)
                this.buttons[i].element.useInput=true;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// ChatButtonHandler.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/