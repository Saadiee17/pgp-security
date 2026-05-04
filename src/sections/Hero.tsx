import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Phone, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const YT_VIDEO_ID = '3P98v05ZzXE'
const LOOP_START = 38
const LOOP_END = 55
const POSTER_FRAME = '/hero-frame-01.jpg'

const HEADLINE_TOP = 'SECURITY YOU CAN SEE,'
const HEADLINE_BOTTOM = 'TRACK, AND TRUST — 24/7'

const splitWords = (text: string, charStyle?: CSSProperties) => {
  const words = text.split(' ')
  return words.flatMap((word, wi) => {
    const wordEl = (
      <span key={`word-${wi}`} className="inline-block whitespace-nowrap">
        {word.split('').map((ch, i) => (
          <span
            key={`${wi}-${i}`}
            className="hero-char inline-block will-change-transform"
            style={{ opacity: 0, ...charStyle }}
          >
            {ch}
          </span>
        ))}
      </span>
    )
    if (wi === words.length - 1) return [wordEl]
    return [
      wordEl,
      <span
        key={`sp-${wi}`}
        className="hero-char inline-block will-change-transform"
        style={{ opacity: 0, width: '0.28em', ...charStyle }}
      >
        {' '}
      </span>,
    ]
  })
}

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
  const ytHostRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let pollId: number | null = null

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !ytHostRef.current) return

      // Mount YT into a fresh child div we create — never let YT replace
      // a React-owned node directly (causes removeChild on unmount).
      const mountId = `hero-yt-player-${Math.random().toString(36).slice(2, 9)}`
      const mount = document.createElement('div')
      mount.id = mountId
      mount.style.width = '100%'
      mount.style.height = '100%'
      ytHostRef.current.appendChild(mount)

      const player = new YT.Player(mountId, {
        videoId: YT_VIDEO_ID,
        width: 1920,
        height: 1080,
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
          vq: 'hd1080',
          hd: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            try {
              const iframe: HTMLIFrameElement | null = e.target.getIframe?.()
              if (iframe) {
                iframe.style.position = 'absolute'
                iframe.style.top = '0'
                iframe.style.left = '0'
                iframe.style.width = '100%'
                iframe.style.height = '100%'
                iframe.style.border = '0'
                iframe.style.display = 'block'
                iframe.style.transform = 'scale(1.18)'
                iframe.style.transformOrigin = 'center center'
                iframe.removeAttribute('width')
                iframe.removeAttribute('height')
              }
              e.target.mute()
              e.target.seekTo(LOOP_START, true)
              try {
                e.target.setPlaybackQuality?.('hd1080')
              } catch {}
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
      playerRef.current = null
      // Clear anything YT left behind so React never tries to remove a
      // node it doesn't own.
      if (ytHostRef.current) ytHostRef.current.innerHTML = ''
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
            className={`hero-video-wrapper pointer-events-none transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'max(106vw, calc(106vh * 16 / 9))',
              height: 'max(106vh, calc(106vw * 9 / 16))',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div ref={ytHostRef} className="w-full h-full" />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.35) 35%, rgba(10,22,40,0.4) 65%, rgba(10,22,40,0.9) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 45% at center, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0) 75%)',
            }}
          />
          <div
            className="hero-vignette absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 110% 90% at center, transparent 55%, rgba(10,22,40,0.55) 100%)',
              opacity: 0.6,
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

        <div className="letterbox-top absolute top-0 left-0 right-0 bg-deep-navy z-30 pointer-events-none" />
        <div className="letterbox-bottom absolute bottom-0 left-0 right-0 bg-deep-navy z-30 pointer-events-none" />

        <div
          ref={textGroupRef}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="flex items-center gap-2 sm:gap-4 mb-10 max-w-full">
            <div className="hero-chapter-rule w-6 sm:w-12 h-px bg-gold origin-center flex-shrink-0" />
            <span className="hero-chapter-label text-gold text-[9px] sm:text-[10px] font-mono uppercase whitespace-nowrap">
              Est. 1985 · Houston, TX
            </span>
            <div className="hero-chapter-rule w-6 sm:w-12 h-px bg-gold origin-center flex-shrink-0" />
          </div>

          <h1
            className="text-center max-w-[1100px]"
            style={{ perspective: '800px' }}
          >
            <span className="hero-line-top block text-white text-[clamp(2rem,6.2vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
              {splitWords(HEADLINE_TOP)}
            </span>
            <span
              className="hero-line-bottom block text-[clamp(2rem,6.2vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] mt-2 italic pb-2 pr-2 sm:pr-3"
              style={{
                color: '#ECCB7C',
                filter:
                  'drop-shadow(0 2px 8px rgba(0,0,0,0.65)) drop-shadow(0 0 24px rgba(10,22,40,0.5))',
              }}
            >
              {splitWords(HEADLINE_BOTTOM)}
            </span>
          </h1>

          <p className="hero-subtitle text-slate-light/85 text-base sm:text-lg text-center max-w-[580px] mt-8 font-light leading-relaxed">
            Serving Greater Houston since 1985 with licensed guards and rapid response.
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-10 sm:mt-12 w-full sm:w-auto px-2 sm:px-0">
            <Link
              to="/contact"
              className="group relative overflow-hidden bg-gold text-gold-ink px-6 py-3 sm:px-9 sm:py-4 rounded-sm font-semibold text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(200,164,94,0.6),0_0_40px_rgba(200,164,94,0.25)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(200,164,94,0.9),0_0_60px_rgba(200,164,94,0.45)] max-w-full"
            >
              <span className="relative z-10">Get Free Security Assessment</span>
              <span className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <a
              href="tel:2814484900"
              className="group flex items-center gap-3 text-ice-white text-xs tracking-[0.2em] uppercase"
            >
              <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                <Phone size={12} className="text-gold" />
              </span>
              <span className="border-b border-transparent group-hover:border-gold/60 pb-0.5 transition-colors">
                Call Now
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
