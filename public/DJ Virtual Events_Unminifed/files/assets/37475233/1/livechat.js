var Livechat = pc.createScript('livechat');

// initialize code called once per entity
Livechat.prototype.initialize = function() {
//     var div = document.createElement("div");
//     div.style.width = "500px";
//     div.style.height = "500px";
//     div.style.background = "red";
//   //  div.style.color = "white";
//    // div.innerHTML = "Hello";
//     div.id="chat-widget";

//     document.getElementById("application-canvas").appendChild(div);
    // div.style.background = "red";
    // div.innerHTML = "Hello";
   // setInterval(function(){
    var chatweeManager = new ChatweeLib.ChatweeManager('5efc334d860619716c372f32');	//'5ee92775446e71100107eb06');//
    chatweeManager.Run();    
  //  },1000);
    
};

// update code called every frame
Livechat.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Livechat.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/