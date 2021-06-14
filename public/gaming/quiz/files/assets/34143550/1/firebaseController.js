var FirebaseController = pc.createScript('firebaseController');

var firebaseControllerInstance;

FirebaseController.prototype.initialize = function() {
    var self = this;
    console.log("FFFF");
    firebaseControllerInstance = this;

    this.auth= window.auth;
    this.db= window.db;

    this.auth.onAuthStateChanged( function(user) {
      if (user) {
          console.log( user.email + ' is logged');
          firebaseControllerInstance.user = user;
          self.app.fire("firebaseInit");
//           firebaseControllerInstance.getScore("InfinityRunner", 15, function(list){
//               console.log(list);
//           }, function(error){
//               console.log(error);
//           });
          
//           firebaseControllerInstance.getUserTopScore("InfinityRunner", function(data){
//               console.log(data);
//           }, function(error){
//               console.log(error);
//           });
          // firebaseControllerInstance.logout();
         // firebaseControllerInstance.randomNewScore();
      }else{
        console.log("No user is logged in");
          firebaseControllerInstance.login("BLR0012@fk.com","BLR0012");
      }
    });
};

FirebaseController.prototype.update = function(dt) {
    
};

 
FirebaseController.prototype.login = function(email, password){
    var self = this;
    this.auth.signInWithEmailAndPassword(email, password).then( function(cred){
        console.log(cred.user.email + " is logged in right now");
            }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);  
    });  
};

FirebaseController.prototype.logout = function()
{  
    this.auth.signOut().then(function() {
    console.log('user signed out');
    }).catch(function(error) {
    console.log('error happened while signing out');
    });
};

FirebaseController.prototype.randomNewScore = function (){
    var score = Math.floor(Math.random() * 100);
    console.log(score);
     firebaseControllerInstance.setNewScore("InfinityRunner", score,false, firebaseControllerInstance.user, function(){
              console.log("SCoreUpadted");
          }, function(error){
              console.log("Error!!", error); 
          });
};



FirebaseController.prototype.updateUserScore=function(gameName, gameScore,userAuthObject)
{
    firebaseControllerInstance.db.collection(gameName).doc(userAuthObject.uid).set({
        id: userAuthObject.uid,
        name: userAuthObject.displayName,
        email:userAuthObject.email,
        score: gameScore,
    }).then(function(){
        console.log("update Success");

       

    }).catch(function(error){
        console.log("error  in update data");
    });
};

FirebaseController.prototype.setNewScore = function (gameName, gameScore, userAuthObject){
    
    if(!userAuthObject)
    {
        console.log("error  in getting user data!!");
        return;
    }
    let self=this;


    firebaseControllerInstance.db.collection(gameName)
        .doc(firebaseControllerInstance.user.uid)
        .get()
        .then(function(doc){
            if(doc.exists)
            {
                let myCScore=doc.data().score;
                if(myCScore  < gameScore)   
                {
                    self.updateUserScore(gameName, gameScore,userAuthObject);
                }    
            }else{
                self.updateUserScore(gameName, gameScore,userAuthObject);
            }
         }).catch(function(error){
             console.log(error);
         });
         
         let rdb_day = window.rdb.ref('/LeaderBoardUserData/' + userAuthObject.uid + '/' +GetDate()+'/');
         let rdb_combin = window.rdb.ref('/LeaderBoardUserData/' + userAuthObject.uid + '/allData/');

       

         rdb_day.update({ ['InfinityRunner']:true });
         rdb_combin.update({ ['InfinityRunner']:true });
};

function GetDate()
{
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let Today=d.getDate()+"-"+days[d.getDay()]+"-"+months[d.getMonth()]+"-2020";
    return Today;
}

FirebaseController.prototype.setShare = function (gameName, scoreshare, userAuthObject, updateCallback, failureCallback){
    
    if(!userAuthObject)
    {
        console.log("error  in getting user data!!");
        return;
    }
    
    firebaseControllerInstance.db.collection(gameName).doc(userAuthObject.uid).update({
         
         isShare: scoreshare,
     }).then(function(){
         if(updateCallback)
         {             
             updateCallback();
         }
     }).catch(function(error){
         if(failureCallback)
         {
             failureCallback(error);             
         }
     });
};

FirebaseController.prototype.getScore = function (gameName, listSize, updateCallback, failureCallback){
    
    firebaseControllerInstance.db.collection(gameName)
        .orderBy("score", "desc")
        .limit(listSize)
        .get()
        .then(function(snapshot){
        console.log(snapshot);
        
        var docs = snapshot.docs;
        var responseArray = [];
        
        snapshot.forEach(function (doc) {
            responseArray.push(doc.data());
        });
        
         if(updateCallback)
         {             
             updateCallback(responseArray);
         }
        
         }).catch(function(error){
             if(failureCallback)
             {
                 failureCallback(error);             
             }
         });
};

FirebaseController.prototype.getUserTopScore = function (gameName, updateCallback, failureCallback){
    
    firebaseControllerInstance.db.collection(gameName)
        .doc(firebaseControllerInstance.user.uid)
        .get()
        .then(function(doc){
            if(doc.exists)
            {
                 if(updateCallback)
                 {             
                     updateCallback(doc.data());
                 }    
            }
         }).catch(function(error){
             if(failureCallback)
             {
                 failureCallback(error);             
             }
         });
};

