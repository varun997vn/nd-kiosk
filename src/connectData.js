/**
 * Everything the Connect screen shows, in one place.
 */

/**
 * QR payloads.
 *
 * These are the bare domains that were declared in the old ConnectHub and never
 * actually encoded — the four "QR codes" on screen were hand-drawn SVG that
 * scanned as nothing. They are now really encoded, so the codes work, but they
 * land on each platform's home page rather than on Namadwaar's own pages.
 *
 * Replace the `url` values below with the organisation's canonical page URLs
 * and the codes will point where they should. Nothing else needs to change.
 */
export const connectLinks = [
  {
    id: 'fb',
    name: 'Facebook',
    caption: 'Follow our updates',
    url: 'https://facebook.com',
  },
  {
    id: 'ig',
    name: 'Instagram',
    caption: 'Photos from our centres',
    url: 'https://instagram.com',
  },
  {
    id: 'yt',
    name: 'YouTube',
    caption: 'Discourses & kirtan',
    url: 'https://youtube.com',
  },
  {
    id: 'store',
    name: 'Madhuram Stores',
    caption: 'Books, media & puja items',
    url: 'https://madhuramstores.com',
  },
];

/** Registered trusts able to receive contributions, with their tax status. */
export const trusts = [
  { name: 'Sri Sandeepani Gurukula Trust', tags: ['80G', 'FCRA'] },
  { name: 'Chaitanya Mahaprabhu Nama Bhiksha Kendra', tags: ['80G'] },
  { name: 'Global Organisation for Divinity India Trust', tags: ['80G', 'FCRA'] },
  { name: 'Mukhya Prana Seva Trust', tags: ['80G'] },
  { name: 'Sri Sandeepani Gurukula Seva Trust, AP', tags: ['80G'] },
  { name: 'Senganoor Kshetra Upasana Samiti', tags: ['80G'] },
  { name: 'Jaya Hanuman Seva Trust', tags: ['FCRA'] },
];

export const contact = {
  office: 'Central Office',
  address: [
    'Plot No 11, Door No 4/11, Netaji Nagar Main Road',
    'Jafferkhanpet, Chennai - 600083, India',
  ],
  phone: ['+91-44-24895875', '+91-7305985875'],
  email: 'contact@namadwaar.org',
};

export const publications = [
  {
    id: 'madhuramurali',
    title: 'Madhuramurali',
    subtitle: 'Monthly journal',
    body: 'Our monthly journal in English and Tamil, spreading the glory of the Divine Name.',
    image: './assets/images/unnamed (67).jpg',
  },
  {
    id: 'stores',
    title: 'Madhuram Stores',
    subtitle: 'Books & media',
    body: 'Books, audio and video recordings, and puja items — available in store and online.',
    image: './assets/images/unnamed (66).jpg',
  },
];
