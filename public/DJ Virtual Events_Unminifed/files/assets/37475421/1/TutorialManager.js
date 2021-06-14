var TutorialManager = pc.createScript('tutorialManager');

TutorialManager.attributes.add('tutorial_state', {
    type: 'number',
    enum: [
        { 'lets_start': 2 },
        { 'quick_tutorial': 3 },
        // { 'arrows': 3 },
        { 'lobby': 4 },
        { 'info':5 }, 

        { 'auditorium_1': 6 },
         { 'hall': 7 },
        { 'productshowcase': 8 },
        { 'lounge': 9 },
        { 'leaderboard': 10 },   
        { 'breakoutroom_1': 11 },
        // { 'breakoutroom_2': 7 },
        // { 'auditorium_2': 9 },
        // { 'auditorium_3': 10 },
        { 'hotspots': 12 },
        { 'Video': 13 },
    ],
    default: 2
});

//Lets Start

TutorialManager.attributes.add('letsBox', { type: 'entity' });
TutorialManager.attributes.add('letsButton', { type: 'entity' });
//All Tutorial Text
TutorialManager.attributes.add('tutorialTexts', {
    type: 'entity',
    array: true
});
//Left right arrow
TutorialManager.attributes.add('arrow_session', {
    type: 'entity',
    array: true
});

