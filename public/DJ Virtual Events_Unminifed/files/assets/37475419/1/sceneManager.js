var SceneManager = pc.createScript('sceneManager');

var mobileManager = this;

SceneManager.attributes.add('scene_state', {
    type: 'number',
    enum: [     
        { 'tutorial': 1 },     
        { 'lobby_loop': 2 },
        { 'lobby_to_InfoDesk': 3 },
        { 'InfoDesk_loop': 4 },
        { 'lobby_to_breakoutroom1': 5 },
        { 'breakoutroom1_loop': 6 },
        {'joinmeeting':7},
        // { 'lobby_to_breakoutroom2': 7 },
        // { 'breakoutroom2_loop': 8},
        { 'lobby_to_Audi1': 9 },
        { 'Audi1_loop': 10},
        // { 'lobby_to_Audi2': 11},
        // { 'Audi2_loop': 12},
        // { 'lobby_to_Audi3': 13},
        // { 'Audi3_loop': 14},
        // { 'lobby_to_Lounge': 15},
        // { 'Lounge_loop': 16},
        { 'lobby_to_hall': 17},
        { 'hall_loop': 18},
        { 'stall':19},
        { 'lobby_to_workshop': 20},
        { 'workshop_loop': 21},
        { 'workshop_screen1': 22},
         { 'workshop_screen2': 23},
         { 'workshop_screen3': 24},
         { 'workshop_screen4': 25},
    ],
    default: 0
});
SceneManager.attributes.add('mainScenePlane', { type: 'entity', description: 'Plain' });
SceneManager.attributes.add('tutorialUI', { type: 'entity', description: 'Idle Screen Plain' });
SceneManager.attributes.add('screenUI', { type: 'entity', description: 'Idle Screen Plain' });
SceneManager.attributes.add('Showtutorialbtn', { type: 'entity' });
SceneManager.attributes.add('TutorialScreen', { type: 'entity' });
SceneManager.attributes.add('EnterPriseSubBtn', { type: 'entity' });


//note: remember all video id's based on this id we going to call video play/stop
SceneManager.attributes.add('videos', {
    type: 'entity',
    array: true
});

SceneManager.attributes.add('screenFade', { type: 'entity', description: 'Screen Fade Effect' });
SceneManager.attributes.add('backButton', { type: 'entity', description: 'Back Button from othere scene to home' });

SceneManager.attributes.add('forReact', { type: 'boolean', description: 'turn Off Event which are not requied for react ' });
SceneManager.attributes.add('ReactManager', { type: 'entity', description: 'React' });
SceneManager.attributes.add('ProggresbarText', { type: 'entity', });
SceneManager.attributes.add('wdbtomleftlogo', { type: 'entity', description: 'Wester Digital Bottom Left Logo' });
SceneManager.attributes.add('breakoutselectionpage', { type: 'entity', description: 'Breakout Selection Page' });
SceneManager.attributes.add('breakoutreander', {
    type: 'entity',
    array: true
});


SceneManager.prototype.resetState = function () {
    var self = this;
    self.hidePlains(); //Hide all enabled plains
    self.app.fire('TurnOffLobbyButton');
    self.app.fire('TurnOffInformation');
    self.app.fire('TurnOffStalls');
    self.app.fire('hideAllStall');
    self.app.fire('TurnOffWorkShop');
    self.app.fire('hideLeftRightArrow');
    self.app.fire('StopVimeo');
    self.app.fire('closeAllStallVideo');
    self.app.fire('ChatbotOff');
    closeStallConetent();
};

var SceneManagerInstance;

