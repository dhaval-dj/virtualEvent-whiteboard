var Manager = pc.createScript('manager');

var publicThat;
var isFullScreenMode_manager=false;
//Video Player
Manager.attributes.add('lobbyIdle_vid', { type: 'entity', description: 'Lobby Idle Video' });
Manager.attributes.add('toAuditoriume_vid', { type: 'entity', description: 'Lobby To Auditoriume Video' });
Manager.attributes.add('toAuditoriume_vidTwo', { type: 'entity', description: 'Lobby To Auditoriume Video 2' });
Manager.attributes.add('Auditoriume_vid', { type: 'entity', description: 'Auditoriume video' });
Manager.attributes.add('Auditoriume_1_dim', { type: 'entity', description: 'Auditoriume 1 DIM video' });
Manager.attributes.add('Auditoriume2_vid', { type: 'entity', description: 'Auditoriume 2 video' });
Manager.attributes.add('Auditoriume_2_dim', { type: 'entity', description: 'Auditoriume 2 DIM video' });

Manager.attributes.add('toHal', { type: 'entity', description: 'Lobby To Hall Video' });
Manager.attributes.add('hall', { type: 'entity', description: 'Hall Video' });
Manager.attributes.add('toIndormation', { type: 'entity', description: 'Lobby To information Video' });
//Stall

//Buttons
Manager.attributes.add('play_btn', { type: 'entity', description: 'Start' });
Manager.attributes.add('moveToAuditoriume1_btn', { type: 'entity', description: 'Auditoriume Button 1' });
Manager.attributes.add('moveToAuditoriume2_btn', { type: 'entity', description: 'Auditoriume Button 2' });
Manager.attributes.add('hall1_btn', { type: 'entity', description: 'Hall Button 1' });
Manager.attributes.add('hall2_btn', { type: 'entity', description: 'Hall Button 2' });
Manager.attributes.add('info_btn', { type: 'entity', description: 'Information desk Button' });

Manager.attributes.add('stall1_btn', { type: 'entity', description: 'Google Stall 1 Button' });
Manager.attributes.add('stall2_btn', { type: 'entity', description: 'Google Stall 2 Button' });
Manager.attributes.add('stall3_btn', { type: 'entity', description: 'Facebook Stall 1 Button' });
Manager.attributes.add('stall4_btn', { type: 'entity', description: 'Facebook Stall 2 Button' });
Manager.attributes.add('stall5_btn', { type: 'entity', description: 'Windows Stall Button' });

//Scene Object
Manager.attributes.add('stall1', { type: 'entity', description: 'Google Stall 1' });
Manager.attributes.add('stall2', { type: 'entity', description: 'Google Stall 2' });
Manager.attributes.add('stall3', { type: 'entity', description: 'Facebook Stall 1' });
Manager.attributes.add('stall4', { type: 'entity', description: 'Facebook Stall 2' });
Manager.attributes.add('stall5', { type: 'entity', description: 'Windows Stall' });


//Other
Manager.attributes.add('idle_screen_obj', { type: 'entity', description: 'Idle Screen Object Befor Start' });
Manager.attributes.add('googel', { type: 'entity', description: 'Google Stall Buttons' });
Manager.attributes.add('facebook', { type: 'entity', description: 'Facebook Stall Buttons' });
Manager.attributes.add('windows', { type: 'entity', description: 'Windows Stall Buttons' });

Manager.attributes.add('stallBack', { type: 'entity', description: 'Back Button from stall' });
Manager.attributes.add('mainBack', { type: 'entity', description: 'Back Button to main' });

Manager.attributes.add('hallButtons', { type: 'entity', description: 'Hall Button set' });
Manager.attributes.add('auditoriumeButtons', { type: 'entity', description: 'Auditoriume Button set' });
Manager.attributes.add('informationdeskButtons', { type: 'entity', description: 'Information Button set' });

Manager.attributes.add('audScreen', { type: 'entity', description: 'Auditoriume Screen' });
Manager.attributes.add('audScreen2', { type: 'entity', description: 'Auditoriume Screen 2' });

Manager.attributes.add('camera', { type: 'entity', description: 'Auditoriume Screen' });

Manager.attributes.add('maxval', { type: 'number' });

Manager.attributes.add('nextButton', { type: 'entity', });
Manager.attributes.add('previuseButton', { type: 'entity', });

Manager.attributes.add('barButtons', { type: 'entity', });
Manager.attributes.add('fadeEffect', { type: 'entity', });


Manager.attributes.add('photoMosaic', { type: 'entity', description: 'Photo Mosaic' });
Manager.attributes.add('carButton', { type: 'entity', description: 'Photo Mosaic' });
Manager.attributes.add('gameButton', { type: 'entity', description: 'Photo Mosaic' });
Manager.attributes.add('handposeBtn', { type: 'entity', title: 'handposeBtn' });
Manager.attributes.add('inhalerBtn', { type: 'entity', title: 'inhalerBtn' });

Manager.attributes.add('bakground', { type: 'entity', });

Manager.attributes.add('infoTech', { type: 'entity', });

Manager.attributes.add('close1', { type: 'entity', });
Manager.attributes.add('close2', { type: 'entity', });

Manager.attributes.add('photoMosaicIframe', { type: 'entity', });
Manager.attributes.add('carIframe', { type: 'entity', });
Manager.attributes.add('gameIframe', { type: 'entity', });
Manager.attributes.add('chatIframe', { type: 'entity', });
Manager.attributes.add('handposeIframe', { type: 'entity', });
Manager.attributes.add('inhalerIframe', { type: 'entity', });

