/**
  * Represents a node in a graph, holding a unique id, an array of children,
  * a transformation matrix, an array of primitives and a texture and materials
  * identifier
  * @constructor
  * @param {string} id - the unique id of the node
  * @param {CGFScene} scene - the scene this node refers to
  */
function ObjectNode(id, scene)
{
	this.id = id;
	this.scene = scene;
	this.children = [];
	this.leaves = [];
	this.animations = [];
	this.material = null;
	this.texture = null;
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
};

/**
  * Adds a new child to the node
  * @param {string} id - the unique identifier of the child
  */
ObjectNode.prototype.addChild = function(id)
{
    this.children.push(id);
};

/**
  * Adds a new animation to the node
  * @param {string} id - the unique identifier of the animation
  */
ObjectNode.prototype.addAnimation = function(anim)
{
    this.animations.push(anim);
};

/**
  * Displays all the primitives the node has, changing their
  * texture coordinates based on the current texture's properties
  * @param {ObjectTexture} currTex - the current texture object
  */
ObjectNode.prototype.displayPrimitives = function(currTex)
{
    for (var i = 0; i < this.leaves.length; i++)
	{
		if (currTex != null)
			this.leaves[i].setTexCoords(currTex.ampS, currTex.ampT);
		this.scene.pushMatrix();
		this.leaves[i].display();
		this.scene.popMatrix();
	}
};

ObjectNode.prototype.applyTransformations = function(animations)
{
	this.applyAnimations(animations);
	this.scene.multMatrix(this.matrix);
};

ObjectNode.prototype.applyAnimations = function(animations)
{
	for (let i = 0; i < this.animations.length; i++)
	{
		this.scene.multMatrix(animations[this.animations[i]].getCurrentMatrix());
	}
};

/**
  * Instanciates a new primitive and adds it to the node
  * @param {string} id - the type of the primitive
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
