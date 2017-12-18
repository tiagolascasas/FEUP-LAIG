"use strict";

function Oolong(scene)
{
    this.scene = scene;
    this.graph = scene.objGraph;
    this.greenPiece = this.graph.getNodeByID("greenPiece");
    this.blackPiece = this.graph.getNodeByID("blackPiece");
    this.table = this.graph.getNodeByID("roundTable");
    this.dish = this.graph.getNodeByID("dish");
    this.cardinals = ['c', 'n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'];

    this.initPositions();
}

Oolong.prototype.init = function(mode, difficulty)
{
    //immutable during the match
    this.mode = mode;
    this.difficulty = difficulty;

    //altered during the match
    this.running = false;
    this.currentPickedPiece = 0;
    this.currentPickedDish = 0;
    this.newPick = false;
    this.moveIsValid = false;
    this.requestedMove = false;
    this.readyForTurn = false;

    console.clear();
    console.log("Starting " + this.mode + " match with " + this.difficulty + " difficulty");

    this.request("reset");
    this.request("init");

    switch (mode)
    {
        case "1vs1":
            this.request("start_1vs1");
            break;
        case "1vsAI":
            this.request("start_1vsAI");
            break;
        case "AIvsAI":
            this.request("start_AIvsAI");
            break;
    }

    switch (difficulty)
    {
        case "Easy":
            this.request("AI_easy");
            break;
        case "Hard":
            this.request("AI_hard");
            break;
    }
    this.request("board");

    this.running = true;
    this.readyForTurn = true;
};

Oolong.prototype.initPositions = function()
{
    let mid = Math.cos(Math.PI / 4);

    this.tables = {};
    this.tables['c'] = new Coord(0, 0, 0);
    this.tables['n'] = new Coord(0, 0, -1.1);
    this.tables['s'] = new Coord(0, 0, 1.1);
    this.tables['e'] = new Coord(1.1, 0, 0);
    this.tables['w'] = new Coord(-1.1, 0, 0);
    this.tables['nw'] = new Coord(-1.1*mid, 0, -1.1*mid);
    this.tables['ne'] = new Coord(1.1*mid, 0, -1.1*mid);
    this.tables['sw'] = new Coord(-1.1*mid, 0, 1.1*mid);
    this.tables['se'] = new Coord(1.1*mid, 0, 1.1*mid);

    this.dishes = {};
    for (let i = 0; i < this.cardinals.length; i++)
    {
        this.dishes[this.cardinals[i]] = {};
        for (let j = 0; j < this.cardinals.length; j++)
        {
            let table = this.cardinals[i];
            let pos = this.cardinals[j];
            let pickID = i*10 + j;
            let coord = this.calculateCoord(table, pos);
            this.dishes[table][pos] = new Dish(coord, pickID, table, pos);
        }
    }

    this.pieces = [];
    for (let i = 0; i < 40; i++)
    {
        let x = 1.55 + (~~(i / 10)) * 0.1;
        let y = 0;
        let z = -0.4 + (i % 10) * 0.1;
        let green = new Piece(new Coord(x, y, z), 'g', 100 + i);
        let black = new Piece(new Coord(-x, y, z), 'b', 200 + i);
        this.pieces.push(green, black);
    }

    this.waiter = {"table":'c', "pos":'c'};
};

Oolong.prototype.updatePickedElements = function(pickID)
{
    if (pickID > 0 && pickID < 100 && !this.requestedMove)
    {
        if (this.currentPickedDish != pickID && this.running)
        {
            this.currentPickedDish = pickID;
            console.log("Current Picked dish: " + this.currentPickedDish);
            this.newPick = true;
        }
    }
    else if (pickID >= 100 && pickID < 180 && !this.requestedMove)
    {
        if (this.currentPickedPiece != pickID && this.running)
        {
            this.currentPickedPiece = pickID;
            console.log("Current Picked piece: " + this.currentPickedPiece);
            this.newPick = true;
        }
    }
};

Oolong.prototype.calculateCoord = function(table, pos)
{
    let mid = Math.cos(Math.PI / 4);
    table = this.tables[table];
    switch(pos)
    {
        case 'n':
            return new Coord(table.x, table.y, table.z - 0.25);
        case 's':
            return new Coord(table.x, table.y, table.z + 0.25);
        case 'e':
            return new Coord(table.x + 0.25, table.y, table.z);
        case 'w':
            return new Coord(table.x - 0.25, table.y, table.z);
        case 'ne':
            return new Coord(table.x + 0.25*mid, table.y, table.z - 0.25*mid);
        case 'nw':
            return new Coord(table.x - 0.25*mid, table.y, table.z - 0.25*mid);
        case 'sw':
            return new Coord(table.x -0.25*mid, table.y, table.z + 0.25*mid);
        case 'se':
            return new Coord(table.x + 0.25*mid, table.y, table.z + 0.25*mid);
        case 'c':
            return new Coord(table.x, table.y, table.z);
    }
};

