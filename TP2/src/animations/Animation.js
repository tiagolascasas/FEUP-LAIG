function Animation(v)
{
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
	this.v = null;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(time){};

Animation.prototype.getCurrentMatrix = function()
{
	return this.matrix;
};
