import type { AmenityCategoryId } from '@/lib/lone-mountain-map'

/** Verified places for static HTML, fallback map list, and ItemList schema */
export type CuratedAmenity = {
  name: string
  category: AmenityCategoryId
  /** Street address included in UI/JSON-LD only when verified against sourceUrl */
  address: string
  schemaType: string
  sourceUrl: string
  note?: string
}

export const CURATED_AMENITIES: CuratedAmenity[] = [
  {
    name: 'Lone Mountain Regional Park',
    category: 'parks',
    address: '9825 W Lone Mountain Rd, Las Vegas, NV 89129',
    schemaType: 'Park',
    sourceUrl:
      'https://www.clarkcountynv.gov/government/departments/parks___recreation/services/area_reservations/',
    note: 'Clark County regional park with trails, sports fields, and picnic areas.',
  },
  {
    name: 'Majestic Park',
    category: 'parks',
    address: '3997 N Hualapai Way, Las Vegas, NV 89129',
    schemaType: 'Park',
    sourceUrl: 'https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Majestic-Park',
    note: 'City of Las Vegas park with softball fields, playgrounds, and picnic areas.',
  },
  {
    name: 'Skyridge Park',
    category: 'parks',
    address: '10500 Stange Ave, Las Vegas, NV 89129',
    schemaType: 'Park',
    sourceUrl: 'https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Skyridge-Park',
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    address: '6730 N Hualapai Way, Las Vegas, NV 89149',
    schemaType: 'GroceryStore',
    sourceUrl: 'https://local.albertsons.com/nv/las-vegas/6730-n-hualapai-way.html',
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    address: '7151 W Craig Rd, Las Vegas, NV 89129',
    schemaType: 'GroceryStore',
    sourceUrl: 'https://local.albertsons.com/nv/las-vegas/7151-w-craig-rd.html',
  },
  {
    name: 'Walmart Supercenter',
    category: 'grocery',
    address: '10440 W Cheyenne Ave, Las Vegas, NV 89129',
    schemaType: 'GroceryStore',
    sourceUrl: 'https://www.walmart.com/store/3282-las-vegas-nv',
  },
  {
    name: 'Centennial Hills Hospital Medical Center',
    category: 'healthcare',
    address: '6900 N Durango Dr, Las Vegas, NV 89149',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.centennialhillshospital.com/about/contact-us',
  },
  {
    name: 'MountainView Hospital',
    category: 'healthcare',
    address: '3100 N Tenaya Way, Las Vegas, NV 89128',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.sunrisehealthinfo.com/locations/mountainview-hospital/about-us/contact-us',
  },
  {
    name: 'Summerlin Hospital Medical Center',
    category: 'healthcare',
    address: '657 N Town Center Dr, Las Vegas, NV 89144',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.summerlinhospital.com/about/contact-us',
  },
  {
    name: 'Dean La Mar Allen Elementary School',
    category: 'schools',
    address: '8680 W Hammer Ln, Las Vegas, NV 89149',
    schemaType: 'School',
    sourceUrl: 'https://deanlamarallenes.ccsd.net/parents',
  },
  {
    name: 'Centennial High School',
    category: 'schools',
    address: '10200 W Centennial Pkwy, Las Vegas, NV 89149',
    schemaType: 'School',
    sourceUrl: 'https://www.centennialhighschool.org/',
  },
  {
    name: 'Downtown Summerlin',
    category: 'shopping',
    address: '1980 Festival Plaza Dr, Las Vegas, NV 89135',
    schemaType: 'ShoppingCenter',
    sourceUrl: 'https://summerlin.com/downtown-summerlin/',
    note: 'Open-air shopping, dining, and entertainment west of the Strip.',
  },
]

export const amenitiesPageFaqs = [
  {
    question: 'What grocery stores are near Lone Mountain?',
    answer:
      'Albertsons on N Hualapai Way and W Craig Rd, plus Walmart Supercenter on W Cheyenne Ave, are common grocery options serving Lone Mountain and Northwest Las Vegas.',
  },
  {
    question: 'How far is Lone Mountain from the Las Vegas Strip?',
    answer:
      'Lone Mountain is roughly 15–20 miles northwest of the Las Vegas Strip; drive time is often about 25–40 minutes depending on traffic and your starting point in the neighborhood (approximate).',
  },
  {
    question: 'Are there hospitals near Lone Mountain?',
    answer:
      'Yes. Centennial Hills Hospital, MountainView Hospital, and Summerlin Hospital Medical Center are within a short drive of Lone Mountain for emergency and specialty care.',
  },
  {
    question: 'What parks are in the Lone Mountain area?',
    answer:
      'Lone Mountain Regional Park is the flagship Clark County park in the area, with Majestic Park and Skyridge Park also offering trails, playgrounds, and open space nearby.',
  },
  {
    question: 'How far is Harry Reid International Airport from Lone Mountain?',
    answer:
      'Harry Reid International Airport is typically about 18–22 miles southeast of Lone Mountain, often 25–35 minutes by car in normal traffic (approximate).',
  },
  {
    question: 'Is Lone Mountain close to Summerlin?',
    answer:
      'Yes. Downtown Summerlin and west Summerlin shopping are usually within about 8–12 miles, making Summerlin dining and retail an easy trip from Lone Mountain.',
  },
  {
    question: 'Which CCSD schools are assigned to Lone Mountain addresses?',
    answer:
      'Lone Mountain is in Clark County School District. Assigned schools depend on the exact address—verify with the CCSD Zoning Search before you buy. Nearby public campuses include Dean La Mar Allen Elementary and Centennial High School.',
  },
  {
    question: 'Who can help me buy a home near these Lone Mountain amenities?',
    answer:
      'Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties specializes in Lone Mountain real estate—call 702-222-1964 for a neighborhood tour.',
  },
]
