function loadCanvasApp(app) {
    var showSplash = function () {
      var play = document.getElementById("play");
      // splash wrapper
      var wrapper = document.createElement("div");
      wrapper.id = "application-splash-wrapper";
      if (play) play.appendChild(wrapper);
  
      if (!play) {
        setTimeout(function () {
          var play = document.getElementById("play");
          if (play) play.appendChild(wrapper);
        }, 400);
      }
  
      wrapper.style.backgroundImage = "url(../assets/images/canvas-load.jpg)";
      wrapper.style.backgroundrepeat = "no-repeat";
      wrapper.style.backgroundSize = "cover";
  
      // splash
      var splash = document.createElement("div");
      splash.id = "application-splash";
      wrapper.appendChild(splash);
      splash.style.display = "none";
  
      var logo = document.createElement("img");
  
      // logo.src = 'https://storage.googleapis.com/virtual-event-273009.appspot.com/brand_logo_839x276.png';
      logo.src = "../assets/images/logo.png";
      splash.appendChild(logo);
      logo.onload = function () {
        splash.style.display = "block";
      };
  
      var container = document.createElement("div");
      container.id = "progress-bar-container";
      splash.appendChild(container);
  
      var bar = document.createElement("div");
      bar.id = "progress-bar";
      container.appendChild(bar);
    };
  
    var hideSplash = function () {
      var splash = document.getElementById("application-splash-wrapper");
      splash.parentElement.removeChild(splash);
    };
  
    var setProgress = function (value) {
      var bar = document.getElementById("progress-bar");
      if (bar) {
        value = Math.min(1, Math.max(0, value));
        bar.style.width = value * 100 + "%";
      }
    };
  
    var createCss = function () {
      var css = [
        "body {",
        "    background-color: #283538;",
        "}",
  
        "#application-splash-wrapper {",
        "    position: absolute;",
        "    top: 0;",
        "    left: 0;",
        "    height: 100%;",
        "    width: 100%;",
        "    background-color: #283538;",
        "}",
  
        "#application-splash {",
        "    position: absolute;",
        "    top: calc(50% - 28px);",
        "    width: 264px;",
        "    left: calc(50% - 132px);",
        "}",
  
        "#application-splash img {",
        "    width: 100%;",
        "}",
  
        "#progress-bar-container {",
        "    margin: 20px auto 0 auto;",
        "    height: 2px;",
        "    width: 100%;",
        "    background-color: #1d292c;",
        "}",
  
        "#progress-bar {",
        "    width: 0%;",
        "    height: 100%;",
        "    background-color: #f60;",
        "}",
        "@media (max-width: 480px) {",
        "    #application-splash {",
        "        width: 170px;",
        "        left: calc(50% - 85px);",
        "    }",
        "}",
      ].join("\n");
  
      var style = document.createElement("style");
      style.type = "text/css";
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
  
      document.head.appendChild(style);
    };
  
    /*    app.on('preload:start', function() {
             
               var logoAsset = app.assets.find('loadingScreen.jpg');
               
             
              if (logoAsset) {
                  this.url=logoAsset.getFileUrl();
                  console.log(this.url);
                      var bgDiv = document.getElementById('application-splash-wrapper');
                      bgDiv.style.backgroundImage='url('+this.url+')';
                      bgDiv.style.backgroundrepeat='no-repeat';
                      bgDiv.style.backgroundSize='cover';
              }else{
                  console.log('Not Found');
              }
          });*/
  
    showSplash();
    createCss();
  
    app.on("preload:end", function () {
      app.off("preload:progress");
    });
    app.on("preload:progress", setProgress);
    app.on("start", hideSplash);
  }
  