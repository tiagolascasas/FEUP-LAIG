function Oolong(scene)
{
    this.scene = scene;
    this.graph = scene.objGraph;
    this.greenPiece = this.graph.getNodeByID("greenPiece");
    this.blackPiece = this.graph.getNodeByID("blackPiece");
    this.table = this.graph.getNodeByID("roundTable");
    this.dish = this.graph.getNodeByID("dish");
    this.running = false;

    this.initPositions();
}

Oolong.prototype.init = function(mode, difficulty)
{
    //reset game state here
    console.clear();
    this.mode = mode;
    this.difficulty = difficulty;

    this.request("reset");
    this.request("init");
    //this.waitForAnswer("Game initialized");
    switch (mode)
    {
        case "1vs1":
            this.request("start_1vs1");
            //this.waitForAnswer("1vs1 started");
            break;
        case "1vsAI":
            this.request("start_1vsAI");
            //this.waitForAnswer("1vsAI started");
            break;
        case "AIvsAI":
            this.request("start_AIvsAI");
            //this.waitForAnswer("AIvsAI started");
            break;
    }

    switch (difficulty)
    {
        case "Easy":
            this.request("AI_easy");
            //this.waitForAnswer("1vs1 started");
            break;
        case "Hard":
            this.request("AI_hard");
            //this.waitForAnswer("1vsAI started");
            break;
    }
    this.running = true;
};

Oolong.prototype.initPositions = function()
{
    let mid = Math.cos(Math.PI / 4);
    let cardinals = ['c', 'n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'];

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
    for (let i = 0; i < cardinals.length; i++)
    {
        this.dishes[cardinals[i]] = {};
        for (let j = 0; j < cardinals.length; j++)
            this.dishes[cardinals[i]][j] = this.calculateCoord(cardinals[i], cardinals[j]);
    }

    this.pieces = [];
    for (let i = 0; i < 40; i++)
    {
        let x = 1.55 + (~~(i / 10)) * 0.1;
        let y = 0;
        let z = -0.4 + (i % 10) * 0.1;
        let green = new Piece(new Coord(x, y, z), 'g');
        let black = new Piece(new Coord(-x, y, z), 'b');
        this.pieces.push(green, black);
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

Oolong.prototype.request = function(request)
{
    request = "request_" + request;
    this.sendRequest(request, this.getAnswer);
};

Oolong.prototype.sendRequest = function(requestString, onSuccess, onError, port)
{
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);
    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
};

Oolong.prototype.getAnswer = function(data)
{
    this.answer = data.target.response;
    console.log(this.answer);
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

    for (let table in this.dishes)
    {
        for (let pos in this.dishes[table])
        {
            coord = this.dishes[table][pos];
            this.scene.pushMatrix();
            this.scene.translate(coord.x, coord.y, coord.z);
            this.graph.display("dish");
            this.scene.popMatrix();
        }
    }

    for (let i = 0; i < this.pieces.length; i++)
    {
        coord = this.pieces[i].coord;
        piece = this.pieces[i].color == 'g' ? "greenPiece" : "blackPiece";
        this.scene.pushMatrix();
        this.scene.translate(coord.x, coord.y, coord.z);
        this.graph.display(piece);
        this.scene.popMatrix();
    }
};
