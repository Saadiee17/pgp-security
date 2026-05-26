export interface Branch {
  slug: 'hq' | 'conroe' | 'katy'
  name: string
  region: string
  address: string
  phone: string
  phoneHref: string
  dispatcherPhone?: string
  dispatcherHref?: string
  operationsManager: {
    name: string
    title: string
  }
}

export interface City {
  slug: string
  name: string
  region: string
  blurb: string
  address: string
  serviceArea: string[]
  services: string[]
  responseTime: string
  branch: Branch['slug']
}

const HQ_ADDRESS = '425 Aldine Bender Rd, Ste E, Houston, TX 77060'

export const branches: Branch[] = [
  {
    slug: 'hq',
    name: 'Houston HQ',
    region: 'East & Southeast Houston',
    address: HQ_ADDRESS,
    phone: '(281) 448-4900',
    phoneHref: 'tel:2814484900',
    dispatcherPhone: '(281) 448-4904',
    dispatcherHref: 'tel:2814484904',
    operationsManager: {
      name: 'Hector Bustamante',
      title: 'Account Manager',
    },
  },
  {
    slug: 'conroe',
    name: 'Conroe',
    region: 'North Houston & Montgomery County',
    address: '1102 Houston St, Conroe, TX 77301',
    phone: '(936) 539-3777',
    phoneHref: 'tel:9365393777',
    operationsManager: {
      name: 'Elise Klinger',
      title: 'Account Manager',
    },
  },
  {
    slug: 'katy',
    name: 'Katy / Westside',
    region: 'West Houston & Energy Corridor',
    address: '14520 Old Katy Rd, Suite 109, Houston, TX 77079',
    phone: '(281) 638-7993',
    phoneHref: 'tel:2816387993',
    operationsManager: {
      name: 'Edward Garza',
      title: 'Operations Manager',
    },
  },
]

