function CircularAnimation(center, v, radius, initialAngle, rotationAngle)
{
	Animation.call(this, v);

	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle * DEGREE_TO_RAD;
	this.rotationAngle = rotationAngle * DEGREE_TO_RAD;
	this.w = v / radius;
	this.time = 0;
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

CircularAnimation.prototype.update = function(time)
{
	if (this.da >= this.rotationAngle)
		return;

	if (this.time == 0)
		this.time = time;
	else
		this.time += (time - this.time);

	let da = this.initialAngle + this.w * this.time;

	let matrix = mat4.create();
	mat4.translate(matrix, matrix, this.center);
	mat4.rotate(matrix, matrix, this.da, [0, 1, 0]);
	mat4.translate(matrix, matrix, [0, 0, this.radius]);
	mat4.rotate(matrix, matrix, Math.PI / 2, [0, 1, 0]);

	this.matrix = matrix;
};
