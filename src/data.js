/**
 * The nine institutions, and the single source of truth for the list —
 * InstitutionsHub used to keep its own hardcoded copy alongside this one.
 *
 * `coords` are [longitude, latitude] for the India map pins. They are town
 * centroids rather than surveyed campus positions; each ashram sits within a
 * few kilometres of its town, which is well inside a pin's footprint at this
 * scale. Worth confirming against the trust's own records if precision ever
 * matters.
 */
export const institutionsData = {
  madhurapuri: {
    id: 'madhurapuri',
    coords: [80, 12.82],
    name: 'Madhurapuri Ashram',
    location: 'Maharanyam, Chennai',
    heroImage: './assets/images/unnamed (2).jpg',
    description: 'Madhurapuri Ashram serves as a central hub and living embodiment of the spiritual and social missions described in "In the Path of Love". Located in the serene Maharanyam village on the outskirts of Chennai, the ashram is deeply connected to Vaishnava heritage.',
    tabs: {
      routine: 'At the heart of the ashram is Bhagavata Bhavanam, a satsang hall where devotees chant the Mahamantra incessantly from 6 am to 6 pm every day around the deity Namam Ketkum Perumal.',
      darshan: 'Daily darshan from 6 AM to 6 PM. Continuous chanting in the Bhagavata Bhavanam.',
      festivals: 'Utsavs are celebrated all year round, including Ram Navami, Brahmotsavam, Navaratri, and Vasantotsavam.'
    },
    images: [
      './assets/images/unnamed (3).jpg',
      './assets/images/unnamed (4).jpg',
      './assets/images/unnamed (5).jpg',
      './assets/images/unnamed (8).jpg'
    ]
  },
  kalyanasrinivasa: {
    id: 'kalyanasrinivasa',
    coords: [80, 12.9],
    name: 'Sri Kalyanasrinivasa Perumal Temple',
    location: 'Maharanyam, Chennai',
    heroImage: './assets/images/unnamed (9).jpg',
    description: 'Consecrated by Sri Swamiji on February 17, 2002, the temple is known for a unique miracle: immediately after the consecration, the Perumal deity spontaneously turned toward the North-East.',
    tabs: {
      routine: 'Daily annadhaanam (free food distribution) to those in need under the Sri Sridhar Ayyaval Annadaana Scheme.',
      darshan: 'Regular darshan timings apply. Features the 24-foot tall Kanyakumari Sri Jaya Hanuman.',
      festivals: 'Vaikunta Ekadasi, Vasanta Panchami, and all Vaishnava Ekadasis.'
    },
    images: [
      './assets/images/unnamed (10).jpg',
      './assets/images/unnamed (11).jpg',
      './assets/images/unnamed (12).jpg'
    ]
  },
  govindapuram: {
    id: 'govindapuram',
    coords: [79.37, 10.98],
    name: 'Chaitanya Kuteeram',
    location: 'Govindapuram',
    heroImage: './assets/images/unnamed (13).jpg',
    description: 'A profound tribute to Sri Chaitanya Mahaprabhu and Sri Bhagavannama Bodhendra Saraswathi Swamigal. The presiding deities here are Sri Jagannath, Sri Subhadra, and Sri Balarama.',
    tabs: {
      routine: 'Akhanda Mahamantra chanting every day from 6 am to 6 pm, alongside daily pooja.',
      darshan: 'Daily darshan from 6 AM to 6 PM. Daily annadhaanam is also conducted at Sri Premika Jagannatha Prasada Koodam.',
      festivals: 'Sri Premika Jagannatha Ratha Yatra, Pratishta Day, and Sri Chaitanya Mahaprabhu Jayanti.'
    },
    images: [
      './assets/images/unnamed (14).jpg',
      './assets/images/unnamed (15).jpg',
      './assets/images/unnamed (16).jpg'
    ]
  },
  sundara: {
    id: 'sundara',
    coords: [77.58, 12.93],
    name: 'Sri Sundara Anjaneya Swami Temple',
    location: 'Bengaluru',
    heroImage: './assets/images/unnamed (23).jpg',
    description: 'An exquisite spiritual center with an Oriya-style vimaanam topped with a gold-plated kalasam. The presiding deity, Hanumanji, relieves devotees of navagraha doshams and troubles.',
    tabs: {
      routine: 'The temple functions as a multipurpose hub, housing the Veda Vyasa Purana Patasala and Seetha Rama Hall for traditional learning.',
      darshan: 'Daily Darshan from 7 AM to 12 Noon, and 5 PM to 9 PM.',
      festivals: 'Hanuman Jayanti, Rama Navami, Mahashivaratri, and Dussehra.'
    },
    images: [
      './assets/images/unnamed (24).jpg',
      './assets/images/unnamed (25).jpg',
      './assets/images/unnamed (26).jpg'
    ]
  },
  premika: {
    id: 'premika',
    coords: [77.03, 28.46],
    name: 'Premika Vidya Kendra',
    location: 'Gurugram',
    heroImage: './assets/images/unnamed (20).jpg',
    description: 'A unique spiritual facility functioning as a contemporary museum and temple specifically dedicated to the divine works of Mahatma Sri Sri Krishna Premi Maharaj.',
    tabs: {
      routine: 'Hosts a Sama Veda Patasala operated by the Sri Sandeepani Gurukulam Trust.',
      darshan: 'The presiding deity is Sri Grantha Bhagavan (the personification of the holy texts).',
      festivals: 'Celebrates major utsavs associated with Sri Sri Krishna Premi Maharaj.'
    },
    images: [
      './assets/images/unnamed (42).jpg',
      './assets/images/unnamed (43).jpg'
    ]
  },
  keerthanavali: {
    id: 'keerthanavali',
    coords: [79.7, 12.84],
    name: 'Keerthanavali Mandapam',
    location: 'Kanchipuram',
    heroImage: './assets/images/unnamed (17).jpg',
    description: 'Established as a tribute to Keerthanavali, a divine text authored by Mahatma Sri Sri Krishna Premi Maharaj praising the Divya Desams.',
    tabs: {
      routine: 'Mahamantra kirtan is performed incessantly. Serves as an active center for spreading the Divine Name.',
      darshan: 'Sanctum sanctorum adorned with beautiful moorthis of Sri Krishna and Sri Radha.',
      festivals: 'Regular utsavas and continuous devotional singing.'
    },
    images: [
      './assets/images/unnamed (18).jpg',
      './assets/images/unnamed (19).jpg'
    ]
  },
  janmasthan: {
    id: 'janmasthan',
    coords: [79.15, 10.9],
    name: 'Sri Premika Janmasthan',
    location: 'Senganoor',
    heroImage: './assets/images/unnamed (21).jpg',
    description: 'A sacred spiritual center marking the exact birthplace of Paranur Mahatma Sri Sri Krishna Premi Maharaj, with the Divine moorthis of the Divine Couple consecrated here.',
    tabs: {
      routine: 'Acts as the geographic and spiritual origin point for a wider network revering the Mahatma.',
      darshan: 'Darshan of the Divine Couple. Connected to the Shuddha Premika Vidya Kendra gurukulam.',
      festivals: 'Focuses on the life and teachings of Sri Sri Krishna Premi Maharaj.'
    },
    images: [
      './assets/images/unnamed (22).jpg',
      './assets/images/unnamed (53).jpg'
    ]
  },
  niketan: {
    id: 'niketan',
    coords: [77.69, 27.58],
    name: 'Sri Niketan',
    location: 'Vrindavan',
    heroImage: './assets/images/unnamed (27).jpg',
    description: 'A sacred temple site in the holy town of Vrindavan featuring a beautiful deity, Prema Madhuri sametha Sri Vrindavana Vihari, and Sri Govardhana Giriraj.',
    tabs: {
      routine: 'Daily pooja performed as per Bhagavata Dharma. Proposed site for a comprehensive temple and Veda patasala complex.',
      darshan: 'Darshan every morning (6 AM to 11 AM) and evening (5 PM to 9 PM).',
      festivals: 'Vaishnava Ekadasis, Holi, Janmashtami, and Radhashtami.'
    },
    images: [
      './assets/images/unnamed (28).jpg'
    ]
  },
  vanararajasimhan: {
    id: 'vanararajasimhan',
    coords: [77.56, 11.01],
    name: 'Sri Vanararajasimhan Namadwaar',
    location: 'Kangeyam',
    heroImage: './assets/images/unnamed (33).jpg',
    description: 'A unique Namadwaar where the presiding deity is Hanumanji, denoting the immense glory of the "King of Vanaras".',
    tabs: {
      routine: 'Functions primarily as an active center for continuous Mahamantra chanting.',
      darshan: 'Devotees submit prayers at the sanctum sanctorum for Hanumanji.',
      festivals: 'Organizes social and cultural events for the local community.'
    },
    images: [
      './assets/images/unnamed (32).jpg'
    ]
  }
};
