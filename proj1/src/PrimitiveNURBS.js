/**
 * PrimitiveNURBS
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PrimitiveNURBS(scene, div1, div2, controlvertexes)
{
	this.scene = scene;

	var degree1 = controlvertexes.length - 1;
	var degree2 = controlvertexes[0].length - 1;
	var knots1 = this.makeKnots(degree1);
	var knots2 = this.makeKnots(degree2);

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v)
	{
		return nurbsSurface.getPoint(u, v);
	};
	this.nurbs = new CGFnurbsObject(this.scene, getSurfacePoint, div1, div2);
};

PrimitiveNURBS.prototype = Object.create(CGFobject.prototype);
PrimitiveNURBS.prototype.constructor=PrimitiveNURBS;

PrimitiveNURBS.prototype.makeKnots = function (degree)
{
	var knots = [];
	for (var i = 0; i <= degree; i++)
		knots.push(0);
	for (var i = 0; i <= degree; i++)
		knots.push(1);
	return knots;
};

PrimitiveNURBS.prototype.display = function ()
{
	this.nurbs.display();
};

PrimitiveNURBS.prototype.setTexCoords = function (s, t){}
