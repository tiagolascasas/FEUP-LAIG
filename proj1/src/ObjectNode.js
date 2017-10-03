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

ObjectNode.prototype.addLeaf = function(id, args)
{
	switch (id)
	{
		case 'rectangle':
			var rect = new PrimitiveRectangle(this.scene, 0, 0, 1, 1);
			this.leaves.push(rect);
			break;
		case 'cylinder':
			var cyl = new PrimitiveCylinder(this.scene, 1, 1, 1, 20, 20);
			this.leaves.push(cyl);
			break;
		case 'sphere':
			var sp = new PrimitiveSphere(this.scene, 1, 20, 20);
			this.leaves.push(sp);
			break;
		case 'triangle':
			var tr = new PrimitiveTriangle(this.scene, 1, 0, 0, 0, 1, 0, 0, 0, 1);
			this.leaves.push(tr);
			break;
	}
};
