const db = firebase.firestore();

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
    if(userid!=='' || userid !== undefined)
    {
    console.log(userid);
    gamescore_new = gamescore; 
    gamescore_new=parseInt(gamescore_new);         
    var gameDocRef = db.collection("users").doc(userid);      
    db.runTransaction(function(transaction) {           
        return transaction.get(gameDocRef).then(function(gamedoc) {
            if (!gamedoc.exists) {
                throw "Document does not exist!";
            }
            //inc total response
            var totalscore = gamedoc.data()[stallName+'_'+actionName+'_Score'];               
            if(totalscore<gamescore_new)
            {
                totalscore = gamescore_new; 
                transaction.update(gameDocRef, {[stallName+'_'+actionName+'_Score']: totalscore });  
                SaveUserScore(gamescore);
            }else{
                if(!totalscore)
                {
                    totalscore = gamescore_new; 
                    transaction.update(gameDocRef, {[stallName+'_'+actionName+'_Score']: totalscore });   
                    SaveUserScore(gamescore);
                    
                }
            }
            SaveLederboard();
            console.log(gamescore_new + "gamescore_new");           
                return totalscore;               
        });
    }).then(function(totalscore) {
        console.log("total response :", totalscore);
    }).catch(function(err) {
        console.error(err);
    });   
    }
}
