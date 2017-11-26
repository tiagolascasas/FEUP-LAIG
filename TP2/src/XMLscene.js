var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface)
{
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};
	this.nodesValues = {};
	this.colorComponent = 0;
	this.speedOfShader = 1000;
	this.scaleFactor = 1.0;
};

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 * @param {CGFapplication} application - the application to which this scene is associated with
 */
XMLscene.prototype.init = function(application)
{
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

	this.setUpdatePeriod(10);

	this.customShader = new CGFshader(this.gl, "shaders/dimension.vert", "shaders/saturated.frag");
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function()
{
    var i = 0;

    for (var key in this.graph.lights) {
        if (i >= 8)
            break;

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }
};

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function()
{
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
};

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
	this.objGraph = this.graph.objGraph;

    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    this.interface.addLightsGroup(this.graph.lights);
	this.interface.addNodesGroup(this.graph.objGraph);
};

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function()
{
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.updateProjectionMatrix();
    this.loadIdentity();

    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        this.multMatrix(this.graph.initialTransforms);

		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        this.graph.displayScene();
    }
	else
	{
		this.axis.display();
	}
    this.popMatrix();
};

/**
  * Updates the scene and the shader time timeFactor
  * @param {Number} currTime - the system time in milliseconds
  */
XMLscene.prototype.update = function(currTime)
{
	if(!this.graph.loadedOk)
		return;
	else
    	this.graph.objGraph.update(currTime);

	let factor = 0.5*Math.cos(currTime / this.speedOfShader) + 0.51;	//0.01 <= factor <= 1.01
	this.customShader.setUniformsValues({timeFactor: factor, scaleFactor: 1 / this.scaleFactor, component: this.colorComponent});
};