Manager.attributes.add('auditoriumeUIButtons', { type: 'entity', });

Manager.attributes.add('qnaIframe', { type: 'entity', });
Manager.attributes.add('qnaButtonIcon', { type: 'entity', });

Manager.attributes.add('pollIframe', { type: 'entity', });
Manager.attributes.add('pollButtonIcon', { type: 'entity', });

Manager.attributes.add('fullScreebBtn', { type: 'entity', });
Manager.attributes.add('fullScreebVideo', { type: 'entity', });

Manager.attributes.add('fullScreeb2Btn', { type: 'entity', });
Manager.attributes.add('fullScreeb2Video', { type: 'entity', });

Manager.attributes.add('greenScreen', { type: 'entity', });

Manager.attributes.add('usegreenScreen', { type: 'boolean', default: true });
Manager.attributes.add('hslVideo', { type: 'boolean', default: true });

Manager.attributes.add('tutorial', { type: 'entity', });
Manager.attributes.add('mainUIScreen', { type: 'entity', });



Manager.prototype.selectButton = function (x) {

    for (var i = 0; i < 6; i++) {
        
        if(this.barButtons.children[i].script.barActionBtn){
            if(x !== i)
                this.barButtons.children[i].script.barActionBtn.selectThisButton(false);
            else
                this.barButtons.children[i].script.barActionBtn.selectThisButton(true);
        }

    }

};

