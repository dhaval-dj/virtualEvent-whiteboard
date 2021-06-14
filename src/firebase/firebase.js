import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

/* var config = {
  apiKey: "AIzaSyBhdh9CxOMr3eHM4A4Jn_PGC2QwDin2CEQ",
  authDomain: "westerndigitalsummit.firebaseapp.com",
  databaseURL: "https://westerndigitalsummit.firebaseio.com",
  projectId: "westerndigitalsummit",
  storageBucket: "westerndigitalsummit.appspot.com",
  messagingSenderId: "46282701331",
  appId: "1:46282701331:web:d3251149a482b331071de6",
  measurementId: "G-SCLKRXM7X5"
}; */
var config = {
  apiKey: "AIzaSyDGwwY2Dlyaay-XyoBh6ABIsUo4dpFS4L8",
  authDomain: "westerndigitalv2-51ea3.firebaseapp.com",
  databaseURL: "https://westerndigitalv2-51ea3.firebaseio.com",
  projectId: "westerndigitalv2-51ea3",
  storageBucket: "westerndigitalv2-51ea3.appspot.com",
  messagingSenderId: "143064858071",
  appId: "1:143064858071:web:03abe57b13062f87e7df92",
  measurementId: "G-QSDHN2G7JK"
};

// ********** QnA **********//

  app.initializeApp(config);
  const authx = app.auth();
  const dbx = app.firestore();
  const storage = app.storage();
  const rdbx = app.database();
  const rdatabasex = app.database;

// ********** QnA **********//

class Firebase {
  constructor() {
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
    this.firestore = app.firestore();
    this.database = app.database();
    this.alreadyLoggedIn = false;
    // var firebaseRef = app.database().ref();
    // eslint-disable-next-line no-undef
    // this.firechat = new Firechat(firebaseRef);
    window.FirebaseObj = this;
    // console.log("++++++++");
    // console.log(this.firechat);
    this.currentUser = null;

     //videocall region dailyco
     this.isAllowedTownHall = false;
     this.videoRoomAdmin = false;
     this.videoCallRoomName = "";
     this.homeVideoPrepareFunction = null;
     this.uservalidforcall=false;
     this.breakoutroomname=[]; 
     this.audicanenter=1;
     this.breakoutcanenter=1;
     this.breakoutsessionbelongs=1;
     this.breakoutcallstartnormaluser1=false;
     this.breakoutcallstartnormaluser2=false;
     this.breakoutsessionnumber=1;
     this.audistatus=1;
     this.expohallstatus=1;
     this.meetingstatus=1;
     this.workshopstatus=1;    
     this.usermultiroom=[]; 
     this.uservalidformultiroom=false;

  }
  
  getFirestore = () => {
    return this.firestore;
  };

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // doSignInWithEmailAndPassword = (email, password) =>
  // this.auth.signInWithEmailAndPassword(email, password).then((cred) => {

  //   // var query = rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid);
  //   // query.once("value").then(function(snapshot) {
  //   //   if(snapshot.val() !== null){
  //   //     //user already exist in analytics table
  //   //     console.log("Already Exist");
  //   //   }else{
  //   //     console.log("New Entry");
  //   //     rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid).set({
  //   //       Email: authx.currentUser.email,
  //   //       Login_Time: rdatabasex.ServerValue.TIMESTAMP,
  //   //       Session_Visit_Count: "0",
  //   //       LnD_Connect1_Visit_Count: "0",
  //   //       LnD_Connect2_Visit_Count: "0",
  //   //       LnD_Connect3_Visit_Count: "0",
  //   //       Info_Desk_Visit_Count: "0",
  //   //       Photo_Mosaic_Visit_Count: "0",
  //   //       Runner_Game_Visit_Count: "0",
  //   //       Social_Wall_Visit_Count: "0",
  //   //       Meeting_Visit_Count: "0",
  //   //       Current_Room: "none"
  //   //     });
  //   //     rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Login_Time').once('value').then(function(snapshot){
  //   //       var mDate = (snapshot.val());
  //   //       var myDate = new Date(mDate);
  //   //       rdbx.ref('/user_analytics_flipkart/' + authx.currentUser.uid + '/Login_Time').set(myDate.toString());
  //   //     });
  //   //   }
  //   // });
  // }).catch(function(error) {
  //   var err = document.querySelector("#error"); 
  //   err.style.display = "block";
  //   if(error.code === "auth/wrong-password")
  //   {
  //     err.innerHTML ="* Please enter the correct user name";
  //   }
  //   else
  //   {
  //     err.innerHTML ="*"+error.code;
  //   }
  //   console.log("code: "+error.code+" & ErrorMsg: "+error.message);  
  // });

