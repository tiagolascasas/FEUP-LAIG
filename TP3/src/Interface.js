"use strict";

 /**
 * Interface class, creating a GUI interface.
 * @constructor
 */
function Interface()
{
    CGFinterface.call(this);
}

Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
Interface.prototype.init = function(application)
{
    CGFinterface.prototype.init.call(this, application);

    this.gui = new dat.GUI();
    this.groupA = this.gui.addFolder("Other settings");

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 * @param {Array} lights - an associative array with the lights
 */
Interface.prototype.addLightsGroup = function(lights)
{
    this.groupA.open();

    for (let key in lights)
    {
        if (lights.hasOwnProperty(key))
        {
            this.scene.lightValues[key] = lights[key][0];
            this.groupA.add(this.scene.lightValues, key);
        }
    }
}

Interface.prototype.addGameOptions = function()
{
    let scene = this.scene;
    let oolong = this.scene.oolong;

    let listeners = {   "init": function()
                        {
                            oolong.init(scene.mode, scene.difficulty, scene.timeout);
                        },
                        "undo": function()
                        {
                            oolong.undo();
                        },
                        "redo": function()
                        {
                            oolong.redo();
                        },
                        "shutdown": function()
                        {
                            oolong.request("quit");
                        },
                        "resign": function()
                        {
                            oolong.resignCurrentPlayer();
                        }
                    };

    this.gui.width = 360;
    let keys = [];
    for (let key in scene.scenes)
        keys.push(key);

    this.groupA.close();
    this.groupA.add(listeners, "shutdown").name("Shutdown SICStus server");

    var groupC = this.gui.addFolder("Match runtime settings");
    groupC.open();
    groupC.add(scene, 'cameraID', ['Dynamic', 'Static', 'Free']).name("Camera");
    groupC.add(scene, 'currentScene', keys).name('Background scene');
    groupC.add(scene, 'currentTimeout', 0, 30).name("Time left for current player").listen();
    groupC.add(scene, 'tablesBlack', 0, 5).name("Green's conquered tables").listen();
    groupC.add(scene, 'tablesGreen', 0, 5).name("Black's conquered tables").listen();
    groupC.add(listeners, "undo").name("Undo move");
    groupC.add(listeners, "redo").name("Redo move");
    groupC.add(listeners, "resign").name("Resign from current match");

    var groupB = this.gui.addFolder("Match initial settings");
    groupB.open();
    groupB.add(scene, 'mode', [ '1vs1', '1vsAI', 'AIvsAI' ]).name("Game mode");
    groupB.add(scene, 'difficulty', [ 'Easy', 'Hard' ]).name("Difficulty");
    groupB.add(scene, 'timeout', 10, 30).name("Turn timeout value");
    groupB.add(listeners, "init").name("Start/reset game");
};
