"use strict";

const DEGREE_TO_RAD = Math.PI / 180;

/**
 * Scene class, representing the scene that is to be rendered.
 * @constructor
 */
function Scene(gui)
{
    CGFscene.call(this);

    this.interface = gui;

    this.lightValues = {};
    this.nodesValues = {};
    this.colorComponent = 0;
    this.speedOfShader = 1000;
    this.scaleFactor = 1.0;
    this.mode = "1vs1";
    this.difficulty = "Easy";
    this.cameraID = "Dynamic";
};

Scene.prototype = Object.create(CGFscene.prototype);
Scene.prototype.constructor = Scene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 * @param {CGFapplication} application - the application to which this scene is associated with
 */
Scene.prototype.init = function(application)
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

	this.customShader = new CGFshader(this.gl,
                                    "../lib/CGF/shaders/Phong/phong-vertex.glsl",
                                    "../lib/CGF/shaders/Phong/phong-fragment.glsl");
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
Scene.prototype.initLights = function()
{
    let i = 0;

    for (let key in this.graph.lights)
    {
        if (i >= 8)
            break;

        if (this.graph.lights.hasOwnProperty(key))
        {
            let light = this.graph.lights[key];

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
Scene.prototype.initCameras = function()
{
    this.cameraDynamic = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 15, 20), vec3.fromValues(0, 0, 0));
    this.cameraStatic = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(1, 30, 1), vec3.fromValues(0, 0, 0));
    this.cameraFree = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));

    this.cameraStatic.orbit(CGFcameraAxis.Y, -Math.PI / 4);
    this.camera = this.cameraDynamic;
};

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
Scene.prototype.onGraphLoaded = function()
{
	this.objGraph = this.graph.objGraph;
    this.oolong = new Oolong(this);
    this.setPickEnabled(true);

    this.cameraDynamic.near = this.graph.near;
    this.cameraDynamic.far = this.graph.far;
    this.cameraStatic.near = this.graph.near;
    this.cameraStatic.far = this.graph.far;
    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addGameOptions();
};

/**
 * Displays the scene.
 */
Scene.prototype.display = function()
{
    this.processPicking();
	this.clearPickRegistration();

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.updateProjectionMatrix();
    this.loadIdentity();

    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        this.multMatrix(this.graph.initialTransforms);

		//this.axis.display();

        let i = 0;
        for (let key in this.lightValues)
        {
            if (this.lightValues.hasOwnProperty(key))
            {
                if (this.lightValues[key])
                {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else
                {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        this.pushMatrix();
        this.graph.displayScene();
        this.popMatrix();

        this.pushMatrix();
        this.oolong.display();
        this.popMatrix();
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
Scene.prototype.update = function(currTime)
{
	if(!this.graph.loadedOk)
		return;
	else
    {
    	this.graph.objGraph.update(currTime);
        this.oolong.update(currTime);

        switch (this.cameraID)
        {
            case "Dynamic":
                this.cameraDynamic = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 15, 20), vec3.fromValues(0, 0, 0));
                this.camera = this.cameraDynamic;
                let angle = this.oolong.cameraAngle;
                this.camera.orbit(CGFcameraAxis.Y, angle);
                this.interface.setActiveCamera(null);
                break;
            case "Static":
                this.camera = this.cameraStatic;
                this.interface.setActiveCamera(null);
                break;
            case "Free":
                this.camera = this.cameraFree;
                this.interface.setActiveCamera(this.camera);
                break;
        }
    }

	let factor = 0.5*Math.cos(currTime / this.speedOfShader) + 0.51;	//0.01 <= factor <= 1.01
	this.customShader.setUniformsValues({timeFactor: factor, scaleFactor: 1 / this.scaleFactor, component: this.colorComponent});
};

Scene.prototype.processPicking = function ()
{
	if (this.pickMode == false)
    {
		if (this.pickResults != null && this.pickResults.length > 0)
        {
			for (let i=0; i< this.pickResults.length; i++)
            {
				let obj = this.pickResults[i][0];
				if (obj)
				{
					let pickID = this.pickResults[i][1];
                    this.oolong.updatePickedElements(pickID);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
};
