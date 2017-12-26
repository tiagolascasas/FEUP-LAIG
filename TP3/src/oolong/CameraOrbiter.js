"use strict";

function CameraOrbiter(startPos, endPos, v)
{
    this.radius = 2;
    this.w = v / this.radius;
    this.angles = {
        'c': 0,
        's': 0,
        'se': 45,
        'e': 90,
        'ne': 135,
        'n': 180,
        'nw': 225,
        'w': 270,
        'sw': 315
    };
    this.startAngle = this.angles[startPos] * Math.PI / 180;
    this.endAngle = this.angles[endPos] * Math.PI / 180;
}

CameraOrbiter.prototype.calculateAngle = function(time)
{
    let da = this.startAngle + this.w * time;
	return da >= this.endAngle ? null : da;
};
