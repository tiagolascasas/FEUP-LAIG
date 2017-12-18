"use strict";

/**
  * Creates a Linear Animation
  * @constructor
  * @param {Number} v - velocity of the animation in 3Dunits/s
  * @param {Array} points - an array with the points that define the animation's trajectory
  */
function LinearAnimation(v, points)
{
	Animation.call(this, v);

	this.simpleLinears = [];
	this.simpleEndTimes = [];

	for (let i = 0; i < points.length - 1; i++)
	{
		let anim = new SimpleLinearAnimation(v, points[i], points[i + 1]);
		this.simpleLinears.push(anim);

		let sumOfPreviousTimes = 0;
		if (this.simpleEndTimes.length > 0)
			sumOfPreviousTimes = this.simpleEndTimes[this.simpleEndTimes.length - 1];

		this.simpleEndTimes.push(sumOfPreviousTimes + anim.getEndTime());
	}
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor=LinearAnimation;

/**
  * Calculates a matrix based on a given time.
  * @param {Number} time - the time in milliseconds from which to calculate the matrix,
  * considering that the animation starts at t = 0
  * @return {Array} the calculated transformation matrix if the time
  * given is within the animation's range, null otherwise
  */
LinearAnimation.prototype.calculateMatrix = function(time)
{
	for (let i = 0; i < this.simpleLinears.length; i++)
	{
		if (time < this.simpleEndTimes[i])
		{
			let delta = (i == 0 ? time : time - this.simpleEndTimes[i - 1]);
			return this.simpleLinears[i].calculateMatrix(delta);
		}
	}
	return null;
};

/**
  * Gets the time at which the animation ends.
  * @return {Number} the time at which the animation ends in milliseconds,
  * considering that the start time is 0.
  */
LinearAnimation.prototype.getEndTime = function()
{
	return this.simpleEndTimes[this.simpleEndTimes.length - 1];
};
