function Oolong(scene)
{
    this.scene = scene;
    this.graph = scene.objGraph;
    this.greenPiece = this.graph.getNodeByID("greenPiece");
    this.blackPiece = this.graph.getNodeByID("blackPiece");
    this.table = this.graph.getNodeByID("roundTable");

    this.initPositions();
}

Oolong.prototype.init = function(mode)
{
    //reset game state here
    console.clear();

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
    this.running = true;
};

Oolong.prototype.initPositions = function()
{
    this.tables = {};
    this.tables['c'] = new Coord(0, 0, 0);
    this.tables['n'] = new Coord(0, 0, -1.1);
    this.tables['s'] = new Coord(0, 0, 1.1);
    this.tables['e'] = new Coord(1.1, 0, 0);
    this.tables['w'] = new Coord(-1.1, 0, 0);
    this.tables['nw'] = new Coord(-1.1*Math.cos(Math.PI / 4), 0, -1.1*Math.cos(Math.PI / 4));
    this.tables['ne'] = new Coord(1.1*Math.cos(Math.PI / 4), 0, -1.1*Math.cos(Math.PI / 4));
    this.tables['sw'] = new Coord(-1.1*Math.cos(Math.PI / 4), 0, 1.1*Math.cos(Math.PI / 4));
    this.tables['se'] = new Coord(1.1*Math.cos(Math.PI / 4), 0, 1.1*Math.cos(Math.PI / 4));
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
};
