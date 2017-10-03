/**
 * PrimitiveSphere
 * @constructor
 */
 function PrimitiveSphere(scene, radius, slices, stacks)
 {
 	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.radius = radius;

 	this.initBuffers();
 };

 PrimitiveSphere.prototype = Object.create(CGFobject.prototype);
 PrimitiveSphere.prototype.constructor = PrimitiveSphere;

PrimitiveSphere.prototype.initBuffers = function()
{
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
	this.texCoords = [];

	dfi = (2 * Math.PI) / this.slices;
	dtheta = Math.PI / this.stacks;
	ds = 1 / this.slices;
	dt = 1 / this.stacks;
	r = this.radius

	for (i = 0, fi = 0, s = 1.0; i <= this.slices; i++, fi += dfi, s -= ds)
	{
		for (j = 0, theta = 0, t = 0; j <= this.stacks; j++, theta += dtheta, t += dt)
		{
			this.vertices.push(	Math.sin(theta)*r * Math.cos(fi),
								Math.sin(theta)*r * Math.sin(fi),
								Math.cos(theta)*r);
			this.normals.push(	Math.sin(theta)*r * Math.cos(fi),
								Math.sin(theta)*r * Math.sin(fi),
								Math.cos(theta)*r);
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
