function Animation(v)
{
	this.v = v;
};

Animation.prototype.constructor = Animation;

Animation.prototype.calculateMatrix = function(time)
{
	return mat4.identity(mat4.create());
};

Animation.prototype.getEndTime = function()
{
	return 0;
};
