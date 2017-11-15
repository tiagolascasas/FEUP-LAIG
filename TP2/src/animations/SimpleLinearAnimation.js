function SimpleLinearAnimation(v, p1, p2)
{
	Animation.call(this, v);

	this.p1 = p1;
	this.p2 = p2;

	this.d = this.dist();
	let cos_a = (p2[2] - p1[2]) / this.d;
	let sin_a = (p2[0] - p1[0]) / this.d;
	this.vz = v * cos_a;
	this.vx = v * sin_a;
	this.slope = Math.acos(cos_a);

	this.time = 0;
	this.baseTime = 0;
};

SimpleLinearAnimation.prototype = Object.create(Animation.prototype);
SimpleLinearAnimation.prototype.constructor=SimpleLinearAnimation;

SimpleLinearAnimation.prototype.dist = function()
{
	let dist = Math.sqrt(Math.pow(this.p1[0] - this.p2[0], 2) +
						Math.pow(this.p1[1] - this.p2[1], 2) +
						Math.pow(this.p1[2] - this.p2[2], 2));
	return dist;
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

	let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2));
	if (dist >= this.d)
		this.active = false;
};
