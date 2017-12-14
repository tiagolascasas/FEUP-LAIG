function Piece(coord, color, pickID)
{
    this.coord = coord;
    this.color = color;
    this.pickID = pickID;
    this.table = null;
    this.pos = null;
}

Piece.prototype.place = function(table, pos)
{
    this.table = table;
    this.pos = pos;
}
