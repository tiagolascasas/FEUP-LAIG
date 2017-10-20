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

	var children = currNode.children;
	for (var i = 0; i < children.length; i++)
		this.displayObjects(children[i]);

	this.scene.popMatrix();



	if (this.texStack.length > 1){
		//this.texStack[this.texStack.length - 1].tex.unbind();
		this.texStack.pop();
	}
	if (this.matStack.length > 1)
		this.matStack.pop();
};

ObjectGraph.prototype.applyAppearences = function(node)
{
	var lastMat = this.matStack[this.matStack.length - 1];
	switch(node.material)
	{
		case "null":
			if (this.matStack.length > 0){
				this.matStack.push(lastMat);
				lastMat.apply();
			}
			break;
		case "clear":
			if (this.matStack.length > 0)
			{
				this.matStack.push(lastMat);
				this.defaultMaterial.apply();
			}
			break;
		default:
			this.matStack.push(this.mat[node.material]);
			this.mat[node.material].apply();
			break;
	}

	var lastTex = this.texStack[this.texStack.length - 1];
	switch(node.texture)
	{
		case "null":
			if (this.texStack.length > 0){
				this.texStack.push(lastTex);
				lastTex.tex.bind();
			}
			break;
		case "clear":
			if (this.texStack.length > 0)
			{
				this.texStack.push(lastTex);
				lastTex.tex.unbind();
			}
			break;
		default:
			this.texStack.push(this.tex[node.texture]);
			this.tex[node.texture].tex.bind();
			break;
	}
};
