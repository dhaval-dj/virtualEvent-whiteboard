var ChatbotController = pc.createScript('chatbotController');

ChatbotController.attributes.add('chatbotId',{type:"string"});

ChatbotController.attributes.add('chatBotOpenEventName',{type:"string"});
ChatbotController.attributes.add('chatBotCloseEventName',{type:"string"});


// initialize code called once per entity
ChatbotController.prototype.initialize = function() {
    var self = this;
    
//     var doc = document.createElement("div");
//     doc.id  = "popover-modal";
//     document.body.appendChild(doc);
//     
    window.__be = window.__be || {};
    window.__be.id = this.chatbotId;
    (function() {
        var be = document.createElement('script'); be.type = 'text/javascript'; be.async = true;
        be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(be, s);
    })();

    window.BE_API = window.BE_API || {};
        window.BE_API.onLoad = function () {
        window.BE_API.hideChatWindow();
    };
    
    window.BE_API = window.BE_API || {};
    window.BE_API.onChatWindowClose = function () {
        // self.close();
         var chatDiv = document.getElementById("chatbot-chat");
        chatDiv.classList.add("contentCntr");
    };
   
    this.app.on(this.chatBotCloseEventName, function(){
        self.close();
    });
    
    this.app.on(this.chatBotOpenEventName, function(){
        self.open();
    });
};


ChatbotController.prototype.open = function(dt) {
    // console.log("Called open");
      if(!window.BE_API.isInitialized())
    {
        return;
    }    
    if(window.BE_API.isChatWindowOpened())
    {
        return;
    }
    window.BE_API.openChatWindow();   
};


ChatbotController.prototype.close = function(dt) {
    // console.log("Called closed");
    if(!window.BE_API.isInitialized())
    {
        return;
    }
    if(window.BE_API.isChatWindowHidden())
    {
       return;
    }
    window.BE_API.hideChatWindow();   
};
