// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import Menu from "./Menu";
import Submenu from "./Submenu";
import ContextSubmenu from "./ContextSubmenu";

import Qna from "./auditoriums/QAndA";
import Poll from "./auditoriums/PublicPoll";

import Profile from "./Profile";
import { createHashHistory } from 'history'
import { FirebaseContext } from "../firebase";
import AppQna from "../component/App1";
// import PublicChat from "./publicChat/publicChat";
import { isMobileOnly } from 'react-device-detect';
// import ChatLoader from "./ChatLoader";
import VideoCall from "./videoCalling/VideoCall";
import CloseButton from './close1.png';
import Bar from './bar.png';
import Social from "./Social";
import SocialM from "./SocialM";
import SocialR from "./SocialR";

import QNAL1 from "../qnal1/QNAL1";
import QNAL2 from "../qnal2/QNAL2";
import QNAL3 from "../qnal3/QNAL3";
import QNAL4 from "../qnal4/QNAL4";
import QNAL5 from "../qnal5/QNAL5";

import POLL1 from "./auditoriums/POLL1";
import POLL2 from "./auditoriums/POLL2";
import POLL3 from "./auditoriums/POLL3";
import POLL4 from "./auditoriums/POLL4";
import POLL5 from "./auditoriums/POLL5";


import Agenda from "./Agenda";
import { authx, rdbx, rdatabasex, dbx } from "../firebase/firebase";
import TutorialImage from './Tutorial.png';
import TutorialImage2 from './Tutorial2.png';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

//for daily co
import Dailyco from "./dailyco/dailyco";
import moment from 'moment';

// end of daily co

export const history = createHashHistory()

var tImage = null;
var audi1_CurrentSession = 0;
var audi2_CurrentSession = 0;
var audi3_CurrentSession = 0;
var slider = false;
var whiteboardSlider = true;

window.stallEnterTime = 0;
window.audiEnterTime = 0;
window.HallEnterTime = 0;
window.visitStart = 0;
window.liveCountInMyRoom=0;

window.myTimeStatus = {
    location: '',
    visitStart: '',
    visitEnd: '',
    other: '',
};
window.videoCallStartTime=0;



//Live Count for analitics
var Lobby = 0;
var insideHall = 0;
var Gaming = 0;
var Client = 0;
var PortableSSDs = 0;
var Enterprise = 0;
var NVMeandSSD = 0;
var SmartVideo = 0;
var WesternDigitalReadforNAS = 0;
var Professional = 0;
var WorkOnTheGo = 0;
var WorkFromHome = 0;
var insideWorkshopLobby = 0;
var insideClientPlus = 0;
var insideConsumer = 0;
var insideGaming = 0;
var insideEnterprise = 0;
var insideAudi = 0;
var infodesk = 0;
var totalUser=0;
var gotoBreakeout=0;
var liveInBO1=0;
var liveInBO2=0;
var liveInBO3=0;
var liveInBO4=0;
var liveInBO5=0;
var liveInBO6=0;
var liveInBO7=0;
var liveInBO8=0;
var liveInBO9=0;
var liveInBO10=0;
var liveInBO11=0;
var liveInBO12=0;
var liveInBO13=0;
var liveInBO14=0;
var liveInBO15=0;
var liveInBO16=0;
var liveInBO17=0;
var liveInBO18=0;


///////////////MAIN MENU/////////////////////
const menuItems = [
    // { id: 'leaderBoard-show', name: "Leader Board", class: "icon-leaderboard", level: 0, enabled: true, },
    { id: "home-session", name: "Lobby", class: "icon-lobby", level: 0, enabled: true, },
    { id: 'auditorium', name: "Audi", class: "icon-auditorium", evel: 0, enabled: true, },
    { id: 'team', name: "Meet The Team", class: "icon-breakout", level: 0, enabled: true, },
    { id: 'breakout', name: "1:1 Meetings", class: "icon-lounge", level: 0, enabled: true, method: "mobileAuditorium" },
    { id: 'workshop', name: "Workshop", class: "icon-flower", level: 0, enabled: true, method: "mobileAuditorium" },
    { id: 'exhibits', name: "Exhibits", class: "icon-exhibits", level: 0, enabled: true },
    { id: 'profile', name: "Profile", class: "icon-profile", level: 0, enabled: true },
    // { id: 'feedback', name: "Feedback", class: "icon-feedback", level: 0, enabled: true },
];
/////////////// END /////////////////////


///////////////AUDITORIUM INSIDE SUB MENU/////////////////////

const AuditoriumSideMenu = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'showQna1', name: "Q&A", class: "icon-qna", level: 0, enabled: true, },
    { id: 'showPoll1', name: "Poll", class: "icon-poll", level: 0, enabled: true }
];


const WorkshopClientPlus = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'showQna2', name: "Q&A", class: "icon-qna", level: 0, enabled: true, },
    { id: 'showPoll2', name: "Poll", class: "icon-poll", level: 0, enabled: true }
];

const WorkshopGaming = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'showQna3', name: "Q&A", class: "icon-qna", level: 0, enabled: true, },
    { id: 'showPoll3', name: "Poll", class: "icon-poll", level: 0, enabled: true }
];

const WorkshopEnterprise = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'showQna4', name: "Q&A", class: "icon-qna", level: 0, enabled: true, },
    { id: 'showPoll4', name: "Poll", class: "icon-poll", level: 0, enabled: true }
];

const WorkshopConsumer = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'showQna5', name: "Q&A", class: "icon-qna", level: 0, enabled: true, },
    { id: 'showPoll5', name: "Poll", class: "icon-poll", level: 0, enabled: true }
];

const BreakoutRomm = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
    { id: 'uihider', name: "Hide Menu", class: "icon-hideMenu", level: 0, enabled: true },
    { id: 'whiteBoard', name: "White Board", class: "icon-hideMenu", level: 0, enabled: true },
];

const AllBack = [
    { id: 'backToLobby', name: "Back", class: "icon-angle-back", level: 0, enabled: true },
];

const InfoDeskMenu = [
    { id: 'home-session', name: "Back", class: "icon-angle-back", level: 0, method: "mobileBack", enabled: true },
    { id: 'agenda', name: "Agenda", class: "icon-agenda", level: 0, enabled: true, method: "showAgenda" },
    { id: 'video', name: "video", class: "icon-video", level: 0, enabled: true, method: "showInfoDeskVideo" },
    { id: 'call', name: "Call", class: "icon-phone", level: 0, subMenus: [], enabled: false }
];


const MenuStates =
{
    Home: 1,
    Auditorium: 2,
    Halls: 3,
    Chat: 4,
    Profile: 5,
    none: 0
}

class Home extends Component {
    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
        this.state = {
            menuItems: menuItems,
            activeMenuLevel0: null,
            activeMenuLevel1: null,
            activeMenuLevel2: null,
            currentMenuState: MenuStates.none,
            lastActiveMenu: null,
            user: null,
            userX: {},
            uidx: null,
            showVideoCall: false,
            showNotification: false,
            notification: null,
            room: null,
            callWatcher: null,
            callMenuActive: false,
            isInteractable: false,
            activeSideMenu: menuItems,
            showProfile: false,
            /*    Lounge: Lounge,
               Breakout: Breakout,
               LD1QP: LD1QP,
               LD2QP: LD2QP,
               LD3QP: LD3QP,
               LD: LD, */

            AllBack: AllBack,


            Infodsek: InfoDeskMenu,

            showQna1: false,
            showPoll1: false,

            showQna2: false,
            showPoll2: false,

            showQna3: false,
            showPoll3: false,

            showQna4: false,
            showPoll4: false,

            showQna5: false,
            showPoll5: false,

            isLobby: false,
            isShare: false,
            showHelp: false,
            isHelp1: false,
            isHelp2: false,
            isHelpShow1: false,
            isHelpShow2: false,
            updateAnalyticsOnScreen: "0",
            showAdminNotification: false,
            textContent: "",
            landDOpened: false,
            moveToSession: false,
            sessionOpenned: false,

            audiURL1: '',//Main Aui
            audiURL2: '',//Workshop Clint
            audiURL3: '',//Workshop Game
            audiURL4: '',//Workshop Enterprise
            audiURL5: '',//Workshop Consumer 
            //for daily co
            updateLiveParticipantVideoCall: false,
            enterbreakout: false,
            sidebar: false,

            twilioAdmins: [],
            myCurrentState: 'home-session',
            myLastState: null,
            whereIm: 'lobby',
            myStallName: '',
            whereImForLeaderboard: '',
            whereImInStallForLeaderboard: '',
            keynoteSessionID: '',
            showWarnningScreen:false,
            isHeAdmin:false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.hideMenuLevel1 = this.hideMenuLevel1.bind(this);
        this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
        this.onHeadingClick = this.onHeadingClick.bind(this);
        this.handleSubContextMenuLevel1 = this.handleSubContextMenuLevel1.bind(this);
        this.handleSubContextMenuLevel2 = this.handleSubContextMenuLevel2.bind(this);
        this.onSwipeUpClicked = this.onSwipeUpClicked.bind(this);
        this.joinCall = this.joinCall.bind(this);
        this.onCallDisconnect = this.onCallDisconnect.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.startCallWatcher = this.startCallWatcher.bind(this);
        this.endCallWatcher = this.endCallWatcher.bind(this);
        this.updateJoinCallMenu = this.updateJoinCallMenu.bind(this);
        this.removeJoinCallMenu = this.removeJoinCallMenu.bind(this);
        this.listener = null;
        this.videoCall = React.createRef();
        this.hideAllMenu = this.hideAllMenu.bind(this);
        this.resetSubMenuActiveId = this.resetSubMenuActiveId.bind(this);

        this.getLandDStatus = this.getLandDStatus.bind(this);
        this.getSessionStatus = this.getSessionStatus.bind(this);



        this.user_ActiveStatus = this.user_ActiveStatus.bind(this);
        this.Analytics_LiveUsersCountTracker = this.Analytics_LiveUsersCountTracker.bind(this);

        this.attachAdminControlListener = this.attachAdminControlListener.bind(this);
        this.removeAdminControlListener = this.removeAdminControlListener.bind(this);

        window.ReactHomeManager = this;
        this.isMobileForTest = false;
        //to pass to daily co 
        this.callEnterBreakout = this.callEnterBreakout.bind(this);
        this.LiveParticipantListFromFirebase = new Map();
        this.canStartVideoCall = false;

    }


    componentWillMount() {
        if (this.authLis)
            this.authLis();
    }

    leaderBoardCalculater = () => {


    }



    ShowTutorialAgain = () => {
        //this.state.showHelp=flag;
        // this.setState({showHelp:flag});

        window.canvasManager.ShowTutorial();
    }

    ShowTutorialIcon = (flag) => {
        this.setState({ showHelp: flag });
        this.state.showHelp = flag;
    }





    getShare = async () => {
        await this.context.db.collection("InfinityRunner").doc(this.state.uidx).onSnapshot(function (doc) {

            if (doc.data()) {
                if (doc.data().isShare === true) {
                    this.isShare = true;
                    this.setState({ isShare: true });
                }
            }


        }.bind(this));
    }


    componentDidMount() {
        const that = this;

        this.checkOrientation();
        
        window.addEventListener('resize', function(){
            that.checkOrientation();
        });
        window.addEventListener('orientationchange', function(){
            that.checkOrientation();
        });

        try {

            this.authLis = this.context.auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ user: user });
                    this.setState({ uidx: user.uid });

