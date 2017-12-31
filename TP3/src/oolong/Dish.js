"use strict";

/**
  * Represents a dish on a table
  * @constructor
  * @param {Coord} coord - the 3D coordinate of the dish
  * @param {Number} pickID - the pick ID of the dish
  * @param {String} table - the table this dish is placed (cardinal coordinate)
  * @param {String} pos - the position of the dish within the table (cardinal coordinate)
  */
function Dish(coord, pickID, table, pos)
{
    this.coord = coord;
    this.pickID = pickID;
    this.table = table;
    this.pos = pos;
}
