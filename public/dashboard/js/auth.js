const db = firebase.firestore();

//----------check----------------//    
 auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log( user.email + " Signed In");
        useAdminCheck(user.uid);
    //  logoutPreviousUser();
      } else {
        console.log("Nobody is Signed In");
    }
  });

  //-------------logout-------------//
  function logoutUser()
  {
    document.querySelector("#error").innerHTML="* Not A Admin User";
      auth.signOut().then(() => {
          //show not a admin user
        }).catch(function(error) {
          console.log('error happened while signing out');
        });
  }
//----------Login--------------//
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log("loggedIn");
        var err = document.querySelector("#error"); 
        
        err.style.display = "none";
        useAdminCheck(cred.user.uid);
        loginForm.reset();
      }).catch(function(error) {
        var err = document.querySelector("#error"); 
        err.style.display = "block";
        if(error.code === "auth/wrong-password")
        {
          err.innerHTML ="* Please enter the correct user name";
        }
        else
        {
          err.innerHTML ="*"+error.code;
        }
        console.log("code: "+error.code+" & ErrorMsg: "+error.message);  
    });

});



function useAdminCheck(userUid)
{
  firebase.firestore().collection('Admin').doc('AdminUsers').get().then(doc =>{
    const docData = doc.data();
    adminArray = docData.adminUID;
      
    if(!adminArray.includes(userUid)){
      logoutUser();
    }else
    {
      document.querySelector("#error").innerHTML="";
      window.location.href = "/polldashboard/index.html";
    }
}).catch(function(error){
  console.log(error);
});
}

