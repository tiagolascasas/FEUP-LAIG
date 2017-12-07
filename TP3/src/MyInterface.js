 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface()
{
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application)
{
    CGFinterface.prototype.init.call(this, application);

    this.gui = new dat.GUI();

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 * @param {Array} lights - an associative array with the lights
 */
MyInterface.prototype.addLightsGroup = function(lights)
{
    var group = this.gui.addFolder("Lights");
    group.open();

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

/**
 * Adds a list containing the IDs of the selectable nodes
 * and options to change the selected color, speed and size of shader animation
 * @param {Array} graph - the scene graph
 */
MyInterface.prototype.addNodesGroup = function(graph)
{/*
    let nodes = graph.getSelectableNodes();

    let keys = {};
	for (let i = 0; i < nodes.length; i++)
    {
        let id = nodes[i];
        keys[id] = id;
    }
    this.gui.add(graph, 'selectedNode', keys).name('Node with custom shader');

	this.gui.add(this.scene, 'colorComponent', {
			'Red': 0,
			'Green': 1,
			'Blue': 2
	}).name('Saturated component');

	this.gui.add(this.scene, 'speedOfShader', 1, 2000).name("Slowness of shape and color resize");

	this.gui.add(this.scene, 'scaleFactor', 0.1, 3.0).name("Scale of expansion");*/
};
