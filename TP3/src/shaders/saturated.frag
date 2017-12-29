#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform int component;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec4 materialColor;

/*
 * This shader makes a given component (r, g, b) of the color vary between
 * its default value and 1.0 (the maximum) by using a timeFactor in order
 * to calculate that value, all the while diminuing the other components.
 * It uses the texture color preferably, but if  the fragment has no texture
 * it uses the material color instead.
 */
void main()
{
	//get texture color. If it has no texture, gets the material color instead
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0)
        color = materialColor;

    if (component == -1)
    {
        gl_FragColor = vec4(color.r, color.g, color.b, color.a);
    }
	if (component == 0)
	{
		float d = 1.0 - color.r;
		float saturatedComponent = d * timeFactor;
		gl_FragColor = vec4(color.r + saturatedComponent, color.g - color.g * timeFactor, color.b - color.b * timeFactor, color.a);
	}
	else if (component == 1)
	{
		float d = 1.0 - color.g;
		float saturatedComponent = d * timeFactor;
		gl_FragColor = vec4(color.r - color.r * timeFactor, color.g + saturatedComponent, color.b - color.b * timeFactor, color.a);
	}
	else if (component == 2)
	{
		float d = 1.0 - color.b;
		float saturatedComponent = d * timeFactor;
		gl_FragColor = vec4(color.r - color.r * timeFactor, color.g - color.g * timeFactor, color.b + saturatedComponent, color.a);
	}
}
