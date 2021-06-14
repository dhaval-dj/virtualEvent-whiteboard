var Gamemanager = pc.createScript('gamemanager');

Gamemanager.attributes.add('camera',{
     type:  'entity',
     description: 'Player camera'
});

Gamemanager.attributes.add('player',{
     type:  'entity',
     description: 'Player'
});

Gamemanager.attributes.add('HomeUI',{
     type:  'entity',
     description: 'Player'
});

Gamemanager.attributes.add('GameOverUI',{
     type:  'entity',
     description: 'Player'
});

Gamemanager.attributes.add('GameUI',{
     type:  'entity',
     description: 'Player'
});

Gamemanager.attributes.add('Restart',{
     type:  'entity',
     description: 'restart btn'
});

Gamemanager.attributes.add('RestartWithNoInternet',{
     type:  'entity',
     description: 'restart btn'
});

Gamemanager.attributes.add('Share',{
     type:  'entity',
     description: 'Share btn'
});


Gamemanager.attributes.add('leaderBoardNoInternet',{
     type:  'entity',
     description: 'Leader Board No Internet'
});


var updateonce;

Gamemanager.prototype.initialize = function() {
    this.state=0;    
   
    this.btnStart = this.HomeUI.findByName('Start');
    this.btnStart.element.on('click', function (evt) {
       this.state=2;
        this.gameOverDone=false;
       
    }, this);
    
    this.scorefinal=this.GameOverUI.findByName('player Score');
    this.timeFinal=this.GameOverUI.findByName('player time');
    
    //this.btnReStart = this.GameOverUI.findByName('ReStart');
    this.Restart.element.on('click', function (evt) {
        this.state=4;
    }, this);
    
     this.RestartWithNoInternet.element.on('click', function (evt) {
        this.state=4;
    }, this);
    
    this.Share.element.on('click', function (evt) {
        
        if (navigator.onLine) 
        { 
        firebaseControllerInstance.setNewScore("InfinityRunner",this.gameScore,true, firebaseControllerInstance.user, function(){
              console.log("SCoreUpadted");
          }, function(error){
          InfinityRunnerLeaderboardInstance.HideLeaderboard();
             this.leaderBoardNoInternet.enabled=true;
              console.log("Error!!", error); 
          });
        }
        else
        {
            
            InfinityRunnerLeaderboardInstance.HideLeaderboard();
            this.leaderBoardNoInternet.enabled=true;
        }
       
    }, this);
    
       this.GameOverUI.enabled=false;
    
    this.scoreTxt=this.GameUI.findByName('score_txt');
    this.timeTxt=this.GameUI.findByName('time_txt');
    this.GameUI.enabled=false;
    
    //Game 
    
    this.gameStart=false;
    this.gameOverDone=false;
    this.gameScore=0;
    this.playTime=0;
};

// update code called every frame
Gamemanager.prototype.update = function(dt) {
    
    
    switch(this.state){
        case 0:{//Home
            console.log("Home");
            this.gameScore=0;
            
            if(!this.HomeUI.enabled)
                this.HomeUI.enabled=true;
            
            break;
        }
        case 1:{//Player Selection
            console.log("Player");
            break;
        }
        case 2:{//Game
        console.log("Game");  
        this.GameUI.enabled=true;
        this.HomeUI.enabled=false;    
        this.gameStart=true;
         this.playTime+=dt;   
             
        // if(this.playTime<=0)
        //         {
        //             this.playTime=0;
        //             this.state=3;
        //             console.log("switch to GameOver");
        //             this.gameOverByTime();
        //         }
            
        this.timeTxt.element.text=""+this.getTimeInMMSS(this.playTime);
        this.scoreTxt.element.text=""+this.gameScore;
            
            
            break;
        }
        case 3:{//Game Over
             
            console.log("Game Over");
                this.scorefinal.element.text="Score : "+this.gameScore;
                this.timeFinal.element.text="Time : "+this.getTimeInMMSS(this.playTime);            
            break;
        }
        case 4:{//Reset
            console.log("Reset");
            this.camera.script.enabled=true;
            this.gameOverDone=false;
            this.gameStart=true;
            this.player.script.playerController.resetPlayer();
            this.camera.script.cameraMovement.resetCamera();
            this.state=2;
            this.HomeUI.enabled=false;
            this.GameOverUI.enabled=false;
            //this.leaderBoardNoInternet.enabled=false;
               
            //InfinityRunnerLeaderboardInstance.HideLeaderboard();
               
            this.GameUI.enabled=false;
            this.gameScore=0;
            this.playTime=0;
            // window.location.reload();
            
            break;
        }
        case 5:{//Restart
            
            break;
        }
        case 6:{
            
            break;
        }
            
    }
    
};