//Bottum bar
TutorialManager.attributes.add('bar_button_session', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('highlight', { type: 'entity' });
TutorialManager.attributes.add('textuserscount', { type: 'entity' });

TutorialManager.attributes.add('postion_of_highlight', {
    type: 'number',
    array: true
});

//Bottum bar end

TutorialManager.attributes.add('nextButton', { type: 'entity' });
TutorialManager.attributes.add('previousButton', { type: 'entity' });
TutorialManager.attributes.add('HomeImage', { type: 'entity' });
// TutorialManager.attributes.add('TintBG', { type: 'entity' });
TutorialManager.attributes.add('livechat', { type: 'entity' });
TutorialManager.attributes.add('analytics', { type: 'entity' });
TutorialManager.attributes.add('lobbyHotSpots', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('auditorium_1_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('auditorium_2_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('auditorium_3_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('lounge_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('brakoutroom_1_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('breakoutroom_2_hotspot', {
    type: 'entity',
    array: true
});


TutorialManager.attributes.add('hallHotSpots', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('information_desk_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('leaderboard_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('skipButton', { type: 'entity' });
TutorialManager.attributes.add('skipIntroTextButton', { type: 'entity' });
           
TutorialManager.prototype.initialize = function () {  
    
    this.tutorialWatchingFirstTime=true;
    
    var self = this;
    this.doOnce = false;
    this.reactHome = window.ReactHomeManager;
    this.loadingScreen = this.app.root.findByName('loadingScreen');
    self.tutorial_state=2;
    this.letsButton.element.on('click', function (evt) {
       
        self.tutorialWatchingFirstTime = false;
        self.app.fire('startLobbyVideo', function(){
            self.analytics.enabled = true;
            self.textuserscount.enabled = true;
            self.app.fire('PlayLobby');
             self.app.fire('StopVimeo'); 
        });
        
        /* //loading startselfself
         if (self.letsBox.enabled)
                {
                    self.letsBox.enabled = false;
                }
//         if(localStorage.getItem("Old"))
//             {
//                // self.app.fire('skipTutorial');
//                console.log("old video");
//                 self.app.fire('startLobbyVideo', function(){
                 self.analytics.enabled=true;
                 self.textuserscount.enabled=true;
//                 self.app.fire('PlayLobby');
//                 });
               
//             }
//         else
//             {
                console.log("new video");
                self.tutorial_state = 3;
                self.doOnce = false;
                self.app.fire('startIntroVideo');
                                
              //  localStorage.setItem("Old", "Yes");
             //   self.tutorial_state = 15;
               
               
            //    ShowLoadingBar(false);                    
              //  });
                // localStorage.setItem("Old", "Yes");
                // self.tutorial_state = 11;
                // self.doOnce = false;
                // ShowLoadingBar(false); //new css loader 
                
          //  }
         */
         
    });

    this.nextButton.element.on('click', function (evt) {
        self.next();
    }, this);

    this.previousButton.element.on('click', function (evt) {
        self.previous();
    }, this);

           
    this.app.on('resetTutorial', function () {
        self.tutorial_state = 3;
        self.doOnce = false;
    });
    
    this.skipButton.element.on('click', function (evt) {
                         // self.app.fire('skipTutorial');
                         if(this.TintBG.enabled)
                            this.TintBG.enabled=false;
                            if(this.HomeImage.enabled)
                              this.HomeImage.enabled=false;
                             this.doOnce =false;
                        this.tutorial_state = 2;
        
        
         self.app.fire('StopVimeo');    
        this.analytics.enabled=true;
        self.textuserscount.enabled=true;
   
       
        
    }, this);
    
      this.skipIntroTextButton.element.on('click', function (evt) {
         //If Tutorial watching Skip will skip to lobby
        if(self.tutorialWatchingFirstTime)
            {
                self.tutorialWatchingFirstTime=false;
                self.app.fire('skipTutorial');
            }else{
                self.entity.enabled=false;
                self.app.fire('ShowTutorialAgain');
            }

    }, this);
};

TutorialManager.prototype.update = function (dt) {
    switch (this.tutorial_state) {
        case 2: {
           
            if (!this.doOnce) {
                this.doOnce = true;

                this.hideAllArrayContent(-1);
                this.arrowSession(-1);
                this.barButtonHighlight(-1);
                this.hotspots(-1);

                if (this.skipButton.enabled) {
                    this.skipButton.enabled = false;
                }
                
                  if (this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = false;
                }
                
                if (!this.letsBox.enabled) {
                this.letsBox.enabled = true;
             }
                
              if (this.nextButton.enabled) {
                this.nextButton.enabled = false;
            }
            if (this.previousButton.enabled) {
                this.previousButton.enabled = false;
            }
                
                 this.app.fire('PlayScreen5Vimeo');
          }

        
            break;
        }
        case 3: {       
            
            if (!this.doOnce) {
                this.doOnce = true;            
              
                if (this.letsBox.enabled) {
                    this.letsBox.enabled = false;
                }

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(0);
                this.arrowSession(-1);
                this.barButtonHighlight(-1);
                this.hotspots(-1);
                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (this.previousButton.enabled) {
                    this.previousButton.enabled = false;
                }
                this.nextButton.children[1].element.text = 'Next';
            }

            break;
        }
//         case 3: {

//             if (!this.doOnce) {
//                 this.doOnce = true;


//                 this.hideAllArrayContent(1);
//                 this.arrowSession(1);
//                 this.barButtonHighlight(-1);
//                 this.hotspots(-1);
                
//                  if (!this.skipIntroTextButton.enabled) {
//                     this.skipIntroTextButton.enabled = true;
//                 }
                

//                 if (!this.nextButton.enabled) {
//                     this.nextButton.enabled = true;
//                 }
//                 if (!this.previousButton.enabled) {
//                     this.previousButton.enabled = true;
//                 }
//                 this.nextButton.children[1].element.text = 'Next';
//             }


//             break;
//         }
        case 4: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(2);
                this.arrowSession(-1);
                this.barButtonHighlight(0);
                this.hotspots(0);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        }
        case 5: {

            if (!this.doOnce) {
                this.doOnce = true;

                 if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(3);
                this.arrowSession(-1);
                this.barButtonHighlight(1);
                this.hotspots(8);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }


            break;
        }
        case 6: {

            if (!this.doOnce) {
                this.doOnce = true;

                 if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(4);
                this.arrowSession(-1);
                this.barButtonHighlight(2);
                this.hotspots(4);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        }
        case 7: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(5);
                this.arrowSession(-1);
                this.barButtonHighlight(3);
                this.hotspots(7);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }


            break;
        }
        case 8: {

            if (!this.doOnce) {
                this.doOnce = true;

                 if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(6);
                this.arrowSession(-1);
                this.barButtonHighlight(4);
                this.hotspots(5);//Chat no hotspot


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }


            break;
        }
        case 9: {

            if (!this.doOnce) {
                this.doOnce = true;

                 if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(7);
                this.arrowSession(-1);
                this.barButtonHighlight(5);
                this.hotspots(1);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }


            break;
        }
        case 10: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(8);
                this.arrowSession(-1);
                this.barButtonHighlight(6);
                this.hotspots(9);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        }
      case 11: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(9);
                this.arrowSession(-1);
                this.barButtonHighlight(7);
                this.hotspots(2);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        } 
      case 12: {

            if (!this.doOnce) {
                this.doOnce = true;

              if (this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = false;
                }

                this.hideAllArrayContent(12);
                this.arrowSession(-1);
                this.barButtonHighlight(11);
                this.hotspots(19);

                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Come! Begin this exciting experience';
            }



            break;
        }            
    /*  case 13: {                                                //leaderboard

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(11);
                this.arrowSession(-1);
                this.barButtonHighlight(9);
                this.hotspots(-1);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        } 
                
        case 14: {                                              // product showcase

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(1);
                this.arrowSession(-1);
                this.barButtonHighlight(10);
                this.hotspots(-1);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Next';
            }



            break;
        } 
       case 15: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipIntroTextButton.enabled) {
                    this.skipIntroTextButton.enabled = true;
                }

                this.hideAllArrayContent(12);
                this.arrowSession(-1);
                this.barButtonHighlight(11);
                this.hotspots(9);

                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Come! Begin this exciting experience';
            }



            break;
        }           */
         case 16: {

            if (!this.doOnce) {
                this.doOnce = true;
                // if (this.letsBox.enabled)
                // {
                //     this.letsBox.enabled = false;
                // }
                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }
                
                this.app.fire('keepCameraCenter');
                this.app.fire('PlayScreen5Vimeo');
                //this.TutorialVideo.script.loopVideoComp.startVideoFirstTime();
//              console.log("lets start");
                
                this.HomeImage.enabled=true;
               
            }

            break;
        }    

    }

};

