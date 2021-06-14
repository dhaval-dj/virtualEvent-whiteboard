var PlayerController = pc.createScript('playerController');

//Player Animation
PlayerController.states = {
    idle: { 
        animation: 'Idle.json' 
    },
    run: { 
        animation: 'Run Forward.json' 
    },
    jump: { 
        animation: 'Falling Idle.json' 
    },
    move: {
        animation:'Jump.json'
    },
    hit: {
        animation:'Hit On Legs.json'
    }
};

PlayerController.attributes.add('playerAnim',{
     type:  'entity',
     description: 'Player Animation'
});

PlayerController.attributes.add('speed', {
    type: 'number', 
    default: 1, 
    title: 'Player running speed'
});

PlayerController.attributes.add('playerMoveBody',{
     type:  'entity',
     description: 'This enity is moving forwared direction'
});


PlayerController.attributes.add('jumpPlayer',{
     type:  'entity',
     description: 'Other temp object helping for get jump value'
});

PlayerController.attributes.add('jumpPower',{
    type: 'number', 
    default: 0.1, 
    title: 'Time for force'
});

PlayerController.attributes.add('hitOffset',{
    type: 'number', 
    default: 0.1, 
    title: 'Hit fallsback offset'
});

PlayerController.attributes.add('hitEffect',{
     type:  'entity',
     
});

