function LinearAnimation(points, v)
{
	Animation.call(this, v);

	this.points = points;
	this.x = points[0][0];
	this.y = points[0][1];
	this.z = points[0][2];
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor=LinearAnimation;

LinearAnimation.prototype.update = function(time)
{

};
