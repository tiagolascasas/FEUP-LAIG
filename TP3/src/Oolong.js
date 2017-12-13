function Oolong(scene)
{
    this.scene = scene;
    this.graph = scene.objGraph;
    this.greenPiece = this.graph.getNodeByID("greenPiece");
    this.blackPiece = this.graph.getNodeByID("blackPiece");
}

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
    console.log(data.target.response);
};

Oolong.prototype.display = function()
{

};