TutorialManager.prototype.hideAllArrayContent = function (id) {

    for (var i = 0; i < this.tutorialTexts.length; i++) {
        if (i !== id)
            this.tutorialTexts[i].enabled = false;
    }

    if (id > -1) {

        if (this.tutorialTexts.length > id) {
            if (!this.tutorialTexts[id].enabled) {

                this.tutorialTexts[id].enabled = true;

                if (this.tutorialTexts[id].script.textAnimation)
                    this.tutorialTexts[id].script.textAnimation.resetAnimation();
            }
        }
    }
};

TutorialManager.prototype.arrowSession = function (id) {
    var i=0;
    if (id > -1) {
        for (i = 0; i < this.arrow_session.length; i++) {
            this.arrow_session[i].enabled = true;
        }
    } else {
        for (i = 0; i < this.arrow_session.length; i++) {
            this.arrow_session[i].enabled = false;
        }
    }
};

TutorialManager.prototype.barButtonHighlight = function (id) {
    var i=0;
    if (id > -1) {

        for (i = 0; i < this.bar_button_session.length; i++) {
            this.bar_button_session[i].enabled = false;
        }

        if (this.bar_button_session[id])
            this.bar_button_session[id].enabled = true;

        if (!this.highlight.enabled) {
            this.highlight.enabled = true;
        }

        var pos = this.highlight.getLocalPosition();
        pos.x = this.postion_of_highlight[id];
        this.highlight.setLocalPosition(pos);

    } else {

        for ( i = 0; i < this.bar_button_session.length; i++) {
            this.bar_button_session[i].enabled = false;
        }
        if (this.highlight.enabled) {
            this.highlight.enabled = false;
        }
    }

};


