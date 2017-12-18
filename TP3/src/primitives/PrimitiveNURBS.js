/**
 * Primitive that represents a NURBS surface
 * @constructor
 * @param {CGFScene} scene - the scene to which this primitive will belong
 * @param {int} div1 - the number of divisions alongside the U dimension
 * @param {int} div2 - the number of divisions alongside the V dimension
 * @param {int} controlvertexes - a matrix holding the control vertexes in the (U, V) space
 */
function PrimitiveNURBS(scene, div1, div2, controlvertexes)
{
	this.scene = scene;

	let degree1 = controlvertexes.length - 1;
	let degree2 = controlvertexes[0].length - 1;
	let knots1 = this.makeKnots(degree1);
	let knots2 = this.makeKnots(degree2);

	let nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v)
	{
		return nurbsSurface.getPoint(u, v);
	};
	this.nurbs = new CGFnurbsObject(this.scene, getSurfacePoint, div1, div2);
};

PrimitiveNURBS.prototype = Object.create(CGFobject.prototype);
PrimitiveNURBS.prototype.constructor=PrimitiveNURBS;

/**
 * Creates a knots vector based on the degree of a dimension
 * @param {int} degree - the degree of a dimension
 * @return {Array} an array with the calculated knots
 */
PrimitiveNURBS.prototype.makeKnots = function(degree)
{
	let knots = [];
	for (let i = 0; i <= degree; i++)
		knots.push(0);
	for (let i = 0; i <= degree; i++)
		knots.push(1);
	return knots;
};

/**
 * Displays the primitive, simply by calling the inner CGFnurbsObject's
 * display method.
 */
PrimitiveNURBS.prototype.display = function()
{
	this.nurbs.display();
};

/**
  * Applies texture amplification factors to the texture coordinates.
  * It does nothing, but it is required in all primitive classes
  * @param {int} ampS - amplification factor in the S dimension
  * @param {int} ampT - amplification factor in the T dimension
  */
PrimitiveNURBS.prototype.setTexCoords = function(ampS, ampT){}