Manager.prototype.initialize = function () {
    
    //New Feture Added Dim Video
    this.dimVideo1=false;
     this.dimVideo2=false;
    
    isFullScreenMode_manager=false;
    publicThat = this;
    var self = this;
    this.state = 0;
    this.isInFirst = true;
    this.alpha = 0;
    this.start = 0;
    this.end = 0;
    this.currentPos = 0;
    this.fade = this.fadeEffect.script.fadeEffects;
    this.fromStall = false;
    this.buutonId = 0;
    this.backButtonPressd = false;

    this.isPollOpen = false;

    this.audiIframe = 0;
    
     this.app.on('skipTutorial', function(){
        self.tutorial.enabled = false;
         self.mainUIScreen.enabled = true;
         self.auditoriumeButtons.enabled = true;
    });
    

//     this.fullScreebBtn.element.on('click', function (evt) {
//     isFullScreenMode_manager=true;
//         self.audiIframe = 0;
//         self.fullScreebVideo.script.fullScreenHtml.showFullScreenVideo();
//         //openVideoFullscreen();
//     }, this);
    
//     this.fullScreeb2Btn.element.on('click', function (evt) {
//     isFullScreenMode_manager=true;
//         self.audiIframe = 0;
//         self.fullScreeb2Video.script.fullScreenHtml.showFullScreenVideo();
//         //openVideoFullscreen();
//     }, this);

    this.qnaButtonIcon.element.on('click', function (evt) {
        if (self.audiIframe === 0) {
            self.openQNAIframe();
        } else if (self.audiIframe === 1) {
            self.closeAllIframe();
        } else {
            self.closeAllIframe();
            self.openQNAIframe();
        }

    }, this);

    this.pollButtonIcon.element.on('click', function (evt) {
        if (self.audiIframe === 0) {
            self.openPollIframe();
        } else if (self.audiIframe === 1) {
            self.closeAllIframe();
            self.openPollIframe();
        } else {
            self.closeAllIframe();
        }

    }, this);

    

    this.photoMosaic.element.on('click', function (evt) {
        this.photoMosaicIframe.script.htmlHandler.showIFRMAE();
    }, this);

    this.carButton.element.on('click', function (evt) {
        this.carIframe.script.htmlHandler.showIFRMAE();
    }, this);

    this.gameButton.element.on('click', function (evt) {
        this.gameIframe.script.htmlHandler.showIFRMAE();
    }, this);

     this.handposeBtn.element.on('click', function (evt) {
        this.handposeIframe.script.htmlHandler.showIFRMAE();
    }, this);

     this.inhalerBtn.element.on('click', function (evt) {
        this.inhalerIframe.script.htmlHandler.showIFRMAE();
    }, this);


    this.previuseButton.element.on('click', function (evt) {
        this.currentPos++;
        if (this.currentPos > 1)
            this.currentPos = 1;

        if (this.currentPos === 0) {
            this.end = 0;
        } else {
            this.end = -this.maxval;
        }

        this.start = this.camera.getPosition().x;
        this.alpha = 0;
    }, this);

    this.nextButton.element.on('click', function (evt) {
        this.currentPos--;
        if (this.currentPos < -1)
            this.currentPos = -1;

        if (this.currentPos === 0) {
            this.end = 0;
        } else {
            this.end = this.maxval;
        }

        this.start = this.camera.getPosition().x;
        this.alpha = 0;
    }, this);

//Home button
    this.barButtons.children[0].element.on('click', function (evt) {

        if (this.state != 1) {
            self.moveToHome();
            this.backButtonPressd = true;

            self.barButtons.children[0].element.color = new pc.Color(1, 1, 1);
        }



    }, this);

//Auditorium button 1
    this.barButtons.children[1].element.on('click', function (evt) {


        if (this.state !== 3 && this.state !== 2 && this.state !== 4) {

              if (self.state == 1) {
                    self.hideAll();
                    self.state = 2;
                    self.isInFirst = true;
                } else {
                    this.app.fire('ChatbotOff');
                    self.fade.show();
                    setTimeout(function () {
                        self.hideAll();
                        self.state = 3;
                        self.isInFirst = true;
                        // setTimeout(function () { self.fade.hide(); }, 300);
                    }, 1000);
                }

        }
        self.barButtons.children[1].element.color = new pc.Color(1, 1, 1);
    }, this);
    
    //Auditorium button 2
    this.barButtons.children[2].element.on('click', function (evt) {


        if (this.state !== 8 && this.state !== 9 && this.state !== 4) {

            if (self.state == 1) {
                    self.hideAll();
                    self.state = 8;
                    self.isInFirst = true;
                } else {
                    this.app.fire('ChatbotOff');
                    self.fade.show();
                    setTimeout(function () {
                        self.hideAll();
                        self.state = 9;
                        self.isInFirst = true;
                        // setTimeout(function () { self.fade.hide(); }, 300);
                    }, 1000);
                }
        }
        self.barButtons.children[2].element.color = new pc.Color(1, 1, 1);
    }, this);
    
//Hall Button
    this.barButtons.children[3].element.on('click', function (evt) {
        if (this.state !== 4 && this.state !== 5) {
            if (this.state !== 2 && this.state !== 4) {

                if (self.state == 1) {
                    self.hideAll();
                    self.state = 4;
                    self.isInFirst = true;
                } else {
                     this.app.fire('ChatbotOff');
                    self.fade.show();
                    setTimeout(function () {
                        self.hideAll();
                        self.state = 5;
                        self.isInFirst = true;
                        // setTimeout(function () { self.fade.hide(); }, 500);
                    }, 1000);
                }
            }
        }
        self.barButtons.children[3].element.color = new pc.Color(1, 1, 1);
    }, this);

    //Chat 
    this.barButtons.children[4].element.on('click', function (evt) {
         this.app.fire('ChatbotOff');
        this.chatIframe.script.htmlHandlerForAll.showIFRMAE();
        self.barButtons.children[4].element.color = new pc.Color(1, 1, 1);
    }, this);


    //Information Button
    this.barButtons.children[5].element.on('click', function (evt) {
        //this.qnaIframe.script.htmlHandlerQna.showIFRMAE();        
        if (this.state !== 7) {
            if (this.state !== 2 && this.state !== 4) {
                if (self.state == 1) {
                    this.hideAll();
                    this.state = 7;
                    this.isInFirst = true;
                    this.barButtons.enabled = false;
                } else {
                      this.app.fire('ChatbotOff');
                    self.fade.show();
                    this.barButtons.enabled = false;
                    setTimeout(function () {
                        self.hideAll();
                        self.state = 7;
                        self.isInFirst = true;
                        setTimeout(function () { self.fade.hide(); }, 600);
                    }, 1000);
                }
            }
        }
        self.barButtons.children[5].element.color = new pc.Color(1, 1, 1);
    }, this);



    this.play_btn.element.on('click', function (evt) {
        this.state = 1;
        this.isInFirst = true;
    }, this);

    this.moveToAuditoriume1_btn.element.on('click', function (evt) {
        this.state = 2;
        this.isInFirst = true;
    }, this);

    this.moveToAuditoriume2_btn.element.on('click', function (evt) {
        this.state = 8;
        this.isInFirst = true;
    }, this);

    this.info_btn.element.on('click', function (evt) {
        this.state = 7;
        this.isInFirst = true;
    }, this);


    this.hall1_btn.element.on('click', function (evt) {
        this.state = 4;
        this.isInFirst = true;
    }, this);

    this.hall2_btn.element.on('click', function (evt) {
        this.state = 4;
        this.isInFirst = true;
    }, this);


    this.stall1_btn.element.on('click', function (evt) {
        this.state = 6;
        this.isInFirst = true;
        this.stall1.enabled = true;
        this.app.fire("Manager:StallEvent", 1);
    }, this);

    this.stall2_btn.element.on('click', function (evt) {
        this.state = 6;
        this.isInFirst = true;
        this.stall2.enabled = true;
        this.app.fire("Manager:StallEvent", 2);
    }, this);
    this.stall3_btn.element.on('click', function (evt) {
        this.state = 6;
        this.isInFirst = true;
        this.stall3.enabled = true;
        this.app.fire("Manager:StallEvent", 3);
    }, this);
    this.stall4_btn.element.on('click', function (evt) {
        this.state = 6;
        this.isInFirst = true;
        this.stall4.enabled = true;
        this.app.fire("Manager:StallEvent", 4);
    }, this);
    this.stall5_btn.element.on('click', function (evt) {
        this.state = 6;
        this.isInFirst = true;
        this.stall5.enabled = true;
        this.app.fire("Manager:StallEvent", 5);
    }, this);


    this.stallBack.element.on('click', function (evt) {
        this.backToHallVideo();
    }, this);

    this.mainBack.element.on('click', function (evt) {
        this.moveToHome();
    }, this);
};

