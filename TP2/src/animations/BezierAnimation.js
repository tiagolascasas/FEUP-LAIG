function BezierAnimation(v, points)
{
	Animation.call(this, v);

	this.points = points;

	this.d = this.calculateDistance();
	this.t = this.d / v;
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor=BezierAnimation;

BezierAnimation.prototype.calculateDistance = function()
{
	let p1 = this.points[0];
	let p2 = this.points[1];
	let p3 = this.points[2];
	let p4 = this.points[3];

	let p12 = this.calculateMidpoint(p1, p2);
	let p23 = this.calculateMidpoint(p2, p3);
	let p34 = this.calculateMidpoint(p3, p4);
	let p123 = this.calculateMidpoint(p12, p23);
	let p234 = this.calculateMidpoint(p23, p34);

	let d = this.dist(p12, p1) + this.dist(p123, p12) + this.dist(p234, p123) +
			this.dist(p34, p23) + this.dist(p4, p34);
	return d;
};

BezierAnimation.prototype.calculateMidpoint = function(p1, p2)
{
	let p = [
		(p1[0] + p2[0]) / 2,
		(p1[1] + p2[1]) / 2,
		(p1[2] + p2[2]) / 2
	];
	return p;
};

BezierAnimation.prototype.dist = function(p1, p2)
{
	let dist = Math.sqrt(
		Math.pow(p1[0] - p2[0], 2) +
		Math.pow(p1[1] - p2[1], 2) +
		Math.pow(p1[2] - p2[2], 2)
	);
	return dist;
};

BezierAnimation.prototype.mod = function(p)
{
	let mod = Math.sqrt(
		Math.pow(p[0], 2) +
		Math.pow(p[1], 2) +
		Math.pow(p[2], 2)
	);
	return mod;
};

BezierAnimation.prototype.qs = function(s)
{
	let qs = [];
	qs.push(this.qs_i(0, s));
	qs.push(this.qs_i(1, s));
	qs.push(this.qs_i(2, s));
	return qs;
};

BezierAnimation.prototype.dqs = function(s)
{
	let dqs = [];
	dqs.push(this.dqs_i(0, s));
	dqs.push(this.dqs_i(1, s));
	dqs.push(this.dqs_i(2, s));
	return dqs;
};

BezierAnimation.prototype.qs_i = function(i, s)
{
	let p1 = this.points[0];
	let p2 = this.points[1];
	let p3 = this.points[2];
	let p4 = this.points[3];

	let qsi = Math.pow(1-s, 3)*p1[i] +
	 			3*s*Math.pow(1-s, 2)*p2[i] +
				3*Math.pow(s, 2)*(1-s)*p3[i] +
				Math.pow(s, 3)*p4[i];
	return qsi;
};

BezierAnimation.prototype.dqs_i = function(i, s)
{
	let p1 = this.points[0];
	let p2 = this.points[1];
	let p3 = this.points[2];
	let p4 = this.points[3];

	let dqsi = -3*Math.pow(1-s,2)*p1[i] +
	 			(3*Math.pow(1-s,2)-6*s*(1-s))*p2[i] +
				(6*s*(1-s)-3*Math.pow(s,2))*p3[i] +
				3*Math.pow(s, 2)*p4[i];
	return dqsi;
};

BezierAnimation.prototype.calcRotation = function(s)
{
	let angle = Math.atan(this.dqs_i(0, s) / this.dqs_i(2, s));
	return angle;
};

BezierAnimation.prototype.calculateMatrix = function(time)
{
	let s = time / this.t;
	if (s >= 1)
		return null;

	let rotationAngle = this.calcRotation(s);
	let qs = this.qs(s);

	let p1 = this.points[0];
	let x = p1[0] + qs[0];
	let y = p1[1] + qs[1];
	let z = p1[2] + qs[2];

	let matrix = mat4.create();
	mat4.identity(matrix);
	mat4.translate(matrix, matrix, [x, y, z]);
	mat4.rotate(matrix, matrix, rotationAngle, [0, 1, 0]);

	return matrix;
};
