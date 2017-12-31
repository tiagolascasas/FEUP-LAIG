"use strict";

/**
  * This class represents a very simple animation for the camera between
  * two cardinal points, calculating its angle at a given time
  * @constructor
  * @param {String} startPos - the start coordinate (cardinal point)
  * @param {String} endPos - the end coordinate (cardinal point)
  * @param {Number} v - the velocity of the animation, in 3Dunits/ms
  */
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

/**
  * Calculates the camera angle at a given instant
  * @param {Number} time - time elapsed since the start of the animation in ms
  * @return {Number} the camera angle if time is within the animation's range, null otherwise
  */
CameraOrbiter.prototype.calculateAngle = function(time)
{
    let da;
    if (this.startAngle < this.endAngle)
    {
        da = this.startAngle + this.w * time;
        return da >= this.endAngle ? null : da;
    }
    else
    {
        da = this.startAngle - this.w * time;
        return da <= this.endAngle ? null : da;
    }
};
