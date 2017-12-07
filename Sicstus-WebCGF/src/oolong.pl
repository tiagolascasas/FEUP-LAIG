:- use_module(library(random)).
:- use_module(library(lists)).
:- use_module(library(system)).
:- include('positions.pl').

% Display
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%all the following atoms and predicates are meant to display the printBoard
%by reading the internal game state
printBoard :- 	nl,
				printRow0, nl,
				printRow1, nl,
				printRow2, nl,
				printRow3, nl, nl,
				printRow4, nl,
				printRow5, nl,
				printRow6, nl, nl,
				printRow7, nl,
				printRow8, nl,
				printRow9, nl,
				printRow10, nl, nl,
				write('o - Empty g - Green  b - Black'), nl,
				printWaiterPos, nl, nl.

%print the row specified in the fact's name
printRow0 :- write('                                 '), writeSpecMove(n).
printRow1 :- write('                                 '), printTableTop(nw), write('   '), printTableTop(n), write('   '), printTableTop(ne).
printRow2 :- writeSpecMove(nw), printTableMiddle(nw), write('   '), printTableMiddle(n), write('   '), printTableMiddle(ne), writeSpecMove(ne).
printRow3 :- write('                                 '), printTableBottom(nw), write('   '), printTableBottom(n), write('   '), printTableBottom(ne).

printRow4 :- write('                                 '), printTableTop(w), write('   '), printTableTop(c), write('   '), printTableTop(e).
printRow5 :- writeSpecMove(w), printTableMiddle(w), write('   '), printTableMiddle(c), write('   '), printTableMiddle(e), writeSpecMove(e).
printRow6 :- write('                                 '), printTableBottom(w), write('   '), printTableBottom(c), write('   '), printTableBottom(e).

printRow7 :- write('                                 '), printTableTop(sw), write('   '), printTableTop(s), write('   '), printTableTop(se).
printRow8 :- writeSpecMove(sw),                         printTableMiddle(sw), write('   '), printTableMiddle(s), write('   '), printTableMiddle(se), writeSpecMove(se).
printRow9 :- write('                                 '), printTableBottom(sw), write('   '), printTableBottom(s), write('   '), printTableBottom(se).
printRow10 :- write('                                '), writeSpecMove(s).

%prints a table
printTableTop(Table) :- printPos(Table, nw), write(' '), printPos(Table, n), write(' '), printPos(Table, ne).
printTableMiddle(Table) :- printPos(Table, w), write(' '), printPos(Table, c), write(' '), printPos(Table, e).
printTableBottom(Table) :- printPos(Table, sw), write(' '), printPos(Table, s), write(' '), printPos(Table, se).

%prints a single position within a table
printPos(Table, Pos) :- pos(Table, Pos, X), write(X).

%prints the position of the waiter
printWaiterPos :- waiterPos(X, Y), write('Waiter in table '), write(X), write(' and position '), write(Y).

%prints the last move made
printCurrPlayerMove(Table, Pos) :- currentPiece(Player), write('Player '), write(Player), write(' placed a piece on table '),
									write(Table), write(', position '), write(Pos), nl.

%prints a victory announcement
printVictoryAnnouncement(Player) :- write('Player '), write(Player), write(' is victorious!'), nl.

%prints the special moves information of a table
writeSpecMove(Table) :- specMovePos(SpecMove, Table, AmountPieces, TargetP), writeSpecMove(SpecMove, AmountPieces, TargetP).
writeSpecMove(specialMovePiece, _, b) :-        write(' Move 1 black piece              ').
writeSpecMove(specialMovePiece, _, g) :-        write(' Move 1 green piece              ').
writeSpecMove(specialMoveWaiter, _, b) :-       write(' Black moves waiter              ').
writeSpecMove(specialMoveWaiter, _, g) :-       write(' Green moves waiter              ').
writeSpecMove(specialMoveRotate, _, _) :-       write(' Player rotates table            ').
writeSpecMove(specialMoveSwitch, 4, _) :-       write(' Switch 2 unconquered            ').
writeSpecMove(specialMoveSwitch, 5, _) :-       write(' Switch unconquered w/ conquered ').

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% Game settings
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- dynamic gameType/1.
:- dynamic currentPiece/1.
:- dynamic specMovePos/4.
:- dynamic waiterSwitched/0.
:- dynamic newPosition/2.
:- dynamic specialMoveActive/1.
:- dynamic difficulty/1.
:- dynamic smallestTable/2.

%starts a 1vs1 match
start_1vs1 :- \+ gameType('1vs1'), \+ gameType('1vsAI'), \+ gameType('AIvsAI'), %retract(gameType(null)),
				assert(gameType('1vs1')), nl, initGame.

%starts a 1vsAI match
start_1vsAI :- \+ gameType('1vs1'), \+ gameType('1vsAI'), \+ gameType('AIvsAI'), %retract(gameType(null)),
				assert(gameType('1vsAI')), nl, initGame.

