import type { AmenityCategoryId } from '@/lib/lone-mountain-map'

/** Verified places for static HTML, fallback map list, and ItemList schema */
export type CuratedAmenity = {
  name: string
  category: AmenityCategoryId
  address: string
  schemaType: string
  note?: string
}

export const CURATED_AMENITIES: CuratedAmenity[] = [
  {
    name: 'Lone Mountain Regional Park',
    category: 'parks',
    address: '9825 W Lone Mountain Rd, Las Vegas, NV 89129',
    schemaType: 'Park',
    note: 'Clark County regional park with trails, sports fields, and picnic areas.',
  },
  {
    name: 'Majestic Park',
    category: 'parks',
    address: '3997 N Hualapai Way, Las Vegas, NV 89129',
    schemaType: 'Park',
  },
  {
    name: 'Skyridge Park',
    category: 'parks',
    address: '10500 Stange Ave, Las Vegas, NV 89129',
    schemaType: 'Park',
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    address: '6730 N Hualapai Way, Las Vegas, NV 89149',
    schemaType: 'GroceryStore',
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    address: '7151 W Craig Rd, Las Vegas, NV 89129',
    schemaType: 'GroceryStore',
  },
  {
    name: 'Walmart Supercenter',
    category: 'grocery',
    address: '10440 W Cheyenne Ave, Las Vegas, NV 89129',
    schemaType: 'GroceryStore',
  },
  {
    name: 'Centennial Hills Hospital Medical Center',
    category: 'healthcare',
    address: '6900 N Durango Dr, Las Vegas, NV 89149',
    schemaType: 'Hospital',
  },
  {
    name: 'MountainView Hospital',
    category: 'healthcare',
    address: '3100 N Tenaya Way, Las Vegas, NV 89128',
    schemaType: 'Hospital',
  },
  {
    name: 'Summerlin Hospital Medical Center',
    category: 'healthcare',
    address: '6575 Town Center Dr, Las Vegas, NV 89144',
    schemaType: 'Hospital',
  },
  {
    name: 'Decker Elementary School',
    category: 'schools',
    address: '8825 Paddle Wheel Dr, Las Vegas, NV 89129',
    schemaType: 'School',
  },
  {
    name: 'Paul Allen Elementary School',
    category: 'schools',
    address: '8101 Oso Blanca Rd, Las Vegas, NV 89131',
    schemaType: 'School',
  },
  {
    name: 'Centennial High School',
    category: 'schools',
    address: '10200 W Centennial Pkwy, Las Vegas, NV 89149',
    schemaType: 'School',
  },
  {
    name: 'Downtown Summerlin',
    category: 'shopping',
    address: '1980 Festival Plaza Dr, Las Vegas, NV 89135',
    schemaType: 'ShoppingCenter',
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
      'Lone Mountain Regional Park is the flagship Clark County park in the area, with Majestic Park and Skyridge Park also serving nearby families.',
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
    question: 'What schools serve Lone Mountain?',
    answer:
      'Lone Mountain is in Clark County School District; nearby public schools include Decker Elementary, Paul Allen Elementary, and Centennial High School—verify boundaries for each address.',
  },
  {
    question: 'Who can help me buy a home near these Lone Mountain amenities?',
    answer:
      'Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties specializes in Lone Mountain real estate—call 702-222-1964 for a neighborhood tour.',
  },
]
