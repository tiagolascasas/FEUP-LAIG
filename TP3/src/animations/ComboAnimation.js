"use strict";

/**
  * Creates a Combo Animation
  * @constructor
  * @param {Array} animations - an array with the animations that make up this animation
  */
function ComboAnimation(animations)
{
	Animation.call(this, 0);

	this.animations = [];
	this.animationsEndTimes = [];

	for (let i = 0; i < animations.length; i++)
	{
		this.animations.push(animations[i]);

		let sumOfPreviousTimes = 0;
		if (this.animationsEndTimes.length > 0)
			sumOfPreviousTimes = this.animationsEndTimes[this.animationsEndTimes.length - 1];

		this.animationsEndTimes.push(sumOfPreviousTimes + animations[i].getEndTime());
	}
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor=ComboAnimation;

/**
  * Calculates a matrix based on a given time.
  * @param {Number} time - the time in milliseconds from which to calculate the matrix,
  * considering that the animation starts at t = 0
  * @return {Array} the calculated transformation matrix if the time
  * given is within the animation's range, null otherwise
  */
ComboAnimation.prototype.calculateMatrix = function(time)
{
	for (let i = 0; i < this.animations.length; i++)
	{
		if (time < this.animationsEndTimes[i])
		{
			let delta = (i == 0 ? time : time - this.animationsEndTimes[i - 1]);
			return this.animations[i].calculateMatrix(delta);
		}
	}
	return null;
};

/**
  * Gets the time at which the animation ends.
  * @return {Number} the time at which the animation ends in milliseconds,
  * considering that the start time is 0.
  */
ComboAnimation.prototype.getEndTime = function()
{
	return this.animationsEndTimes[this.animationsEndTimes.length - 1];
};
