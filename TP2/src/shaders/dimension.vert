attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
//attribute vec4 gl_Color;

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
varying vec2 vTextureCoord;
//varying vec4 gl_FrontColor;
varying vec4 materialColor;

void main()
{
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*timeFactor, 1.0);

	vTextureCoord = aTextureCoord;
	materialColor = uFrontMaterial.diffuse;
}
