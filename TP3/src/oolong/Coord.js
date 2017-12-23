"use strict";

function Coord(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.point = [x, y, z];
}

Coord.prototype.multiply = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
};
