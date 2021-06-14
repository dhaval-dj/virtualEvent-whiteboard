//Main Firebase connection API
var firebaseConfig = {
    apiKey: "AIzaSyDULAs2pTlDkPb0L-_wgjbE6FnVW_EmdoA",
    authDomain: "benz-demo.firebaseapp.com",
    databaseURL: "https://benz-demo.firebaseio.com",
    projectId: "benz-demo",
    storageBucket: "benz-demo.appspot.com",
    messagingSenderId: "671058312988",
    appId: "1:671058312988:web:2415e249ecb27a111044d9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); //Creating authentication 
const db = firebase.firestore();//Creating database connection 

//Check user is logged in or not
auth.onAuthStateChanged(user => {

    if (user) {
        console.log('User already Logged In');
        $('#loginBg').css('display', 'none');
        $('#normal-user-home').css('display', 'flex');
        console.log(user);

     
        db.collection("registration").doc(user.uid).onSnapshot(function(doc) {
              let changeData=doc.data();
                //checking user is premium member
              if(changeData.link != "" && changeData.type!='normal'){
                  //Show Live Link
                  console.log(changeData.link);
              }

        });

        //Taking Starting time from server
        db.collection("admin").doc('forAllUser').get().then(fun=>{ 
            let time_data=fun.data();
            var svrtime=time_data.startTime;
            Timer(svrtime);//Sending to time checker
        });
     
       
    } else {
        console.log('User not Logged in/ user Logged out');
        $('#loginBg').css('display', 'flex');
        $('#normal-user-home').css('display', 'none');
    }
});


function Timer(svrtime)
{
    var startTime=moment(svrtime);
    var currentTime=moment().utcOffset("+05:30").format();

    var duration = startTime.diff(currentTime);

 //   var d2=moment.utc(moment(startTime,"DD/MM/YYYY HH:mm:ss").diff(moment(currentTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

    var ms = moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(startTime,"DD/MM/YYYY HH:mm:ss"));
   
    if(duration <= 0){
        
        $('#eventStartTime').html('Will Start Soon');
    }else{
        var d = moment.duration(duration);
        //seconds: 18, minutes: 28, hours: 1, days: 0
        var s=0;
        if(d._data.seconds < 10)
        {
            s='0'+d._data.seconds;
        }else{
            s=d._data.seconds;
        }

        var m=0;
        if(d._data.minutes < 10)
        {
            m='0'+d._data.minutes;
        }else{
            m=d._data.minutes;
        }

        var h=0;
        if(d._data.hours < 10)
        {
            h='0'+d._data.hours;
        }else{
            h=d._data.hours;
        }

        if($('#eventStartTime'))
        {
            $('#eventStartTime').html('Event starts at '+h +' : ' +m +' : '+s);

            setTimeout(function(){
                Timer(svrtime);
            },1000);
        }
        

    }
     

}


//Capture button
 db.collection("admin").doc('forAllUser').onSnapshot(function(doc) {
    console.log(doc.data());
    let changes=doc.data();

    if(changes.isEventStart)
    {
        if($('#eventStartTime'))
        {
            $('#eventStartTime').css('display','none');
        }
        $('#startEventButton').css('display','block');
    }else{
        if($('#eventStartTime'))
        {
            $('#eventStartTime').css('display','block');
        }
        $('#startEventButton').css('display','none');
    }

    if(changes.isCapture)
    {
        $('#capture-button').css('display', 'block');
    
        $('#downloadImage').attr("href", changes.img_url);
    }else{
        $('#capture-button').css('display', 'none');
        $('#downloadImage').attr("href", '');
    }
});
 
//Download 
$('#capture-button').on('click',function(){

    $('#downloadImage')[0].click();
});


//Registration button click
$('#register-btn').on('click', function (e) {

    const name = $('#user_name').val();
    const mobile = $('#mobile').val();
    const tick = $('#i_accept').is(':checked');

    //simple validation
    if (name == '' || mobile == '' || !tick) {
        if (!tick) {
            console.log('Please accept all terms & condition');
        } else if (name != '' && mobile != '') {
            console.log('Please fill all fields');
        } else {
            console.log('Please check all fields');
        }
    } else {

        //Register new user
        auth.createUserWithEmailAndPassword(name +mobile+ '@dj.com', mobile).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
        }).then(cred => {
            // If new user 
            if (cred) {
                console.log('New User Login');
                console.log(cred.user);
                //Adding data to another collection
                db.collection('registration').doc(cred.user.uid).set({
                    name: name,
                    mobile: mobile,
                    type: 'normal',
                    uid: cred.user.uid
                  }).then( () =>{
                      console.log("updated to profile DB");
                  });
            }
        });
    }
});

//Login Existing user
$('#log-in-btn').on('click',function(e){

    const name = $('#user_name').val();
    const mobile = $('#mobile').val();

    auth.signInWithEmailAndPassword(name+mobile + '@dj.com', mobile).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
        if(errorCode=='auth/user-not-found'){
            console.log("Please Register your number");
        }
    }).then(cred => {
        //Show User data
        console.log(cred);
    });

});

//Logout call
function logOut() {
    auth.signOut().then(() => {
        console.log('Log Out');
    });
}