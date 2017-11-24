#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform int component;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec4 materialColor;

void main()
{

	float absFactor = abs(timeFactor);
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0)
        color = materialColor;

	if (component == 0)
	{
		float d = 1.0 - color.r;
		float saturatedComponent = d * absFactor;
		gl_FragColor = vec4(color.r + saturatedComponent, color.g, color.b, color.a);
	}
	else if (component == 1)
	{
		float d = 1.0 - color.g;
		float saturatedComponent = d * absFactor;
		gl_FragColor = vec4(color.r, color.g + saturatedComponent, color.b, color.a);
	}
	else if (component == 2)
	{
		float d = 1.0 - color.b;
		float saturatedComponent = d * absFactor;
		gl_FragColor = vec4(color.r, color.g, color.b + saturatedComponent, color.a);
	}
}