Manager.prototype.update = function (dt) {

     if (this.state !== 1){
          this.auditoriumeButtons.enabled = false;
     }

//     if (this.state === 1) {
//         this.hallButtons.enabled = true;
        
//         this.informationdeskButtons.enabled = true;
//     } else {
   
//         this.auditoriumeButtons.enabled = false;
//         this.informationdeskButtons.enabled = false;
//     }

    if (this.state === 3) { //enable screen audi
        this.audScreen.enabled = true;

    } else {
        this.audScreen.enabled = false;
    }
    
     if (this.state === 9) { //enable screen 2 audi
        this.audScreen2.enabled = true;

    } else {
        this.audScreen2.enabled = false;
    }


    switch (this.state) {
        case 0: { //Idle
            if (this.isInFirst) {
                this.isInFirst = false;
                this.idle_screen_obj.enabled = true;
            }
            this.nextButton.enabled = false;
            this.previuseButton.enabled = false;
            this.barButtons.enabled = false;
            break;
        }
        case 1: { // Idle Home
            if (this.isInFirst) {

                this.isInFirst = false;
                this.lobbyIdle_vid.script.mediaPlayer.startVideo();

            
                var that = this;
                setTimeout(function () {
                    that.idle_screen_obj.enabled = false;
                }, 1000);

                if (this.backButtonPressd) {
                    this.backButtonPressd = false;
                    this.fade.hide();
                }
            }


            if(this.tutorial.enabled){
                
            }else{
                
            this.nextButton.enabled = true;
            this.previuseButton.enabled = true;
            this.selectButton(0);
            this.bakground.enabled = false;
            this.buutonId = 0;
            this.play_btn.enabled = false;
            this.barButtons.enabled = true;
            this.auditoriumeButtons.enabled = true;
            }


           
            break;
        }
        case 2: { //Move to Auditoriume 1
            if (this.isInFirst) {
                this.toAuditoriume_vid.setPosition(0, 0, -0.5);
                this.toAuditoriume_vid.enabled = true;
                this.toAuditoriume_vid.script.mediaPlayer.startVideo();

                var that = this;
                setTimeout(function () {
                    that.toAuditoriume_vid.setPosition(0, 0, 0.5);
                }, 300);
                this.isInFirst = false;
                this.barButtons.enabled = false;
            }
            this.nextButton.enabled = false;
            this.previuseButton.enabled = false;
            this.selectButton(1);
            break;
        }
        case 8: { //Move to Auditoriume 2
            if (this.isInFirst) {
                this.toAuditoriume_vidTwo.setPosition(0, 0, -0.5);
                this.toAuditoriume_vidTwo.enabled = true;
                this.toAuditoriume_vidTwo.script.mediaPlayer.startVideo();

                var that = this;
                setTimeout(function () {
                    that.toAuditoriume_vidTwo.setPosition(0, 0, 0.5);
                }, 300);
                this.isInFirst = false;
                this.barButtons.enabled = false;
            }
            this.nextButton.enabled = false;
            this.previuseButton.enabled = false;
            this.selectButton(2);
            break;
        }
        case 3: { //Auditoeiume idle  1
            if (this.isInFirst) {
                
                
                this.app.fire('PlayScreen1');
          
                //this.audScreen.script.mediaPlayer.startVideo();
                
                //Auditoriume Loop Video and Dim Video
                
                if(this.Auditoriume_1_dim){
                    this.Auditoriume_1_dim.enabled = true;
                    this.Auditoriume_1_dim.script.mediaPlayer.startVideo();
                }else{
                    this.Auditoriume_vid.enabled = true;
                    this.Auditoriume_vid.script.mediaPlayer.startVideo();
                }
                
               
              
               
                this.toAuditoriume_vid.enabled = false;
                this.toAuditoriume_vidTwo.enabled = false;
                this.isInFirst = false;


                this.mainBack.enabled = true;
                var self = this;
                setTimeout(function () { self.fade.hide(); }, 900);
                this.barButtons.enabled = true;
                this.auditoriumeUIButtons.enabled = true;
            }
            
            if(!isFullScreenMode_manager)
                {
                        this.nextButton.enabled = true;
                        this.previuseButton.enabled = true;
                }
        if(this.usegreenScreen)
            this.greenScreen.enabled = true;

            if (this.audiIframe === 0) {
                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color = new pc.Color(21/255, 39/255, 104/255);
  
                if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color =new pc.Color(21/255, 39/255, 104/255);
            } else if (this.audiIframe === 1) {
                this.qnaButtonIcon.children[0].element.color =  new pc.Color(202/255, 202/255, 202/255);

                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color =new pc.Color(21/255, 39/255, 104/255);
            } else {

                if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color = new pc.Color(21/255, 39/255, 104/255);

                this.pollButtonIcon.children[0].element.color =  new pc.Color(202/255, 202/255, 202/255);
            }


            if(this.dimVideo1)
                {
                    if(!this.Auditoriume_vid.enabled){
                         this.Auditoriume_vid.enabled = true;
                        this.Auditoriume_vid.script.mediaPlayer.startVideo();
                        
                    }
                   
                }

            this.buutonId = 1;
            break;
        }
        case 9: { //Auditoeiume idle  2
            if (this.isInFirst) {
                this.app.fire('PlayScreen2');
              //  this.audScreen2.script.mediaPlayer.startVideo();
                
                
                
                if(this.Auditoriume_1_dim){
                    this.Auditoriume_2_dim.enabled = true;
                    this.Auditoriume_2_dim.script.mediaPlayer.startVideo();
                }else{
                    this.Auditoriume2_vid.enabled = true;
                    this.Auditoriume2_vid.script.mediaPlayer.startVideo();
                }
                
           
                this.toAuditoriume_vid.enabled = false;
                  this.toAuditoriume_vidTwo.enabled = false;
                this.isInFirst = false;

                // if(!this.isPollOpen)
                // this.closePollIframe();

                this.mainBack.enabled = true;
                var self = this;
                setTimeout(function () { self.fade.hide(); }, 900);
                this.barButtons.enabled = true;
               this.auditoriumeUIButtons.enabled = false;
                
                
                        this.nextButton.enabled = false;
                        this.previuseButton.enabled = false;
            }
            
             
        if(this.usegreenScreen)
            this.greenScreen.enabled = true;

            if(this.dimVideo2)
                {
                    if(!this.Auditoriume2_vid.enabled){
                        this.Auditoriume2_vid.enabled = true;
                    this.Auditoriume2_vid.script.mediaPlayer.startVideo();
                        
                    }
                   
                }
            
            /*if (this.audiIframe === 0) {
                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);

                if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);
            } else if (this.audiIframe === 1) {
                this.qnaButtonIcon.children[0].element.color = new pc.Color(0.17647058823529413, 0.7843137254901961, 0.9764705882352941);

                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);
            } else {

                if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);

                this.pollButtonIcon.children[0].element.color = new pc.Color(0.17647058823529413, 0.7843137254901961, 0.9764705882352941);
            }*/



            this.buutonId = 2;
            break;
        }
        case 4: { // Move to Hall
            if (this.isInFirst) {
                this.toHal.setPosition(0, 0, -0.5);
                this.toHal.enabled = true;
                this.toHal.script.mediaPlayer.startVideo();
                var that = this;
                setTimeout(function () {
                    that.toHal.setPosition(0, 0, 0.5);
                }, 300);

                this.isInFirst = false;
                this.barButtons.enabled = false;
            }
            this.nextButton.enabled = false;
            this.previuseButton.enabled = false;

            break;
        }
        case 5: { // Hall Idle
            if (this.isInFirst) {

                this.hall.enabled = true;
                this.hall.script.mediaPlayer.startVideo();
                this.toHal.enabled = false;
                this.isInFirst = false;
                this.googel.enabled = true;
                this.facebook.enabled = true;
                this.windows.enabled = true;
                this.mainBack.enabled = true;
                if (!this.fromStall) {

                    var self = this;
                    setTimeout(function () { self.fade.hide(); }, 1000);
                } else {
                    this.fade.hide();
                    this.fromStall = false;
                }

                this.barButtons.enabled = true;
            }
            this.nextButton.enabled = true;
            this.previuseButton.enabled = true;
            this.buutonId = 3;
            break;
        }
        case 6: { //Stall idle
            if (this.isInFirst) {
                this.isInFirst = false;
                this.googel.enabled = false;
                this.facebook.enabled = false;
                this.windows.enabled = false;
                this.stallBack.enabled = true;
                this.fade.hide();
                // var self=this;
                //setTimeout(function(){self.fade.hide();},300);
                this.barButtons.enabled = true;
            }
            this.nextButton.enabled = true;
            this.previuseButton.enabled = true;
            this.buutonId = 3;
            break;
        }
        case 7: { // Information desk
            if (this.isInFirst) {

                this.toIndormation.setPosition(0, 0, -0.5);
                this.toIndormation.enabled = true;
                this.toIndormation.script.mediaPlayer.startVideo();

                var that = this;
                setTimeout(function () {
                    that.toIndormation.setPosition(0, 0, 0.5);
                }, 300);

                this.isInFirst = false;
                this.nextButton.enabled = false;
                this.previuseButton.enabled = false;
                this.barButtons.enabled = false;
            }
            this.buutonId = 5;
            break;
        }
    }


    if (this.state !== 3) {
        this.qnaIframe.script.htmlHandlerQna.removeIFRMAE();
        
        if(this.usegreenScreen)
         this.greenScreen.enabled = false;
        
    }else{
        
        if(this.usegreenScreen)
         this.greenScreen.enabled = true;
    }

    this.selectButton(this.buutonId);

    this.alpha += 2 * dt;
    this.value = pc.math.lerp(this.start, this.end, this.alpha);

    var cPos = this.camera.getPosition();
    
   if (this.state === 9)
       {
            cPos.x = 0;
       }else{
            cPos.x = this.value;
       }

    this.camera.setPosition(cPos);
    this.UpdateUI();

};