Oolong.prototype.request = function(answer)
{
    answer = "request_" + answer;
    let requestPort = 8081;
    let request = new XMLHttpRequest();
    let parent = this;

    request.open('GET', 'http://localhost:' + requestPort + '/' + answer, true);
    request.onload = function(data)
    {
        this.answer = data.target.response;
        console.log(this.answer);
        switch (this.answer)
        {
            case "valid":
                parent.moveIsValid = true;
                parent.requestedMove = false;
                break;
            case "invalid":
                parent.moveIsValid = false;
                parent.requestedMove = false;
                break;
            case "b":
                parent.currentPlayer = "black";
                parent.requestedPlayer = false;
                break;
            case "g":
                parent.currentPlayer = "green";
                parent.requestedPlayer = false;
                break;
            case "human":
                parent.currentPlayerType = "human";
                parent.requestedPlayerType = false;
                parent.readyForTurn = false;
                parent.readyForChoice = true;
                break;
            case "ai":
                parent.currentPlayerType = "ai";
                parent.requestedPlayerType = false;
                parent.readyForTurn = false;
                parent.readyForChoice = true;
                break;
            case "victory_black":
                parent.winner = "black";
                parent.winnerIsSet = true;
                parent.requestedWinner = false;
                parent.readyForUpdate = true;
                break;
            case "victory_green":
                parent.winner = "green";
                parent.winnerIsSet = true;
                parent.requestedWinner = false;
                parent.readyForUpdate = true;
                break;
            case "victory_none":
                parent.winner = "none";
                parent.winnerIsSet = true;
                parent.requestedWinner = false;
                parent.readyForUpdate = true;
                break;
        }
    };
    request.onerror = function(data)
    {
        console.log("Unable to get server response");
        parent.running = false;
    };
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
};

Oolong.prototype.display = function()
{
    for (let pos in this.tables)
    {
        let coord = this.tables[pos];
        this.scene.pushMatrix();
        this.scene.translate(coord.x, coord.y, coord.z);
        this.graph.display("roundTable");
        this.scene.popMatrix();
    }

    for (let i = 0; i < this.cardinals.length; i++)
    {
        for (let j = 0; j < this.cardinals.length; j++)
        {
            let table = this.cardinals[i];
            let pos = this.cardinals[j];
            let coord = this.dishes[table][pos].coord;
            let id = this.dishes[table][pos].pickID;
            this.scene.pushMatrix();
            this.scene.translate(coord.x, coord.y, coord.z);
            this.graph.display("dish", id);
            this.scene.popMatrix();
        }
    }

    if (!this.running)
        return;

    for (let i = 0; i < this.pieces.length; i++)
    {
        let coord = this.pieces[i].coord;
        let piece = this.pieces[i].color == 'g' ? "greenPiece" : "blackPiece";
        let id = this.pieces[i].pickID;
        this.scene.pushMatrix();
        this.scene.translate(coord.x, coord.y, coord.z);
        this.graph.display(piece, id);
        this.scene.popMatrix();
    }

    this.scene.pushMatrix();
    let coord = this.dishes[this.waiter.table][this.waiter.pos].coord;
    this.scene.translate(coord.x, coord.y, coord.z);
    this.graph.display("waiter");
    this.scene.popMatrix();
};

Oolong.prototype.update = function(time)
{
    if (!this.running)
        return;

    //get current player and its type
    if (this.readyForTurn)
    {
        console.log("IN TURN");
        if (!this.requestedPlayerType)
        {
            this.request("current_player_type");
            this.requestedPlayerType = true;
        }

        if (!this.requestedPlayer)
        {
            this.request("current_player");
            this.requestedPlayer = true;
        }
    }

    //current player chooses a piece and a position
    if (this.readyForChoice == true)
    {
        console.log("IN CHOICE");
        //if current player is human, get position from him
        if (this.currentPlayerType == "human")
        {
            if (this.currentPickedDish != 0 &&
                this.currentPickedPiece != 0 &&
                this.newPick)
            {
                let dish = this.getPickedDish();

                if (!this.requestedMove)
                {
                    this.request("move_human(" + dish.pos + ")");
                    this.requestedMove = true;
                }
                if (this.moveIsValid)
                {
                    this.makeMove();
                }
            }
        }
        //if current player is AI, ask the logic to generate a move
        if (this.currentPlayerType == "ai")
        {

        }
        this.readyForChoice = false;
    }

    //move the piece
    if (this.readyForMove)
    {
        console.log("IN MOVE");
    }

    //check for victory
    if (!this.requestedWinner && this.readyForVictory)
    {
        console.log("IN WINNER");
        this.readyForVictory = false;
        this.request("victory");
        this.requestedWinner = true;
    }
    if (this.winnerIsSet)
    {
        if (this.winner == "black" || this.winner == "green")
        {
            console.log(this.winner + " player wins!");
            this.running = false;
        }
    }

    //update board
    if (this.readyForUpdate)
    {
        console.log("IN UPDATE");
    }
};

Oolong.prototype.undo = function()
{
    console.log("Undo");
};

Oolong.prototype.parseBoardState = function(board)
{
    let positions = board.split(",");
    for (let i = 0; i < positions.length; i++)
        positions[i] = positions[i].split("-");
    this.states.addState(positions);
};

Oolong.prototype.getPickedDish = function()
{
    for (let table in this.dishes)
    {
        for (let pos in this.dishes[table])
        {
            if (this.dishes[table][pos].pickID == this.currentPickedDish)
                return this.dishes[table][pos];
        }
    }
};
