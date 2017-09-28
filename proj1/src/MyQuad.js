/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, minS, maxS, minT, maxT) 
{
	CGFobject.call(this,scene);
	
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

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0
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

	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
