const AI_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSd5eENRJZx4EMC4h5gPppLPVUM1r_zes4OOlWSDAEY7Mu2kpw/viewform?usp=publish-editor';
const UI_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSdRil9Rm2Fpr1XhBJ0xfv4ieZUlyMFNkAMAtlNrsn_l-fACHw/viewform?usp=publish-editor';
const DEV_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSdRil9Rm2Fpr1XhBJ0xfv4ieZUlyMFNkAMAtlNrsn_l-fACHw/viewform?usp=publish-editor';
const MARKETING_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSf9zHzxGf4BKamx-X1BYiaulIZIX8Swq3b-NMZuR52cRQvnKQ/viewform?usp=dialog';
const DESIGN_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdk3tEyrqJaffKbWh0vsNmt3rAnD-lObohOpRRPXOuKAH7zYg/viewform?usp=publish-editor';
export const projectRoles = [
  {
    formPath: AI_FORM,
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Build and deploy AI models to solve real-world problems in our community projects.',
  },
  {
    formPath: DEV_FORM,
    id: 'mobile-app-dev',
    title: 'Mobile App Developer',
    description:
      'Design and build cross-platform mobile apps using Flutter, integrating APIs and managing app state effectively.',
  },
  {
    formPath: DEV_FORM,
    id: 'full-stack-dev',
    title: 'Full-Stack Web Developer',
    description:
      'Develop web applications using Python or JavaScript frameworks, with opportunities to explore cloud platforms, databases, and AI integration tools.',
  },
  {
    formPath: UI_FORM,
    id: 'ui-designer',
    title: 'UI/UX Designer',
    description:
      'Craft intuitive, accessible, and visually engaging designs that enhance user experience across our digital platforms.',
  },
];

export const committeeRoles = [
  {
    formPath: MARKETING_FORM,
    id: 'marketing-officer',
    title: 'Marketing Officer',
    description:
      'Promote our work through both online and offline channels, create engaging content, and strengthen our overall presence.',
  },
  {
    formPath: DESIGN_FORM,
    id: 'design-officer',
    title: 'Design Officer',
    description: 'Create visuals, graphics, and materials that reflect our identity and values.',
  },
];

export const recruitmentSteps = [
  {
    step: 1,
    title: 'Apply Online',
    description: "Submit the form to choose the team(s) you're interested in.",
    delay: 0.6,
  },
  {
    step: 2,
    title: 'Interview',
    description: 'Chat with a MOSAIC executive about your interests and how you can contribute.',
    delay: 0.8,
  },
  {
    step: 3,
    title: 'Trial Period',
    description: 'Join us for a few weeks to see where you fit best.',
    delay: 1.0,
  },
];
