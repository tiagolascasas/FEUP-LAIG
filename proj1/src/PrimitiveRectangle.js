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
			this.minX, this.maxY, 0,
			this.minX, this.minY, 0,
			this.maxX, this.maxY, 0,
			this.maxX, this.minY, 0
	];

	this.indices = [
		  0, 1, 2,
			3, 2, 1
    ];

	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
	];

	//texCoords without amplification factor
	this.regTexCoords = [
		0, 0,
		0, Math.abs(this.maxY-this.minY),
		Math.abs(this.maxX-this.minX), 0,
		Math.abs(this.maxX-this.minX), Math.abs(this.maxY-this.minY)
	 ];

	this.texCoords = this.regTexCoords.slice();
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

// setting the amplification factors
PrimitiveRectangle.prototype.setTexCoords = function(ampS, ampT)
{
	if (this.ampS == ampS && this.ampT == ampT)
		return;

	this.ampS = ampS;
	this.ampT = ampT;

	for (var i = 0; i < this.texCoords.length; i+=2) {
        this.texCoords[i] = this.regTexCoords[i]/this.ampS;
        this.texCoords[i+1] = this.regTexCoords[i+1]/this.ampT;
    }

	this.updateTexCoordsGLBuffers();
}
