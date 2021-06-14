//const db = firebase.firestore();
var adminArray;
//----------check----------------//    
 auth.onAuthStateChanged(function(user) {
    if (user)
     {
            console.log( user.email + " Signed In");

            firebase.firestore().collection('Admin').doc('AdminUsers').get().then(doc =>{
                const docData = doc.data();
                adminArray = docData.adminUID;
                  
                if(!adminArray.includes(user.uid)){
                  logoutUser();
                }else
                {
                  document.querySelector(".main").style.display = "block";
                }
            }).catch(function(error){
              console.log(error);
            });
      } 
      else 
      {
       // redirect();
      }
  });

function logoutUser()
{
    auth.signOut().then(() => {
        redirect();
      }).catch(function(error) {
        console.log('error happened while signing out');
      });
}

function redirect()
{
  window.location.href = "/dashboard/index.html";
}


document.querySelector("#logout").addEventListener("click", function(e){
  e.preventDefault();
  logoutUser();
});


