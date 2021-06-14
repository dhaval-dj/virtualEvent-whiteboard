const iframe = document.querySelector('#iframeXD');
const iframetemp = document.querySelector('#iframeXDtemp');
 
var v1,v2,v3,v4,v5;
v1="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/Professional/G-Speed%20Shuttle%20SSD%20Cut_04.mp4?autoplay=1";
v2="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/Professional/GTech_GRaid_wTB3_Live_EN_112017%20(1).mp4?autoplay=1";
v3="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/Professional/Gt190702-1%20G-Technology%20Anthem%20Final%20Master%208.20.20-1.mp4?autoplay=1";

const auth = firebase.auth();
const rdbx = firebase.database();
var stallName = 'Professional';
var actionName = 'Video';
var watchList;
var saveLiveDataToLeaderboard;
var saveLiveDataToLeaderboardDay;
var userid;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {         
        userid=user.uid;
        watchList = rdbx.ref('/user_analytics_wd_' + stallName + '/' + userid);
        saveLiveDataToLeaderboardDay = rdbx.ref('/LeaderBoardUserData/' + userid + '/' + GetDate() + '/' + stallName + '/');
        saveLiveDataToLeaderboard= rdbx.ref('/LeaderBoardUserData/' + userid + '/allData/' + actionName + '/');
        updateUserVideoWatchHistory('video1');
    }   
});

function updateUserVideoWatchHistory(videoID)
{
    watchList.update({
        [actionName +'-'+ videoID]:true,
    });

    saveLiveDataToLeaderboardDay.update({
        [actionName +'-'+ videoID]:true,
    });

    saveLiveDataToLeaderboard.update({
        [stallName+"-"+videoID]:true,
    });

}

function GetDate() {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"
    ];
    let Today = d.getDate() + "-" + days[d.getDay()] + "-" + months[d.getMonth()] + "-2020";
    return Today;
}

function video1()
{    
    ChangeBg();
    iframe.setAttribute( 'src', v1 );
    iframe.style.display = "block";  
    var cla =  document.getElementById('v1') 
    cla.className +=" runtimeclr";
}

function video2()
{
    updateUserVideoWatchHistory('video2');
    ChangeBg();
    iframe.setAttribute( 'src', v2 );
    iframe.style.display = "block";   
    var cla =  document.getElementById('v2') 
    cla.className +=" runtimeclr";

}

function video3()
{
    updateUserVideoWatchHistory('video3');
    ChangeBg();
    iframe.setAttribute( 'src', v3 );
    iframe.style.display = "block";  
    var cla =  document.getElementById('v3') 
    cla.className +=" runtimeclr";

}

function video4()
{
    updateUserVideoWatchHistory('video4');
    ChangeBg();
    iframe.setAttribute( 'src', v4 );
    iframe.style.display = "block";   
    var cla =  document.getElementById('v4') 
    cla.className +=" runtimeclr";

}

function video5()
{
    updateUserVideoWatchHistory('video5');
    ChangeBg();
    iframe.setAttribute( 'src', v5 );
    iframe.style.display = "block";  
    var cla =  document.getElementById('v5') 
    cla.className +=" runtimeclr";
}


function ChangeBg()
{
  var cla =  document.getElementsByClassName('w3-button')
    Array.prototype.forEach.call(cla, function(cl) {
    cl.className="w3-bar-item w3-button";    
    });
}
