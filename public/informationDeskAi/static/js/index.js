
const mainMenuBtns = [
    'Event Overview', 
    'Exhibition hall booth list', 
    'Auditorium | Keynote Sessions', 
    'Workshops',
    'Photo Mosaic',
    'Meet The Team',
    'Leader board',
    'About Western Digital',
];

const sameAnswer = "I'm fine";

const replies = [
    { message: 'Menu', answer: `Please choose your query from the options below:`, haveSubMenu: true, subMenu: mainMenuBtns },
    { message: 'Exit', answer: `Please choose your query from the options below:`, haveSubMenu: true, subMenu: mainMenuBtns },
    { message: 'Home', answer: `Please choose your query from the options below:`, haveSubMenu: true, subMenu: mainMenuBtns },

    { message: 'Event Overview', answer: `
    <p>
        In our 2020 summit, we will share our future vision, company plans, market trends, technology advances and how
        all of this will benefit you, our valued partners.
    </p>
    <br>
    <p>
        We encourage your participation – we want to hear from you through questions in sessions, poll responses…video
        chat if you like with our team on the Expo stands. Go more in-depth on specific categories by attending the
        workshops. Ask, learn…enjoy.

    </p>
    <br>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    ` },
    
    { message: 'Exhibition hall booth list', answer: `
    <p>
        Visit our expo hall and learn about our latest and greatest products and services covering:
    </p>
    <ul style="margin-left: 16px;">
        <li>Gaming</li>
        <li>Professional Range</li>
        <li>Portable SSDs</li>
        <li>Working from home range</li>
        <li>Work on the go</li>
        <li>WD Red for NAS</li>
        <li>Client+</li>
        <li>Smart Video</li>
        <li>NVMe & SSD</li>
        <li>Enterprise Range</li>
        <li>Gaming</li>
    </ul>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    ` },
   
    { message: 'Auditorium | Keynote Sessions', answer: `
    <p>Check out today’s schedule listed at the information desk and plan your day accordingly. </p>
    <br>
    <p>
        Learn more about Western Digital’s vision for the data storage future…our breadth of product portfolio, our insights on market trends and why partnering with us makes perfect business sense.
    </p>
    <br>
    <p>
        Each keynote is approximately 15min long, and we will have a short break during sessions. 
    </p>
    <br>
    <p>
        Earn leadership board points for each keynote you attend, points for asking questions and participating in any polls.
    </p>
    <br>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    ` },

    { message: 'Workshops', answer: `
    <p>We are offering workshops on Gaming; Client+; Consumer and Enterprise. Each session is 40 mins and repeats throughout Day 2.</p>
    <br>
    <p>
        Check out the agenda at the Welcome Desk for timings.
    </p>
    <br>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    ` },

    { message: 'Photo Mosaic', answer: `
    <p>You Were Here!</p>
    <br>
    <p>
        Make your mark on our partner summit and put your photo in the frame…visit the photo booth in the main lobby, have you pic taken and write a comment if you like…when you’re happy, hit submit and within minutes your photo will become part of our Summit Mosaic.
    </p>
    <br>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    ` },

    { message: 'Leader board', answer: `
    <p>
        Our EMEA Partner Summit also gives you an opportunity to participate and earn great rewards. Every activity you participate with – watch videos, ask questions, take part in polls -  will give you a chance to earn Summit points.
    </p>
    <br>
    <p>
        Check out your status and how many points you have earned so far on the leader board in the main lobby and ensure that you are on the top of the list – there are fantastic prizes on offer for our Platinum, Gold and Silver point scorers*. 
    </p>
    <br>
    <p>
        To go back to the main menu, type ‘Menu’
    </p>
    <br>
    <p>
        *Terms & conditions apply
    </p>
    ` },

    { message: 'Meet The Team', answer: `
        <p>
            As we cannot meet in person this year, our team have each made a video to introduce themselves to you – please visit our Meet The Team room and meet the team!
        </p>
        <br>
        <p>
            To go back to the main menu, type ‘Menu’
        </p>
    ` },

    { message: 'About Western Digital', answer: `
         <p>
        Western Digital provides data storage solutions, including systems, HDD, Flash SSD, memory and personal data solutions to help customers capture and preserve their most valued data.
        </p>
        <br>
        <p>
            Whether in your pocket, home, car, or the cloud, it's likely Western Digital is with you every step of the way. It's a responsibility we don't take lightly. That's why we are always at the cusp of innovation, pushing the boundaries of technology to make what you thought was once impossible, possible.
        </p>
        <br>
        <p>
            For more information, visit: <a target="_blank" href="https://www.westerndigital.com/">https://www.westerndigital.com/</a>
        </p>
        <br>
        <p>
            To go back to the main menu, type ‘Menu’
        </p>
    ` },

    { message: 'How are you?', answer: sameAnswer },
    { message: 'Are you fine?', answer: sameAnswer },
    { message: 'Good morning', answer: 'Same to you' },
    { message: 'Hi', answer: 'Hello' }

];
const randomAnswers = ["Thanks for reaching out to us!"];

/* const chatBox = new ChatBox(new BotReply(replies, randomAnswers), {
    id: 'john',
    name: 'John',
    img: 'https://image.flaticon.com/icons/svg/145/145867.svg',
});
document.getElementById('first').appendChild(chatBox.getContainer());
 */

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
