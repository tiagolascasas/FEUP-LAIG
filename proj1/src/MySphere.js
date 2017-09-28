/**
 * Created by ei10117 on 17/05/2017.
 */

function MySphere(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.sphere = new MySemiSphere(this.scene,10,10);
    this.initBuffers();

   /* this.fire = new CGFappearance(this);
    this.fire.loadTexture("../resources/images/fire.png");*/
    //this.fire.setTextureWrap('REPEAT', 'REPEAT');

};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;



MySphere.prototype.display = function () {
    this.scene.redMaterial.apply();
     this.sphere.display();
    this.scene.pushMatrix();

    this.scene.rotate(Math.PI, 0,1,0);
    this.sphere.display();

    this.scene.popMatrix();
};







