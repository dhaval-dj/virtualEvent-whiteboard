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


VimeoPlacement.attributes.add('useDailyco', {
    type: 'boolean',
    description: "will use Iframe for Dailyco, Not for vimeo"
});
VimeoPlacement.attributes.add('allowFullScreen', {
    type: 'boolean',
    description: "Show full screen button"
});
VimeoPlacement.attributes.add('allowVolumeControl', {
    type: 'boolean',
    description: "Show Volume Control"
});

VimeoPlacement.attributes.add('defaultFullScreen', {
    type: 'boolean',
    description: "will Open Vimeo Directly into FullScreen(div)"
});

VimeoPlacement.attributes.add('audiVideo', {
    type: 'boolean',
    default: false
});

VimeoPlacement.attributes.add('isYoutube', {
    type: 'boolean',
    default: false
});

VimeoPlacement.attributes.add('isTutorialVideo', {
    type: 'boolean',
});
var currentVimeoPlacement = null;

// initialize code called once per entity
VimeoPlacement.prototype.initialize = function () {
    var self = this;
    window.VimeoPlacement = this;
    this.init = false;
    this.setFullScreen = false;
    this.doneOnce = false;
    this.currentVideoTime = 0;

    window.addEventListener('resize', function () {
        self._checkAspectRatio();
        setTimeout(function () {
            self._checkAspectRatio();
        }, 200);
        setTimeout(function () {
            self._checkAspectRatio();
        }, 800);

    });
    window.addEventListener("orientationchange", function () {
        setTimeout(function () {
            self._checkAspectRatio();
        }, 200);
        setTimeout(function () {
            self._checkAspectRatio();
        }, 800);
    });

    this.count = 0;

    this.app.on('resetSize', function () {
        console.log('resetSize');
        self._checkAspectRatio();
        setTimeout(function () {
            self._checkAspectRatio();
        }, 500);
    });

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


    this.app.on(this.playerEvent, function (pos) {
        self.PlayVimeoVideo();
        // self.controller.enabled = true;
    });
    this.app.on('StopVimeo', function (pos) {
        self.StopVimeoVideo();
        // self.controller.enabled = false;
    });

    this.app.on(this.muteEvent, function (pos) {
        self.MuteSound();
        console.log('Miute');
    });

    if (this.audiVideo) {
        console.log("audiVideo " + this.entity.name);
        if (window.ReactHomeManager) {
            if (window.ReactHomeManager.audiVideoLink) {
                this.videoUrl = window.ReactHomeManager.audiVideoLink;
            }
        }
    } else {
        if (window.ReactHomeManager) {
            if (window.ReactHomeManager.getCareerCafeVideoLink) {
                this.videoUrl = window.ReactHomeManager.getCareerCafeVideoLink(SceneManagerInstance.currentCareerCafeSelection);
            }
        }
    }

    this.fullscreen = false;
    this.panelOpen = true;
    this.app.on("panelUpdate", function (value) {
        this.panelOpen = value;
    }, this);
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
    this._checkAspectRatio();
};


