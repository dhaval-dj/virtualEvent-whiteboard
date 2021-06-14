// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import axios from 'axios';
import Video from 'twilio-video';
import { FirebaseContext } from "../../firebase";
import { LocalVideoTrack, LocalAudioTrack, createLocalVideoTrack } from "twilio-video";
import swal from 'sweetalert';

class VideoCall extends Component {
    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
        this.state = {
            identity: null,
            roomId: props.room.roomId,
            roomName: props.room.roomName,
            roomIdErr: false,
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            activeRoom: null,
            audioEnabled: true,
            videoEnabled: true,
            screenShared: false,
            remoteScreenShared: false,
            currentParticipant: null,
            screenTrack: null,
            remoteScreenTrack: null
        };
        this.localMedia = null;
        this.remoteMedia = null;

        this.setLocalMediaRef = element => {
            this.localMedia = element;
        };

        this.setRemoteMediaRef = element => {
            this.remoteMedia = element;
        };


        this.joinRoom = this.joinRoom.bind(this);
        // this.handleroomIdChange = this.handleroomIdChange.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.roomJoined = this.roomJoined.bind(this);
        this.attachLocalParticipantTracks = this.attachLocalParticipantTracks.bind(this);
        this.onCameraButtonClick = this.onCameraButtonClick.bind(this);
        this.onAudioButtonClick = this.onAudioButtonClick.bind(this);
        this.shareScreen = this.shareScreen.bind(this);
        this.handleTrackEnabled = this.handleTrackEnabled.bind(this);
        this.trackUnsubscribed = this.trackUnsubscribed.bind(this);
        this.participantConnected = this.participantConnected.bind(this);
        this.participantDisconnected = this.participantDisconnected.bind(this);
        this.trackSubscribed = this.trackSubscribed.bind(this);
        this.trackUnsubscribed = this.trackUnsubscribed.bind(this);
        this.handleParticipantTrackEnabled = this.handleParticipantTrackEnabled.bind(this);
        this.handleParticipantTrackDisabled = this.handleParticipantTrackDisabled.bind(this);
        this.stopLocalScreenShare = this.stopLocalScreenShare.bind(this);
        this.startScreenShare = this.startScreenShare.bind(this);
        this._startScreenCapture = this._startScreenCapture.bind(this);
        this.handleLocalSharedScreen = this.handleLocalSharedScreen.bind(this);
        this.handleRemoteSharedScreen = this.handleRemoteSharedScreen.bind(this);
        this.stopRemoteSharedScreen = this.stopRemoteSharedScreen.bind(this);
        this.openFullscreen = this.openFullscreen.bind(this);
        this.onCallDisconnect = this.onCallDisconnect.bind(this);

