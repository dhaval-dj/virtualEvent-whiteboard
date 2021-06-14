var BarActionBtn = pc.createScript('barActionBtn');

BarActionBtn.attributes.add('popUp', { type: 'entity', });

BarActionBtn.attributes.add('buttonIcon', { type: 'entity', });

BarActionBtn.prototype.initialize = function() {

    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);
    this.hover=false;
    this.selected=false;
};
 
BarActionBtn.prototype.update = function(dt) {
    
    if(this.hover || this.selected){
        this.buttonIcon.element.color = new pc.Color(21/255, 39/255, 104/255);
    }else{
        this.buttonIcon.element.color = new pc.Color(202/255, 202/255, 202/255);
    }
};
 

BarActionBtn.prototype.onEnter = function (event) {

    this.hover=true;
};

BarActionBtn.prototype.onLeave = function (event) {

    this.hover=false;
};

 

BarActionBtn.prototype.onRelease = function (event) {
   // this.buttonUpdate();
    //this.hover=false;

};


BarActionBtn.prototype.isHover = function (event) {
   return this.hover;
};

BarActionBtn.prototype.selectThisButton = function (flag) {
   this.selected=flag;
};
