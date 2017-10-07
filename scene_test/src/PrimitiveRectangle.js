/**
 * PrimitiveRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PrimitiveRectangle(scene, xleft, yleft, xright, yright, minS, maxS, minT, maxT)
{
	CGFobject.call(this, scene);

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
		this.maxT = 1.0;

	this.initBuffers(xleft, yleft, xright, yright);
};

PrimitiveRectangle.prototype = Object.create(CGFobject.prototype);
PrimitiveRectangle.prototype.constructor=PrimitiveRectangle;

PrimitiveRectangle.prototype.initBuffers = function (xleft, yleft, xright, yright)
{
	this.vertices = [
			xleft, yleft, 0,
			0, 0, 0,
			xright, yright, 0,
			xright, yleft, 0
	];

	this.indices = [
            0, 1, 2,
			2, 3, 0
    ];

	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
	];

	this.texCoords = [
			this.minS, this.maxT,
			this.minS, this.minT,
			this.maxS, this.minT,
			this.maxS, this.maxT
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
