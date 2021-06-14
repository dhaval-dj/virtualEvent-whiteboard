var ReactConnector = pc.createScript('reactConnector');
ReactConnector.attributes.add("skipTutorial", {
    type: "boolean",
    default: true
});
//Iframe from lobby
/*ReactConnector.attributes.add("productDisplay", {
    type: "entity"
});
ReactConnector.attributes.add("entZone", {
    type: "entity"
});
ReactConnector.attributes.add("photomoasic", {
    type: "entity"
});
ReactConnector.attributes.add("book", {
    type: "entity"
});
ReactConnector.attributes.add("gesture", {
    type: "entity"
});
//Hotspot
ReactConnector.attributes.add("videoHotspot", {
    type: "entity"
});
ReactConnector.attributes.add("ImageHotspot", {
    type: "entity"
});
ReactConnector.attributes.add("video2Hotspot", {
    type: "entity"
});
ReactConnector.attributes.add("webHotspot", {
    type: "entity"
});*/
//camera refernce

/*const menuItems = [

    {
        id: "home-session",
        name: "Home",
        class: "icon-home",
        isContextMenuTitle: true,
        contextMenuTitle: "Lobby",
        level: 0,
        enabled: true,
        subMenus: [
            // {
            //     id: 1, name: "Information Desk", isHighlighted: false, level: 1, method: "mobileInformationDesk", subMenus: [
            //         { id: 1, name: "Intoductory Video", isHighlighted: false, level: 2, method: "mobileHotspot" },
            //         { id: 2, name: "Agenda", isHighlighted: false, level: 2, method: "mobileHotspot" },
            //     ]
            // },
            {
                id: 2,
                name: "Runner Game",
                isHighlighted: false,
                level: 1,
                method: "mobileIframe"
            },
            {
                id: 3,
                name: "Photomosaic",
                isHighlighted: false,
                level: 1,
                method: "mobileIframe"
            },
            {
                id: 4,
                name: "Twitter Social Wall",
                isHighlighted: false,
                level: 1,
                method: "mobileIframe"
            },
            {
                id: 5,
                name: "Meeting Room Info",
                isHighlighted: false,
                level: 1,
                method: "mobileIframe"
            },
            // { id: 6, name: "Video", isHighlighted: false, level: 1, method: "mobileIframe" },
        ],
    },

    {
        id: 'session',
        name: "Session",
        class: "icon-video",
        level: 0,
        enabled: true,
        method: "mobileAuditorium"
    },
    {
        id: 'l&d',
        name: "L & D",
        class: "icon-stall",
        level: 0,
        enabled: true
    },
    {
        id: 'profile',
        name: "Schedule",
        class: "icon-agenda",
        level: 0,
        enabled: true
    },
    {
        id: 'call',
        name: "Call",
        class: "icon-phone",
        level: 0,
        subMenus: [],
        enabled: false
    }
];


const SessionQP = [{
        id: 'home-session',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        method: "mobileBack",
        enabled: true
    },
    {
        id: 'qna-session',
        name: "Q&A",
        class: "icon-qna",
        level: 0,
        enabled: true,
    },
    {
        id: 'poll-session',
        name: "Poll",
        class: "icon-poll",
        level: 0,
        enabled: true
    },
];

const LD = [{
        id: 'home-session',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        enabled: true
    },
    {
        id: 'ld1',
        name: "L&D 1",
        class: "icon-stall",
        level: 0,
        enabled: true,
        method: "mobileAuditorium"
    },
    {
        id: 'ld2',
        name: "L&D 2",
        class: "icon-stall",
        level: 0,
        enabled: true,
        method: "mobileAuditorium"
    },
    {
        id: 'ld3',
        name: "L&D 3",
        class: "icon-stall",
        level: 0,
        enabled: true,
        method: "mobileAuditorium"
    },

];

const LD1QP = [{
        id: 'home-l1',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        method: "mobileBack",
        enabled: true
    },
    {
        id: 'qna-l1',
        name: "Q&A",
        class: "icon-qna",
        level: 0,
        enabled: true,
    },
    {
        id: 'poll-l1',
        name: "Poll",
        class: "icon-poll",
        level: 0,
        enabled: true
    },
];

const LD2QP = [{
        id: 'home-l2',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        method: "mobileBack",
        enabled: true
    },
    {
        id: 'qna-l2',
        name: "Q&A",
        class: "icon-qna",
        level: 0,
        enabled: true,
    },
    {
        id: 'poll-l2',
        name: "Poll",
        class: "icon-poll",
        level: 0,
        enabled: true
    },
];

const LD3QP = [{
        id: 'home-l3',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        method: "mobileBack",
        enabled: true
    },
    {
        id: 'qna-l3',
        name: "Q&A",
        class: "icon-qna",
        level: 0,
        enabled: true,
    },
    {
        id: 'poll-l3',
        name: "Poll",
        class: "icon-poll",
        level: 0,
        enabled: true
    },
];

const InfoDeskMenu = [{
        id: 'home-session',
        name: "Back",
        class: "icon-angle-back",
        level: 0,
        method: "mobileBack",
        enabled: true
    },
    {
        id: 'agenda',
        name: "Agenda",
        class: "icon-agenda",
        level: 0,
        enabled: true,
        method: "showAgenda"
    },
    {
        id: 'video',
        name: "video",
        class: "icon-video",
        level: 0,
        enabled: true
    },
];*/



