import { agentInfo, officeInfo } from '@/lib/site-config'

/** Market figures researched 2026-08-24. Confirm live MLS before quoting a specific home. */
export const neighborhoodMarketAsOf = 'August 2026'

export const googleReviewsSearchUrl =
  'https://www.google.com/maps/search/?api=1&query=Dr+Jan+Duffy+Berkshire+Hathaway+HomeServices+9406+W+Lake+Mead+Blvd+Las+Vegas'

export const loneMountainParkMapEmbedUrl =
  'https://maps.google.com/maps?q=Lone+Mountain+Regional+Park+Las+Vegas+NV+89129&output=embed'

export const officeMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(officeInfo.address.full)}&output=embed`

export const officeHours = [
  { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
  { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { days: 'Sunday', hours: 'By appointment' },
]

export const priceTiers = [
  {
    name: 'Condos and townhomes',
    range: '$240,000 to $400,000 typical',
    detail:
      'Gated inventory at The Legends (Legend Hills Street and nearby 89129 streets) includes 2- and 3-bedroom condos with community pools, a spa, a fitness room, and HOA grounds care. August 2026 MLS examples listed from about $229,000 to the mid-$300,000s; some larger units list toward $400,000.',
  },
  {
    name: 'Standard single-family homes',
    range: 'About $450,000 to $900,000',
    detail:
      'Most detached homes in ZIP 89129, 89131, and 89149 list in this band. Las Vegas REALTORS MLS reporting for those three ZIPs showed a $455,000 median list price in June 2026. Lot size, garage configuration, and updates move a given address inside the range.',
  },
  {
    name: 'Custom luxury estates',
    range: 'About $1.1 million to $3.8 million+',
    detail:
      'Guard-gated compounds and large-lot custom homes—including addresses in The Estates at Lone Mountain—sold in this band in 2026. Typical lots run 0.4 to 1.5 acres, with RV-height garages, detached shops, and enclosed yards on many parcels. Templeton Development has also delivered newer turnkey estate homes on 0.75- and 1-acre lots at the base of the peak.',
  },
]

export const neighborhoodPockets = [
  {
    name: 'The Estates at Lone Mountain',
    description:
      'Guard-gated custom and semi-custom homes on the south face of Lone Mountain peak in ZIP 89129. The established subdivision has roughly 160 homes on lots of about 0.4 to 1.5 acres. Newer Templeton Development estate lots nearby use Rural Estates (R-E) zoning with privately gated 0.75- and 1-acre sites.',
  },
  {
    name: 'Lone Mountain West / Concordia',
    description:
      'Semi-custom one- and two-story homes built mainly from the late 1990s through the late 2000s, west of the peak toward the 215 Beltway. Typical lots are smaller than RNP acreage but larger than inner-valley tract homes.',
  },
  {
    name: 'Equestrian and Rural Neighborhood Preservation pockets',
    description:
      'Clark County Rural Neighborhood Preservation (RNP) overlay and Rural Estates zoning keep minimum lot sizes large (often a half-acre or more). Many streets have no HOA, which can allow workshops, RV parking, and horse facilities where the specific parcel zoning permits it. Confirm use restrictions on the exact APN before you write an offer.',
  },
]

export const neighborhoodFaqs = [
  {
    question: 'Where is Lone Mountain in Las Vegas?',
    answer:
      'Lone Mountain sits in Northwest Las Vegas, primarily ZIP 89129, around the standalone Lone Mountain peak. The area is north of Summerlin, with access from the 215 Beltway and U.S. 95. Downtown Summerlin shopping is a short drive; the Las Vegas Strip is typically about 20 minutes southeast depending on traffic.',
  },
  {
    question: 'What do Lone Mountain homes cost in 2026?',
    answer:
      'As of June 2026, Las Vegas REALTORS MLS data for ZIPs 89129, 89131, and 89149 showed a $455,000 median list price. Condos at The Legends have recently listed from the low $200,000s. Detached homes often list from about $450,000 to $900,000. Custom estate sales in 2026 have ranged from about $1.1 million to more than $3.8 million. Call Dr. Jan Duffy at 702-222-1964 for a current CMA on a specific address.',
  },
  {
    question: 'Which Clark County School District campuses serve Lone Mountain?',
    answer:
      'Many 89129 addresses, including The Legends, are zoned to Eileen Conners Elementary School, Justice Myron E. Leavitt Middle School, and Centennial High School. Boundaries change by street. Verify the assigned campuses for any property you are considering.',
  },
  {
    question: 'Can I buy a Lone Mountain home without an HOA or with horse facilities?',
    answer:
      'Yes, some RNP and Rural Estates parcels have no HOA and may allow workshops, large-vehicle parking, or horse facilities if zoning and CC&Rs allow it. Gated pockets such as The Estates and The Legends do have HOAs. Dr. Jan Duffy will pull the parcel zoning and association documents before you write.',
  },
  {
    question: 'How do I tour Lone Mountain ranch homes or custom estates?',
    answer:
      `Call ${agentInfo.phoneFormatted}, or send your price tier, HOA preference, and ranch-versus-custom notes using the form on this page. Dr. Jan Duffy with ${agentInfo.brokerage} schedules showings from ${officeInfo.address.full}.`,
  },
]
