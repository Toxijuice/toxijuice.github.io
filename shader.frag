#ifdef GL_ES
precision mediump float;
#endif

#define ss smoothstep
#define saturate(x) clamp(x, 0.0, 1.0)
#define round(x) floor(x + 0.5)

uniform vec2 u_resolution;
uniform float u_time;
// uniform sampler2D u_tex0; 
uniform sampler2D u_texture_0;

const float pi = 3.14159;
const float tau = pi * 2.0;
const vec3 colA = vec3(0.0, 0.6640625, 1.0);
const vec3 colB = vec3(0.0, 1.0, 0.6640625);

vec2 rotateUV(vec2 uv, float rotation){
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

float N21(vec2 p) {
    return fract(sin(dot(
            p.xy,
            vec2(12.9898,78.233)))*
            43758.5453123
        );
}

vec2  N22(vec2 p){
    return vec2(N21(p), mod(N21(p+N21(p*p)), 1234.73));
}

float Snap1(float x, float amount){
    return floor(x / amount) * amount;
}

vec2  Snap2(vec2 uv, float amount){
    return floor(uv / amount) * amount;
}

float GetShapes(vec2 uv, float speed, float gridSize, float maskAmt){
    uv.x += u_time * speed;

    vec2 gv = fract(uv * gridSize);
    float gmask = ss(0.1,0.11,1.0-length(gv * 2.0 - 1.0));
    vec2 id = floor(uv * gridSize);

    float rot = (N21(id + (id*id)) + id.x + id.y) * (tau);
    gv = rotateUV(gv, rot - u_time * (N21(id * 25.0) + 0.1));

    vec2 offs = N22(id);
    offs = Snap2(offs, 0.25);
    float shape = texture2D(u_texture_0, gv / 4. + offs).r;

    // shape = ss(0.33, 1.0, shape);
    shape *= floor(saturate(N21(id*0.1+300.0)) + maskAmt); //mask
    shape *= gmask;

    return shape;
}

void main() {
    float aspect = u_resolution.x / u_resolution.y;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x = uv.x * aspect;
    uv = uv * 2.0 - 1.0;
    vec2 ruv = rotateUV(uv, pi + 0.5);

    float shapes = 0.0;
    shapes += GetShapes(ruv+00.0, 0.5, 4.0, 0.1);
    shapes += GetShapes(ruv+20.0, 0.25, 8.0, 0.1);
    shapes += GetShapes(ruv+60.0, 0.125, 16.0, 0.05);

    shapes = saturate(shapes);

    vec3 col = mix(colA, colB, (sin(uv.x + u_time * pi * 0.3)) * 0.5 + 0.5) * shapes;

	gl_FragColor = vec4(col, shapes);
	// gl_FragColor = vec4(col, 1.0);
}
