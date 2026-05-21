import { useEffect, useRef } from 'react'

const FRAG = `precision highp float;
uniform float u_time; uniform vec2 u_res;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  vec2 p=uv*2.6; p.x*=u_res.x/u_res.y;
  float t=u_time*0.06;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+3.6*q+vec2(1.7,9.2)+t),fbm(p+3.6*q+vec2(8.3,2.8)-t));
  float f=fbm(p+3.8*r);
  vec3 c1=vec3(0.015,0.015,0.03);
  vec3 c2=vec3(0.30,0.14,0.55);
  vec3 c3=vec3(0.05,0.42,0.55);
  vec3 c4=vec3(0.94,0.48,0.28);
  vec3 col=mix(c1,c2,clamp(f*f*2.3,0.,1.));
  col=mix(col,c3,clamp(length(q)*0.82,0.,1.));
  col=mix(col,c4,clamp(r.x*r.x*0.62,0.,1.));
  col*=0.40+0.70*f;
  col*=1.0-0.58*length(uv-0.5);
  gl_FragColor=vec4(col,1.0);
}`

export default function ShaderBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const gl = (cv.getContext('webgl') || cv.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) { cv.style.background = 'radial-gradient(ellipse at 50% 30%, #241241, #050506 70%)'; return }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'))
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uT = gl.getUniformLocation(prog, 'u_time')
    const uR = gl.getUniformLocation(prog, 'u_res')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    const resize = () => {
      cv.width = Math.floor(window.innerWidth * dpr)
      cv.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = Date.now()
    let raf = 0
    let visible = true
    const render = () => {
      gl.uniform1f(uT, (Date.now() - t0) / 1000)
      gl.uniform2f(uR, cv.width, cv.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = () => {
      render()
      if (visible) raf = requestAnimationFrame(loop)
    }
    if (reduce) {
      render()
    } else {
      loop()
      const onScroll = () => {
        const v = window.scrollY < window.innerHeight * 1.15
        if (v && !visible) { visible = true; loop() }
        visible = v
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}
