/**
  * Represents a scene graph, holding information about its nodes, textures and materials
  * @constructor
  * @param {CGFScene} scene - the scene that will use this graph
  */
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

/**
  * Adds a material to the graph
  * @param {string} id - the unique material identifier
  * @param {CGFAppearance} material - the material
  */
ObjectGraph.prototype.addMaterial = function(id, material)
{
	this.mat[id] = material;
};

/**
  * Adds a texture object, holding a texture and its scale factors, to the graph
  * @param {string} id - the unique texture identifier
  * @param {ObjectTexture} tex - the texture object
  */
ObjectGraph.prototype.addTexture = function(id, tex)
{
	this.tex[id] = tex;
};

/**
  * Adds a new node to the graph
  * @param {ObjectNode} object - the node to add to the graph
  */
ObjectGraph.prototype.addObject = function(object)
{
	this.obj.push(object);
};

/**
  * Defines a new root node for the graph though its id
  * @param {string} id - the id of the new root node
  */
ObjectGraph.prototype.setRootID = function(id)
{
	this.rootID = id;
};

/**
  * Gets the node whose id is provided
  * @param {string} id - the id of the node
  * @return {ObjectNode} the node whose id was provided
  */
ObjectGraph.prototype.getNodeByID = function(id)
{
	for (var i = 0; i < this.obj.length; i++)
	{
		if (this.obj[i].id == id)
			return this.obj[i];
	}
	return null;
};

/**
  * Starts the display process of the graph by resetting the
  * textures and materials stacks and by initiating a recursive
  * depth-first search through the graph from the root node
  */
ObjectGraph.prototype.display = function()
{
	this.texStack.length = 0;
	this.matStack.length = 0;
	this.displayObjects(this.rootID);
};

/**
  * Recursive depth-first search function that displays the
  * objects of the graph, applying their transformations,
  * textures and materials accordingly
  * @param {ObjectNode} node - the current node
  */
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

	if (this.texStack.length > 0){
		this.texStack[this.texStack.length - 1].tex.unbind();
		this.texStack.pop();
	}
	if (this.matStack.length > 0)
		this.matStack.pop();
};

/**
  * Applies the appearances (materials and textures) of
  * the given node, taking into consideration the inheritance
  * mechanisms.
  * @param {ObjectNode} node - the node whose appearances will be applied
  */
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
