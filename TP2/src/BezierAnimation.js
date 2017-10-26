function BezierAnimation(points, v)
{
	Animation.call(this, v);

	this.points = points;
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor=BezierAnimation;

BezierAnimation.prototype.update = function(time)
{

};