                    that.context.db.collection('VideoCallAdmin').doc('Admin').get().then(doc => {
                        const docData = doc.data();
                        let adminArray = docData.uid;
                        that.state.twilioAdmins = docData.uid;
                        // console.log(that.state.twilioAdmins);
                        if (adminArray.includes(user.uid)) {

                            this.setUserOffline(user);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });

                    // for daily co                
                    this.context.homeVideoPrepareFunction = this.addTownHallLisenter;
                    // 


                    this.initializeRealtimeDatabaseContent();
                    this.updateMyGameScore();
                    //Rishabh Start
                    this.user_ExistInTableCheck();
                    this.Analytics_AuditoriumCurrentSession();
                    this.startLiveAnalyticsCount();
                    // this.timerID = setInterval(
                    //     () => this.Analytics_CheckForMenuStateChange(),
                    //     1000
                    // );
                    //Rishabh End

                    this.context.db.collection('iesacallroom')
                        .doc(user.email).get().then(function (doc) {
                            const data = doc.data()
                            data.startDateTime = Date.parse(data.startDateTime);
                            data.endDateTime = Date.parse(data.endDateTime);
                            that.handleCall(data);
                        }).catch(function (error) {
                            //console.log("Error getting cached document:", error);
                        });

                    this.getShare();
                    this.GetCallStartStatusforStreamVideo();
                } else {
                    window.location.href = "/index.html";
                    this.setState({ user: null })
                }
            });

            if (isMobileOnly) {
                // console.log("found mobile");
                this.setState({
                    activeMenuLevel0: menuItems[0]
                });
                this.isMobileForTest = true;

                var self = this;
                window.startMobileCanvasApp();
                // window.startWindowCanvasApp();
                this.addSwipeListeners();
                // this.ToggleUIInteractbleState(false);


            } else {
                console.log("found desktop");
                this.isMobileForTest = false;
                window.startWindowCanvasApp();
                this.ToggleUIInteractbleState(false);
            }

        } catch (e) {
            console.error(e);
        }
        tImage = TutorialImage;
        this.hideAllMenu();
        this.attachAdminControlListener();
        //this.hideShare();
        //this.isShare = true;
        //this.setState({ isShare: true});


    }

    addSwipeListeners = () => {
        var self = this;

        /* document.addEventListener('swiped-up', function (e) {
            if (e.target.id === "application-canvas") {
                //console.log("swipefound Up!!");
                self.onSwipeUpClicked(true);
            } // element that was swiped
        });
        document.addEventListener('swiped-down', function (e) {
            if (e.target.id === "application-canvas") {
                // console.log("swipefound Down!!");
                self.onSwipeUpClicked(false);
            }
        });

        document.addEventListener('swiped-right', function (e) {
            if (e.target.id === "application-canvas") {
                window.canvasManager.moveCameraRight();
                // console.log("swipefound Right!!");
            }
        });


        document.addEventListener('swiped-left', function (e) {
            if (e.target.id === "application-canvas") {
                window.canvasManager.moveCameraLeft();
                // console.log("swipefound Left!!");
            }
        });
         */
        document.addEventListener('swiped-right', function (e) {
            if (e.target.id === "application-canvas") {
                window.canvasManager.moveCameraLeft();
                // window.canvasManager.moveCameraRight();
                // console.log("swipefound Right!!");
            }
        });


        document.addEventListener('swiped-left', function (e) {
            if (e.target.id === "application-canvas") {
                // window.canvasManager.moveCameraLeft();
                window.canvasManager.moveCameraRight();
                // console.log("swipefound Left!!");
            }
        });
    }



    componentWillUnmount() {
        clearInterval(this.timerID);
        this.removeAdminControlListener();


        //for dailyco
        this.removeTownHallLisenter();
    }
    // Rishabh
    //Rishabh Start
    user_AnalyticsHandler = async (stateValue, stateMode) => {
        return;
        try {
            if (stateValue == 2 && stateMode == "Enter") {
                // var countVal = 0;
                // rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Session_Visit_Count').once('value').then(function(snapshot){
                //   countVal = (snapshot.val());
                //   countVal++;
                //   rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Session_Visit_Count').set(countVal);
                //   rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Current_Room').set("session");
                //   console.log("Session XXXX");
                // });
                //rdbx.ref('/user_analytics/' + this.auth.currentUser.uid + '/LnD_Connect1_Visit_Status').set(rdatabasex.ServerValue.TIMESTAMP); 
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Lobby");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/G04_LY').set("Y");
            }
            else if (stateValue == 6 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("BO1");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/F01_BO1').set("Y");
            }
            else if (stateValue == 8 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("BO2");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/G01_BO2').set("Y");
            }
            else if (stateValue == 10 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Audi1");

                if (audi1_CurrentSession == 1) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C01_A1S1').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C01_A1S1').set("Y");
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi1_CurrentSession == 2) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C04_A1S2').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C04_A1S2').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi1_CurrentSession == 3) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C07_A1S3').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C07_A1S3').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi1_CurrentSession == 4) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C10_A1S4').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C10_A1S4').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }

            }
            else if (stateValue == 12 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Audi2");

                if (audi2_CurrentSession == 1) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D01_A2S1').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D01_A2S1').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                var scoreValue = (snapshot.val());
                                scoreValue += 30;
                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi2_CurrentSession == 2) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D04_A2S2').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D04_A2S2').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                var scoreValue = (snapshot.val());
                                scoreValue += 30;
                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi2_CurrentSession == 3) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D07_A2S3').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D07_A2S3').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                var scoreValue = (snapshot.val());
                                scoreValue += 30;
                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi2_CurrentSession == 4) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D10_A2S4').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D10_A2S4').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi2_CurrentSession == 5) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D13_A2S5').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D13_A2S5').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi2_CurrentSession == 6) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D16_A2S6').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D16_A2S6').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
            }
            else if (stateValue == 14 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Audi3");

                if (audi3_CurrentSession == 1) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E01_A3S1').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E01_A3S1').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi3_CurrentSession == 2) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E04_A3S2').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E04_A3S2').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
                else if (audi3_CurrentSession == 3) {
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E07_A3S3').once('value').then(function (snapshot) {
                        var subject = (snapshot.val());
                        //Entering Audi1 Session1 first time
                        if (subject == "N") {
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E07_A3S3').set("Y");

                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                var scoreLine = (snapshot.val());
                                if (scoreLine == "N") {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }

                            });
                        }
                        //Already entered Audi1 Session1 once
                        else {
                        }
                    });
                }
            }
            else if (stateValue == 16 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Lounge");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/G02_LG').set("Y");
            }
            else if (stateValue == 18 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("Exhibits");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/G03_EH').set("Y");
            }
            else if (stateValue == 20 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall1");
                rdbx.ref('/user_analytics_wd_stall_1/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 21 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall2");
                rdbx.ref('/user_analytics_wd_stall_2/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 22 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall3");
                rdbx.ref('/user_analytics_wd_stall_3/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 23 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall4");
                rdbx.ref('/user_analytics_wd_stall_4/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 24 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall5");
                rdbx.ref('/user_analytics_wd_stall_5/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 25 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall6");
                rdbx.ref('/user_analytics_wd_stall_6/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 26 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall7");
                rdbx.ref('/user_analytics_wd_stall_7/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }
            else if (stateValue == 27 && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').set("ExhibitsStall8");
                rdbx.ref('/user_analytics_wd_stall_8/' + authx.currentUser.uid + '/A03_Visited').set("Y");
            }

            else if (stateValue == "PhotoMosaic" && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/J01_PM').once('value').then(function (snapshot) {
                    if (snapshot.val() == "N") {

                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/J01_PM').set("Y");
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                            var scoreValue = (snapshot.val());
                            scoreValue += 15;
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                        });
                    }
                });
            }
            else if (stateValue == "RunnerGame" && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/H01_IR').once('value').then(function (snapshot) {
                    if (snapshot.val() == "N") {

                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/H01_IR').set("Y");
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                            var scoreValue = (snapshot.val());
                            scoreValue += 15;
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                        });
                    }
                });
            }
            else if (stateValue == "GAME8" && stateMode == "Enter") {
                rdbx.ref('/user_analytics_wd_stall_8/' + authx.currentUser.uid + '/GA').once('value').then(function (snapshot) {
                    if (snapshot.val() == "N") {

                        rdbx.ref('/user_analytics_wd_stall_8/' + authx.currentUser.uid + '/GA').set("Y");
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                            var scoreValue = (snapshot.val());
                            scoreValue += 15;
                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                        });
                    }
                });
            }
            // else if(stateValue === "SocialWall" && stateMode === "enter")
            // {
            //   var countVal = 0;
            //   rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Social_Wall_Visit_Count').once('value').then(function(snapshot){
            //     countVal = (snapshot.val());
            //     countVal++;
            //     rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Social_Wall_Visit_Count').set(countVal);
            //   });
            // }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            //.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
        }
    };

    //Rishabh Start
    Analytics_AuditoriumCurrentSession() {
        return;
        var query = rdbx.ref("user_analytics_currentSession_wd");
        query.on("value", (snapshot) => {

            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                switch (key) {
                    case 'Auditorium1_SessionLive': {
                        audi1_CurrentSession = childSnapshot.val();
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').once('value').then(function (snapshot) {
                            var _room = (snapshot.val());

                            if (_room == "Audi1") {
                                if (audi1_CurrentSession == 1) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C01_A1S1').set("Y");
                                }
                                else if (audi1_CurrentSession == 2) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C04_A1S2').set("Y");
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi1_CurrentSession == 3) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C07_A1S3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi1_CurrentSession == 4) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/C10_A1S4').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                            }
                        });
                        break;
                    }
                    case 'Auditorium2_SessionLive': {
                        audi2_CurrentSession = childSnapshot.val();
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').once('value').then(function (snapshot) {
                            var _room = (snapshot.val());

                            if (_room == "Audi2") {
                                if (audi2_CurrentSession == 1) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D01_A2S1').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }
                                else if (audi2_CurrentSession == 2) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D04_A2S2').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }
                                else if (audi2_CurrentSession == 3) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D07_A2S3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                        var scoreValue = (snapshot.val());
                                        scoreValue += 30;
                                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                    });
                                }
                                else if (audi2_CurrentSession == 4) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D10_A2S4').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi2_CurrentSession == 5) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D13_A2S5').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi2_CurrentSession == 6) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/D16_A2S6').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                            }
                        });
                        break;
                    }
                    case 'Auditorium3_SessionLive': {
                        audi3_CurrentSession = childSnapshot.val();
                        rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Z01_CurrentRoom').once('value').then(function (snapshot) {
                            var _room = (snapshot.val());

                            if (_room == "Audi3") {
                                if (audi3_CurrentSession == 1) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E01_A3S1').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y01_ScoreS1').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi3_CurrentSession == 2) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E04_A3S2').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y02_ScoreS2').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                                else if (audi3_CurrentSession == 3) {
                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/E07_A3S3').set("Y");

                                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').once('value').then(function (snapshot) {
                                        var scoreLine = (snapshot.val());
                                        if (scoreLine == "N") {
                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/Y03_ScoreS3').set("Y");

                                            rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').once('value').then(function (snapshot) {
                                                var scoreValue = (snapshot.val());
                                                scoreValue += 30;
                                                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/X01_PScore').set(scoreValue);

                                            });
                                        }

                                    });
                                }
                            }
                        });
                        break;
                    }

                }
            })
        })
    }


    //Rishabh End

    //Rishabh Start
    Analytics_CheckForMenuStateChange() {
        return;
        var self = this;
        if (window.lastMenu === 4) {
            self.setState({
                updateAnalyticsOnScreen: window.analytics_SessionRoom_ActiveUserCount
            });
        }
        else if (window.lastMenu === 6) {
            self.setState({
                updateAnalyticsOnScreen: window.analytics_Connect1Room_ActiveUserCount
            });
        }
        else if (window.lastMenu === 14) {
            self.setState({
                updateAnalyticsOnScreen: window.analytics_Connect2Room_ActiveUserCount
            });
        }
        else if (window.lastMenu === 15) {
            self.setState({
                updateAnalyticsOnScreen: window.analytics_Connect3Room_ActiveUserCount
            });
        }
        else {
            self.setState({
                updateAnalyticsOnScreen: window.analytics_liveUsers
            });
        }
    }

    user_ExistInTableCheck() {
        // this.user_ActiveStatus();
        return;
        let self = this
        var query = rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/B01_LogInTime');
        query.once("value").then(function (snapshot) {
            //if(snapshot.val() !== null){
            if (snapshot.exists()) {
                //user already exist in analytics table
                // console.log(snapshot.val());
                // console.log("Already Exist");
                // self.user_ActiveStatus();
                // self.Analytics_LiveUsersCountTracker();
            } else {
                // console.log(snapshot.val());
                //console.log("New Entry");
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    B01_LogInTime: rdatabasex.ServerValue.TIMESTAMP,
                    C01_A1S1: "N", C02_A1S1QA: "N", C03_A1S1P: "N", C04_A1S2: "N", C05_A1S2QA: "N", C06_A1S2P: "N",
                    C07_A1S3: "N", C08_A1S3QA: "N", C09_A1S3P: "N", C10_A1S4: "N", C11_A1S4QA: "N", C12_A1S4P: "N",
                    D01_A2S1: "N", D02_A2S1QA: "N", D03_A2S1P: "N", D04_A2S2: "N", D05_A2S2QA: "N", D06_A2S2P: "N",
                    D07_A2S3: "N", D08_A2S3QA: "N", D09_A2S31P: "N", D10_A2S4: "N", D11_A2S4QA: "N", D12_A2S4P: "N",
                    D13_A2S5: "N", D14_A2S5QA: "N", D15_A2S5P: "N", D16_A2S6: "N", D17_A2S6QA: "N", D18_A2S6P: "N",
                    E01_A3S1: "N", E02_A3S1QA: "N", E03_A3S1P: "N", E04_A3S2: "N", E05_A3S2QA: "N", E06_A3S2P: "N",
                    E07_A3S3: "N", E08_A3S3QA: "N", E09_A3S3P: "N",
                    F01_BO1: "N",
                    G01_BO2: "N",
                    G02_LG: "N",
                    G03_EH: "N",
                    G04_LY: "N",
                    H01_IR: "N", I01_PS: "N", I02_PS1: "N", I03_PS2: "N", I04_PS3: "N", I05_PS4: "N", I06_PS5: "N",
                    J01_PM: "N",
                    J02_FB: "N",
                    X01_PScore: 0,
                    Y01_ScoreS1: "N", Y02_ScoreS2: "N", Y03_ScoreS3: "N",
                    Z01_CurrentRoom: "none"
                });
                rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/B01_LogInTime').once('value').then(function (snapshot) {
                    var mDate = (snapshot.val());
                    var myDate = new Date(mDate);
                    myDate = myDate.getHours() + ":" + myDate.getMinutes() + "," + myDate.getDate() + "/" + (myDate.getMonth() + 1);
                    rdbx.ref('/user_analytics_wd/' + authx.currentUser.uid + '/B01_LogInTime').set(myDate.toString());
                });

                //Stall-1 [SANDISK]
                rdbx.ref('/user_analytics_wd_stall_1/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "1-SANDISK",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-2 [PORTABLE-SSD]
                rdbx.ref('/user_analytics_wd_stall_2/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "2-PORTABLE-SSD",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-3 [W-D]
                rdbx.ref('/user_analytics_wd_stall_3/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "3-W-D",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-4 [G-TECH]
                rdbx.ref('/user_analytics_wd_stall_4/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "4-G-TECH",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-5 [ENTERPRISE]
                rdbx.ref('/user_analytics_wd_stall_5/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "5-ENTERPRISE",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-6 [EMBEDDED]
                rdbx.ref('/user_analytics_wd_stall_6/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "6-EMBEDDED",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-7 [INTERNAL-SSD]
                rdbx.ref('/user_analytics_wd_stall_7/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "7-INTERNAL-SSD",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });
                //Stall-8 [SMART-VIDEO]
                rdbx.ref('/user_analytics_wd_stall_8/' + authx.currentUser.uid).set({
                    A01_Email: authx.currentUser.email,
                    A02_StallID: "8-SMART-VIDEO",
                    A03_Visited: "N", CH: "N", GA: "N", B1: "N", B2: "N", B3: "N", B4: "N", B5: "N", V1: "N", V2: "N", V3: "N",
                    V4: "N", V5: "N", S1: "N", S2: "N", S3: "N", S4: "N"
                });

            }
            self.user_ActiveStatus();
            self.Analytics_LiveUsersCountTracker();

        });
    }

    user_ActiveStatus() {

        // let self = this
        var uid = authx.currentUser.uid;

        var userStatusDatabaseRef = rdbx.ref('/user_analytics_wd/' + uid + '/Z02_State/');
        var userCurrentRoomRef = rdbx.ref('/user_analytics_wd/' + uid + '/Z01_CurrentRoom/')
        //console.log(userStatusDatabaseRef)

        var isOfflineForDatabase = {
            State: 'offline',
        };

        var isOnlineForDatabase = {
            State: 'online',
        };

        rdbx.ref('.info/connected').on('value', function (snapshot) {
            if (snapshot.val() == false) {
                return;
            };
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
        userCurrentRoomRef.onDisconnect().set("none");

        // self.Analytics_LiveUsersCountTracker();
    };

    resetValue=()=>{
         Lobby = 0;
     insideHall = 0;

     Gaming = 0;
     Client = 0;
     PortableSSDs = 0;
     Enterprise = 0;
     NVMeandSSD = 0;
     SmartVideo = 0;
     WesternDigitalReadforNAS = 0;
     Professional = 0;
     WorkOnTheGo = 0;
     WorkFromHome = 0;

     insideWorkshopLobby = 0;
     insideClientPlus = 0;
     insideConsumer = 0;
     insideGaming = 0;
     insideEnterprise = 0;

     insideAudi = 0;
     infodesk = 0;
     totalUser=0;
     gotoBreakeout=0;
     liveInBO1=0;
     liveInBO2=0;
     liveInBO3=0;
     liveInBO4=0;
     liveInBO5=0;
     liveInBO6=0;
     liveInBO7=0;
     liveInBO8=0;
     liveInBO9=0;
     liveInBO10=0;
     liveInBO11=0;
     liveInBO12=0;
     liveInBO13=0;
     liveInBO14=0;
     liveInBO15=0;
     liveInBO16=0;
     liveInBO17=0;
     liveInBO18=0;
    }

    startLiveAnalyticsCount=()=>{
       
        var calculateGameScores = rdbx.ref('/WD_USER_MY_CURRENT_STATUS/');

       /*  calculateGameScores.on("value", function (snapshot) {
            
        }) */


        var query = this.context.database.ref("WD_USER_MY_CURRENT_STATUS").orderByKey();
        
        

        var self=this;
        query.on("value", (snapshot) => {

            self.resetValue();
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();

                if (childData['state']) {
                    let state = childData['state'];
            
                    if (state != 'offline') {
                      totalUser++;
                      if (childData['location']) {
            
            
                        if (childData['location'] == "lobby") {
                          Lobby++;
                        }
            
                        if (childData['location'] == "insideHall") {
                          insideHall++;
                        }
            
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Gaming") {
                          Gaming++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Client+") {
                          Client++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Portable SSDs") {
                          PortableSSDs++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Enterprise") {
                          Enterprise++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "NVMe and SSD") {
                          NVMeandSSD++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "SmartVideo") {
                          SmartVideo++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Western Digital Read for NAS") {
                          WesternDigitalReadforNAS++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Professional") {
                          Professional++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Work On The Go") {
                          WorkOnTheGo++;
                        }
                        if (childData['location'] == "insideStall" && childData['stallName'] == "Work From Home") {
                          WorkFromHome++;
                        }
            
                        if (childData['location'] == "insideAudi") {
                          insideAudi++;
                        }
                        if (childData['location'] == "infodesk") {
                          infodesk++;
                        }
            
                        if (childData['location'] == "insideWorkshopLobby") {
                          insideWorkshopLobby++;
                        }
                        if (childData['location'] == "insideClientPlus") {
                          insideClientPlus++;
                        }
                        if (childData['location'] == "insideConsumer") {
                          insideConsumer++;
                        }
                        if (childData['location'] == "insideGaming") {
                          insideGaming++;
                        }
                        if (childData['location'] == "insideEnterprise") {
                          insideEnterprise++;
                        }
            
                        if (childData['location'] == "breakOutRoomHotsopt") {
                          gotoBreakeout++;
                        }
                        
            
            
            
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "1") {
                          liveInBO1++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "2") {
                          liveInBO2++;
                        } 
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "3") {
                          liveInBO13++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "4") {
                          liveInBO4++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "5") {
                          liveInBO5++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "6") {
                          liveInBO6++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "7") {
                          liveInBO7++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "8") {
                          liveInBO8++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "9") {
                          liveInBO9++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "10") {
                          liveInBO10++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "11") {
                          liveInBO11++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "12") {
                          liveInBO12++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "13") {
                          liveInBO13++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "14") {
                          liveInBO14++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "15") {
                          liveInBO15++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "16") {
                          liveInBO16++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "17") {
                          liveInBO17++;
                        }
                        if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "18") {
                          liveInBO18++;
                        }
            
                      }
                    }
                  }
    
            });

            
            self.setMyLiveCount();

        });
    };

    setMyLiveCount=()=>{


          if (this.state.whereIm == "lobby") {
            window.liveCountInMyRoom=Lobby;
          }

          if (this.state.whereIm== "insideHall") {
            window.liveCountInMyRoom= insideHall;
          }

          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Gaming") {
    
            window.liveCountInMyRoom= Gaming;
          }
          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Client+") {
           
            window.liveCountInMyRoom= Client;
          }
          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Portable SSDs") {
         
            window.liveCountInMyRoom= PortableSSDs;
          }

          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Enterprise") {
           
            window.liveCountInMyRoom= Enterprise;
          }
          if (this.state.whereIm == "insideStall" && this.state.myStallName == "NVMe and SSD") {

            window.liveCountInMyRoom= NVMeandSSD;
          }
          if (this.state.whereIm == "insideStall" &&this.state.myStallName == "SmartVideo") {
   
            window.liveCountInMyRoom= SmartVideo;
          }
          if (this.state.whereIm =="insideStall" && this.state.myStallName== "Western Digital Read for NAS") {
     
            window.liveCountInMyRoom= WesternDigitalReadforNAS;
          }
          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Professional") {
 
            window.liveCountInMyRoom= Professional;
          }
          if (this.state.whereIm == "insideStall" && this.state.myStallName == "Work On The Go") {
            window.liveCountInMyRoom= WorkOnTheGo;
          }

          if (this.state.whereIm == "insideStall" && this.state.myStallName== "Work From Home") {
            window.liveCountInMyRoom= WorkFromHome;
          } 

          if (this.state.whereIm== "insideAudi") {
            window.liveCountInMyRoom= insideAudi;
          }

          if (this.state.whereIm== "infodesk") {
            window.liveCountInMyRoom= infodesk;
          }

          if (this.state.whereIm== "insideWorkshopLobby") {
            window.liveCountInMyRoom= insideWorkshopLobby;
          }

          if (this.state.whereIm== "insideClientPlus") {
            window.liveCountInMyRoom= insideClientPlus;
          }

          if (this.state.whereIm== "insideConsumer") {
            window.liveCountInMyRoom= insideConsumer;
          }

          if (this.state.whereIm== "insideGaming") {
            window.liveCountInMyRoom= insideGaming;
          }
          if (this.state.whereIm== "insideEnterprise") {
            window.liveCountInMyRoom= insideEnterprise;
          }
          if (this.state.whereIm== "breakOutRoomHotsopt") {
            window.liveCountInMyRoom= gotoBreakeout;
          }
       
           
 
          



           if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "1") {
            window.liveCountInMyRoom= liveInBO1;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "2") {
            window.liveCountInMyRoom= liveInBO2;
          } 
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "3") {
            window.liveCountInMyRoom= liveInBO13;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "4") {
            window.liveCountInMyRoom= liveInBO4;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "5") {
            window.liveCountInMyRoom= liveInBO5;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "6") {
            window.liveCountInMyRoom=  liveInBO6;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "7") {
            window.liveCountInMyRoom= liveInBO7;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "8") {
            window.liveCountInMyRoom= liveInBO8;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "9") {
            window.liveCountInMyRoom= liveInBO9;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "10") {
            window.liveCountInMyRoom= liveInBO10;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "11") {
            window.liveCountInMyRoom= liveInBO11;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "12") {
            window.liveCountInMyRoom= liveInBO12;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "13") {
            window.liveCountInMyRoom= liveInBO13;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "14") {
            window.liveCountInMyRoom= liveInBO14;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "15") {
            window.liveCountInMyRoom= liveInBO15;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "16") {
            window.liveCountInMyRoom= liveInBO16;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "17") {
            window.liveCountInMyRoom= liveInBO17;
          }
          if (this.state.whereIm== "insideBreakout" && window.breakOutRoomID == "18") {
            window.liveCountInMyRoom=  liveInBO18;
          } 

    }

    Analytics_LiveUsersCountTracker() {
        return;
        //var user = this.context.database.ref("user_analytics");
        var query = this.context.database.ref("user_analytics_wd").orderByKey();
        query.on("value", (snapshot) => {
            // console.log(snapshot)

            window.analytics_liveUsers = 0;
            window.analytics_liveUsers_lobby = 0;
            window.analytics_liveUsers_lounge = 0;
            window.analytics_liveUsers_BO1 = 0;
            window.analytics_liveUsers_BO2 = 0;
            window.analytics_liveUsers_audi1 = 0;
            window.analytics_liveUsers_audi2 = 0;
            window.analytics_liveUsers_audi3 = 0;
            window.analytics_liveUsers_exhibits = 0;
            window.analytics_liveUsers_exhibitsStall1 = 0;
            window.analytics_liveUsers_exhibitsStall2 = 0;
            window.analytics_liveUsers_exhibitsStall3 = 0;
            window.analytics_liveUsers_exhibitsStall4 = 0;
            window.analytics_liveUsers_exhibitsStall5 = 0;
            window.analytics_liveUsers_exhibitsStall6 = 0;
            window.analytics_liveUsers_exhibitsStall7 = 0;
            window.analytics_liveUsers_exhibitsStall8 = 0;


            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.Z02_State && childData.Z02_State.State && childData.Z02_State.State == "online") {
                    window.analytics_liveUsers++;
                }

                if (childData.Z01_CurrentRoom == "Lobby") {
                    window.analytics_liveUsers_lobby++;
                }
                else if (childData.Z01_CurrentRoom == "Lounge") {
                    window.analytics_liveUsers_lounge++;
                }
                else if (childData.Z01_CurrentRoom == "BO1") {
                    window.analytics_liveUsers_BO1++;
                }
                else if (childData.Z01_CurrentRoom == "BO2") {
                    window.analytics_liveUsers_BO2++;
                }
                else if (childData.Z01_CurrentRoom == "Audi1") {
                    window.analytics_liveUsers_audi1++;
                }
                else if (childData.Z01_CurrentRoom == "Audi2") {
                    window.analytics_liveUsers_audi2++;
                }
                else if (childData.Z01_CurrentRoom == "Audi3") {
                    window.analytics_liveUsers_audi3++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall1") {
                    window.analytics_liveUsers_exhibitsStall1++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall2") {
                    window.analytics_liveUsers_exhibitsStall2++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall3") {
                    window.analytics_liveUsers_exhibitsStall3++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall4") {
                    window.analytics_liveUsers_exhibitsStall4++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall5") {
                    window.analytics_liveUsers_exhibitsStall5++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall6") {
                    window.analytics_liveUsers_exhibitsStall6++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall7") {
                    window.analytics_liveUsers_exhibitsStall7++;
                }
                else if (childData.Z01_CurrentRoom == "ExhibitsStall8") {
                    window.analytics_liveUsers_exhibitsStall8++;
                }

                if (childData.Z01_CurrentRoom == "Exhibits" || childData.Z01_CurrentRoom == "ExhibitsStall1" || childData.Z01_CurrentRoom == "ExhibitsStall2" ||
                    childData.Z01_CurrentRoom == "ExhibitsStall3" || childData.Z01_CurrentRoom == "ExhibitsStall4" || childData.Z01_CurrentRoom == "ExhibitsStall5" ||
                    childData.Z01_CurrentRoom == "ExhibitsStall6" || childData.Z01_CurrentRoom == "ExhibitsStall7" || childData.Z01_CurrentRoom == "ExhibitsStall8") {
                    window.analytics_liveUsers_exhibits++;
                }
            })

            // console.log(window.analytics_liveUsers_lobby+" / "+window.analytics_liveUsers_lounge+" / "+window.analytics_liveUsers_BO1
            // +" / "+window.analytics_liveUsers_BO2+" / "+window.analytics_liveUsers_audi1+" / "+window.analytics_liveUsers_audi2+" / "+window.analytics_liveUsers_audi3
            // +" / "+window.analytics_liveUsers_exhibits);
        })
    }
    //Rishabh End
    //Rishabh End



    //#region  video call 
    handleCall = room => {
        /* 
        this.setState({ room: room })
        let roomDetails = room;
        if (roomDetails.endDateTime >= Date.now()) {
            if (roomDetails.startDateTime <= Date.now()) {
                this.showNotification({ line1: "Your call has already started", line2: "", timeout: 10000 });
                this.updateJoinCallMenu();
                let watcher = setInterval(this.endCallWatcher, 1000);
                this.setState({ callWatcher: watcher })

            } else {
                //console.log("Scheduling startCallWatcher");
                let watcher = setInterval(this.startCallWatcher, 1000);
                this.setState({ callWatcher: watcher })
            }
        } */
    }

    startCallWatcher() {

        /* if (this.state.user) {
            let roomDetails = this.state.room;
            if (roomDetails.startDateTime <= (Date.now() + 60000)) {
                clearInterval(this.state.callWatcher);
                this.setState({ callWatcher: null });

                this.showNotification({ line1: "Your call is about to start", line2: "in a minute", timeout: 40000 });
                setTimeout(this.updateJoinCallMenu, 59000);

                let watcher = setInterval(this.endCallWatcher, 1000);
                this.setState({ callWatcher: watcher })
            }
        } */
    }

    endCallWatcher() {
        /* if (this.state.user) {
            let roomDetails = this.state.room;
            if (roomDetails.endDateTime <= (Date.now() + 60000)) {
                clearInterval(this.state.callWatcher);
                this.setState({ callWatcher: null });

                this.showNotification({ line1: "Your call is about to end", line2: "in a minute", timeout: 40000 });
                setTimeout(this.removeJoinCallMenu, 59000);
            }
        } */
    }

    updateJoinCallMenu() {
        /*  this.setState({ callMenuActive: true });
         let menuItems = this.state.menuItems;
         //true
         menuItems[4].enabled = true;
         LD1QP[5].enabled = true;
         LD2QP[5].enabled = true;
         LD3QP[5].enabled = true;
         InfoDeskMenu[3].enabled = true;
 
         this.setState({ menuItems: menuItems }); */

    }

    removeJoinCallMenu() {
        /* this.setState({ callMenuActive: false });
        let menuItems = this.state.menuItems;
        //false
        menuItems[4].enabled = false;

        LD1QP[5].enabled = false;
        LD2QP[5].enabled = false;
        LD3QP[5].enabled = false;
        InfoDeskMenu[3].enabled = false;


        this.setState({ menuItems: menuItems });
        if (this.videoCall.current) {
            this.videoCall.current.leaveRoom();
        } */
    }


    setUserOffline(user) {
        const uid = user.uid;
        const userStatusDatabaseRef = this.context.database.ref('/UserOnlineAdmin/' + uid);
        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: this.context.app.database.ServerValue.TIMESTAMP,
        };

        this.context.database.ref('.info/connected').on('value', function (snapshot) {
            if (snapshot.val() == false) {
                return;
            };
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
            });
        });
    }

    onlineUserStatus(user, bool) {
        const uid = user.uid;
        const userStatusDatabaseRef = this.context.database.ref('/UserOnlineAdmin/' + uid);
        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: this.context.app.database.ServerValue.TIMESTAMP,
        };
        const isOnlineForDatabase = {
            state: 'online',
            last_changed: this.context.app.database.ServerValue.TIMESTAMP,
        };

        if (bool == true) {
            userStatusDatabaseRef.set(isOnlineForDatabase);
        } else {
            userStatusDatabaseRef.set(isOfflineForDatabase);
        }

    }

    UserOnlineTest = (uid) => {
        var users = this.context.database.ref().child('UserOnlineAdmin').child(uid);
        var query = users.orderByChild('state');
        query.once("value", snapshot => {
            if (snapshot.exists()) {
                // console.log("old user");
                const userData = snapshot.val();
                console.log("status:", userData.state);

                if (userData.state === "online") {
                    console.log("User is Online");


                } else {
                    console.log("User is offline");
                }
            } else {
                console.log("first time user");
            }
        });
    }

    setRoomName = (roomID, roomName) => {
        let roomData = {
            roomId: roomID,
            roomName: roomName
        }
        this.state.room = roomData;
        this.setState({ room: roomData });
    }

    joinCall(roomid) {

        var repUid = "";
        console.log(this.state.twilioAdmins);

        if (roomid == "Enterprise") {

            this.setRoomName('Enterprise', 'Enterprise');
            repUid = this.state.twilioAdmins[0];
        }
        else if (roomid == "Gaming") {
            this.setRoomName('Gaming', 'Gaming');
            repUid = this.state.twilioAdmins[1] || "1QNLckNXkbdS8OEiRoCFAsitapE3";
        }
        else if (roomid == "Client") {
            this.setRoomName('Client', 'Client+');
            repUid = this.state.twilioAdmins[2] || "oq5rdIGqu0P4dSL9Ntd1AWtZ1Ah2";
        }
        else if (roomid == "PortableSSDs") {
            this.setRoomName('PortableSSDs', 'Portable SSDs');
            repUid = this.state.twilioAdmins[3] || "UFX1mNT2vzZiS7qBgjLfwXZhga43";
        }
        else if (roomid == "WesternDigitalReadForNAS") {
            this.setRoomName('WesternDigitalReadForNAS', 'Western Digital Red For NAS');
            repUid = this.state.twilioAdmins[4] || "VMt4JjvQdpYsF6BI76sb8YcYCt33";
        }
        else if (roomid == "SmartVideoStorageSolution") {
            this.setRoomName('SmartVideoStorageSolution', 'Smart Video Storage Solution');
            repUid = this.state.twilioAdmins[5] || "dURYMOt3EudOaAu99Ga7tNYCQ8q1";
        }
        else if (roomid == "NVMeAndSSD") {
            this.setRoomName('NVMeAndSSD', 'NVMe & SSD');
            repUid = this.state.twilioAdmins[6] || "Uz2Yvolq25X6eYjfQVDV52aEBtP2";
        }
        else if (roomid == "Professional") {
            this.setRoomName('Professional', 'Professional');
            repUid = this.state.twilioAdmins[7] || "9Bzo6dTKSrhyaZfkhMIEZBIixwG3";
        }
        else if (roomid == "WorkOnTheGo") {
            this.setRoomName('WorkOnTheGo', 'Work On The Go');
            repUid = this.state.twilioAdmins[8] || "1GizXG6lqwf5A2Ixss94ZoTdUAd2";
        }
        else if (roomid == "WorkFromHome") {
            this.setRoomName('WorkFromHome', 'Work From Home');
            repUid = this.state.twilioAdmins[9] || "znrN7VVfPvffSfYF72wnYDbz3ns2";
        }

        let self = this;
        //window.canvasManager.PauseAudio();
        console.log("User: ", self.state.user.displayName);

        //if (!adminArray.includes(self.state.user.uid))
        if (repUid != self.state.user.uid) {

            var users = this.context.database.ref().child('UserOnlineAdmin').child(repUid);
            var query = users.orderByChild('state');
            query.once("value", snapshot => {

                if (snapshot.exists()) {
                    // console.log("old user");
                    const userData = snapshot.val();
                    console.log("status:", userData.state);

                    if (userData.state === "online") {

                        console.log("User is Online");

                        self.context.db.collection("iesacallroom").doc(self.state.user.email).update({
                            roomId: self.state.room.roomId,
                            roomName: self.state.room.roomName
                        }).then(function () {
                            console.log("Document successfully updated!");

                            self.context.db.collection('iesacallroom')
                                .doc(self.state.user.email).get().then(function (doc) {
                                    const data = doc.data()
                                    data.startDateTime = Date.parse(data.startDateTime);
                                    data.endDateTime = Date.parse(data.endDateTime);
                                    self.handleCall(data);

                                }).catch(function (error) {
                                    //console.log("Error getting cached document:", error);
                                });

                            setTimeout(function () {
                                console.log("Updated: XXX");
                                self.setState({ showVideoCall: true,isHeAdmin:false });
                                self.saveEnterVideoChatUserData();

                            }, 1000);

                        });


                    } else {
                        this.showInfoPopUp("Hi! Our Western Digital representative is offline at the moment. Please check back later. You may also post your question in the ‘Ask us’ hotspot and we will respond to you via email.")
                        // alert("Our Representative is offline, Please check back later");
                    }
                } else {
                    console.log("first time user");
                    this.showInfoPopUp("Hi! Our Western Digital representative is offline at the moment. Please check back later. You may also post your question in the ‘Ask us’ hotspot and we will respond to you via email.")

                    // alert("Our Representative is offline, Please check back later");
                }
            });

        } else {
            console.log("Call Disconnect");
            self.onlineUserStatus(self.state.user, true);
            self.setState({ showVideoCall: true,isHeAdmin:true });
            self.saveEnterVideoChatUserData();
        }

        /*    self.context.db.collection('VideoCallAdmin').doc('Admin').get().then(doc => {
               const docData = doc.data();
               let adminArray = docData.uid;
               
           }).catch(function (error) {
               console.log(error);
           }); */
    }

    saveEnterVideoChatUserData=()=>{

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

        let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + this.state.myStallName + '/');
        var path = this.getStallRefPath(window.myTimeStatus.stallID);

         window.videoCallStartTime = moment();
        //Update
        path.child('VideoChat').child('Entering').push().set({
            startTime: date,
            lastUpdate: moment().format(),
        });

        toDay.child('VideoChat').update({
            enter: true,
            lastEnterTime: date,
            lastUpdate: moment().format(),
        });

    }
 

    saveExitVideoChatUserData=()=>{

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

        let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + this.state.myStallName + '/VideoChat/');
        var path = this.getStallRefPath(window.myTimeStatus.stallID);

        var now = moment();
        var then = window.videoCallStartTime ;
        let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
        let totalSpend = diffrent;
        window.videoCallStartTime=0;
       
        path.child('VideoChat').child('Exiting').push().set({
            endTime: date,
            spend: totalSpend,
            lastUpdate: moment().format(),
        });

        let self =this;
        toDay.once('value').then(function (snapshot) {
            var values = snapshot.val();
            let saveTime = totalSpend;
            if (values) {
                if (values['totalTime']) {
                    saveTime = self.addTimes(values['totalTime'], totalSpend);
                }
            }
            toDay.update({
                totalTime: saveTime
            });
 
            path.child('VideoChat').update({
                TotalSpendTime: saveTime
            });
        });

    }



    onCallDisconnect() {
        this.setState({ showVideoCall: false });
        //window.canvasManager.ResumeAudio();

        let self = this;
        this.saveExitVideoChatUserData();
        self.context.db.collection('VideoCallAdmin').doc('Admin').get().then(doc => {
            const docData = doc.data();
            let adminArray = docData.uid;

            if (adminArray.includes(self.state.user.uid)) {

                self.onlineUserStatus(self.state.user, false);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    


    // joinCall() {

    //     console.log(this.state.user.email);
    //     this.setState({ showVideoCall: true });
    //     //window.canvasManager.PauseAudio();
    //     // console.log("999999999");
    // }

    // onCallDisconnect() {
    //     this.setState({ showVideoCall: false });
    //     //window.canvasManager.ResumeAudio();
    // }
    //#endregion

    //#region PlayCanvas Functions
    callReactConnectorFunction(menuItem) {
        if (menuItem.method !== undefined) {
            window.canvasManager[menuItem.method](menuItem);
        }
    }
    //#endregion

    changeMyState = (newState) => {
        this.myLastState = this.myCurrentState;
        this.setState({ myCurrentState: newState });
    }


    //PPJ
    //ANALITICS
    Analytics_For_Leaderboard_Data = () => {

        //    whereIm: 'lobby',
        //     myStallName:'',
        //   whereImForLeaderboard:'',
        //    whereImInStallForLeaderboard:'',

        switch (this.state.whereIm) {
            case 'lobby': {

                if (this.state.whereImForLeaderboard != this.state.whereIm) {
                    //Entering

                }
                break;
            }
        }


    }

    updateMyGameScore = () => {

        const user = this.state.user;
        const name = user.displayName;
        const email = user.email;
        let self = this;
        var calculateGameScores = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');
        calculateGameScores.on("value", function (snapshot) {
            console.log(snapshot.val());
            let allData = snapshot.val();

            let MyTotalScore = 0;
            if (allData) {
                if (allData['InfinityRunner']) {
                    MyTotalScore = MyTotalScore + 20;
                }

                if (allData['PDF']) {
                    let count = Object.keys(allData['PDF']).length;
                    if (count > 5) {
                        count = 5;
                    }
                    MyTotalScore = MyTotalScore + (count * 10);
                }

                if (allData['QuizGame']) {
                    let count = Object.keys(allData['QuizGame']).length;
                    if (count > 9) {
                        count = 9;
                    }
                    MyTotalScore = MyTotalScore + (count * 20);
                }

                if (allData['Video']) {
                    let count = Object.keys(allData['Video']).length;
                    if (count > 30) {
                        count = 30;
                    }
                    MyTotalScore = MyTotalScore + (count * 10);
                }

                if (allData['stallVisit']) {
                    let count = Object.keys(allData['stallVisit']).length;
                    if (count > 10) {
                        count = 10;
                    }
                    MyTotalScore = MyTotalScore + (count * 10);
                }

                if (allData['Hall']) {
                    MyTotalScore = MyTotalScore + 10;
                }



                if (allData['meetTheTeam']) {
                    let count = Object.keys(allData['meetTheTeam']).length;
                    /*  if(count>10)
                     {
                         count=10;
                     } */
                    MyTotalScore = MyTotalScore + (count * 30);
                }

                if (allData['KeynoteSessionAskQuestion']) {
                    let count = Object.keys(allData['KeynoteSessionAskQuestion']).length;
                    if (count > 3) {
                        count = 3;
                    }
                    MyTotalScore = MyTotalScore + (count * 20);
                }




                if (true) {
                    let count = 0;
                    if (allData['WorkshopConsumerAskQuestion']) {
                        // count += Object.keys(allData['WorkshopConsumerAskQuestion']).length;
                        count++;
                    }

                    if (allData['WorkshopEnterpriseAskQuestion']) {
                        //  count += Object.keys(allData['WorkshopEnterpriseAskQuestion']).length;
                        count++;
                    }

                    if (allData['WorkshopGamingAskQuestion']) {
                        //count += Object.keys(allData['WorkshopGamingAskQuestion']).length;
                        count++;
                    }

                    if (allData['WorkshopClient+AskQuestion']) {
                        // count += Object.keys(allData['WorkshopClient+AskQuestion']).length;
                        count++;
                    }

                    if (count > 4) {
                        count = 4;
                    }
                    MyTotalScore = MyTotalScore + (count * 20);
                }

                //Keynote
                if (allData['KeynoteSession'] && allData['TotalTimeSpendInKeynote']) {
                    let totalTime = allData['TotalTimeSpendInKeynote'];

                    let min = totalTime.split(":")[1]

                    let sessionNo = 0;
                    if (allData['session1']) {
                        sessionNo++;
                    }
                    if (allData['session2']) {
                        sessionNo++;
                    }
                    if (allData['session3']) {
                        sessionNo++;
                    }
                    if (allData['session4']) {
                        sessionNo++;
                    }
                    if (allData['session5']) {
                        sessionNo++;
                    }
                    if (allData['session6']) {
                        sessionNo++;
                    }
                    if (allData['session7']) {
                        sessionNo++;
                    }
                    if (allData['session8']) {
                        sessionNo++;
                    }

                    let score = 0;

                    if (min < 5) {
                        score = 5;
                    } else if (min < 10) {
                        score = 10;
                    } else if (min < 15) {
                        score = 20;
                    } else {
                        score = 30;
                    }


                    MyTotalScore = MyTotalScore + (sessionNo * score);
                }

                if (true) {
                    let myTime = 0;
                    let count = 0;

                    if (allData['WorkshopGaming-TotalTime']) {
                        // count += Object.keys(allData['WorkshopClient+']).length;
                        myTime = self.addTimes(myTime, allData['WorkshopGaming-TotalTime']);
                        count++;
                    }
                    if (allData['WorkshopClient+-TotalTime']) {
                        // count += Object.keys(allData['WorkshopClient+']).length;
                        myTime = self.addTimes(myTime, allData['WorkshopClient+-TotalTime']);
                        count++;
                    }
                    if (allData['WorkshopEnterprise-TotalTime']) {
                        // count += Object.keys(allData['WorkshopClient+']).length;
                        myTime = self.addTimes(myTime, allData['WorkshopEnterprise-TotalTime']);
                        count++;
                    }
                    if (allData['WorkshopConsumer-TotalTime']) {
                        // count += Object.keys(allData['WorkshopClient+']).length;
                        myTime = self.addTimes(myTime, allData['WorkshopConsumer-TotalTime']);
                        count++;
                    }
                    let score = 0;
                    if (myTime < 5) {
                        score = 20;
                    } else if (myTime < 10) {
                        score = 30;
                    } else if (myTime < 15) {
                        score = 40;
                    } else {
                        score = 50;
                    }
                    MyTotalScore = MyTotalScore + (count * score);
                }

                console.log(MyTotalScore);
                //save
                const save = rdbx.ref('/UserLeaderboardScorebord/' + user.uid);
                save.update({
                    name: name,
                    email: email,
                    score: MyTotalScore,
                    uid: user.uid,
                });
            }

        });
    }


    initializeRealtimeDatabaseContent = () => {
        const user = this.state.user;
        const name = user.displayName;
        const email = user.email;

        const a = rdbx.ref('/user_analytics_wd_Client+/' + user.uid);
        const b = rdbx.ref('/user_analytics_wd_Enterprise/' + user.uid);
        const c = rdbx.ref('/user_analytics_wd_NVMe and SSD/' + user.uid);
        const d = rdbx.ref('/user_analytics_wd_Portable SSDs/' + user.uid);
        const e = rdbx.ref('/user_analytics_wd_Professional/' + user.uid);
        const f = rdbx.ref('/user_analytics_wd_SmartVideo/' + user.uid);
        const g = rdbx.ref('/user_analytics_wd_Western Digital Read for NAS/' + user.uid);
        const h = rdbx.ref('/user_analytics_wd_Work From Home/' + user.uid);
        const i = rdbx.ref('/user_analytics_wd_Work On The Go/' + user.uid);
        const j = rdbx.ref('/user_analytics_wd_Gaming/' + user.uid);

        const k = rdbx.ref('/user_analytics_wd_KeynoteSession/' + user.uid);
        const l = rdbx.ref('/user_analytics_wd_WorkshopClient+/' + user.uid);
        const m = rdbx.ref('/user_analytics_wd_WorkshopGaming/' + user.uid);
        const n = rdbx.ref('/user_analytics_wd_WorkshopEnterprise/' + user.uid);
        const o = rdbx.ref('/user_analytics_wd_WorkshopConsumer/' + user.uid);
        const p = rdbx.ref('/LeaderBoardUserData/' + user.uid);

        const q = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid);
        const r = rdbx.ref('/WD_USER_MY_CURRENT_STATUS/' + user.uid);
        const s = rdbx.ref('/user_analytics_wd_breakoutRoomMeeting/' + user.uid);

        a.update({
            name: name,
            email: email
        });
        b.update({
            name: name,
            email: email
        });
        c.update({
            name: name,
            email: email
        });
        d.update({
            name: name,
            email: email
        });
        e.update({
            name: name,
            email: email
        });
        f.update({
            name: name,
            email: email
        });
        g.update({
            name: name,
            email: email
        });
        h.update({
            name: name,
            email: email
        });
        i.update({
            name: name,
            email: email
        });
        j.update({
            name: name,
            email: email
        });
        k.update({
            name: name,
            email: email
        });
        l.update({
            name: name,
            email: email
        });
        m.update({
            name: name,
            email: email
        });
        n.update({
            name: name,
            email: email
        });
        o.update({
            name: name,
            email: email
        });
        p.update({
            name: name,
            email: email
        });
        q.update({
            name: name,
            email: email
        });
        r.update({
            name: name,
            email: email
        });

        s.update({
            name: name,
            email: email
        });

        //saveLiveDataToLeaderboardDay= rdbx.ref('/LeaderBoardUserData/' + userid + '/' + GetDate() + '/' +stallName + '/');
        //saveLiveDataToLeaderboard = rdbx.ref('/LeaderBoardUserData/' + userid + '/allData/' + actionName + '/');

    }

    updateUserCurrentStatus = () => {
        const user = this.state.user;
        const where = this.state.whereIm;
        const whereStall = this.state.myStallName;
        const r = rdbx.ref('/WD_USER_MY_CURRENT_STATUS/' + user.uid);
        var breakOutRoomID = window.breakOutRoomID;
        if (where != "insideBreakout") {
            breakOutRoomID = 0;
        }
        r.update({
            location: where,
            stallName: whereStall,
            brakOutRoom: breakOutRoomID,
            lastUpdate: moment().format(),
        });
    }

    GetDate = () => {
        var d = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
            "November", "December"
        ];
        let Today = d.getDate() + "-" + days[d.getDay()] + "-" + months[d.getMonth()] + "-2020";
        return Today;
    }


    getStallRefPath = (stallID) => {
        const user = this.state.user;
        let path = '';
        switch (stallID) {
            case 0: {//Gaming
                this.state.myStallName = 'Gaming';
                path = rdbx.ref('/user_analytics_wd_Gaming/' + user.uid);
                break;
            }
            case 1: {//CLIENT+
                this.state.myStallName = 'Client+';
                path = rdbx.ref('/user_analytics_wd_Client+/' + user.uid);
                break;
            }
            case 2: {//Portable SSDs
                this.state.myStallName = 'Portable SSDs';
                path = rdbx.ref('/user_analytics_wd_Portable SSDs/' + user.uid);
                break;
            }
            case 3: {//Western Digital Read for NAS
                this.state.myStallName = 'Western Digital Read for NAS';
                path = rdbx.ref('/user_analytics_wd_Western Digital Read for NAS/' + user.uid);
                break;
            }
            case 4: {//ENTERPRISE
                this.state.myStallName = 'Enterprise';
                path = rdbx.ref('/user_analytics_wd_Enterprise/' + user.uid);
                break;
            }
            case 5: {//Smart Video Storage Solution
                this.state.myStallName = 'SmartVideo';
                path = rdbx.ref('/user_analytics_wd_SmartVideo/' + user.uid);
                break;
            }
            case 6: {//NVMe & SSD
                this.state.myStallName = 'NVMe and SSD';
                path = rdbx.ref('/user_analytics_wd_NVMe and SSD/' + user.uid);
                break;
            }
            case 7: {//Professional

                this.state.myStallName = 'Professional';
                path = rdbx.ref('/user_analytics_wd_Professional/' + user.uid);
                break;
            }
            case 8: {//Work On The Go
                this.state.myStallName = 'Work On The Go';
                path = rdbx.ref('/user_analytics_wd_Work On The Go/' + user.uid);
                break;
            }
            case 9: {//Work From Home
                this.state.myStallName = 'Work From Home';
                path = rdbx.ref('/user_analytics_wd_Work From Home/' + user.uid);
                break;
            }
        }

        return path;
    }

    keynoteSessionChangeActions = () => {
        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let self = this;
        if (this.state.whereIm === "insideAudi" || this.state.whereIm === "goingToAudi") {
            //Update Today
            if (window.myTimeStatus.other == this.state.keynoteSessionID)
                return;

            let myLocationWas = window.myTimeStatus.location;

            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;

            let oldUserTime = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/" + window.myTimeStatus.other);

            //Old Entry Exit 
            let sessionPath = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/" + window.myTimeStatus.other);
            let watchList = rdbx.ref('/user_analytics_wd_KeynoteSession/' + user.uid);
            sessionPath.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });
            watchList.child(window.myTimeStatus.other + '/Exiting/').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            //Save Total time
            oldUserTime.once('value').then(function (snapshot) {
                var values = snapshot.val();
                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }
                oldUserTime.update({
                    totalTime: saveTime
                });

                sessionPath.update({
                    TotalSpendTime: saveTime
                });
                watchList.update({
                    TotalSpendTime: saveTime
                });
            });

            //New Entry
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");
            toDay.child(this.state.keynoteSessionID).update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });
            //New Entry
            let sessionPathNew = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/" + this.state.keynoteSessionID);
            sessionPathNew.child(this.state.keynoteSessionID).child('Entering').push().set({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });

            watchList.child(this.state.keynoteSessionID).child('Entering').push().set({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });

            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');
            toAll.update({
                [this.state.keynoteSessionID]: true,
            });

            window.myTimeStatus.other = this.state.keynoteSessionID;

        }
    }

    //Calling from Playcanvas inside stall
    reachedInsideStall = (stallID) => {
       
        const user = this.state.user;
        var path = this.getStallRefPath(stallID);
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + this.state.myStallName + '/');
        let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/stallVisit/');

        window.myTimeStatus = {
            location: this.state.myStallName,
            visitStart: moment(),
            visitEnd: 0,
            other: 'InsideStall',
            stallID: stallID,
        };
        //Update
        path.child('Entering').push().set({
            startTime: date,
            lastUpdate: moment().format(),
        });

        toDay.update({
            enter: true,
            lastEnterTime: date,
            lastUpdate: moment().format(),
        });
        toAll.update({
            [this.state.myStallName]: true,
        });
    }

    goingOutSideFromStall = (stallID, totalSpend) => {
        const user = this.state.user;
        var path = this.getStallRefPath(stallID);
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + this.state.myStallName + '/');

        window.myTimeStatus = {
            location: '',
            visitStart: '',
            visitEnd: 0,
            other: '',
            stallID: '',
        };

        //Update
        path.child('Exiting').push().set({
            endTime: date,
            spend: totalSpend,
            lastUpdate: moment().format(),
        });

        let self = this;
        toDay.once('value').then(function (snapshot) {
            var values = snapshot.val();
            let saveTime = totalSpend;
            if (values) {
                if (values['totalTime']) {
                    saveTime = self.addTimes(values['totalTime'], totalSpend);
                }
            }
            toDay.update({
                totalTime: saveTime
            });
            path.update({
                TotalSpendTime: saveTime
            });
        });

    }

    reachedLobbySave = () => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let self = this;

        if (window.myTimeStatus.location == '') {
            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/lobby/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/lobby/');
            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');

            window.myTimeStatus = {
                location: 'lobby',
                visitStart: moment(),
                visitEnd: 0,
                other: '',
                stallID: '',
            };
            //Update
            path.child('Entering').push().set({
                startTime: date,
                lastUpdate: moment().format(),
            });
            toDay.update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });
            toAll.update({
                ['lobby']: true,
            });

        } else {

            let myLocationWas = window.myTimeStatus.location;
            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");
            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;
            let self = this;

            if (myLocationWas == 'KeynoteSession') {
                let sessionPath = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/" + this.state.keynoteSessionID);

                let watchList = rdbx.ref('/user_analytics_wd_KeynoteSession/' + user.uid);

                sessionPath.child('Exiting').push().set({
                    endTime: date,
                    spend: totalSpend,
                    lastUpdate: moment().format(),
                });

                watchList.child(this.state.keynoteSessionID + '/Exiting/').push().set({
                    endTime: date,
                    spend: totalSpend,
                    lastUpdate: moment().format(),
                });

                let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');

                let oldUserTime = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/" + window.myTimeStatus.other);
                //Save Total time
                oldUserTime.once('value').then(function (snapshot) {
                    var values = snapshot.val();
                    let saveTime = totalSpend;
                    if (values) {
                        if (values['totalTime']) {
                            saveTime = self.addTimes(values['totalTime'], totalSpend);
                        }
                    }
                    oldUserTime.update({
                        totalTime: saveTime
                    });

                    sessionPath.update({
                        TotalSpendTime: saveTime
                    });

                    watchList.update({
                        TotalSpendTime: saveTime
                    });

                    toAll.update({
                        TotalTimeSpendInKeynote: saveTime
                    });

                });
                window.myTimeStatus.other = this.state.keynoteSessionID;
            }

            window.myTimeStatus = {
                location: '',
                visitStart: '',
                visitEnd: 0,
                other: '',
                stallID: '',
            };


            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });


            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();
                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }

                toDay.update({
                    totalTime: saveTime
                });
                path.update({
                    TotalSpendTime: saveTime
                });

            });

            this.reachedLobbySave();
        }
    }

    goingOutFromLobby = (myState) => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

        if (window.myTimeStatus.location == 'lobby') {
            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/lobby/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/lobby/');

            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;


            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            let self = this;
            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();

                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }
                toDay.update({
                    totalTime: saveTime
                });
                path.update({
                    TotalSpendTime: saveTime
                });
            });

            window.myTimeStatus = {
                location: '',
                visitStart: '',
                visitEnd: 0,
                other: '',
                stallID: '',
            };
            this.goingOutFromLobby(myState);
        } else {

            let myLocationWas = myState;
            if (window.myTimeStatus.location == myState) {
                return;
            }
            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");
            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');
            let watchList = rdbx.ref('/user_analytics_wd_KeynoteSession/' + user.uid);

            if ((this.state.whereIm == "insideAudi" || this.state.whereIm == "goingToAudi") && myLocationWas == 'KeynoteSession') {
                let sessionPath = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/" + this.state.keynoteSessionID);

                sessionPath.child('Entering').push().set({
                    startTime: date,
                    lastUpdate: moment().format(),
                });

                watchList.child(this.state.keynoteSessionID + '/Entering/').push().set({
                    startTime: date,
                    lastUpdate: moment().format(),
                });
            }

            window.myTimeStatus = {
                location: myState,
                visitStart: moment(),
                visitEnd: 0,
                other: (myLocationWas == 'KeynoteSession') ? this.state.keynoteSessionID : '',
                stallID: '',
            };

            path.child('Entering').push().set({
                startTime: date,
                lastUpdate: moment().format(),
            });

            toDay.update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });

            if (myLocationWas == 'KeynoteSession') {
                toDay.child(this.state.keynoteSessionID).update({
                    enter: true,
                    lastEnterTime: date,
                    lastUpdate: moment().format(),
                });
            }


            toAll.update({
                [myLocationWas]: true,
            });
            toAll.update({
                [this.state.keynoteSessionID]: true,
            });

        }
    }


    workshopVisitData = (workshopID) => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let myLocationWas = window.myTimeStatus.location;

        if (window.myTimeStatus.location == 'Workshop') {

            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");

            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;

            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            let self = this;
            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();
                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }

                toDay.update({
                    totalTime: saveTime
                });
                path.update({
                    TotalSpendTime: saveTime
                });
            });

            window.myTimeStatus = {
                location: '',
                visitStart: '',
                visitEnd: 0,
                other: '',
                stallID: '',
            };

            this.workshopVisitData(workshopID);

        } else {

            myLocationWas = workshopID;

            if (window.myTimeStatus.location == workshopID) {
                return;
            }

            let path = rdbx.ref('/user_analytics_wd_' + myLocationWas + '/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");
            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');

            window.myTimeStatus = {
                location: workshopID,
                visitStart: moment(),
                visitEnd: 0,
                other: '',
                stallID: '',
            };

            path.child('Entering').push().set({
                startTime: date,
                lastUpdate: moment().format(),
            });

            toDay.update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });
            toAll.update({
                [myLocationWas]: true,
            });
        }
    }

    workshopVisitExitData = () => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let myLocationWas = window.myTimeStatus.location;

        if (window.myTimeStatus.location == 'Workshop') {

            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");
            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');

            window.myTimeStatus = {
                location: 'Workshop',
                visitStart: moment(),
                visitEnd: 0,
                other: '',
                stallID: '',
            };

            path.child('Entering').push().set({
                startTime: date,
                lastUpdate: moment().format(),
            });

            toDay.update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });
            toAll.update({
                [myLocationWas]: true,
            });

        } else {


            let path = rdbx.ref('/user_analytics_wd_' + myLocationWas + '/' + user.uid + "/" + myLocationWas + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/' + myLocationWas + "/");

            let toAll = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/allData/');


            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;

            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            let self = this;
            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();
                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }
                toDay.update({
                    totalTime: saveTime
                });

                toAll.update({
                    [myLocationWas + '-TotalTime']: saveTime
                });

                path.update({
                    TotalSpendTime: saveTime
                });

            });

            window.myTimeStatus = {
                location: 'Workshop',
                visitStart: 0,
                visitEnd: 0,
                other: '',
                stallID: '',
            };
            this.workshopVisitExitData();
        }
    }


    breakoutRoomEntry = (myState) => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        let myLocationWas = window.myTimeStatus.location;

        if (window.myTimeStatus.location == 'lobby') {

            let path = rdbx.ref('/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/lobby/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/lobby/');

            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;


            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            let self = this;
            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();

                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }
                toDay.update({
                    totalTime: saveTime
                });
                path.update({
                    TotalSpendTime: saveTime
                });
            });

            window.myTimeStatus = {
                location: '',
                visitStart: '',
                visitEnd: 0,
                other: '',
                stallID: '',
            };
            this.goingOutFromLobby(myState);

        } else {


            if (window.myTimeStatus.location == myState) {
                return;
            }

            let path = rdbx.ref('/user_analytics_wd_breakoutRoomMeeting' + '/' + user.uid + "/BreakOutRoomID-" + window.breakOutRoomID + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/BreakOutRoomID-' + window.breakOutRoomID + "/");

            window.myTimeStatus = {
                location: myState,
                visitStart: moment(),
                visitEnd: 0,
                other: window.breakOutRoomID,
                stallID: '',
            };

            path.child('Entering').push().set({
                startTime: date,
                lastUpdate: moment().format(),
            });

            toDay.update({
                enter: true,
                lastEnterTime: date,
                lastUpdate: moment().format(),
            });

        }
    }


    breakoutRoomExit = () => {

        const user = this.state.user;
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

        if (window.myTimeStatus.location == 'insideBreakout') {

            let path = rdbx.ref('/user_analytics_wd_breakoutRoomMeeting' + '/' + user.uid + "/BreakOutRoomID-" + window.myTimeStatus.other + "/");
            let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + '/BreakOutRoomID-' + window.myTimeStatus.other + "/");


            var now = moment();
            var then = window.myTimeStatus.visitStart;
            let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            let totalSpend = diffrent;


            path.child('Exiting').push().set({
                endTime: date,
                spend: totalSpend,
                lastUpdate: moment().format(),
            });

            let self = this;
            toDay.once('value').then(function (snapshot) {
                var values = snapshot.val();

                let saveTime = totalSpend;
                if (values) {
                    if (values['totalTime']) {
                        saveTime = self.addTimes(values['totalTime'], totalSpend);
                    }
                }
                toDay.update({
                    totalTime: saveTime
                });
                path.update({
                    TotalSpendTime: saveTime
                });
            });

            window.myTimeStatus = {
                location: '',
                visitStart: '',
                visitEnd: 0,
                other: '',
                stallID: '',
            };

        }
    }

    //This is calling from HTML directly
    IClickedThisHTMLPage = (htmlPage) => {
        //Company Overview
        
        const user = this.state.user;
        const product = htmlPage.name;
        let refPath = '/user_analytics_wd_LobbyWorkShopHall/' + user.uid + "/ProductClicks/";

        let path = rdbx.ref(refPath);
        let toDay = rdbx.ref('/LeaderBoardUserData/' + user.uid + '/' + this.GetDate() + "/ProductClicks/");
        let from=this.state.whereIm;
        let isStall=this.state.myStallName;
        path.child(from).push().set({
            [product]: true,
            lastCkicked: moment().format(),
            FromWhere:from,
            isStall:isStall
        });
        toDay.child(from).push().set({
            [product]: true,
            lastCkicked: moment().format(),
            FromWhere:from,
            isStall:isStall
        });

    }


    //Calling from Playcanvas
    reachedTarget = (where) => {
        console.log("Where I M " + where);

        this.state.whereIm = where;
        this.setState({ whereIm: where });

        //this.hideAllMenu();
        switch (where) {
            case 'lobby': {

                if (window.FirebaseObj.currentUser && this.state.enterbreakout) {
                    if (window.DailycoManager.state.hasJoinedCall)
                        window.DailycoManager.EndCall();

                    this.callEnterBreakout(false);
                }

                if (window.myTimeStatus.location == '') {
                    this.reachedLobbySave();
                } else {
                    if (window.myTimeStatus.location != 'lobby') {
                        this.reachedLobbySave();
                    }
                }


                this.hideAllMenu();
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: menuItems });
                break;
            }
            case 'gotoinfo': {

            }
            case 'infodesk': {
                this.goingOutFromLobby('infodesk');

                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: AllBack });
                break;
            }
            case 'gotoBreakeout': {

            }
            case 'breakOutRoomHotsopt': {

                this.goingOutFromLobby('breakOutRoomHotsopt');

                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);

                if (window.FirebaseObj.currentUser && this.state.enterbreakout) {
                    if (window.DailycoManager.state.hasJoinedCall)
                        window.DailycoManager.EndCall();
                    this.callEnterBreakout(false);
                }
                this.hideAllMenu();
                this.setState({ menuItems: AllBack });
                break;
            }
            case 'insideBreakout': {
                this.state.myStallName = '';
                this.breakoutRoomEntry('insideBreakout');
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: BreakoutRomm });
                break;
            }
            case 'goingToAudi': {

            }
            case 'insideAudi': {
                this.goingOutFromLobby('KeynoteSession');
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: AuditoriumSideMenu });
                break;
            }
            case 'goingHall': {

            }

            case 'insideHall': {
                this.goingOutFromLobby('Hall');
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: AllBack });
                break;
            }
            case 'insideStall': {

                break;
            }
            case 'goingWorkshop': {

            }
            case 'insideWorkshopLobby': {
                this.goingOutFromLobby('Workshop');
                this.state.myStallName = '';
                this.hideQNAandPoll();
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: AllBack });
                break;
            }
            case 'insideClientPlus': {

                this.workshopVisitData('WorkshopClient+')
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: WorkshopClientPlus });
                break;
            }
            case 'insideGaming': {
                this.workshopVisitData('WorkshopGaming')
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: WorkshopGaming });
                break;
            }
            case 'insideEnterprise': {
                this.workshopVisitData('WorkshopEnterprise')
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: WorkshopEnterprise });
                break;
            }
            case 'insideConsumer': {
                this.workshopVisitData('WorkshopConsumer')
                this.state.myStallName = '';
                this.changeMyState(this.state.mainMenuState);
                this.setState({ menuItems: WorkshopConsumer });
                break;
            }
        }

        this.updateUserCurrentStatus();
        this.setMyLiveCount();
    }


    doYouWantGoBack = () => {
        switch (this.state.whereIm) {
            case 'insideBreakout': {
                this.showBackInfoPopUp('Are you sure want to exit the 1:1 meeting?', 'brakeoutRoom');
                break;
            }
            case 'insideAudi': {
                this.showBackInfoPopUp('Are you sure you want to exit the auditorium?', 'mainAudi');
                break;
            }
            case 'insideClientPlus': {
                this.showBackInfoPopUp('Are you sure you want to exit the Client + Workshop?', 'client+Audi');
                break;
            }
            case 'insideGaming': {
                this.showBackInfoPopUp('Are you sure you want to exit the Gaming Workshop?', 'gamingAudi');
                break;
            }
            case 'insideEnterprise': {
                this.showBackInfoPopUp('Are you sure you want to exit the Enterprise Workshop?', 'enterprisegAudi');
                break;
            }
            case 'insideConsumer': {
                this.showBackInfoPopUp('Are you sure you want to exit the Consumer Workshop?', 'consumerAudi');
                break;
            }
            case 'stallVideoChat': {

                break;
            }
            default: {
                this.backButtonCommanAction();
                break;
            }
        }
    }

    addTimes = (startTime, endTime) => {
        var times = [0, 0, 0]
        var max = times.length

        var a = (startTime || '').split(':')
        var b = (endTime || '').split(':')

        // normalize time values
        for (var i = 0; i < max; i++) {
            a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
            b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }

        // store time values
        for (var i = 0; i < max; i++) {
            times[i] = a[i] + b[i]
        }

        var hours = times[0]
        var minutes = times[1]
        var seconds = times[2]

        if (seconds >= 60) {
            var m = (seconds / 60) << 0
            minutes += m
            seconds -= 60 * m
        }

        if (minutes >= 60) {
            var h = (minutes / 60) << 0
            hours += h
            minutes -= 60 * h
        }

        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
    }

    //PPJ_EX
    addTimeToWindowManager = (key, time) => {

        //let add=this.addTimes(diffrent,diffrent); 

    }


    backButtonCommanAction = () => {

        if (window.myTimeStatus) {


            if (window.myTimeStatus.other == 'InsideStall') {
                var now = moment();
                var then = window.myTimeStatus.visitStart;
                let diffrent = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");

                this.goingOutSideFromStall(window.myTimeStatus.stallID, diffrent);
            }

            if (window.myTimeStatus.location == 'WorkshopClient+' || window.myTimeStatus.location == 'WorkshopGaming'
                || window.myTimeStatus.location == 'WorkshopEnterprise' || window.myTimeStatus.location == 'WorkshopConsumer') {
                this.workshopVisitExitData(window.myTimeStatus.location);
            }

            if (window.myTimeStatus.location == 'insideBreakout') {
                this.breakoutRoomExit();
            }

        }

        if (slider) {
            console.log("this is uploading");
            this.brekoutfullscreen();
        }
        window.canvasManager.LobbyCallsFromReact('backToLobby');
        // for daily co                  
        if (window.FirebaseObj.currentUser && this.state.enterbreakout) {
            if (window.DailycoManager.state.hasJoinedCall)
                window.DailycoManager.EndCall();

            this.callEnterBreakout(false);
        }
        this.hideAllMenu();
        window.canvasManager.exitfullscreenonback();
    }

    showBackInfoPopUp(message, exitFrom) {
        let self = this;
        Swal.fire({
            title: '',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                self.backButtonCommanAction();
            } else {
                console.log("NO");
            }
        });
    }

    brekoutfullscreen = () => {
        if (this.state.whereIm == "insideBreakout")
            this.handleClick(null, BreakoutRomm[1]);

    }

    checkinbrekoutroom() {
        if (this.state.whereIm == "insideBreakout")
            return true;
        else
            return false;
    }

    //React Side Bar menu 
    handleClick(event, menuItem) {

        if (event != undefined)
            event.preventDefault();


        console.log(menuItem);
        //console.log(menuItem);
        if (this.state.user) {

            switch (menuItem.id) {
                case 'home-session': {
                    //Back To Lobby
                    this.hideAllMenu();
                    break;
                }
                case 'auditorium': {
                    this.hideAllMenu();
                    //Check Audi is active if Active go to Audi
                    window.canvasManager.LobbyCallsFromReact('goToAuditorium');
                    break;
                }
                case 'team': {
                    this.hideAllMenu();
                    window.canvasManager.LobbyCallsFromReact('meetTheTeam');
                    break;
                }
                case 'breakout': {
                    this.hideAllMenu();
                    window.canvasManager.LobbyCallsFromReact('goToMeetingRoomSelection');
                    break;
                }
                case 'workshop': {
                    this.hideAllMenu();
                    window.canvasManager.LobbyCallsFromReact('goToWorkShop');
                    break;
                }
                case 'exhibits': {
                    window.canvasManager.LobbyCallsFromReact('goToExpoHall');
                    this.hideAllMenu();

                    break;
                }

                case 'profile': {
                    this.hideAllMenu();
                    this.handleContextMenu(menuItem);
                    if (this.state.showProfile) {
                        this.setState({ showProfile: false });
                    } else {
                        this.setState({ showProfile: true });
                    }

                    break;
                }
                case 'backToLobby': {

                    this.doYouWantGoBack();


                    break;
                }
                /*  case 'chat': {
                     window.canvasManager.CreatePublicChat();
                     break;
                 }
                 case 'leaderBoard-show': {
                     window.canvasManager.createMainLeaderBoard();
                     break;
                 }
                 case 'feedback': {
                     window.canvasManager.createFeedbackform();
                     break;
                 } */
                case 'uihider': {
                    console.log(menuItem.id + "menuItem.id");
                    this.hideAllMenu();
                    this.DailyCoSidebarhandler();
                    break;
                }
                case 'whiteBoard': 
                    this.hideAllMenu();
                    this.WhiteBoardCoSidebarhandler();
                    break;
            }
            // this.callReactConnectorFunction(menuItem)
            if (menuItem.subMenus) {
                // console.log(menuItem);
                this.handleContextMenu(menuItem);
            }



            //QNA SESSIONS
            switch (menuItem.id) {
                case 'showPoll1': {
                    this.hideQNA();

                    if (this.state.showPoll1) {
                        this.setState({ showPoll1: false });
                    } else {
                        this.setState({ showPoll1: true });
                    }

                    break;
                }
                case 'showPoll2': {
                    this.hideQNA();

                    if (this.state.showPoll2) {
                        this.setState({ showPoll2: false });
                    } else {
                        this.setState({ showPoll2: true });
                    }

                    break;
                }
                case 'showPoll3': {
                    this.hideQNA();

                    if (this.state.showPoll3) {
                        this.setState({ showPoll3: false });
                    } else {
                        this.setState({ showPoll3: true });
                    }

                    break;
                }
                case 'showPoll4': {
                    this.hideQNA();
                    if (this.state.showPoll4) {
                        this.setState({ showPoll4: false });
                    } else {
                        this.setState({ showPoll4: true });
                    }

                    break;
                }
                case 'showPoll5': {
                    this.hideQNA();
                    if (this.state.showPoll5) {
                        this.setState({ showPoll5: false });
                    } else {
                        this.setState({ showPoll5: true });
                    }

                    break;
                }

                case 'showQna1': {

                    this.hidePoll();

                    if (this.state.showQna1) {
                        this.setState({ showQna1: false });
                    } else {
                        this.setState({ showQna1: true });
                    }
                    break;
                }
                case 'showQna2': {
                    this.hidePoll();

                    if (this.state.showQna2) {
                        this.setState({ showQna2: false });
                    } else {
                        this.setState({ showQna2: true });
                    }
                    break;
                }
                case 'showQna3': {
                    this.hidePoll();

                    if (this.state.showQna3) {
                        this.setState({ showQna3: false });
                    } else {
                        this.setState({ showQna3: true });
                    }
                    break;
                }
                case 'showQna4': {
                    this.hidePoll();

                    if (this.state.showQna4) {
                        this.setState({ showQna4: false });
                    } else {
                        this.setState({ showQna4: true });
                    }
                    break;
                }
                case 'showQna5': {
                    this.hidePoll();

                    if (this.state.showQna5) {
                        this.setState({ showQna5: false });
                    } else {
                        this.setState({ showQna5: true });
                    }

                    break;
                }
                case 'profile': {
                    break;
                }
                default: {

                    break;
                }
            }

        }

    }

    backToMainLobbyFromOtherState = () => {
        this.setState({ menuItems: menuItems });
        this.setState({ currentMenuState: "home-session" });
        this.hideAllMenu();
    }

    hideQNA = () => {
        this.setState({
            showQna1: false,
            showQna2: false,
            showQna3: false,
            showQna4: false,
            showQna5: false,
        });
        this.state.showQna1 = false;
        this.state.showQna2 = false;
        this.state.showQna3 = false;
        this.state.showQna4 = false;
        this.state.showQna5 = false;
    }

    hidePoll = () => {
        this.setState({
            showPoll1: false,
            showPoll2: false,
            showPoll3: false,
            showPoll4: false,
            showPoll5: false,
        });
        this.state.showPoll1 = false;
        this.state.showPoll2 = false;
        this.state.showPoll3 = false;
        this.state.showPoll4 = false;
        this.state.showPoll5 = false;
    }

    hideQNAandPoll = () => {
        this.hideQNA();
        this.hidePoll();
    }



    ///////////PPJ//////////////////

    handleContextMenu(menuItem) {

        this.setState({

            activeMenuLevel0: menuItem,
            activeMenuLevel1: null,
            activeMenuLevel2: null,
            activeMenuLevel3: null,
            lastActiveMenu: menuItem,
            currentMenuState: menuItem.id,
        });
        this.hideQNAandPoll();


        if (menuItem.id === 'qna-session') {
            this.showQna = true;
            this.showPoll = false;
            this.setState({ showQna: true });
        } else {
            this.setState({ showQna: false });
        }

        if (menuItem.id === 'poll-session') {
            this.showPoll = true;
            this.showQna = false;
            this.setState({ showPoll: true });
        } else {
            this.showPoll1 = false;
            this.setState({ showPoll: false });
        }



    }

    handleContextMenuLevel1(menuItem) {
        // console.log("going back Handle context menu level 1");
        //console.log(menuItem);

        if (menuItem.id === "home-session") {
            //console.log("here-----------------------------");
            //  this.callReactConnectorFunction(menuItem)
            window.canvasManager.mobileBack();
        }
        this.setState({
            activeMenuLevel0: menuItem,
            activeMenuLevel1: null,
            activeMenuLevel2: null,
            activeMenuLevel3: null
            // lastActiveMenu: menuItem,
            // currentMenuState: menuItem.id
        });
    }

    handleContextMenuLevel2(menuItem) {
        //console.log("++++++++++++++++");
        //console.log("going back Handle context menu level 2");
        //console.log(menuItem);
        //console.log("++++++++++++++++");
        if (menuItem.level === 2) {
            if (menuItem.parentMenu.parentMenu.id === 2) {//from audi this is being called
                this.setState({
                    activeMenuLevel0: null,
                    activeMenuLevel1: menuItem.parentMenu,
                    activeMenuLevel2: null,
                    activeMenuLevel3: null
                    // lastActiveMenu: menuItem.parentMenu,
                    // currentMenuState: menuItem.parentMenu.parentMenu.id
                });
            } else {
                this.setState({
                    activeMenuLevel0: null,
                    activeMenuLevel1: menuItem.parentMenu,
                    activeMenuLevel2: null,
                    activeMenuLevel3: null
                    // lastActiveMenu: menuItem.parentMenu,
                    // currentMenuState: menuItem.parentMenu.parentMenu.id
                });
            }
        }

        //console.log(this.state.activeMenuLevel2)
    }

    //#region hide Menu Functions
    hideMenuLevel1() {
        //this.setState({ activeMenuLevel0: null });
    }

    hideMenuLevel1x() {
        this.setState({ activeMenuLevel0: null });
    }

    hideMenuLevel2() {
        //this.setState({ activeMenuLevel0: null });
        //this.setState({ activeMenuLevel1: null });
    }

    hideMenuLevel3() {
        //this.setState({ activeMenuLevel0: null });
        //this.setState({ activeMenuLevel1: null });
        //this.setState({ activeMenuLevel2: null });
    }

    hideAllMenu() {
        if (this.state.activeMenuLevel0) {
            if (this.state.activeMenuLevel0.id === "profile") {
                this.setState({
                    currentMenuState: "home-session"
                });
            }
        }

        this.setState({ showProfile: false });

        this.hideQNAandPoll();
        this.setState({ activeMenuLevel0: null });
        this.setState({ activeMenuLevel1: null });
        this.setState({ activeMenuLevel2: null });

    }
    //#endregion

    //#region  openMenu
    OpenMenu = (menuItem) => {
        console.log(menuItem);

        let activeMenuLevelArray = new Array(4).fill(null);

        if (activeMenuLevelArray.length >= menuItem.level) {
            activeMenuLevelArray[menuItem.level] = menuItem;
            this.setState({
                activeMenuLevel0: activeMenuLevelArray[0],
                activeMenuLevel1: activeMenuLevelArray[1],
                activeMenuLevel2: activeMenuLevelArray[2],
                activeMenuLevel3: activeMenuLevelArray[3],
                lastActiveMenu: menuItem,
                currentMenuState: menuItem.id

            });
        } else {
            //console.log("Please check value you are passing to Open Menu");
        }
    }

    OpenChildMenu = (menuItem, activeItemId) => {
        //console.log(menuItem);
        let activeMenuLevelArray = new Array(4).fill(null);
        if (activeMenuLevelArray.length >= menuItem.level) {
            activeMenuLevelArray[menuItem.level] = menuItem;
            this.setState({
                activeMenuLevel0: activeMenuLevelArray[0],
                activeMenuLevel1: activeMenuLevelArray[1],
                activeMenuLevel2: activeMenuLevelArray[2],
                activeMenuLevel3: activeMenuLevelArray[3],
                lastActiveMenu: menuItem,
                currentMenuState: activeItemId

            });
        } else {
            //console.log("Please check value you are passing to Open Menu");
        }
    }

    OpenMenuWithId(id) {
        if (id == null) {
            //console.log("Please check value passed in OpenMenu With Id");
            return;
        } else {
            if (id >= 0)
                this.OpenMenu(menuItems[id])
        }
    }
    //#endregion 

    onHeadingClick(event, parentMenu) {
        //console.log("heading handler");
        event.preventDefault();

        this.hideAllMenu();
        if (parentMenu.level == 0) {

            switch (parentMenu.id) {
                case 1:
                    //if lobby is clicked
                    window.canvasManager.mobileHome();
                    this.hideMenuLevel1();
                    break;
                case 2:
                    //if Auditorium is clicked
                    this.hideAllMenu();
                    break;
                case 3:
                    //if Halls is clicked
                    break;
            }
        } else if (parentMenu.level == 1) {
            this.handleContextMenuLevel1(parentMenu.parentMenu);
        } else if (parentMenu.level == 2) {
            this.handleContextMenuLevel2(parentMenu);
        }

    }

    //Sub Menu button Click Controller FROM PLAYCANVAS - PPJ
    handleSubmenuClickFromPlaycanvas(activeMenuLevel1) {
        // console.log(activeMenuLevel1);

        return;
        /* switch (activeMenuLevel1) {
            case 'Auditorium1': {
                const enterroom = this.GetUserRoomEnterNumberStatus("auditorium", 1);
                if (enterroom.status)
                    this.setState({ menuItems: Auditorium1QP });
                else
                    this.ToggleMenuLoading(false);

                this.hideAllMenu();
                break;
            }
            case 'Auditorium2': {
                const enterroom = this.GetUserRoomEnterNumberStatus("auditorium", 2);
                if (enterroom.status)
                    this.setState({ menuItems: Auditorium2QP });
                else
                    this.ToggleMenuLoading(false);
                this.hideAllMenu();
                break;
            }
            case 'Auditorium3': {
                //   if(3 === window.FirebaseObj.audicanenter || window.FirebaseObj.audicanenter===4)
                const enterroom = this.GetUserRoomEnterNumberStatus("auditorium", 3);
                if (enterroom.status)
                    this.setState({ menuItems: Auditorium3QP });
                else
                    this.ToggleMenuLoading(false);
                this.hideAllMenu();
                break;
            }
            case 'breakout1': {

                if ((1 === window.FirebaseObj.breakoutcanenter && this.getTownHallStatus("breakout1").status == "CanEnter") || window.FirebaseObj.breakoutcanenter == 4) {
                    this.setState({ menuItems: Breakout1QP });
                    //console.log("update Menu");
                } else {
                    this.ToggleMenuLoading(false);
                    //console.log("Else");
                }


                this.hideAllMenu();
                break;
            }
            case 'breakout2': {

                if ((2 === window.FirebaseObj.breakoutcanenter && this.getTownHallStatus("breakout2").status == "CanEnter") || window.FirebaseObj.breakoutcanenter == 4) {
                    this.setState({ menuItems: Breakout2QP });
                } else
                    this.ToggleMenuLoading(false);

                this.hideAllMenu();
                break;
            }
            case 'Lounge': {
                this.hideAllMenu();
                this.setState({ menuItems: Lounge });
                break;
            }
            case 'ExpoHall': {
                this.hideAllMenu();
                this.setState({ menuItems: AllBack });
                break;
            }
            case 'InformationDesk': {
                this.setState({ menuItems: AllBack });
                this.hideAllMenu();
                break;
            }

        } */
    }

    //Sub Menu button Click Controller - PPJ
    handleSubmenuClick(event, activeMenuLevel1) {
        // console.log(activeMenuLevel1);
        return;
        /* switch (activeMenuLevel1.id) {
            case 'Auditorium1': {
                if (1 === window.FirebaseObj.audicanenter) {
                    this.setState({ menuItems: Auditorium1QP });
                } else {
                    this.ToggleMenuLoading(false);
                }


                window.canvasManager.LobbyCallsFromReact('goToAuditorium1');
                this.hideAllMenu();
                break;
            }
            case 'Auditorium2': {
                if (2 === window.FirebaseObj.audicanenter) {

                    this.setState({ menuItems: Auditorium2QP });
                } else {
                    this.ToggleMenuLoading(false);
                }

                window.canvasManager.LobbyCallsFromReact('goToAuditorium2');
                this.hideAllMenu();
                break;
            }
            case 'Auditorium3': {
                if (3 === window.FirebaseObj.audicanenter) {

                    this.setState({ menuItems: Auditorium3QP });
                } else {
                    this.ToggleMenuLoading(false);
                }
                window.canvasManager.LobbyCallsFromReact('goToAuditorium3');
                this.hideAllMenu();
                break;
            }
            case 'breakout1': {
                if ((1 === window.FirebaseObj.breakoutcanenter && this.getTownHallStatus("breakout1").status == "CanEnter") || window.FirebaseObj.breakoutcanenter == 4) {
                    this.setState({ menuItems: Breakout1QP });
                } else {
                    this.ToggleMenuLoading(false);
                }
                window.canvasManager.LobbyCallsFromReact('goToBreakout1');
                this.hideAllMenu();
                break;
            }
            case 'breakout2': {
                if ((2 === window.FirebaseObj.breakoutcanenter && this.getTownHallStatus("breakout2").status == "CanEnter") || window.FirebaseObj.breakoutcanenter == 4) {
                    this.setState({ menuItems: Breakout2QP });
                } else {
                    this.ToggleMenuLoading(false);
                }
                window.canvasManager.LobbyCallsFromReact('goToBreakout2');
                this.hideAllMenu();
                break;
            }
        }

        event.preventDefault(); */
        // if (activeMenuLevel1.level == 1) {
        //     this.handleSubContextMenuLevel1(activeMenuLevel1);
        // } else if (activeMenuLevel1.level == 2) {
        //     this.handleSubContextMenuLevel2(activeMenuLevel1);
        // }
        // else if (activeMenuLevel1.level === 3) {
        //     this.handleSubContextMenuLevel3(activeMenuLevel1);
        // }

    }

    handleSubContextMenuLevel3(menuItem) {
        //console.log("HandleSubcontextMenu Level3 ");

        menuItem.parentMenu = this.state.activeMenuLevel2;

        this.setState({ activeMenuLevel3: menuItem });

        if (menuItem.method) {
            window.canvasManager[menuItem.method](menuItem);
        }

        if (!menuItem.visibleOnClick) {
            this.hideMenuLevel3();
        }

    }

    handleSubContextMenuLevel2(menuItem) {
        if (menuItem.level !== 2) {
            //console.alert("menu item not of level 2");
        }
        menuItem.parentMenu = this.state.activeMenuLevel1;

        let saveMenuState = false;


        if (menuItem.parentMenu.parentMenu.id === 3) {
            saveMenuState = true;
        } else {
            saveMenuState = false;
        }

        if (saveMenuState) {
            this.setState({
                activeMenuLevel2: menuItem,
                lastActiveMenu: menuItem,
                currentMenuState: menuItem.parentMenu.parentMenu.id
            });
        } else {
            this.setState({ activeMenuLevel2: menuItem });
        }

        if (menuItem.method) {
            window.canvasManager[menuItem.method](menuItem);
        }
        // console.log("++++++++++++++++");
        // console.log("HandleSubcontextMenu Level2 ");
        // console.log(menuItem);
        // console.log("++++++++++++++++");

        if (!menuItem.visibleOnClick) {
            this.hideMenuLevel3();
        }

    }

    handleSubContextMenuLevel1(menuItem) {
        //console.log("HandleSubcontextMenu Level1");
        if (!menuItem.parentMenu)
            menuItem.parentMenu = this.state.activeMenuLevel0;

        let saveMenuState = false;

        if (menuItem.parentMenu.id === 1 && menuItem.id > 1) {
            saveMenuState = false;
        } else {
            saveMenuState = true;
        }
        if (saveMenuState) {

            this.setState({
                activeMenuLevel1: menuItem,
                lastActiveMenu: menuItem,
                currentMenuState: menuItem.parentMenu.id
            });

        } else {
            this.setState({
                activeMenuLevel1: menuItem
                // lastActiveMenu: menuItem.parentMenu,
                // currentMenuState: menuItem.parentMenu.id
            });
        }


        if (menuItem.method) {
            window.canvasManager[menuItem.method](menuItem);
        }
        // console.log("++++++++++++++++");
        // console.log("last menu");
        // console.log(this.state.lastActiveMenu);
        // console.log("menustate");
        // console.log(this.menuItem);
        // console.log("++++++++++++++++");

        if (!menuItem.visibleOnClick) {
            this.hideMenuLevel3();
        }

    }

    //#region menu utility functions
    ResetMenu = () => {
        this.handleContextMenuLevel1(this.state.menuItems);
        this.hideAllMenu();
    }

    ToggleUIInteractbleState = (StateValue) => {

        this.setState({
            isInteractable: StateValue
        });
        //this state value will be passed as props for component to know if they can take action or not
        console.log("UI is interaction stae: " + StateValue);


        if (StateValue === true) {
            //console.log("In Lobby");
            this.isLobby = true;
            this.setState({ isLobby: true });

        } else {
            //console.log("Not In Lobby");
        }
    }

    ToggleMenuLoading = (value) => {
        this.setState({
            inTransition: value,
            isInteractable: !value
        });
        //will be called from playcanvas when some video request will be sent    
        console.log("isInteractable : " + !value);

        // if (value === false) {
        //     this.showHelp1();
        // }
    }

    resetSubMenuActiveId() {
        this.setState({
            subMenuActiveId: -1
        });
    }

    setSubMenuActiveId(value) {
        //console.log(value);
        this.setState({
            subMenuActiveId: value
        });
    }
    //#endregion

    hideSubContextMenu() {
        this.setState({ activeMenuLevel1: null });
        this.setState({ activeMenuLevel2: null });
    }

    onSwipeUpClicked(expended) {
        this.setState({ expended: expended });
    }


    showNotification(notification) {
        this.setState({ notification });
        this.setState({ showNotification: true });
        setTimeout(() => {
            this.setState({ showNotification: false });
            this.setState({ notification: null });
        }, notification.timeout);
    }






    IsShowingQnaOrPoll() {

        if (isMobileOnly) {
            if (this.showQna || this.showQna1 || this.showQna2 || this.showQna3 || this.showPoll || this.showPoll1 || this.showPoll2 || this.showPoll3) {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }

    }

    //#region 
    removeAdminControlListener() {
        if (this.adminControlListener) {
            this.adminControlListener();
        }
        if (this.adminflowListener) {
            this.adminflowListener();
        }

        if (this.adminforceListener) {
            this.adminforceListener();
        }
    }

    callAuditoriumeVideoUpdateListener = () => {

    }




    attachAdminControlListener() {
        var self = this;
        var firstTime = true;
        this.adminControlListener = this.context.db.collection('AdminControl').doc('notification').onSnapshot(function (doc) {
            let docData = doc.data();

            if (docData) {
                if (docData.showNotification) {
                    self.setState({ showAdminNotification: true, textContent: docData.message });
                } else {
                    self.setState({ showAdminNotification: false, textContent: docData.message });
                }
            }
        });

        //PPJ Audi Session manager
        this.context.db.collection('Admin').doc('KeynoteSession').onSnapshot(function (doc) {
            let docData = doc.data();

            if (docData) {
                self.state.keynoteSessionID = docData.sessionID;

                self.setState({ keynoteSessionID: docData.sessionID });
                //Update User Session Data
                self.keynoteSessionChangeActions();
            }
        });


        this.context.db.collection('Admin').doc('eventManagement').onSnapshot(function (doc) {
            try {
                let docData = doc.data();

                //Main
                if (docData.auditorium1videourl)
                    self.state.audiURL1 = docData.auditorium1videourl;

                //Clint +
                if (docData.auditorium2videourl)
                    self.state.audiURL2 = docData.auditorium2videourl;
                //Game
                if (docData.auditorium3videourl)
                    self.state.audiURL3 = docData.auditorium3videourl;
                //enterprise
                if (docData.auditorium4videourl)
                    self.state.audiURL4 = docData.auditorium4videourl;
                //consumer
                if (docData.auditorium5videourl)
                    self.state.audiURL5 = docData.auditorium5videourl;


                self.setState({
                    audiURL1: docData.auditorium1videourl,
                    audiURL2: docData.auditorium2videourl,
                    audiURL3: docData.auditorium3videourl,
                    audiURL4: docData.auditorium4videourl,
                    audiURL5: docData.auditorium5videourl
                });
                //Update Audi Video URL
                if (window.canvasManager)
                    window.canvasManager.UpdateAudiVideos();
            }
            catch (err) {
                console.log(err + ": reloading page");
                window.location.reload();
            }

            // audiURL1
        });



        this.adminflowListener = this.context.db.collection('AdminControl').doc('sessionflow').onSnapshot(function (doc) {
            let docData = doc.data();

            if (docData) {
                //  console.log(docData.LandD);
                self.setState({
                    landDOpened: docData.LandD,
                    sessionOpenned: docData.session,
                });
            }
        });

        this.adminforceListener = this.context.db.collection('AdminControl').doc('forceAction').onSnapshot(function (doc) {
            let docData = doc.data();

            if (docData) {
                //  console.log(docData.LandD);
                self.setState({
                    moveToSession: docData.moveToSession
                });

                if (docData.moveToSession) {
                    if (!firstTime) {
                        window.canvasManager.mobileAuditorium1ForceFully();
                    }
                }
                firstTime = false;
            }
        });
    }


    DailyCoSidebarhandler = () => {

        if (slider == true) {

            //this.element.classList.add('stall-container popover-modal');
            document.getElementById('dailycoslider').style.visibility = "visible";
            slider = false;
            this.setState({ sidebar: false })

        }
        else {
            // this.sidebardailyco.add("style", 'z-index:0');
            document.getElementById('dailycoslider').style.visibility = "hidden";
            this.setState({ sidebar: true })
            slider = true;
        }
    }

    WhiteBoardCoSidebarhandler = () => {

        if (whiteboardSlider == true) {

            //this.element.classList.add('stall-container popover-modal');
            document.getElementById('whiteboard-slider').style.visibility = "visible";
            whiteboardSlider = false;
            this.setState({ sidebar: false })

        }
        else {
            // this.sidebardailyco.add("style", 'z-index:0');
            document.getElementById('whiteboard-slider').style.visibility = "hidden";
            this.setState({ sidebar: true })
            whiteboardSlider = true;
        }
    }

    getSessionStatus() {
        return { status: true };
        //NOTE: NEEDs TO EDIT LATER BASED ON USER TYPE
        if (this.state.sessionOpenned) {
            return { status: true };
        } else {
            return { status: false, message: "Can not Enter Session Hall Right Now!!" };
        }
    }

    getLandDStatus() {
        return { status: true };
        //NOTE: NEEDs TO EDIT LATER BASED ON USER TYPE
        //console.log(this.state.landDOpened);
        if (this.state.landDOpened) {
            return { status: true };
        } else {
            return { status: false, message: "Can not Enter L&D Halls Right Now!!" };
        }
    }

    showInfoPopUp(message) {
        //console.log("showInfoPopUp", message);
        swal({
            title: message, // `Event will start at ${roomStatus.timeLeft}`,
            icon: "info",
            className: "video-swal-modal",
            button: "Continue",
        });
    }

    getLastActiveMenu() {
        var lastMenu = null;
        if (this.state.activeMenuLevel0 !== null) {
            lastMenu = this.state.activeMenuLevel0;
        }
        else if (this.state.activeMenuLevel1 !== null) {
            lastMenu = this.state.activeMenuLevel1;
        }
        else if (this.state.activeMenuLevel2 !== null) {
            lastMenu = this.state.activeMenuLevel2;
        }
        else if (this.state.activeMenuLevel3 !== null) {
            lastMenu = this.state.activeMenuLevel3;
        }
        else {
            lastMenu = this.state.lastActiveMenu;
        }
        //console.log(lastMenu);
        return lastMenu;
    }

    OpenLastActiveMenu() {
        //console.log(this.state.menuItems);
        // console.log(this.state.currentMenuState);
        this.handleClick(null, menuItems[1]);
        this.hideAllMenu();
        // this.OpenMenu(this.getLastActiveMenu());
    }
    //#endregion

    // for dailyco
    removeTownHallLisenter = () => {
        if (this.townHallLisenter) {
            this.townHallLisenter();
        }
    }

    // for dailyco
    addTownHallLisenter = () => {
        var self = this;
        this.LiveParticipantListFromFirebase.clear();
        console.log("listening townhall");
        if (this.context.videoCallRoomName !== undefined && this.context.videoCallRoomName.length > 0) {
            console.log("listening townhall" + this.context.videoCallRoomName);
            this.townHallLisenter = this.context.db
                .collection("dailyco")
                .doc(this.context.videoCallRoomName)
                .onSnapshot(function (doc) {
                    //console.log("listening townhall inside" +doc.data());
                    console.log("Current data: ", doc.data());
                    if (doc.data()) {
                        console.log("listening townhall inside  2");
                        const started = doc.data().callStarted;
                        self.canStartVideoCall = started;
                        console.log(self.canStartVideoCall + "call started");
                        if (self.canStartVideoCall) {
                            const users = doc.data().users;
                            users.forEach(user => {
                                let userInfo =
                                {
                                    userid: user.userid,
                                    imageUrl: user.imageUrl

                                }
                                self.LiveParticipantListFromFirebase.set(user.sessionId, userInfo);
                            });
                            // console.log(self.LiveParticipantListFromFirebase);
                        }

                        self.setState({
                            updateLiveParticipantVideoCall: true
                        });
                    }
                });
        }

    }

    GetUserRoomEnterNumberStatus = (number) => {

        window.breakOutRoomID = number;

        number = parseInt(number);
        let self = this;
        if (number == window.FirebaseObj.breakoutcanenter || window.FirebaseObj.breakoutcanenter == 20) // admin have access to enter all room
        {
            if (this.context.videoRoomAdmin || window.FirebaseObj.breakoutcanenter == 20) {
                if (number == 1)
                    window.FirebaseObj.videoCallRoomName = "jerryroom1";

                else if (number == 2)
                    window.FirebaseObj.videoCallRoomName = "jerryroom2";


                else if (number == 3)
                    window.FirebaseObj.videoCallRoomName = "scottroom1";


                else if (number == 4)
                    window.FirebaseObj.videoCallRoomName = "scottroom2";

                else if (number == 5)
                    window.FirebaseObj.videoCallRoomName = "jimroom1";

                else if (number == 6)
                    window.FirebaseObj.videoCallRoomName = "jimroom2";

                else if (number == 7)
                    window.FirebaseObj.videoCallRoomName = "gregroom1";

                else if (number == 8)
                    window.FirebaseObj.videoCallRoomName = "gregroom2";

                else if (number == 9)
                    window.FirebaseObj.videoCallRoomName = "swapnaroom1";

                else if (number == 10)
                    window.FirebaseObj.videoCallRoomName = "swapnaroom2";

                else if (number == 11)
                    window.FirebaseObj.videoCallRoomName = "kristyroom1";

                else if (number == 12)
                    window.FirebaseObj.videoCallRoomName = "kristyroom2";

                else if (number == 13)
                    window.FirebaseObj.videoCallRoomName = "ryanroom1";

                else if (number == 14)
                    window.FirebaseObj.videoCallRoomName = "ryanroom2";

                else if (number == 15)
                    window.FirebaseObj.videoCallRoomName = "colleenroom1";

                else if (number == 16)
                    window.FirebaseObj.videoCallRoomName = "colleenroom2";

                else if (number == 17)
                    window.FirebaseObj.videoCallRoomName = "kyleroom1";

                else if (number == 18)
                    window.FirebaseObj.videoCallRoomName = "kyleroom2";

                console.log(window.FirebaseObj.videoCallRoomName);
                self.addTownHallLisenter();
                return { status: true };
            }
            else {
                if ((self.canStartVideoCall) && ((window.FirebaseObj.breakoutsessionnumber == window.FirebaseObj.breakoutsessionbelongs) || (window.FirebaseObj.breakoutsessionbelongs == 20))) {
                    return { status: true };
                }
                else {
                    console.log("Not coming here");
                    return { status: false, message: "This 1:1 room is currently locked. Please visit us at your designated time. In case of any queries, please reach out to your respective Western Digital Account Manager." }
                }
            }

        }
        else if (window.FirebaseObj.uservalidformultiroom) {
            if (this.comparemultiroom(number)) {
                if (number == 1)
                    window.FirebaseObj.videoCallRoomName = "jerryroom1";

                else if (number == 2)
                    window.FirebaseObj.videoCallRoomName = "jerryroom2";

                else if (number == 3)
                    window.FirebaseObj.videoCallRoomName = "scottroom1";

                else if (number == 4)
                    window.FirebaseObj.videoCallRoomName = "scottroom2";

                else if (number == 5)
                    window.FirebaseObj.videoCallRoomName = "jimroom1";

                else if (number == 6)
                    window.FirebaseObj.videoCallRoomName = "jimroom2";

                else if (number == 7)
                    window.FirebaseObj.videoCallRoomName = "gregroom1";

                else if (number == 8)
                    window.FirebaseObj.videoCallRoomName = "gregroom2";

                else if (number == 9)
                    window.FirebaseObj.videoCallRoomName = "swapnaroom1";

                else if (number == 10)
                    window.FirebaseObj.videoCallRoomName = "swapnaroom2";

                else if (number == 11)
                    window.FirebaseObj.videoCallRoomName = "kristyroom1";

                else if (number == 12)
                    window.FirebaseObj.videoCallRoomName = "kristyroom2";

                else if (number == 13)
                    window.FirebaseObj.videoCallRoomName = "ryanroom1";

                else if (number == 14)
                    window.FirebaseObj.videoCallRoomName = "ryanroom2";

                else if (number == 15)
                    window.FirebaseObj.videoCallRoomName = "colleenroom1";

                else if (number == 16)
                    window.FirebaseObj.videoCallRoomName = "colleenroom2";

                else if (number == 17)
                    window.FirebaseObj.videoCallRoomName = "kyleroom1";

                else if (number == 18)
                    window.FirebaseObj.videoCallRoomName = "kyleroom2";

                self.addTownHallLisenter();

                return { status: true };

            }
            else
                return { status: false, message: "This 1:1 room is currently locked. Please visit your designated 1:1 room. In case of any queries, please reach out to your respective Western Digital Account Manager." };
        }
        else {
            console.log("Not Activate");
            return { status: false, message: "This 1:1 room is currently locked. Please visit your designated 1:1 room. In case of any queries, please reach out to your respective Western Digital Account Manager." };
        }

    }

    comparemultiroom = (number) => {
        let tempbool = false;
        window.FirebaseObj.usermultiroom.forEach(async function (element) {
            if (number == element)
                tempbool = true;

        })
        return tempbool;
    }

    GetRoomStatus(roomname) {
        if (roomname == "meeting") {
            if (window.FirebaseObj.meetingstatus == 0) {
                return { status: false, message: "1:1 rooms are currently locked. Please visit us at your designated time. In case of any queries, please reach out to your respective Western Digital Account Manager." }
            }
            else {
                if (window.FirebaseObj.uservalidforcall)
                    return { status: true }

                else
                    return { status: false, message: "Entry to this zone is by invitation only." }

            }

        }
        else if (roomname == "auditorium") {

            if (window.FirebaseObj.audistatus == 0) {
                return { status: false, message: "The Auditorium is currently locked." }
            }
            if (window.FirebaseObj.audistatus == 1) {
                return { status: true }
            }
            else {
                return { status: false, message: "The keynote sessions have ended. Please visit our expo hall, workshop sessions and other engagement zones." }
            }
        }

        else if (roomname == "expohall") {

            if (window.FirebaseObj.expohallstatus == 0) {
                return { status: false, message: "The Expo Hall is currently locked." }

            }
            else if (window.FirebaseObj.expohallstatus == 1) {
                return { status: true }
            }
            else {
                return { status: false, message: "Please visit us at 13:45 GMT tomorrow." }
            }
        }

        else if (roomname == "workshop") {

            if (window.FirebaseObj.workshopstatus == 0) {
                return { status: false, message: "The Workshop is currently locked." }

            }
            else if (window.FirebaseObj.workshopstatus === 1) {
                return { status: true }
            }
            else {
                return { status: false, message: "The workshop sessions have ended." }
            }
        }

    }

    GetCallStartStatusforStreamVideo = () => {


        this.context.db.collection("Admin").doc("breakoutsession").onSnapshot(function (doc) {
            if (doc.data()) {
                const started = doc.data()[window.FirebaseObj.videoCallRoomName];
                window.FirebaseObj.breakoutsessionnumber = started;

            }
        });

        this.context.db.collection("Admin").doc("eventManagement").onSnapshot(function (doc) {
            if (doc.data()) {
                const audi_status = doc.data().audistatus;
                window.FirebaseObj.audistatus = audi_status;

                const expo_status = doc.data().expohallstatus;
                window.FirebaseObj.expohallstatus = expo_status;

                const meeting_status = doc.data().meetingstatus;
                window.FirebaseObj.meetingstatus = meeting_status;

                const workshop_status = doc.data().workshopstatus;
                window.FirebaseObj.workshopstatus = workshop_status;

            }
        });

    }
    //-----------------------------------------------------Leader Board --------------------------------------------------------//

    /*  UpdateUserExperienceScore = () => {
          var self = this;
  
          this.lisenter = this.context.db
              .collection("experienceleaderboard")
              .doc(users)
              .onSnapshot(function (doc) {
                  if (doc.data()) {
               //       console.log("Firebase Current data: ", doc.data());
                      const users = doc.data().users;
                      users.forEach(user => {
                          let userInfo =
                          {                          
                              score: user.imageUrl
                          }
                          self.LiveParticipantListFromFirebase.set(user.sessionId, userInfo);
                          self.setState({
                              update: false
                          });
                      });
             //         console.log(self.LiveParticipantListFromFirebase);
  
                  }
              });
      }
  */


    //-----------------------------------------------------End Leader Board --------------------------------------------------------//

    callFromPlaycanvasForTwillioVideoChat = (roomID) => {

        console.log("Room ID" + roomID);

    }

    callEnterBreakout(flags) {
        this.state.enterbreakout = flags;
        this.setState({ enterbreakout: flags });

        this.state.isInteractable = !flags;
        this.setState({ isInteractable: !flags });
    }

    ChangeState = (event, menuItem) => {
        // window.canvasManager.mobileHome();
        this.callEnterBreakout(false);
        //window.canvasManager.LobbyAreaController(menuItem);    
        this.handleClick(event, menuItem);
    }

    //#endregion

    checkOrientation()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if(width < height)
        {
            this.setState({
              showWarnningScreen: true,
            });
        }else
        {
            this.setState({
              showWarnningScreen: false,
            });
        }
    }

    render() {
        const { expended } = this.state;

        return (
            <>

                <section onClick={event => this.hideMenuLevel3(event)} className="contentCntr">
                    <article className={"img-bg videoBox h-100 " + (this.IsShowingQnaOrPoll() ? "menu-active" : "")} id="play">

                    </article>
                </section>

                {/* <section className="contentCntr">
                <img
                        src="assets/images/logos/logo.png"
                        className="headerBox__logo"
                        alt=""
                    />
                </section> */}

                {isMobileOnly && this.isLobby ?
                    (

                        null
                    ) : null}

                {this.state.isShare ?
                    (
                        <div id="containerRX">

                            <div className="modalRX">
                                <button onClick={this.hideShare} className="closeBtnR"></button>
                                <br></br>
                                <p className="centerRR">Share your score on social media</p>
                                <br></br>
                                <div className="centerRR"><SocialR /></div>
                            </div>
                        </div>
                    ) : null}



                <footer id="footer-box" className="footerBox">
                    <Menu itemstauts={this.state} items={this.state.menuItems} mainMenuState={this.state.currentMenuState} onMenuItemClick={this.handleClick} canInteract={this.state.isInteractable}></Menu>


                    {this.state.showProfile ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <Profile hideMenu={this.hideAllMenu}></Profile>
                            </div>
                        ) : null}



                    {this.state.showQna1 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <QNAL1 onHeadingClick={this.hideAllMenu} ></QNAL1>
                            </div>
                        ) : null}

                    {this.state.showQna2 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <QNAL2 onHeadingClick={this.hideAllMenu} ></QNAL2>
                            </div>
                        ) : null}

                    {this.state.showQna3 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <QNAL3 onHeadingClick={this.hideAllMenu} ></QNAL3>
                            </div>
                        ) : null}


                    {this.state.showQna4 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <QNAL4 onHeadingClick={this.hideAllMenu} ></QNAL4>
                            </div>
                        ) : null}

                    {this.state.showQna5 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <QNAL5 onHeadingClick={this.hideAllMenu} ></QNAL5>
                            </div>
                        ) : null}




                    {this.state.showPoll1 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <POLL1 onHeadingClick={this.hideAllMenu} ></POLL1>
                            </div>
                        ) : null}

                    {this.state.showPoll2 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <POLL2 onHeadingClick={this.hideAllMenu} ></POLL2>
                            </div>
                        ) : null}

                    {this.state.showPoll3 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <POLL3 onHeadingClick={this.hideAllMenu} ></POLL3>
                            </div>
                        ) : null}

                    {this.state.showPoll4 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <POLL4 onHeadingClick={this.hideAllMenu} ></POLL4>
                            </div>
                        ) : null}


                    {this.state.showPoll5 ?
                        (
                            <div className={`submenu-container active expended`}>
                                { isMobileOnly ? (null) : (
                                    <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                                )}
                                <POLL5 onHeadingClick={this.hideAllMenu} ></POLL5>
                            </div>
                        ) : null}

                    {this.state.activeMenuLevel1 && this.state.activeMenuLevel1.subMenus ? (
                        <div className={`submenu-container active expended`}>
                            {/* <div className="SocialBar"><Social/></div> */}
                            <button onClick={this.hideAllMenu} className="closeBtn"><img src={CloseButton} alt="Close" width="30" height="30"></img></button>
                            <ContextSubmenu
                                menuItems={this.state.activeMenuLevel1.subMenus}
                                parentMenuItem={this.state.activeMenuLevel1}
                                onMenuItemClick={this.handleSubmenuClick}
                                canInteract={this.state.isInteractable}
                                inTransition={this.state.inTransition}
                                externalActiveItemId={this.state.subMenuActiveId}
                                resetExternalActiveItemId={this.resetSubMenuActiveId}
                                onHeadingClick={this.onHeadingClick}>
                            </ContextSubmenu>
                            )
                        </div>) : null}



                    {/* for daily co */}
                    {
                        (window.FirebaseObj.currentUser && this.state.enterbreakout) ?
                            (
                                <Dailyco
                                    menuItem={menuItems[0]}
                                    goToLobby={this.ChangeState}
                                    name={window.FirebaseObj.currentUser.displayName}
                                    roomName={window.FirebaseObj.videoCallRoomName}
                                    isAdmin={window.FirebaseObj.videoRoomAdmin}
                                    LiveParticipantListFromFirebase={this.LiveParticipantListFromFirebase}
                                    videoCallStillOn={this.canStartVideoCall}

                                >
                                </Dailyco>
                            )
                            : (null)
                    }
                    {
                        (window.FirebaseObj.currentUser && this.state.enterbreakout) ?
                            (
                               <div id='whiteboard-slider' className={`submenu-container active expended whiteboard-area`}>
                                   <iframe width="786" height="100%" src="https://miro.com/app/live-embed/o9J_l_CVxeE=/?moveToViewport=-4259,505,1165,547" frameBorder="0" scrolling="no" allowFullScreen></iframe>
                                   {/* <iframe src="https://deskle.com/dyBB2Uo" frameborder="0" width="786" height="100%" scrolling="no" allowfullscreen></iframe> */}
                                   </div>
                            )
                            : (null)
                    }


                </footer>


                { this.state.showNotification &&
                    <div className="call-end-notification">
                        {this.state.notification.line1}
                        <span>
                            {this.state.notification.line2}
                        </span>
                    </div>
                }

                {
                    this.state.showAdminNotification ?
                        (
                            <div className="call-end-notification">
                                {this.state.textContent}
                            </div>
                        ) : null
                }

                { this.state.showVideoCall && this.state.user &&
                    <VideoCall
                        userName={this.state.user.displayName}
                        room={this.state.room}
                        onCallDisconnect={this.onCallDisconnect}
                        ref={this.videoCall}
                        isMobile={isMobileOnly}
                        // isHeAdmin={this.state.isHeAdmin}
                        // userData={this.state.user}
                    ></VideoCall>
                }
                {isMobileOnly && this.state.showWarnningScreen ?
                    (
                        <div className="mobile_login_page_warnning">
                        <img src="./assets/images/keepLandscape.png"></img>
                        </div>
                    )
                    : (null)
                }
            </>
            
        );
    }
}

export default Home;
