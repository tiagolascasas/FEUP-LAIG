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
/*
ComboAnimation.prototype.sum = function()
{
	let n = 0;
	for (let i = 0; i < this.animationsEndTimes.length; i++)
		n += this.animationsEndTimes[i];
	return n;
};*/

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
