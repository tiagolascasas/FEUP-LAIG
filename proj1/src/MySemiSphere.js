/**
 * MySemiSphere
 * @constructor
 */
 function MySemiSphere(scene, slices, stacks) {
 	CGFobject.call(this, scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MySemiSphere;

MySemiSphere.prototype.initBuffers = function() {

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

	this.texCoords = [];

	// x = r * sin(theta) * cos(fi)
	// y = r * sin(theta) * sin(fi)
	// z = r * cos(theta)
	// theta = [0, pi]
	// fi = [0, 2 * pi]
	// r = 1

	dfi = (2 * Math.PI) / this.slices;
	dtheta = Math.PI / (2 * this.stacks);
	ds = 1 / this.slices;
	dt = 1 / this.stacks;

	for (i = 0, fi = 0, s = 1.0; i <= this.slices; i++, fi += dfi, s -= ds)
	{
		for (j = 0, theta = 0, t = 0; j <= this.stacks; j++, theta += dtheta, t += dt)
		{
			this.vertices.push(	Math.sin(theta) * Math.cos(fi),
								Math.sin(theta) * Math.sin(fi),
								Math.cos(theta));
			this.normals.push(	Math.sin(theta) * Math.cos(fi),
								Math.sin(theta) * Math.sin(fi),
								Math.cos(theta));
			this.texCoords.push(s, t);
		}
	}

	for (i = 0, j = 1; i < this.slices; i++, j++)
	{
		for (k = 0; k < this.stacks; k++, j++)
		{
			this.indices.push(j, j + this.stacks, j + this.stacks + 1);
			this.indices.push(j + this.stacks, j, j - 1);
			this.indices.push(j + this.stacks + 1, j + this.stacks, j);
			this.indices.push(j, j + this.stacks, j - 1);
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
