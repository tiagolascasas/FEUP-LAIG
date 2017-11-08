function BezierAnimation(points, v)
{
	Animation.call(this, v);

	this.points = points;
	this.time = 0;
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor=BezierAnimation;

BezierAnimation.prototype.update = function(time)
{

};
