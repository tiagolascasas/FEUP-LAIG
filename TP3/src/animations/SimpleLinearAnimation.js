/**
  * Creates a simple Linear Animation with only two points, which is used
  * to make up a LinearAnimation
  * @constructor
  * @param {Number} v - velocity of the animation in 3Dunits/s
  * @param {Array} p1 - the coordinates of the starting point
  * @param {Array} p2 - the coordinates of the ending point
  */
function SimpleLinearAnimation(v, p1, p2)
{
	Animation.call(this, v);

	this.p1 = p1;
	this.p2 = p2;

	this.d = this.dist();
	let cos_a = (p2[2] - p1[2]) / this.d;
	let sin_a = (p2[0] - p1[0]) / this.d;
	this.vz = v * cos_a;
	this.vx = v * sin_a;

	let de = (p2[0] - p1[0]) / (p2[2] - p1[2]);
	this.slope = Math.atan(de);
	let a = Math.atan(sin_a / cos_a);
	if (this.slope != a)
		this.slope += Math.PI;
	if (this.slope <= 0 && cos_a < 0)
		this.slope += Math.PI;

};

SimpleLinearAnimation.prototype = Object.create(Animation.prototype);
SimpleLinearAnimation.prototype.constructor=SimpleLinearAnimation;

/**
  * Calculates the distance between the two points
  * that make up the animation
  * @return {Number} the distance of the animation
  */
SimpleLinearAnimation.prototype.dist = function()
{
	let dist = Math.sqrt(Math.pow(this.p1[0] - this.p2[0], 2) +
						Math.pow(this.p1[1] - this.p2[1], 2) +
						Math.pow(this.p1[2] - this.p2[2], 2));
	return dist;
};

/**
  * Calculates a matrix based on a given time.
  * @param {Number} time - the time in milliseconds from which to calculate the matrix,
  * considering that the animation starts at t = 0
  * @return {Array} the calculated transformation matrix if the time
  * given is within the animation's range, null otherwise
  */
SimpleLinearAnimation.prototype.calculateMatrix = function(time)
{
	let dx = time * this.vx;
	let dz = time * this.vz;

	let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2));
	if (dist >= this.d)
		return null;

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, [dx, 0, dz]);
	mat4.translate(matrix, matrix, [this.p1[0], this.p1[1], this.p1[2]]);
	mat4.rotate(matrix, matrix, this.slope, [0, 1, 0]);

	return matrix;
};

/**
  * Gets the time at which the animation ends.
  * @return {Number} the time at which the animation ends in milliseconds,
  * considering that the start time is 0.
  */
SimpleLinearAnimation.prototype.getEndTime = function()
{
	return this.d / this.v;
};
