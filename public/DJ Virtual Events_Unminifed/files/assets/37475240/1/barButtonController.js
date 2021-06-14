var BarButtonController = pc.createScript('barButtonController');

BarButtonController.attributes.add('bottomBar', {type: 'entity',description: 'Buttom bar panel'});
//BarButtonController.attributes.add('buttonEvent', {type: 'entity',description: 'Buttom bar panel'});

BarButtonController.attributes.add('default', { type: 'rgba' });
BarButtonController.attributes.add('selected', { type: 'rgba' });


//All Button Entity
BarButtonController.attributes.add('buttons', {
    type: 'entity',
    array: true
});

BarButtonController.prototype.initialize = function() {
    var self=this;
    this.sceneManager=this.entity.script.sceneManager;
    
    this.app.on('hideBottumBar', function () {
        self.bottomBar.enabled=false;
    });
    
    this.app.on('showBottumBar', function () {
        self.bottomBar.enabled=true;
    });
    
    
};

BarButtonController.prototype.update = function(dt) {
    

    
    for(var i=0;i<this.buttons.length;i++){
        if (!this.buttons[i].script.buttonAction.isHover())
            this.buttons[i].element.color = this.default;
        else {
        }
        this.buttons[i].script.eventFireButton.activeButton(true);
    }
    
    //Lobby
    if(this.sceneManager.scene_state===2){
         this.buttons[0].element.color = this.selected;
        //Disableing Event Fire Script to avoid press selected button
        this.buttons[0].script.eventFireButton.activeButton(false);
    }
    //Auditorium
    if(this.sceneManager.scene_state===4){
         this.buttons[1].element.color = this.selected;
         //Disableing Event Fire Script to avoid press selected button
         this.buttons[1].script.eventFireButton.activeButton(false);
    }
     //Auditorium
    if(this.sceneManager.scene_state===6){
         this.buttons[2].element.color = this.selected;
         //Disableing Event Fire Script to avoid press selected button
         this.buttons[2].script.eventFireButton.activeButton(false);
    }
    //Hall / Stall
    if(this.sceneManager.scene_state===8 || this.sceneManager.scene_state===10){
         this.buttons[3].element.color = this.selected;
         //Disableing Event Fire Script to avoid press selected button
        this.buttons[3].script.eventFireButton.activeButton(false);
    }
    //Information desk
    if(this.sceneManager.scene_state===9){
         this.buttons[5].element.color = this.selected;
         //Disableing Event Fire Script to avoid press selected button
         this.buttons[5].script.eventFireButton.activeButton(false);
    }
};

