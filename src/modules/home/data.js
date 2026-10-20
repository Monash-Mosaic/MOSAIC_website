export const heroStats = [
  { value: 5, label: 'Projects' },
  { value: 3, label: 'Partners' },
  { value: 48, label: 'Members' },
];
export const partners = [
  {
    "id": "ifrc",
    "description": "Flagship partner - Digital Projects",
    "logos": [
      {
        "name": "IFRC",
        "src": "/ifrc.png",
        "link": ""
      }
    ]
  },
  {
    "id": "monash-actionlab",
    "description": "Monash University Partner",
    "logos": [
      {
        "name": "Monash University",
        "src": "/monash.png",
        "link": ""
      },
      {
        "name": "ActionLab",
        "src": "/action_lab.png",
        "link": ""
      }
    ]
  },
  {
    "id": "mccsa",
    "description": "Upcoming Digital Project Partner",
    "logos": [
      {
        "name": "MCCSA",
        "src": "/mccsa.png",
        "link": ""
      }
    ]
  }
]

export const projectsIntro = {
  title: 'Projects',
  subtitle: 'Technology for social good. Real projects. Real impact.',
};

export const projects = {
  ctrlAltPrebunk: {
    title: 'Ctrl + Alt + Prebunk',
    theme: 'dark',
    image: '/ctrl_alt_prebunk.webp',
    href: 'https://ctrl-alt-prebunk.wdr26.org/en',
    lines: [
      { text: 'Client: International Federation of Red Cross' },
      { text: 'Presented at PAX Melbourne' },
      { text: 'Training users to spot misinformation on social media' },
    ],
  },
  aiPolicyAgedCare: {
    title: 'AI Policy in Aged Care',
    theme: 'light',
    image: '/aged_care_tactic.png',
    href: '',
    lines: [
      { text: 'Client: Multicultural Communities Council of South Australia' },
      { text: 'Currently in development' },
      { text: 'Addressing AI implementation challenges in Australian Aged Care' },
    ],
  },
  worldDisastersReport: {
    title: 'World Disasters Report Playbook',
    theme: 'dark',
    image: '/wdr26.webp',
    href: 'https://wdr26.org/',
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
    image: '/Disinformer.webp',
    href: 'https://disinformer.wdr26.org/',
    lines: [
      { text: 'Client: International Federation of Red Cross' },
      { text: 'Presented at PAX Melbourne' },
      { text: 'Learn how misinformation spreads in real time' },
    ],
  },
  demystifyingLlms: {
    title: 'Demystifying LLMs',
    theme: 'dark',
    image: '/dem_llm.webp',
    href: '',
    lines: [
      { text: 'Internal AI Engineering Project', emphasis: true },
      { text: 'Educational tool to demystify LLMs and teach safe, effective prompting, in development' },
    ],
  },
};

// riseFrom: how many px below its cell a card starts as the section scrolls in.
// feature sits under the intro in column one. equal cards fill the remaining columns.
export const projectLayout = [
  { id: 'worldDisastersReport', place: 'feature', riseFrom: 60 },
  { id: 'ctrlAltPrebunk', place: 'equal', riseFrom: 60 },
  { id: 'aiPolicyAgedCare', place: 'equal', riseFrom: 120 },
  { id: 'disinformer', place: 'equal', riseFrom: 120 },
  { id: 'demystifyingLlms', place: 'equal', riseFrom: 180 },
];


export const topics = [
  {
    id: 'team-overview',
    label: 'TEAM_OVERVIEW',
    heading: 'FACULTY OF IT BACKED // EST. 2025',
    description:
      'Established in 2025, we’re a team of Monash students backed and funded by the Faculty of IT. We work directly with real-world clients to build and deliver software projects.',
  },
  {
    id: 'capabilities',
    label: 'CAPABILITIES',
    heading: 'FULL-STACK & AI SYSTEMS',
    description: '**Engineering:** End-to-end software delivery - from architecture and UI/UX design to automated testing, deployment, and long-term maintenance. \n\n**Community & Campus:** Event organisers and tech hosts across Monash O-Week, Open Day, and internal technical workshops for the next generation of engineers.',
  },
  {
    id: 'talent-pipeline',
    label: 'TALENT_PIPELINE',
    heading: 'ENGINEERING & ACADEMIC TALENT',
    description: '**Rigorous Selection:** Our team is built through a competitive, multi-stage recruitment process targeting top-tier Monash developers and researchers. \n\n**Specialist Advisory:** Directly guided by Monash Faculty staff, PhD candidates, and AI researchers with real industry leadership backgrounds, giving us instant access to domain expertise when tackling complex architecture.',
  },
  {
    id: 'sponsor-advantage',
    label: 'SPONSOR_ADVANTAGE',
    heading: 'THE PARTNERSHIP VALUE MODEL',
    description: '**[0% AGENCY MARKUP]** Entire budget goes directly into tech development. \n\n**[100% IP RETENTION]** You retain full, unencumbered ownership of all code and intellectual property. \n\n**[TALENT ACCESS]** Direct, first-look recruitment access to Monash’s top engineering graduates. \n\n**[HIGH-IMPACT CSR]** Directly invest in real-world student innovation while delivering production-grade software for social good.',
  },
  {
    id: 'track-record',
    label: 'TRACK_RECORD',
    heading: 'PROVEN DELIVERY',
    description: 'Production software delivered for global leaders including the **International Federation of Red Cross (IFRC)**, with active initiatives underway alongside Australian non-profits like **MCCSA**.',
  },
];