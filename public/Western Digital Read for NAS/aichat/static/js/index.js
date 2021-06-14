
 

const sameAnswer = "I'm fine";
const replies = [{
        message: 'How are you?',
        answer: sameAnswer
    },
    {
        message: 'Are you fine?',
        answer: sameAnswer
    },
    {
        message: 'Good morning',
        answer: 'Same to you'
    },
    {
        message: 'Hi',
        answer: 'Hello'
    }
];

const randomAnswers = ["Thanks for reaching out to us! A member of our team will get back to you via email."];

$(document).ready(function () {

   
    const auth = firebase.auth();
    auth.onAuthStateChanged(function (user) {
        if (user) {
            your_name = user.displayName;
            your_email = user.email;
            your_id = user.uid;
            profilePic = user.photoURL;
            if (!your_name) {
                var email = user.email;
                your_name = email.split("@")[0]
            }
            console.log(your_name);
            console.log(user.uid);

            const rdb_AiStall = rdb.ref('/AIStall/' + stallName + '/' + user.uid);

            //Saving User Name and Data
            rdb_AiStall.update({
                email: your_email,
                name: your_name,
            }, function (error) {
                if (error) {
                    console.log("error occurred while updating analytics for: ", eventName);
                } else {
                    //console.log("Data saved successfully for: ", eventName);
                }
            });
            const userQuestions = rdb.ref().child('AIStall').child(stallName).child(user.uid).child('Questions');
           /*  
            userQuestions.push().set({
                query:"hello"
            }); */

            // your_name = "patel aka aaa";
            const chatBox = new ChatBox(new BotReply(replies, randomAnswers), {
                id: your_id,
                name: your_name,
                img: profilePic || 'https://image.flaticon.com/icons/svg/145/145867.svg',
                rdb:userQuestions,
            });

            document.getElementById('first').appendChild(chatBox.getContainer());

        } else {
            console.log("Nobody is Signed In");

        }
    });

});

