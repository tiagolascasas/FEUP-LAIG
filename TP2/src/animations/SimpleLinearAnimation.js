function SimpleLinearAnimation(v, p1, p2)
{
	Animation.call(this, v);

	this.p1 = p1;
	this.p2 = p2;
	this.active = false;
	this.slope = this.calculateSlope();
	this.vz = v * Math.cos(this.slope);
	this.vx = v * Math.cos(this.slope);
	this.time = 0;
	this.baseTime = 0;
};

SimpleLinearAnimation.prototype = Object.create(Animation.prototype);
SimpleLinearAnimation.prototype.constructor=SimpleLinearAnimation;

SimpleLinearAnimation.prototype.calculateSlope = function()
{
	let m = (this.p2[0] - this.p1[0]) / (this.p2[2] - this.p1[2]);
	let slope = Math.atan(m);
	return slope;
};

SimpleLinearAnimation.prototype.update = function(time)
{
	if (!this.active)
		return;
	if (this.baseTime == 0)
		this.baseTime = time;
	else
		this.time = (time - this.baseTime);

	let dx = this.time * this.vx;
	let dz = this.time * this.vz;

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, [dx, 0, dz]);
	mat4.translate(matrix, matrix, [this.p1[0], 0, this.p1[2]]);
	mat4.rotate(matrix, matrix, this.slope, [0, 1, 0]);

	this.matrix = matrix;

	if (dx >= this.p2[0] || dz >= this.p2[2])
		this.active = false;
};

SimpleLinearAnimation.prototype.setActive = function()
{
	this.active = true;
};
