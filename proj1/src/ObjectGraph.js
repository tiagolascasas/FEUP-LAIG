function ObjectGraph(scene)
{
	this.scene = scene;
	this.obj = [];
	this.mat = [];
	this.tex = [];
};

ObjectGraph.prototype.addMaterial = function(id, material)
{
	this.mat[id] = material;
};

ObjectGraph.prototype.addTexture = function(id, tex)
{
	this.tex[id] = tex;
};

ObjectGraph.prototype.addObject = function(object)
{
	this.obj.push(object);
};

ObjectGraph.prototype.getNodeByID = function(id)
{
	for (var i = 0; i < this.obj.length; i++)
	{
		if (this.obj[i].id == id)
			return this.obj[i];
	}
	return null;
};

ObjectGraph.prototype.printTreeInformation = function(node)
{
	for (var i = 0; i < this.obj.length; i++)
	{
		console.log("Node " + this.obj[i].id + " has " + this.obj[i].children.length + " children: " + this.obj[i].children);
	}
};

ObjectGraph.prototype.displayObjects = function(node)
{
	var currNode = this.getNodeByID(node);
	this.scene.pushMatrix();
	this.scene.multMatrix(currNode.matrix);
	currNode.displayPrimitives();
	var children = currNode.children;
	for (var i = 0; i < children.length; i++)
		this.displayObjects(children[i]);
	this.scene.popMatrix();
}
