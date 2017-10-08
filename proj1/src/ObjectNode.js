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
	var ar = args.split(" ");
	for(var i = 0; i < ar.length; i++)
		ar[i] = +ar[i];

	switch (id)
	{
		case 'rectangle':
			var rect = new PrimitiveRectangle(this.scene, ar[0], ar[1], ar[2], ar[3]);
			this.leaves.push(rect);
			break;
		case 'cylinder':
			var cyl = new PrimitiveCylinder(this.scene, ar[0], ar[1], ar[2], ar[3], ar[4], ar[5], ar[6]);
			this.leaves.push(cyl);
			break;
		case 'sphere':
			var sp = new PrimitiveSphere(this.scene, ar[0], ar[1], ar[2]);
			this.leaves.push(sp);
			break;
		case 'triangle':
			var tr = new PrimitiveTriangle(this.scene, ar[0], ar[1], ar[2], ar[3], ar[4], ar[5], ar[6], ar[7], ar[8]);
			this.leaves.push(tr);
			break;
	}
};