        //Not user here this , but as of now using
        window.SceneManagerObj.app.fire("pausesound");
    }

    componentDidMount() {

        axios.post('https://twilioserver-dot-virtualeventdemo.el.r.appspot.com/api/token', { name: this.props.userName }).then(results => {
            const { identity, token } = results.data;
            this.setState({ identity, token });
            this.joinRoom();
        });

    }

    onCallDisconnect() {
        if (this.props.onCallDisconnect) {
            this.props.onCallDisconnect();
        }
    }


    joinRoom() {
        /*
     Show an error message on room name text field if user tries         joining a room without providing a room name. This is enabled by setting `roomIdErr` to true
       */
        console.log("Room ID" + this.state.roomId);
        if (!this.state.roomId.trim()) {
            this.setState({ roomIdErr: true });
            return;
        }

        console.log("Room Count '" + this.state.roomId.count + "'...");
        console.log("Joining room '" + this.state.roomId + "'...");
        let connectOptions = {
            name: this.state.roomId
        };

        if (this.state.previewTracks) {
            connectOptions.tracks = this.state.previewTracks;
        }

        Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {           

            if (error.message == "Room contains too many Participants") {
                this.showInfoPopUp('Hi! Our Western Digital representative is chatting with another customer at the moment. Please try again shortly. You may also post your question in the ‘Ask us’ hotspot and we will respond to you via email.');

            } 
            else if(error.message=="Requested device not found")
            {
                this.showInfoPopUp('Kindly check your webcam and microphone connection.');
            }
            else {
                console.log(error.message);
                this.showInfoPopUp('Hi! Our Western Digital representative is chatting with another customer at the moment. Please try again shortly. You may also post your question in the ‘Ask us’ hotspot and we will respond to you via email.');
            }

            this.onCallDisconnect();
        });
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

    roomJoined(room) {
        console.log("Joined as '" + this.state.identity + "'");
        this.setState({ activeRoom: room, localMediaAvailable: true, hasJoinedRoom: true });

        // display local participant tracks
        let previewContainer = this.localMedia;
        if (!previewContainer.querySelector('video')) {
            this.attachLocalParticipantTracks(room.localParticipant, previewContainer);
        }

        room.participants.forEach(participant => this.participantConnected(participant));

        // Participant joining room
        room.on('participantConnected', participant => this.participantConnected(participant));

        // Detach all participant’s track when they leave a room.
        room.on('participantDisconnected', participant => this.participantDisconnected(participant));

        // Once the local participant leaves the room, detach the Tracks
        // of all other participants, including that of the LocalParticipant.
        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach(track => {
                    track.stop();
                });
            }
            // Detach the local media elements
            room.localParticipant.tracks.forEach(publication => {
                publication.track.stop();
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
            });

            room.participants.forEach(participant => this.participantDisconnected(participant));

            this.state.activeRoom = null;
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
            this.onCallDisconnect();
        });


    }

    participantConnected(participant) {

        this.setState({ currentParticipant: participant })


        console.log()

        const div = document.createElement('div');
        div.id = participant.sid;
        div.classList.add("callingBox__video-container");

        const span = document.createElement('span')
        span.id = "caller-name";
        span.classList.add("callingBox__nameTag");
        span.innerText = participant.identity;
        div.appendChild(span);

        const videoDiv = document.createElement('div');
        videoDiv.id = "video";
        videoDiv.classList.add("callingBox__video-wrapper");
        videoDiv.classList.add("has-video");
        div.appendChild(videoDiv);

        this.remoteMedia.appendChild(div);

        participant.tracks.forEach(publication => {
            if (publication.track) {
                this.trackSubscribed([publication.track], videoDiv);
                console.log(publication.track);
            }
            publication.on('subscribed', this.handleTrackEnabled);
        });

        participant.on('trackSubscribed', track => {
            this.trackSubscribed([track], videoDiv);
            console.log(track);
        });

        participant.on('trackUnsubscribed', track => {
            this.stopRemoteSharedScreen([track]);
        });

    }



    participantDisconnected(participant) {
        console.log("Participant '" + participant.identity + "' left the room");
        document.getElementById(participant.sid).remove();
        this.setState({ currentParticipant: null })
    }

    trackSubscribed(tracks, container) {
        tracks.forEach(track => {
            if (track.name != "screen") {
                container.appendChild(track.attach());
            }
            else {
                this.handleRemoteSharedScreen([track]);
                this.stopLocalScreenShare();
            }
        });
    }

    attachLocalParticipantTracks(participant, container) {
        let tracks = Array.from(participant.tracks.values());
        tracks.forEach(publication => {
            container.appendChild(publication.track.attach());
        });
    }

    leaveRoom() {
        if (this.state.activeRoom) {
            //Update Remove User
            this.state.activeRoom.disconnect();
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
        }
    }

    handleTrackEnabled(track) {
        track.on('enabled', () => this.handleParticipantTrackEnabled(track));
        track.on('disabled', () => this.handleParticipantTrackDisabled(track));
    }

    handleParticipantTrackEnabled(track) {
        if (track.kind == 'video') {
            let video = document.getElementById("video");
            video.parentElement.classList.remove("callingBox__video-container--audio");
            video.classList.remove("d-none");
        } if (track.kind == 'audio') {
            let name = document.getElementById("caller-name");
            name.classList.add("user-speaking");
        }
    }

    handleParticipantTrackDisabled(track) {
        if (track.kind == 'video') {
            let video = document.getElementById("video");
            video.parentElement.classList.add("callingBox__video-container--audio");
            video.classList.add("d-none");
        } if (track.kind == 'audio') {
            let name = document.getElementById("caller-name");
            name.classList.remove("user-speaking");
        }
    }

    onCameraButtonClick(event) {
        event.preventDefault();

        if (this.state.activeRoom) {
            if (this.state.videoEnabled) {
                this.state.activeRoom.localParticipant.videoTracks.forEach(pub => {
                    if (pub.track.name != "screen") {
                        pub.track.disable();
                    }
                });
            } else {
                this.state.activeRoom.localParticipant.videoTracks.forEach(pub => {
                    if (pub.track.name != "screen") {
                        pub.track.enable();
                    }
                });
            }
            this.setState({ videoEnabled: !this.state.videoEnabled });
        }
    }

    onAudioButtonClick(event) {
        event.preventDefault();
        if (this.state.activeRoom) {
            if (this.state.audioEnabled) {
                this.state.activeRoom.localParticipant.audioTracks.forEach(pub => {
                    pub.track.disable();
                });
            } else {
                this.state.activeRoom.localParticipant.audioTracks.forEach(pub => {
                    pub.track.enable();
                });
            }
            this.setState({ audioEnabled: !this.state.audioEnabled });
        }
    }

    shareScreen(event) {
        event.preventDefault();
        if (this.state.activeRoom) {
            if (this.state.screenTrack == null) {
                this.startScreenShare();
            } else {
                this.stopLocalScreenShare();
            }
        }
    }

    disconnectToCurrentUser=(event)=> {
        event.preventDefault();
       console.log('X');
    }


    _startScreenCapture() {
        if (navigator.getDisplayMedia) {
            return navigator.getDisplayMedia({ video: true });
        } else if (navigator.mediaDevices.getDisplayMedia) {
            return navigator.mediaDevices.getDisplayMedia({ video: true });
        } else {
            return navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } });
        }
    }

    startScreenShare() {
        const that = this;

        this._startScreenCapture().then(function (stream) {
            const audioTracks = stream.getAudioTracks().map(track => new LocalAudioTrack(track));
            const videoTracks = stream.getVideoTracks().map(track => {
                return new LocalVideoTrack(track, { name: "screen" });
            });
            const tracks = audioTracks.concat(videoTracks);
            that.handleLocalSharedScreen(tracks);
            stream.getTracks()[0].onended = () => that.stopLocalScreenShare();
        });

    }

    stopRemoteSharedScreen(tracks) {
        this.setState({ remoteScreenShared: false });
        tracks.forEach(track => {
            track.detach().forEach(element => element.remove());
        });
    }

    handleRemoteSharedScreen(tracks) {
        this.setState({ remoteScreenShared: true });
        tracks.forEach(track => {
            document.getElementById('screen-share').appendChild(track.attach());
        })
    }

    handleLocalSharedScreen(tracks) {
        this.setState({ screenTrack: tracks });
        this.state.activeRoom.localParticipant.publishTracks(tracks);
        this.setState({ screenShared: true });
        tracks.forEach(track => {
            document.getElementById('screen-share').appendChild(track.attach());
        })
    }

    stopLocalScreenShare() {
        try {
            if (this.state.activeRoom && this.state.screenTrack && this.state.screenShared) {
                this.state.activeRoom.localParticipant.unpublishTracks(this.state.screenTrack);
                this.state.screenTrack.forEach(track => {
                    track.stop();
                    track.detach().forEach(element => element.remove())
                });
                this.setState({ screenTrack: null });
                this.setState({ screenShared: false });
            }
        } catch (e) {
            console.error(e);
        }
    }

    trackUnsubscribed(track) {
        track.detach().forEach(element => element.remove());
    }

    openFullscreen() {
        let elem = document.getElementById("screen-share").children[1];

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }


    render() {
        console.log(this.props);
        return (
            <>
                <section className="callingBox">
                    <header className="headerBox headerBox__gradient">
                        <div className="link-btn link-btn--left">
                            <img src="assets/images/flipkart-logo.png" alt="" />
                            <span>{this.props.room.roomName}</span>
                        </div>
                    </header>
                    <div className={`shared-screenBox has-video ${this.state.screenShared || this.state.remoteScreenShared ? "active" : ""}`} id="screen-share">
                        <button className="full-screen-btn" onClick={this.openFullscreen}>
                            <i className="icon-full-screen"></i>
                        </button>
                    </div>

                    <div className={`callingBox__video-wrapper ${this.state.screenShared || this.state.remoteScreenShared ? "shared-active" : ""}`}>
                        <div className={`callingBox__video ${this.state.currentParticipant ? "" : "d-none"}`} ref={this.setRemoteMediaRef}
                            id="remote-media">
                        </div>
                        <div id="local-media" ref={this.setLocalMediaRef}
                            className={`callingBox__video img-bg has-video ${this.state.videoEnabled ? "" : "d-none"}`}>
                            <span className="callingBox__nameTag">{this.props.userName}</span>
                        </div>
                    </div>
                    <div className="callingBox__buttons callingBox__buttons__gradient">
                        <div className="link-btn link-btn--left">
                            <img src="assets/images/flipkart-logo.png" alt="" />
                            <span>{this.props.room.roomName}</span>
                        </div>
                        <ul className="callingBox__buttons-list">
                            <li>
                                <button className="icon-btn" onClick={this.onCameraButtonClick}>
                                    <i className={this.state.videoEnabled ? 'icon-video-btn' : 'icon-video-btn-mute'}></i>
                                </button>
                            </li>
                            <li>
                                <button className="icon-btn icon-btn--red" onClick={this.leaveRoom}>
                                    <i className="icon-phone"></i>
                                </button>
                            </li>
                            <li>
                                <button className="icon-btn" onClick={this.onAudioButtonClick}>
                                    <i className={this.state.audioEnabled ? 'icon-mic-btn' : 'icon-mic-btn-mute'}></i>
                                </button>
                            </li>
                        </ul>

                        {//If Mobile Not show Screen share
                            this.props.isMobile ? null :
                                (
                                    <>
                                        <button onClick={this.shareScreen} className="link-btn"><i className="icon-external-link"></i>
                                            <span>{!this.state.screenShared ? "Share your screen" : "Stop sharing"}</span></button>

                                            <button onClick={this.shareScreen} className="link-btn"><i className="icon-external-link"></i>
                                            <span>{!this.state.screenShared ? "Share your screen" : "Stop sharing"}</span></button>
                                    </>
                                )
                        }
 

                    </div>

                </section>

            </>
        );
    }

}

export default VideoCall;