Manager.prototype.toDoFunction = function (fun) {

    if (fun === 'showAuditoriume') {
        this.showAuditoriume();
        return;
    }
    
    if (fun === 'showAuditoriume2') {
        this.showAuditoriume2();
        return;
    }

    if (fun === 'hall') {
        this.showHall();
        return;
    }

    if (fun === 'Information') {
        this.informationDesk();
        return;
    }

    if (fun === 'dim1') {
        this.dimVideo1=true;
        return;
    }
     if (fun === 'dim2') {
        this.dimVideo2=true;
        return;
    }
};

Manager.prototype.showAuditoriume = function () {

    this.fade.show();
    var that = this;
    setTimeout(function () {
        that.state = 3;
        that.isInFirst = true;
    }, 1000);
    
    this.app.fire("Manager:Audi");
};

Manager.prototype.showAuditoriume2 = function () {

    this.fade.show();
    var that = this;
    setTimeout(function () {
        that.state = 9;
        that.isInFirst = true;
    }, 1000);
    
    this.app.fire("Manager:Audi");
};


Manager.prototype.showHall = function () {

    this.fade.show();
    var that = this;
    setTimeout(function () {
        that.state = 5;
        that.isInFirst = true;
    }, 1000);

    this.app.fire("Manager:Hall");
    
};

