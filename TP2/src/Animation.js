function Animation(v) {
	this.matrix = null;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(time){};

Animation.prototype.getCurrentMatrix = function()
{
	return this.matrix;
};
