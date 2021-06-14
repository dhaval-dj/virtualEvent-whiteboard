//Main Firebase connection API
var firebaseConfig = {
  apiKey: "AIzaSyCegGYWCtucAOBWcjwfNFW5dPQ0w5IQhks",
    authDomain: "iesa2020-summit.firebaseapp.com",
    databaseURL: "https://iesa2020-summit.firebaseio.com",
    projectId: "iesa2020-summit",
    storageBucket: "iesa2020-summit.appspot.com",
    messagingSenderId: "64912747091",
    appId: "1:64912747091:web:807a139759b6b3d30f34a6",
    measurementId: "G-F49GYNY9RD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); //Creating authentication
const db = firebase.firestore(); //Creating database connection

//Check user is logged in or not
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Log In" + user.displayName);
  } else {
    console.log("Log Out");
  }
});

const err1 = document.querySelector('#err1');
const err2 = document.querySelector('#err2');
const err3 = document.querySelector('#err3');
const err4 = document.querySelector('#err4');
const err5 = document.querySelector('#err5');
const err6 = document.querySelector('#err6');
const err7 = document.querySelector('#err7');

var city;
var country;

$.get("https://ipinfo.io?token=7772c95f95ee01", function(response) {
  console.log(response.region, response.country);
  city = response.city;
  country = response.country;
}, "jsonp")


$("#Register").on("click", function (e) {
  const name = $("#u-name").val();

  let email = $("#u-mail").val();
  email = email.toLowerCase();


  // $("#u-name").val() = "";
  // $("#u-mail").val() = "";
  // $("#u-password").val() = "";
  // $("#u-phone").val() = "";
  // $("#u-org").val() = "";
  // $("#u-designation").val() = "";
  // $("#u-location").val() = "";

  const passcode = $("#u-password").val();
  const phone = $("#u-phone").val();
  const org = $("#u-org").val();
  const designation = $("#u-designation").val();

  if( $("#u-name").val() === "")
  {
    err1.textContent = "Name cannot be blank";
    return;
  }

  if( $("#u-mail").val() === "")
  {
    err2.textContent = "Email cannot be blank";
    return;
  }

  if( $("#u-password").val() === "")
  {
    err3.textContent = "Password cannot be blank";
    return;
  }

  if( $("#u-phone").val() === "")
  {
    err4.textContent = "Phone cannot be blank";
    return;
  }

  if( $("#u-org").val() === "")
  {
    err5.textContent = "Organisation cannot be blank";
    return;
  }

  if( $("#u-designation").val() === "")
  {
    err6.textContent = "Designation cannot be blank";
    return;
  }

  if( $("#u-location").val() === "")
  {
    err7.textContent = "Location cannot be blank";
    return;
  }

  console.log($("#u-name").val());

  const imageName = "https://firebasestorage.googleapis.com/v0/b/djfarmademo.appspot.com/o/profileimages%2Fblank-avatar.png?alt=media&token=2af15226-9bd7-47ce-bc72-f3c1a12a0780";

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
          AddUserData(userInfo.displayName, userInfo.email,phone,org,userInfo.uid,designation, city+" ,"+country);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
        });
    });
});

function AddUserData(name, email, phone, org, uid, designation, location) {
  db.collection("userDatas")
    .doc(uid)
    .set({
      name: name,
      email: email,
      phone: phone,
      org: org,
      uid: uid,
      designation: designation,
      location: location
    })
    .then(() => {
      console.log("updated to profile");
      window.location = "index.html";
    });
}

//Logout call
function logOut() {
  auth.signOut().then(() => {
    console.log("Log Out");
  });
}
