"use strict";

/**
  * Represents a coordinate in the tridimensional space
  * @constructor
  * @param {Number} x - the x coordinate
  * @param {Number} y - the y coordinate
  * @param {Number} z - the z coordinate
  */
function Coord(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.point = [x, y, z];
}
