var TutorialManager = pc.createScript('tutorialManager');

TutorialManager.attributes.add('tutorial_state', {
    type: 'number',
    enum: [
        { 'lets_start': 1 },
        { 'quick_tutorial': 2 },
        { 'arrows': 3 },
        { 'lobby': 4 },
        { 'auditorium_1': 5 },
        { 'auditorium_2': 6 },
        { 'hall': 7 },
        { 'chat': 8 },
        { 'info': 9 },
        { 'hotspots': 10 },
    ],
    default: 1
});

//Lets Start

TutorialManager.attributes.add('letsBox', { type: 'entity' });
TutorialManager.attributes.add('letsButton', { type: 'entity' });
TutorialManager.attributes.add('newTutorial', { type: 'entity' });
TutorialManager.attributes.add('newTutorialContinueButton', { type: 'entity' });

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

TutorialManager.attributes.add('postion_of_highlight', {
    type: 'number',
    array: true
});

//Bottum bar end

TutorialManager.attributes.add('nextButton', { type: 'entity' });
TutorialManager.attributes.add('previousButton', { type: 'entity' });

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

TutorialManager.attributes.add('hallHotSpots', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('information_desk_hotspot', {
    type: 'entity',
    array: true
});

TutorialManager.attributes.add('skipButton', { type: 'entity' });


TutorialManager.prototype.initialize = function () {
    var self = this;
    this.doOnce = false;
    
    this.loadingScreen = this.app.root.findByName('loadingScreen');
    
    this.letsButton.element.on('click', function (evt) {
        //loading start
        // self.app.fire('startLobbyVideo', function(){
        //     // self.loadingScreen.enabled = false;
        //     ShowLoadingBar(false); //new css loader 
        //     self.tutorial_state = 2;
        //     self.doOnce = false;
        //     self.app.fire('skipTutorial');
        //     //loading off
        // });
        
       //  self.letsBox.enabled = false; 
      //  self.newTutorial.enabled = true;
            self.app.fire('skipTutorial');
            self.app.fire("startLobbyVideo");
            self.doOnce = false;
            self.app.fire('StopVimeo');    
    });
    this.newTutorialContinueButton.element.on('click', function (evt) {
        //loading start
            console.log("continue Pressed");
            self.app.fire('skipTutorial');
            self.app.fire("startLobbyVideo");
            self.doOnce = false;
//         self.app.fire('startLobbyVideo', function(){
//             // self.loadingScreen.enabled = false;
//             ShowLoadingBar(false); //new css loader 
            
//             //loading off
//         });
    });
    
   

    this.nextButton.element.on('click', function (evt) {
        self.next();
    }, this);

    this.previousButton.element.on('click', function (evt) {
        self.previous();
    }, this);

    this.skipButton.element.on('click', function (evt) {
        self.app.fire('skipTutorial');
    }, this);
    
    this.letsBox.enabled = true;
    
};

TutorialManager.prototype.update = function (dt) {

    console.log(this.tutorial_state);
    switch (this.tutorial_state) {
        case 1: {

            if (!this.doOnce) {
                this.doOnce = true;

                this.hideAllArrayContent(-1);
                this.arrowSession(-1);
                this.barButtonHighlight(-1);
                this.hotspots(-1);

                if (this.skipButton.enabled) {
                    this.skipButton.enabled = false;
                }
                
                 this.app.fire('PlayScreentutorial');
            }

            // if (!this.letsBox.enabled) {
            //     this.letsBox.enabled = true;
            // }

            if (this.nextButton.enabled) {
                this.nextButton.enabled = false;
            }
            if (this.previousButton.enabled) {
                this.previousButton.enabled = false;
            }


            break;
        }
        case 2: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (this.letsBox.enabled) {
                    this.letsBox.enabled = false;
                }

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
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
        case 3: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(1);
                this.arrowSession(1);
                this.barButtonHighlight(-1);
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
        case 4: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
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

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(3);
                this.arrowSession(-1);
                this.barButtonHighlight(1);
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
        case 6: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(4);
                this.arrowSession(-1);
                this.barButtonHighlight(2);
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
        case 7: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(5);
                this.arrowSession(-1);
                this.barButtonHighlight(3);
                this.hotspots(3);


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

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(6);
                this.arrowSession(-1);
                this.barButtonHighlight(4);
                this.hotspots(-1);//Chat no hotspot


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

                if (!this.skipButton.enabled) {
                    this.skipButton.enabled = true;
                }

                this.hideAllArrayContent(7);
                this.arrowSession(-1);
                this.barButtonHighlight(5);
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
        case 10: {

            if (!this.doOnce) {
                this.doOnce = true;

                if (this.skipButton.enabled) {
                    this.skipButton.enabled = false;
                }

                this.hideAllArrayContent(8);
                this.arrowSession(-1);
                this.barButtonHighlight(6);
                this.hotspots(6);


                if (!this.nextButton.enabled) {
                    this.nextButton.enabled = true;
                }
                if (!this.previousButton.enabled) {
                    this.previousButton.enabled = true;
                }
                this.nextButton.children[1].element.text = 'Start Your Experience';
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

    } else {
        if (id === 0) {
            this.hideAllHotspots();
            for (i = 0; i < this.lobbyHotSpots.length; i++) {
                this.lobbyHotSpots[i].enabled = true;
            }

        } else if (id === 1) {
            this.hideAllHotspots();
            for (i = 0; i < this.auditorium_1_hotspot.length; i++) {
                this.auditorium_1_hotspot[i].enabled = true;
            }

        } else if (id === 2) {
            this.hideAllHotspots();
            for (i = 0; i < this.auditorium_2_hotspot.length; i++) {
                this.auditorium_2_hotspot[i].enabled = true;
            }
        } else if (id === 3) {
            this.hideAllHotspots();
            for (i = 0; i < this.hallHotSpots.length; i++) {
                this.hallHotSpots[i].enabled = true;
            }
        } else if (id === 4) {
            this.hideAllHotspots();
            for (i = 0; i < this.information_desk_hotspot.length; i++) {
                this.information_desk_hotspot[i].enabled = true;
            }
        } else {
            for (i = 0; i < this.hallHotSpots.length; i++) {
                this.hallHotSpots[i].enabled = true;
            }
            for (i = 0; i < this.information_desk_hotspot.length; i++) {
                this.information_desk_hotspot[i].enabled = true;
            }
            for (i = 0; i < this.auditorium_2_hotspot.length; i++) {
                this.auditorium_2_hotspot[i].enabled = true;
            }
            for (i = 0; i < this.lobbyHotSpots.length; i++) {
                this.lobbyHotSpots[i].enabled = true;
            }
            for (i = 0; i < this.auditorium_1_hotspot.length; i++) {
                this.auditorium_1_hotspot[i].enabled = true;
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

    for (i = 0; i < this.information_desk_hotspot.length; i++) {
        this.information_desk_hotspot[i].enabled = false;
    }

    for (i = 0; i < this.lobbyHotSpots.length; i++) {
        this.lobbyHotSpots[i].enabled = false;
    }
};


TutorialManager.prototype.next = function () {
    this.tutorial_state++;
    if (this.tutorial_state > 10) {
        this.tutorial_state = 10;
        this.app.fire('skipTutorial');
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