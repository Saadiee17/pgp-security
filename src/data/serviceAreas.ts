export interface MapPoint {
  name: string
  lat: number
  lng: number
  /** Present for cities with a detail page; omitted for extended-coverage areas. */
  slug?: string
  /** Extended service area (rendered with a distinct hollow marker). */
  extended?: boolean
}

/** Core service cities — each links to its /locations/:slug detail page. */
export const coreCities: MapPoint[] = [
  { name: 'Houston',       slug: 'houston',       lat: 29.7604, lng: -95.3698 },
  { name: 'Katy',          slug: 'katy',          lat: 29.7858, lng: -95.8245 },
  { name: 'Sugar Land',    slug: 'sugar-land',    lat: 29.6197, lng: -95.6349 },
  { name: 'The Woodlands', slug: 'the-woodlands', lat: 30.1658, lng: -95.4613 },
  { name: 'Pearland',      slug: 'pearland',      lat: 29.5636, lng: -95.2860 },
  { name: 'Cypress',       slug: 'cypress',       lat: 29.9691, lng: -95.6972 },
  { name: 'Spring',        slug: 'spring',        lat: 30.0799, lng: -95.4172 },
  { name: 'Pasadena',      slug: 'pasadena',      lat: 29.6911, lng: -95.2091 },
  { name: 'League City',   slug: 'league-city',   lat: 29.5075, lng: -95.0949 },
  { name: 'Friendswood',   slug: 'friendswood',   lat: 29.5294, lng: -95.2010 },
  { name: 'Missouri City', slug: 'missouri-city', lat: 29.6186, lng: -95.5377 },
  { name: 'Tomball',       slug: 'tomball',       lat: 30.0972, lng: -95.6161 },
  { name: 'Conroe',        slug: 'conroe',        lat: 30.3119, lng: -95.4561 },
  { name: 'Humble',        slug: 'humble',        lat: 29.9988, lng: -95.2622 },
]

/** Extended coverage — referenced so prospects in these areas don't feel excluded. */
export const extendedAreas: MapPoint[] = [
  { name: 'Galveston',  lat: 29.3013, lng: -94.7977, extended: true },
  { name: 'Richmond',   lat: 29.5822, lng: -95.7607, extended: true },
  { name: 'Huntsville', lat: 30.7235, lng: -95.5508, extended: true },
]
