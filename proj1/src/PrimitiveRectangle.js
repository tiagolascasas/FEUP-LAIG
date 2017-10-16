/**
 * PrimitiveRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PrimitiveRectangle(scene, xleft, yleft, xright, yright)
{
	CGFobject.call(this, scene);

	this.minX = xleft;
	this.maxX = xright;
	this.minY = yright;
	this.maxY = yleft;

	this.ampS = null;
	this.ampT = null;

	this.initBuffers();
};

PrimitiveRectangle.prototype = Object.create(CGFobject.prototype);
PrimitiveRectangle.prototype.constructor=PrimitiveRectangle;

PrimitiveRectangle.prototype.initBuffers = function()
{
	this.vertices = [
			this.minX, this.minY, 0,
			this.maxX, this.minY, 0,
			this.maxX, this.maxY, 0,
			this.minX, this.maxY, 0
	];

	this.indices = [
			0, 1, 2,
			0, 2, 3
    ];

	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
	];

	this.texCoords = [
			1, 1,
			0, 1,
			0, 0,
			1, 0
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

PrimitiveRectangle.prototype.setTexCoords = function(ampS, ampT)
{
	if (this.ampS == ampS && this.ampT == ampT)
		return;

	this.ampS = ampS;
	this.ampT = ampT;

	this.texCoords = [
		(this.maxY- this.minY) / this.ampS, (this.maxX - this.minX) / this.ampT,
		0, (this.maxX - this.minX) / this.ampT,
		0, 0,
		(this.maxY- this.minY) / this.ampS, 0
	];

	this.updateTexCoordsGLBuffers();
}
