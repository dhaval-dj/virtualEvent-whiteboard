const db = firebase.firestore();



const mainAuid = document.getElementById('main-audi-youTube');





callAllSnaps();

function callAllSnaps() {

    db.collection('auditorium').doc('main').onSnapshot(function (doc) {
        let changes = doc.data();
        mainAuid.value = changes['link'];
        document.getElementById('main-audi-youTube-video').src = 'https://www.youtube.com/embed/' + mainAuid.value;
    });

    db.collection('auditorium').doc('day2').onSnapshot(function (doc) {
        let changes = doc.data();
        console.log(changes);

        for (const property in changes) {
            obj = changes[property];
            for (const childKey in obj) {
                console.log(`${childKey}: ${obj[childKey]}`);
                let id = childKey;
                let value = obj[childKey];
                if (document.getElementById(id)) {
                    document.getElementById(id).value = value;
                    if(document.getElementById(id + '-iframe'))
                        document.getElementById(id + '-iframe').src = 'https://www.youtube.com/embed/' + value;
                }
            }

        }

    });


}

$('.cardiodiabetic').on('click', function () {

    const val = $(this).closest('.slido').find('.slido-Audi1-Input');
    console.log(val[0].value);
    let UpdateID = val[0].id;
   
    db.collection('auditorium').doc('day2').update({
        ['cardiodiabetic.'+UpdateID]:val[0].value
    }).then(() => {
        console.log('Saved');
    });

});

$('.cvlife').on('click', function () {

    const val = $(this).closest('.slido').find('.slido-Audi1-Input');
    console.log(val[0].value);
    let UpdateID = val[0].id;
   
    db.collection('auditorium').doc('day2').update({
        ['cvlife.'+UpdateID]:val[0].value
    }).then(() => {
        console.log('Saved');
    });

});


$('.corphospital').on('click', function () {

    const val = $(this).closest('.slido').find('.slido-Audi1-Input');
    console.log(val[0].value);
    let UpdateID = val[0].id;
   
    db.collection('auditorium').doc('day2').update({
        ['corphospital.'+UpdateID]:val[0].value
    }).then(() => {
        console.log('Saved');
    });

});

 

function updateMainAudi()
{
    db.collection('auditorium').doc('main').update({
        link:mainAuid.value,
    }).then( () =>{
        console.log('Saved');
    }); 
}
