import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const YT_VIDEO_ID = '3P98v05ZzXE'
const LOOP_START = 38
const LOOP_END = 55
const POSTER_FRAME = '/hero-frame-01.jpg'

const HEADLINE_TOP = 'YOUR SAFETY'
const HEADLINE_BOTTOM = 'IS OUR PRIORITY'

const splitChars = (text: string) =>
  text.split('').map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      className="hero-char inline-block will-change-transform"
      style={{ opacity: 0 }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

const grainSvg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"

let ytApiPromise: Promise<any> | null = null
const loadYouTubeAPI = (): Promise<any> => {
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const w = window as any
    if (w.YT && w.YT.Player) {
      resolve(w.YT)
      return
    }
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev && prev()
      resolve(w.YT)
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    document.head.appendChild(s)
  })
  return ytApiPromise
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let pollId: number | null = null

    loadYouTubeAPI().then((YT) => {
      if (cancelled) return
      const player = new YT.Player('hero-yt-player', {
        videoId: YT_VIDEO_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
          playsinline: 1,
          disablekb: 1,
          start: LOOP_START,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.mute()
              e.target.seekTo(LOOP_START, true)
              e.target.playVideo()
            } catch {}
          },
          onStateChange: (e: any) => {
            if (e.data === YT.PlayerState.PLAYING) setVideoReady(true)
            if (e.data === YT.PlayerState.ENDED) {
              try {
                e.target.seekTo(LOOP_START, true)
                e.target.playVideo()
              } catch {}
            }
          },
        },
      })
      playerRef.current = player

      pollId = window.setInterval(() => {
        const p = playerRef.current
        if (!p || typeof p.getCurrentTime !== 'function') return
        try {
          const t = p.getCurrentTime()
          if (t >= LOOP_END - 0.2 || t < LOOP_START - 0.5) {
            p.seekTo(LOOP_START, true)
          }
        } catch {}
      }, 250)
    })

    return () => {
      cancelled = true
      if (pollId) clearInterval(pollId)
      try {
        playerRef.current?.destroy?.()
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (!heroRef.current || !stageRef.current || !textGroupRef.current) return

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(textGroupRef.current, { opacity: 1 - p * 1.6, y: p * -40 })
          gsap.set(stageRef.current, { scale: 1 + p * 0.08 })
          gsap.set('.hero-vignette', { opacity: 0.7 + p * 0.3 })
        },
      })
      return () => trigger.kill()
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.letterbox-top',
        { height: '50vh' },
        { height: '5vh', duration: 1.4, ease: 'expo.inOut' }
      )
        .fromTo(
          '.letterbox-bottom',
          { height: '50vh' },
          { height: '5vh', duration: 1.4, ease: 'expo.inOut' },
          '<'
        )
        .fromTo(
          '.hero-chapter-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, transformOrigin: 'center' },
          '-=0.6'
        )
        .fromTo(
          '.hero-chapter-label',
          { opacity: 0, letterSpacing: '0.1em' },
          { opacity: 1, letterSpacing: '0.35em', duration: 0.9 },
          '<0.1'
        )
        .fromTo(
          '.hero-line-top .hero-char',
          { opacity: 0, y: 60, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.03 },
          '-=0.3'
        )
        .fromTo(
          '.hero-line-bottom .hero-char',
          { opacity: 0, y: 60, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025 },
          '-=0.7'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-ctas > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          '.hero-meta',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.3'
        )
    })

    return () => ctx.revert()
  }, [])

  const [recSeconds, setRecSeconds] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setRecSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [])
  const mm = String(Math.floor(recSeconds / 60)).padStart(2, '0')
  const ss = String(recSeconds % 60).padStart(2, '0')

  return (
    <section
      id="hero"
      ref={heroRef}
      className="dark relative w-full"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0A1628]">
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          {/* Poster fallback (shown until the video starts) */}
          <img
            src={POSTER_FRAME}
            alt=""
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* YouTube iframe – "object-fit: cover" via viewport-based sizing */}
          <div
            className={`absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: 'max(106vw, calc(106vh * 16 / 9))',
              height: 'max(106vh, calc(106vw * 9 / 16))',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div id="hero-yt-player" className="w-full h-full" />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.25) 35%, rgba(10,22,40,0.35) 65%, rgba(10,22,40,0.95) 100%)',
            }}
          />
          <div
            className="hero-vignette absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(10,22,40,0.85) 100%)',
              opacity: 0.7,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.18]"
            style={{
              backgroundImage: `url("${grainSvg}")`,
              backgroundSize: '200px 200px',
            }}
          />
        </div>

        <div className="letterbox-top absolute top-0 left-0 right-0 bg-black z-30 pointer-events-none" />
        <div className="letterbox-bottom absolute bottom-0 left-0 right-0 bg-black z-30 pointer-events-none" />

        <div
          ref={textGroupRef}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="hero-chapter-rule w-12 h-px bg-gold origin-center" />
            <span className="hero-chapter-label text-gold text-[10px] font-mono uppercase">
              Est. 1985 · Houston, TX
            </span>
            <div className="hero-chapter-rule w-12 h-px bg-gold origin-center" />
          </div>

          <h1
            className="text-center max-w-[1100px]"
            style={{ perspective: '800px' }}
          >
            <span className="hero-line-top block text-white text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
              {splitChars(HEADLINE_TOP)}
            </span>
            <span
              className="hero-line-bottom block text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] mt-2 italic"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, #D4B76A 0%, #C8A45E 50%, #8a6f34 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {splitChars(HEADLINE_BOTTOM)}
            </span>
          </h1>

          <p className="hero-subtitle text-slate-light/85 text-base sm:text-lg text-center max-w-[580px] mt-8 font-light leading-relaxed">
            Four decades of protecting Houston&apos;s businesses, communities,
            and events — with discipline, discretion, and unwavering vigilance.
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-5 mt-12">
            <a
              href="#contact"
              className="group relative overflow-hidden bg-gold text-gold-ink px-9 py-4 rounded-sm font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(200,164,94,0.6),0_0_40px_rgba(200,164,94,0.25)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(200,164,94,0.9),0_0_60px_rgba(200,164,94,0.45)]"
            >
              <span className="relative z-10">Request a Quote</span>
              <span className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="tel:2814484900"
              className="group flex items-center gap-3 text-ice-white text-xs tracking-[0.2em] uppercase"
            >
              <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                <Phone size={12} className="text-gold" />
              </span>
              <span className="border-b border-transparent group-hover:border-gold/60 pb-0.5 transition-colors">
                (281) 448-4900
              </span>
            </a>
          </div>
        </div>

        <div className="hero-meta absolute bottom-8 left-8 z-30 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-gold/70 mix-blend-screen">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Rec {mm}:{ss}
          </span>
          <span className="text-slate/40">·</span>
          <span>24 FPS</span>
          <span className="text-slate/40">·</span>
          <span>Reel 01 / Protection</span>
        </div>

        <div className="hero-meta absolute bottom-8 right-8 z-30 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-slate/70">
          <span>Scroll</span>
          <ChevronDown size={14} className="text-gold animate-bounce-gentle" />
        </div>

        <div className="hero-meta absolute top-8 left-8 z-30 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60">
          <span className="w-3 h-3 border border-gold/60 rounded-full flex items-center justify-center">
            <span className="w-1 h-1 bg-gold/80 rounded-full" />
          </span>
          A-Cam · Scene 01
        </div>
      </div>
    </section>
  )
}
