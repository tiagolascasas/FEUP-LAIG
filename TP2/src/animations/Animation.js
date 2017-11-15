function Animation(v)
{
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
	this.v = null;
	this.active = false;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(time){};

Animation.prototype.getCurrentMatrix = function()
{
	return this.matrix;
};

Animation.prototype.setActive = function()
{
	this.active = true;
}
