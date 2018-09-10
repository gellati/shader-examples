      uniform float iTime;
      uniform vec2 iResolution;
      void main(){
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        vec2 p = (2. * uv - 1.);
        float d = .01;
        vec3 col;
        float l = length(p);
        float t = iTime * .25;

        for(int i = 0; i <= 3; i++){
            uv += p/l*(sin(l - t));
            col[i] = d/length(mod(uv, 1.0)-.5);
        }

        gl_FragColor = vec4(col/l,0.);
      }
