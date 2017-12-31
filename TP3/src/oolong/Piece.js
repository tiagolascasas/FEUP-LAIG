"use strict";

/**
  * Represents a piece
  * @constructor
  * @param {Coord} coord - the 3D coordinate of the piece
  * @param {String} color - the color of the piece
  * @param {String} pickID - the pick ID of the piece
  */
function Piece(coord, color, pickID)
{
    this.originalCoord = coord;
    this.coord = coord;
    this.color = color;
    this.pickID = pickID;
    this.table = null;
    this.pos = null;
    this.placed = false;
}

/**
  * Sets a piece as being placed on a dish
  * @param {String} table - the table of the dish (cardinal point)
  * @param {String} pos - the position of the dish within the table (cardinal point)
  * @param {Coord} coord - the new 3D coordinate for the piece
  */
Piece.prototype.place = function(table, pos, coord)
{
    this.table = table;
    this.pos = pos;
    this.coord = coord;
    this.coord.y += 0.02;
    this.placed = true;
};