Manager.prototype.informationDesk = function () {
    this.mainBack.enabled = true;
    this.nextButton.enabled = true;
    this.previuseButton.enabled = true;
    this.barButtons.enabled = true;
    this.barButtons.enabled = true;
    this.infoTech.enabled = true;
    
    this.app.fire("Manager:InfoDesk");
};

Manager.prototype.moveToHome = function () {

       this.dimVideo1=false;
     this.dimVideo2=false;
    var that = this;
    this.backButtonPressd = true;
    this.fade.show();
    that.closeAllIframe();
     this.app.fire('stopVideoOnScreen');
   
      this.app.fire('ChatbotOff');
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    this.app.fire('closeAllStallVideo');
    setTimeout(function () {
        that.hideAll();
        that.mainBack.enabled = false;
        that.toIndormation.enabled = false;
        that.hall.enabled = false;
        
        that.Auditoriume_vid.enabled = false;
        that.Auditoriume2_vid.enabled = false;
        
        if(that.Auditoriume_1_dim){
             that.Auditoriume_1_dim.enabled = false;
              that.Auditoriume_1_dim.script.mediaPlayer.stopVideo();
        }
       if(that.Auditoriume_2_dim){
            that.Auditoriume_2_dim.enabled = false;
            that.Auditoriume_2_dim.script.mediaPlayer.stopVideo();
       }
       

        
        that.state = 1;
        that.isInFirst = true;
        that.infoTech.enabled = false;
        that.toIndormation.script.mediaPlayer.stopVideo();
        that.hall.script.mediaPlayer.stopVideo();
        that.toHal.script.mediaPlayer.stopVideo();
        that.toAuditoriume_vid.script.mediaPlayer.stopVideo();
         that.toAuditoriume_vidTwo.script.mediaPlayer.stopVideo();
        
  
      //  that.audScreen.script.mediaPlayer.stopVideo();
     //    that.audScreen2.script.mediaPlayer.stopVideo();
        that.fromStall = false;
        that.isPollOpen = false;
        that.auditoriumeUIButtons.enabled = false;
    }, 1000);
    
    this.app.fire("Manager:Home");
};

Manager.prototype.backToHallVideo = function () {
     this.app.fire('closeAllStallVideo');
     this.app.fire('stopVideoOnScreen');
    this.fromStall = true;
    this.stallBack.enabled = false;
    this.stall1.enabled = false;
    this.stall2.enabled = false;
    this.stall3.enabled = false;
    this.stall4.enabled = false;
    this.stall5.enabled = false;
    this.googel.enabled = true;
    this.facebook.enabled = true;
    this.windows.enabled = true;
    this.state = 5;
    this.isInFirst = true;
      this.dimVideo1=false;
     this.dimVideo2=false;
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    
    this.infoTech.enabled = false;
};

Manager.prototype.hideAll = function () {
       this.dimVideo1=false;
     this.dimVideo2=false;
     this.app.fire('closeAllStallVideo');
     this.app.fire('stopVideoOnScreen');
    this.stallBack.enabled = false;
    this.stall1.enabled = false;
    this.stall2.enabled = false;
    this.stall3.enabled = false;
    this.stall4.enabled = false;
    this.stall5.enabled = false;
    this.googel.enabled = true;
    this.facebook.enabled = true;
    this.windows.enabled = true;
    this.infoTech.enabled = false;
    this.mainBack.enabled = false;
    this.toIndormation.enabled = false;
    this.hall.enabled = false;
    this.Auditoriume_vid.enabled = false;
      this.Auditoriume2_vid.enabled = false;
    this.fromStall = false;

    this.app.fire('ChatbotOff');
    
    this.isPollOpen = false;
    this.auditoriumeUIButtons.enabled = false;
    this.closeAllIframe();

    this.toIndormation.script.mediaPlayer.stopVideo();
    this.hall.script.mediaPlayer.stopVideo();
    this.toHal.script.mediaPlayer.stopVideo();
    this.toAuditoriume_vid.script.mediaPlayer.stopVideo();
     this.toAuditoriume_vidTwo.script.mediaPlayer.stopVideo();
   // this.audScreen.script.mediaPlayer.stopVideo();
    //   this.audScreen2.script.mediaPlayer.stopVideo();
    // this.hallButtons.enabled = false;
    // this.auditoriumeButtons.enabled = false;
    // this.informationdeskButtons.enabled = false;
        if(this.Auditoriume_1_dim){
            this.Auditoriume_1_dim.enabled = false;
            this.Auditoriume_1_dim.script.mediaPlayer.stopVideo();
        }
            
    if(this.Auditoriume_2_dim){
          this.Auditoriume_2_dim.enabled = false;
        this.Auditoriume_2_dim.script.mediaPlayer.stopVideo();
    
    }
    
      
    if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
};



Manager.prototype.openPollIframe = function () {

   this.AuditoriumIframeState = 2;
    //Checking QNA is existing if exisiting hide
    if (document.getElementById("container-qna")) {
        document.getElementById("container-qna").style.visibility='hidden';
    }
    
    //check poll is existing set visibility visible
    if (document.getElementById("container-poll")) {
        document.getElementById("container-poll").style.visibility='visible';
    }else{
        //Poll not existing so create
         this.pollIframe.script.htmlHandlerForAll.showIFRMAE();
    }
    
    if (document.getElementById("container")) {
        document.getElementById("container").remove();
    }
    
   if (document.getElementById("chat-container")) {
        document.getElementById("chat-container").remove();
    }
    
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
};

