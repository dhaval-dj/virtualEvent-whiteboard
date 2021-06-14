var SceneManager = pc.createScript('sceneManager');

var mobileManager = this;

SceneManager.attributes.add('mainScenePlane', {
    type: 'entity',
    description: 'Plain'
});
SceneManager.attributes.add('tutorialUI', {
    type: 'entity',
    description: 'Idle Screen Plain'
});
SceneManager.attributes.add('screenUI', {
    type: 'entity',
    description: 'Idle Screen Plain'
});
SceneManager.attributes.add('imagePlanes', {
    type: 'entity',
    array: true
});

SceneManager.attributes.add('screenFade', {
    type: 'entity',
    description: 'Screen Fade Effect'
});
SceneManager.attributes.add('backButton', {
    type: 'entity',
    description: 'Back Button from othere scene to home'
});
SceneManager.attributes.add('Showtutorialbtn', { type: 'entity' });
SceneManager.attributes.add('breakoutselectionpage', { type: 'entity', description: 'Breakout Selection Page' });
SceneManager.attributes.add('TutorialScreen', { type: 'entity' });
SceneManager.attributes.add('wdbtomleftlogo', { type: 'entity', description: 'Wester Digital Bottom Left Logo' });
SceneManager.attributes.add('breakoutreander', {
    type: 'entity',
    array: true
});


SceneManager.prototype.resetState = function () {
    var self = this;
    self.app.fire('TurnOffLobbyButton');
    self.app.fire('TurnOffInformation');
    self.app.fire('TurnOffStalls');
    self.app.fire('TurnOffCareerCafeSelection');
    if (self.currentState !== self.states.careerCafeSelection)
        self.app.fire('hideCareerCafeQna');
    self.app.fire('TurnOffLobbyStall');
    self.app.fire('TurnOffHallStall');
    self.app.fire('TurnOffWorkshop');
    self.app.fire('hideAllStall');
    self.app.fire('hideLeftRightArrow');
    self.app.fire('StopVimeo');
    closeStallConetent();
};
var SceneManagerInstance;

