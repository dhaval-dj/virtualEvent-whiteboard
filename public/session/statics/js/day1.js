const db = firebase.firestore();

const audi = document.getElementById('audi');

const expohall = document.getElementById('expohall');
const meeting = document.getElementById('meeting');
//const Enterprise = document.getElementById('Enterprise');
const workshop = document.getElementById('workshop');

const room1 = document.getElementById('jerry1');
const room2 = document.getElementById('jerry2');
const room3 = document.getElementById('scott1');
const room4 = document.getElementById('scott2');
const room5 = document.getElementById('jim1');
const room6 = document.getElementById('jim2');
const room7 = document.getElementById('greg1');
const room8 = document.getElementById('greg2');
const room9 = document.getElementById('swapna1');
const room10 = document.getElementById('swapna2');
const room11 = document.getElementById('kristy1');
const room12 = document.getElementById('kristy2');
const room13 = document.getElementById('ryan1');
const room14= document.getElementById('ryan2');
const room15= document.getElementById('colleen1');
const room16= document.getElementById('colleen2');
const room17= document.getElementById('kyle1');
const room18= document.getElementById('kyle2');



const sessionid = document.getElementById('session');



callAllSnaps();

function callAllSnaps() {

    db.collection('Admin').doc('eventManagement').onSnapshot(function (doc) {
        let changes = doc.data();
        audi.value = changes['audistatus'];
        expohall.value = changes['expohallstatus'];
        meeting.value = changes['meetingstatus'];
        workshop.value = changes['workshopstatus'];
    });

    db.collection('Admin').doc('breakoutsession').onSnapshot(function (doc) {
        let changes = doc.data();    
        room1.value = changes['jerryroom1'];        
        room2.value = changes['jerryroom2'];
        room3.value = changes['scottroom1'];
        room4.value = changes['scottroom2'];
        room5.value = changes['jimroom1'];
        room6.value = changes['jimroom2'];
        room7.value = changes['gregroom1'];
        room8.value = changes['gregroom2'];
        room9.value = changes['swapnaroom1'];
        room10.value = changes['swapnaroom2'];
        room11.value = changes['kristyroom1'];
        room12.value = changes['kristyroom2'];
        room13.value = changes['ryanroom1'];
        room14.value = changes['ryanroom2'];
        room15.value = changes['colleenroom1'];
        room16.value = changes['colleenroom2'];
        room17.value = changes['kyleroom1'];
        room18.value = changes['kyleroom2'];    
    });

    db.collection('Admin').doc('KeynoteSession').onSnapshot(function (doc) {
        let changes = doc.data();    
        changes = changes['sessionID'].split('session');
        sessionid.value=changes[1];

    });
}

function updateMainAudi()
{
    db.collection('Admin').doc('eventManagement').update({
        audistatus:parseInt(audi.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateExpoHall()
{
    db.collection('Admin').doc('eventManagement').update({
        expohallstatus:parseInt(expohall.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}


function updateMeetingRoom()
{
    db.collection('Admin').doc('eventManagement').update({
        meetingstatus:parseInt(meeting.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}


function updateWorkshop()
{
    db.collection('Admin').doc('eventManagement').update({
        workshopstatus:parseInt(workshop.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateConsumer()
{
    db.collection('Admin').doc('eventManagement').update({
        auditorium5videourl:parseInt(Consumer.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}


 function updateJerry1()
{
    db.collection('Admin').doc('breakoutsession').update({
        jerryroom1:parseInt(room1.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}
function updateJerry2()
{
    db.collection('Admin').doc('breakoutsession').update({
        jerryroom2:parseInt(room2.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateScott1()
{
    db.collection('Admin').doc('breakoutsession').update({
        scottroom1:parseInt(room3.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateScott2()
{
    db.collection('Admin').doc('breakoutsession').update({
        scottroom2:parseInt(room4.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateJim1()
{
    db.collection('Admin').doc('breakoutsession').update({
        jimroom1:parseInt(room5.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateJim2()
{
    db.collection('Admin').doc('breakoutsession').update({
        jimroom2:parseInt(room6.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateGreg1()
{
    db.collection('Admin').doc('breakoutsession').update({
        gregroom1:parseInt(room7.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateGreg2()
{
    db.collection('Admin').doc('breakoutsession').update({
        gregroom2:parseInt(room8.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateSwapna1()
{
    db.collection('Admin').doc('breakoutsession').update({
        swapnaroom1:parseInt(room9.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateSwapna2()
{
    db.collection('Admin').doc('breakoutsession').update({
        swapnaroom2:parseInt(room10.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateKristy1()
{
    db.collection('Admin').doc('breakoutsession').update({
        kristyroom1:parseInt(room11.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateKristy2()
{
    db.collection('Admin').doc('breakoutsession').update({
        kristyroom2:parseInt(room12.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateRyan1()
{
    db.collection('Admin').doc('breakoutsession').update({
        ryanroom1:parseInt(room13.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateRyan2()
{
    db.collection('Admin').doc('breakoutsession').update({
        ryanroom2:parseInt(room14.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateColleen1()
{
    db.collection('Admin').doc('breakoutsession').update({
        colleenroom1:parseInt(room15.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateColleen2()
{
    db.collection('Admin').doc('breakoutsession').update({
        colleenroom2:parseInt(room16.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}function updateKyle1()
{
    db.collection('Admin').doc('breakoutsession').update({
        kyleroom1:parseInt(room17.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}

function updateKyle2()
{
    db.collection('Admin').doc('breakoutsession').update({
        kyleroom2:parseInt(room18.value),
    }).then( () =>{
        console.log('Saved');
    }); 
}
 
function updatesession()
{
    db.collection('Admin').doc('KeynoteSession').update({
        sessionID:"session"+sessionid.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}
 
