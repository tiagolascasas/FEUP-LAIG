function Animation(v) {
	this.x = null;
	this.y = null;
	this.z = null;
	this.v = v;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(time){};
