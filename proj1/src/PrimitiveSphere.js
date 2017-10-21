/**
 * Primitive that represents a sphere
 * @constructor
 * @param {CGFScene} scene - the scene to which this primitive will belong
 * @param {int} radius - the radius of the sphere
 * @param {int} slices - the number of slices
 * @param {int} stacks - the number of stacks
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

 /**
   * Initializes the sphere's buffers, calculating
   * all the coordinates based on the definitions
   * set on the constructor
   */
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

 /**
   * Applies texture amplification factors to the texture coordinates.
   * It does nothing, but it is required in all primitive classes
   * @param {int} ampS - amplification factor in the S dimension
   * @param {int} ampT - amplification factor in the T dimension
   */
 PrimitiveSphere.prototype.setTexCoords = function (s, t){};
