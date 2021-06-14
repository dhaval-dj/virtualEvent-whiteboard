var FullscreenVideoPlayer = pc.createScript('fullscreenVideoPlayer');

var fullscreenPublic;

FullscreenVideoPlayer.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

FullscreenVideoPlayer.attributes.add('event1', { type: 'string'});
FullscreenVideoPlayer.attributes.add('event2', { type: 'string' });

FullscreenVideoPlayer.attributes.add('screen1', {type: 'entity',});
FullscreenVideoPlayer.attributes.add('screen2', {type: 'entity',});


FullscreenVideoPlayer.attributes.add('vimeo1', {type: 'entity',});
FullscreenVideoPlayer.attributes.add('vimeo2', {type: 'entity',});

FullscreenVideoPlayer.attributes.add('manager', {type: 'entity',});


FullscreenVideoPlayer.prototype.initialize = function() {
    this.asset = null;
    this.assetId = 0;
    fullscreenPublic=this;
    var self=this;
    
    this.app.on('PlayScreen1', function(){
     
         self.showStallContent(self.html,self.event1,1);
          // self.screen1.enabled=true;
        // self.screen1.script.fullMediaPlayer.startVideo();
    });
    
     this.app.on('PlayScreen2', function(){
         self.showStallContent(self.html,self.event2,2);
       // self.screen2.enabled=true;
          //self.screen2.script.fullMediaPlayer.startVideo();
    });
    
    this.app.on('makeFullScreenVideo1', function(){
         // openFullscreen();
         // 
        if(fullscreenPublic.vimeo1){
            fullscreenPublic.vimeo1.script.vimeoPlacement.setFull(true);
       }
        if(fullscreenPublic.vimeo2){
            fullscreenPublic.vimeo2.script.vimeoPlacement.setFull(true);
       }
    });

    this.app.on('closeFullScreenVideo1', function(){
        // closeFullscreen();
        if(fullscreenPublic.vimeo1)
            fullscreenPublic.vimeo1.script.vimeoPlacement.setFull(false);
        if(fullscreenPublic.vimeo2)
            fullscreenPublic.vimeo2.script.vimeoPlacement.setFull(false);
   });
    
     this.app.on('deleteFullScreenElement', function(){
          removeFullScreenConetent();
      
         console.log('Hello Exit');
    });
    
   //this.showStallContent(this.html);
};


FullscreenVideoPlayer.prototype.attachAsset = function(assetId, fn) {
    this.assetId = assetId;
    if (! this.assetId)
        return fn.call(this);

    var asset = this.app.assets.get(this.assetId);
    var self = this;
    asset._onLoad = function(asset) {
        fn.call(self, asset, asset.resource);
    };
    asset.on('load', asset._onLoad);
    fn.call(this, asset, asset.resource);
    this.app.assets.load(asset);
};


FullscreenVideoPlayer.prototype.template = function(asset, html) {
    if (this.asset && this.asset !== asset)
        this.asset.off('load', this.asset._onLoad);
    this.asset = asset;
    this.element.innerHTML = html || ''; 
};

FullscreenVideoPlayer.prototype.showStallContent = function (html,event,state) {
    
    if(document.getElementById('fullscreen-container'))
        {
            document.getElementById('fullscreen-container').remove();
        }
    
    this.element = document.createElement('div');
    this.element.classList.add('fullscreen-container');
    this.element.setAttribute("id", 'fullscreen-container');
    
  //  document.body.appendChild(this.element);
    $(this.element).insertAfter( $( "#application-canvas" ) );
    
    this.asset = null;
    this.assetId = 0;

     if (this.assetId !== html.id)
        this.attachAsset(html.id, this.template);
    
    if(state==1)
        {
            
            if(document.getElementById('content-QNAPOLL'))
            {
                document.getElementById('content-QNAPOLL').style.display='flex';
            }
        }else{
              if(document.getElementById('content-QNAPOLL'))
            {
                document.getElementById('content-QNAPOLL').style.display='none';
            }
        }
     
    this.app.fire(event);//->auditoriumScreen.js
    
    
};