SceneManager.prototype.initialize = function () {     // 
    localStorage.clear();
    var self = this;
    this.loadingScreen = this.app.root.findByName('loadingScreen');
    SceneManagerInstance = this;
    this.reactHome = window.ReactHomeManager;
    this.videoSet = false;
    //Inside state do once this 
    this.didOnce = false;
    this.didOnce1 = false;
    this.scene_state = 1;
    this.targetState = 1;
    this.tutorialUI.enabled = false;
    this.videoloadPercentage = 0;
    this.isAllVideoLoaded = false;
    this.breakoutnumber=1;
    window.SceneManagerObj = this;
    
    
    //Start MainVideo
    this.app.on('startLobbyVideo', function (callback) {
        self.TurnOnLoadingScreen();
        for (var i = 0; i < self.videos.length; i++) {
            self.videos[i].enabled = true;
        }
        callback();
        //self.videos[0].enabled=true;
        self.videos[0].script.loopVideoComp.startVideoFirstTime(callback);
    });
    this.app.on('startIntroVideo', function (callback) {
        // self.TurnOnLoadingScreen();
        //console.log("Lets clicked");
        for (var i = 0; i < self.videos.length; i++) {
            self.videos[i].enabled = true;
        }
   
    //    callback();
   //     self.videos[0].script.loopVideoComp.startVideoFirstTime();
    });
    // ========================================================
    this.app.on('addVideoLoadProgress', function (prog) {
        if (!self.isAllVideoLoaded) {
            self.videoloadPercentage += prog;
            // console.log("OVerAllLoaded: ",self.videoloadPercentage);    

            var videoPer = Math.floor(self.videoloadPercentage / self.videos.length);

            if (videoPer > 99) {
                // console.log("all loaded");
                //self.app.fire("allVideosLoaded");
                self.isAllVideoLoaded = true;
                videoPer = 100;
                self.videoloadPercentage = 100;
            }

            self.ProggresbarText.element.text = videoPer.toString() + " %";
            //console.log("Loaded: ",videoPer);          
        }
    });
    // ========================================================    
    this.app.on('allVideosLoaded', function () {

        self.isAllVideoLoaded = true;
        self.ProggresbarText.element.text = "100 %";
        //self.app.fire('skipTutorial');
    });
    this.app.on('skipTutorial', function () {
        self.scene_state = 2;//Go to state 2
        self.didOnce = false;
        self.TurnOnLoadingScreen();
    });
    this.app.on('PlayLobby', function () {
        //self.videos[0].enabled=true;
        //console.log("/////////");
        self.scene_state = 2; //Go to state 2
        self.didOnce = false;
        self.TurnOnLoadingScreen();

    });
    //Calling from fade script after coplete baclk
    this.app.on('changeState', function () {

        self.resetState();
        //Play all paused Video
        self.playSigleVideo(-1);

        //Last Change Scene
        self.changeState();
    });
    
    this.app.on('enterMeetingRoomSelection', function () {         
        self.targetState = 6; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });    
    
     this.app.on('enterAuditorium1', function () {
        console.log("AUDI1");
        self.targetState = 10; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
    
 /*   this.app.on('enterBreakoutRoom2', function () {   
        self.targetState = 8; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });*/
   
  /*  this.app.on('enterAuditorium2', function () {      
        self.targetState = 12; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    this.app.on('enterAuditorium3', function () {
        self.targetState = 14; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
  
   this.app.on('enterLounge', function () {
        self.targetState = 16; //assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    */
    this.app.on('enterHall', function () {
        //Start Fade and pass event 
        self.targetState = 18;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
    
    this.app.on('goToIfromationdeskFromOtherState', function () {
        //Hide All enabled stalls
        //self.app.fire('hideAllStall');//stallManager.js

        self.goToInformationDesk();
    });

    this.app.on('enterInformationDesk', function () {
        self.targetState = 4;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });

  this.app.on('ShowTutorial', function () {
       if (!self.tutorialUI.enabled) {
            self.tutorialUI.enabled = true;
            self.app.fire('resetTutorial');
        }
    });

    //Back button action
    this.app.on('comeBack', function () {
        //Check user state 
        //if user is in hall/auditorium move to home
        //else move he is in stall so move to hall
        //self.app.fire('closeAllStallVideo');
        self.app.fire("Playsound");
       
        if (self.ReactManager)
            if (self.ReactManager.enabled)
                if (self.ReactManager.script.reactConnector)
                    self.ReactManager.script.reactConnector.currentState = self.ReactManager.script.reactConnector.states.lobby;

        self.TurnOnLoadingScreen();
        //user is in stall so for coming back to hall 
        if (self.scene_state === 19) {
            //fade
            self.targetState = 18;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var

        }else if (self.scene_state === 22 || self.scene_state === 23 || self.scene_state === 24 || self.scene_state === 25) {
            //fade
            self.targetState = 21;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var

        }
       
        else if(self.scene_state===7)
        {            
            self.screenFade.script.screenFadeEfx.show('changeState');            
            self.targetState = 6;             
        }

        else {           
            //fade
            self.targetState = 2;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
        }
        
            if(self.TutorialScreen.enabled)
            self.TutorialScreen.enabled=false;

    });

    ///////////All Event From Bar Button Click///////////
    //Event for
    this.app.on('goToLobby', function () {
        self.TurnOnLoadingScreen();
        if (self.scene_state != 3) {

            self.resetState();

            self.targetState = 3;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
        }
    });

    this.app.on('Playsound', function () {
        if (self.scene_state === 2) {
            self.entity.sound.play("Bg");
            //console.log("This is Lobby ");
        }
    });
    
    
    //Event for Bar button Auditirium
     this.app.on('goToMeetingRoomSelection', function () { 
       
         // for dailyco check is valid for video callback
        if(self.reactHome)
        {       
            const result = self.reactHome.GetRoomStatus("meeting");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            }   

            self.TurnOnLoadingScreen();         
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var          
            if (self.scene_state != 2) {
                self.app.fire('enterMeetingRoomSelection');//->loopVideoComp.js->var
            } else {
                self.goToMeetingRoomSelection();
            }
        }
        else{           
            self.TurnOnLoadingScreen();         
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var          
            if (self.scene_state != 2) {
                self.app.fire('enterMeetingRoomSelection');//->loopVideoComp.js->var
            } else {
                self.goToMeetingRoomSelection();
            }
        }         
    });
    
    
    this.app.on('JoinMeetingInbreakout', function (breakoutnumber) 
    {        
        if(self.reactHome)
        {  
            const enterroom = self.reactHome.GetUserRoomEnterNumberStatus(breakoutnumber); 
            if(!enterroom.status)
            {
                self.reactHome.showInfoPopUp(enterroom.message);
                //self.reactHome.OpenLastActiveMenu();
                self.app.fire('StateReached');
                return;
            }   
             
        } 
        self.reactHome.callEnterBreakout(true); 
        SceneManagerInstance.breakoutnumber=breakoutnumber;       
        
        self.targetState = 7; 
        self.screenFade.script.screenFadeEfx.show('changeState');
    });
    
    /* this.app.on('goToBreakoutRoom2', function () {        
        
            // for dailyco check is valid for video callback
        if(self.reactHome)
        {
            const enterroom = self.reactHome.GetUserRoomEnterNumberStatus("breakoutroom",2);           
            if(!enterroom.status)
            {
                self.reactHome.showInfoPopUp(enterroom.message);
                self.reactHome.OpenLastActiveMenu();
                self.app.fire('StateReached');
                return;
            }              
            const result = self.reactHome.getTownHallStatus("breakout2"); 
            switch (result.status) {
                case "CanEnter":
                     //for dailycontent
                    if(window.FirebaseObj.uservalidforcall)
                    {
                        self.reactHome.callEnterBreakout(true);    
                    }
                    self.TurnOnLoadingScreen();
                    self.entity.sound.pause("Bg");
                    self.app.fire('hideBottumBar');//->barButtonController.js->var

                    self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

                    //Check is in lobby or not
                    if (self.scene_state != 2) {
                        self.app.fire('enterBreakoutRoom2');//->loopVideoComp.js->var
                    } else {
                        self.goToBreakoutRoom2();
                    }
                    break;
                case "NoEntry":
                    self.reactHome.showInfoPopUp(result.message);
                    self.reactHome.OpenLastActiveMenu();
                    self.app.fire('StateReached');
                    break;              
            }
        }
        else
        {
            self.TurnOnLoadingScreen();
            self.entity.sound.pause("Bg");
            self.app.fire('hideBottumBar');//->barButtonController.js->var

            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

            //Check is in lobby or not
            if (self.scene_state != 2) {
                self.app.fire('enterBreakoutRoom2');//->loopVideoComp.js->var
            } else {
                self.goToBreakoutRoom2();
            }
        }
         
    });*/
    this.app.on('goToAuditorium1', function () {

        const result = self.reactHome.GetRoomStatus("auditorium");
        if(!result.status)
        {
            self.reactHome.showInfoPopUp(result.message);
            self.app.fire('StateReached');
            return;
        }   
        self.TurnOnLoadingScreen();
        self.entity.sound.pause("Bg");
        self.app.fire('hideBottumBar');//->barButtonController.js->var

        self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var
        //Check is in lobby or not
        if (self.scene_state != 2) {
            self.app.fire('enterAuditorium1');//->loopVideoComp.js->var
        } else {
            self.goToAuditorium1();
        }
     
        return;

        if (self.reactHome) {
            
            const enterroom = self.reactHome.GetUserRoomEnterNumberStatus("auditorium",1);           
            if(!enterroom.status)
            {
                self.reactHome.showInfoPopUp(enterroom.message);
                self.reactHome.OpenLastActiveMenu();
                self.app.fire('StateReached');
                return;
            }  
            const result = self.reactHome.getSessionStatus();
            if (result.status) {

            } 
            else {
                SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                self.reactHome.showInfoPopUp(result.message);
                self.reactHome.OpenLastActiveMenu();
            }
           
        }
         else {
            //self.videos[1].enabled=true;
            self.TurnOnLoadingScreen();
            self.entity.sound.pause("Bg");
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

            //Check is in lobby or not
            if (self.scene_state != 2) {
                self.app.fire('enterAuditorium1');//->loopVideoComp.js->var
            } else {
                self.goToAuditorium1();
            }           
        }

    });

    /*this.app.on('goToAuditorium2', function () {
        if (self.reactHome) {
            
            const enterroom = self.reactHome.GetUserRoomEnterNumberStatus("auditorium",2);           
            if(!enterroom.status)
            {
                self.reactHome.showInfoPopUp(enterroom.message);
                self.reactHome.OpenLastActiveMenu();
                self.app.fire('StateReached');
                return;
            }  
            
            const result = self.reactHome.getLandDStatus();            
            if (result.status) {
                self.TurnOnLoadingScreen();
                self.entity.sound.pause("Bg");
                self.app.fire('hideBottumBar');//->barButtonController.js->var
                self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

                //Check is in lobby or not
                if (self.scene_state != 2) {
                    self.app.fire('enterAuditorium2');//->loopVideoComp.js->var
                } else {
                    self.goToAuditorium2();
                }
                self.app.fire('goToAuditorium2menu');
            } else {
                SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                self.reactHome.showInfoPopUp(result.message);
                self.reactHome.OpenLastActiveMenu();
            }
        } else {
            //self.videos[2].enabled=true;
            self.TurnOnLoadingScreen();
            self.entity.sound.pause("Bg");
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

            //Check is in lobby or not
            if (self.scene_state != 2) {
                self.app.fire('enterAuditorium2');//->loopVideoComp.js->var
            } else {
                self.goToAuditorium2();
            }
         

        }

    });

    this.app.on('goToAuditorium3', function () {
        if (self.reactHome) {
            
            const enterroom = self.reactHome.GetUserRoomEnterNumberStatus("auditorium",3);           
            if(!enterroom.status)
            {
                self.reactHome.showInfoPopUp(enterroom.message);
                self.reactHome.OpenLastActiveMenu();
                self.app.fire('StateReached');
                return;
            }  
            
            const result = self.reactHome.getLandDStatus();
            if (result.status) {
                // self.videos[8].enabled=true;
                self.TurnOnLoadingScreen();
                self.entity.sound.pause("Bg");
                self.app.fire('hideBottumBar');//->barButtonController.js->var
                self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

                //Check is in lobby or not
                if (self.scene_state != 2) {
                    self.app.fire('enterAuditorium3');//->loopVideoComp.js->var
                } else {
                    self.goToAuditorium3();
                }
                self.app.fire('goToAuditorium3menu');
            } else {
                SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                self.reactHome.showInfoPopUp(result.message);
                self.reactHome.OpenLastActiveMenu();
            }
        } else {
            // self.videos[8].enabled=true;
            self.TurnOnLoadingScreen();
            self.entity.sound.pause("Bg");
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var

            //Check is in lobby or not
            if (self.scene_state != 2) {
                self.app.fire('enterAuditorium3');//->loopVideoComp.js->var
            } else {
                self.goToAuditorium3();
            }          

        }

    });  
    
     this.app.on('goToLounge', function () {
        self.TurnOnLoadingScreen();

        if (!this.forReact) {
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var
        }
        //Check is in lobby or not
        if (self.scene_state != 2) {
            self.app.fire('enterLounge');//->loopVideoComp.js->var
        } else {
            self.goToLounge();
        }
    });*/

    this.app.on('goToHall', function () {
    if(window.ReactHomeManager)
        {
           const result = self.reactHome.GetRoomStatus("expohall");
            if(!result.status)
              {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
              }
        }
     
        self.TurnOnLoadingScreen();

        if (!this.forReact) {
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var
        }
        //Check is in lobby or not
        if (self.scene_state != 2) {
            self.app.fire('enterHall');//->loopVideoComp.js->var
        } else {
            self.goToHall();
        }
    });

    this.app.on('goToInformationDesk', function () {
        //self.videos[7].enabled=true;
        
        self.TurnOnLoadingScreen();
        self.entity.sound.pause("Bg");
        self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var
        //Check is in lobby or not
        self.resetState();
        console.log(self.scene_state);
        if (self.scene_state == 2) {
            self.goToInformationDesk();
        } else {
            self.screenFade.script.screenFadeEfx.show('goToIfromationdeskFromOtherState');//screenFadeEfx.js->pass by var
        }
    });

    this.app.on('pausesound', function () {
        self.entity.sound.pause("Bg");
    });
    
    
     this.app.on('goToMeetTheTeam', function () {    
         
      
    });
    
   
    
    
   this.app.on('goToWorkShop', function () {

       if(window.ReactHomeManager)
        {
            const result = self.reactHome.GetRoomStatus("workshop");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            }
        }
       console.log('Cliked goToWorkShop');
        self.TurnOnLoadingScreen();

        if (!this.forReact) {
            self.app.fire('hideBottumBar');//->barButtonController.js->var
            self.app.fire('TurnOffLobbyButton');//->childEnableDisable.js->var
        }
        //Check is in lobby or not
        if (self.scene_state != 2) {
            self.app.fire('enterWorkshop');//->loopVideoComp.js->var
        } else {
            self.goToWorkshop();
        }
    });
    
     this.app.on('enterWorkshop', function () {
        //Start Fade and pass event 
        self.targetState = 21;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
    this.app.on('enterWorkshopScreenClientPlus', function () {
        //Start Fade and pass event 
        self.targetState = 22;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
     this.app.on('enterWorkshopScreenGaming', function () {
        //Start Fade and pass event 
        self.targetState = 23;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
     this.app.on('enterWorkshopScreenEnterprise', function () {
        //Start Fade and pass event 
        self.targetState = 24;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
     this.app.on('enterWorkshopScreenConsumer', function () {
        //Start Fade and pass event 
        self.targetState = 25;//assign as temp
        self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
    });
    
    this.app.on('HideTutorial', function (evt) {
         
         if(self.TutorialScreen.enabled)
            self.TutorialScreen.enabled=false;
            self.app.fire('StopVimeo');
     });
     this.Showtutorialbtn.element.on('click', function (evt) {
         
         if(!self.TutorialScreen.enabled)
             {
                 self.app.fire('PlayScreen5Vimeo');
                 self.TutorialScreen.enabled=true;
             }
     });
    
    
};

SceneManager.prototype.update = function (dt) {
    
    
    if(this.scene_state!==24)
    {        
         if(this.EnterPriseSubBtn.enabled)
               this.EnterPriseSubBtn.enabled=false;           
    }
     if(this.scene_state===2||this.scene_state===3||this.scene_state===4||this.scene_state===17||this.scene_state===18||this.scene_state===19||this.scene_state===20||this.scene_state===21)
        {
            if(!this.Showtutorialbtn.enabled)
                {
                    this.Showtutorialbtn.enabled=true;
                }
        }
     else
        {
             if(this.Showtutorialbtn.enabled)
                {
                    this.Showtutorialbtn.enabled=false;
                }
        }
  
    
    switch (this.scene_state) {   
     
        //'Tutorial'
        case 1: {
            if (!this.didOnce) {
                this.didOnce = true;
            }
            if (!this.tutorialUI.enabled) {
                this.tutorialUI.enabled = true;
            }

            if (this.screenUI.enabled) {
                this.screenUI.enabled = false;
            }             
            break;
        }
        // Lobby Loop Video
        case 2: {         
              if (!SceneManagerInstance.didOnce) {

                this.app.fire('IReachedHere','lobby');
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 2;
                    window.ReactHomeManager.user_AnalyticsHandler(2,"Enter");
                }
                //Rishabh End
                 SceneManagerInstance.entity.sound.play("Bg");
                 SceneManagerInstance.tutorialUI.enabled = false;
                    SceneManagerInstance.screenUI.enabled = true;
                //doubt
                SceneManagerInstance.playSigleVideo(0, function () {
                    SceneManagerInstance.changeVideoFrame(SceneManagerInstance.videos[0]);
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    
                     if (!SceneManagerInstance.forReact) {
                        // this.app.fire('showBottumBar');//->barButtonController.js->var
                        SceneManagerInstance.app.fire('TurnOnLobbyButton');//->childEnableDisable.js->var
                      //    SceneManagerInstance.app.fire('showLeftRightArrow');
                          SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                    }
                    
                });
                  
                   if(SceneManagerInstance.breakoutselectionpage.enabled)
                     SceneManagerInstance.breakoutselectionpage.enabled=false;          // disable breakout meeting selection page

                     if(SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled)
                      SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=false; 
              }
            
            SceneManagerInstance.shiftVideoMaterialWithEffect(0);

            break;
        }
        //'go to info desk'
        case 3: {
            
              if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                this.app.fire('IReachedHere','gotoinfo');
                SceneManagerInstance.playSigleVideo(1, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                });

            }

            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(1);

         break;
        }
            
          // Info Desk Loop  
        case 4: {

               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                this.app.fire('IReachedHere','infodesk');
             //   SceneManagerInstance.app.fire('showLeftRightArrow');
                SceneManagerInstance.app.fire('TurnOnInformation');              
                SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
            //    SceneManagerInstance.app.fire("ChatbotOn");
                if (SceneManagerInstance.screenFade.script.screenFadeEfx.isShowing())
                    SceneManagerInstance.screenFade.script.screenFadeEfx.hide();
            }

            break;
        }   
           
        // To Breakout Room 1    
        case 5: {

            if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                this.app.fire('IReachedHere','gotoBreakeout');
                SceneManagerInstance.playSigleVideo(2, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }

            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(2); //doubt

            break;
        }
       // Breakout Room 1  Loop  
        case 6: {
            if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                this.app.fire('IReachedHere','breakOutRoomHotsopt');
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 6;
                    window.ReactHomeManager.user_AnalyticsHandler(6,"Enter");
                }                             
                 SceneManagerInstance.breakoutselectionpage.enabled=true; 
                 SceneManagerInstance.TurnOffLoadingScreen();              
                 SceneManagerInstance.app.fire('keepCameraCenter');
                 SceneManagerInstance.app.fire('StateReached');                
                 if (SceneManagerInstance.screenFade.script.screenFadeEfx.isShowing())
                    SceneManagerInstance.screenFade.script.screenFadeEfx.hide();

                if(SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled)
                SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=false;
                //Rishabh End
             /*   SceneManagerInstance.playSigleVideo(3, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreenBreakoutRoom1');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });*/
                SceneManagerInstance.app.fire("pausesound");
            }

            //Checking current video null
          //  SceneManagerInstance.shiftVideoMaterialWithEffect(3);

            break;
        }  
            
        case 7: 
            {
                if (!SceneManagerInstance.didOnce) {
                this.app.fire('IReachedHere','insideBreakout');
                SceneManagerInstance.didOnce = true;                
                if(window.ReactHomeManager){
                    window.roomID = 8;
                    window.ReactHomeManager.user_AnalyticsHandler(8,"Enter");
                }
                    
                     console.log(SceneManagerInstance.breakoutnumber);
               
                   SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=true; 
                   SceneManagerInstance.TurnOffLoadingScreen();                  
                   SceneManagerInstance.app.fire("pauseSound");
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreenBreakoutRoom1');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                     SceneManagerInstance.breakoutselectionpage.enabled=false;
                     if (SceneManagerInstance.screenFade.script.screenFadeEfx.isShowing())
                    SceneManagerInstance.screenFade.script.screenFadeEfx.hide();
               
            }
           
            break;
        }
            
        /*// To Breakout Room 2      
        case 7: {
         
              if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;

                SceneManagerInstance.playSigleVideo(4, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(4); 

            break;
        }
            
        //  Breakout Room 2 loop      
        case 8: {

          if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 8;
                    window.ReactHomeManager.user_AnalyticsHandler(8,"Enter");
                }
                //Rishabh End
                SceneManagerInstance.playSigleVideo(5, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreenBreakoutRoom2');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });
            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(5);


            break;
        }   */
         // To Audi 1   
        case 9: {
            this.app.fire('IReachedHere','goingToAudi');
               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;

                SceneManagerInstance.playSigleVideo(6, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(6); 
            break;
        }        
        // Audi 1 Loop
        case 10: {

             if (!SceneManagerInstance.didOnce) {
                this.app.fire('IReachedHere','insideAudi');
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 10;
                    window.ReactHomeManager.user_AnalyticsHandler(10,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(7, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreen1Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(7);

            break;
        }
       /* // To Audi 2   
        case 11: {
            
               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;

                SceneManagerInstance.playSigleVideo(8, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(8); 
            break;
        }        
        // Audi 2 Loop
        case 12: {

             if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 12;
                    window.ReactHomeManager.user_AnalyticsHandler(12,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(9, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreen2Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(9);

            break;
        }
        // To Audi 3   
        case 13: {
            
               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;

                SceneManagerInstance.playSigleVideo(10, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(10); 
            break;
        }        
        // Audi 3 Loop
        case 14: {

             if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 14;
                    window.ReactHomeManager.user_AnalyticsHandler(14,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(11, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('PlayScreen3Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(11);

            break;
        }
          // To Lounge   
        case 15: {
            
               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;

                SceneManagerInstance.playSigleVideo(12, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(12); 
            break;
        }        
        // Lounge Loop
        case 16: {

             if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 16;
                    window.ReactHomeManager.user_AnalyticsHandler(16,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(13, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');                 
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(13);

            break;
        }*/
        // To Hall   
        case 17: {
            
               if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                if(window.ReactHomeManager){
                     this.app.fire('IReachedHere','goingHall');
                }               
                SceneManagerInstance.playSigleVideo(14, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;                   
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(14); 
            break;
        }        
        // Hall Loop
        case 18: {

             if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;               
                //Rishabh Start
                if(window.ReactHomeManager){
                     this.app.fire('IReachedHere','insideHall');
                    window.roomID = 18;
                    window.ReactHomeManager.user_AnalyticsHandler(18,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(15, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('TurnOnStalls');
                 //   SceneManagerInstance.app.fire('showLeftRightArrow');
                    //for connecting ReactUI 
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(15);
            break;
        }
    //Stall Open
     case 19:{
             
            if(!this.didOnce){
                this.app.fire('IReachedHere','insideStall');
                this.didOnce=true;
                 this.playSigleVideo(-1);
                 this.screenFade.script.screenFadeEfx.hide();
                 this.app.fire('TurnOffStalls');
        //        this.app.fire('showLeftRightArrow');
            }

            break;
        }           
        //go to workshop
        case 20: {
            
              if (!SceneManagerInstance.didOnce) {
                SceneManagerInstance.didOnce = true;
                this.app.fire('IReachedHere','goingWorkshop');
                SceneManagerInstance.playSigleVideo(16, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                });

            }

            //Checking current video null
            SceneManagerInstance.shiftVideoMaterial(16);

         break;
        }
        // workshop Loop  
        case 21: {

              if (!SceneManagerInstance.didOnce) {
                this.app.fire('IReachedHere','insideWorkshopLobby');
                SceneManagerInstance.didOnce = true;
                //Rishabh Start
                if(window.ReactHomeManager){
                    window.roomID = 21;
                    window.ReactHomeManager.user_AnalyticsHandler(21,"Enter");
                }
                //Rishabh End

                SceneManagerInstance.playSigleVideo(17, function () {
                    SceneManagerInstance.TurnOffLoadingScreen();
                    SceneManagerInstance.videoSet = false;
                    SceneManagerInstance.app.fire('keepCameraCenter');
                    SceneManagerInstance.app.fire('TurnOnWorkShop');
                    SceneManagerInstance.app.fire('reachedWorkshop');
                    SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                });

            }
            //Checking current video null
            SceneManagerInstance.shiftVideoMaterialWithEffect(17);
            break;
    
        }   
            //Workshop screen ClientPlus
        case 22: {

                     if (!SceneManagerInstance.didOnce) {
                        this.app.fire('IReachedHere','insideClientPlus');
                        SceneManagerInstance.didOnce = true;
                        //Rishabh Start
                        if(window.ReactHomeManager){
                            window.roomID = 14;
                            window.ReactHomeManager.user_AnalyticsHandler(14,"Enter");
                        }
                        //Rishabh End

                        SceneManagerInstance.playSigleVideo(18, function () {
                            SceneManagerInstance.TurnOffLoadingScreen();
                            SceneManagerInstance.videoSet = false;
                            SceneManagerInstance.app.fire('keepCameraCenter');
                            SceneManagerInstance.app.fire('PlayScreen2Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                            //for connecting ReactUI 
                            SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                            SceneManagerInstance.app.fire("pausesound");
                        });

                    }
                    //Checking current video null
                    SceneManagerInstance.shiftVideoMaterialWithEffect(18);

                    break;
         }
            //Workshop screen  Gaming
            case 23: {

                     if (!SceneManagerInstance.didOnce) {
                        this.app.fire('IReachedHere','insideGaming');
                        SceneManagerInstance.didOnce = true;
                        //Rishabh Start
                        if(window.ReactHomeManager){
                            window.roomID = 14;
                            window.ReactHomeManager.user_AnalyticsHandler(14,"Enter");
                        }
                        //Rishabh End

                        SceneManagerInstance.playSigleVideo(19, function () {
                            SceneManagerInstance.TurnOffLoadingScreen();
                            SceneManagerInstance.videoSet = false;
                            SceneManagerInstance.app.fire('keepCameraCenter');
                            SceneManagerInstance.app.fire('PlayScreen3Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                            //for connecting ReactUI 
                            SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                             SceneManagerInstance.app.fire("pausesound");
                        });

                    }
                    //Checking current video null
                    SceneManagerInstance.shiftVideoMaterialWithEffect(19);

                    break;
         }
              //Workshop screen  Enterprise
            case 24: {

                     if (!SceneManagerInstance.didOnce) {
                        this.app.fire('IReachedHere','insideEnterprise');
                        SceneManagerInstance.didOnce = true;
                        //Rishabh Start
                        if(window.ReactHomeManager){
                            window.roomID = 14;
                            window.ReactHomeManager.user_AnalyticsHandler(14,"Enter");
                        }
                        //Rishabh End

                        SceneManagerInstance.playSigleVideo(20, function () {
                            SceneManagerInstance.TurnOffLoadingScreen();
                            SceneManagerInstance.videoSet = false;
                            SceneManagerInstance.app.fire('keepCameraCenter');
                            SceneManagerInstance.app.fire('PlayScreen4Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                            //for connecting ReactUI 
                            SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                            SceneManagerInstance.app.fire("pausesound");
                        });
                         
                         
                         if(!this.EnterPriseSubBtn.enabled)
                             this.EnterPriseSubBtn.enabled=true;

                    }
                    //Checking current video null
                    SceneManagerInstance.shiftVideoMaterialWithEffect(20);
                
                

                    break;
         }
            //Workshop screen Consumer
            case 25: {

                     if (!SceneManagerInstance.didOnce) {
                        this.app.fire('IReachedHere','insideConsumer');
                        SceneManagerInstance.didOnce = true;
                        //Rishabh Start
                        if(window.ReactHomeManager){
                            window.roomID = 14;
                            window.ReactHomeManager.user_AnalyticsHandler(14,"Enter");
                        }
                        //Rishabh End
                        console.log("consumer");
                        SceneManagerInstance.playSigleVideo(21, function () {
                            SceneManagerInstance.TurnOffLoadingScreen();
                            SceneManagerInstance.videoSet = false;
                            SceneManagerInstance.app.fire('keepCameraCenter');
                            SceneManagerInstance.app.fire('PlayScreen4Vimeo');//calls the Vimeo init to ccreate Iframe and call vimeo video in it
                            //for connecting ReactUI 
                            SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                            SceneManagerInstance.app.fire("pausesound");
                        });

                    }
                    //Checking current video null
                    SceneManagerInstance.shiftVideoMaterialWithEffect(21);
                    

                    break;
         }
    }
    
    if(this.scene_state==2)
        {
            this.backButton.enabled = false;
        }else{
           // this.backButton.enabled = true;
        }
    
};

SceneManager.prototype.playSigleVideo = function (id, callback) {
    if (id > 0)
        this.TurnOnLoadingScreen();
    for (var i = 0; i < this.videos.length; i++) {
        if (this.videos[i].script.loopVideoComp.video) {
            if (id === i) {
                //console.log("Playyyyyyyyyyyyyyyy");
                this.videos[i].script.loopVideoComp.startVideoFirstTime(callback);
            } else {
                this.videos[i].script.loopVideoComp.stopVideo();
            }
        }
    }
};

SceneManager.prototype.shiftVideoMaterial = function (id) {

    if (this.videos[id].script.loopVideoComp.video) {
        var currentVideoTime = this.videos[id].script.loopVideoComp.getCurrentTime();
        //checking video play time
        if (currentVideoTime > 0.3 && !this.videoSet) {
            this.videoSet = true;
            this.changeVideoFrame(this.videos[id]);
        }
    }
};

SceneManager.prototype.shiftVideoMaterialWithEffect = function (id) {
    if (this.videos[id].script.loopVideoComp.video) {
        var currentVideoTime = this.videos[id].script.loopVideoComp.getCurrentTime();
        //checking video play time
        if (currentVideoTime > 0.3 && !this.videoSet) {
            this.videoSet = true;
            this.changeVideoFrame(this.videos[id]);
            //If show is true then hide
            if (this.screenFade.script.screenFadeEfx.isShowing())
                this.screenFade.script.screenFadeEfx.hide();
        }
    }
};


SceneManager.prototype.goToMeetingRoomSelection = function () {   
    this.scene_state = 5; //Go to state 5
    this.didOnce = false;
    this.videos[2].script.loopVideoComp.startVideoFirstTime();
};

SceneManager.prototype.goToAuditorium1 = function () {
    this.scene_state = 9; //Go to state 3
    this.didOnce = false;
    this.videos[6].script.loopVideoComp.startVideoFirstTime();
};

/*SceneManager.prototype.goToBreakoutRoom2 = function () {  
    this.scene_state = 7; //Go to state 5
    this.didOnce = false;
    this.videos[4].script.loopVideoComp.startVideoFirstTime();
};*/

/*SceneManager.prototype.goToAuditorium2 = function () {
    this.scene_state = 11; //Go to state 3
    this.didOnce = false;
    this.videos[8].script.loopVideoComp.startVideoFirstTime();
};

SceneManager.prototype.goToAuditorium3 = function () {
    this.scene_state = 13; //Go to state 3
    this.didOnce = false;
    this.videos[10].script.loopVideoComp.startVideoFirstTime();
};


SceneManager.prototype.goToLounge = function () {
    this.scene_state = 15; //Go to state 5
    this.didOnce = false;
    this.videos[12].script.loopVideoComp.startVideoFirstTime();
};
*/

SceneManager.prototype.goToHall = function () {
    this.scene_state = 17; //Go to state 5
    this.didOnce = false;
    this.videos[14].script.loopVideoComp.startVideoFirstTime();
};


SceneManager.prototype.goToWorkshop= function () {
    this.scene_state = 20; //Go to state 5
    this.didOnce = false;
    this.videos[16].script.loopVideoComp.startVideoFirstTime();
};


SceneManager.prototype.goToInformationDesk = function () {
    this.scene_state = 3; //Go to state 8
    this.didOnce = false;
    this.videos[1].script.loopVideoComp.startVideoFirstTime();
};

//Change State After Full Black on screen
SceneManager.prototype.changeState = function () {
    
    this.scene_state = this.targetState;
    this.didOnce = false;
    if(this.scene_state==2){
        this.wdbtomleftlogo.enabled = true;
    }
    else{
        this.wdbtomleftlogo.enabled = false;
    }
};

//Change State from outside
SceneManager.prototype.changeStateFromOutside = function (state_id) {
    this.scene_state = state_id;
    this.didOnce = false;
};

// Rishabh Start
//Change Stall State 
SceneManager.prototype.changeStallStateForAnalytics = function (stall_id) {
    console.log(stall_id);
    if(window.ReactHomeManager){
        if(stall_id == "GAME8"){
            window.roomID = "GAME8";
            window.ReactHomeManager.user_AnalyticsHandler(window.roomID,"Enter");    
        }
        else{
            window.roomID = "2"+stall_id;
            window.ReactHomeManager.user_AnalyticsHandler(window.roomID,"Enter");      
        } 
    }
    this.didOnce = false;
};
//Rishabh End

//Hide All Plains
SceneManager.prototype.hidePlains = function () {

};

//Change State from outside
SceneManager.prototype.changeVideoFrame = function (v) {
    this.mainScenePlane.model.material = v.script.loopVideoComp.material.resource;

};

SceneManager.prototype.TurnOffLoadingScreen = function () {
    if (this.loadingScreen) {
        ShowLoadingBar(false);
    }
};


SceneManager.prototype.TurnOnLoadingScreen = function () {
    if (this.loadingScreen) {
        ShowLoadingBar(true);
    }
};


SceneManager.prototype.loadAllVideos = function (callback) {

};


//Hide All Plains
SceneManager.prototype.ShowTutorial = function () {
 if (!this.tutorialUI.enabled) {
        this.tutorialUI.enabled = true;
        this.app.fire('resetTutorial');
    }
};