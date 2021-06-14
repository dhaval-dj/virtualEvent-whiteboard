var VimeoPlacement = pc.createScript('vimeoPlacement');

VimeoPlacement.attributes.add("videoUrl", {
    type: "string"
});

VimeoPlacement.attributes.add("playByDefault", {
    type: "boolean"
});

VimeoPlacement.attributes.add("playerEvent", {
    type: "string"
});
VimeoPlacement.attributes.add("muteEvent", {
    type: "string"
});
VimeoPlacement.attributes.add("pauseEvent", {
    type: "string"
});
VimeoPlacement.attributes.add("fullScreenEvent", {
    type: "string"
});

VimeoPlacement.attributes.add("topLeftEvent", {
    type: "string"
});
VimeoPlacement.attributes.add("bottomLeftEvent", {
    type: "string"
});
VimeoPlacement.attributes.add("topRightEvent", {
    type: "string"
});
VimeoPlacement.attributes.add('controller', {
    type: 'entity',
});


VimeoPlacement.attributes.add('useDB', {
    type: 'boolean',
});
VimeoPlacement.attributes.add('docName', {
    type: 'string',
    description: "provide Doc Name if using DB"
});

VimeoPlacement.attributes.add("useDailyco", {
    type: "boolean"
});
VimeoPlacement.attributes.add("uservalidforcall", {
    type: "boolean"
});
VimeoPlacement.attributes.add("showQNAPOLLFullScreen", {
    type: "boolean"
});
VimeoPlacement.attributes.add('defaultFullScreen', {
    type: 'boolean',
    description: "will Open Vimeo Directly into FullScreen(div)"
});
VimeoPlacement.attributes.add('isTutorialVideo', {
    type: 'boolean',
});
// initialize code called once per entity

VimeoPlacement.prototype.initialize = function () {
    this.uservalidforcall = false;
    this.keepMyCurrentURL = '';
    this.frameDataurl = '';

    var self = this;
    this.init = false;
    this.setFullScreen = false;
    this.doneOnce = false;
    this.currentVideoTime = 0;
    window.vimeoplacementmanager = this;
    window.addEventListener('resize', function () {
        self._checkAspectRatio();
    });
    window.addEventListener("orientationchange", function () {
        setTimeout(function () {
            self._checkAspectRatio();
        }, 200);
    });
    this.count = 0;

    this.app.on(this.topLeftEvent, function (pos) {
        self.topLeft = pos;
        self.count += 1;
    });
    this.app.on(this.bottomLeftEvent, function (pos) {
        self.bottomLeft = pos;
        self.count += 1;

    });
    this.app.on(this.topRightEvent, function (pos) {
        self.topRight = pos;
        self.count += 1;
    });




    this.app.on("ChangeAudiVideoURL", function (pos) {

        let videoPlayerIframe = document.getElementById('AudiVideoPlayer');

        //Is he is watching Audi video not Dailyco
        if (videoPlayerIframe && !self.useDailyco) {
            //console.log('Ge ' + videoPlayerIframe.getAttribute('data-url'));
            //Main Audi
            if (videoPlayerIframe.getAttribute('data-url') === 'PlayScreen1Vimeo') {
                self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,window.ReactHomeManager.state.audiURL1);
            } else if (videoPlayerIframe.getAttribute('data-url') === 'PlayScreen2Vimeo') {//Clint +
                 self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,window.ReactHomeManager.state.audiURL2);
            } else if (videoPlayerIframe.getAttribute('data-url') === 'PlayScreen3Vimeo') {//Game
                self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,window.ReactHomeManager.state.audiURL3);
            }else if (videoPlayerIframe.getAttribute('data-url') === 'PlayScreen4Vimeo') {//enterprise and consumer
                //Check Where Im
                if(window.ReactHomeManager.state.whereIm === 'insideEnterprise')
                {
                    self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,window.ReactHomeManager.state.audiURL4);//enterprise 
                }else if(window.ReactHomeManager.state.whereIm === 'insideConsumer'){
                    self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,window.ReactHomeManager.state.audiURL5);//consumer
                }
            }
        }

    });
    
    this.app.on("ChangeEnterPriseBtnclickurl", function (num) {
        
       
         let videoPlayerIframe = document.getElementById('AudiVideoPlayer');  
        if(num==1)
         self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,'478418785');
        else if(num==2)
         self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,'478419028');
        else if(num==3)
         self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,'478419412');
         else  if(num==4)
         self.updayeVimeoIframeDataInRunTime(videoPlayerIframe,'478419757');
        
    });

    this.app.on(this.playerEvent, function (pos) {
        self.PlayVimeoVideo();
        //     self.controller.enabled=true;
    });
    this.app.on('StopVimeo', function (pos) {
        self.StopVimeoVideo();
        //       self.controller.enabled=false;
    });

    this.app.on(this.muteEvent, function (pos) {
        self.MuteSound();
        //      console.log('Miute');
    });

    setInterval(() => {
        self.app.fire("resetVimeoPosition");
    }, 500);

    this.fullscreen = false;
};


