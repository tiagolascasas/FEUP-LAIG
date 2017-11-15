#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec4 half_vector;
    vec3 spot_direction;
    float spot_exponent;
    float spot_cutoff;
    float constant_attenuation;
    float linear_attenuation;
    float quadratic_attenuation;
    bool enabled;
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];
uniform float timeFactor;
uniform int component;

void applyIllumination()
{
	for (int i = 0; i < NUMBER_OF_LIGHTS; i++)
	{
		gl_FragColor *= uLight[i].diffuse;
		gl_FragColor *= uLight[i].specular;
		gl_FragColor *= uLight[i].ambient;
	}
}

void main()
{
	float absFactor = abs(timeFactor);
	if (component == 0)
	{
		gl_FragColor = vec4(gl_FragColor[0] * absFactor, gl_FragColor[1], gl_FragColor[2], gl_FragColor[3]);
	}
	else if (component == 1)
	{
		gl_FragColor = vec4(gl_FragColor[0], gl_FragColor[1] * absFactor, gl_FragColor[2], gl_FragColor[3]);
	}
	else if (component == 2)
	{
		gl_FragColor = vec4(gl_FragColor[0], gl_FragColor[1], gl_FragColor[2] * absFactor, gl_FragColor[3]);
	}
	applyIllumination();
}