%starts an AIvsAI match
start_AIvsAI :- \+ gameType('1vs1'), \+ gameType('1vsAI'), \+ gameType('AIvsAI'), %retract(gameType(null)),
				assert(gameType('AIvsAI')), nl, initGame.

%initializes the game by setting the current player to black.
initGame :- assert(currentPiece(b)).

%sets the difficulty of the AI, prompting the user accordingly
setAIdifficulty :- nl, write('Choose the difficulty of game you want to play (\'easy\'/\'hard\')'), nl,
                repeat,
                        read(Type),
                        (setAIdifficulty(Type) -> ! ;
                                write('Invalid option, try again '),
                                nl,
                                fail
                        ).

%sets the AI difficulty
setAIdifficulty(N):- N \= 'easy', N \= 'hard', fail.
setAIdifficulty('easy') :- \+ difficulty('easy'), \+ difficulty('hard'),
                           assert(difficulty('easy')).
setAIdifficulty('hard') :- \+ difficulty('easy'), \+ difficulty('hard'),
                           assert(difficulty('hard')).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Movements and game logic
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%checks if any of the players fulfill the victory conditions
checkVictory :- checkVictoryPlayer(b) ; checkVictoryPlayer(g) ; fail.


%checks if a player's pieces fulfill the victory conditions
checkVictoryPlayer(Player) :- countTablePieces(Player, [n, s, e, w, nw, ne, sw, se, c], N), N >= 5,
								printVictoryAnnouncement(Player), reset.

%counts the number of tables in which a player has 5 or more pieces
countTablePieces(_, [], 0).
countTablePieces(Player, [Table|Lis], M) :- getPieceCountOnTable(Player, Table, Cnt),
											Cnt >= 5, countTablePieces(Player, Lis, N), M is N + 1.
countTablePieces(Player, [_|Lis], N) :- countTablePieces(Player, Lis, N).

%gets the number of pieces of a certain player on a certain table
getPieceCountOnTable(Player, Table, N) :- findall(_, pos(Table, _, Player), Lis), length(Lis, N).

%checks if a given table is full
checkFullTable(Table) :- getPieceCountOnTable(o, Table, N), N == 0.

%changes the active player
flipCurrentPiece :- currentPiece(b) -> (retract(currentPiece(b)), assert(currentPiece(g))) ;
										(retract(currentPiece(g)), assert(currentPiece(b))).

%gets a move based on the game type
getMove(Table, Position) :- gameType('AIvsAI'), !,getMoveAI(Table, Position).
getMove(Table, Position) :- gameType('1vsAI'), !, getMove1vsAI(Table, Position).
getMove(Table, Position) :- gameType('1vs1'), !, getMoveHuman(Table, Position).

%gets a move under the 1 vs AI mode: if the current piece is black,
%gets it from the keyboard; otherwise, gets it from the AI
getMove1vsAI(Table, Position) :- currentPiece(b) -> getMoveHuman(Table, Position) ; getMoveAI(Table, Position).

%gets a move from the AI, testing for validity (move depends on difficulty)
getMoveAI(Table, Position) :- waiterPos(T, _), checkFullTable(T), !,
								repeat,
								        random_member(Table, [n, s, e, w, nw, ne, sw, se, c]),
								        (\+checkFullTable(Table) -> ! ; fail),
								repeat,
								        random_member(Position, [n, s, e, w, nw, ne, sw, se, c]),
										(validPosition(Table, Position) -> ! ; fail).
getMoveAI(Table, Position) :- 	difficulty(easy),
								repeat,
									waiterPos(Table, _),
									random_member(Position, [n, s, e, w, nw, ne, sw, se, c]),
									(validPosition(Table, Position) -> ! ; fail).
getMoveAI(Table, Position) :- 	difficulty(hard),
								waiterPos(Table, _),
								getBestPosition(Table, Position),
								write('Best position: '), write(Position), nl.

%gets the best position in order to make the next player play their piece in a
%table in which they have the least pieces
getBestPosition(Table, Position) :- getValidPositions(Table, [n, s, e, w, nw, ne, sw, se, c], P),
									assert(smallestTable(10, c)),
									getMinimalTable(P),
									smallestTable(_, Position),
									retract(smallestTable(_, _)).

%gets all the valid (empty) positions in a given table
getValidPositions(Table, [Pos|Posx], [Pos|Xs]) :- validPosition(Table, Pos), !,
												getValidPositions(Table, Posx, Xs).
getValidPositions(Table, [_|Posx], Xs) :- getValidPositions(Table, Posx, Xs).
getValidPositions(_, [], []).

%from a list of valid positions, picks the table to which that positions points
%to in which the adversary has the least ammount of pieces on
getMinimalTable([]).
getMinimalTable([P|Ps]) :- 	currentPiece(Player), Player == b,
										getPieceCountOnTable(g, P, N),
										smallestTable(T, _),
										T > N, 	retract(smallestTable(_,_)),
												assert(smallestTable(N, P)),
										getMinimalTable(Ps).
