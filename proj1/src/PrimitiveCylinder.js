/**
 * PrimitiveCylinder
 * @constructor
 */
 function PrimitiveCylinder(scene, height, bottomR, topR, stacks, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.height = height;
	this.bottomR = bottomR;
	this.topR = topR;
	this.diff = topR - bottomR;

 	this.initBuffers();
 };

 PrimitiveCylinder.prototype = Object.create(CGFobject.prototype);
 PrimitiveCylinder.prototype.constructor = PrimitiveCylinder;

 PrimitiveCylinder.prototype.initBuffers = function() {

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];

	angle = 2*Math.PI / this.slices;
	ds = 1.0 / this.slices;
	dt = 1.0 / this.stacks;
	dr = this.diff / this.stacks;
	dh = this.height / this.stacks;

	for (i = 0, j = 0, s = 0.0; i < this.slices; i++, s += ds)
	{
		for (k = 0.0, t = 1.0, r = this.bottomR; k < this.height; k += dh, j += 4, t -= dt, r += dr)
		{
			this.vertices.push(Math.cos(i*angle)*r, Math.sin(i*angle)*r, k);
			this.normals.push(Math.cos(i*angle)*r, Math.sin(i*angle)*r, 0);
			this.texCoords.push(s, t);

			this.vertices.push(Math.cos(i*angle)*(r+dr), Math.sin(i*angle)*(r+dr), k+dh);
			this.normals.push(Math.cos(i*angle)*(r+dr), Math.sin(i*angle)*(r+dr), 0);
			this.texCoords.push(s, t - dt);

			this.vertices.push(Math.cos((i+1)*angle)*r, Math.sin((i+1)*angle)*r, k);
			this.normals.push(Math.cos((i+1)*angle)*r, Math.sin((i+1)*angle)*r, 0);
			this.texCoords.push(s + ds, t);

			this.vertices.push(Math.cos((i+1)*angle)*(r+dr), Math.sin((i+1)*angle)*(r+dr), k+dh);
			this.normals.push(Math.cos((i+1)*angle)*(r+dr), Math.sin((i+1)*angle)*(r+dr), 0);
			this.texCoords.push(s + ds, t - dt);

			this.indices.push(j + 1, j, j + 3);
			this.indices.push(j + 2, j + 3, j);

			this.indices.push(j + 3, j, j + 1);
			this.indices.push(j, j + 3, j + 2);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
