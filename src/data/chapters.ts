export interface Chapter {
  id: number;
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  colorHex: string;
  theme: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: 'arrive',
    label: '01 ARRIVE',
    title: 'Before the teacher, there was the practice.',
    subtitle: 'Grounding · Introduction · Iris',
    color: 'root',
    colorHex: '#5B111E',
    theme: 'Grounding / introduction / Iris',
  },
  {
    id: 2,
    slug: 'move',
    label: '02 MOVE',
    title: 'Movement is the method. Flow is the teacher.',
    subtitle: 'Movement / practice / flow',
    color: 'move',
    colorHex: '#A94718',
    theme: 'Movement / practice / flow',
  },
  {
    id: 3,
    slug: 'rise',
    label: '03 RISE',
    title: 'Authority earned through decades of devotion.',
    subtitle: 'Authority / achievements / recognition',
    color: 'rise',
    colorHex: '#B98227',
    theme: 'Authority / achievements / recognition / professional credibility',
  },
  {
    id: 4,
    slug: 'feel',
    label: '04 FEEL',
    title: 'The heart connects what the mind separates.',
    subtitle: 'Connection / heart / Iris',
    color: 'feel',
    colorHex: '#285248',
    theme: 'Connection / heart / Iris',
  },
  {
    id: 5,
    slug: 'speak',
    label: '05 SPEAK',
    title: 'Voice carries the vibration of lived experience.',
    subtitle: 'Voice / public work / media',
    color: 'speak',
    colorHex: '#18576B',
    theme: 'Voice / public work / media',
  },
  {
    id: 6,
    slug: 'see',
    label: '06 SEE',
    title: 'Perspective shifts when you stop looking outward.',
    subtitle: 'Reflection / philosophy / perspective',
    color: 'see',
    colorHex: '#30245F',
    theme: 'Reflection / philosophy / perspective',
  },
  {
    id: 7,
    slug: 'become',
    label: '07 BECOME',
    title: 'Transformation begins with a single choice.',
    subtitle: 'Transformation / programs / working with Iris',
    color: 'become',
    colorHex: '#67428D',
    theme: 'Transformation / programs / working with Iris',
  },
];

export const PRACTICES = [
  { id: 'hatha', name: 'Hatha Yoga', slug: 'hatha-yoga' },
  { id: 'aerial-yoga', name: 'Aerial Yoga', slug: 'aerial-yoga' },
  { id: 'aerial-pilates', name: 'Aerial Pilates', slug: 'aerial-pilates' },
  { id: 'pranayama', name: 'Pranayama', slug: 'pranayama' },
  { id: 'dhyana', name: 'Dhyana / Meditation', slug: 'dhyana-meditation' },
] as const;

export const PROGRAM_OFFERINGS = [
  {
    id: 'for-you',
    label: 'FOR YOU',
    description: 'Personal practice, sessions, programs and digital offerings.',
    items: [
      { name: 'TURIYA by Iris', description: 'Online group yoga, private sessions, meditation, digital courses' },
      { name: 'Asana Playbook', description: '5-hour digital video course for all levels' },
      { name: '21 Day Meditation Program', description: '21 daily sessions, 10 minutes each' },
    ],
  },
  {
    id: 'for-organisations',
    label: 'FOR ORGANISATIONS',
    description: 'Corporate wellness, workshops, leadership/wellness programs and speaking.',
    items: [
      { name: 'Corporate Yoga', description: 'On-site and virtual sessions for teams' },
      { name: 'Mindfulness & Breathwork', description: 'Workplace stress reduction programs' },
      { name: 'Leadership & Women\'s Wellness', description: 'Executive workshops and speaking' },
    ],
  },
  {
    id: 'for-audiences',
    label: 'FOR AUDIENCES',
    description: 'Speaking, events, retreats, media and collaborations.',
    items: [
      { name: 'Speaking Engagements', description: 'Conferences, summits, corporate events' },
      { name: 'Retreats', description: 'Immersive wellness retreats' },
      { name: 'Media & Collaborations', description: 'Interviews, features, partnerships' },
    ],
  },
] as const;

export const RECOGNITIONS = [
  { year: '2024', title: 'International Day of Yoga', detail: 'Featured appearance' },
  { year: '2023', title: 'TEDx Speaker', detail: 'Yoga for Self Love' },
  { year: '2022', title: 'Tata Play Fitness', detail: 'Yoga for Self Love series' },
  { year: '2021', title: 'Yoga Alliance Certified', detail: 'E-RYT 500' },
] as const;

export const MEDIA_CATEGORIES = ['Videos', 'Interviews', 'Talks', 'Appearances', 'Featured'] as const;