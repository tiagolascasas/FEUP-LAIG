function CircularAnimation(v, center, radius, initialAngle, rotationAngle)
{
	Animation.call(this, v);

	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle * DEGREE_TO_RAD;
	this.rotationAngle = rotationAngle * DEGREE_TO_RAD;
	this.w = v / radius;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

CircularAnimation.prototype.calculateMatrix = function(time)
{
	da = this.initialAngle + this.w * time;
	if (da >= this.rotationAngle + this.initialAngle)
		return null;

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, this.center);
	mat4.rotate(matrix, matrix, da, [0, 1, 0]);
	mat4.translate(matrix, matrix, [this.radius, 0, 0]);
	//mat4.rotate(matrix, matrix, Math.PI / 2, [0, 1, 0]);

	return matrix;
};
