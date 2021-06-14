var ChatOpenButton = pc.createScript('chatOpenButton');

ChatOpenButton.attributes.add('chat_bot', { type: 'entity'});

ChatOpenButton.prototype.initialize = function() {
    this.entity.element.on('click', function (evt) {
        this.chat_bot.script.chatbotController.fire('ChatbotOn');
    }, this);
};

ChatOpenButton.prototype.update = function(dt) {
    
};
