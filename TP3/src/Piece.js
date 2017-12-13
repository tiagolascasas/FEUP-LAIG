function Piece(coord, color)
{
    this.coord = coord;
    this.color = color;
    this.table = null;
    this.pos = null;
}

Piece.prototype.place = function(table, pos)
{
    this.table = table;
    this.pos = pos;
}
