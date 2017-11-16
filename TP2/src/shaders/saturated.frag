#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform int component;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
//varying vec4 gl_Color;
varying vec4 materialColor;

void main()
{
	float absFactor = abs(timeFactor);
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0)
        color = materialColor;

	if (component == 0)
	{
		gl_FragColor = vec4(color.r * absFactor, color.g, color.b, color.a);
	}
	else if (component == 1)
	{
		gl_FragColor = vec4(color.r,color.g * absFactor, color.b, color.a);
	}
	else if (component == 2)
	{
		gl_FragColor = vec4(color.r, color.g, color.b * absFactor, color.a);
	}
}
