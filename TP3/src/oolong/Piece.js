"use strict";

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

Piece.prototype.place = function(table, pos, coord)
{
    this.table = table;
    this.pos = pos;
    this.coord = coord;
    this.coord.y += 0.02;
    this.placed = true;
};
