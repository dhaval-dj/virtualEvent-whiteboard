var Leaderboard = pc.createScript('leaderboard');

Leaderboard.attributes.add("gameName", {type: "string"}); //Name of the game should be same as in db

Leaderboard.attributes.add("listSize", {type: "number", default: 10}); //number of users to show in list

Leaderboard.attributes.add("template", {type: "entity"}); 

Leaderboard.attributes.add("personal", {type: "entity"}); 

Leaderboard.attributes.add("leaderboard", {type: "entity"}); 

Leaderboard.attributes.add("mainDisplay", {type: "entity"}); 

Leaderboard.attributes.add("errorDisplay", {type: "entity"}); 

//Leaderboard.attributes.add("cross", {type: "entity"}); 

Leaderboard.attributes.add("firstLeaderPositionY", {type: "number"}); 

Leaderboard.attributes.add("leaderPositionGap", {type: "number"}); 

Leaderboard.attributes.add("openLeaderboardByDefault", {type: "boolean"}); 


var InfinityRunnerLeaderboardInstance;

Leaderboard.prototype.initialize = function() {
    var self = this;
    this.entries = [];
    self.clear();
   InfinityRunnerLeaderboardInstance = this;
    this.isShowing = false;
    
    if(this.openLeaderboardByDefault)
    {
        this.app.on("firebaseInit", function(){
           self.ShowLeaderboard();
       });    
    }else
    {
        this.leaderboard.enabled = false;
    }
    
    
};

// clear all leaderboard entries
Leaderboard.prototype.clear = function () {
    for (var i = 0; i < this.entries.length; i++) {
        this.entries[i].destroy();
    }
    this.entries = [];
};

// add a new entry into the leaderboard
Leaderboard.prototype.addEntry = function (parent, y, name, score, hideBg) {
    var entry = this.template.clone();
    entry.enabled = true;
    entry.findByName("Name").element.text = name.toUpperCase();
    entry.findByName("Score").element.text = score.toString();
    if(hideBg)
    {
        entry.findByName("background").enabled = false;        
    }
    this.entries.push(entry);
    parent.addChild(entry);    
    entry.translateLocal(0, y, 0);
};

Leaderboard.prototype.ShowLeaderboard = function () {
    var self = this;
    this.isShowing = true;
    this.leaderboard.enabled = true;
    var hadError= false;

    firebaseControllerInstance.db.collection(self.gameName)
        .doc(firebaseControllerInstance.user.uid)
        .get()
        .then(function(doc)
              {
                if(doc.exists)
                {
                     self.errorDisplay.enabled =  false;
                    self.mainDisplay.enabled =  true;
                    self.personal.element.text = doc.data().score;
                }
             }).catch(function(error){
                hadError = true;
                  self.errorDisplay.enabled =  true;
                    self.mainDisplay.enabled =  false;
                    //some Error UI
                    console.log(error);
             });
    
    if(hadError)
    {
        return;
    }

    self.LeaderboardFirebaseListener = firebaseControllerInstance.db.collection(self.gameName)
            .orderBy("score", "desc")
            .limit(self.listSize)
            .onSnapshot(function(snapshot){

            var docs = snapshot.docs;
            var list = [];
             snapshot.forEach(function (doc) {
                list.push(doc.data());
            });

            self.clear();
            self.errorDisplay.enabled =  false;
            self.mainDisplay.enabled =  true;
            var y = self.firstLeaderPositionY;

            for (var i = 0; i < Math.min(list.length, 10); i++) 
            {    
              var hideBG = true;
                if(i%2 === 0)
                {
                  hideBG = false;
                }

                self.addEntry(self.mainDisplay, y, list[i].name, list[i].score, hideBG);

                y -= self.leaderPositionGap; // offset each entry
            }

         },function(error){
            self.errorDisplay.enabled =  true;
            self.mainDisplay.enabled =  false;
            console.log(error);
         });
    
};


Leaderboard.prototype.HideLeaderboard = function () {
    var self = this;
    this.isShowing = false;
    this.leaderboard.enabled = false;    
    if(this.LeaderboardFirebaseListener)
    {
        this.LeaderboardFirebaseListener();
    }
};



