function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    let newArray = [];
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/

        newArray.push(arr[i]);
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);

      }
    }
    console.log(newArray);
    searchUser(newArray);
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    console.log('cs');
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    let value = e.target.textContent.trim();
    console.log(value);
    if (value.length > 0) {
      if (countries.includes(value)) {
        console.log(value);
        searchUser(e.target.textContent);
      }
    }
  });
}


/*An array containing all the country names in the world:*/
var countries = [
  "Alex O Connor",
  "Andrey Tischenko",
  "Ben Radford",
  "Christian Velroyen",
  "Davide Villa",
  "Egils Apsitis",
  "Florence Perrin",
  "Frank Saelzer",
  "Ghassan Azzi",
  "Jiri Olejnik",
  "Kai Frieben",
  "Madars Danilevics",
  "Manfred Berger",
  "Marianne Daude",
  "Mario Bartnig",
  "Mat Gasquy",
  "Nicolas Frapard",
  "Nigel Edwards",
  "Owais Mohammed",
  "Saif Khwaja",
  "Tareq Hussein",
  "Vineet Wadhwa",
  "Christian Velroyen",

  "Brad Bennett",
  "Darragh O Toole",
  "Gerry Edwards",
  "Joanna D Argent",
  "Kalima Toubal",
  "Miriam Franke",
  "Olga Kozlova",
  "Ruben Dennenwaldt",

  "Anna Rosa Cosi",
  "Fabrice Gellier",
  "Ioannis Mesoloras",
  "Peter Larkin",
  "Phill Dyson",
  "Uwe Kemmer",

  "Andy Dorian",
  "Colleen Crowley",
  "Greg Kwolek",
  "Jerry Kagele",
  "Jim Welsh",
  "Kristy Morris",
  "Kyle McElroy",
  "Pascal De Boer",
  "Rob Soderbery",
  "Ryan Inouye",
  "Scott Davis",
  "Siva Sivaram",
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);

//sale
function Select(key) {
  let keyvalue = 'none';
  if (key == 'all') {
    keyvalue = 'block';

    document.getElementById('reserbtn').style.opacity = "0.5";
  } else {
    document.getElementById('reserbtn').style.opacity = "1";
  }

  let x = document.querySelectorAll('.usa');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = keyvalue;
  }

  x = document.querySelectorAll('.sales');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = keyvalue;
  }

  x = document.querySelectorAll('.marketing');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = keyvalue;
  }

  x = document.querySelectorAll('.bu');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = keyvalue;
  }

  x = document.querySelectorAll('.' + key);
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "block";
  }

}


function searchUser(array) {
  const allUser = document.querySelectorAll('.all');

  if (array.length == 0) {
    for (let i = 0; i < allUser.length; i++) {
      allUser[i].style.display = 'block';
    }
    return;
  }

  for (let i = 0; i < allUser.length; i++) {
    let uname = allUser[i].getAttribute('name');
    if (array.includes(uname) > 0) {
      allUser[i].style.display = 'block';
    } else {
      allUser[i].style.display = 'none';
    }
  }
}

var timerHandle;


var modal = document.getElementById("myModal");
var close = document.getElementsByClassName("close")[0];

close.onclick = function () {
  const player = document.getElementById('youTubePlayer');
  clearTimeout(timerHandle);
  player.src = '';
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    const player = document.getElementById('youTubePlayer');
    clearTimeout(timerHandle);
    player.src = '';
    modal.style.display = "none";
  }
}


$('.all').on('click', function (e) {

  const youTube = $(this).attr('youTube');
  const uName = $(this).attr('name');
  const player = document.getElementById('youTubePlayer');
  var newKey = youTube.replace(" ", "%");
  player.src = 'https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/wd/WD%20EMEA%20-%20Videos/' + youTube;

  timerHandle = setTimeout(function () {
    console.log("Save User Data");
    updateUserWatchVideoInfo(uName);
  }, 5000);
  modal.style.display = "block";

});
