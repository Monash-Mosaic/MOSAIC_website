export const rawProjects = [
  {
    id: 'hub',
    name: 'Community Hub',
    subtitle: 'Connect clubs',
    description: 'A sample community project.',
    image: 'https://drive.google.com/file/d/abcdefghij1234567890/view',
    link: 'https://example.com/hub',
  },
  {
    id: 'tools',
    name: 'Scalable Tools',
    subtitle: '',
    description: 'Shared utilities.',
    image: '/ScalableSolutions.svg',
    link: 'PENDING_APPROVAL',
  },
];

export const normalizedProjects = [
  {
    id: 'hub',
    title: 'Community Hub',
    subtitle: 'Connect clubs',
    previewTitle: 'Community Hub: Connect clubs',
    description: 'A sample community project.',
    image: '/api/projects/images/abcdefghij1234567890',
    link: 'https://example.com/hub',
    imageAlign: 'left',
    delay: 0,
    bgColor: '#ffffffff',
    textColor: 'black',
    buttonColor: '#213359',
    buttonTextColor: 'white',
  },
  {
    id: 'tools',
    title: 'Scalable Tools',
    subtitle: '',
    previewTitle: 'Scalable Tools',
    description: 'Shared utilities.',
    image: '/ScalableSolutions.svg',
    link: null,
    imageAlign: 'right',
    delay: 0.12,
    bgColor: '#C8D1F0',
    textColor: '#213359',
    buttonColor: '#213359',
    buttonTextColor: 'white',
  },
];

export const appsScriptPayload = {
  success: true,
  projects: rawProjects,
};
