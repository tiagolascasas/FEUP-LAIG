/**
 * PrimitiveTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PrimitiveTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3, s, t)
{
	CGFobject.call(this, scene);

	if (t != null)
		this.t = t;
	else
		this.t = 1.0;

	if (s != null)
		this.s = s;
	else
		this.s = 1.0;

	this.initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3);
};

PrimitiveTriangle.prototype = Object.create(CGFobject.prototype);
PrimitiveTriangle.prototype.constructor=PrimitiveTriangle;

PrimitiveTriangle.prototype.initBuffers = function (x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	this.a = Math.sqrt(Math.pow(x1-x3, 2) + Math.pow(y1-y3, 2) + Math.pow(z1-z3, 2));
	this.b = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2));
	this.c = Math.sqrt(Math.pow(x3-x2, 2) + Math.pow(y3-y2, 2) + Math.pow(z3-z2, 2));

	this.cos_a = (-Math.pow(this.a, 2) + Math.pow(this.b, 2) + Math.pow(this.c, 2)) / (2 * this.b * this.c);
	this.cos_g = (Math.pow(this.a, 2) + Math.pow(this.b, 2) - Math.pow(this.c, 2)) / (2 * this.a * this.b);
	this.cos_b = (Math.pow(this.a, 2) - Math.pow(this.b, 2) + Math.pow(this.c, 2)) / (2 * this.a * this.c);

	this.vertices = [
			x1, y1, z1,
			x2, y2, z2,
			x3, y3, z3
			];

	this.indices = [
            0, 1, 2
        	];

	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
			];

	this.texCoords = [
		0.5, 0,
		0, 1,
		1, 1
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

PrimitiveTriangle.prototype.setTexCoords = function (s, t)
{
	if (this.s == s && this.t == t)
		return;
	this.s = s;
	this.t = t;

	console.log("Updating tex buffers on triangle");

	var sin_b = Math.sqrt(1 - Math.pow(this.cos_b, 2));

	this.texCoords = [];
	this.texCoords.push(this.c - this.a * this.cos_b, this.a * sin_b);
	this.texCoords.push(0, s);
	this.texCoords.push(c, s);

	this.updateTexCoordsGLBuffers();
};
