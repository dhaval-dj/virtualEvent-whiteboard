//NOTE: Create Collection on Firebase 
// PollAdmin -> adminAccess -> showPoll (boolean), showResults (boolean)
//PollName ->
const PollName = 'Poll_1';
const PollAdmin = "poll1Admin";

const pollHtml = '<h6>Add your Question</h6>' +
    '<div class="question input-group mt-3">' +
    '    <div class="input-group-prepend">' +
    '     <span class="input-group-text">Question</span>' +
    '</div>' +
    '<textarea class="form-control" aria-label="With textarea"></textarea>' +
    '</div>' +
    '<br>' +
    '<span>Add Your Options Below :</span>' +
    '<div class="option">' +
    '<input type="text" id = "option" placeholder="option1">' +
    '<input type="text" id = "option" placeholder="option2">' +
    '</div>' +
    '<div>' +
    '<button id="addOption" class="btn btn-primary btn-sm mx-3 my-3" onclick="addPollOption(this)">+Add New Option</button>' +
    '<button id="removeOption" class="btn btn-primary btn-sm mx-3 my-3" onclick="removePollOption(this)" style="display: none;">-Remove Last Option</button>' +
    '</div>';

var addNewPoll = document.querySelector("#addNewpoll");

addNewPoll.addEventListener("click", function () {
    var pollcontainer = document.createElement("div");
    pollcontainer.className += "poll container py-3 px-3 my-4 w-100";
    pollcontainer.innerHTML = pollHtml;
    // var poll = document.querySelector(".poll");
    // var newPoll = poll.cloneNode(true);

    var div = document.createElement("div");
    var btn = '<button type="button" id="delete" class="btn btn-primary" onclick="removePoll(this)">Delete</button>';
    div.innerHTML = btn;
    pollcontainer.appendChild(div);

    var container = document.querySelector(".pollContainer");
    container.appendChild(pollcontainer);
});

function removePoll(btn) {
    btn.parentNode.parentNode.remove();
}

function addPollOption(e) {
    var parent = e.parentNode.parentNode.querySelector(".option");
    var inputField = parent.querySelector("input").cloneNode(true);
    var allinput = parent.querySelectorAll("input");
    inputField.value = "";
    inputField.placeholder = "option" + (allinput.length + 1);

    // var br = document.createElement("br");
    parent.appendChild(inputField);
    // parent.appendChild(br);
    // parent.appendChild(br);

    if ((allinput.length + 1) > 2) {
        var rbtn = e.parentNode.querySelector('#removeOption');
        rbtn.style.display = "block";
    } else {
        var rbtn = e.parentNode.querySelector("#removeOption");
        rbtn.style.display = "none";
    }
}

function removePollOption(e) {
    var parent = e.parentNode.parentNode.querySelector(".option");
    var options = parent.querySelectorAll("input");

    if (options.length > 2) {
        options[(options.length - 1)].remove();
        if (options.length == 3) {
            e.style.display = "none";
        }
    }

}

var savebtn = document.querySelector("#save");

savebtn.addEventListener("click", function () {
    var polls = document.querySelectorAll(".poll");

    polls.forEach(poll => {
        var questionValue = poll.querySelector("textarea").value;
        var optionArray = poll.querySelectorAll("input");
        var optionValueArray = Array(0).fill("");
        optionArray.forEach(element => {
            if (element.value !== "")
                optionValueArray.push(element.value);
        });
        //call firebase
        addPollFirebase(questionValue, optionValueArray);
    });

    polls.forEach(poll => {
        poll.remove();
    });

    var pollcontainer = document.createElement("div");
    pollcontainer.className += "poll container py-3 px-3 my-4 w-100";
    pollcontainer.innerHTML = pollHtml;
    var container = document.querySelector(".pollContainer");
    container.appendChild(pollcontainer);

});

//-------------
const db = firebase.firestore();

