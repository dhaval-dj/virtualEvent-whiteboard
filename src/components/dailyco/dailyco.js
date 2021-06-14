import React, { Component } from "react";
import { FirebaseContext } from "../../firebase";
import { AppString } from "../../firebase/const";
import axios from 'axios';
import DailyIframe from '@daily-co/daily-js';
import swal from 'sweetalert';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";

const imagesDir = "/assets/images/dailyco/png/";
const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/djfarmademo.appspot.com/o/profileimages%2Fblank-avatar.png?alt=media&token=2af15226-9bd7-47ce-bc72-f3c1a12a0780";
class Dailyco extends Component {
    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
        this.state = {
            isVideoOn: false,
            isAudioOn: false,
            isScreenSharing: false,
            hasAccess: false,
            hasRequestedAccess: false,
            hasJoinedCall: false,
            callEnded: false,
            update: false,
            menuItem: this.props.menuItem,
            show: false,
            videoCallStillOn: false,
            joincallfortextchange:false,
        }

        this.name = this.props.name;
        this.isAdmin = this.props.isAdmin;
        this.roomName = this.props.roomName;
       
    
        this.getProgileImages = true;
    //    this.serverlinkTesting = "http://localhost:8080/generateToken";
     //   this.serverlinkProduction = "https://videoconferenceserver-dot-virtualeventdemo.el.r.appspot.com/generateToken";