SceneManager.prototype.initialize = function () {
    var self = this;
    this.loadingScreen = this.app.root.findByName('loadingScreen');
    window.SceneManagerObj = this;
    this.states = {
        lobby: 0,
        informationDesk: 1,
        audi1: 2,
        breakeout: 3,
        hall: 4,
        stall: 6,
        breakoutselection: 7,
        breakoutloop: 8,
        workshopLobby: 9,
        workshopAudiClient: 10,
        workshopAudiGameing: 11,
        workshopAudiEnterprise: 12,
        workshopAudiConsumer: 13,
    };

    this.currentState = this.lobby;
    this.currentCareerCafeSelection = 1;

    SceneManagerInstance = this;
    this.reactHome = window.ReactHomeManager;

    this.videoSet = false;
    //Inside state do once this 
    this.didOnce = false;
    this.targetState = 1;
    this.breakoutnumber=1;
    //Start MainVideo
    this.app.on('startLobbyVideo', function () {
        self.showImagePlane(0);
    });

    //Skip Tutorial
    this.app.on('skipTutorial', function () {
        console.log("heres");
        self.tutorialUI.enabled = false;
        self.currentState = self.states.lobby;
        self.didOnce = false;
    });

    //Calling from fade script after coplete baclk
    this.app.on('changeState', function () {
        self.resetState();
        self.showImagePlane(-1);
        self.changeState();
    });

    //for back button 
    this.app.on('comeBack', function () {

        if (self.currentState === self.states.lobby) {
            return;
        } else if (self.currentState === self.states.stall) {
            //fade
            self.targetState = self.states.hall; //assign as temp
            self.app.fire('hideAllStall');
            //self.app.fire("hideCareerCafeQna");
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var
        } else if (self.currentState === self.states.workshopAudiClient || self.currentState === self.states.workshopAudiConsumer ||
            self.currentState === self.states.workshopAudiEnterprise || self.currentState === self.states.workshopAudiGameing) {
            self.targetState = self.states.workshopLobby; //assign as temp
            //fade
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var
        } else if (self.currentState === self.states.audi1) {
            //fade
            self.targetState = self.states.lobby; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var
        } 
        else if (self.currentState === self.states.breakoutloop ) {
            self.targetState = self.states.breakoutselection; //assign as temp
            //fade
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var
        }
        else {
            //fade
            self.targetState = self.states.lobby; //assign as temp
            self.app.fire("goBackToLobby");
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var   
        }

        if(self.TutorialScreen.enabled)
            self.TutorialScreen.enabled=false;
    });



    /*this.app.on('goToLobby', function () {
        console.log("Show lobby");
        if (self.currentState != self.states.lobby) {
            self.targetState = self.states.lobby;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
        }
    });

    this.app.on('enterLobbyStall', function () {
        console.log("Show lobby");
        if (self.currentState != self.states.lobby) {
            self.targetState = self.states.lobby;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var
        }
    });

    
    this.app.on('enterAuditorium1', function () {
        if (self.currentState != self.states.audi1) {
            self.targetState = self.states.audi1; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
            self.app.fire('showCareerCafe');
        }
    });


    
    this.app.on('goToLobbyStall', function () {
        console.log("info called");
        if (self.currentState != self.states.lobbyStall) {
            self.targetState = self.states.lobbyStall;//assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');//screenFadeEfx.js->pass by var 
        }
    });*/


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Main Audi
    this.app.on('goToAuditorium1', function () {
        if(self.reactHome)
        {
            const result = self.reactHome.GetRoomStatus("auditorium");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            } 
          
        }
          if (self.currentState != self.states.audi1) {
                console.log("GotoAui1called");
                self.app.fire('goToAuditorium1menu');                
                self.targetState = self.states.audi1; //assign as temp
                self.screenFade.script.screenFadeEfx.show('changeState');
            }        
    });

    //Brakeout room
    this.app.on('goToMeetingRoomSelection', function () {
        if(self.reactHome)
        {
            const result = self.reactHome.GetRoomStatus("meeting");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            } 

        }       

        if (self.currentState != self.states.breakoutselection) {                        
            self.targetState = self.states.breakoutselection; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var
        }
        
    });


    //Information Desk
    this.app.on('goToInformationDesk', function () {
        console.log("info called");
        if (self.currentState != self.states.informationDesk) {
            self.targetState = self.states.informationDesk; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var 
        }
    });

    //Workshop Looby
    this.app.on('goToWorkshop', function () {

        if(self.reactHome)
        {
            const result = self.reactHome.GetRoomStatus("workshop");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            }         
        }        
        if (self.currentState != self.states.workshopLobby) {
            self.targetState = self.states.workshopLobby; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var 
        }       
       
    });

    //Hall
    this.app.on('goToHall', function () {

        if(self.reactHome)
        {
            const result = self.reactHome.GetRoomStatus("expohall");
            if(!result.status)
            {
                self.reactHome.showInfoPopUp(result.message);
                self.app.fire('StateReached');
                return;
            }         
        }        
        if (self.currentState != self.states.hall) {
            self.targetState = self.states.hall; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState'); //screenFadeEfx.js->pass by var 
        }
    });

    // breakout selection
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
             self.reactHome.callEnterBreakout(true); 
             
        } 
       
        SceneManagerInstance.breakoutnumber=breakoutnumber;   
        self.targetState = self.states.breakoutloop; 
        self.screenFade.script.screenFadeEfx.show('changeState');
    });
    
    
    //Workshop Client+
    this.app.on('enterWorkshopScreenClientPlus', function () {
        //Check Condition can enter or not
        if (self.currentState != self.states.workshopAudiClient) {
            console.log("GotoAui1called");
            /*self.app.fire('goToAuditorium1menu');
            if (self.reactHome) {
                self.reactHome.UpdateAnalytics("CareerCafe");
            }*/
            self.targetState = self.states.workshopAudiClient; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
        }
    });

    //Workshop gameing
    this.app.on('enterWorkshopScreenGaming', function () {
        //Check Condition can enter or not
        if (self.currentState != self.states.workshopAudiGameing) {
            /*self.app.fire('goToAuditorium1menu');
            if (self.reactHome) {
                self.reactHome.UpdateAnalytics("CareerCafe");
            }*/
            self.targetState = self.states.workshopAudiGameing; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
        }
    });

    //Workshop Enterprise
    this.app.on('enterWorkshopScreenEnterprise', function () {
        //Check Condition can enter or not
        if (self.currentState != self.states.workshopAudiEnterprise) {
            /*self.app.fire('goToAuditorium1menu');
            if (self.reactHome) {
                self.reactHome.UpdateAnalytics("CareerCafe");
            }*/
            self.targetState = self.states.workshopAudiEnterprise; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
        }
    });

    //Workshop Consumer
    this.app.on('enterWorkshopScreenConsumer', function () {
        //Check Condition can enter or not
        if (self.currentState != self.states.workshopAudiConsumer) {
            /*self.app.fire('goToAuditorium1menu');
            if (self.reactHome) {
                self.reactHome.UpdateAnalytics("CareerCafe");
            }*/
            self.targetState = self.states.workshopAudiConsumer; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
        }
    });


    this.app.on('showStall', function (id) {
        //Check Condition can enter or not
        if (self.currentState != self.states.stall) {
            self.targetState = self.states.stall; //assign as temp
            self.screenFade.script.screenFadeEfx.show('changeState');
        }
    });

     this.Showtutorialbtn.element.on('click', function (evt) {
         
         if(!self.TutorialScreen.enabled)
             {
                 self.app.fire('PlayScreentutorial');
                 self.TutorialScreen.enabled=true;
             }
     });
    
     this.app.on('HideTutorial', function (evt) {
         
         if(self.TutorialScreen.enabled)
            self.TutorialScreen.enabled=false;
            self.app.fire('StopVimeo');
     });
    
    
    //     self.app.fire("startLobbyVideo");
    //         self.app.fire("skipTutorial");
};

