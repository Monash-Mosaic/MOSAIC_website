export const heroStats = [
  { value: 5, label: 'Projects' },
  { value: 3, label: 'Partners' },
  { value: 48, label: 'Members' },
];

export const projectsIntro = {
  title: 'Projects',
  subtitle: 'Technology for social good. Real projects. Real impact.',
};

export const projects = {
  ctrlAltPrebunk: {
    title: 'Ctrl + Alt + Prebunk',
    theme: 'dark',
    image: null,
    href: '/projects',
    lines: [
      { text: 'Client: International Federation of Red Cross' },
      { text: 'Presented at PAX Melbourne' },
      { text: 'Training users to spot misinformation on social media' },
    ],
  },
  aiPolicyAgedCare: {
    title: 'AI Policy in Aged Care',
    theme: 'light',
    image: null,
    href: '/projects',
    lines: [
      { text: 'Client: Multicultural Communities Council of South Australia' },
      { text: 'Currently in development' },
      { text: 'Addressing AI implementation challenges in Australian Aged Care' },
    ],
  },
  worldDisastersReport: {
    title: 'World Disasters Report Playbook',
    theme: 'dark',
    image: null,
    href: '/projects',
    lines: [
      { text: 'Client: International Federation of Red Cross' },
      { text: '6 languages, 20k launch day visits', highlight: true },
      { text: 'Static PDF → Interactive Playbook' },
      { text: 'Low engagement → Data insights' },
      { text: 'One of the largest projects undertaken by any student team at Monash' },
    ],
  },
  disinformer: {
    title: 'Disinformer',
    theme: 'light',
    image: null,
    href: '/projects',
    lines: [
      { text: 'Client: International Federation of Red Cross' },
      { text: 'Presented at PAX Melbourne' },
      { text: 'Learn how misinformation spreads in real time' },
    ],
  },
  demystifyingLlms: {
    title: 'Demystifying LLMs',
    theme: 'dark',
    image: null,
    href: '/projects',
    lines: [
      { text: 'Internal AI Engineering Project', emphasis: true },
      { text: 'Educational tool to demystify LLMs and teach safe, effective prompting, in development' },
    ],
  },
};

export const projectLayout = [
  { id: 'ctrlAltPrebunk', cell: 'md:col-start-2 md:row-start-1' },
  { id: 'aiPolicyAgedCare', cell: 'md:col-start-3 md:row-start-1' },
  { id: 'worldDisastersReport', cell: 'md:col-start-1 md:row-start-2' },
  { id: 'disinformer', cell: 'md:col-start-2 md:row-start-2' },
  { id: 'demystifyingLlms', cell: 'md:col-start-3 md:row-start-2' },
];
