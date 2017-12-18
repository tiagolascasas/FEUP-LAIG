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

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 * @param {Array} lights - an associative array with the lights
 */
Interface.prototype.addLightsGroup = function(lights)
{/*
    var group = this.gui.addFolder("Lights");
    group.open();

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }*/
}

Interface.prototype.addGameOptions = function()
{
    var group = this.gui.addFolder("Game settings");
    group.open();

    group.add(this.scene, 'mode', [ '1vs1', '1vsAI', 'AIvsAI' ]).name("Game mode");
    group.add(this.scene, 'difficulty', [ 'Easy', 'Hard' ]).name("Difficulty");

    let scene = this.scene;
    let oolong = this.scene.oolong;

    let listeners = {   "init": function()
                        {
                            oolong.init(scene.mode, scene.difficulty);
                        },
                        "undo": function()
                        {
                            oolong.undo();
                        }};

    group.add(listeners, "undo").name("Undo last move");
    group.add(listeners, "init").name("Start/reset game");
};
