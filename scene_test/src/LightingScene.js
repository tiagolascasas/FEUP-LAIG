var degToRad = Math.PI / 180.0;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.materialDefault = new CGFappearance(this);

	//this.gl.clearColor(21/255.0, 62/255.0, 111/255.0, 1.0);
	this.gl.clearColor(0.9, 0.9, 0.9, 1);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.setUpdatePeriod(100);

	this.axis = new CGFaxis(this);

	/* PRIMITIVES INSTANCIATION */
	this.rect = new PrimitiveRectangle(this, 0, 10, 12, 0, 0, 4, 0, 5);
	this.cyl = new PrimitiveCylinder(this, 3, 0.7, 0.7, 20, 20);
	this.sp = new PrimitiveSphere(this, 0.5, 20, 20);
	this.sp1 = new PrimitiveSphere(this, 0.5, 20, 20);
	this.rt = new PrimitiveTriangle(this, 0, 0, 0, 1, 0, 0, 0.5, 1, -1);
	this.sq = new PrimitiveRectangle(this, 0, 1, 1, 0, 0, 4, 0, 1);
	this.roof = new PrimitiveCylinder(this, 3, 0.9, 0.1, 20, 20);

	this.wallt = new CGFappearance(this);
	this.wallt.setAmbient(0.2, 0.2, 0.2, 1);
	this.wallt.setSpecular(0.1, 0.1, 0.1, 1);
	this.wallt.setDiffuse(0.4, 0.4, 0.4, 1);
	this.wallt.loadTexture("wall.jpg");
	this.wallt.setTextureWrap('REPEAT', 'REPEAT');

	this.grass = new CGFappearance(this);
	this.grass.setAmbient(0.2, 0.2, 0.2, 1);
	this.grass.setSpecular(0.1, 0.1, 0.1, 1);
	this.grass.setDiffuse(0.4, 0.4, 0.4, 1);
	this.grass.loadTexture("grass.jpg");
	this.grass.setTextureWrap('REPEAT', 'REPEAT');

	this.stone = new CGFappearance(this);
	this.stone.setAmbient(0.2, 0.2, 0.2, 1);
	this.stone.setSpecular(0.1, 0.1, 0.1, 1);
	this.stone.setDiffuse(0.4, 0.4, 0.4, 1);
	this.stone.loadTexture("stone.jpg");
	this.stone.setTextureWrap('REPEAT', 'REPEAT');

	this.stone = new CGFappearance(this);
	this.stone.setAmbient(0.2, 0.2, 0.2, 1);
	this.stone.setSpecular(0.1, 0.1, 0.1, 1);
	this.stone.setDiffuse(0.4, 0.4, 0.4, 1);
	this.stone.loadTexture("stone.jpg");
	this.stone.setTextureWrap('REPEAT', 'REPEAT');

	this.tile = new CGFappearance(this);
	this.tile.setAmbient(0.2, 0.2, 0.2, 1);
	this.tile.setSpecular(0.1, 0.1, 0.1, 1);
	this.tile.setDiffuse(0.4, 0.4, 0.4, 1);
	this.tile.loadTexture("tiles.jpg");
	this.tile.setTextureWrap('REPEAT', 'REPEAT');

	this.tower = new CGFappearance(this);
	this.tower.setAmbient(0.2, 0.2, 0.2, 1);
	this.tower.setSpecular(0.1, 0.1, 0.1, 1);
	this.tower.setDiffuse(0.4, 0.4, 0.4, 1);
	this.tower.loadTexture("tower.jpg");
	this.tower.setTextureWrap('REPEAT', 'REPEAT');

	this.bush = new CGFappearance(this);
	this.bush.setAmbient(0.2, 0.2, 0.2, 1);
	this.bush.setSpecular(0.1, 0.1, 0.1, 1);
	this.bush.setDiffuse(0.4, 0.4, 0.4, 1);
	this.bush.loadTexture("bush.jpg");
	this.bush.setTextureWrap('REPEAT', 'REPEAT');
	//120, 183, 117
	this.trig = new CGFappearance(this);
	this.trig.setAmbient(120/255.0, 183/255.0, 117/255.0, 1);
	this.trig.setSpecular(0.1, 0.1, 0.1, 1);
	this.trig.setDiffuse(120/255.0, 183/255.0, 117/255.0, 1);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0, 0, 0, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(2, 3, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(8.5, 3.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(8.5, 3.0, 8.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(2, 3.0, 8.0, 1.0);
	this.lights[3].setVisible(true);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section

	//floor

	this.pushMatrix();
		this.translate(-2, 0, 8);
		this.rotate(3 * Math.PI / 2, 1, 0, 0);
		this.grass.apply();
		this.rect.display();
	this.popMatrix();

	//Towers
	this.pushMatrix();
		this.translate(0, 0, 6);
		this.pushMatrix();
		this.materialDefault.apply();
		this.rotate(3 * Math.PI / 2, 1, 0, 0);
		this.tower.apply();
		this.cyl.display();
			this.pushMatrix();
				this.translate(0, 0, 3);
				this.tile.apply();
				this.roof.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8, 0, 0);
		this.pushMatrix();
		this.rotate(3 * Math.PI / 2, 1, 0, 0);
		this.tower.apply();
		this.cyl.display();
			this.pushMatrix();
				this.translate(0, 0, 3);
				this.tile.apply();
				this.roof.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8, 0, 6);
		this.pushMatrix();
		this.rotate(3 * Math.PI / 2, 1, 0, 0);
		this.tower.apply();
		this.cyl.display();
			this.pushMatrix();
				this.translate(0, 0, 3);
				this.tile.apply();
				this.roof.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	//Square tower
	this.pushMatrix();
		this.translate(-0.5, 0, 0);

		this.pushMatrix();
			this.translate(-0.5, 0, 1);
			this.scale(2, 5, 1);
			this.tower.apply();
			this.sq.display();
			this.pushMatrix();
				this.translate(0, 1, 0);
				this.trig.apply();
				this.rt.display();
			this.popMatrix();
		this.popMatrix();

		this.pushMatrix();
			this.translate(1.5, 0, -1);
			this.rotate(Math.PI, 0, 1, 0);
			this.scale(2, 5, 1);
			this.tower.apply();
			this.sq.display();
			this.pushMatrix();
				this.translate(0, 1, 0);
				this.trig.apply();
				this.rt.display();
			this.popMatrix();
		this.popMatrix();

		this.pushMatrix();
			this.translate(1.5, 0, 1);
			this.rotate(Math.PI / 2, 0, 1, 0);
			this.scale(2, 5, 1);
			this.tower.apply();
			this.sq.display();
			this.pushMatrix();
				this.translate(0, 1, 0);
				this.trig.apply();
				this.rt.display();
			this.popMatrix();
		this.popMatrix();

		this.pushMatrix();
			this.translate(-0.5, 0, -1);
			this.rotate(3 * Math.PI / 2, 0, 1, 0);
			this.scale(2, 5, 1);
			this.tower.apply();
			this.sq.display();
			this.pushMatrix();
				this.translate(0, 1, 0);
				this.trig.apply();
				this.rt.display();
			this.popMatrix();
		this.popMatrix();

	this.popMatrix();

	//Walls
	this.pushMatrix();
		//this.translate(0, 0, 0);
		//this.rotate(0, 0, 0, 0);
		this.pushMatrix();
			this.pushMatrix();
				this.translate(0, 0, 0.3);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(8, 0, -0.3);
				this.rotate(Math.PI, 0, 1, 0);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(0, 2, 0.3);
				this.rotate(3 * Math.PI / 2, 1, 0, 0);
				this.scale(8, 0.6, 1);
				this.stone.apply();
				this.sq.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		//this.translate(0, 0, 0);
		this.rotate(3 *Math.PI / 2, 0, 1, 0);
		this.scale(0.8, 1, 1);
		this.pushMatrix();
			this.pushMatrix();
				this.translate(0, 0, 0.3);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(8, 0, -0.3);
				this.rotate(Math.PI, 0, 1, 0);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(0, 2, 0.3);
				this.rotate(3 * Math.PI / 2, 1, 0, 0);
				this.scale(8, 0.6, 1);
				this.stone.apply();
				this.sq.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		this.translate(0, 0, 6);
		//this.rotate(0, 0, 0, 0);
		this.pushMatrix();
			this.pushMatrix();
				this.translate(0, 0, 0.3);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(8, 0, -0.3);
				this.rotate(Math.PI, 0, 1, 0);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(0, 2, 0.3);
				this.rotate(3 * Math.PI / 2, 1, 0, 0);
				this.scale(8, 0.6, 1);
				this.stone.apply();
				this.sq.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8, 0, 0);
		this.rotate(3*Math.PI / 2, 0, 1, 0);
		this.scale(0.8, 1, 1);
		this.pushMatrix();
			this.pushMatrix();
				this.translate(0, 0, 0.3);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(8, 0, -0.3);
				this.rotate(Math.PI, 0, 1, 0);
				this.scale(8, 2, 1);
				this.wallt.apply();
				this.sq.display();
			this.popMatrix();
			this.pushMatrix();
				this.translate(0, 2, 0.3);
				this.rotate(3 * Math.PI / 2, 1, 0, 0);
				this.scale(8, 0.6, 1);
				this.stone.apply();
				this.sq.display();
			this.popMatrix();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		this.translate(1, 0, 7);
		this.bush.apply();
		this.sp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(6, 0, 7.3);
		this.bush.apply();
		this.sp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(9, 0, 5);
		this.bush.apply();
		this.sp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(9.3, 0, 0.5);
		this.bush.apply();
		this.sp.display();
	this.popMatrix();

	console.log("end");
	// ---- END Primitive drawing section
};