ReactConnector.prototype.initialize = function () {
    var self = this;
    window.canvasManager = this; //to connect to the react
    this.reactHome = window.ReactHomeManager;
    this.chatbotOpen = false;
    this.onTargetState = null;

    var detector = new MobileDetect(window.navigator.userAgent);

    this.states = {
        lobby: 0,
        informationDesk: 1,
        audi1: 2,
        audi2: 3,
        audi3: 4,
        audi4: 5,
        hall: 6,
        stall: 7
    };
    this.stalls = {
        stall1: 1,
        stall2: 2,
        stall3: 3,
        stall4: 4,
        stall5: 5,
        none: 0
    };
    this.currentState = this.states.lobby;
    this.currentStall = this.stalls.none;
    this.isCanvasPaused = false;
    window.lastMenu = 0;
    //Skip Tutorial
    this.attachListner();


    // if(this.skipTutorial)
    // {
    //     self.app.fire("startLobbyVideo");
    //     self.app.fire("skipTutorial");
    // }else if(detector.phone())
    // {
    //     self.app.fire("startLobbyVideo");
    //     self.app.fire("skipTutorial");
    // }
    // 
    var lobbyhotspots = this.app.root.findByName("lobby hotspots");
    this.pdf1 = lobbyhotspots.findByName("Audi 2");
    this.infoWeb = this.app.root.findByName("Info Web");


};

