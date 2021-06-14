var TextAnimation = pc.createScript('textAnimation');

TextAnimation.attributes.add('speed', {type: 'number'});
TextAnimation.attributes.add('title', {type: 'entity'});
TextAnimation.attributes.add('content', {type: 'entity'});

TextAnimation.attributes.add('titleStart', {type: 'number'});
TextAnimation.attributes.add('titleEnd', {type: 'number'});

TextAnimation.attributes.add('contentStart', {type: 'number'});
TextAnimation.attributes.add('contentEnd', {type: 'number'});

TextAnimation.attributes.add('opacityStart', {type: 'number'});
TextAnimation.attributes.add('opacityEnd', {type: 'number'});

TextAnimation.prototype.initialize = function() {
    this.alphaTitle = 0;
    this.startTitle = 0;
    this.endTitle = 0;
    
    this.alphaContent = 0;
    this.startContent = 0;
    this.endContent = 0;
    
    this.alpha = 0;
    this.start = 0;
    this.end = 0;
    
    this.showAnimation=true;
    
};

TextAnimation.prototype.update = function(dt) {
    
    this.titleAnimation(dt);
    this.contentAnimation(dt);
    this.opacityAnimation(dt);
    
};
   

TextAnimation.prototype.titleAnimation = function(dt) {
    
    this.alphaTitle += this.speed * dt;
    var value = pc.math.lerp(this.startTitle, this.endTitle, this.alphaTitle);
    
    var pos= this.title.getLocalPosition();
    pos.y=value;
    this.title.setLocalPosition(pos);
};

TextAnimation.prototype.contentAnimation = function(dt) {
    
    this.alphaContent += this.speed * dt;
    var value = pc.math.lerp(this.startContent, this.endContent, this.alphaContent);

    var pos= this.content.getLocalPosition();
    pos.y=value;
    this.content.setLocalPosition(pos);
};

TextAnimation.prototype.opacityAnimation = function(dt) {
    
    this.alpha += this.speed * dt;
    var value = pc.math.lerp(this.opacityStart, this.opacityEnd, this.alpha);
    
    this.title.element.opacity=value;
    this.content.element.opacity=value;
};

TextAnimation.prototype.resetAnimation = function() {
    
    this.alphaTitle = 0;
    this.startTitle = this.titleStart;
    this.endTitle = this.titleEnd;
    
    this.alphaContent = 0;
    this.startContent = this.contentStart;
    this.endContent = this.contentEnd;
    
    this.alpha = 0;
    this.start = this.opacityStart;
    this.end = this.opacityEnd;
    
};


