var LanguageManager = pc.createScript('languageManager');

LanguageManager.attributes.add('videos', {
    type: 'entity',
    array: true
});

LanguageManager.attributes.add('English', {
    type: 'entity',
    
});
LanguageManager.attributes.add('Hindi', {
    type: 'entity',
    
});
LanguageManager.attributes.add('Bangla', {
    type: 'entity',
   
});
LanguageManager.attributes.add('Gujraati', {
    type: 'entity',
    
});

LanguageManager.attributes.add('SceneManager', {
    type: 'entity',
    
});

LanguageManager.attributes.add('Info', { type: 'entity'});
LanguageManager.attributes.add('Home', { type: 'entity'});


// 1=english 2=hindi 3=bangla 4=gujraati
LanguageManager.attributes.add('MatInfo', { type: 'asset', assetType: 'material',array:true});
LanguageManager.attributes.add('MatHome', { type: 'asset', assetType: 'material',array:true});

// initialize code called once per entity
LanguageManager.prototype.initialize = function() {
    var self=this;
    this.English.element.on('click', function (evt) {
        
        self.changevideos("English");
       
//console.log("english Selected");
    });
    this.Hindi.element.on('click', function (evt) {
        
        self.changevideos("Hindi");
       
        //console.log("hindi Selected");
    });
    this.Bangla.element.on('click', function (evt) {
        
        self.changevideos("Bangla");
        
       // console.log("bangla Selected");
    });
    this.Gujraati.element.on('click', function (evt) {
        
        self.changevideos("Gujraati");
        
        //console.log("gujraati Selected");
    });
};

// update code called every frame
LanguageManager.prototype.update = function(dt) {
    
};

LanguageManager.prototype.changevideos=function(lang)
{
    if(lang=="English")
        {
                this.videos[0].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/Lobby_Loop.mp4"; 
            this.videos[1].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToSession.mp4";
            this.videos[2].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToMeetingRoom.mp4";
            this.videos[3].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/SessionLoop.mp4";
            this.videos[4].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/HallLoop.mp4";
            this.videos[5].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToL%26D1.mp4";
            this.videos[6].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/HallLoop.mp4";
            this.videos[7].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToInfo.mp4";
             this.videos[8].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToL%26D2.mp4";
             this.videos[9].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/ToL%26D3.mp4";
                        this.videos[10].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/EnglishN/Low/Intro_English.mp4";
            this.Info.model.meshInstances[0].material = this.MatInfo[0].resource;
            this.Home.model.meshInstances[0].material = this.MatHome[0].resource;
            
        }
    else if(lang=="Hindi")
        {
            
                this.videos[0].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/Lobby_Loop.mp4"; 
            this.videos[1].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToSession.mp4";
            this.videos[2].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToMeetingRoom.mp4";
            this.videos[3].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/SessionLoop.mp4";
            this.videos[4].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/HallLoop.mp4";
            this.videos[5].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToL%26D1.mp4";
            this.videos[6].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/HallLoop.mp4";
            this.videos[7].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToInfo.mp4";
             this.videos[8].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToL%26D2.mp4";
             this.videos[9].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/ToL%26D3.mp4";
             this.videos[10].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Hindi/Intro_Hindi.mp4";
            this.Info.model.meshInstances[0].material = this.MatInfo[1].resource;
            this.Home.model.meshInstances[0].material = this.MatHome[1].resource;
        }
    else if(lang=="Bangla")
        { 
             this.videos[0].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/Lobby_Loop.mp4"; 
            this.videos[1].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToSession.mp4";
            this.videos[2].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToMeetingRoom.mp4";
            this.videos[3].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/SessionLoop.mp4";
            this.videos[4].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/HallLoop.mp4";
            this.videos[5].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToL%26D1.mp4";
            this.videos[6].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/HallLoop.mp4";
            this.videos[7].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToInfo.mp4";
             this.videos[8].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToL%26D2.mp4";
             this.videos[9].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/ToL%26D3.mp4";
             this.videos[10].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Bangali/Intro_Bengali.mp4";
            this.Info.model.meshInstances[0].material = this.MatInfo[1].resource;
            this.Home.model.meshInstances[0].material = this.MatHome[1].resource;
        }
    else if(lang=="Gujraati")
        {
             this.videos[0].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/Lobby_Loop.mp4"; 
            this.videos[1].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToSession.mp4";
            this.videos[2].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToMeetingRoom.mp4";
            this.videos[3].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/SessionLoop.mp4";
            this.videos[4].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/HallLoop.mp4";
            this.videos[5].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToL%26D1.mp4";
            this.videos[6].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/HallLoop.mp4";
            this.videos[7].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToInfo.mp4";
             this.videos[8].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToL%26D2.mp4";
             this.videos[9].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/ToL%26D3.mp4";
             this.videos[10].script.loopVideoComp.video_url="https://storage.googleapis.com/djtesting.appspot.com/Flipkart/Gujraati/Intro_Gujrati.mp4";
            this.Info.model.meshInstances[0].material = this.MatInfo[1].resource;
            this.Home.model.meshInstances[0].material = this.MatHome[1].resource;
        }
    this.entity.enabled=false;
    this.SceneManager.script.sceneManager.scene_state=1;
};

// swap method called for script hot-reloading
// inherit your script state here
// LanguageManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/