VimeoPlacement.prototype.updayeVimeoIframeDataInRunTime = function (iframe,videoURL) {

    if (this.keepMyCurrentURL != videoURL) {
        this.keepMyCurrentURL = videoURL;
        this.videoUrl = 'https://player.vimeo.com/video/' + videoURL + '?autoplay=1&controls=1';
        iframe.src = this.videoUrl;
    }
};

VimeoPlacement.prototype.postUpdate = function (dt) {

    if (this.count === 3) {
        this.count = 0;
        if (!this.init) {

        } else {

            var width = (this.topRight.x - this.topLeft.x);
            var height = (this.bottomLeft.y - this.topLeft.y);
            this.changeDivDimensions(this.videoDiv, this.topLeft.x, this.topLeft.y, width, height);
        }
    }

};

VimeoPlacement.prototype.setFull = function (isFull) {
    this.setFullScreen = isFull;
    this.fullscreen = isFull;
    changeposfirst = true;

};

VimeoPlacement.prototype.initvimeo = function () {

    // for checking using is valid for video or not 
    // if(window.FirebaseObj)
    // {
    //     console.log("this.context:  "+window.FirebaseObj.uservalidforcall);
    //     this.uservalidforcall = window.FirebaseObj.uservalidforcall;
    // }

    var self = this;
    if(!this.topRight || !this.topLeft)
        {
            setTimeout(function(){
                self.initvimeo();
            },100);
            return;
        }


    if (this.defaultFullScreen !== undefined)
        this.setFullScreen = this.defaultFullScreen;

    console.log('Videoddffff');
    var videoDiv = document.createElement("div");
    videoDiv.id = "player";
    videoDiv.classList.add("popover-modal");
    var width = ((this.topRight.x - this.topLeft.x));
    var height = ((this.bottomLeft.y - this.topLeft.y));
    this.changeDivDimensions(videoDiv, this.topLeft.x, this.topLeft.y, width, height);

    var article = document.querySelector("#play");
    if (article) {
        article.appendChild(videoDiv);
    } else {
        document.body.appendChild(videoDiv);
    }    
    var imgDiv = document.createElement('img');
    var iframe = document.createElement('iframe');
    imgDiv.setAttribute("src", "/assets/images/FullScreen.png");
    imgDiv.style.position = "absolute";
    imgDiv.style.bottom = 0;
    imgDiv.style.left = 0;
    imgDiv.style.margin = "1%";
    imgDiv.id = "fullScreenIframe";
    imgDiv.addEventListener('click', function () {
        if (self.fullscreen) {
            self.app.fire("closeFullScreenVideo1");
            self.fullscreen = false;
        } else {
            self.app.fire("makeFullScreenVideo1");
            self.fullscreen = true;
        }

    });
    this.imgDiv = imgDiv;
    videoDiv.appendChild(imgDiv);
    if (this.useDailyco) {
        iframe.id = "video-iframe";
        iframe.setAttribute("allow", "camera; microphone; autoplay; display-capture");
        iframe.setAttribute('width', "100%");
        iframe.setAttribute('height', "100%");
        iframe.setAttribute('frameborder', 0);
        videoDiv.appendChild(iframe);
        if (window.DailycoManager) {
            console.log("came inside");
            window.DailycoManager.initializeDailyco();
        } else {
            console.log("video call cannot happen");
        }
    } else {

       


        if (true) {
            //All Condition Check
           
         /*    if (eventURL) {
                this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0';
                console.log(this.videoUrl + " :this is video url");
            }
 */
             //Check Where Im
             if(window.ReactHomeManager.state.whereIm === 'insideAudi')//Main Audi
             {
                var eventURL = window.ReactHomeManager.state.audiURL1;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';

             }else if(window.ReactHomeManager.state.whereIm === 'insideClientPlus')
             {
                var eventURL = window.ReactHomeManager.state.audiURL2;
               // ShowMuteButton(videoDiv);
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';//Clint + 
             }else  if(window.ReactHomeManager.state.whereIm === 'insideGaming')
             {
              //  ShowMuteButton(videoDiv);
                var eventURL = window.ReactHomeManager.state.audiURL3;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';//Game 
             }else if(window.ReactHomeManager.state.whereIm === 'insideEnterprise')
             {
               //ShowMuteButton(videoDiv);
                var eventURL = window.ReactHomeManager.state.audiURL4;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';//enterprise 
             }else if(window.ReactHomeManager.state.whereIm === 'insideConsumer'){
               // ShowMuteButton(videoDiv);
                var eventURL = window.ReactHomeManager.state.audiURL5;
                this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';//consumer
             }


        } else {
            // if not using dailyco then do live stream
            if (window.firecontroller) {
                if (eventURL) {
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=1';
                    console.log(this.videoUrl + " :this is video url");
                }
            } else {
                console.log("firecontroller not found");
            }

        }





        //182592195
        try {
            /*
            if (this.playerEvent === 'PlayScreen1Vimeo') {
               
                if(this.keepMyCurrentURL != window.ReactHomeManager.state.audiURL1){
                    this.keepMyCurrentURL = window.ReactHomeManager.state.audiURL1;
                    self.videoUrl = 'https://player.vimeo.com/video/' + window.ReactHomeManager.state.audiURL1 + '?autoplay=1&controls=0';
                }

            } else if (this.playerEvent === 'PlayScreen2Vimeo') {
                if(this.keepMyCurrentURL != window.ReactHomeManager.state.audiURL2){
                    this.keepMyCurrentURL = window.ReactHomeManager.state.audiURL2;
                    self.videoUrl = 'https://player.vimeo.com/video/' + window.ReactHomeManager.state.audiURL2 + '?autoplay=1&controls=0';
                }
            } else if (this.playerEvent === 'PlayScreen3Vimeo') {
                if(this.keepMyCurrentURL != window.ReactHomeManager.state.audiURL3){
                    this.keepMyCurrentURL = window.ReactHomeManager.state.audiURL3;
                    self.videoUrl = 'https://player.vimeo.com/video/' + window.ReactHomeManager.state.audiURL3 + '?autoplay=1&controls=0';
                }
            }
            */
        } catch (err) {
            swal({
                title: "Please Reload Page Again",
                icon: "info",
                className: "video-swal-modal",
                button: "Okay",
            });
        }

        iframe.setAttribute('src', this.videoUrl);
        iframe.setAttribute('id', 'AudiVideoPlayer');
        iframe.setAttribute('data-url', this.playerEvent);
        iframe.setAttribute('width', "100%");
        iframe.setAttribute('height', "100%");
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allowfullscreen', true);
        iframe.setAttribute('webkitallowfullscreen', true);
        iframe.setAttribute('mozallowfullscreen', true);
        iframe.setAttribute('mozallowfullscreen', true);
        iframe.setAttribute('background', true);
        iframe.setAttribute('autoplay', true);
        iframe.setAttribute('byline', false);
        iframe.setAttribute('controls', false);
        iframe.setAttribute('loops', false);
        iframe.setAttribute('title', false);
        iframe.setAttribute('allow', 'autoplay'); // <--- added new

        iframe.setAttribute('allow', 'autoplay'); // <--- added new
        videoDiv.appendChild(iframe);

        if (!this.isYoutube) {
            var player = new Vimeo.Player(iframe);
            player.on('play', function () {
                //  console.log('Played the  vimeo video');
            });
            player.setAutopause(false).then(function (autopause) {
                //   console.log("set autopause false");
            }).catch(function (error) {
                switch (error.name) {
                    case 'UnsupportedError':
                        //console.log("Autopause isn't supported by the current player or browser");
                        break;
                    default:
                        // console.log("Some other error occurred");
                        break;
                }
            });
            player.setLoop(true).then(function (loop) {});

            try {
                if (this.playByDefault)
                    player.play();
            } catch (err) {
                console.log(err);
            }
            this.videoPlayer = player;
        }
    }

    this.videoDiv = videoDiv;
    this.init = true;
   // if (!this.useDailyco && !this.isTutorialVideo) 
      //this.MuteSound();
};


