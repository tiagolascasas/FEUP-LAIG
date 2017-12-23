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
    this.matrix = mat4.identity(mat4.create());

    this.initPositions();
}

Oolong.prototype.init = function(mode, difficulty)
{
    //immutable during the match
    this.mode = mode;
    this.difficulty = difficulty;

    //(re)set mutable state machine flags to default values
    this.resetState();

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

    this.running = true;
    this.readyForTurn = true;
};

Oolong.prototype.initPositions = function()
{
    const mid = Math.cos(Math.PI / 4);

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
    console.log(this.pieces);

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
                //parent.readyForChoice = true;
                break;
            case "g":
                parent.currentPlayer = "green";
                parent.requestedPlayer = false;
                //parent.readyForChoice = true;
                break;
            case "human":
                parent.currentPlayerType = "human";
                parent.requestedPlayerType = false;
                parent.readyForTurn = false;
                break;
            case "ai":
                parent.currentPlayerType = "ai";
                parent.requestedPlayerType = false;
                parent.readyForTurn = false;
                break;
            case "moved":
                parent.readyForAnimation = true;
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
        let pattern = /ai-[a-z]?[a-z]/;
        if (pattern.test(this.answer))
        {
            parent.aiMoveReady = true;
            parent.aiMove = this.answer.split('-')[1];
        }
        pattern = /waiter-[a-z]?[a-z]-[a-z]?[a-z]/;
        if (pattern.test(this.answer))
        {
            parent.readyForChoice = true;
            parent.waiter.table = this.answer.split('-')[1];
            parent.waiter.pos = this.answer.split('-')[2];
            console.log("Waiter at pos " + parent.waiter.table + "-" + parent.waiter.pos);
        }
        pattern = /\[.*/;
        if (pattern.test(this.answer))
        {
            parent.board = this.answer;
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

        if (this.currentPickedPiece.pickID == id && this.readyForAnimation)
            this.scene.multMatrix(this.matrix);
        else
            this.scene.translate(coord.x, coord.y, coord.z);

        this.graph.display(piece, id);
        this.scene.popMatrix();
    }

    this.scene.pushMatrix();
    let coord = this.calculateCoord(this.waiter.table, this.waiter.pos);
    this.scene.translate(coord.x, coord.y, coord.z);
    this.graph.display("waiter");
    this.scene.popMatrix();
};

Oolong.prototype.undo = function()
{
    console.log("Undo");
};

Oolong.prototype.parseBoardState = function(board)
{
    let positions = board.split(",");
    for (let i = 0; i < positions.length; i++)
    {
        positions[i] = positions[i].split("-");
        positions[i][0] = positions[i][0].replace("[", "");
        positions[i][1] = positions[i][1].replace("[", "");
        positions[i][2] = positions[i][2].replace("[", "");
        positions[i][0] = positions[i][0].replace("]", "");
        positions[i][1] = positions[i][1].replace("]", "");
        positions[i][2] = positions[i][2].replace("]", "");
    }
    //this.states.addState(positions);
    console.log(positions);
    return positions;
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

Oolong.prototype.getRandomPiece = function()
{
    let currPlayer = this.currentPlayer[0];

    for (let i = 0; i < this.pieces.length; i++)
    {
        if (!this.pieces[i].placed && this.pieces[i].color == currPlayer)
            return this.pieces[i];

    }
    this.running = false;
};
