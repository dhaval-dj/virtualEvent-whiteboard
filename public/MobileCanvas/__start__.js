function createMobileCanvasApp() {
    var CANVAS_ID = 'application-canvas';

    var canvas, devices, app;

    var createCanvas = function () {
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', CANVAS_ID);
        canvas.setAttribute('tabindex', 0);
         canvas.setAttribute('class', 'canvasBox');
        // canvas.style.visibility = 'hidden';

        // Disable I-bar cursor on click+drag
        canvas.onselectstart = function () { return false; };

        document.getElementById("play").appendChild(canvas);

        return canvas;
    };

    var createInputDevices = function (canvas) {
        var devices = {
            elementInput: new pc.ElementInput(canvas, {
                useMouse: MOBILE_INPUT_SETTINGS.useMouse,
                useTouch: MOBILE_INPUT_SETTINGS.useTouch
            }),
            keyboard: MOBILE_INPUT_SETTINGS.useKeyboard ? new pc.Keyboard(window) : null,
            mouse: MOBILE_INPUT_SETTINGS.useMouse ? new pc.Mouse(canvas) : null,
            gamepads: MOBILE_INPUT_SETTINGS.useGamepads ? new pc.GamePads() : null,
            touch: MOBILE_INPUT_SETTINGS.useTouch && pc.platform.touch ? new pc.TouchDevice(canvas) : null
        };
        return devices;
    };

    var configureCss = function (fillMode, width, height) {
        // Configure resolution and resize event
        if (canvas.classList) {
            canvas.classList.add('fill-mode-' + fillMode);
        }

        // css media query for aspect ratio changes
        var css  = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
        css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
        css += "        width: auto;";
        css += "        height: 100%;";
        css += "        margin: 0 auto;";
        css += "    }";
        css += "}";

        // append css to style
        if (document.head.querySelector) {
            document.head.querySelector('style').innerHTML += css;
        }
    };

    var reflow = function () {
        app.resizeCanvas();
        console.log(app.resizeCanvas());
    };

    var displayError = function (html) {
        var div = document.createElement('div');

        div.innerHTML  = [
            '<table style="background-color: #8CE; width: 100%; height: 100%;">',
            '  <tr>',
            '      <td align="center">',
            '          <div style="display: table-cell; vertical-align: middle;">',
            '              <div style="">' + html + '</div>',
            '          </div>',
            '      </td>',
            '  </tr>',
            '</table>'
        ].join('\n');

        document.body.appendChild(div);
    };

    canvas = createCanvas();
    devices = createInputDevices(canvas);

    try {
        app = new pc.Application(canvas, {
            elementInput: devices.elementInput,
            keyboard: devices.keyboard,
            mouse: devices.mouse,
            gamepads: devices.gamepads,
            touch: devices.touch,
            graphicsDeviceOptions: window.MOBILE_CONTEXT_OPTIONS,
            assetPrefix: window.MOBILE_ASSET_PREFIX || "",
            scriptPrefix: window.MOBILE_SCRIPT_PREFIX || "",
            scriptsOrder: window.MOBILE_SCRIPTS || []
        });
    } catch (e) {
        if (e instanceof pc.UnsupportedBrowserError) {
            displayError('This page requires a browser that supports WebGL.<br/>' +
                    '<a href="http://get.webgl.org">Click here to find out more.</a>');
        } else if (e instanceof pc.ContextCreationError) {
            displayError("It doesn't appear your computer can support WebGL.<br/>" +
                    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
        } else {
            displayError('Could not initialize application. Error: ' + e);
        }

        return;
    }

    var configure = function () {
        app.configure(MOBILE_CONFIG_FILENAME, function (err) {
            if (err) {
                console.error(err);
            }
            configureCss(app._fillMode, app._width, app._height);
            
            // do the first reflow after a timeout because of
            // iOS showing a squished iframe sometimes
            setTimeout(function () {
                 reflow();

                window.addEventListener('resize', reflow, false);
                window.addEventListener('orientationchange', reflow, false);

                app.preload(function (err) {
                    if (err) {
                        console.error(err);
                    }

                    app.loadScene(MOBILE_SCENE_PATH, function (err, scene) {
                        if (err) {
                            console.error(err);
                        }

                        app.start();
                    });
                });
            });
        });
    };

    if (MOBILE_PRELOAD_MODULES.length > 0) {
        loadModules(MOBILE_PRELOAD_MODULES, MOBILE_ASSET_PREFIX, configure);
    } else {
        configure();
    }
}


function startMobileCanvasApp() {
    console.log("Mobile init canvas");
    createMobileCanvasApp();
    pc.script.createLoadingScreen(loadMobileCanvasApp);
}

window.startMobileCanvasApp = startMobileCanvasApp;
function createMobileCanvasApp() {
    var CANVAS_ID = 'application-canvas';

    var canvas, devices, app;

    var createCanvas = function () {
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', CANVAS_ID);
        canvas.setAttribute('tabindex', 0);
         canvas.setAttribute('class', 'canvasBox');
        // canvas.style.visibility = 'hidden';

        // Disable I-bar cursor on click+drag
        canvas.onselectstart = function () { return false; };

        document.getElementById("play").appendChild(canvas);

        return canvas;
    };

    var createInputDevices = function (canvas) {
        var devices = {
            elementInput: new pc.ElementInput(canvas, {
                useMouse: MOBILE_INPUT_SETTINGS.useMouse,
                useTouch: MOBILE_INPUT_SETTINGS.useTouch
            }),
            keyboard: MOBILE_INPUT_SETTINGS.useKeyboard ? new pc.Keyboard(window) : null,
            mouse: MOBILE_INPUT_SETTINGS.useMouse ? new pc.Mouse(canvas) : null,
            gamepads: MOBILE_INPUT_SETTINGS.useGamepads ? new pc.GamePads() : null,
            touch: MOBILE_INPUT_SETTINGS.useTouch && pc.platform.touch ? new pc.TouchDevice(canvas) : null
        };
        return devices;
    };

    var configureCss = function (fillMode, width, height) {
        // Configure resolution and resize event
        if (canvas.classList) {
            canvas.classList.add('fill-mode-' + fillMode);
        }

        // css media query for aspect ratio changes
        var css  = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
        css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
        css += "        width: auto;";
        css += "        height: 100%;";
        css += "        margin: 0 auto;";
        css += "    }";
        css += "}";

        // append css to style
        if (document.head.querySelector) {
            document.head.querySelector('style').innerHTML += css;
        }
    };

    var reflow = function () {
        app.resizeCanvas();
        console.log(app.resizeCanvas());
    };

    var displayError = function (html) {
        var div = document.createElement('div');

        div.innerHTML  = [
            '<table style="background-color: #8CE; width: 100%; height: 100%;">',
            '  <tr>',
            '      <td align="center">',
            '          <div style="display: table-cell; vertical-align: middle;">',
            '              <div style="">' + html + '</div>',
            '          </div>',
            '      </td>',
            '  </tr>',
            '</table>'
        ].join('\n');

        document.body.appendChild(div);
    };

    canvas = createCanvas();
    devices = createInputDevices(canvas);

    try {
        app = new pc.Application(canvas, {
            elementInput: devices.elementInput,
            keyboard: devices.keyboard,
            mouse: devices.mouse,
            gamepads: devices.gamepads,
            touch: devices.touch,
            graphicsDeviceOptions: window.MOBILE_CONTEXT_OPTIONS,
            assetPrefix: window.MOBILE_ASSET_PREFIX || "",
            scriptPrefix: window.MOBILE_SCRIPT_PREFIX || "",
            scriptsOrder: window.MOBILE_SCRIPTS || []
        });
    } catch (e) {
        if (e instanceof pc.UnsupportedBrowserError) {
            displayError('This page requires a browser that supports WebGL.<br/>' +
                    '<a href="http://get.webgl.org">Click here to find out more.</a>');
        } else if (e instanceof pc.ContextCreationError) {
            displayError("It doesn't appear your computer can support WebGL.<br/>" +
                    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
        } else {
            displayError('Could not initialize application. Error: ' + e);
        }

        return;
    }

    var configure = function () {
        app.configure(MOBILE_CONFIG_FILENAME, function (err) {
            if (err) {
                console.error(err);
            }
            configureCss(app._fillMode, app._width, app._height);
            
            // do the first reflow after a timeout because of
            // iOS showing a squished iframe sometimes
            setTimeout(function () {
                 reflow();

                window.addEventListener('resize', reflow, false);
                window.addEventListener('orientationchange', reflow, false);

                app.preload(function (err) {
                    if (err) {
                        console.error(err);
                    }

                    app.loadScene(MOBILE_SCENE_PATH, function (err, scene) {
                        if (err) {
                            console.error(err);
                        }

                        app.start();
                    });
                });
            });
        });
    };

    if (MOBILE_PRELOAD_MODULES.length > 0) {
        loadModules(MOBILE_PRELOAD_MODULES, MOBILE_ASSET_PREFIX, configure);
    } else {
        configure();
    }
}


function startMobileCanvasApp() {
    console.log("Mobile init canvas");
    createMobileCanvasApp();
    pc.script.createLoadingScreen(loadMobileCanvasApp);
}

window.startMobileCanvasApp = startMobileCanvasApp;