function ShowMuteButton(videoDiv)
{
    /* if (true) {
        var volControl = document.createElement('img');
        volControl.setAttribute("src", "/assets/images/unmute.png");
        volControl.style.position = "absolute";
        volControl.style.cursor = "pointer";     
        volControl.style.bottom = "-18px";
        volControl.style.left = "35px";
        volControl.style.margin = "3%";
        volControl.style.width = "30px";
        //volControl.style.display = "none";
        volControl.id = "fullScreenIframe";
        volControl.addEventListener('click', function () {
            if (true) {
                self.MuteSound();
                player.getVolume().then((volume) => {
                    if (volume < 1) {
                        player.setVolume(1);
                        volControl.setAttribute("src", "/assets/images/mute.png"); //unMuteImage
                    } else {
                        player.setVolume(0);                            
                        volControl.setAttribute("src", "/assets/images/unmute.png"); //muteImage
                    }
                });
            } else {
                if (this.player.getVolume() < 100) {
                    this.player.setVolume(100);
                    volControl.setAttribute("src", "/assets/images/unmute.png"); //muteImage
                } else {
                    this.player.setVolume(0);
                    volControl.setAttribute("src", "/assets/images/mute.png"); //unMuteImage
                }
            }
        });
        this.volControl = volControl;
        videoDiv.appendChild(volControl);
    } */
}