export function getBranch(slug: Branch['slug']): Branch {
  const b = branches.find((br) => br.slug === slug)
  if (!b) throw new Error(`Unknown branch slug: ${slug}`)
  return b
}

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
    branch: 'hq',
  },
  {
    slug: 'katy',
    name: 'Katy',
    region: 'West Houston',
    blurb: 'Energy Corridor adjacent. PGP serves Katy\'s expanding business parks, master-planned residential communities, and retail centers along I-10.',
    address: 'Serving Katy, TX 77449 from our Katy / Westside office.',
    serviceArea: ['Cinco Ranch', 'Cross Creek Ranch', 'Old Katy', 'Falcon Point'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
    branch: 'katy',
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    region: 'Fort Bend County',
    blurb: 'Commercial and residential security for Sugar Land\'s corporate campuses, gated neighborhoods, and growing tech corridor.',
    address: 'Serving Sugar Land, TX 77479 from our Katy / Westside office.',
    serviceArea: ['First Colony', 'Telfair', 'Riverstone', 'Greatwood'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
    branch: 'katy',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    region: 'North Houston',
    blurb: 'Master-planned community coverage for The Woodlands, protecting corporate offices, retail centers, and residential villages across the township.',
    address: 'Serving The Woodlands, TX 77380 from our Conroe office.',
    serviceArea: ['Town Center', 'Cochran\'s Crossing', 'Indian Springs', 'Sterling Ridge'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
    branch: 'conroe',
  },
  {
    slug: 'pearland',
    name: 'Pearland',
    region: 'South Houston',
    blurb: 'Industrial and residential patrol for one of Houston\'s fastest-growing suburbs. Strong coverage for retail, healthcare, and HOA communities.',
    address: 'Serving Pearland, TX 77584 from our Houston HQ.',
    serviceArea: ['Silverlake', 'Shadow Creek Ranch', 'Old Pearland'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
    branch: 'hq',
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    region: 'Northwest Harris County',
    blurb: 'Business park and residential security across Cypress. Patrol and on-site coverage for the 290 corridor and Bridgeland.',
    address: 'Serving Cypress, TX 77429 from our Katy / Westside office.',
    serviceArea: ['Bridgeland', 'Towne Lake', 'Coles Crossing', 'Fairfield'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
    branch: 'katy',
  },
  {
    slug: 'spring',
    name: 'Spring',
    region: 'North Harris County',
    blurb: 'Commercial and event security for Spring\'s corporate campuses, retail centers, and entertainment venues along I-45 North.',
    address: 'Serving Spring, TX 77373 from our Conroe office.',
    serviceArea: ['Old Town Spring', 'Klein', 'Gleannloch Farms'],
    services: COMMON_SERVICES,
    responseTime: '< 45 min',
    branch: 'conroe',
  },
  {
    slug: 'pasadena',
    name: 'Pasadena',
    region: 'East Houston',
    blurb: 'Heavy-industry security for Pasadena\'s petrochemical corridor. Specialized in plant gate operations, contractor screening, and after-hours patrol.',
    address: 'Serving Pasadena, TX 77506 from our Houston HQ.',
    serviceArea: ['Deer Park border', 'Pasadena Town Square', 'South Pasadena'],
    services: COMMON_SERVICES,
    responseTime: '< 40 min',
    branch: 'hq',
  },
  {
    slug: 'league-city',
    name: 'League City',
    region: 'Galveston County',
    blurb: 'Marina, residential, and commercial security along the Galveston County corridor, including waterfront communities and retail districts.',
    address: 'Serving League City, TX 77573 from our Houston HQ.',
    serviceArea: ['Tuscan Lakes', 'South Shore Harbour', 'Mar Bella'],
    services: COMMON_SERVICES,
    responseTime: '< 55 min',
    branch: 'hq',
  },
  {
    slug: 'friendswood',
    name: 'Friendswood',
    region: 'South Houston',
    blurb: 'Quiet residential community patrol for Friendswood. Discreet, professional officers respected by HOAs across the area.',
    address: 'Serving Friendswood, TX 77546 from our Houston HQ.',
    serviceArea: ['Heritage Park', 'West Ranch', 'Sunmeadow'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
    branch: 'hq',
  },
  {
    slug: 'missouri-city',
    name: 'Missouri City',
    region: 'Southwest Houston',
    blurb: 'Mixed-use development security for Missouri City\'s growing residential and commercial zones along Highway 6.',
    address: 'Serving Missouri City, TX 77459 from our Katy / Westside office.',
    serviceArea: ['Sienna Plantation', 'Quail Valley', 'Riverstone'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
    branch: 'katy',
  },
  {
    slug: 'tomball',
    name: 'Tomball',
    region: 'Northwest Houston',
    blurb: 'Commercial and rural property security for Tomball, covering business districts, ranches, and the 249 corridor.',
    address: 'Serving Tomball, TX 77375 from our Conroe office.',
    serviceArea: ['Old Town Tomball', 'Augusta Pines', 'The Woodlands border'],
    services: COMMON_SERVICES,
    responseTime: '< 55 min',
    branch: 'conroe',
  },
  {
    slug: 'conroe',
    name: 'Conroe',
    region: 'Montgomery County',
    blurb: 'Industrial and event guard services for Conroe. We protect Lake Conroe properties, manufacturing sites, and downtown commercial buildings.',
    address: '1102 Houston St, Conroe, TX 77301',
    serviceArea: ['Lake Conroe', 'Downtown Conroe', 'April Sound'],
    services: COMMON_SERVICES,
    responseTime: '< 60 min',
    branch: 'conroe',
  },
  {
    slug: 'humble',
    name: 'Humble',
    region: 'Northeast Houston',
    blurb: 'IAH airport corridor coverage and northeast Houston commercial security, including hotels, retail, and the Kingwood community.',
    address: 'Serving Humble, TX 77338 from our Houston HQ.',
    serviceArea: ['Kingwood', 'Atascocita', 'IAH airport corridor'],
    services: COMMON_SERVICES,
    responseTime: '< 50 min',
    branch: 'hq',
  },
]

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}
