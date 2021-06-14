const iframe = document.querySelector('#iframeXD');
var p1,p2,p3,p4,p5;
p1="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/enterprise/Data%20Center%20Storage%20Solutions.pdf";
p2="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/enterprise/Platforms.pdf";
p3="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/enterprise/Helioseal-technology.pdf";


const auth = firebase.auth();
const rdbx = firebase.database();
var stallName = 'Enterprise';
var actionName = 'PDF';
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
        updateUserPDFWatchHistory('PDF1');
    }   
});

function updateUserPDFWatchHistory(videoID)
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





function pdf1()
{  
    ChangeBg();
    iframe.setAttribute( 'src', p1 );
    iframe.style.display = "block"; 
    var cla =  document.getElementById('p1') 
    cla.className +=" runtimeclr";
}

function pdf2()
{
    updateUserPDFWatchHistory('PDF2');
    ChangeBg();
    iframe.setAttribute( 'src', p2 );
    iframe.style.display = "block";   
    var cla =  document.getElementById('p2') 
    cla.className +=" runtimeclr";
}

function pdf3()
{ 
    updateUserPDFWatchHistory('PDF3');
    ChangeBg();
    iframe.setAttribute( 'src', p3 );
    iframe.style.display = "block"; 
    var cla =  document.getElementById('p3') 
    cla.className +=" runtimeclr"; 
}

function pdf4()
{
    updateUserPDFWatchHistory('PDF4');
    ChangeBg();
    iframe.setAttribute( 'src', p4 );
    iframe.style.display = "block"; 
    var cla =  document.getElementById('p4') 
    cla.className +=" runtimeclr";
}

function pdf5()
{
    updateUserPDFWatchHistory('PDF5');
    ChangeBg();
    iframe.setAttribute( 'src', p5 );
    iframe.style.display = "block"; 
    var cla =  document.getElementById('p5') 
    cla.className +=" runtimeclr"; 
}

function ChangeBg()
{
  var cla =  document.getElementsByClassName('w3-button')
  Array.prototype.forEach.call(cla, function(cl) {
    cl.className="w3-bar-item w3-button";
});

}