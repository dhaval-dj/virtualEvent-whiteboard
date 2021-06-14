var ChatQnaPoll = pc.createScript('chatQnaPoll');

ChatQnaPoll.attributes.add('chatID', { type: 'string', });

ChatQnaPoll.prototype.initialize = function() {
    
    this.app.on('openChat', function(){
         
    });
    
    this.app.on('openQNA', function(){
         
    });
    
    this.app.on('openPoll', function(){
        
    });
    
};

ChatQnaPoll.prototype.update = function(dt) {
    
};

