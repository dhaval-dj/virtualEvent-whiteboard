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
    this.db = firebase.firestore();
};


FirebaseController.prototype.signIn = function(email, password) {
        this.auth.signInWithEmailAndPassword(email, password).then( function(cred){
       
            }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        //console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);  
    });  
};
