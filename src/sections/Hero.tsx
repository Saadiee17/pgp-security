import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone } from 'lucide-react'
import { useAssessment } from '@/components/AssessmentModal'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO_SRC = '/pgp-home-video.mp4'
const POSTER_FRAME = '/hero-frame-01.webp'

const HEADLINE_TOP = 'SECURITY YOU CAN SEE,'
const HEADLINE_BOTTOM = 'TRACK, AND TRUST. 24/7'

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

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const { open: openAssessment } = useAssessment()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlaying = () => setVideoReady(true)
    v.addEventListener('playing', onPlaying)
    const playPromise = v.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
    return () => {
      v.removeEventListener('playing', onPlaying)
    }
  }, [])

  useEffect(() => {
    if (!heroRef.current || !stageRef.current || !textGroupRef.current) return

    const ctx = gsap.context(() => {
      // Cache targets once and use quickSetters so the scrub callback does no
      // DOM queries and no per-frame object allocation while scrolling.
      const vignette = heroRef.current!.querySelector('.hero-vignette')
      const setTextOpacity = gsap.quickSetter(textGroupRef.current!, 'opacity')
      const setTextY = gsap.quickSetter(textGroupRef.current!, 'y', 'px')
      const setStageScale = gsap.quickSetter(stageRef.current!, 'scale')
      const setVignette = vignette ? gsap.quickSetter(vignette, 'opacity') : null

      const trigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          setTextOpacity(1 - p * 1.6)
          setTextY(p * -40)
          setStageScale(1 + p * 0.08)
          setVignette?.(0.7 + p * 0.3)
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
            fetchPriority="high"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Background video – "object-fit: cover" via viewport-based sizing */}
          <div
            className={`hero-video-wrapper pointer-events-none transition-opacity duration-500 ${
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
            <video
              ref={videoRef}
              src={HERO_VIDEO_SRC}
              poster={POSTER_FRAME}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover block"
            />
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
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
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
            <button
              type="button"
              onClick={() => openAssessment()}
              className="group relative overflow-hidden bg-gold text-gold-ink px-6 py-3 sm:px-9 sm:py-4 rounded-sm font-semibold text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(200,164,94,0.6),0_0_40px_rgba(200,164,94,0.25)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(200,164,94,0.9),0_0_60px_rgba(200,164,94,0.45)] max-w-full"
            >
              <span className="relative z-10">Get Free Security Assessment</span>
              <span className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
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
      </div>
    </section>
  )
}
