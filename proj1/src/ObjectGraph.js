function ObjectGraph(scene)
{
	this.scene = scene;
	this.obj = [];
	this.mat = {};
	this.tex = {};
	this.matStack = [];
	this.texStack = [];
	this.defaultMaterial = null;
	this.rootID = null;
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

ObjectGraph.prototype.setRootID = function(id)
{
	this.rootID = id;
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

ObjectGraph.prototype.display = function()
{
	this.texStack.length = 0;
	this.matStack.length = 0;
	this.displayObjects(this.rootID);
};

ObjectGraph.prototype.displayObjects = function(node)
{
	var currNode = this.getNodeByID(node);

	this.scene.pushMatrix();

	this.applyAppearences(currNode);
	this.scene.multMatrix(currNode.matrix);
	currNode.displayPrimitives(this.texStack[this.texStack.length - 1]);
	//console.log(node);
	//console.log(this.texStack[this.texStack.length - 1]);
/*	console.log(this.texStack.length);
	console.log(this.texStack);
	console.log(this.matStack.length);
	console.log(this.matStack);*/

	var children = currNode.children;
	for (var i = 0; i < children.length; i++)
		this.displayObjects(children[i]);

	this.scene.popMatrix();



	if (this.texStack.length > 1)
	{
		//this.texStack[this.texStack.length - 1].tex.unbind();
		this.texStack.pop();
	}
	if (this.matStack.length > 1)
		this.matStack.pop();
};

ObjectGraph.prototype.applyAppearences = function(node)
{
	switch(node.material)
	{
		case "null":
			if (this.matStack.length > 0)
				this.matStack.push(this.matStack[this.matStack.length - 1]);
			break;
		case "clear":
			if (this.matStack.length > 0)
			{
				this.matStack.push(this.matStack[this.matStack.length - 1]);
				this.defaultMaterial.apply();
			}
			break;
		default:
			this.matStack.push(this.mat[node.material]);
			this.mat[node.material].apply();
			break;
	}

	switch(node.texture)
	{
		case "null":
			if (this.texStack.length > 0){
				this.texStack.push(this.texStack[this.texStack.length - 1]);
				this.texStack[this.texStack.length - 1].tex.bind();
			}
			break;
		case "clear":
			if (this.texStack.length > 0)
			{
				this.texStack.push(this.texStack[this.texStack.length - 1]);
				this.texStack[this.texStack.length - 1].tex.unbind();
			}
			break;
		default:
			this.texStack.push(this.tex[node.texture]);
			this.tex[node.texture].tex.bind();
			break;
	}
};