PlayerController.prototype.initialize = function() {
    
    this.blendTime = 0.5;
    this.setState('run');
    
    this._startingPostionOfBody=new pc.Vec3();
    this._startingPostionOfBody.copy(this.playerMoveBody.getPosition());
    this._playerMovePosition=0;
    
    this.isPressed=false;
    this.firstPressPos=new pc.Vec2();
    this.secondPressPos=new pc.Vec2();
    this.currentSwipe=new pc.Vec2();
     
    
    //Mouse Input
     if (this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }
    
    //Touch Input
     if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    }
    
    this.jumpPlayer.collision.on('collisionstart', this.onCollisionStart, this);
    this.jumpPlayer.collision.on('collisionend ', this.onCollisionEnd, this);
    
    this.isJumping=false;
    this.isGround=true;
    
    //Find Game Manager
    this.gameManager=this.app.root.findByName('Gamemanager').script.gamemanager;
    this._tempJumpTime=this.jumpPower;

    this._moveDistance=this._startingPostionOfBody.z;
    this._didHeHited=false;
    
    
    this.alpha = 0;
    this.start = 0;
    this.end = 0;
    this.runOnce=false;
    this.value=0;
    this._moveSpeed=3;
    this.isMoving=false;
    this.pitch=false;
    this.hitEffectcolone=null;
};

 
PlayerController.prototype.update = function(dt) {
    //console.log(this._startingPostionOfBody);
    //this.hitEffect.c.particlesystem.play();
    if(this.gameManager.isGameStarted()){
        
     if(this._didHeHited){
         if(this.state!='hit'){
                this.blendTime = 0.1;
                this.playerAnim.animation.loop=false;
                this.setState('hit');
             
  
                
            // this.hitEffect.enabled=true;
             this.hitEffectcolone=this.hitEffect.clone();
             this.entity.addChild(this.hitEffectcolone);
             this.hitEffectcolone.setLocalPosition(this.hitEffect.getLocalPosition());
              this.hitEffectcolone.enabled=true;
            // this.hitEffect.particlesysetm.play();
             this.entity.sound.stop("walk");
            }
         this.entity.setLocalPosition(this.entity.getLocalPosition().x,this.jumpPlayer.getLocalPosition().y,this.entity.getLocalPosition().z);
         this.playerMoveBody.setPosition(this.playerMoveBody.getPosition().x,this.playerMoveBody.getPosition().y,this._moveDistance-this.hitOffset);
         return;
     }   
        
    //Player Jump
    {
        if(this.isJumping)
        {
            this._tempJumpTime-=dt*2000;
            this.jumpPlayer.rigidbody.applyImpulse(0, 5.4, 0);
            
            if(this._tempJumpTime < 0){
                this.isJumping=false;
                this.isGround=false;
                this._tempJumpTime=this.jumpPower;
            }
        }
     }

    //Animation Manager 
    {
         if(this.isGround){
        //To do : chek player is moveing sidewise
            if(this.state != 'run' && !this.isMoving){
                this.blendTime = 0.2;
                this.setState('run');
                this.entity.sound.play("walk");
            } 
        }else{
            //If player is not in jump state when player is jumped
            if(this.state!='jump'){
                this.blendTime = 0.5;
                this.setState('jump');
                this.entity.sound.stop("walk");
            }
        }
    }   
   
         if(this.state == 'run'){
            //this.entity.sound.play("walk").loop=false;
               
         }else{
                
                this.entity.sound.play("walk");
                if(this.pitch){
                    this.pitch=!this.pitch;
                    this.entity.sound.play("walk").pitch=1;
                }else{
                    this.pitch=!this.pitch;
                    this.entity.sound.play("walk").pitch=1.2;
                }
         }
 
    //Keyboar input
    {
        var app = this.app;
        if (app.keyboard.isPressed(pc.KEY_LEFT) && app.keyboard.wasPressed(pc.KEY_LEFT) ) {
                this._playerMovePosition=this._playerMovePosition+1;
                if(this._playerMovePosition>1){
                    this._playerMovePosition=1; 
               
                }
             this.runOnce=false;
                if(this.isGround){
                    if(this.state == 'run'){
                        this.blendTime = 0.2;
                        this.setState('move');
                    }
                }
        }

        if (app.keyboard.isPressed(pc.KEY_RIGHT) && app.keyboard.wasPressed(pc.KEY_RIGHT)) {
            this._playerMovePosition=this._playerMovePosition-1;
            if(this._playerMovePosition<-1){
                    this._playerMovePosition=-1;
            }  
             this.runOnce=false;
            if(this.isGround){
                if(this.state=='run'){
                    this.blendTime = 0.2;
                    this.setState('move');
                }
            }
        }

        if (app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_W)) {
             if(this.isGround){
                 this.entity.sound.play("Jump");
                 this.isJumping=true;
             }
                
        }
    }
        
        
    //Player Siwpe Movement
    {
        switch(this._playerMovePosition){
            case 1:{
                  if(!this.runOnce){
                    this.runOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = 1.5;
                   this.isMoving=true;
                }
                
                this.alpha += this._moveSpeed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                   //Move Done
                   this.isMoving=false;
                }
            }
            case -1:{
                  if(!this.runOnce){
                    this.runOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = -1.5;
                   this.isMoving=true;
                }
                
                this.alpha += this._moveSpeed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                   //Move Done
                   this.isMoving=false;
                }
            } 
            case 0:{
                  if(!this.runOnce){
                    this.runOnce=true;
                    this.alpha = 0;
                    this.start = this.value;
                    this.end = 0;
                   
                }
                
                this.alpha += this._moveSpeed*dt;
                this.value = pc.math.lerp(this.start, this.end, this.alpha);
                var diff=this.end-this.value;
                if(this.value===this.end || diff < 0.001 ){
                   //Move Done
                }
            }
        }
    }
        
    this.entity.setLocalPosition(this.value,this.jumpPlayer.getLocalPosition().y,this.entity.getLocalPosition().z);
       
    this._moveDistance+=dt*this.speed;
    this.playerMoveBody.setPosition(this.playerMoveBody.getPosition().x,this.playerMoveBody.getPosition().y,this._moveDistance);    
        
    }else{
        //Wait for Start
         
        if(this.state != 'idle'){
                this.blendTime = 0.5;
                this.setState('idle');
            }
    }
 
};

PlayerController.prototype.setState = function (state) {
    var states = PlayerController.states;
    this.state = state;
    this.playerAnim.animation.play(states[state].animation, this.blendTime);
};


PlayerController.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.isGround=true;
    }
};

