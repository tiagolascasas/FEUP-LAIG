/**
 * PrimitiveTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PrimitiveTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3/*minS, maxS, minT, maxT*/)
{
	CGFobject.call(this, scene);
/*
	if (minS != null)
		this.minS = minS;
	else
		this.minS = 0.0;

	if (maxS != null)
		this.maxS = maxS;
	else
		this.maxS = 1.0;

	if (minT != null)
		this.minT = minT;
	else
		this.minT = 0.0;

	if (maxT != null)
		this.maxT = maxT;
	else
		this.maxT = 1.0;*/

	this.initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3);
};

PrimitiveTriangle.prototype = Object.create(CGFobject.prototype);
PrimitiveTriangle.prototype.constructor=PrimitiveTriangle;

PrimitiveTriangle.prototype.initBuffers = function (x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
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
/*
	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];*/

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