ReactConnector.prototype.attachListner = function () {
    var self = this;

    this.app.on('skipTutorial', function () {
        //self.reactHome.OpenMenuWithId(self.states.lobby);
        self.app.fire('StopVimeo');
        if (self.reactHome) {
            self.reactHome.ToggleUIInteractbleState(true);
            self.reactHome.ShowTutorialIcon(true);
        }
        self.skipped = true;
    });

    this.app.on('ShowTutorial', function () {
        if (self.reactHome) {

            self.reactHome.ShowTutorialIcon(false);
        }
    });

    this.app.on('ShowTutorialAgain', function () {
        if (self.reactHome) {
            self.reactHome.ShowTutorialIcon(true);
        }
    });

    this.app.on("StateReached", function () { //this should he called from scene manager when state is finaly updated
        console.log("stateReached");
        self.iFired = false;
        //self.reactHome.ToggleUIInteractbleState(true);
        if (self.reactHome)
            self.reactHome.ToggleMenuLoading(false);

            
         if(self.LoungeStall)
         {
            self.LoungeStall=false;
            self.CreatePublicChat();
         }   
    });


    this.app.on("IReachedHere", function (where) {
        console.log(where);
        self.reactHome.reachedTarget(where);
    });


    this.app.on('resumeCanvas', function () {
        if (self.isCanvasPaused) {
            self.app.timeScale = 1;
            self.isCanvasPaused = false;
            //console.log("Resumed");
        }
    });
    this.app.on('pauseCanvas', function () {
        if (!self.isCanvasPaused) {
            self.app.timeScale = 0;
            self.isCanvasPaused = true;
            // console.log("Paused");
        }
    });

    this.app.on("hotspotCliked", function (hotspotId) {
        self.reactHome.setSubMenuActiveId(hotspotId);
    });
    
    
    /////////////////////////////////////TWILIO VIDEO CALL ///////////////////////////////////////
    
    this.app.on("EnterpriseVideoCall", function (hotspotId) {
        self.reactHome.joinCall('Enterprise');
    });
    
    
 this.app.on("GamingVideoCall", function (hotspotId) {
        self.reactHome.joinCall('Gaming');
    });
     this.app.on("ClientVideoCall", function (hotspotId) {
        self.reactHome.joinCall('Client');
    });
     this.app.on("PortableSSDsVideoCall", function (hotspotId) {
        self.reactHome.joinCall('PortableSSDs');
    });
     this.app.on("WesternDigitalReadForNASVideoCall", function (hotspotId) {
        self.reactHome.joinCall('WesternDigitalReadForNAS');
    });
     this.app.on("SmartVideoStorageSolutionVideoCall", function (hotspotId) {
        self.reactHome.joinCall('SmartVideoStorageSolution');
    });
     this.app.on("NVMeAndSSDVideoCall", function (hotspotId) {
        self.reactHome.joinCall('NVMeAndSSD');
    });
    this.app.on("ProfessionalVideoCall", function (hotspotId) {
        self.reactHome.joinCall('Professional');
    });
    
    this.app.on("WorkOnTheGoVideoCall", function (hotspotId) {
        self.reactHome.joinCall('WorkOnTheGo');
    });
    this.app.on("WorkFromHomeVideoCall", function (hotspotId) {
        self.reactHome.joinCall('WorkFromHome');
    });


    ////////////////////PPJ//////////////////////////////////////////////

    this.app.on("goToBreakoutRoom1", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToBreakout1');
    });
    this.app.on("goToBreakoutRoom2", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToBreakout2');
    });

    this.app.on("goToAuditorium1", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToAuditorium1');
    });
    this.app.on("goToAuditorium2", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToAuditorium2');
    });
    this.app.on("goToAuditorium3", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToAuditorium3');
    });

    this.LoungeStall=false;
    this.app.on("goToLounge", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToLounge');
        self.LoungeStall=true;
    });
    this.app.on("goToHall", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToExpoHall');
    });
    this.app.on("goToInformationDesk", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToInformationDesk');
    });

    this.app.on("TurnOnLobbyButton", function (hotspotId) {
        self.LobbyCallsPlaycanvas('BackToLobby');
        self.ClosePublicGroupChat();
        self.LoungeStall=false;
    });


    this.app.on("goToWorkShop", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToWorkshop');
    });

    this.app.on("enterWorkshopScreenClientPlus", function (hotspotId) {
        self.LobbyCallsPlaycanvas('workshopScreen1');
    });
    
    this.app.on("enterWorkshopScreenGaming", function (hotspotId) {
        self.LobbyCallsPlaycanvas('workshopScreen2');
    });
    
    this.app.on("enterWorkshopScreenEnterprise", function (hotspotId) {
        self.LobbyCallsPlaycanvas('workshopScreen3');
    });
    
    this.app.on("enterWorkshopScreenConsumer", function (hotspotId) {
        self.LobbyCallsPlaycanvas('workshopScreen4');
    });
    

    this.app.on("reachedWorkshop", function (hotspotId) {
        self.LobbyCallsPlaycanvas('goToWorkshop');
    });

    this.app.on("showStall", function (stallID) {
        self.reactHome.reachedInsideStall(stallID);
    });

    this.app.on("OpenUserGuid", function () {
        window.open('https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/wd/pdf/User%20Guidance.pdf');
    });
    
};

 
//Using for Change video
ReactConnector.prototype.UpdateAudiVideos = function () {
    console.log("s");
    this.app.fire('ChangeAudiVideoURL');
};

