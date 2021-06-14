const authen = firebase.auth();
const database = firebase.database();
const databasex = firebase.database;

//myFunction();

function myFunction() {
  toLoop();
}

function toLoop() {
  var query = database.ref("WD_USER_MY_CURRENT_STATUS").orderByKey();

  query.on("value", (snapshot) => {

    // var mDate = databasex.ServerValue.TIMESTAMP;
    // var myDate = new Date(mDate);
    // myDate = myDate.getHours();
    // console.log(myDate);
    // console.log(snapshot)

    var Lobby = 0;
    var insideHall = 0;

    var Gaming = 0;
    var Client = 0;
    var PortableSSDs = 0;
    var Enterprise = 0;
    var NVMeandSSD = 0;
    var SmartVideo = 0;
    var WesternDigitalReadforNAS = 0;
    var Professional = 0;
    var WorkOnTheGo = 0;
    var WorkFromHome = 0;

    var insideWorkshopLobby = 0;
    var insideClientPlus = 0;
    var insideConsumer = 0;
    var insideGaming = 0;
    var insideEnterprise = 0;

    var insideAudi = 0;
    var infodesk = 0;
    var totalUser=0;

    var liveInBO1=0;
    var liveInBO2=0;
    var liveInBO3=0;
    var liveInBO4=0;
    var liveInBO5=0;
    var liveInBO6=0;
    var liveInBO7=0;
    var liveInBO8=0;
    var liveInBO9=0;
    var liveInBO10=0;
    var liveInBO11=0;
    var liveInBO12=0;
    var liveInBO13=0;
    var liveInBO14=0;
    var liveInBO15=0;
    var liveInBO16=0;
    var liveInBO17=0;
    var liveInBO18=0;
    
    
    var gotoBreakeout=0;

    snapshot.forEach(function (childSnapshot) {


      var key = childSnapshot.key;
      var childData = childSnapshot.val();


      if (childData['state']) {
        let state = childData['state'];

        if (state != 'offline') {
          totalUser++;
          if (childData['location']) {


            if (childData['location'] == "lobby") {
              Lobby++;
            }

            if (childData['location'] == "insideHall") {
              insideHall++;
            }

            if (childData['location'] == "insideStall" && childData['stallName'] == "Gaming") {
              Gaming++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Client+") {
              Client++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Portable SSDs") {
              PortableSSDs++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Enterprise") {
              Enterprise++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "NVMe and SSD") {
              NVMeandSSD++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "SmartVideo") {
              SmartVideo++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Western Digital Read for NAS") {
              WesternDigitalReadforNAS++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Professional") {
              Professional++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Work On The Go") {
              WorkOnTheGo++;
            }
            if (childData['location'] == "insideStall" && childData['stallName'] == "Work From Home") {
              WorkFromHome++;
            }

            if (childData['location'] == "insideAudi") {
              insideAudi++;
            }
            if (childData['location'] == "infodesk") {
              infodesk++;
            }

            if (childData['location'] == "insideWorkshopLobby") {
              insideWorkshopLobby++;
            }
            if (childData['location'] == "insideClientPlus") {
              insideClientPlus++;
            }
            if (childData['location'] == "insideConsumer") {
              insideConsumer++;
            }
            if (childData['location'] == "insideGaming") {
              insideGaming++;
            }
            if (childData['location'] == "insideEnterprise") {
              insideEnterprise++;
            }

            if (childData['location'] == "breakOutRoomHotsopt") {
              gotoBreakeout++;
            }
            



            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "1") {
              liveInBO1++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "2") {
              liveInBO2++;
            } 
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "3") {
              liveInBO13++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "4") {
              liveInBO4++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "5") {
              liveInBO5++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "6") {
              liveInBO6++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "7") {
              liveInBO7++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "8") {
              liveInBO8++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "9") {
              liveInBO9++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "10") {
              liveInBO10++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "11") {
              liveInBO11++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "12") {
              liveInBO12++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "13") {
              liveInBO13++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "14") {
              liveInBO14++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "15") {
              liveInBO15++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "16") {
              liveInBO16++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "17") {
              liveInBO17++;
            }
            if (childData['location'] == "insideBreakout" && childData['brakOutRoom'] == "18") {
              liveInBO18++;
            }

          }
        }
      }
    })
 

    document.getElementById("liveInLobby").innerHTML = Lobby;

    document.getElementById("insideHall").innerHTML = insideHall;
    document.getElementById("Gaming").innerHTML = Gaming;
    document.getElementById("Client").innerHTML = Client;
    document.getElementById("PortableSSDs").innerHTML = PortableSSDs;
    document.getElementById("Enterprise").innerHTML = Enterprise;
    document.getElementById("NVMeandSSD").innerHTML = NVMeandSSD;
    document.getElementById("SmartVideo").innerHTML = SmartVideo;
    document.getElementById("WesternDigitalReadforNAS").innerHTML = WesternDigitalReadforNAS;
    document.getElementById("Professional").innerHTML = Professional;
    document.getElementById("WorkOnTheGo").innerHTML = WorkOnTheGo;
    document.getElementById("WorkFromHome").innerHTML = WorkFromHome;

    document.getElementById("insideWorkshopLobby").innerHTML = insideWorkshopLobby;
    document.getElementById("insideClientPlus").innerHTML = insideClientPlus;
    document.getElementById("insideConsumer").innerHTML = insideConsumer;
    document.getElementById("insideGaming").innerHTML = insideGaming;


    document.getElementById("insideEnterprise").innerHTML = insideEnterprise;
    document.getElementById("insideAudi").innerHTML = insideAudi;
    document.getElementById("infodesk").innerHTML = infodesk;

    document.getElementById("totalUser").innerHTML = totalUser;
    document.getElementById("gotoBreakeout").innerHTML = gotoBreakeout;
    
    document.getElementById("liveInBO1").innerHTML = liveInBO1;
    document.getElementById("liveInBO2").innerHTML = liveInBO2;
    document.getElementById("liveInBO3").innerHTML = liveInBO3;
    document.getElementById("liveInBO4").innerHTML = liveInBO4;
    document.getElementById("liveInBO5").innerHTML = liveInBO5;
    document.getElementById("liveInBO6").innerHTML = liveInBO6;
    document.getElementById("liveInBO7").innerHTML = liveInBO7;
    document.getElementById("liveInBO8").innerHTML = liveInBO8;
    document.getElementById("liveInBO9").innerHTML = liveInBO9;
    document.getElementById("liveInBO10").innerHTML = liveInBO10;
    document.getElementById("liveInBO11").innerHTML = liveInBO11;
    document.getElementById("liveInBO12").innerHTML = liveInBO12;
    document.getElementById("liveInBO13").innerHTML = liveInBO13;
    document.getElementById("liveInBO14").innerHTML = liveInBO14;
    document.getElementById("liveInBO15").innerHTML = liveInBO15;
    document.getElementById("liveInBO16").innerHTML = liveInBO16;
    document.getElementById("liveInBO17").innerHTML = liveInBO17;
    document.getElementById("liveInBO18").innerHTML = liveInBO18;

    

  })
}