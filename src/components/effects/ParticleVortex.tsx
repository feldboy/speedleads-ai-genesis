import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fx, hexToRgb01 } from '@/lib/effectsConfig';

/**
 * Hero light-streak shader (the owner's keeper). Tuned for cost: DPR capped
 * at 1.5 with an extra 0.85 internal-resolution scale (it's a soft cloud
 * field — the downscale is invisible), rAF paused whenever the hero scrolls
 * offscreen or the tab hides. A CSS mask fades the bottom of the canvas into
 * the page-wide liquid-ink background so the hero dissolves into the page
 * instead of ending at a hard edge.
 *
 * Tint, intensity and speed read live from the effects config (control panel).
 */

const VERTEX_SOURCE = `#version 300 es
in vec2 position;
void main(void) {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec3 tint;
uniform float intensity;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.0015/d*(cos(sin(i)*vec3(1,2,3))+1.)*tint;
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)))*(tint*1.05);
    col=mix(col,bg*tint*.25,d);
  }
  O=vec4(col*intensity,1);
}`;

class WebGLRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private uResolution: WebGLUniformLocation | null = null;
  private uTime: WebGLUniformLocation | null = null;
  private uTint: WebGLUniformLocation | null = null;
  private uIntensity: WebGLUniformLocation | null = null;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  private compileShader = (type: number, source: string): WebGLShader | null => {
    const { gl } = this;
    const shader = gl.createShader(type);

    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);

      return null;
    }

    return shader;
  };

  init = (): boolean => {
    const { gl } = this;
    const vs = this.compileShader(gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);

    if (!vs || !fs) return false;

    const program = gl.createProgram();

    if (!program) return false;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));

      return false;
    }

    this.program = program;
    gl.useProgram(program);

    this.uResolution = gl.getUniformLocation(program, 'resolution');
    this.uTime = gl.getUniformLocation(program, 'time');
    this.uTint = gl.getUniformLocation(program, 'tint');
    this.uIntensity = gl.getUniformLocation(program, 'intensity');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    return true;
  };

  render = (width: number, height: number, time: number): void => {
    const { gl } = this;

    if (!this.program) return;

    const [r, g, b] = hexToRgb01(fx.heroTint);
    gl.viewport(0, 0, width, height);
    gl.uniform2f(this.uResolution, width, height);
    gl.uniform1f(this.uTime, time);
    gl.uniform3f(this.uTint, r, g, b);
    gl.uniform1f(this.uIntensity, fx.heroIntensity);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
}

const useShaderBackground = (): React.RefObject<HTMLCanvasElement | null> => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  const resize = useCallback((): void => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // 1.5 DPR cap + 0.85 internal scale: soft clouds, invisible downscale
    const dpr = Math.min(window.devicePixelRatio, 1.5) * 0.85;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });

    if (!gl) return;

    const renderer = new WebGLRenderer(gl);

    if (!renderer.init()) return;

    rendererRef.current = renderer;
    resize();

    // Time is accumulated (not wall-clock) so speed tuning and pauses are
    // seamless — no jump when the hero scrolls back into view.
    let shaderTime = 0;
    let lastFrame = performance.now();
    let inView = true;
    let running = false;

    const loop = (): void => {
      if (!running) return;
      const now = performance.now();
      shaderTime += ((now - lastFrame) / 1000) * fx.heroSpeed * fx.motionSpeed;
      lastFrame = now;
      renderer.render(canvas.width, canvas.height, shaderTime);
      rafRef.current = requestAnimationFrame(loop);
    };

    const setRunning = (next: boolean): void => {
      if (next === running) return;
      running = next;
      if (running) {
        lastFrame = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      setRunning(inView && !document.hidden);
    });
    observer.observe(canvas);

    const onVisibility = (): void => setRunning(inView && !document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = (): void => resize();
    window.addEventListener('resize', onResize);

    return () => {
      setRunning(false);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [resize]);

  return canvasRef;
};

const ParticleVortex: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useShaderBackground();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent): void => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A] via-[#0a1628] to-transparent" />
    );
  }

  // The mask dissolves the shader's lower third into the liquid-ink page
  // background — no hard edge where the hero ends.
  const fadeMask = 'linear-gradient(to bottom, black 0%, black 55%, transparent 99%)';

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full touch-none"
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    />
  );
};

export default ParticleVortex;