ReactConnector.prototype.mobileAuditorium1ForceFully = function (request) {
    this.app.fire('ChatbotOff');
    if (this.currentState === this.states.audi1) {
        return;
    }
    closeStallConetent();
    this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
    this.app.fire('goToAuditorium1');
};

ReactConnector.prototype.mobileAuditorium = function (request) {

    this.app.fire('ChatbotOff');

    switch (request.id) {
        case "session":
            if (this.currentState === this.states.audi1) {
                return;
            }
            this.iFired = true;
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            this.app.fire('goToAuditorium1');
            break;
        case "ld1":
            if (this.currentState === this.states.audi2) {
                return;
            }
            this.iFired = true;
            this.currentState = this.states.audi2;
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            this.app.fire('goToAuditorium2');
            break;
        case "ld2":
            if (this.currentState === this.states.audi3) {
                return;
            }
            this.iFired = true;
            this.currentState = this.states.audi3;
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            this.app.fire('goToAuditorium3');
            break;
        case "ld3":
            if (this.currentState === this.states.audi4) {
                return;
            }
            this.iFired = true;
            this.currentState = this.states.audi4;
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            this.app.fire('goToAuditorium4');
            break;
        default:
            if (this.currentState === this.states.audi1) {
                return;
            }
            this.iFired = true;
            this.currentState = this.states.audi1;
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            this.app.fire('goToAuditorium1');
            break;
    }
};




////////////////////////////////PPJ//////////////////////////////////////////

ReactConnector.prototype.CreatePublicChat = function () {
    CreatePublicChat();
    
};


function CreatePublicChat() {

    var removeChat = document.getElementById('publicGroupChat');
    if (removeChat) {

        removeChat.remove();
        return;
    }


    var div = document.createElement("div"); // stall-container popover-modal
    div.setAttribute('class', 'loungeArea-chat');
    div.setAttribute('id', 'publicGroupChat');
    var div2 = document.createElement("div"); // counterBox
    div2.setAttribute('class', 'counterBox');



    var iframe = document.createElement("iframe");
    iframe.src = "../../publicchat/index.html";
    iframe.setAttribute('class', 'iframe-css'); // iframe-css

    div.appendChild(div2);
    div2.appendChild(iframe);
    document.body.appendChild(div);

};

ReactConnector.prototype.createMainLeaderBoard = function () {
    createMainLeaderBoard();
};

function createMainLeaderBoard() {

    var removeChat = document.getElementById('publicGroupChat');
    if (removeChat) {
        removeChat.remove();
        return;
    }

    var div = document.createElement("div"); // stall-container popover-modal
    div.setAttribute('class', 'stall-container popover-modal');
    div.setAttribute('id', 'publicGroupChat');

    var divClose = document.createElement("div"); 
    divClose.setAttribute('class', 'close');
    divClose.setAttribute('onclick', 'createMainLeaderBoard()');

    var div2 = document.createElement("div"); // counterBox
    div2.setAttribute('class', 'counterBox');

    var iframe = document.createElement("iframe");
    iframe.src = "../../leaderboard/index.html";
    iframe.setAttribute('class', 'iframe-css'); // iframe-css
    
    div.appendChild(divClose);
    div.appendChild(div2);
    div2.appendChild(iframe);
    document.body.appendChild(div);

};

ReactConnector.prototype.createProfileLeaderBoard = function () {
    createProfileLeaderBoard();
};

function createProfileLeaderBoard() {

    var removeChat = document.getElementById('publicGroupChat');
    if (removeChat) {
        removeChat.remove();
        return;
    }

 

    var div = document.createElement("div"); 
    div.setAttribute('class', 'stall-container popover-modal');
    div.setAttribute('id', 'publicGroupChat');

    var divClose = document.createElement("div"); 
    divClose.setAttribute('class', 'close');
    divClose.setAttribute('onclick', 'createProfileLeaderBoard()');

    var div2 = document.createElement("div"); // counterBox
    div2.setAttribute('class', 'counterBox');

    var iframe = document.createElement("iframe");
    iframe.src = "../../leaderboard/index.html";
    iframe.setAttribute('class', 'iframe-css'); // iframe-css

    div.appendChild(divClose);
    div.appendChild(div2);
    div2.appendChild(iframe);
    document.body.appendChild(div);

};



