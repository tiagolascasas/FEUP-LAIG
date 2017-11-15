function ComboAnimation(animations)
{
	Animation.call(this, 0);

	this.animations = animations;
	this.currentAnimation = 0;
	this.animations[0].setActive();
	this.lastAnimation = this.animations.length - 1;
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor=ComboAnimation;

ComboAnimation.prototype.update = function(time)
{
	if (!this.active)
		return;
	else if (this.currentAnimation > this.lastAnimation)
	{
		this.active = false;
		return;
	}
	else
		this.animations[this.currentAnimation].setActive();

	let currentAnim = this.animations[this.currentAnimation];
	currentAnim.update(time);
	this.matrix = currentAnim.getCurrentMatrix();

	if (!currentAnim.active)
		this.currentAnimation++;
};