getMinimalTable([P|Ps]) :- 	currentPiece(Player), Player == b,
										getPieceCountOnTable(g, P, N),
										smallestTable(T, _),
										T =< N,
										getMinimalTable(Ps).
getMinimalTable([P|Ps]) :- 	currentPiece(Player), Player == g,
										getPieceCountOnTable(b, P, N),
										smallestTable(T, _),
										T > N, 	retract(smallestTable(_,_)),
												assert(smallestTable(N, P)),
										getMinimalTable(Ps).
getMinimalTable([P|Ps]) :- 	currentPiece(Player), Player == g,
										getPieceCountOnTable(b, P, N),
										smallestTable(T, _),
										T =< N,
										getMinimalTable(Ps).

%gets a move from the keyboard, testing for validity
getMoveHuman(Table, Position) :- waiterPos(T, _), checkFullTable(T), !,
									repeat,
										read(Table),
										((validInput(Table), \+checkFullTable(Table)) -> !, (Table == stop -> break ; !) ;
												write('Invalid table, try again '), nl, fail),
									repeat,
										read(Position),
										((validInput(Position), validPosition(Table, Position)) -> !, (Position == stop -> break ; !) ;
												write('Invalid position, try again '), nl, fail).


getMoveHuman(Table, Position) :- nl, write('Position of piece '), currentPiece(Piece), write(Piece), write(' '),
									waiterPos(Table, _),
									repeat,
										read(Position),
										((validInput(Position), validPosition(Table, Position)) -> !, (Position == stop -> break ; !) ;
												write('Invalid position, try again '), nl, fail).

%verifies if input is a valid table coord or the stop signal
validInput(X) :- X == n ; X == s; X == e ; X== w ;
					X == ne; X == nw; X == se; X == sw;
					X == c ; X == stop.

%verifies if the position within the waiter's table is valid
validPosition(Table, Position) :- pos(Table, Position, o), waiterPos(WT, WP),
                                ((Table \= WT) ; (Table == WT, Position \= WP)).
validPosition(stop, _).
validPosition(_, stop).

%moves the current piece to the position X of the waiter's table
move(Table, Position) :-currentPiece(Piece),				%gets current piece (black or green)
						retract(pos(Table, Position, _)),	%clear new position for piece
						assert(pos(Table, Position, Piece)),%moves piece to new position
						retract(waiterPos(_, _)),                        %removes current waiter pos
						assert(waiterPos(Position, Table))),	%moves waiter to new pos
						flipCurrentPiece.				%changes the current piece

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Start and end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%starts a new game based on a given game type
start(N):- N \= '1vs1', N \= '1vsAI', N \= 'AIvsAI', fail.
start('1vs1') :- start_1vs1.
start('1vsAI') :- start_1vsAI.
start('AIvsAI') :- start_AIvsAI.

%starts a new game, reading from the keyboard a valid game type
startGame :- nl, write('Choose the type of game you want to play (\'1vs1\'/\'1vsAI\'/\'AIvsAI\')'), nl,
		repeat,
			read(Type),
			(start(Type) -> ! ;
				write('Invalid option, try again '),
				nl,
				fail
			).

%resets the prolog database to the values prior to the game's start (no facts instantiated)
reset :- retractall(pos(_,_,_)), retractall(gameType(_)), retractall(waiterPos(_,_)), retractall(difficulty(_)),
		 retractall(currentPiece(_)), retractall(specMovePos(_, _, _, _)), retractall(specialMoveActive(_)),
		 retractall(smallestTable(_, _)), write('Game finished successfully'), nl.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Game cycle
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%main game loop. It starts a new match and repeats an input-logic-display cycle until
%one of the players fulfills the victory conditions.
play :-
				initPositions,									%initializes the positions
				startGame,										%prompts for game type and difficulty
				printBoard,										%prints the board at the start
				repeat,
						getMove(Table, Position),				%get move
						printCurrPlayerMove(Table, Position),	%prints the current player's move
						move(Table, Position),					%move piece
						printBoard,								%show board
						(checkVictory -> ! ; fail). 			%check victory (if fail, repeats)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% Requests
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
request_init :- initPositions.

request_start_1vs1 :- start_1vs1.
request_start_1vsAI :- start_1vsAI.
request_start_AIvsAI :- start_AIvsAI.
request_AI_easy :- setAIdifficulty('easy').
request_AI_hard :- setAIdifficulty('hard').

request_board(B) :- findall(T-P-Pc, pos(T, P, Pc), B).

request_victory('black') :- checkVictoryPlayer('b').
request_victory('green') :- checkVictoryPlayer('g').
request_victory('none').

request_reset :- reset.

request_move_human(P, valid) :- waiterPos(T, _), move(T, P).
request_move_human(_, invalid).

request_move_AI :- getMoveAI(T, P), move(T, P).

request_waiter_pos(T, P) :- waiterPos(T, P).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
