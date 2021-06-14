const db = firebase.firestore();
var userid;
var gamescore_new;
window.main=this;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {         
        userid=user.uid;
        console.log(userid);
    }     
  });


function UpdateScrore(gamescore)
{     
    if(userid!=='' || userid!==undefined)
    {        
    gamescore_new = gamescore; 
    gamescore_new=parseInt(gamescore_new);         
    var gameDocRef = db.collection("users").doc(userid);      
    db.runTransaction(function(transaction) {           
        return transaction.get(gameDocRef).then(function(gamedoc) {
            if (!gamedoc.exists) {
                throw "Document does not exist!";
            }
            //inc total response            
            var score = gamedoc.data().infityrunner_score;               
            if(score<gamescore_new)
            {
                console.log(gamescore);
                var totalscore = gamedoc.data().totalscore; 
                totalscore = totalscore+gamescore_new;
                score = gamescore_new; 
                transaction.update(gameDocRef, {infityrunner_score: score });   
                transaction.update(gameDocRef, {totalscore: totalscore});  

            }   
            console.log(gamescore_new + "gamescore_new");           
                return score;               
        });
    }).then(function(score) {
        console.log("total response :", score);
    }).catch(function(err) {
        console.error(err);
    });   
    }
    else
    {
        print("user not found");
    }
}
