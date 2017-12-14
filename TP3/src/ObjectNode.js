/**
  * Represents a node in a graph, holding a unique id, an array of children,
  * a transformation matrix, an array of primitives and a texture and materials
  * identifier
  * @constructor
  * @param {String} id - the unique id of the node
  * @param {CGFScene} scene - the scene this node refers to
  * @param {ObjectGraph} graph - the graph this node belongs to
  * @param {Boolean} selectable - whether the node is selectable for a custom shader or not
  */
function ObjectNode(id, scene, graph, selectable)
{
	this.id = id;
	this.scene = scene;
	this.graph = graph;
	this.selectable = selectable;
	this.children = [];
	this.leaves = [];
	this.animations = [];
	this.lastAnimMatrices = [];
	this.baseTime = null;
	this.time = null;
	this.material = null;
	this.texture = null;
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
};

/**
  * Adds a new child to the node
  * @param {String} id - the unique identifier of the child
  */
ObjectNode.prototype.addChild = function(id)
{
    this.children.push(id);
};

/**
  * Adds a new animation to the node
  * @param {String} id - the unique identifier of the animation
  */
ObjectNode.prototype.addAnimation = function(anim)
{
    this.animations.push(anim);
	this.lastAnimMatrices.push(this.matrix);
};

/**
  * Displays all the primitives the node has, changing their
  * texture coordinates based on the current texture's properties
  * @param {ObjectTexture} currTex - the current texture object
  */
ObjectNode.prototype.displayPrimitives = function(currTex, pickID)
{
    for (var i = 0; i < this.leaves.length; i++)
	{
		if (currTex != null)
			this.leaves[i].setTexCoords(currTex.ampS, currTex.ampT);
		this.scene.pushMatrix();
		if (pickID != -1)
		{
			this.scene.registerForPick(pickID, this.leaves[i]);
		}
		this.leaves[i].display();
		this.scene.popMatrix();
	}
};

/**
  * Applies all the geometric transformations of the nodes
  * @param {Array} animations - an array with the scene's animations
  */
ObjectNode.prototype.applyTransformations = function(animations)
{
	this.applyAnimations(animations);
	this.scene.multMatrix(this.matrix);
};

/**
  * Applies the transformations related to animations this node refers
  * @param {Array} animations - an array with the scene's animations
  */
ObjectNode.prototype.applyAnimations = function(animations)
{
	for (let i = this.animations.length - 1; i >= 0; i--)
	{
		let mat = animations[this.animations[i]].calculateMatrix(this.time);

		if (mat != null)
			this.lastAnimMatrices[i] = mat;
		else
			mat = this.lastAnimMatrices[i];

		this.scene.multMatrix(mat);
	}
};

/**
  * Updates the node's current time
  * @param {Number} currTime - the system time in milliseconds
  */
ObjectNode.prototype.update = function(currTime)
{
	if (this.time == null)
	{
		this.baseTime = currTime;
		this.time = 0;
	}
	else
		this.time = currTime - this.baseTime;
};

/**
  * Instanciates a new primitive and adds it to the node
  * @param {String} id - the type of the primitive
  * @param {Array} args - the arguments to provide to that primitive's constructor
  */
ObjectNode.prototype.addLeaf = function(id, args)
{
	switch (id)
	{
		case 'rectangle':
			var rect = new PrimitiveRectangle(this.scene, args[0], args[1], args[2], args[3]);
			this.leaves.push(rect);
			break;
		case 'cylinder':
			var cyl = new PrimitiveCylinder(this.scene, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
			this.leaves.push(cyl);
			break;
		case 'sphere':
			var sp = new PrimitiveSphere(this.scene, args[0], args[1], args[2]);
			this.leaves.push(sp);
			break;
		case 'triangle':
			var tr = new PrimitiveTriangle(this.scene, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
			this.leaves.push(tr);
			break;
		case 'patch':
			var pat = new PrimitiveNURBS(this.scene, args[0], args[1], args[2]);
			this.leaves.push(pat);
			break;
	}
};
