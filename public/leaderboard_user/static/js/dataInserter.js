
const db = firebase.firestore();
var userid;
var gamescore_new;
window.main=this;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {         
        userid=user.uid;
        console.log(userid);
        ShowSingleLeaderBoard();
    }     
  });

let gesturegame_score;
let infityrunner_score;
let keepyup_score;
let quiz_score_embedded;
let quiz_score_portablessd;
let quiz_score_sandisk;
let tetris_score;
let unscramble_score;


var leaderboard = [];

function ShowSingleLeaderBoard() {  

    var gameDocRef = db.collection("users").doc(userid);

    db.runTransaction(function(transaction) {           
        return transaction.get(gameDocRef).then(function(gamedoc) {
            if (!gamedoc.exists) {
                throw "Document does not exist!";
            }
             gesturegame_score = gamedoc.data().gesturegame_score;
             infityrunner_score = gamedoc.data().infityrunner_score;
             keepyup_score = gamedoc.data().keepyup_score;
             quiz_score_embedded = gamedoc.data().quiz_score_embedded;
             quiz_score_portablessd = gamedoc.data().quiz_score_portablessd;
             quiz_score_sandisk = gamedoc.data().quiz_score_sandisk;
             tetris_score = gamedoc.data().tetris_score;
             unscramble_score = gamedoc.data().unscramble_score;

             table.innerHTML=''; 

            let x='<tr class="bgFFF" style="background-image: linear-gradient(to right, rgb(255 255 255), rgb(255 255 255)); height: 50px;">';
            let y='<td class="trElement" width="105px" style="border-radius: 40px 40px 0px 0px;height: 50px;color:#000">#ID</td>';
            let z='<td class="trElement" width="300px" style="border-radius: 40px 40px 0px 0px;height: 50px;color:#000">Game Name</td>';
            let v='<td class="trElement" width="350px" style="border-radius: 40px 40px 0px 0px;height: 50px;color:#000">Score</td>';
            let w='</tr>';


            let h=x+y+z+v+w;
            table.append(stringToDom(h));

//table.append(headerDom);
            table.append(stringToDom(createRow(1,'Gesturegame',gesturegame_score)));
            table.append(stringToDom(createRow(2,'Infityrunner',infityrunner_score)));
            table.append(stringToDom(createRow(3,'Keepyup',keepyup_score)));
            table.append(stringToDom(createRow(4,'Quiz Portablessd',quiz_score_portablessd)));
            table.append(stringToDom(createRow(6,'Quiz Sandisk',quiz_score_sandisk)));
            table.append(stringToDom(createRow(7,'Tetris',tetris_score)));
            table.append(stringToDom(createRow(8,'Unscramble',unscramble_score)));



        });
    }).then(function(score) {
         console.log(leaderboard); 
        // CallThis(leaderboard);  
    }).catch(function(err) {
        console.error(err);
    });  

    
    
}



var table=document.getElementById('customers');

let header=('<trstyle="height: 76px;"> <th class="header-imaess" style="background-image: url(static/images/rank1.png);"></th> <th class="header-imaess" style="background-image: url(static/images/name1.png);"></th> <th class="header-imaess" style="background-image: url(static/images/companyname.png);"></th><th class="header-imaess" style="background-image: url(static/images/points.png"></th></tr>');
const headerDom = stringToDom(header);


function stringToDom(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function createRow(id,name,score)
{
    let a='<tr class="bgFFF">';
    let b='<td class="trElement" width="105px">#'+id+'</td>';
    let c='<td class="trElement" width="300px">'+name+'</td>';
    let d='<td class="trElement" width="350px">'+score+'</td>';
    let f='</tr>';
    return (a+b+c+d+f);
}
//table.innerHTML=''; 
// table.append(headerDom);
// table.append(stringToDom(createRow(1,'ppj','BLR',345)));
// table.append(stringToDom(createRow(2,'ppj','BLR',345)));

