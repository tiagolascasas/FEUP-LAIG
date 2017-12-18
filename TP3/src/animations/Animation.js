"use strict";

/**
  * Abstract class to represent an animation
  * @constructor
  * @param {Number} v - the velocity of the animation
  */
function Animation(v)
{
	this.v = v;
};

Animation.prototype.constructor = Animation;

/**
  * Calculates an animation matrix based on a given time.
  * Should be overriden by child classes for animation-specific logic.
  * @param {Number} time - the time from which to calculate the matrix
  * @return {Array} the calculated transformation matrix
  */
Animation.prototype.calculateMatrix = function(time)
{
	return mat4.identity(mat4.create());
};

/**
  * Gets the time at which the animation ends.
  * Should be overriden by child classes for animation-specific conditions.
  * @return {Number} the time at which the animation ends in milliseconds,
  * considering that the start time is 0.
  */
Animation.prototype.getEndTime = function()
{
	return 0;
};
