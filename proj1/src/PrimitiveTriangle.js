/**
* PrimitiveTriangle
* @param gl {WebGLRenderingContext}
* @constructor
*/
function PrimitiveTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	CGFobject.call(this, scene);

	this.ampT = null;
	this.ampS = null;

	this.initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3);
};

PrimitiveTriangle.prototype = Object.create(CGFobject.prototype);
PrimitiveTriangle.prototype.constructor=PrimitiveTriangle;

PrimitiveTriangle.prototype.initBuffers = function (x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	var vertex_A = vec3.fromValues(x1,y1,z1);
	var vertex_B = vec3.fromValues(x2,y2,z2);
	var vertex_C = vec3.fromValues(x3,y3,z3);

	var AB = vec3.create();
	vec3.sub(AB,vertex_B,vertex_A);
	var AC = vec3.create();
	vec3.sub(AC,vertex_C,vertex_A);

	this.vertices = [
		x1, y1, z1,
		x2, y2, z2,
		x3, y3, z3
	];

	this.indices = [
		0, 1, 2
	];

	// Normals
	var N = vec3.create();
	vec3.cross(N,AB,AC);
	vec3.normalize(N,N);

	this.normals = [
		N[0],N[1],N[2],
		N[0],N[1],N[2],
		N[0],N[1],N[2]
	];

	//Dot Product to get the angle
	var beta = Math.acos(vec3.dot(AB,AC)/(vec3.len(AB)*vec3.len(AC)));

	//TexCoords of the top vertex, C
	var C = [Math.cos(beta) * vec3.len(AC), Math.sin(beta) * vec3.len(AC)];

	this.texCoords = [
		0, 0,
		vec3.length(AB), 0,
		C[0], C[1]
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	};

PrimitiveTriangle.prototype.setTexCoords = function (ampS, ampT)
{
	if (this.ampS == ampS && this.ampT == ampT)
		return;

	this.ampS = ampS;
	this.ampT = ampT;

	for (var i = 0; i < this.texCoords.length; i+=2) {
		this.texCoords[i] = this.texCoords[i]/this.ampS;
		this.texCoords[i+1] = this.texCoords[i+1]/this.ampT;
	}

	this.updateTexCoordsGLBuffers();
};