function addPollFirebase(question, option) {
    var optionCount = option.length;

    var reponseArray = Array(optionCount).fill(0);


    db.collection(PollName).add({
            question: question,
            option: option,
            totalResponse: 0,
            optionResponse: reponseArray
        })
        .then(function (docRef) {

            addPollInPage(question, option, docRef.id)

            return docRef.id; // return as pollId
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function readAddedPoll() {
    db.collection(PollName).get().then(snapshot => {
        var docs = snapshot.docs; //to get document
        docs.forEach(doc => {
            const pollData = doc.data();
            addPollInPage(pollData.question, pollData.option, doc.id);
        });

    });
}

function removePollFirebase(pollId) {
    db.collection(PollName).doc(pollId).delete().then(function () {

        db.collection("pollResults").doc(pollId).delete().then(function () {
            console.log("remove from both tabels " + pollId);
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}


function addPollInPage(question, options, pollId) {

    var maindiv = document.createElement("div");
    maindiv.className += "row";
    document.querySelector(".addedPollContainer").appendChild(maindiv);

    var cardDiv = document.createElement("div");
    cardDiv.className += "card border-dark w-75 mx-3 my-3 col";
    maindiv.appendChild(cardDiv);

    var cardTitle = document.createElement("div");
    cardTitle.className += "card-title card-header bg-transparent";
    cardTitle.innerHTML = question;
    cardDiv.appendChild(cardTitle);

    var cardBody = document.createElement("div");
    cardBody.className += "card-body";
    cardDiv.appendChild(cardBody);



    var ol = document.createElement("ol");
    ol.className += "list-group";
    var optionIndex = 0;
    options.forEach(option => {
        var li = document.createElement("li");
        li.className += "list-group-item d-flex justify-content-between align-items-center";
        var p = document.createElement("p");
        p.className += "card-text";
        p.innerHTML = option;
        li.appendChild(p);

        var span = document.createElement("span");
        span.className += "badge badge-primary badge-pill ";
        span.id = pollId + "_" + optionIndex;
        span.innerHTML = 0;
        li.appendChild(span);

        ol.appendChild(li);

        optionIndex += 1;
    });

    cardBody.appendChild(ol);


    var footer = document.createElement("div");
    footer.className += "card-footer bg-transparent border-primary d-flex justify-content-between align-items-center";

    var footerText = document.createElement("span");
    footerText.id = pollId + "_footer";
    footerText.innerHTML = "Total Response: 00"
    footer.appendChild(footerText);

    var deleteButton = document.createElement("button");
    deleteButton.id = "savedPollRemoveBtn";
    deleteButton.className += "btn";
    deleteButton.className += " btn-primary";
    deleteButton.innerHTML = "remove";
    deleteButton.style.display = "block";
    deleteButton.onclick = function () {
        removePollFirebase(pollId);
        cardDiv.remove();
    };
    footer.appendChild(deleteButton);


    cardBody.appendChild(footer);
}


readAddedPoll();

//-----------controls function------------------
var publishBtn = document.querySelector("#publishToUser");

publishBtn.addEventListener("click", function () {
    var adminDocRef = db.collection(PollAdmin).doc("adminAccess");
    db.runTransaction(function (transaction) {

        return transaction.get(adminDocRef).then(function (adminDoc) {
            if (!adminDoc.exists) {
                throw "Document does not exist!";
            }
            var value = adminDoc.data().showPoll;

            transaction.update(adminDocRef, {
                showPoll: !value
            });
            transaction.update(adminDocRef, {
                showResults: false
            });
            return !value;
        });
    }).then(function (value) {
        changePublishButton(value);
        changeResultButton(false);
    }).catch(function (err) {
        // This will be an "population is too big" error.
        console.error(err);
    });

});

var resultBtn = document.querySelector("#showResult");

resultBtn.addEventListener("click", function () {
    var adminDocRef = db.collection(PollAdmin).doc("adminAccess");
    db.runTransaction(function (transaction) {

        return transaction.get(adminDocRef).then(function (adminDoc) {
            if (!adminDoc.exists) {
                throw "Document does not exist!";
            }
            var value = adminDoc.data().showResults;
            transaction.update(adminDocRef, {
                showPoll: false
            });
            transaction.update(adminDocRef, {
                showResults: !value
            });
            return !value;
        });
    }).then(function (value) {
        changeResultButton(value);
        changePublishButton(false);
    }).catch(function (err) {
        // This will be an "population is too big" error.
        console.error(err);
    });


});

//check button stateFirst
(function () {
    db.collection(PollAdmin).doc("adminAccess").get().then(doc => {
        const data = doc.data();
        changePublishButton(data.showPoll);
        changeResultButton(data.showResults);
    }).catch(function (err) {
        console.log(err);
    });
})();

function changePublishButton(value) {
    if (value) {
        publishBtn.innerHTML = "Hide Poll From Users";
        document.querySelector("#pollState").innerHTML = "Live Poll";
        document.querySelectorAll("#savedPollRemoveBtn").forEach(element => {
            element.style.display = "none";
        });
    } else {
        publishBtn.innerHTML = "Publish Poll To Users";
        document.querySelector("#pollState").innerHTML = "Saved Poll";
        document.querySelectorAll("#savedPollRemoveBtn").forEach(element => {
            element.style.display = "block";
        });
    }
}

function changeResultButton(value) {
    if (value) {
        resultBtn.innerHTML = "Hide Results From Users";
    } else {
        resultBtn.innerHTML = "Publish Results To Users";
    }
}

//-------------showResults--------------


var refreshResults = document.querySelector("#refreshResults");

refreshResults.addEventListener("click", function () {
    var cl = "3hn8USMxGhERGkSiVrau_0";

    // var pollResultContainer = document.querySelector("."+cl.toString());
    // console.log(pollResultContainer);

    //  db.collection('pollResults').onSnapshot(snapshot =>{
    db.collection(PollName).get().then(snapshot => {
        var docs = snapshot.docs; //to get document
        docs.forEach(doc => {
            const docData = doc.data();
            var docId = doc.id;

            var options = docData.optionResponse;
            var optionIndex = 0
            options.forEach(option => {
                var id = docId + "_" + optionIndex;
                var badge = document.getElementById(id.toString());
                badge.innerHTML = option;

                optionIndex += 1;
            });
            var id = docId + "_footer";
            document.getElementById(id.toString()).innerHTML = "Total Response: " + docData.totalResponse;


        });


    }, err => {
        console.log(err.message);
    });

});