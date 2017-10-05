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

ObjectGraph.prototype.makeRoot = function()
{
	var rt = new ObjectNode("ROOT", this.scene);

	for (var i = 0; i < this.obj.length; i++)
	{
		var id = this.obj[i].id;
		var found = false;
		for (var j = 0; j < this.obj.length; j++)
		{
			if (i != j)
			{
				for (var k = 0; k < this.obj[j].children.length; j++)
				{
					if (this.obj[j].children[k] == id && this.obj[j].leaves.length == 0)
					{
						found = true;
						break;
					}
				}
			}
		}
		if (found == false)
			rt.addChild(this.obj[i].id);
	}
	this.obj.push(rt);
};

ObjectGraph.prototype.displayObjects = function()
{
	var stack = [];
	var id;
	var currNode;

	stack.push("root");
	while(stack.length > 0)
	{
		id = stack.pop();
		currNode = this.getNodeByID(id);
		this.scene.pushMatrix();
		this.scene.multMatrix(currNode.matrix);		//
		currNode.displayLeaves();					//swap?
		this.scene.popMatrix();
		var children = currNode.children;
		for (var i = 0; i < children.length; i++)
			stack.push(children[i]);
	}
}