FullscreenVideoPlayer.prototype.removeIFRMAE = function () {
    if(this.element)
        this.element.remove();
   // this.app.fire('startBackSideInteraction');//emptyFadeController.js
};

function removeFullScreenConetent(){
     if(fullscreenPublic)
         {
              fullscreenPublic.removeIFRMAE();
         }
     if(document.getElementById('fullscreen-container'))
        {
            document.getElementById('fullscreen-container').remove();
        }
}

//Make Screen Fullsceeen
var docForFull = document.documentElement;
function openFullscreen() {
  
    if (docForFull.requestFullscreen) {
        docForFull.requestFullscreen();
    } else if (docForFull.mozRequestFullScreen) {
        docForFull.mozRequestFullScreen();
    } else if (docForFull.webkitRequestFullscreen) {
        docForFull.webkitRequestFullscreen();
    } else if (docForFull.msRequestFullscreen) {
        docForFull.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }


function fullScreenScreenController() {
    
    
   if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ||document.msFullscreenElement){

       // if(document.getElementById('fullscreen-container'))
       //      document.getElementById('fullscreen-container').style.visibility='visible';
       
        fullscreenPublic.app.fire('stopBackSideInteraction');//->emptyFadeController.js
        /*if(fullscreenPublic.screen1.enabled){
            fullscreenPublic.screen1.script.fullMediaPlayer.makeFullScreen();
        }
       
       if(fullscreenPublic.screen2.enabled){
            fullscreenPublic.screen2.script.fullMediaPlayer.makeFullScreen();
        }*/
       if(fullscreenPublic.vimeo1){
            fullscreenPublic.vimeo1.script.vimeoPlacement.setFull(true);
          /////////// fullscreenPublic.manager.script.manager.isSowThisItems(false);
       }
           
        if(fullscreenPublic.vimeo2){
            fullscreenPublic.vimeo2.script.vimeoPlacement.setFull(true);
          /////////// fullscreenPublic.manager.script.manager.isSowThisItems(false);
       }
       
       // if(fullscreenPublic)
       //      fullscreenPublic.showStallContent(fullscreenPublic.html,fullscreenPublic.event1,1);
       
       console.log('Set Full Screen');
   }else{
       if( document.getElementById('fullscreen-container'))
            document.getElementById('fullscreen-container').style.visibility='hidden';
       
        fullscreenPublic.app.fire('startBackSideInteraction');//->emptyFadeController.js

       fullscreenPublic.timer1 =  setTimeout(function(){
            console.log("called close ful screen");
            fullscreenPublic.app.fire("resetVimeoPosition");    
        }, 200);

        fullscreenPublic.timer2 = setTimeout(function(){
            console.log("called close ful screen");
            fullscreenPublic.app.fire("resetVimeoPosition");    
        }, 1000);
        console.log('Close Full Screen');
       
      //////////// fullscreenPublic.manager.script.manager.isSowThisItems(true);
       
       if(fullscreenPublic.vimeo1)
            fullscreenPublic.vimeo1.script.vimeoPlacement.setFull(false);
       
        if(fullscreenPublic.vimeo2)
            fullscreenPublic.vimeo2.script.vimeoPlacement.setFull(false);
         /* if(fullscreenPublic.screen1.enabled){
            fullscreenPublic.screen1.script.fullMediaPlayer.hideFullScreen();
        }
       
       if(fullscreenPublic.screen2.enabled){
            fullscreenPublic.screen2.script.fullMediaPlayer.hideFullScreen();
        }*/
        
   }
}

/////////////////FullScreen Exit Mode //////////////
document.addEventListener("fullscreenchange", function () {
    fullScreenScreenController();
    console.log('Check Close A');
});

document.addEventListener("mozfullscreenchange", function () {
    fullScreenScreenController();
    console.log('Check Close B');
});

document.addEventListener("webkitfullscreenchange", function () {
    fullScreenScreenController();
    console.log('Check Close C');
});

document.addEventListener("msfullscreenchange", function () {
    fullScreenScreenController();
    console.log('Check Close D');
});

