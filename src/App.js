// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "./App.css";
import { Route, HashRouter, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { FirebaseContext } from "./firebase";
import { createHashHistory } from "history";
import { authx, rdbx, rdatabasex, dbx } from "./firebase/firebase";
import LandscapeMessage from './components/landscapeMessage';
import { isMobileOnly, isTablet, isIPad13 } from 'react-device-detect';

export const history = createHashHistory();

class App extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    this.state = 
    {
      update: false
    }
  }
  componentDidMount() {
    var self = this;
    this.listener = this.context.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          console.log(authUser.email);
          this.context.currentUser = authUser;
          self.validUser(authUser);

          this.context.db.collection("iesacallroom").doc(authUser.email).get().then(function(doc) {
            if (doc.exists) {
                console.log("iesacallroom data exisit");
            } else {
                // doc.data() will be undefined in this case
                console.log("iesacallroom, No such document!, new data added");
                dbx.collection("iesacallroom").doc(authUser.email).set({
                    userId: authUser.email,
                    email: authUser.email,
                    endDateTime: "July 17, 2021 04:30 PM",
                    roomId: "roomX",
                    roomName: "roomX",
                    startDateTime: "July 17, 2019 04:30 PM"
                })
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });



        } else {
          console.log("user not logged in");
          history.push("/login");
        }
      });

    
  }

  UserOnlineTest = (user) => 
  {
    var self = this;
    var users = this.context.database.ref().child('loggedInUser').child(user.uid);
    var query = users.orderByChild('state');
    query.once("value", snapshot => {
      if (snapshot.exists()) {
        // console.log("old user");
        const userData = snapshot.val();
        console.log("status:", userData.state);

        if (userData.state === "online") {
          console.log("Already Signed In");
          self.context.auth.signOut();
          self.context.alreadyLoggedIn = true;
          history.push("/login");
          
          this.setState({
            update: true
          });
          // history.push({
          //   pathname: '/login',
          //   state: { online: true}
          // })
        } else {
          // console.log("user camer back");
          self.validUser(user);
        }
      } else {
        // console.log("first time user");
        self.validUser(user);
      }
    });
  }

  validUser(user)
  {
    this.updateUserStatus(user);
    this.context.alreadyLoggedIn = false;
    this.context.checkUserAdmin();          //for daily co
    this.context.GetUserRoomCanEnterData();
    // this.context.checkForAnalytics();
    history.push("/home");
    //window.location = 'success1.html';

  }

  updateUserStatus(user)
  {
    const uid = user.uid;
    const userStatusDatabaseRef = this.context.database.ref('/loggedInUser/' + uid);
    const WD_USER_MY_CURRENT_STATUS = this.context.database.ref('/WD_USER_MY_CURRENT_STATUS/' + uid);

    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: this.context.app.database.ServerValue.TIMESTAMP,
    };
    const isOnlineForDatabase = {
        state: 'online',
        last_changed: this.context.app.database.ServerValue.TIMESTAMP,
    };
  
    this.context.database.ref('.info/connected').on('value', function(snapshot) {
        if (snapshot.val() == false) {
          return;
        };
        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        userStatusDatabaseRef.set(isOnlineForDatabase);
        });
        WD_USER_MY_CURRENT_STATUS.onDisconnect().update(isOfflineForDatabase).then(function() {
          WD_USER_MY_CURRENT_STATUS.update(isOnlineForDatabase);
        });
    });
  }
 

  componentWillUnmount() {
    this.listener();
    // clearInterval(this.timer);
  }

  render() {
    return (
      <>
        {isMobileOnly ?
          (
            <LandscapeMessage>
            </LandscapeMessage>
          )
          : (null)
        }

        <HashRouter>
          <Route exact path="/">

            <Redirect to="/loader" />
          </Route>
          <Route path="/login" render={(props) => <Login {...props} alreaylogged={this.context.alreadyLoggedIn} />} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/contact" component={Contact} />
          <Route path="/home" component={Home} />
        </HashRouter>
      </>);
  }
}

export default App;




