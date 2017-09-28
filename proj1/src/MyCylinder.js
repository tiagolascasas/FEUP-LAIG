/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];

	angle = 2*Math.PI / this.slices;
	ds = 1.0 / this.slices;
	dt = 1.0 / this.stacks;

	for (i = 0, j = 0, s = 0.0; i < this.slices; i++, s += ds)
	{	
		for (k = 0.0, t = 1.0; k < 1.0; k += 1.0/this.stacks, j += 4, t -= dt)
		{	
			this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), k);
			this.normals.push(Math.cos(i*angle), Math.sin(i*angle), 0);
			this.texCoords.push(s, t);

			this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), k+1.0/this.stacks);
			this.normals.push(Math.cos(i*angle), Math.sin(i*angle), 0);
			this.texCoords.push(s, t - dt);

			this.vertices.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), k);
			this.normals.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), 0);
			this.texCoords.push(s + ds, t);

			this.vertices.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), k+1.0/this.stacks);
			this.normals.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), 0);
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
