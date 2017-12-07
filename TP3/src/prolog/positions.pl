% Initial positions
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- dynamic pos/3.
:- dynamic waiterPos/2.

%initializes the board by asserting facts with the coordinates of each position and table
initPositions :-
assert(pos(nw, nw, o)), assert(pos(nw, n, o)), assert(pos(nw, ne, o)),   	assert(pos( n, nw, o)), assert(pos( n, n, o)), assert(pos( n, ne, o)),   	assert(pos(ne, nw, o)), assert(pos(ne, n, o)), assert(pos(ne, ne, o)),
assert(pos(nw,  w, o)), assert(pos(nw, c, o)), assert(pos(nw, e,  o)),   	assert(pos( n,  w, o)), assert(pos( n, c, o)), assert(pos( n,  e, o)),   	assert(pos(ne,  w, o)), assert(pos(ne, c, o)), assert(pos(ne,  e, o)),
assert(pos(nw, sw, o)), assert(pos(nw, s, o)), assert(pos(nw, se, o)),   	assert(pos( n, sw, o)), assert(pos( n, s, o)), assert(pos( n, se, o)),   	assert(pos(ne, sw, o)), assert(pos(ne, s, o)), assert(pos(ne, se, o)),

assert(pos( w, nw, o)), assert(pos( w, n, o)), assert(pos( w, ne, o)),   	assert(pos( c, nw, o)), assert(pos( c, n, o)), assert(pos( c, ne, o)),   	assert(pos( e, nw, o)), assert(pos( e, n, o)), assert(pos( e, ne, o)),
assert(pos( w,  w, o)), assert(pos( w, c, o)), assert(pos( w, e,  o)),   	assert(pos( c,  w, o)), assert(pos( c, c, o)), assert(pos( c,  e, o)),   	assert(pos( e, w, o)),  assert(pos( e, c, o)), assert(pos( e,  e, o)),
assert(pos( w, sw, o)), assert(pos( w, s, o)), assert(pos( w, se, o)),   	assert(pos( c, sw, o)), assert(pos( c, s, o)), assert(pos( c, se, o)),   	assert(pos( e, sw, o)), assert(pos( e, s, o)), assert(pos( e, se, o)),

assert(pos(sw, nw, o)), assert(pos(sw, n, o)), assert(pos(sw, ne, o)),  	assert(pos( s, nw, o)), assert(pos( s, n, o)), assert(pos( s, ne, o)),   	assert(pos(se, nw, o)), assert(pos(se, n, o)), assert(pos(se, ne, o)),
assert(pos(sw,  w, o)), assert(pos(sw, c, o)), assert(pos(sw, e,  o)),   	assert(pos( s,  w, o)), assert(pos( s, c, o)), assert(pos( s,  e, o)),   	assert(pos(se, w, o)),  assert(pos(se, c, o)), assert(pos(se,  e, o)),
assert(pos(sw, sw, o)), assert(pos(sw, s, o)), assert(pos(sw, se, o)),   	assert(pos( s, sw, o)), assert(pos( s, s, o)), assert(pos( s, se, o)),   	assert(pos(se, sw, o)), assert(pos(se, s, o)), assert(pos(se, se, o)),

assert(waiterPos(c, c)),
assert(pos(null, null, b)),
assert(pos(null, null, g)).
