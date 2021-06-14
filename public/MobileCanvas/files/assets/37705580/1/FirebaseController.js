var FirebaseController = pc.createScript('firebaseController');

var firebaseInstance;
// initialize code called once per entity
FirebaseController.prototype.initialize = function() {
    var self  = this;
    firebaseInstance = this;
    this.initializeFirebase();
};

FirebaseController.prototype.initializeFirebase = function() {
    
var firebaseConfig = {
  apiKey: "AIzaSyBjNxBYxeK4kRO3Nw_bM8mHFhWof3vowy4",
  authDomain: "djistest-f1ae1.firebaseapp.com",
  databaseURL: "https://djistest-f1ae1.firebaseio.com",
  projectId: "djistest-f1ae1",
  storageBucket: "djistest-f1ae1.appspot.com",
  messagingSenderId: "978964816786",
  appId: "1:978964816786:web:fb5ca7022d87b20143d74b",
  measurementId: "G-X7TC7B5W4E"
};
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
};


FirebaseController.prototype.signIn = function(email, password) {
        this.auth.signInWithEmailAndPassword(email, password).then( function(cred){
       
            }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);  
    });  
};