SceneManager.prototype.update = function (dt) {
    
    if(this.currentState===0||this.currentState===1||this.currentState===2||this.currentState===4||this.currentState===6)
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

    switch (this.currentState) {
        //'Tutorial'
        //         case 1:{
        //             if(!this.didOnce){
        //                 this.didOnce=true;
        //             }
        //             if(!this.tutorialUI.enabled){
        //                 this.tutorialUI.enabled=true;
        //             }

        //             if(this.screenUI.enabled){
        //                 this.screenUI.enabled=false;
        //             }
        //             break;
        //         }

        case this.states.lobby: {

            if (!this.didOnce) {
                this.didOnce = true;
                // this.tutorialUI.enabled=false;

                this.app.fire('IReachedHere', 'lobby');
                this.screenUI.enabled = true;
                this.app.fire('showLeftRightArrow');
                this.app.fire('keepCameraCenter');
                this.app.fire('TurnOnLobbyButton');
                this.showImagePlane(0);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

                if(SceneManagerInstance.breakoutselectionpage.enabled)
                SceneManagerInstance.breakoutselectionpage.enabled=false;          // disable breakout meeting selection page

                // if(SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled)
                //     SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=false; 
            }
            break;
        }

        /* case this.states.careerCafeSelection:
             {
                 if (!this.didOnce) {
                     this.didOnce = true;
                     this.app.fire('showLeftRightArrow');
                     this.app.fire('TurnOnCareerCafeSelection');
                     SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                     this.showImagePlane(6);
                     if (this.screenFade.script.screenFadeEfx.isShowing())
                         this.screenFade.script.screenFadeEfx.hide();
                 }
                 break;
             }*/
        //Main Audi
        case this.states.audi1: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('IReachedHere', 'insideAudi');
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                var self1 = this;
                setTimeout(function () {
                    self1.app.fire('PlayScreen2Vimeo');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(2);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

            }
            break;
        }
        case this.states.breakeout: {

            if (!this.didOnce) {

                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('IReachedHere', 'insideBreakout');
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                var self = this;
                setTimeout(function () {
                    self.app.fire('PlayScreen1Dailyco');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                this.showImagePlane(1);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }
        case this.states.hall: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('IReachedHere', 'insideHall');
                this.app.fire('hideAllStall');
                this.app.fire('showLeftRightArrow');
                this.app.fire('TurnOnHallStall');
                this.app.fire('keepCameraCenter');
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(6);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }
        case this.states.stall: {
            if (!this.didOnce) {

                this.didOnce = true;
                // this.resetState();
                this.app.fire('IReachedHere', 'insideStall');
                this.showImagePlane(-1);
                this.screenFade.script.screenFadeEfx.hide();
                this.app.fire('TurnOffHallStall');
                this.app.fire('showLeftRightArrow');
            }
            break;
        }
        case this.states.informationDesk: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.app.fire('IReachedHere', 'infodesk');
                this.app.fire('showLeftRightArrow');
                this.app.fire('TurnOnInformation');
                this.app.fire('keepCameraCenter');
                this.showImagePlane(4);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }
        /*case this.states.lobbyStall: {
            console.log("AAA");
            if (!this.didOnce) {
                this.didOnce = true;
                this.app.fire('showLeftRightArrow');
                this.app.fire('TurnOnLobbyStall');
                SceneManagerInstance.app.fire('StateReached');//event which stoppes react menu loading
                this.app.fire('keepCameraCenter');
                this.showImagePlane(5);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }*/
            
          case this.states.breakoutselection: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.app.fire('showLeftRightArrow');
                
                this.app.fire('IReachedHere', 'breakOutRoomHotsopt');
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                this.app.fire('keepCameraCenter');
                SceneManagerInstance.breakoutselectionpage.enabled=true; 
                // if(SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled)
                // SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=false;
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }
            
         case this.states.breakoutloop: {

            if (!this.didOnce) {

                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('IReachedHere', 'insideBreakout');
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                // SceneManagerInstance.breakoutreander[SceneManagerInstance.breakoutnumber-1].enabled=true; 
                SceneManagerInstance.breakoutselectionpage.enabled=false;
                var self = this;
                setTimeout(function () {
                    self.app.fire('PlayScreen1Dailyco');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                this.showImagePlane(1);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }    
        case this.states.workshopLobby: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.app.fire('showLeftRightArrow');
                this.app.fire('TurnOnWorkshop');
                this.app.fire('IReachedHere', 'insideWorkshopLobby');
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading
                this.app.fire('keepCameraCenter');
                this.showImagePlane(3);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();
            }
            break;
        }
        case this.states.workshopAudiClient: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                this.app.fire('IReachedHere', 'insideClientPlus');
                var self1 = this;
                setTimeout(function () {
                    self1.app.fire('PlayScreen2Vimeo');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(2);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

            }
            break;
        }
        case this.states.workshopAudiGameing: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                this.app.fire('IReachedHere', 'insideGaming');
                var self1 = this;
                setTimeout(function () {
                    self1.app.fire('PlayScreen2Vimeo');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(2);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

            }
            break;
        }
        case this.states.workshopAudiEnterprise: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                this.app.fire('IReachedHere', 'insideEnterprise');
                var self1 = this;
                setTimeout(function () {
                    self1.app.fire('PlayScreen2Vimeo');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(2);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

            }
            break;
        }
        case this.states.workshopAudiConsumer: {
            if (!this.didOnce) {
                this.didOnce = true;
                this.videoSet = false;
                this.app.fire('keepCameraCenter');
                this.app.fire('hideLeftRightArrow');
                this.app.fire('IReachedHere', 'insideConsumer');
                var self1 = this;
                setTimeout(function () {
                    self1.app.fire('PlayScreen2Vimeo');
                }, 100);
                SceneManagerInstance.app.fire('StateReached'); //event which stoppes react menu loading

                this.showImagePlane(2);
                if (this.screenFade.script.screenFadeEfx.isShowing())
                    this.screenFade.script.screenFadeEfx.hide();

            }
            break;
        }
    }

  /*  if (this.currentState !== this.states.lobby && this.currentState !== undefined) {
        if (!this.backButton.enabled)
            this.backButton.enabled = true;
    } else {
        if (this.backButton.enabled)
            this.backButton.enabled = false;
    }*/

};

SceneManager.prototype.changeState = function () {
    this.currentState = this.targetState;
    console.log("changestate" + this.currentState);
    this.didOnce = false;
       if(this.currentState===0){
           if(!this.wdbtomleftlogo.enabled)
        this.wdbtomleftlogo.enabled = true;
    }
    else{
        if(this.wdbtomleftlogo.enabled)
        this.wdbtomleftlogo.enabled = false;
    }
    this.app.fire('keepCameraCenter');
};

//Change State from outside
SceneManager.prototype.changeStateFromOutside = function (state_id) {
    this.currentState = state_id;
    this.didOnce = false;
};

SceneManager.prototype.showImagePlane = function (imagePlaneIndex) {
    for (var i = 0; i < this.imagePlanes.length; i++) {
        if (imagePlaneIndex === i) {
            this.imagePlanes[i].enabled = true;
        } else {
            this.imagePlanes[i].enabled = false;
        }
    }
};