//Main Firebase connection API
var firebaseConfig = {
  apiKey: "AIzaSyDGwwY2Dlyaay-XyoBh6ABIsUo4dpFS4L8",
  authDomain: "westerndigitalv2-51ea3.firebaseapp.com",
  databaseURL: "https://westerndigitalv2-51ea3.firebaseio.com",
  projectId: "westerndigitalv2-51ea3",
  storageBucket: "westerndigitalv2-51ea3.appspot.com",
  messagingSenderId: "143064858071",
  appId: "1:143064858071:web:03abe57b13062f87e7df92",
  measurementId: "G-QSDHN2G7JK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); //Creating authentication
const db = firebase.firestore(); //Creating database connection

var isShowingCapture = false;
var startEvent = false;
var finishEvent = false;
var userInfo;
var premiumMembers = [];
var onAir = false;

//Check user is logged in or not
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Log In" + user.displayName);
  } else {
    console.log("Log Out");
  }
});

$("#Register").on("click", function (e) {
  const name = $("#u-name").val();

  let email = $("#u-mail").val();
  email = email.toLowerCase();

  const passcode = $("#u-password").val();

  const imageName = $("#room-name").val();

  auth
    .createUserWithEmailAndPassword(email, passcode)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
    })
    .then(function (cred) {
      var userInfo = cred.user;
      userInfo
        .updateProfile({
          displayName: name,
          photoURL: imageName,
        })
        .then(function () {
          console.log("name Updated:" + name + "!!");
          logOut();
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
        });
    });
});

function AddUserData(Originalemail, dummyEmail, userName, passcode, uid) {
  db.collection("userDatas")
    .doc(dummyEmail)
    .set({
      Originalemail: Originalemail,
      dummyEmail: dummyEmail,
      userName: userName,
      passcode: passcode,
      uid: uid,
    })
    .then(() => {
      console.log("updated to profile DB 2");
      logOut();
      alert("done");
    });
}

//Logout call
function logOut() {
  auth.signOut().then(() => {
    console.log("Log Out");
  });
}