Manager.prototype.openQNAIframe = function () {

      this.AuditoriumIframeState = 1;
     //Checking Poll is existing if exisiting hide
    if (document.getElementById("container-poll")) {
        document.getElementById("container-poll").style.visibility='hidden';
    }
    
    //check QNA is existing set visibility visible
     if (document.getElementById("container-qna")) {
        document.getElementById("container-qna").style.visibility='visible';
    }else{
        // QNA not existing so create
        this.qnaIframe.script.htmlHandlerQna.showIFRMAE();
    }
    
    if (document.getElementById("container")) {
        document.getElementById("container").remove();
    }
    
   if (document.getElementById("chat-container")) {
        document.getElementById("chat-container").remove();
    }
    
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
};

Manager.prototype.closeAllIframe = function () {

     //Checking Poll is existing if exisiting hide
    if (document.getElementById("container-poll")) {
        document.getElementById("container-poll").style.visibility='hidden';
    }
        //Checking QNA is existing if exisiting hide
    if (document.getElementById("container-qna")) {
        document.getElementById("container-qna").style.visibility='hidden';
    }

    if (document.getElementById("container")) {
        document.getElementById("container").remove();
    }

      if (document.getElementById("chat-container")) {
        document.getElementById("chat-container").remove();
    }
    
     if(document.getElementById('stall-container'))
        {
            document.getElementById('stall-container').remove();
        }
    this.audiIframe = 0;
};

Manager.prototype.hideSomeButtonWhenCallFullScreen = function () {

    this.closeAllIframe();
    this.auditoriumeUIButtons.enabled = false;
    this.barButtons.enabled = false;
    
    if(this.state==3){
         this.audScreen.script.mediaPlayer.muteAudio(true);
    }else if(this.state==9){
        this.audScreen2.script.mediaPlayer.muteAudio(true); 
    }

    
    if (document.getElementById('myFullScreenVideo')) {
        var fullVideo = document.getElementById('myFullScreenVideo');
        var videoData="";
        
        if(this.state==3){
             videoData = this.audScreen.script.mediaPlayer.getCurrentTime();
        }else if(this.state==9){
            videoData = this.aud2Screen.script.mediaPlayer.getCurrentTime();
        }


        if(this.hslVideo){
                
                fullVideo.currentTime = videoData.time;
        }else{
            fullVideo.src = videoData.url;
            fullVideo.currentTime = videoData.time;
        }
    }
    this.mainBack.enabled = false;
    this.nextButton.enabled = false;
    this.previuseButton.enabled = false;
    var self=this;
    this.adjestTime();
   fullVideo.play();
};

Manager.prototype.UpdateUI=function (){
    
     switch(this.audiIframe){
            case 0:{
                
                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);

                if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);
                
                if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.remove("poll_selected");
                    document.getElementById('poll_video_button').classList.add("poll_fullScreen_btn");
                    document.getElementById('qna_video_button').classList.remove("qna_selected");
                    document.getElementById('qna_video_button').classList.add("qna_fullScreen_btn");
                }
                
                break;
            }
            case 1:{
                
                this.qnaButtonIcon.children[0].element.color = new pc.Color(0.17647058823529413, 0.7843137254901961, 0.9764705882352941);
                
                if (!this.pollButtonIcon.script.buttonAction.isHover())
                    this.pollButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);
                
                 if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.remove("poll_selected");
                    document.getElementById('poll_video_button').classList.add("poll_fullScreen_btn");
                    document.getElementById('qna_video_button').classList.add("qna_selected");
                    document.getElementById('qna_video_button').classList.remove("qna_fullScreen_btn");
                }
                
                break;
            }
            case 2:{
                
                this.pollButtonIcon.children[0].element.color = new pc.Color(0.17647058823529413, 0.7843137254901961, 0.9764705882352941);
                
                 if (!this.qnaButtonIcon.script.buttonAction.isHover())
                    this.qnaButtonIcon.children[0].element.color = new pc.Color(0.49, 0.49, 0.49);
                
                 if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.add("poll_selected");
                    document.getElementById('poll_video_button').classList.remove("poll_fullScreen_btn");
                    document.getElementById('qna_video_button').classList.remove("qna_selected");
                    document.getElementById('qna_video_button').classList.add("qna_fullScreen_btn");
                }
                
                break;
            }
        }
};


Manager.prototype.adjestTime=function(){
        var fullVideo = document.getElementById('myFullScreenVideo');
    var videoData="";
     if(this.state==3){
             videoData = this.audScreen.script.mediaPlayer.getCurrentTime();
        }else if(this.state==9){
            videoData = this.aud2Screen.script.mediaPlayer.getCurrentTime();
        }
    
    
            if(fullVideo.currentTime != videoData.time)
            {
                fullVideo.currentTime=videoData.time;
                this.adjestTime();
            }else{
                console.log("Equal");
                this.audScreen.script.mediaPlayer.pauseVideo();
            }
};


