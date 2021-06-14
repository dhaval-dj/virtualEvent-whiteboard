var Hello = pc.createScript('hello');

var that;
Hello.attributes.add('Text',{type:  'entity'});

Hello.prototype.initialize = function() {
    that=this;
};

// update code called every frame
Hello.prototype.update = function(dt) {
    
};

Hello.prototype.updateUserName = function(n) {
    this.Text.element.text=""+n;
};


function EnterUserName(name)
{
    if(that)
        {
            that.updateUserName(name);
        }
}

 