import React, { Component } from "react";
import Logout from "./Logout";
import { FirebaseContext } from "../firebase";
import Firebase, { dbx, authx, storage } from "../firebase/firebase";
import swal from 'sweetalert';
import { relativeTimeThreshold } from "moment";

var num;
class Profile extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: "",
      progress: 0,
      user: {},
      profileUrl: "",
      mobileNumber: 0,
      roomId: "",
      roomName: "",
      startTime: "",
      endTime: "",
      userId: "",
      cname:'',
      place:''
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.openAgenda = this.openAgenda.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("Profile")
    this.authLis = this.context.auth.onAuthStateChanged((user) => {
      //image = user.photoURL;
      if (user) {
        this.setState({ user })
        this.getProile();
        this.getCallData();
      } else {
        this.setState({ user: null })
      }
    });
  }

  componentWillUnmount() {
    this.authLis();
  }

  Logout() {
    authx.signOut();
    //window.location.reload(false);
    window.location.href = "/index.html";
  }

  updateProfile(event) {
    event.preventDefault();
    //this.setState({ ...INITIAL_STATE });
    var userData = this.context.auth.currentUser;
    // console.log(userData.photoURL);
    var profile = {};
    if (this.state.url.length > 0) {
      profile.photoURL = this.state.url;
      this.context.updatePhoto(this.context.auth.currentUser, this.state.url);
    }

    // if (this.state.user.displayName) {
    //   profile.displayName = this.state.user.displayName;
    // }
    // if (this.state.mobileNumber > 0) {
    //   this.context.updateMobileNumber(this.context.auth.currentUser, this.state.mobileNumber);
    //   profile.mobileNumber = this.state.mobileNumber;
    // }

    console.log(profile);
    if (profile) {
      userData.updateProfile(profile).then(function () {
        console.log("Profile Updated");
        swal("Profile Updated Successfully");

      }).catch(function (error) {
        console.log("Profile Updated");
      });

      userData.updateEmail(this.state.user.email).then(function () {
        console.log("Email Updated");
        swal("Profile Updated Successfully");
        Logout();
      }).catch(function (error) {
        // An error happened.
        console.log("Email Updated");
        swal("Please Logout and Login Again!");

      });
    }
  }

  handleUpload = (e) => {
    const image = e.target.files[0];
    const uploadTask = storage.ref(`profileimages/${image.name}`).put(image);
    let self=this;
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("profileimages")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            console.log(url);
          
            var user =  this.context.auth.currentUser;
            user.updateProfile({
              photoURL: url
            }).then(function() {
              // Update successful.
              self.context.updatePhoto(self.context.auth.currentUser, self.state.url);
              console.log('Update successful.');
            }).catch(function(error) {
              // An error happened.
            });

            var pic = document.getElementById('photoX');
            pic.setAttribute('src', this.state.url);
          });
      }
    );
  };

  handleChange = e => {
    const target = e.target
    this.setState(current => ({
      user: { ...current.user, [target.name]: target.value }
    }));
  };

  handlePhoneChange = e => {
    const target = e.target
    this.setState(current => ({
      mobileNumber: target.value
    }));
  };

  getProile = async () => {
    const userDoc = await this.context.db.collection("users").doc(this.state.user.uid).get();
    if (userDoc.data()) {

      const data = userDoc.data();
      console.log(data.mobileNumber);
      num = data.mobileNumber;

      this.setState({
        mobileNumber: data.mobileNumber,
        photoUrl: data.photoUrl,
        cname:data.company,
        place:data.place

      });
    }
  }

  getCallData = async () => {
    const callDoc = await this.context.db.collection("flipkartcallroom").doc(this.state.user.email).get();
    if (callDoc.data()) {

      const data = callDoc.data();

      this.setState({
        roomId: data.roomId,
        roomName: data.roomName,
        startTime: data.startDateTime,
        endTime: data.endDateTime,
        userId: data.userId
      });
    }
  }

  openAgenda(event) {
    this.props.hideMenu();
    window.canvasManager.showAgenda();
  }


  showMyScores = e => {
    window.canvasManager.createProfileLeaderBoard();
  };


  render() {

    return (
      <>
        <div className="second-level-nav">
        <h3 className="second-level-nav__title pd-l15">My Profile</h3>
          <div className="profile-picture">
            <h3 className="profile-picture__title">
              <button onClick={this.Logout} className="profile-picture__title-btn">Log out</button>
            </h3>
            <div className="profile-picture__image">
                        <img src={this.state.user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/djfarmademo.appspot.com/o/profileimages%2Fblank-avatar.png?alt=media&token=2af15226-9bd7-47ce-bc72-f3c1a12a0780'} alt="Profile Pic" id="photoX" />
                    </div>
                    {/* <input className="inputfile inputfile-1" onChange={this.handleUpload} type="file" accept="image/*" />
                    <label htmlFor="file-1"><span>Select Profile Image</span></label> */}

                    <input type="file" onChange={this.handleUpload} name="files" id="file-1" className="inputfile inputfile-1" accept="image/*" />
						        <label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>Select Profile Image</span></label>


                    <p>nbsp</p>
                    {/* <a className="profile-picture__changelink" href="">Change profile picture</a> */}

                </div>
                  <form onSubmit={this.updateProfile}>
                      <div className="profile-details">
                          <div className="profile-details__block">
                              <h3 className="profile-details__title pd-t10 pd-b10">Name</h3>
                              <div className="form-group">
                                  <input readOnly className="form-control pd-r30" name="displayName" onChange={this.handleChange} type="text" value={this.state.user.displayName || ''} placeholder="Name" />
                                  {/* <button className="form-control__btn"><i className="icon-times"></i></button> */}
                              </div>
                          </div>
          
                          <div className="profile-details__block">
                              <h3 className="profile-details__title pd-t10 pd-b10">Company</h3>
                              <div className="form-group">
                                  <input readOnly className="form-control" name="email" onChange={this.handleChange} type="email" value={this.state.cname || ''} placeholder="E C Id" />
                                 
                              </div>
                          </div>

                     

                          <br></br>
                          {/* <div className="show-my-score">
                            <div className="show-my-text">Your Score</div>
                            <div className="show-my-number">1234</div>
                          </div> */}

                          {/* <div className="show-leader-boder" onClick={this.showMyScores}>
                            Show Leader board
                          </div> */}

                          {/* <button type="hidden" className="btn btn-primary">Save</button>         */}
                      </div>
                    </form>
                   
            </div>
      </>
    );
  }
}

export default Profile;