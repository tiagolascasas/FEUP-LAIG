function CircularAnimation(center, v, radius, initialAngle, rotationAngle)
{
	Animation.call(this, v);

	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle;
	this.rotationAngle = rotationAngle;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

CircularAnimation.prototype.update = function(time)
{

};
