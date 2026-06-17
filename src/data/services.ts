import {
  Shield,
  Eye,
  Car,
  Bell,
  Calendar,
  type LucideIcon,
} from 'lucide-react'

export type ServiceFeature = {
  title: string
  description: string
}

export type Service = {
  slug: string
  icon: LucideIcon
  title: string
  /** Short one-liner used on cards. */
  blurb: string
  /** Hero background image (served from /public). */
  image: string
  /** Longer intro paragraph for the detail page. */
  overview: string
  /** Three to four standout capabilities. */
  features: ServiceFeature[]
  /** Bullet list of what's included / typical deployments. */
  included: string[]
}

/**
 * Single source of truth for the services rendered on the homepage snapshot,
 * the /services grid, and each /services/:slug detail page. Add a service here
 * and it automatically gets a working "Learn More" detail page.
 */
export const services: Service[] = [
  {
    slug: 'armed-guards',
    icon: Shield,
    title: 'Armed Guards',
    blurb:
      'Licensed armed officers for high-risk environments and maximum deterrence.',
    image: '/service-armed-guards.webp',
    overview:
      'When the threat level is high, a visible armed presence is the strongest deterrent there is. Our armed officers are state-licensed, background-vetted, and continuously trained in firearms safety, de-escalation, and emergency response, protecting corporate offices, financial institutions, industrial sites, and high-profile events.',
    features: [
      {
        title: 'Licensed & Certified',
        description:
          'Every armed officer holds an active Texas Level III commission and current firearms certification.',
      },
      {
        title: 'De-escalation First',
        description:
          'Trained to read situations and defuse them before they escalate. Force is always the last resort.',
      },
      {
        title: 'Threat Deterrence',
        description:
          'A professional armed presence dramatically reduces the likelihood of theft, intrusion, and violence.',
      },
    ],
    included: [
      'Texas Level III commissioned officers',
      'Fixed-post and roving armed coverage',
      'Access control and ID verification',
      'Incident documentation with photos and timestamps',
      'Coordination with local law enforcement',
    ],
  },
  {
    slug: 'unarmed-guards',
    icon: Eye,
    title: 'Unarmed Guards',
    blurb:
      'Professional, approachable security for environments where visible presence matters.',
    image: '/service-unarmed-guards.webp',
    overview:
      'Not every environment calls for a firearm, but every environment benefits from a professional, attentive presence. Our unarmed officers are ideal for offices, schools, healthcare facilities, and retail, balancing approachable customer service with sharp situational awareness.',
    features: [
      {
        title: 'Customer-Facing',
        description:
          'Polished, professional officers who represent your brand while keeping people safe.',
      },
      {
        title: 'Situational Awareness',
        description:
          'Trained to observe, report, and respond, with eyes on your property at all times.',
      },
      {
        title: 'Cost-Effective',
        description:
          'Strong visible deterrence and access control without the cost of armed coverage.',
      },
    ],
    included: [
      'Lobby, reception, and front-desk posts',
      'Visitor management and access control',
      'Patrol of common areas and parking',
      'Detailed shift activity logs',
      'Emergency and evacuation support',
    ],
  },
  {
    slug: 'patrol-services',
    icon: Car,
    title: 'Patrol Services',
    blurb:
      'Mobile patrol in marked vehicles covering large areas on scheduled and random routes.',
    image: '/service-patrol.webp',
    overview:
      'Cover more ground for less cost. Our marked patrol vehicles provide a visible, unpredictable security presence across neighborhoods, business parks, construction sites, and large commercial properties, combining scheduled checks with randomized routes that keep would-be intruders guessing.',
    features: [
      {
        title: 'Marked Vehicles',
        description:
          'A high-visibility deterrent that signals your property is actively monitored.',
      },
      {
        title: 'Randomized Routes',
        description:
          'Unpredictable timing prevents anyone from learning and exploiting a fixed schedule.',
      },
      {
        title: 'GPS-Verified Checks',
        description:
          'Every stop is logged and timestamped so you can verify coverage was delivered.',
      },
    ],
    included: [
      'Scheduled and random patrol routes',
      'Property and perimeter checks',
      'Lock-up and alarm verification',
      'GPS-tracked, timestamped check-ins',
      'Photo-documented incident reports',
    ],
  },
  {
    slug: 'alarm-response',
    icon: Bell,
    title: 'Alarm Response',
    blurb: '24/7 monitoring with rapid dispatch the moment your alarm triggers.',
    image: '/service-alarm-response.webp',
    overview:
      'A triggered alarm is only useful if someone responds fast. Our 24/7 dispatch team reacts the moment your system activates, sending trained officers to assess the situation, secure the property, and coordinate with authorities, so you are never left waiting and exposed.',
    features: [
      {
        title: 'Rapid Dispatch',
        description:
          'Officers are en route within minutes of an alarm activation, day or night.',
      },
      {
        title: '24/7 Coverage',
        description:
          'Round-the-clock monitoring means there is never a gap in your protection.',
      },
      {
        title: 'Full Verification',
        description:
          'On-site assessment confirms real threats and prevents costly false-alarm fees.',
      },
    ],
    included: [
      '24/7 alarm monitoring coordination',
      'Priority on-site response',
      'Property assessment and securing',
      'Law-enforcement coordination',
      'Detailed response reports',
    ],
  },
  {
    slug: 'temporary-security',
    icon: Calendar,
    title: 'Temporary Security',
    blurb:
      'Flexible security for events, short-term projects, and emergencies, deployed swiftly.',
    image: '/service-temporary.webp',
    overview:
      'Security needs are not always permanent. Whether it is a one-day event, a seasonal surge, a labor dispute, or an emergency gap in coverage, we deploy licensed officers on short notice and scale up or down as your situation changes, with no long-term commitment required.',
    features: [
      {
        title: 'Same-Day Deployment',
        description:
          'Urgent coverage dispatched quickly when you need protection right now.',
      },
      {
        title: 'Fully Scalable',
        description:
          'Add or reduce officers as your event or project requirements change.',
      },
      {
        title: 'No Long-Term Lock-In',
        description:
          'Flexible terms from a single day to several months, so you pay only for what you need.',
      },
    ],
    included: [
      'Event and crowd management',
      'Short-term and seasonal coverage',
      'Emergency gap-fill staffing',
      'Construction and project-site security',
      'Flexible one-day to multi-month terms',
    ],
  },
]

export const getServiceBySlug = (slug: string | undefined) =>
  services.find((s) => s.slug === slug)