VimeoPlacement.prototype.initvimeo = function () {
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

    var iframe = document.createElement('iframe');
    iframe.id = "video-iframe";


    if (this.allowFullScreen) {
        var imgDiv = document.createElement('img');
        imgDiv.setAttribute("src", "/assets/images/FullScreen.png");
        imgDiv.style.position = "absolute";
        imgDiv.style.bottom = 0;
        imgDiv.style.left = 0;
        imgDiv.style.margin = "1%";
        imgDiv.style.cursor = "pointer";
        //imgDiv.style.display = "none";
        imgDiv.id = "fullScreenIframe";
        imgDiv.addEventListener('click', function () {
            if (!self.fullscreen) {
                self.app.fire("makeFullScreenVideo1");
                self.fullscreen = true;
            } else {
                self.app.fire("closeFullScreenVideo1");
                self.fullscreen = false;
            }

        });
        this.imgDiv = imgDiv;
        videoDiv.appendChild(imgDiv);
    }
     

    if (!this.useDailyco && !this.isTutorialVideo) {
        var volControl = document.createElement('img');
        volControl.setAttribute("src", "/assets/images/unmute.png");
        volControl.style.position = "absolute";
        volControl.style.cursor = "pointer";
        if (this.allowFullScreen)
            volControl.style.bottom = "23px";
        else
            volControl.style.bottom = "23px";
        volControl.style.left = 0;
        volControl.style.margin = "3%";
        volControl.style.width = "30px";
        //volControl.style.display = "none";
        volControl.id = "fullScreenIframe";
        volControl.addEventListener('click', function () {
            if (true) {
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
    }

    if (this.useDailyco) {
        videoDiv.classList.add("videocalldailyco");
        iframe.id = "video-iframe";
        iframe.setAttribute("allow", "camera; microphone; autoplay");
        iframe.setAttribute('width', "100%");
        iframe.setAttribute('height', "100%");
        iframe.setAttribute('frameborder', 0);
        videoDiv.appendChild(iframe);
        if (window.DailycoManager) {
            window.DailycoManager.initializeDailyco();
        } else {
            console.log("video call cannot happen");
        }
    } else {

        if(!this.isTutorialVideo)
        videoDiv.classList.add("videocalldailyco");

        if (true) {
            //All Condition Check

            /*    if (eventURL) {
                this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0';
                console.log(this.videoUrl + " :this is video url");
            }
 */
            //Check Where Im
            if (window.ReactHomeManager.state.whereIm === 'insideAudi') //Main Audi
            {
                var eventURL = window.ReactHomeManager.state.audiURL1;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0';
            } else if (window.ReactHomeManager.state.whereIm === 'insideClientPlus') {
                var eventURL = window.ReactHomeManager.state.audiURL2;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0'; //Clint + 
            } else if (window.ReactHomeManager.state.whereIm === 'insideGaming') {
                var eventURL = window.ReactHomeManager.state.audiURL3;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0'; //Game 
            } else if (window.ReactHomeManager.state.whereIm === 'insideEnterprise') {
                var eventURL = window.ReactHomeManager.state.audiURL4;
                if (eventURL)
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0'; //enterprise 
            } else if (window.ReactHomeManager.state.whereIm === 'insideConsumer') {
                var eventURL = window.ReactHomeManager.state.audiURL5;
                this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0'; //consumer
            }


        } else {
            // if not using dailyco then do live stream
            if (window.firecontroller) {
                if (eventURL) {
                    this.videoUrl = 'https://player.vimeo.com/video/' + eventURL + '?autoplay=1&controls=0';
                    console.log(this.videoUrl + " :this is video url");
                }
            } else {
                console.log("firecontroller not found");
            }

        }

        var playBtnBackground = self.putAPlayButton();
        videoDiv.appendChild(playBtnBackground);
        self.playBtnBackground = playBtnBackground;

        var band1 = this.getBands("100%", "40%", "top");
        videoDiv.appendChild(band1);
        this.band1 = band1;

        var band2 = this.getBands("100%", "40%", "bottom");
        videoDiv.appendChild(band2);
        this.band2 = band2;

        if (!self.isYoutube) {
            if (playBtnBackground) {
                playBtnBackground.style.pointerEvents = "none";
            }
            self.playbutton.setAttribute("src", "https://storage.googleapis.com/virtual-event-273009.appspot.com/Claas/PlayButton.png");

            iframe.setAttribute('src', this.videoUrl);
            iframe.setAttribute('width', "100%");
            iframe.setAttribute('height', "100%");
            // iframe.setAttribute('src',this.videoUrl);
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('allowfullscreen', true);
            iframe.setAttribute('webkitallowfullscreen', true);
            iframe.setAttribute('mozallowfullscreen', true);
            iframe.setAttribute('mozallowfullscreen', true);
            iframe.setAttribute('background', false);
            iframe.setAttribute('autoplay', false);
            iframe.setAttribute('byline', false);
            // iframe.setAttribute('controls', false);
            iframe.setAttribute('loops', false);
            iframe.setAttribute('title', false);
            // iframe.setAttribute('allow', 'autoplay');// <--- added new
            videoDiv.appendChild(iframe);
            iframe.style.pointerEvents = "auto";

            var player = new Vimeo.Player(iframe);
            this.player = player;

            player.on('play', function () {
                iframe.style.pointerEvents = "none";
                console.log(self);

                $(self.band1).animate({
                    height: '40px'
                }, 3000, function () {
                    $(self.band1).fadeOut(4000, function () {
                        // self.band1.style.display = "none";
                        self.band1.remove();
                    });
                });

                $(self.band2).animate({
                    height: '40px'
                }, 3000, function () {
                    $(self.band2).fadeOut(4000, function () {
                        // self.band1.style.display = "none";
                        self.band2.remove();
                    });
                });

                //  $(self.band2).fadeOut(7500, function () {
                //     // self.band2.style.display = "none";
                //     self.band2.remove();  
                // });

                $(self.playBtnBackground).fadeOut(1000, function () {
                    // self.playBtnBackground.style.display = "none";
                    self.playBtnBackground.remove();

                    if (self.imgDiv) {
                        self.imgDiv.style.display = "block";
                        self.imgDiv.style.opacity = "0";
                        $(self.imgDiv).animate({
                            opacity: '1',
                        }, 400, function () {

                        });
                    }

                    if (self.volControl) {
                        self.volControl.style.display = "block";
                        self.volControl.style.opacity = "0";
                        $(self.volControl).animate({
                            opacity: '1',
                        }, 400, function () {

                        });
                    }

                });

                currentVimeoPlacement.initAndReady = true;
            });


            this.videoPlayer = player;

            if (!this.useDailyco && !this.isTutorialVideo) 
            self.MuteSound();
        } 
    }

    this.videoDiv = videoDiv;
    this.init = true;
    this.initAndReady = false;
    this.app.fire("resetVimeoPosition");
};



VimeoPlacement.prototype.onPlayerStateChange = function (event) {
    var self = currentVimeoPlacement;
    console.log(event.data);

    if (event.data == 3 || event.data == -1) {
        // console.log(event.data)
        self.playbutton.setAttribute("src", "/assets/images/loader2.gif");
    }


    if (event.data == YT.PlayerState.PLAYING && !currentVimeoPlacement.initAndReady) {
        document.getElementById("video-iframe").style.pointerEvents = "none";
        console.log(self);

        $(self.band1).animate({
            height: '40px'
        }, 3000, function () {
            $(self.band1).fadeOut(4000, function () {
                // self.band1.style.display = "none";
                self.band1.remove();
            });
        });

        $(self.band2).animate({
            height: '40px'
        }, 3000, function () {
            $(self.band2).fadeOut(4000, function () {
                // self.band1.style.display = "none";
                self.band2.remove();
            });
        });

        //  $(self.band2).fadeOut(7500, function () {
        //     // self.band2.style.display = "none";
        //     self.band2.remove();  
        // });

        $(self.playBtnBackground).fadeOut(1000, function () {
            // self.playBtnBackground.style.display = "none";
            self.playBtnBackground.remove();

            if (self.imgDiv) {
                self.imgDiv.style.display = "block";
                self.imgDiv.style.opacity = "0";
                $(self.imgDiv).animate({
                    opacity: '1',
                }, 400, function () {

                });
            }

            if (self.volControl) {
                self.volControl.style.display = "block";
                self.volControl.style.opacity = "0";
                $(self.volControl).animate({
                    opacity: '1',
                }, 400, function () {

                });
            }

        });

        currentVimeoPlacement.initAndReady = true;
    }
    if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        // document.getElementById("video-iframe").style.pointerEvents="auto";
        console.log("ned");
        self.videoDiv.remove();
        self.initvimeo();
    }
};


VimeoPlacement.prototype.onPlayerReady = function (event) {
    console.log('Youtube is ready');
    var self = currentVimeoPlacement;

    let playBtnBackground = document.getElementById("playBtnBackground");
    if (playBtnBackground) {
        playBtnBackground.style.pointerEvents = "none";
    }
    document.getElementById("video-iframe").style.pointerEvents = "auto";
    self.playbutton.setAttribute("src", "https://storage.googleapis.com/virtual-event-273009.appspot.com/Claas/PlayButton.png");
    event.target.setVolume(100);
    // event.target.playVideo();
    self.player = event.target;
    setTimeout(function () {
        if (event.target.getVolume() < 100) {
            console.log("Show volume inc button");
            if (self.volControl)
                self.volControl.setAttribute("src", "/assets/images/mute.png"); //muteImage
        } else {
            console.log("Show volume mute button");
            if (self.volControl)
                self.volControl.setAttribute("src", "/assets/images/unmute.png"); //unMuteImage
        }
    }, 500);
};

VimeoPlacement.prototype._checkAspectRatio = function () {
    this.app.fire("resetVimeoPosition");
};


VimeoPlacement.prototype.changeDivDimensions = function (videoDiv, left, top, width, height) {
    if (!videoDiv) {
        return;
    }

    if (this.useDailyco) {
        if (this.setFullScreen) {
            videoDiv.style.position = "absolute";
            videoDiv.style.left = 0 + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.top = 0 + "px"; //top + "vh";//"200px";//"20.9vh";
            if (this.useDailyco) {
                if (this.panelOpen) {
                    videoDiv.style.width = '100%'; //left +"vw";//"600px";//"35.1vw";
                } else {
                    videoDiv.style.width = '100%'; //left +"vw";//"600px";//"35.1vw";
                }
            } else {
                videoDiv.style.width = '100%'; //left +"vw";//"600px";//"35.1vw";
            }
            videoDiv.style.height = '100%'; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.zIndex = 10;
            // videoDiv.style.pointerEvents='none';
            videoDiv.style.background = "black";
            if (this.useDailyco) {
                if (this.imgDiv) {
                    this.imgDiv.setAttribute("src", "/assets/images/closeFullScreen.png");
                    this.imgDiv.style.margin = "3%";
                }
            }
        } else {
            videoDiv.style.position = "absolute";
            videoDiv.style.left = left + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.top = top + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.width = width + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.height = height + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.zIndex = 10;
            // videoDiv.style.pointerEvents='none';
            videoDiv.style.background = "black";
            videoDiv.style.marginRight = "0";
            if (this.useDailyco) {
                if (this.imgDiv) {
                    this.imgDiv.setAttribute("src", "/assets/images/FullScreen.png");
                    this.imgDiv.style.margin = "1%";
                }
            }
        }
    } else {
        if (this.setFullScreen) {
            videoDiv.style.position = "absolute";
            videoDiv.style.left = 0 + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.top = 0 + "px"; //top + "vh";//"200px";//"20.9vh";
            if (this.useDailyco) {
                videoDiv.style.width = '85%'; //left +"vw";//"600px";//"35.1vw";
            } else {
                videoDiv.style.width = '100%'; //left +"vw";//"600px";//"35.1vw";
            }
            videoDiv.style.height = '100%'; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.zIndex = 10;
            // videoDiv.style.pointerEvents='none';
            videoDiv.style.background = "black";
            if (this.useDailyco) {
                if (this.imgDiv) {
                    this.imgDiv.setAttribute("src", "/assets/images/closeFullScreen.png");
                    this.imgDiv.style.margin = "3%";
                }
            }
        } else {
            videoDiv.style.position = "absolute";
            videoDiv.style.left = left + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.top = top + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.width = width + "px"; //left +"vw";//"600px";//"35.1vw";
            videoDiv.style.height = height + "px"; //top + "vh";//"200px";//"20.9vh";
            videoDiv.style.zIndex = 10;
            // videoDiv.style.pointerEvents='none';
            videoDiv.style.background = "black";
            videoDiv.style.marginRight = "0";
            if (this.useDailyco) {
                if (this.imgDiv) {
                    this.imgDiv.setAttribute("src", "/assets/images/FullScreen.png");
                    this.imgDiv.style.margin = "1%";
                }
            }
        }
    }
        if (this.isTutorialVideo) {
        videoDiv.style.border = "solid";
        videoDiv.style.borderColor = "white";
        videoDiv.style.borderWidth = "medium";
        if (this.imgDiv)
            this.imgDiv.style.display = "none";
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



VimeoPlacement.prototype.putAPlayButton = function () {
    var playBtnBackground = document.createElement('div');
    playBtnBackground.style.position = "absolute";
    playBtnBackground.style.top = 0;
    playBtnBackground.style.left = 0;
    playBtnBackground.style.width = "100%";
    playBtnBackground.style.height = "100%";
    playBtnBackground.style.zIndex = "9999";
    // playBtnBackground.style.pointerEvents = "none";
    playBtnBackground.style.background = "linear-gradient(rgb(0, 0, 0) -2.75%, rgba(0, 0, 0, 0.87) 52.76%, rgb(0, 0, 0) 57.88%)";
    playBtnBackground.style.display = "flex";
    playBtnBackground.style.justifyContent = "center";
    playBtnBackground.style.alignItems = "center";
    playBtnBackground.style.cursor = "wait";
    playBtnBackground.id = "playBtnBackground";

    var outerRing = this.getRings("8rem", "8rem", "0.4rem", "animateRipple-2");
    playBtnBackground.appendChild(outerRing);

    var innerRing = this.getRings("6rem", "6rem", "0.2rem", "animateRipple-3");
    playBtnBackground.appendChild(innerRing);


    var img = document.createElement('img');
    img.setAttribute("src", "/assets/images/loader.gif");
    img.style.position = "absolute";
    img.style.alignSelf = "center";
    img.style.pointerEvents = "none";
    img.style.cursor = "wait";
    //    img.style.margin = "3%";
    img.style.width = "4rem";
    this.playbutton = img;

    playBtnBackground.appendChild(img);

    var text = this.gettext();
    playBtnBackground.appendChild(text);

    return playBtnBackground;
};



VimeoPlacement.prototype.getRings = function (width, height, borderThick, className) {
    var rings = document.createElement('div');
    rings.style.position = "absolute";
    rings.style.alignSelf = "center";
    rings.style.width = width;
    rings.style.height = height;
    rings.style.border = borderThick + " solid rgba(255, 255, 255, 0.1)";
    rings.style.pointerEvents = "none";
    rings.style.cursor = "wait";
    rings.style.boxSizing = "border-box";
    rings.style.borderRadius = "100%";
    rings.id = "playBtnBackground";
    rings.classList.add(className);
    return rings;
};

VimeoPlacement.prototype.gettext = function () {
    var rings = document.createElement('div');
    rings.style.position = "absolute";
    rings.style.alignSelf = "center";
    rings.style.pointerEvents = "none";
    rings.style.cursor = "wait";
    rings.style.textAlign = "center";
    rings.style.marginTop = "10rem";
    rings.style.color = "white";
    rings.style.fontSize = "1.25rem";
    rings.innerHTML = "Click here to play the video";
    return rings;
};


VimeoPlacement.prototype.getBands = function (width, height, position) {
    var bands = document.createElement('div');
    bands.style.position = "absolute";
    if (position === "top") {
        bands.style.top = 0;
        bands.classList.add("bandT");

    } else if (position === "bottom") {
        bands.style.bottom = 0;
        bands.classList.add("bandB");

    }
    bands.style.width = width;
    bands.style.height = height;
    bands.style.pointerEvents = "none";
    bands.style.cursor = "wait";
    bands.style.background = "black";
    return bands;
};