const db = firebase.firestore();
var adminArray;
var userLogin;
//----------check----------------//    
 auth.onAuthStateChanged(function(user) {
    if (user)
     {
            console.log( user.email + " Signed In");
            userLogin=user;
            firebase.firestore().collection('Admin').doc('AdminUsers').get().then(doc =>{
                const docData = doc.data();
                adminArray = docData.adminUID;
                if(!adminArray.includes(user.uid)){
                  logoutUser();
  
                 
                }else
                {
                    callAllSnaps();
                 
                }
            }).catch(function(error){
              console.log(error);
            });
      } 
      else 
      {
        redirect();
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


$('#hide').on('click',function(e){
    if(userLogin){
        db.collection('AdminControl').doc('notification').update({
            showNotification:false
        });
    }
});

$('#Show-Custome-Message').on('click',function(e){

   if(userLogin){
    db.collection('AdminControl').doc('notification').update({
        showNotification:true,
        message:$('#custome-message').val()
    });
}

});

function ShowThisMessage(msg)
{
    if(userLogin){
        db.collection('AdminControl').doc('notification').update({
            showNotification:true,
            message:msg
        });
    }
}

function callAllSnaps(){
    //Changing capture status
    db.collection("AdminControl").doc('notification').onSnapshot(function(doc) {
        console.log(doc.data());

        if(doc.data().showNotification)
        {
            $('#current-show').css('display', 'block');
            $('#info-message').html(doc.data().message);
        }else{
            $('#current-show').css('display', 'none');
        }

    });
}