PlayerController.prototype.onCollisionEnd = function (result) {
    if (result.other.rigidbody) {
        this.isGround=false;
   
    }
};


PlayerController.prototype.onMouseDown = function (event) {
    
        this.isPressed=true;
        this.firstPressPos=new pc.Vec2(event.x,event.y);
    
};

PlayerController.prototype.onMouseUp = function (event) {
    
       this.isPressed=false;
       this.secondPressPos= new pc.Vec2(event.x,event.y);
       this.getSwipeDirection();
    
};

PlayerController.prototype.onTouchStart = function (event) {
    
    if (event.touches.length == 1) {
            this.isPressed=true;
            this.firstPressPos=new pc.Vec2(event.touches[0].x,event.touches[0].y);
    }
    
};

PlayerController.prototype.onTouchMove = function (event) {
    this.secondPressPos= new pc.Vec2(event.touches[0].x,event.touches[0].y);
};

PlayerController.prototype.onTouchEndCancel = function (event) {
    
    if (event.touches.length === 0) {
        this.isPressed=false;
        this.getSwipeDirection();
    }    
    
};



PlayerController.prototype.getSwipeDirection=function(){
    
    if(!this.gameManager.isGameStarted())
        {
            return;
        }
        this.currentSwipe = new pc.Vec2(this.secondPressPos.x - this.firstPressPos.x, this.secondPressPos.y - this.firstPressPos.y);
        this.currentSwipe.normalize();
    
        if(this.currentSwipe.y > 0 && this.currentSwipe.x > -0.5 && this.currentSwipe.x < 0.5){
                console.log('Swipe Down');
            }
        
        if(this.currentSwipe.y < 0 && this.currentSwipe.x > -0.5 && this.currentSwipe.x < 0.5){
                console.log('Swipe Up');
                if(this.isGround){
                 this.entity.sound.play("Jump"); 
                 this.isJumping=true;
             }
            }
    
        if(this.currentSwipe.x < 0 && this.currentSwipe.y > -0.5 && this.currentSwipe.y < 0.5){
                console.log('Swipe Left');
             
                this._playerMovePosition=this._playerMovePosition+1;
                if(this._playerMovePosition>1){
                    this._playerMovePosition=1; 
                }
                 
                this.runOnce=false;
                if(this.isGround){
                    if(this.state == 'run'){
                        this.blendTime = 0.2;
                        this.setState('move');
                    }
                }
            }
    
        if(this.currentSwipe.x > 0 && this.currentSwipe.y > -0.5 && this.currentSwipe.y < 0.5){
                console.log('Swipe Right');
            
                this._playerMovePosition=this._playerMovePosition-1;
                if(this._playerMovePosition<-1){
                        this._playerMovePosition=-1;
                }  
                 this.runOnce=false;
                if(this.isGround){
                    if(this.state=='run'){
                        this.blendTime = 0.2;
                        this.setState('move');
                    }
                }
            }      
};


PlayerController.prototype.resetPlayer = function() {
    this.blendTime = 0.01;
    this.setState('idle');
    
    this._playerMovePosition=0;
    this.isPressed=false;
    this.firstPressPos=new pc.Vec2();
    this.secondPressPos=new pc.Vec2();
    this.currentSwipe=new pc.Vec2();
    this.jump=false;
    this.isGround=true; 
    this._tempJumpTime=this.jumpPower;
    this.playerMoveBody.setPosition(this._startingPostionOfBody);
    this._moveDistance=this._startingPostionOfBody.z;
    this._didHeHited=false;
   
    if(this.hitEffectcolone)
        this.hitEffectcolone.destroy();
    
    this.alpha = 0;
    this.start = 0;
    this.end = 0;
     this.runOnce=false;
    this.value=0;
   this.playerAnim.animation.loop=true;
};

PlayerController.prototype.playerHited = function() {
  this._didHeHited=true;
};

PlayerController.prototype.timeout = function() {
   this.entity.sound.stop("walk");
};