Manager.prototype.adjestTimeAfterCloseFullScreen=function(){
        
        var videoData="";
     if(this.state==3){
             videoData = this.audScreen.script.mediaPlayer.getCurrentTime();
        }else if(this.state==9){
            videoData = this.aud2Screen.script.mediaPlayer.getCurrentTime();
        }
    
            if(ffVideoTime!= videoData.time)
            {
                
                
                 if(this.state==3){
                         this.audScreen.script.mediaPlayer.playVideo();
                    }else if(this.state==9){
                        this.aud2Screen.script.mediaPlayer.playVideo();
                    }
                
                fullVideo.currentTime=ffVideoTime;
                this.adjestTime();
            }else{
                console.log("Equal after close");
                if(this.state==3){
                         this.audScreen.script.mediaPlayer.playVideo();
                    }else if(this.state==4){
                        this.aud2Screen.script.mediaPlayer.playVideo();
                    }
               adjestTimeAfterCloseFullScreen();
            }
};

var ffVideoTime;
Manager.prototype.showSomeButtonWhenCallFullScreenClose = function () {

    if (document.getElementById('myFullScreenVideo')) {
        var fullVideo = document.getElementById('myFullScreenVideo');
        
        if(this.state==3){
             this.audScreen.script.mediaPlayer.playVideo();
        }else if(this.state==9){
            this.aud2Screen.script.mediaPlayer.playVideo();
        }
        
        ffVideoTime=fullVideo.currentTime;
        
        if(this.state==3){
             this.audScreen.script.mediaPlayer.setCurrentTime(fullVideo.currentTime);
        }else if(this.state==9){
            this.aud2Screen.script.mediaPlayer.setCurrentTime(fullVideo.currentTime);
        }
        
    }
    isFullScreenMode_manager=false;
    this.closeAllIframe();
    this.auditoriumeUIButtons.enabled = true;
    this.barButtons.enabled = true;
    
     if(this.state==3){
            this.audScreen.script.mediaPlayer.muteAudio(false);
        }else if(this.state==9){
            this.aud2Screen.script.mediaPlayer.muteAudio(false);
        }
    
    
    
    this.mainBack.enabled = true;
    this.nextButton.enabled = true;
    this.previuseButton.enabled = true;
};



function ClosePool() {
    
    if (publicThat) {
        publicThat.closeAllIframe();
    }
    
}

function showPollInVdeo() {
    
    if (publicThat) {
         if(publicThat.audiIframe===0){//QNA and POLL are  hidden
             //Show Poll
             publicThat.openPollIframe();
         }else if(publicThat.audiIframe === 1){//QNA is visible and POLL is hidden
             //Hide QNA and Show Poll
                publicThat.closeAllIframe();
                publicThat.openPollIframe();
         }else{ //QNA is hidden and POLL is visible
             //Hide Poll
             publicThat.closeAllIframe();
         }
    }
   
}

function showQNAInVdeo() {
    
    if (publicThat) {
         if(publicThat.audiIframe===0){//QNA and POLL are  hidden
             //Show QNA
             publicThat.openQNAIframe();
         }else if(publicThat.audiIframe === 1){//QNA is visible and POLL is hidden
             //Hide QNA
             publicThat.closeAllIframe();
         }else{ //QNA is hidden and POLL is visible
             //Hide POLL and Show QNA
            publicThat.closeAllIframe();
            publicThat.openQNAIframe();
         }
    }

}


 

/*function showPollInVdeo() {
    
    if (publicThat) {

        if (publicThat.audiIframe === 0) {
            publicThat.openPollIframe();
            if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.add("poll_selected");
                    document.getElementById('poll_video_button').classList.remove("poll_fullScreen_btn");
                }
            
        } else if (publicThat.audiIframe === 1) {
            publicThat.closeAllIframe();
            publicThat.openPollIframe();
            
             if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.add("poll_selected");
                    document.getElementById('poll_video_button').classList.remove("poll_fullScreen_btn");
                    
                      document.getElementById('qna_video_button').classList.remove("qna_selected");
                     document.getElementById('qna_video_button').classList.add("qna_fullScreen_btn");
                }
        } else {
            publicThat.closeAllIframe();
            
             if(document.getElementById('poll_video_button'))
                {
                    document.getElementById('poll_video_button').classList.remove("poll_selected");
                     document.getElementById('poll_video_button').classList.add("poll_fullScreen_btn");
                }
        }
    }
   
}
*/

// function showQNAInVdeo() {
    
//     if (publicThat) {

//         if (publicThat.audiIframe === 0) {
//             publicThat.openQNAIframe();
            
//             if(document.getElementById('qna_video_button'))
//                 {
//                     document.getElementById('qna_video_button').classList.add("qna_selected");
//                     document.getElementById('qna_video_button').classList.remove("qna_fullScreen_btn");
//                 }
            
//         } else if (publicThat.audiIframe === 1) {
//             publicThat.closeAllIframe();
    
            
//              if(document.getElementById('qna_video_button'))
//                 {
//                     document.getElementById('qna_video_button').classList.remove("qna_selected");
//                      document.getElementById('qna_video_button').classList.add("qna_fullScreen_btn");
//                 }
            
//         } else {
//             publicThat.closeAllIframe();
//             publicThat.openQNAIframe();
  
            
//              if(document.getElementById('qna_video_button'))
//                 {
//                     document.getElementById('qna_video_button').classList.add("qna_selected");
//                      document.getElementById('qna_video_button').classList.remove("qna_fullScreen_btn");
                    
//                      document.getElementById('poll_video_button').classList.remove("poll_selected");
//                      document.getElementById('poll_video_button').classList.add("poll_fullScreen_btn");
//                 }
//         }
//     }

// }