  doSignOut = () => {
    this.auth.signOut();
  };

  //change according to your need 
  //filetag refers to  <input type="file" value="upload" id="fileButton" /> here
  uploadImage = (fileTag) => {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const file = fileTag.files[0];
    const storageRef = app.storage().ref('profileImages/' + file.name)
    const task = storageRef.put(file, metadata);
    let photoURL;
    task.on('state_changed',
      function progress(snapshot) {

      },
      function error(er) {
        console.log(er.code);
      },
      function complete() {
        console.log("Upload complete");
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at ', downloadURL);
          photoURL = downloadURL;
        });
      });
  };

  updatePhoto = async (user, photo) =>{
    try
    {
      const updatedPhoto = await app.firestore().collection("users").doc(user.uid).update({
        photoUrl: photo
      })
      console.log("updated photo succefully");
    }catch(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
    }
  };

  //please pass the user returned from the firebase auth function calls and new name to be updated
  updateName = async (user, newName) => {
    try
    {
      const updatedUser =  await user.updateProfile({
        displayName: newName
        })
        console.log("name Updated:"+ newName +"!!");
    }catch(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
    }
  };

  //please pass the user returned from the firebase auth function calls and new mobile number to be updated
  updateMobileNumber = async (user, mobileNumber) =>{
    try
    {
      const updatedDoc = await app.firestore().collection("users").doc(user.uid).update({
        mobileNumber: mobileNumber
      })
      console.log("updated mobile Number succefully");
    }catch(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
    }
  };


  WrongCredentialRegister(dummyEmail, passcode,errorcode) {
    console.log("updated to profile DB 2"); 
    let tempemail = dummyEmail+" :-"+Math.floor(Math.random() * Math.floor(100000));
    let self=this; 
    self.db.collection("wrongcredentry")
      .doc(tempemail)
      .set({      
        email: dummyEmail,        
        password: passcode,  
        status: errorcode,      
      })
      .then(() => {
        console.log("updated to profile DB 2");   
      });
  }

  //Rishabh Start
    user_AnalyticsHandler = async (sV, sM) =>{}
  //Rishabh End

    // for daily co

    checkUserAdmin = async () => {
      if (this.currentUser) {
        try {  
            // await GetRoomNameAndAdmin_method1();
            await this.GetRoomNameAndAdmin_method2();
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  
    GetUserRoomCanEnterData()
    {
      let self=this;     
      try { 

        this.db.collection('users').doc(this.currentUser.uid).get().then(function(doc) {
            const data = doc.data()     
            self.uservalidforcall=data.uservalidforcall;   
            self.breakoutcanenter =data.breakoutcanenter; 
            self.breakoutsessionbelongs=data.breakoutsessionbelongs;   
            self.usermultiroom = data.usermultirooms;  
            self.uservalidformultiroom = data.uservalidformultiroom;  
          //  self.audicanenter =data.audicanenter;
        
    }).catch(function(error) {
        console.log("Error getting cached document:", error);
    });
      }
      catch (err) {
        console.log("some error");  
        console.log(err);
      }
    }

    GetRoomNameAndAdmin_method2 = async() =>
    {
      console.log("came in method 2");
      try {
       const videoCallDocs = await app.firestore().collection("dailyco").where("members","array-contains",this.currentUser.uid).get();
       console.log("this is undefined");
       if(videoCallDocs !== undefined)
       {
        console.log("this is not undefined");
         if(!videoCallDocs.empty)
         {
           console.log("this is not empyt");
            if(videoCallDocs.docs.length >= 1)
            {  
              console.log("Can go to TownHall");
              // console.log(videoCallDocs);
              // console.log(this.currentUser.uid); 
              this.isAllowedTownHall = true;
              var data = videoCallDocs.docs[0].data();
              var adminArray = data.admin;
              const index = adminArray.indexOf(this.currentUser.uid);
              if(index !== -1)
              {
                this.videoRoomAdmin = true;             
              }else
              {
                this.videoRoomAdmin = false;
              }
              this.videoCallRoomName = data.roomName;
              window.ReactHomeManager.GetCallStartStatusforStreamVideo();
                console.log(this.videoRoomAdmin, this.videoCallRoomName);
               if(this.homeVideoPrepareFunction)
               {
                 this.homeVideoPrepareFunction();
               }
            }
         }else
          {
            // console.log("Can not go to TownHall");
            this.isAllowedTownHall = false;
          }
       }
  
      }
      catch (err) {
        console.log("some error");
  
        console.log(err);
      }
    }
  
    // end of dailyco

    
  // user_ActiveStatus = async () =>{
  //   var uid = authx.currentUser.uid;
  //     var userStatusDatabaseRef = rdbx.ref('/user_analytics/' + uid + '/State/');
  //     console.log(userStatusDatabaseRef)

  //     var isOfflineForDatabase = {
  //         State_mode: 'offline',
  //         Last_changed: rdatabasex.ServerValue.TIMESTAMP,
  //     };

  //     var isOnlineForDatabase = {
  //         State_mode: 'online',
  //         Last_changed: rdatabasex.ServerValue.TIMESTAMP,
  //     };

  //     rdbx.ref('.info/connected').on('value', function(snapshot) {
  //     if (snapshot.val() == false) {
  //       return;
  //     };
  //       userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
  //       userStatusDatabaseRef.set(isOnlineForDatabase);
  //       });
  //     });
  // };

}

export default Firebase;
export {dbx, authx, storage, rdbx, rdatabasex};



// import app from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
// import "firebase/database";

// const config = {
//   apiKey: "AIzaSyCNgHoMr9vtnL_HRHTHnjhFAyo52TuY0kA",
//   authDomain: "djfarmademo.firebaseapp.com",
//   databaseURL: "https://djfarmademo.firebaseio.com",
//   projectId: "djfarmademo",
//   storageBucket: "djfarmademo.appspot.com",
//   messagingSenderId: "83133899785",
//   appId: "1:83133899785:web:c7dae77a3d8ff05b6084d8",
//   measurementId: "G-BNZQKXERYQ",
// };
// // ********** QnA **********//

//   app.initializeApp(config);
//   const authx = app.auth();
//   const dbx = app.firestore();
//   const storage = app.storage();

// // ********** QnA **********//



// class Firebase {
//   constructor() {
    
//     this.auth = app.auth();
//     this.db = app.firestore();
//     this.firestore = app.firestore();
//     this.database = app.database();
//     var firebaseRef = app.database().ref();
//     // eslint-disable-next-line no-undef
//     this.firechat = new Firechat(firebaseRef);
    
//     console.log("++++++++");
//     console.log(this.firechat);
//   }
  
//   getFirestore = () => {
//     return this.firestore;
//   };

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => {
//     this.auth.signOut();
//   };

//   //change according to your need 
//   //filetag refers to  <input type="file" value="upload" id="fileButton" /> here
//   uploadImage = (fileTag) => {
//     const metadata = {
//       contentType: 'image/jpeg'
//     };
//     const file = fileTag.files[0];
//     const storageRef = app.storage().ref('profileImages/' + file.name)
//     const task = storageRef.put(file, metadata);
//     let photoURL;
//     task.on('state_changed',
//       function progress(snapshot) {

//       },
//       function error(er) {
//         console.log(er.code);
//       },
//       function complete() {
//         console.log("Upload complete");
//         task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//           console.log('File available at ', downloadURL);
//           photoURL = downloadURL;
//         });
//       });
//   };

//   updatePhoto = async (user, photo) =>{
//     try
//     {
//       const updatedPhoto = await app.firestore().collection("users").doc(user.uid).update({
//         photoUrl: photo
//       })
//       console.log("updated photo succefully");
//     }catch(error)
//     {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
//     }
//   };

//   //please pass the user returned from the firebase auth function calls and new name to be updated
//   updateName = async (user, newName) => {
//     try
//     {
//       const updatedUser =  await user.updateProfile({
//         displayName: newName
//         })
//         console.log("name Updated:"+ newName +"!!");
//     }catch(error)
//     {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
//     }
//   };

//   //please pass the user returned from the firebase auth function calls and new mobile number to be updated
//   updateMobileNumber = async (user, mobileNumber) =>{
//     try
//     {
//       const updatedDoc = await app.firestore().collection("users").doc(user.uid).update({
//         mobileNumber: mobileNumber
//       })
//       console.log("updated mobile Number succefully");
//     }catch(error)
//     {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log("code: "+errorCode+" & ErrorMsg: "+errorMessage);
//     }
//   };
  

// }

// export default Firebase;
// export {dbx, authx, storage};
