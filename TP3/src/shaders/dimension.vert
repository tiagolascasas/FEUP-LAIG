attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

struct materialProperties {
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 emission;                  // Default: (0, 0, 0, 1)
    float shininess;                // Default: 0 (possible values [0, 128])
};

uniform materialProperties uFrontMaterial;

uniform float timeFactor;
uniform float scaleFactor;
varying vec2 vTextureCoord;
varying vec4 materialColor;

/*
 * This shader multiplies the normal of a vertex by a factor that varies between 0 and scaleFactor
 * and then adds it to the vertex in order to change the size of the object between its
 * normal size and and and inflated size. It also passes texture and material information
 * to the fragment shader
 */
void main()
{
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * (timeFactor / scaleFactor), 1.0);

	vTextureCoord = aTextureCoord;
	materialColor = uFrontMaterial.diffuse;
}
