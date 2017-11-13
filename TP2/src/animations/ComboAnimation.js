function ComboAnimation(animations)
{
	Animation.call(this, 0);

	this.animations = animations;
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor=ComboAnimation;

ComboAnimation.prototype.update = function(time)
{

};
