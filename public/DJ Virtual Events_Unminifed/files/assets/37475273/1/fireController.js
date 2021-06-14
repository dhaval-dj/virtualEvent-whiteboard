var FireController = pc.createScript('fireController');


var fireBaseTimeManager;

FireController.attributes.add('showTimer', { type: 'entity' });

FireController.attributes.add('showAuditorium1', { type: 'entity' });
FireController.attributes.add('showAuditorium2', { type: 'entity' });

FireController.prototype.initialize = function() {
    this.initializeFirebase();
    fireBaseTimeManager=this;
};



FireController.prototype.update = function(dt) {
    
};

FireController.prototype.updateTime = function(time) {
    this.showTimer.enabled=true;
    this.showTimer.element.text=time;
};


FireController.prototype.showAuditoriumA = function(bol) {
    this.showAuditorium1.enabled=bol;
};

FireController.prototype.showAuditoriumB = function(bol) {
    this.showAuditorium2.enabled=bol;
};

FireController.prototype.hideTimer = function() {
    this.showTimer.enabled=false;
};


FireController.prototype.initializeFirebase = function(dt) {
        var firebaseConfig = {
        apiKey: "AIzaSyBz7FXmQ6PBnGNmUcSbsKdrIzkR5Ljc2SQ",
        authDomain: "angular-rhythm-261206.firebaseapp.com",
        databaseURL: "https://angular-rhythm-261206.firebaseio.com",
        projectId: "angular-rhythm-261206",
        storageBucket: "angular-rhythm-261206.appspot.com",
        messagingSenderId: "268228996246",
        appId: "1:268228996246:web:3c69ff9f3a47f8d65e66b7"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
     this.db = firebase.firestore();
    var self=this;
    this.db.collection("app").doc("status").onSnapshot(function(doc) {
              var changeData=doc.data();
                //console.log(changeData);
        
            if(changeData.showCountDown){
                Timer(changeData.start);
            }else{
                self.hideTimer();
            }
        
            if(changeData.showAuditorium1){
                self.showAuditoriumA(true);
            }else{
                 self.showAuditoriumA(false);
            }
        
            if(changeData.showAuditorium2){
                self.showAuditoriumB(true);
            }else{
                 self.showAuditoriumB(false);
            }
        
        
    });
};


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

        if(fireBaseTimeManager)
        {
           // $('#eventStartTime').html('Event starts at '+h +' : ' +m +' : '+s);
            fireBaseTimeManager.updateTime('Event starts at '+h +' : ' +m +' : '+s);
            //fireBaseTimeManager
            
            setTimeout(function(){
                Timer(svrtime);
            },1000);
        }
        

    }
     

}