VimeoPlacement.prototype._checkAspectRatio = function () {
    this.app.fire("resetVimeoPosition");
};

var changeposfirst;
var lefttemp, toptemp, widthtemp, heighttemp;
VimeoPlacement.prototype.changeDivDimensions = function (videoDiv, left, top, width, height) {


    if (this.setFullScreen) {
        videoDiv.style.position = "relative";
        videoDiv.style.left = 0 + "px"; //left +"vw";//"600px";//"35.1vw";
        videoDiv.style.top = 0 + "px"; //top + "vh";//"200px";//"20.9vh";
        videoDiv.style.width = '100%'; //left +"vw";//"600px";//"35.1vw";
        videoDiv.style.height = '100%'; //top + "vh";//"200px";//"20.9vh";
        videoDiv.style.zIndex = 10;
        videoDiv.style.pointerEvents = 'all';
        videoDiv.style.background = "black";
        if (this.imgDiv) {
            this.imgDiv.setAttribute("src", "/assets/images/closeFullScreen.png");
            this.imgDiv.style.margin = "1%";
        }
    } else {
        if (!changeposfirst) {
            videoDiv.style.position = "relative";
            videoDiv.style.overflow = "hidden";
            videoDiv.style.left = left + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.top = top + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.width = width + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.height = height + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.zIndex = 10;
            videoDiv.style.pointerEvents = 'all';
            videoDiv.style.background = "black";
            lefttemp = left + "px";
            toptemp = top + "px";
            widthtemp = width + "px";
            heighttemp = height + "px";
            // if (this.imgDiv) {
            // this.imgDiv.setAttribute("src", "/assets/images/closeFullScreen.png");
            // this.imgDiv.style.margin = "3%";
            // }
        } else {
            videoDiv.style.position = "relative";
            videoDiv.style.left = lefttemp;
            videoDiv.style.top = toptemp;
            videoDiv.style.width = widthtemp;
            videoDiv.style.height = heighttemp;
            videoDiv.style.zIndex = 10;
            changeposfirst = false;
            console.log("else");
        }
        if (this.imgDiv) {
            this.imgDiv.setAttribute("src", "/assets/images/FullScreen.png");
            this.imgDiv.style.margin = "1%";
        }
        //videoDiv.style.pointerEvents='none';
    }


    if (this.isTutorialVideo) {
        videoDiv.style.border = "solid";
        videoDiv.style.borderColor = "white";
        videoDiv.style.borderWidth = "medium";
        if (this.imgDiv)
            this.imgDiv.style.display = "none";
    } else {
        if (this.imgDiv)
            this.imgDiv.style.display = "block";
    }

};


VimeoPlacement.prototype.update = function (dt) {

    //return current time
    var self = this;
    if (this.videoPlayer) {
        this.videoPlayer.getCurrentTime().then(function (duration) {
            // console.log(duration);
            this.currentVideoTime = duration;
        });
    }
};

VimeoPlacement.prototype.getVideoTime = function () {
    return this.currentVideoTime;
};


VimeoPlacement.prototype.PlayVimeoVideo = function () {
    this.app.fire("resetVimeoPosition");
    this.initvimeo();
};

VimeoPlacement.prototype.StopVimeoVideo = function () {
    this.init = false;
    this.doneOnce = false;
    var deleteVideo = document.getElementById("player");
    if (deleteVideo)
        deleteVideo.remove();
};


VimeoPlacement.prototype.MuteSound = function () {

    var self = this;
    if (this.videoPlayer) {
        this.videoPlayer.getVolume().then(function (volume) {

            if (volume === 1) {
                self.videoPlayer.setVolume(0).then(function (volume) {}).catch(function (error) {
                    switch (error.name) {
                        case 'RangeError':

                            break;

                        default:
                            break;
                    }
                });
            } else {
                self.videoPlayer.setVolume(1).then(function (volume) {}).catch(function (error) {
                    switch (error.name) {
                        case 'RangeError':

                            break;

                        default:
                            break;
                    }
                });
            }

        });

    }

};