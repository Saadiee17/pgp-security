import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useTheme } from 'next-themes'
import type * as Leaflet from 'leaflet'
import { coreCities, extendedAreas } from '@/data/serviceAreas'

interface HoustonMapProps {
  className?: string
  height?: number
}

// Free, key-less CARTO basemaps (OpenStreetMap data): dark matter for the dark
// theme, Positron for the light theme.
const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
}

export default function HoustonMap({ className = '', height = 280 }: HoustonMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  // Fall back to the live DOM class before next-themes has resolved, so the
  // first render already picks the correct basemap (no flash / double build).
  const isDark =
    (resolvedTheme ??
      (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light')) === 'dark'

  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false
    let map: Leaflet.Map | undefined

    // Load Leaflet on demand so it stays out of the entry bundle and only
    // downloads when a map actually mounts.
    void (async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // don't hijack page scrolling
        attributionControl: true,
      })

      L.tileLayer(isDark ? TILES.dark : TILES.light, {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map)

      // Small, crisp dot. Hit areas stay tight so markers never occlude each
      // other in the dense cluster (every marker stays individually clickable).
      const makeIcon = (extended: boolean) =>
        L.divIcon({
          className: 'pgp-marker-icon',
          html: `<span class="pgp-marker ${extended ? 'pgp-marker--ext' : 'pgp-marker--core'}"></span>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          popupAnchor: [0, -8],
        })

      const points = [...coreCities, ...extendedAreas]

      points.forEach((p) => {
        const marker = L.marker([p.lat, p.lng], {
          icon: makeIcon(!!p.extended),
          title: p.name,
          riseOnHover: true,
        }).addTo(map!)

        // City name reveals on hover/tap (no permanent labels — the dense
        // cluster would be an unreadable pile otherwise).
        marker.bindTooltip(p.name, {
          direction: 'top',
          offset: [0, -8],
          className: 'pgp-tooltip',
        })

        const popupEl = document.createElement('div')
        popupEl.className = 'pgp-popup-body'
        if (p.extended) {
          popupEl.innerHTML =
            `<strong>${p.name}</strong>` +
            `<span class="pgp-popup-note">Extended coverage area</span>` +
            `<button type="button">Confirm coverage &rarr;</button>`
          popupEl.querySelector('button')!.addEventListener('click', () => navigate('/contact'))
        } else {
          popupEl.innerHTML =
            `<strong>${p.name}</strong>` +
            `<button type="button">View coverage &rarr;</button>`
          popupEl
            .querySelector('button')!
            .addEventListener('click', () => navigate(`/locations/${p.slug}`))
        }
        marker.bindPopup(popupEl)
      })

      // Frame all markers (core + extended) so the full reach is visible.
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]))
      map.fitBounds(bounds, { padding: [40, 40] })

      // Ensure correct tile layout once the container has its final size.
      requestAnimationFrame(() => map?.invalidateSize())
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [navigate, isDark])

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ height: `${height}px`, background: isDark ? '#0A1628' : '#e6e8ec' }}
      aria-label="Map of PGP Security service areas across Greater Houston"
      role="img"
    />
  )
}
