function LinearAnimation(v, points)
{
	Animation.call(this, v);
	console.log(points);

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
	if (!this.active)
		return;
	else if (this.currentAnimation > this.lastAnimation)
	{
		this.active = false;
		return;
	}
	else
		this.simpleLinears[this.currentAnimation].setActive();

	let currentAnim = this.simpleLinears[this.currentAnimation];
	currentAnim.update(time);
	this.matrix = currentAnim.getCurrentMatrix();

	if (!currentAnim.active)
		this.currentAnimation++;
};