Gamemanager.prototype.isGameStarted=function(){
    return this.gameStart;
};

Gamemanager.prototype.gameOver = function() {
    console.log('Game Over'+this.gameScore);
   
    var self=this;
    if(!this.gameOverDone)
        {
            
            this.gameOverDone=true;
            this.camera.children[0].script.shakeCamera.shakeTheCamera();
            this.camera.script.enabled=false;
            this.player.script.playerController.playerHited();
            this.state=3;
            var that=this;
            this.entity.sound.play("Hit");  
            
            
            firebaseControllerInstance.setNewScore("InfinityRunner", this.gameScore,firebaseControllerInstance.user);
            
            setTimeout(function(){
                 that.GameUI.enabled=false;
                that.GameOverUI.enabled=true;
                // if (navigator.onLine) 
                // {
                //     InfinityRunnerLeaderboardInstance.ShowLeaderboard();
                // }
                // else
                //     {
                //         self.leaderBoardNoInternet.enabled=true;
                //     }
            },2500);
        }
  
   // this.player.enabled=false;
    // var clone= this.ball.clone();
               // this.app.root.addChild(clone);
               // clone.setPosition(this.shootPoint.getPosition());
};

Gamemanager.prototype.gameOverByTime = function() {
    console.log('Game Over');
   var self=this;
    if(!this.gameOverDone)
        {
            this.gameStart=false;
            this.gameOverDone=true;
            //this.camera.children[0].script.shakeCamera.shakeTheCamera();
            this.camera.script.enabled=false;
            this.player.script.playerController.timeout();
            this.state=3;
            var that=this;
            //this.entity.sound.play("Hit");  
            
            firebaseControllerInstance.setNewScore("InfinityRunner", this.gameScore,firebaseControllerInstance.user);
            
            setTimeout(function(){
                 that.GameUI.enabled=false;
            that.GameOverUI.enabled=true;
            // if (navigator.onLine) 
            //     {
            //         InfinityRunnerLeaderboardInstance.ShowLeaderboard();
            //     }
            //     else
            //         {
            //             self.leaderBoardNoInternet.enabled=true;
            //         }
            
            },100);
        }
  
   // this.player.enabled=false;
    // var clone= this.ball.clone();
               // this.app.root.addChild(clone);
               // clone.setPosition(this.shootPoint.getPosition());
};



Gamemanager.prototype.addScore=function(){
    this.gameScore++;
    this.entity.sound.play("Collect");  
};

Gamemanager.prototype.getTimeInMMSS=function(sec){

            var hrs = Math.floor(sec / 3600);
            var min = Math.floor((sec - (hrs * 3600)) / 60);
            var seconds = sec - (hrs * 3600) - (min * 60);
            seconds = Math.round(seconds * 100) / 100;
            //var result = (hrs < 10 ? "0" + hrs : hrs);
            //result += "-" + (min < 10 ? "0" + min : min);
            //result += "-" + (seconds < 10 ? "0" + seconds : seconds);
            var minText=""+min;
            if(min<10)
                minText="0"+min;
            var secText=""+Math.floor(seconds);
            if(Math.floor(seconds)<10)
                secText="0"+Math.floor(seconds);
    
            return minText+':'+secText;
      
};

Gamemanager.prototype.hello=function(){
    console.log("Hello Call");
};



