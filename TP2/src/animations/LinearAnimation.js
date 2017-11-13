function LinearAnimation(v, points)
{
	Animation.call(this, v);

	this.simpleLinears = [];
	for (let i = 0; i < points.length - 1; i++)
	{
		let anim = new SimpleLinearAnimation(v, points[i], points[i + 1]);
		this.simpleLinears.push(anim);
	}

	this.currentAnimation = 0;
	this.simpleLinears[0].setActive();
	this.lastAnimation = this.simpleLinears.length - 1;
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor=LinearAnimation;

LinearAnimation.prototype.update = function(time)
{
	if (this.currentAnimation > this.lastAnimation)
		return;

	console.log("size: " + this.simpleLinears.length);
	console.log("current: " + this.currentAnimation);

	let currentAnim = this.simpleLinears[this.currentAnimation];
	currentAnim.update(time);
	this.matrix = currentAnim.getCurrentMatrix();

	if (!currentAnim.active)
	{
		this.currentAnimation++;
		this.simpleLinears[this.currentAnimation].setActive();
	}
};