TutorialManager.prototype.hotspots = function (id) {
    var i = 0;
    if (id < 0) {

        this.hideAllHotspots();

    } 
    else {
        if (id === 0) {
            this.hideAllHotspots();
            for (i = 0; i < this.lobbyHotSpots.length; i++) {
                this.lobbyHotSpots[i].enabled = true;
            }

        } else if (id === 1) {
            this.hideAllHotspots();
            for (i = 0; i < this.lounge_hotspot.length; i++) {
                this.lounge_hotspot[i].enabled = true;
            }

        } else if (id === 2) {
            this.hideAllHotspots();
            for (i = 0; i < this.brakoutroom_1_hotspot.length; i++) {
                this.brakoutroom_1_hotspot[i].enabled = true;
            }
        } else if (id === 3) {
            this.hideAllHotspots();
            for (i = 0; i < this.breakoutroom_2_hotspot.length; i++) {
                this.breakoutroom_2_hotspot[i].enabled = true;
            }
        } 
        else if (id === 4) {
            this.hideAllHotspots();
            for (i = 0; i < this.auditorium_1_hotspot.length; i++) {
                this.auditorium_1_hotspot[i].enabled = true;
            }
        } 
         else if (id === 5) {
            this.hideAllHotspots();
            for (i = 0; i < this.auditorium_2_hotspot.length; i++) {
                this.auditorium_2_hotspot[i].enabled = true;
            }
        } 
         else if (id === 6) {
            this.hideAllHotspots();
            for (i = 0; i < this.auditorium_3_hotspot.length; i++) {
                this.auditorium_3_hotspot[i].enabled = true;
            }
        } 
        else if (id === 7) {
            this.hideAllHotspots();
            for (i = 0; i < this.hallHotSpots.length; i++) {
                this.hallHotSpots[i].enabled = true;
            }
        } 
         else if (id === 8) {
            this.hideAllHotspots();
            for (i = 0; i < this.information_desk_hotspot.length; i++) {
                this.information_desk_hotspot[i].enabled = true;
            }
        }  
        else if (id === 9) {
            this.hideAllHotspots();
            for (i = 0; i < this.leaderboard_hotspot.length; i++) {
                this.leaderboard_hotspot[i].enabled = true;
            } 
        } 
        else {
            for (i = 0; i < this.hallHotSpots.length; i++) {
                this.hallHotSpots[i].enabled = true;
            }
            for (i = 0; i < this.information_desk_hotspot.length; i++) {
                this.information_desk_hotspot[i].enabled = true;
            }
           
            for (i = 0; i < this.lobbyHotSpots.length; i++) {
                this.lobbyHotSpots[i].enabled = true;
            }
            
             for (i = 0; i < this.lounge_hotspot.length; i++) {
                this.lounge_hotspot[i].enabled = true;
            }
            for (i = 0; i < this.brakoutroom_1_hotspot.length; i++) {
                this.brakoutroom_1_hotspot[i].enabled = true;
            }
            for (i = 0; i < this.breakoutroom_2_hotspot.length; i++) {
                this.breakoutroom_2_hotspot[i].enabled = true;
        }    
            
            for (i = 0; i < this.auditorium_1_hotspot.length; i++) {
                this.auditorium_1_hotspot[i].enabled = true;
            }
             for (i = 0; i < this.auditorium_2_hotspot.length; i++) {
                this.auditorium_2_hotspot[i].enabled = true;
            }
              for (i = 0; i < this.auditorium_3_hotspot.length; i++) {
                  this.auditorium_3_hotspot[i].enabled = true;
            }
            for (i = 0; i < this.leaderboard_hotspot.length; i++) {
                this.leaderboard_hotspot[i].enabled = true;
            } 
        }

    }
};

TutorialManager.prototype.hideAllHotspots = function () {
    var i=0;
    for (i = 0; i < this.hallHotSpots.length; i++) {
        this.hallHotSpots[i].enabled = false;
    }

    for (i = 0; i < this.auditorium_1_hotspot.length; i++) {
        this.auditorium_1_hotspot[i].enabled = false;
    }

    for (i = 0; i < this.auditorium_2_hotspot.length; i++) {
        this.auditorium_2_hotspot[i].enabled = false;
    }
    for (i = 0; i < this.auditorium_3_hotspot.length; i++) {
        this.auditorium_3_hotspot[i].enabled = false;
    }

    for (i = 0; i < this.information_desk_hotspot.length; i++) {
        this.information_desk_hotspot[i].enabled = false;
    }

    for (i = 0; i < this.lobbyHotSpots.length; i++) {
        this.lobbyHotSpots[i].enabled = false;
    }
    
     for (i = 0; i < this.lounge_hotspot.length; i++) {
        this.lounge_hotspot[i].enabled = false;
    }
     for (i = 0; i < this.brakoutroom_1_hotspot.length; i++) {
        this.brakoutroom_1_hotspot[i].enabled = false;
    }
     for (i = 0; i < this.breakoutroom_2_hotspot.length; i++) {
        this.breakoutroom_2_hotspot[i].enabled = false;
    }  
    for (i = 0; i < this.leaderboard_hotspot.length; i++) {
        this.leaderboard_hotspot[i].enabled = false;
    }  
  
};


TutorialManager.prototype.next = function () {
    this.tutorial_state++;
    if (this.tutorial_state > 12) {
        this.tutorial_state = 12;
        
        //If Tutorial watching Skip will skip to lobby
        if(this.tutorialWatchingFirstTime)
            {
                this.tutorialWatchingFirstTime=false;
                this.app.fire('skipTutorial');
            }else{
                this.entity.enabled=false;
                this.app.fire('ShowTutorialAgain');
            }
       
        
    }
    this.doOnce = false;
};

TutorialManager.prototype.previous = function () {
    this.tutorial_state--;
    if (this.tutorial_state < 0) {
        this.tutorial_state = 0;
    }
    this.doOnce = false;
};