function Oolong(scene)
{
    this.scene = scene;
    this.graph = scene.objGraph;
    this.greenPiece = this.graph.getNodeByID("greenPiece");
    this.blackPiece = this.graph.getNodeByID("blackPiece");
    this.running = false;

    //insert game state here
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

};