        this.serverlinkProduction = "https://vidconserver.virtualeventdemo.com/generateToken";
        this.LiveParticipantListFromFirebase = new Map();
        this.LiveParticipantListFromDailyco = new Map();
        this.ScreenSharingParticipant = "";
        this.session_id = "";
        //#region admin variables
        this.pendingRequestIDs = [];
        this.accessAllowedIDs = [];
        this.showAccessControls = [];
        this.timerAccessControl = new Map();
        this.participants = [];
        this.isInit = false;
        this.requestAccessTime = 30000;
        //#endregion
        window.DailycoManager = this;
    //    console.log("adfsadf safasdf dsakfklewouroiweioruwerwerwe");
    };

    //#region react lifeCycleFunctions

  /*  componentDidMount() {
        if(this.context.isAllowedTownHall)
        {
      //      console.log("Daily co component ", this.roomName);
        //    this.suscribeToUserCollection();
            toast.configure();
        }
    }
*/
    componentWillUnmount() {
    //    console.log("unmounting call");
        this.unsuscribeToUserCollection();
        window.DailycoManager = null;
        var iframeDiv = document.getElementById('video-iframe');
        
        if (!this.state.callEnded) {
            if(iframeDiv)
            {
                iframeDiv.remove();
            } 
        }
    }

    componentWillReceiveProps(newProps) {
  //     console.log("daily co props updated, :" + newProps.videoCallStillOn);
        if(newProps.videoCallStillOn !== undefined)
        {
            this.setState({
                videoCallStillOn: newProps.videoCallStillOn
            })
        }

        if(newProps.LiveParticipantListFromFirebase !== undefined)
            this.LiveParticipantListFromFirebase = newProps.LiveParticipantListFromFirebase;
    }

    goToLobby(event) {
        let menuItem={
            id:"backToLobby",
        };
        let menu = menuItem;
        this.props.goToLobby(event, menu);
    }

    //#endregion

    //--------------------------------------------------Firebase Function-------------------------------------------------------//
    //#region Firebase Function
    suscribeToUserCollection = () => {
        var self = this;
        this.LiveParticipantListFromFirebase.clear();

        this.lisenter = this.context.db
            .collection("dailyco")
            .doc(this.roomName)
            .onSnapshot(function (doc) {
                if (doc.data()) {
             //       console.log("Firebase Current data: ", doc.data());
                    const users = doc.data().users;
                    users.forEach(user => {
                        let userInfo =
                        {
                            userid: user.userid,
                            imageUrl: user.imageUrl
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

    unsuscribeToUserCollection = () => {
        if (this.lisenter) {
            this.lisenter();
        }
    }

    saveSessionId = (sessionId) => {

        let sessionMap = {
            sessionId: sessionId,
            userid: this.context.currentUser.uid,
            imageUrl: this.context.currentUser.photoURL
        }
        // console.log("Session Map", sessionMap);
        this.context.db
            .collection("dailyco")
            .doc(this.roomName)
            .update({
                users: this.context.app.firestore.FieldValue.arrayUnion(sessionMap)
            })
            .then(function () {
        //        console.log("user is updated");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    removeParticipantFromFirebase = (participant) => {
        if (this.LiveParticipantListFromFirebase.has(participant.session_id)) {
            const savedParticipant = this.LiveParticipantListFromFirebase.get(participant.session_id);
            let userInfo =
            {
                sessionId: participant.session_id,
                userid: savedParticipant.userid,
                imageUrl: savedParticipant.imageUrl
            }

        } else {
      //      console.log("this Id has not been found in local system");
        }
    }
    //#endregion

    //-----------------------------------------------------List Function--------------------------------------------------------//
    //#region List function
    getUserImageLink(sessionId) {
        if (this.LiveParticipantListFromFirebase.has(sessionId)) {
            return this.LiveParticipantListFromFirebase.get(sessionId).imageUrl;
        }
    }

    getUserid(sessionId) {
        if (this.LiveParticipantListFromFirebase.has(sessionId)) {
            return this.LiveParticipantListFromFirebase.get(sessionId).userid;
        } else {
            return false;
        }
    }

    addParticipant(participant) {
        //check if it local user then no need to add participant to list
        if (!participant.local) {
            this.LiveParticipantListFromDailyco.set(participant.session_id, participant);
    //        console.log(this.LiveParticipantListFromDailyco);
        }
    }

    removeParticipant(participant) {
        //check if it local user then no need to update list
        if (!participant.local) {
            this.LiveParticipantListFromDailyco.delete(participant.session_id);
            if (participant.session_id === this.ScreenSharingParticipant) //this was the person sharing screen remove it from screenSharing Participant
            {
                this.ScreenSharingParticipant = "";
            }
     //       console.log(this.LiveParticipantListFromDailyco);
        }
    }

    changeOrder(participant) {
        let participantID = participant.session_id;
        var allowedIDsIndex = this.accessAllowedIDs.indexOf(participantID);
        if (allowedIDsIndex !== -1) {
            if (participant.video || participant.audio || participant.screen) {
                this.accessAllowedIDs.splice(allowedIDsIndex, 1);
                this.accessAllowedIDs.push(participantID);

                // if (participant.screen)
                // {
                //     this.showNotification(participant.user_name, " Started ScreenSharing", 3000, true);
                // }
                // else if (participant.video)
                //     this.showNotification(participant.user_name, " Started Video Camera", 3000, true);

            }
        }
    }

    isParticipantUpdated(newParticipantData, session_id) {
        if (this.LiveParticipantListFromDailyco.has(session_id)) {
            let oldParticipantData = this.LiveParticipantListFromDailyco.get(session_id);
            if (oldParticipantData.audio === newParticipantData.audio && oldParticipantData.screen === newParticipantData.screen && oldParticipantData.video === newParticipantData.video) {
        //        console.log("Same Participant data is Duplicated!!");
                return false;
            }
            else {
     //           console.log("Same Participant data is updated!!");
                this.LiveParticipantListFromDailyco.set(session_id, newParticipantData);
                return true;
            }

        } else {
            return false;
        }

    }
    //#endregion

    //-----------------------------------------------------Dailyframe Function--------------------------------------------------//
    //#region Dailyframe Function

    initializeDailyco() {     
        if (this.state.callEnded) {
            this.setState({
                isVideoOn: false,
                isAudioOn: false,
                isScreenSharing: false,
                hasAccess: false,
                hasJoinedCall: false,
                callEnded: false,
                update: false,
                show: true
            });
        }else
        {
            this.setState({
                show: true
            });
        }

        this.pendingRequestIDs = [];
        this.accessAllowedIDs = [];
        this.showAccessControls = [];
        this.timerAccessControl.clear();
        this.LiveParticipantListFromFirebase.clear();
        this.LiveParticipantListFromDailyco.clear();
        this.participants = [];

        // if (this.getProgileImages) {
        //     this.name = this.context.currentUser.displayName;
        //     this.isAdmin = this.context.videoRoomAdmin;
        // }

        var self = this;
   //     console.log( self.name, self.isAdmin, self.roomName);

        // get the access token from the server
        axios.get(this.serverlinkProduction, {
            params: {
                name: self.name,
                admin: self.isAdmin,
                roomName: self.roomName
            }
        }).then(res => {
    //        console.log("getting response back");
   //         console.log(res.data);
            self.SetupIframe(res.data); //passing token to the setupIframe function
        })
    }

    SetupIframe = async (token) => {
        var self = this;
        if (token === undefined || token === null)
            return;

        var iframeDiv = document.getElementById('video-iframe');
        if (!iframeDiv) {
            setTimeout(() => {
                this.SetupIframe(token)
            }, 500)
            return;
        }

        if (!iframeDiv) {
            return;          
        }

        this.callFrame = DailyIframe.wrap(
            iframeDiv,
            { customLayout: true }
        );


        this.callFrame
            .on("joining-meeting", this.updateEvent)
            .on("joined-meeting", this.updateEvent)
            .on("left-meeting", this.updateEvent)
            .on("participant-joined", this.updateEvent)
            .on("participant-updated", this.updateEvent)
            .on("participant-left", this.updateEvent)
            .on("app-message", this.requestEvent)
            .on("error", this.updateEvent);

        await this.callFrame.join({
            url: `https://digitaljalebi.daily.co/${self.roomName}?t=${token}`,
            cssFile: "assets/css/dailyco/demo-css-grid.css"
        });

        this.setState({
            hasJoinedCall: true
        });
    //    console.log(" You have joined meeting");
    }

    removeLisenters() {
        this.callFrame
            .off("joining-meeting", this.updateEvent)
            .off("joined-meeting", this.updateEvent)
            .off("left-meeting", this.updateEvent)
            .off("participant-joined", this.updateEvent)
            .off("participant-updated", this.updateEvent)
            .off("participant-left", this.updateEvent)
            .off("app-message", this.requestEvent)
            .off("error", this.updateEvent);
    }

    EndCall() {
        this.setState({
            isVideoOn: false,
            isAudioOn: false,
            isScreenSharing: false,
            hasAccess: false,
            hasJoinedCall: false,
            callEnded: true
        });
        this.EndCallViaMenu();
    }
    EndCallViaMenu()
    {
        this.removeLisenters();
        this.callFrame.leave();
    }

    EndCallForEveryOne = async () => {        
        let participants = this.callFrame.participants();
        var emptyArray = [];       
        await this.context.db.collection("dailyco").doc(this.roomName).update({
            users: emptyArray,
            callStarted: false
        })

        Object.keys(participants).forEach(session_id => {
            if (session_id === "local") {
                return;
            }
            this.ejectParticipant(session_id);
            this.pendingRequestIDs = [];
            this.accessAllowedIDs = [];
            this.showAccessControls = [];
            this.timerAccessControl.clear();
            this.LiveParticipantListFromFirebase.clear();
            this.LiveParticipantListFromDailyco.clear();
            this.participants = [];
        });
    }

    startCallForEveryOne = async () =>
    {
        
        try
        {
        var emptyArray = [];
        await this.context.db.collection("dailyco").doc(this.roomName).update({
            users: emptyArray,
            callStarted: true
        })
        console.log("video call started" +this.roomName);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    //#endregion

    //-----------------------------------------------------Common Events--------------------------------------------------------//
    //#region Common Events
    showEvent(event) {
        console.log("-------------Show video call event----------");
        if (event.action) {
            switch (event.action) {
                default:
                    console.log(event.action + " : ");
                    console.log(event);
                    break;
            }
        }
        console.log("----------------XX-----------------------");
    }

    updateEvent = async (event) => {
        let participant = this.callFrame.participants();
        if (event) {
            if (event.action) {
               // console.log("-------------video call event----------");
              //  console.log(event)
              //  console.log(participant.user_name+"dafasfsaf ");
                switch (event.action) {
                    case "joining-meeting":
                        this.state.joincallfortextchange=true;
                        //#region points noted
                        //can show user the UI changes according to this //no major data is returned in event
                        //#endregion
                        console.log("joining meeting : ");
                        console.log(event);
                        break;
                    case "joined-meeting":
                        //#region points noted
                        //when finaly call has been joined 
                        // return all participants along with local participant unique- userid, sessionid  
                        // at this time take your seesion id save it to the firebase --X 
                        // add a lisenter so that everytime from same room if added or removed you will be notified
                        //#endregion
                        if (this.isAdmin) {
                            this.joinedMeetingEvent(event);
                        }
                      
                        this.session_id = event.participants.local.session_id;
                        if (this.getProgileImages) {
                            this.saveSessionId(event.participants.local.session_id);
                        }
                        break;
                    case "participant-joined":
                        //#region points noted
                        //add to your list 
                        // this is called even before joined meeting is called for already present users
                        //only single participant will be returned in event
                        //#endregion
                       
                        this.addParticipant(event.participant);
                        this.showNotification(event.participant.user_name, " joined the Call", 3000, true);
                        break;
                    case "participant-updated":
                        //#region points noted
                        //change in UI -- if needed
                        // it will not add it as new user but it will update the existing one
                        //#endregion

                        if (!this.isParticipantUpdated(event.participant, event.participant.session_id)) {
                            return;
                        }
                                         
                        if (event.participant.screen) {
                            if (this.ScreenSharingParticipant.length > 0) {
                                // console.log(this.ScreenSharingParticipant);
                            } else {
                                this.ScreenSharingParticipant = event.participant.session_id;

                                if (this.session_id === event.participant.session_id) {
                                    this.showNotification("", "You Started ScreenSharing", 3000, true);
                                } else {
                                    this.showNotification(event.participant.user_name, " Started ScreenSharing", 3000, true);
                                }
                            }

                        } else {
                            if (this.ScreenSharingParticipant.length > 0) {
                                if (event.participant.session_id === this.ScreenSharingParticipant) {
                                    this.ScreenSharingParticipant = "";
                                }
                            }
                        }

                        if (event.participant.video) {
                            // this.showNotification(event.participant.user_name, " Started Video Camera", 3000, true);
                        }

                        if (this.isAdmin)
                            this.changeOrder(event.participant);
                        break;
                    case "participant-left":
                        //#region points noted
                        //remove from your list 
                        // from admin access remove the user info from the firestore (this can be last step as a clean up)
                        //only single participant will be returned in event
                        //#endregion
                        // if(this.isAdmin)
                        // {
                        //     this.removeParticipantFromFirebase(event.participant);
                        // }
                       
                        this.removeParticipant(event.participant);

                        let activeUserNumber = Object.keys(participant).length;
                        if (activeUserNumber > 1) {
                            this.showNotification(event.participant.user_name, " Left The Call", 3000, true);
                        }
                        else {
                            this.showNotification(" ", "EveryBody Left The Call", 3000, true);
                        }
                        break;
                    case "left-meeting":
                        console.log("you have been disconnected from the call");

                        this.EndCall();

                    case "error":
                        if (event.errorMsg) {
                            if (event.errorMsg === "Meeting has ended") {
                                console.log("Secodn check, you have been disconnected from the call");
                                if (!this.state.callEnded) {
                                    this.setState({
                                        isVideoOn: false,
                                        isAudioOn: false,
                                        isScreenSharing: false,
                                        hasAccess: false,
                                        hasJoinedCall: false,
                                        callEnded: true
                                    });
                                }
                            }
                        }
                    default:
                        console.log(event.action + " : ");                     
                        break;
                }
                console.log("---------------------------------------");
            }
        }

        let tmp_isScreenSharing = false, tmp_isVideoOn = false, tmp_isAudioOn = false;
        if (participant.local) {
            //check for local ScreenShare
            if (participant.local.screen && !this.state.isScreenSharing) {
                tmp_isScreenSharing = true;
            } else if (!participant.local.screen && this.state.isScreenSharing) {
                tmp_isScreenSharing = false;
            } else {
                tmp_isScreenSharing = participant.local.screen;
            }
            //check for video access
            if (this.callFrame.localVideo()) {
                tmp_isVideoOn = true
            } else {
                tmp_isVideoOn = false;
            }
            //check for audio access
            if (this.callFrame.localAudio()) {
                tmp_isAudioOn = true;
            } else {
                tmp_isAudioOn = false;
            }
            this.setState({
                isScreenSharing: tmp_isScreenSharing,
                isVideoOn: tmp_isVideoOn,
                isAudioOn: tmp_isAudioOn
            });
        }
    }

    requestEvent = async (event) => {
        console.log("received request event: ");
        console.log(event);

        if (this.isAdmin) {
            const fromID = event.fromId;
            const data = event.data.data;
            if (data === 'access-request') {
                console.log("access-request");
                if (this.accessAllowedIDs.includes(fromID)) {
                    this.setAccess(fromID, true);
                }
                else {
                    console.log("pending request");
                    if (!this.pendingRequestIDs.includes(fromID)) {
                        console.log("pending request added");
                        this.pendingRequestIDs.push(fromID);
                        this.updateEvent(event);

                        if (this.LiveParticipantListFromDailyco.has(event.fromId)) {
                            let userName = this.LiveParticipantListFromDailyco.get(event.fromId).user_name;
                            this.showNotification(userName, " Has Requested Access", 4000, false);
                        }

                        var self = this;
                        setTimeout(() => {
                            var pendingIDsIndex = self.pendingRequestIDs.indexOf(fromID);
                            if (pendingIDsIndex !== -1) {
                                this.pendingRequestIDs.splice(pendingIDsIndex, 1);
                                this.updateEvent(event);
                            }
                        }, self.requestAccessTime);

                    } else {
                        var pendingIDsIndex = this.pendingRequestIDs.indexOf(fromID);
                        if (pendingIDsIndex !== -1) {
                            this.pendingRequestIDs.splice(pendingIDsIndex, 1);
                            this.pendingRequestIDs.push(fromID);
                            this.updateEvent(event);
                            if (this.LiveParticipantListFromDailyco.has(fromID)) {
                                let userName = this.LiveParticipantListFromDailyco.get(fromID).user_name;
                                this.showNotification(userName, " Has Requested Access", 4000, false);
                            }
                        }
                    }
                    //have to change the look in the UI for pending people
                }
            }
        } else {
            if (event.data.allowed === true) {
                swal({
                    title: "You Have Been Granted Access From The Admin",                  
                    text: "Please activate the camera & microphone by clicking on icons on the bottom of the control panel. You may have to grant the permission by clicking allow on the browser popup.",
                    icon: "success",
                    className: "video-swal-modal",
                    button: "Okay",
                });
                this.setState({
                    isVideoOn: false,
                    isAudioOn: false,
                    isScreenSharing: false,
                    hasAccess: true,
                    hasRequestedAccess: false
                });
            }
            else if (event.data.allowed === false) {
                if (this.state.hasAccess) {
                    swal({
                        title: "Your Access Request Has Been Revoked By Admin",
                        icon: "info",
                        className: "video-swal-modal",
                        button: "Okay",
                    });
                    if (this.state.isScreenSharing) {
                        this.callFrame.stopScreenShare();
                        this.setState({
                            isVideoOn: false,
                            isAudioOn: false,
                            isScreenSharing: false,
                            hasAccess: false,
                            isScreenSharing: false
                        });
                        return;
                    }
                }
                this.setState({
                    hasAccess: false,
                    hasRequestedAccess: false
                });
            }
        }
    }

    sendAccessRequest() {
        if (!this.state.hasJoinedCall) {
            return;
        }
        console.log("Request sent!!");
        this.callFrame.sendAppMessage({ data: 'access-request' });
    }
    //#endregion


getCameraOnCount()
{
    let cameraOnCount = 0;
    let participants = this.callFrame.participants();
    Object.keys(participants).forEach(session_id => {
        const participant = participants[session_id];
        if(participant.video)
        {
            cameraOnCount += 1;
        } 
    });
    return cameraOnCount;
}

requestVideoAccess() {
    if (!this.state.hasJoinedCall) {
        return;
    }

    if (this.isAdmin) {
        if(!this.callFrame.localVideo())
        {
            let count = this.getCameraOnCount();
            // count += 6;
            if(count < 6)
            {
                this.callFrame.setLocalVideo(!this.callFrame.localVideo());
                this.setState({
                    isVideoOn: !this.callFrame.localVideo()
                });
            }
            else
            {
                swal({
                    title: "Your camera can not be turned on right now as six camera's are already on",
                    icon: "info",
                    className: "video-swal-modal",
                    button: "Okay",
                });
            }
        }else
        {
            this.callFrame.setLocalVideo(!this.callFrame.localVideo());
            this.setState({
                isVideoOn: !this.callFrame.localVideo()
            });
        }
        
    }
    else {
        if (this.callFrame.localVideo()) {
            this.callFrame.setLocalVideo(false);
            this.setState({
                isVideoOn: false
            });
        }
        else {
            if (this.state.hasAccess) {
                // check for number of participant
                let count = this.getCameraOnCount();
                // count += 6;
                // console.log(count);
                if(count < 6)
                {
                    this.callFrame.setLocalVideo(true);
                    this.setState({
                        isVideoOn: true
                    });
                }
                else
                {
                    swal({
                        title: "Your camera can not be turned on right now as six camera's are already on",
                        icon: "info",
                        className: "video-swal-modal",
                        button: "Okay",
                    });
                }
                
            }
            else {
                
                if(!this.state.hasRequestedAccess)
                {
                    var self = this;
                    setTimeout(function(){
                        self.setState({
                            hasRequestedAccess: false
                        });
                    }, self.requestAccessTime);
                    self.setState({
                        hasRequestedAccess: true
                    });
                    this.sendAccessRequest();
                }
               

            }
        }
    }
}

    requestAudioAccess() {
        if (!this.state.hasJoinedCall) {
            return;
        }
        if (this.isAdmin) {
            this.callFrame.setLocalAudio(!this.callFrame.localAudio());
            this.setState({
                isAudioOn: !this.callFrame.localAudio()
            });
        } else {
            
            if (this.callFrame.localAudio()) {
                this.setState({
                    isAudioOn: false
                });
                this.callFrame.setLocalAudio(false);
            }
            else {
                if (this.state.hasAccess) {
                    this.setState({
                        isAudioOn: true
                    });
                    this.callFrame.setLocalAudio(true);
                }
                else {
                    swal("Send Access Request!!", "Want To Send Access Request To The Admin", "success").then((value) => {
                        this.sendAccessRequest();
                    });
                }
            }
        }
    }

    adminToggleShareScreen = async () => {

        if (!this.state.isScreenSharing) {
            this.callFrame.startScreenShare();
            this.setState({
                isScreenSharing: true
            });
        } else {
            console.log("admin share off!");
            this.callFrame.stopScreenShare();
            this.setState({
                isScreenSharing: false
            });
        }
    }

    requestShareAccess(event) {
        if (!this.state.hasJoinedCall) {
            return;
        }

        //if somebody is already sharing the screen
        if (!this.state.isScreenSharing) {
            if (this.ScreenSharingParticipant.length > 0) {
                if (this.LiveParticipantListFromDailyco.has(this.ScreenSharingParticipant)) {
                    var participant = this.LiveParticipantListFromDailyco.get(this.ScreenSharingParticipant);
                    this.showNotification(participant.user_name, " Is Already Sharing The Screen", 3000, true);
                } else {
                  //  console.log(this.ScreenSharingParticipant);
                    this.showNotification(" ", "Someone Is Already Sharing The Screen", 3000, true);
                }
             //   console.log("somebody is sharong the screem!!");
                return;
            }
        }

        if (this.isAdmin) {
            this.adminToggleShareScreen();
        } else {
            if (this.state.isScreenSharing) {
              //  console.log("isShare is oFF");
                this.setState({
                    isScreenSharing: false
                });
                this.callFrame.stopScreenShare();
            }
            else {
                if (this.state.hasAccess) {
                    this.setState({
                        isScreenSharing: true
                    });
                    this.callFrame.startScreenShare();
                }
                else if (window.confirm("Request admin to turn on screen sharing?")) {
                    this.sendAccessRequest();
                }
            }
        }
    }
    //#endregion

    //-----------------------------------------------------Admin functions -----------------------------------------------------//
    //#region Admin Function
    setAccess(participantID, isAllowed) {
        if (!this.isAdmin) {
            return;
        }
        if (isAllowed) {
            // update UI 
            var allowedIDsIndex = this.accessAllowedIDs.indexOf(participantID);
            if (allowedIDsIndex == -1) {
                this.accessAllowedIDs.push(participantID);
            }

            var pendingIDsIndex = this.pendingRequestIDs.indexOf(participantID);
            if (pendingIDsIndex !== -1) {
                this.pendingRequestIDs.splice(pendingIDsIndex, 1);
              //  console.log("removed from pendingRequests");
              //  console.log(this.pendingRequestIDs);
            }
            this.callFrame.sendAppMessage({ allowed: true }, participantID);
            this.updateEvent();
        }
        else {
            //change UI
            var allowedIDsIndex = this.accessAllowedIDs.indexOf(participantID);
            if (allowedIDsIndex !== -1) {
                this.accessAllowedIDs.splice(allowedIDsIndex, 1);
           //     console.log(participantID, "removed from allowedAccess");
            }

            var pendingIDsIndex = this.pendingRequestIDs.indexOf(participantID);
            if (pendingIDsIndex !== -1) {
                this.pendingRequestIDs.splice(pendingIDsIndex, 1);
         //       console.log(participantID, "removed from pendingRequests");
            }

            this.callFrame.updateParticipant(participantID, { setVideo: false, setAudio: false });
            this.callFrame.sendAppMessage({ allowed: false }, participantID);

            this.setState({
                update: false
            });
        }
    }

    showControls = (session_id) => {
        if (session_id) {
            if (session_id === this.session_id) {
                return;
            }
            if (this.timerAccessControl.has(session_id)) {
                this.setState({
                    update: false
                });
                let timer = this.timerAccessControl.get(session_id)
                clearTimeout(timer);
                this.timerAccessControl.delete(session_id);
            }
            else {
                var self = this;

                let timer = setTimeout(() => {
                    if (session_id) {

                        if (self.timerAccessControl.has(session_id)) {
                            self.timerAccessControl.delete(session_id);
                        }
                        this.setState({
                            update: false
                        });
                    }
                }, 8000);

                this.timerAccessControl.set(session_id, timer);
                this.setState({
                    update: false
                });
            }
        } else {
        //    console.log("session id is not valid");
        }
    }

    toggleParticipantAccess(participantID) {
        let allowedIDsIndex = this.accessAllowedIDs.indexOf(participantID);
        if (allowedIDsIndex == -1) {
            this.setAccess(participantID, true);
       //     console.log("giving access");
        }
        else {
            this.setAccess(participantID, false);
        //    console.log("taking back access");
        }
    }

    ejectParticipant(participantID) {
        let allowedIDsIndex = this.accessAllowedIDs.indexOf(participantID);
        if (allowedIDsIndex != -1) {
            this.accessAllowedIDs.splice(allowedIDsIndex, 1);
        }
        this.callFrame.updateParticipant(participantID, { eject: true });
        this.removeParticipant(participantID);
    }

    cancelRequest(participantID) {
        this.setAccess(participantID, false);
    }

    initAccess = async (event) => {
     //   console.log('init access');

        let participants = this.callFrame.participants();

        Object.keys(participants).forEach(participant => {
            if (participant === "local") {
                return;
            }
            if (participants[participant].video || participants[participant].audio || participants[participant].screen || participants[participant].owner) {
                if (!this.accessAllowedIDs.includes(participant)) {
                    this.accessAllowedIDs.push(participant);
                }
            }
        });
        this.updateEvent(event);
    }
    //#endregion


   
    //-----------------------------------------------------Admin Events --------------------------------------------------------//
    //#region Admin Events
    joinedMeetingEvent(event) {
        if (!this.isInit && this.isAdmin) {
            this.isInit = true;
            this.initAccess(event);
        }
        this.showEvent(event);
    }
    //#endregion

    //-----------------------------------------------------Render Functions ----------------------------------------------------//
    //#region render Functions
    renderSingleParticipant = (session_id, participant, userType) => {

        let imageUrl = this.getUserImageLink(session_id);
        imageUrl = imageUrl ? imageUrl : defaultImageUrl;
        var colorClass = "";
        var notificationClass = "notification-hide";
        var infoMessage = "";
        //Only Admin Time UI changes
        if (this.isAdmin) {
            switch (userType) {
                case "allowed":
                    if (participant.video || participant.audio || participant.screen) {
                        colorClass = "CameraHaveAccess.png";//green-image";
                        infoMessage = "Take Access Back";
                        notificationClass = "notification-green";
                    }
                    else {
                        colorClass = "Camera.png";//blue-image";
                        infoMessage = "Take Access Back";
                        notificationClass = "notification-blue";
                    }
                    break;
                case "pending":
                    colorClass = "CameraReqAccess.png";//yellow-image";
                    infoMessage = "Give Access";
                    notificationClass = "notification-yellow";
                    break;
                case "default":
                    colorClass = "CameraNetural.png";
                    infoMessage = "Give Access";
                    break;
            }

        }

        let showParticipantContol = false;

        if (this.timerAccessControl.has(session_id)) {
            showParticipantContol = true;
        }

        if (!this.isAdmin) {
            return (
                <>
                <a key={`${session_id}`} data-tip data-for={session_id} className="participantBadge">
                    <div className="participantBadge-user"  key={`${session_id}`} id={`${session_id}`} onClick={(event) => { this.showControls(session_id) }} >
                        <img src={`${imageUrl}`} className={this.isAdmin ? 'participantImageAdmin' : "participantImage"} />
                        {(this.isAdmin && showParticipantContol) ?
                        (<div id="controls" className="participantControls">


                            <a data-tip data-for="AccessInfo">
                                <img className="control " id="video-button" onClick={(event) => this.toggleParticipantAccess(session_id)} src={`${imagesDir}${(colorClass)}`} />
                            </a>
                            <ReactTooltip id='AccessInfo' getContent={() => infoMessage} />

                            <a data-tip data-for="KickOutInfo">
                                <img className="control" id="audio-button" onClick={(event) => this.ejectParticipant(session_id)} src={imagesDir + "Kick.png"} />
                            </a>
                            <ReactTooltip id='KickOutInfo'>
                                <span>End Call For user</span>
                            </ReactTooltip>

                            {/* <img className="icon-close control " id="share-button" onClick={(event) => this.cancelRequest(session_id)} /> */}
                        </div>)
                        : (null)}
                    <div className="participantName">
                        {`${participant.user_name ? `${(userType === "self") ? "(ME)" : ""}` : "unknown"} ${participant.user_name.toUpperCase()}`}
                    </div>
                    </div>
                </a>
                <ReactTooltip id={session_id} getContent={() => participant.user_name} />
                </>
            );
        } else {
            return (
                <div className="participantBadge" key={`${session_id}`} id={`${session_id}`} onClick={(event) => { this.showControls(session_id) }} >
                    <img src={`${imageUrl}`} className={this.isAdmin ? 'participantImageAdmin' : "participantImage"} />


                    {(this.isAdmin && showParticipantContol) ?
                        (<div id="controls" className="participantControls">


                            <a data-tip data-for="AccessInfo">
                                <img className="control " id="video-button" onClick={(event) => this.toggleParticipantAccess(session_id)} src={`${imagesDir}${(colorClass)}`} />
                            </a>
                            <ReactTooltip id='AccessInfo' getContent={() => infoMessage} />

                            <a data-tip data-for="KickOutInfo">
                                <img className="control" id="audio-button" onClick={(event) => this.ejectParticipant(session_id)} src={imagesDir + "Kick.png"} />
                            </a>
                            <ReactTooltip id='KickOutInfo'>
                                <span>End Call For user</span>
                            </ReactTooltip>

                            {/* <img className="icon-close control " id="share-button" onClick={(event) => this.cancelRequest(session_id)} /> */}
                        </div>)
                        : (null)}
                    <div className="participantName">
                        {`${participant.user_name ? `${(userType === "self") ? "(ME)" : ""}` : "unknown"} ${participant.user_name}`}
                    </div>
                    <span className={`notification ${notificationClass}`}></span>
                </div>
            );
        }
    }

    asyncForEachReverse = (array, callback) => {
        for (let index = array.length - 1; index > -1; index--) {
            //   await callback(array[index], index, array);
            callback(array[index], index, array);
        }
    }

    renderParticipantList = () => {
        let participantsValues = [];
        let participants = this.callFrame.participants();

        participantsValues.push(this.renderSingleParticipant(participants.local.session_id, participants.local, "self"));

        if (this.isAdmin) {
            var self = this;
            this.asyncForEachReverse(this.accessAllowedIDs, function (session_id) {
                if (session_id in participants) {
                    const participant = participants[session_id];
                    participantsValues.push(self.renderSingleParticipant(session_id, participant, "allowed"));
                }
            });

            this.asyncForEachReverse(this.pendingRequestIDs, function (session_id) {
                if (session_id in participants) {
                    const participant = participants[session_id];
                    participantsValues.push(self.renderSingleParticipant(session_id, participant, "pending"));
                }
            });
        }

        Object.keys(participants).forEach(session_id => {
            if (session_id === "local") {
                return;
            }
            else if (this.accessAllowedIDs.indexOf(session_id) > -1) {
                return;
            } else if (this.pendingRequestIDs.indexOf(session_id) > -1) {
                return;
            }

            const participant = participants[session_id];
            participantsValues.push(this.renderSingleParticipant(session_id, participant, "default"));
        });

        return participantsValues;
    }

    renderHeaderText()
    {      
        if(this.isAdmin && this.state.hasJoinedCall)
        {
            return (
               "1:1 Meeting"
            );
        }
       else 
        {            
            if(!this.state.hasAccess && !this.isAdmin)
            {              

                if(this.state.hasRequestedAccess)
                {
                    return (
                        "Request sent. This may take up to 30 seconds Please do no press back."
                     );
                }
                else{

                    if(this.state.joincallfortextchange)
                    {
                        return (
                            "Connected to the room. Please click on 'Ask for Access.'"
                         );
                    }
                    else{

                    return (
                        "1:1 Meeting"
                     );

                    }
                }                
            }
            else{
                return (
                    "1:1 Meeting"
                 );
            }
            
        }

     

    }

    renderVideoConferenceUI() {
        if (this.state.hasJoinedCall) {

            let participant = this.callFrame.participants();
            let activeUserNumber = Object.keys(participant).length;
            if (activeUserNumber > 1) {
                return (
                    <div className="videoConference-section">
                        {this.renderParticipantList()}
                    </div>
                );
            } else {
                return (
                    <div className="uiMessgaes">
                        Waiting For Others To Join....
                    </div>
                );
            }
        } else if (this.state.callEnded) {
            return (
                <>
                <div className="uiMessgaes">
                    {this.state.videoCallStillOn ? (`You Have Been Disconnected`):(`Video Call Ended`) } 
                </div>
                <div id="controlsParent">
                   {this.state.videoCallStillOn && ((window.FirebaseObj.breakoutsessionnumber==window.FirebaseObj.breakoutsessionbelongs) || window.FirebaseObj.breakoutcanenter==4 || window.FirebaseObj.videoRoomAdmin) ? (<button className="rejoinButton" onClick={(event) => this.initializeDailyco()} >Rejoin </button>):(null) } 
                    <button className="rejoinButton" onClick={(event) => this.goToLobby(event)} >Back </button>
                </div>
                </>
            );
        } else {
            return (
                <div className="uiMessgaes">
                    Connecting you to the meeting room. This may take a few seconds. Please wait...
                    <br>                 
                    </br>
                    <br>                 
                    </br>                  
                    <p className=""> Please do not press back. </p>
                   
                </div>
               
            );
        }
    }

    showNotification(name, message, time, removePreviousOne) {
        toast.dismiss();
        let toastPosition;
        if(window.screen.width < 700)
        {
            toastPosition = toast.POSITION.TOP_LEFT;
        }else{
            toastPosition = toast.POSITION.BOTTOM_LEFT;
        }
        this.toastId = toast(`${name} ${message}`, {
            position: toastPosition,//"bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            transition: Zoom
        });
    }
    //#endregion

    checkValue()
    {
    //    console.log("value : ", this.state.show);
    }

    render() {

        return (
            <>
                {(!this.state.show) ? (null):
                (<>
                    <div id={`dailycoslider`} className={`submenu-container active expended`}>
                        {/* <a href="#" className="footer__logo show-on-desktop">
                            <img src="assets/images/logos/logo.png" alt="" />
                        </a> */}
                          
                    <div className="second-level-nav">
                   
                    <h3 className="second-level-nav__title has-icon titleButtonMenu DailycoTitleMenu">                      
                   
                    {this.renderHeaderText()}                    
                     
                        {(this.isAdmin && this.state.hasJoinedCall)
                        ? (
                            <>
                            {(this.state.videoCallStillOn)?
                            <button className="EndAllCallButton" onClick={(event) => this.EndCallForEveryOne(event)} >End Conference</button>
                            : <button className="EndAllCallButton" onClick={(event) => this.startCallForEveryOne(event)} >Start Conference</button>                           
                            }
                            </>
                        )
                        : (null)}
                    </h3>
                    {this.renderVideoConferenceUI()}
                    {(this.state.hasJoinedCall) ?
                        ((!this.state.hasAccess && !this.isAdmin) ?
                            (
                               
                                <div id="controlsParent">
                                  <div id="controls" className="contolBox">
                                        <button className={ (this.state.hasRequestedAccess)?("accessButton-requested"):("accessButton")} onClick={(event) => { this.requestVideoAccess() }}>{ (this.state.hasRequestedAccess)?("Request Sent"):("Ask For Access")}  </button>
                                    </div>
                                </div>
                            )
                            : (
                                <div id="controlsParent">
                                    <div id="controls" className="contolBox">
                                        <a data-tip data-for="CallEndInfo">
                                            <img className={`control`} id="endCall-button" onClick={(event) => this.EndCall()} src={imagesDir + "EndCAll.png"} />
                                        </a>
                                        <ReactTooltip id='CallEndInfo'>
                                            <span>End Call</span>
                                        </ReactTooltip>

                                        <div id="basicControls">

                                            <a data-tip data-for="CameraInfo">
                                                <img className="control" src={`${imagesDir}${(this.state.isVideoOn) ? "cameraButton.png" : "cameraButtonClosed.png"}`} id="video-button" onClick={(event) => this.requestVideoAccess()} />
                                            </a>
                                            <ReactTooltip id='CameraInfo' getContent={() => (this.state.isVideoOn) ? "Turn Camera Off" : "Turn Camera On"} />

                                            <a data-tip data-for="MicInfo">
                                                <img className="control" src={`${imagesDir}${(this.state.isAudioOn) ? "Mic.png" : "MicClosed.png"}`} id="audio-button" onClick={(event) => this.requestAudioAccess()} />
                                            </a>
                                            <ReactTooltip id='MicInfo' getContent={() => (this.state.isAudioOn) ? "Turn Mic Off" : "Turn Mic On"} />

                                            <a data-tip data-for="SSInfo">
                                                <img className="control" src={`${imagesDir}${(this.state.isScreenSharing) ? "ScreenShareOn.png" : "ScreenShare.png"}`} id="share-button" onClick={(event) => this.requestShareAccess(event)} />
                                            </a>
                                            <ReactTooltip id='SSInfo' getContent={() => (this.state.isScreenSharing) ? "Turn ScreenShare Off" : "Turn ScreenShare On"} />

                                        </div>
                                    </div>
                                </div>
                            ))
                        : (null)}
                </div>
                <ToastContainer ></ToastContainer>
                </div>
                </>)}
            </>
        );
    }
}

export default Dailyco;
