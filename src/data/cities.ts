export interface City {
  slug: string
  name: string
  region: string
  blurb: string
  address: string
  serviceArea: string[]
  services: string[]
  responseTime: string
}

const HQ_ADDRESS = '425 Aldine Bender Rd, Ste E, Houston, TX 77060'

const COMMON_SERVICES = [
  'Armed Guards',
  'Unarmed Guards',
  'Patrol Services',
  'Alarm Response',
  'Temporary Security',
]

export const cities: City[] = [
  {
    slug: 'houston',
    name: 'Houston',
    region: 'Greater Houston',
    blurb: 'Our headquarters and primary service area. Full-spectrum security coverage across downtown, the Energy Corridor, the Medical Center, and every neighborhood in between.',
    address: HQ_ADDRESS,
    serviceArea: ['Downtown', 'Medical Center', 'Energy Corridor', 'Galleria', 'Heights', 'Midtown'],
    services: COMMON_SERVICES,
    responseTime: '< 30 min',
  },
  {
    slug: 'katy',
    name: 'Katy',
    region: 'West Houston',
    blurb: 'Energy Corridor adjacent. PGP serves Katy\'s expanding business parks, master-planned residential communities, and retail centers along I-10.',
    address: 'Serving Katy, TX 77449 — dispatched from Houston HQ',
    serviceArea: ['Cinco Ranch', 'Cross Creek Ranch', 'Old Katy', 'Falcon Point'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    region: 'Fort Bend County',
    blurb: 'Commercial and residential security for Sugar Land\'s corporate campuses, gated neighborhoods, and growing tech corridor.',
    address: 'Serving Sugar Land, TX 77479 — dispatched from Houston HQ',
    serviceArea: ['First Colony', 'Telfair', 'Riverstone', 'Greatwood'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    region: 'North Houston',
    blurb: 'Master-planned community coverage for The Woodlands — protecting corporate offices, retail centers, and residential villages across the township.',
    address: 'Serving The Woodlands, TX 77380 — dispatched from Houston HQ',
    serviceArea: ['Town Center', 'Cochran\'s Crossing', 'Indian Springs', 'Sterling Ridge'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
  },
  {
    slug: 'pearland',
    name: 'Pearland',
    region: 'South Houston',
    blurb: 'Industrial and residential patrol for one of Houston\'s fastest-growing suburbs. Strong coverage for retail, healthcare, and HOA communities.',
    address: 'Serving Pearland, TX 77584 — dispatched from Houston HQ',
    serviceArea: ['Silverlake', 'Shadow Creek Ranch', 'Old Pearland'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    region: 'Northwest Harris County',
    blurb: 'Business park and residential security across Cypress. Patrol and on-site coverage for the 290 corridor and Bridgeland.',
    address: 'Serving Cypress, TX 77429 — dispatched from Houston HQ',
    serviceArea: ['Bridgeland', 'Towne Lake', 'Coles Crossing', 'Fairfield'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
  },
  {
    slug: 'spring',
    name: 'Spring',
    region: 'North Harris County',
    blurb: 'Commercial and event security for Spring\'s corporate campuses, retail centers, and entertainment venues along I-45 North.',
    address: 'Serving Spring, TX 77373 — dispatched from Houston HQ',
    serviceArea: ['Old Town Spring', 'Klein', 'Gleannloch Farms'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
  },
  {
    slug: 'pasadena',
    name: 'Pasadena',
    region: 'East Houston',
    blurb: 'Heavy-industry security for Pasadena\'s petrochemical corridor. Specialized in plant gate operations, contractor screening, and after-hours patrol.',
    address: 'Serving Pasadena, TX 77506 — dispatched from Houston HQ',
    serviceArea: ['Deer Park border', 'Pasadena Town Square', 'South Pasadena'],
    services: COMMON_SERVICES,
    responseTime: '< 40 min',
  },
  {
    slug: 'league-city',
    name: 'League City',
    region: 'Galveston County',
    blurb: 'Marina, residential, and commercial security along the Galveston County corridor — including waterfront communities and retail districts.',
    address: 'Serving League City, TX 77573 — dispatched from Houston HQ',
    serviceArea: ['Tuscan Lakes', 'South Shore Harbour', 'Mar Bella'],
    services: COMMON_SERVICES,
    responseTime: '< 55 min',
  },
  {
    slug: 'friendswood',
    name: 'Friendswood',
    region: 'South Houston',
    blurb: 'Quiet residential community patrol for Friendswood — discreet, professional officers respected by HOAs across the area.',
    address: 'Serving Friendswood, TX 77546 — dispatched from Houston HQ',
    serviceArea: ['Heritage Park', 'West Ranch', 'Sunmeadow'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
  },
  {
    slug: 'missouri-city',
    name: 'Missouri City',
    region: 'Southwest Houston',
    blurb: 'Mixed-use development security for Missouri City\'s growing residential and commercial zones along Highway 6.',
    address: 'Serving Missouri City, TX 77459 — dispatched from Houston HQ',
    serviceArea: ['Sienna Plantation', 'Quail Valley', 'Riverstone'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
  },
  {
    slug: 'tomball',
    name: 'Tomball',
    region: 'Northwest Houston',
    blurb: 'Commercial and rural property security for Tomball — covering business districts, ranches, and the 249 corridor.',
    address: 'Serving Tomball, TX 77375 — dispatched from Houston HQ',
    serviceArea: ['Old Town Tomball', 'Augusta Pines', 'The Woodlands border'],
    services: COMMON_SERVICES,
    responseTime: '< 55 min',
  },
  {
    slug: 'conroe',
    name: 'Conroe',
    region: 'Montgomery County',
    blurb: 'Industrial and event guard services for Conroe — protecting Lake Conroe properties, manufacturing sites, and downtown commercial buildings.',
    address: 'Serving Conroe, TX 77301 — dispatched from Houston HQ',
    serviceArea: ['Lake Conroe', 'Downtown Conroe', 'April Sound'],
    services: COMMON_SERVICES,
    responseTime: '< 60 min',
  },
  {
    slug: 'humble',
    name: 'Humble',
    region: 'Northeast Houston',
    blurb: 'IAH airport corridor coverage and northeast Houston commercial security — including hotels, retail, and the Kingwood community.',
    address: 'Serving Humble, TX 77338 — dispatched from Houston HQ',
    serviceArea: ['Kingwood', 'Atascocita', 'IAH airport corridor'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
  },
]

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}
