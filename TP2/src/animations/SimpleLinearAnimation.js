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

	let de = (p2[0] - p1[0]) / (p2[2] - p1[2]);
	this.slope = Math.atan(de);
	let a = Math.atan(sin_a / cos_a);
	if (this.slope != a)
		this.slope += Math.PI;
	if (this.slope <= 0 && cos_a < 0)
		this.slope += Math.PI;

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

SimpleLinearAnimation.prototype.getEndTime = function()
{
	return this.d / this.v;
};

SimpleLinearAnimation.prototype.calculateMatrix = function(time)
{
	let dx = time * this.vx;
	let dz = time * this.vz;

	let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2));
	if (dist >= this.d)
		return null;

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, [dx, 0, dz]);
	mat4.translate(matrix, matrix, [this.p1[0], this.p1[1], this.p1[2]]);
	mat4.rotate(matrix, matrix, this.slope, [0, 1, 0]);

	return matrix;
};
