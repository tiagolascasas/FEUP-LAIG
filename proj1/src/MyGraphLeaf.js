/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, type) 
{
    this.graph = graph;
    switch(type)
    {
        case "rectangle":
        this.primitive = new MyQuad(this.graph.scene, 0, 1, 0, 1); break;
        case "cylinder":
        this.primitive = new MyCylinder(this.graph.scene, 10, 10); break;
        case "sphere":
        this.primitive = new MySphere(this.graph.scene); break;
        case "triangle":
        this.primitive = new MyTriangle(this.graph.scene, 0, 1, 0, 1); break;
    }
}

