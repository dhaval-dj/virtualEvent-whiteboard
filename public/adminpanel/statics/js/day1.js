const db = firebase.firestore();

const mainAuid = document.getElementById('main-audi-youTube');

const ClientPlus = document.getElementById('ClientPlus');
const gaming = document.getElementById('gaming');
const Enterprise = document.getElementById('Enterprise');
const Consumer = document.getElementById('Consumer');

//const sessionid = document.getElementById('session');



callAllSnaps();

function callAllSnaps() {

    db.collection('Admin').doc('eventManagement').onSnapshot(function (doc) {
        let changes = doc.data();
        mainAuid.value = changes['auditorium1videourl'];

        ClientPlus.value = changes['auditorium2videourl'];
        gaming.value = changes['auditorium3videourl'];
        Enterprise.value = changes['auditorium4videourl'];
        Consumer.value = changes['auditorium5videourl'];
    });
}



function updateMainAudi()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium1videourl:mainAuid.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateClientPlus()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium2videourl:ClientPlus.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}


function updateGaming()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium3videourl:gaming.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}


function updateEnterprise()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium4videourl:Enterprise.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateConsumer()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium5videourl:Consumer.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}


/* function updatesession()
{
    db.collection('Admin').doc('eventmanagement').update({
        audisessionnumber:parseInt(sessionid.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}
 */