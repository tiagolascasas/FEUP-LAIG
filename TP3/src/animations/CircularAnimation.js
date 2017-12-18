"use strict";

/**
  * Creates a Circular Animation
  * @constructor
  * @param {Number} v - velocity of the animation in 3Dunits/s
  * @param {Array} center - an array with the coordinates of the center
  * @param {Number} radius - the animation's radius in 3Dunits
  * @param {Number} initialAngle - the animation's initial angle in degrees
  * @param {Number} rotationAngle - the animation's final angle in degrees
  */
function CircularAnimation(v, center, radius, initialAngle, rotationAngle)
{
	Animation.call(this, v);

	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle * DEGREE_TO_RAD;
	this.rotationAngle = rotationAngle * DEGREE_TO_RAD;
	this.w = v / radius;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

/**
  * Calculates a matrix based on a given time.
  * @param {Number} time - the time in milliseconds from which to calculate the matrix,
  * considering that the animation starts at t = 0
  * @return {Array} the calculated transformation matrix if the time
  * given is within the animation's range, null otherwise
  */
CircularAnimation.prototype.calculateMatrix = function(time)
{
	da = this.initialAngle + this.w * time;
	if (da >= this.rotationAngle + this.initialAngle)
		return null;

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, this.center);
	mat4.rotate(matrix, matrix, da, [0, 1, 0]);
	mat4.translate(matrix, matrix, [this.radius, 0, 0]);

	return matrix;
};

/**
  * Gets the time at which the animation ends.
  * @return {Number} the time at which the animation ends in milliseconds,
  * considering that the start time is 0.
  */
CircularAnimation.prototype.getEndTime = function()
{
	return this.rotationAngle / this.w;
};
