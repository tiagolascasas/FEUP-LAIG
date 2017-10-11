function ObjectNode(id, scene)
{
	this.id = id;
	this.scene = scene;
	this.children = [];
	this.leaves = [];
	this.material = null;
	this.texture = null;
	this.matrix = mat4.create();
	mat4.identity(this.matrix);
};

ObjectNode.prototype.addChild = function(id)
{
    this.children.push(id);
};

ObjectNode.prototype.displayPrimitives = function(id)
{
    for (var i = 0; i < this.leaves.length; i++)
	{
		this.scene.pushMatrix();
		this.leaves[i].display();
		this.scene.popMatrix();
	}
};

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