ReactConnector.prototype.createFeedbackform = function () {
    createFeedbackform();
};

function createFeedbackform() {

    var removeChat = document.getElementById('publicGroupChat');
    if (removeChat) {
        removeChat.remove();
        return;
    }

    var div = document.createElement("div"); // stall-container popover-modal
    div.setAttribute('class', 'stall-container popover-modal');
    div.setAttribute('id', 'publicGroupChat');

    var divClose = document.createElement("div"); 
    divClose.setAttribute('class', 'close');
    divClose.setAttribute('onclick', 'createFeedbackform()');

    var div2 = document.createElement("div"); // counterBox
    div2.setAttribute('class', 'counterBox');

    var iframe = document.createElement("iframe");
    iframe.src = "../../feedback-form/index.html";
    iframe.setAttribute('class', 'iframe-css'); // iframe-css
    
    div.appendChild(divClose);
    div.appendChild(div2);
    div2.appendChild(iframe);
    document.body.appendChild(div);

};




function ClosePublicGroupChat() {

    console.log('Close');
}

ReactConnector.prototype.ClosePublicGroupChat = function () {
    var removeChat = document.getElementById('publicGroupChat');
    if (removeChat)
        removeChat.remove();
};


ReactConnector.prototype.ShowTutorial = function () {
    this.app.fire('ShowTutorial');
};

ReactConnector.prototype.LobbyCallsPlaycanvas = function (data) {
    var self = this;


    switch (data) {
        case 'goToAuditorium1': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('Auditorium1');
            break;
        }
        case 'goToAuditorium2': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('Auditorium2');
            break;
        }

        case 'goToAuditorium3': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('Auditorium3');
            break;
        }

        case 'goToBreakout1': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('breakout1');
            break;
        }

        case 'goToBreakout2': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('breakout2');
            break;
        }

        case 'goToLounge': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('Lounge');
            break;
        }

        case 'goToExpoHall': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('ExpoHall');
            break;
        }

        case 'goToInformationDesk': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('InformationDesk');
            break;
        }

        case 'BackToLobby': {
            self.reactHome.backToMainLobbyFromOtherState();
            break;
        }
        case 'goToWorkshop': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('Workshop');
            break;
        }
        case 'workshopScreen1': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            self.reactHome.handleSubmenuClickFromPlaycanvas('WorkshopScreen1');
            break;
        }
    }
};


//All Calling from react
ReactConnector.prototype.LobbyCallsFromReact = function (data) {

    switch (data) {
        case 'goToAuditorium': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            //this.reactHome.ToggleUIInteractbleState(false);
            this.app.fire('goToAuditorium1');
            break;
        }
        case 'goToWorkShop': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
           // this.reactHome.ToggleUIInteractbleState(false);
            this.app.fire('goToWorkShop');
            break;
        }
        case 'meetTheTeam': {
            this.app.fire('OpenMeetTheTeam');
            break;
        }
        case 'goToMeetingRoomSelection': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
           // this.reactHome.ToggleUIInteractbleState(false);
            this.app.fire('goToMeetingRoomSelection');
            break;
        }
        // case 'goToLounge': {
        //     this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
        //     this.app.fire('goToLounge');
        //     break;
        // }
        case 'goToExpoHall': {
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
           // this.reactHome.ToggleUIInteractbleState(false);
            this.app.fire('goToHall');
            break;
        }
        case 'goToInformationDesk': {
           // this.reactHome.ToggleUIInteractbleState(false);
            this.reactHome.ToggleMenuLoading(true); //turn the loading screen On
            break;
        }
        case 'enterInformationDesk': {
            break;
        }
        case 'backToLobby': {           
            //this.reactHome.ToggleUIInteractbleState(false);
            this.app.fire('comeBack');

            break;
        }
        case '': {
            break;
        }
    }
};


ReactConnector.prototype.exitfullscreenonback = function (data) {
    this.app.fire("closeFullScreenVideo1");
}