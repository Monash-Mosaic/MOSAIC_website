import { describe, expect, it, vi } from 'vitest';
import HomePage from '@/modules/home';
import ContactPage from '@/modules/contact';
import JoinPage from '@/modules/join';
import ProjectsPage from '@/modules/projects';
import { render, screen } from '@tests/setup/test-utils.jsx';

vi.mock('@/modules/projects/useProjects', () => ({
  default: () => ({
    projects: [
      {
        id: 'hub',
        title: 'Community Hub',
        subtitle: 'Connect clubs',
        description: 'A sample community project.',
        image: '/CommunityDrivenProjects.svg',
        link: 'https://example.com/hub',
        imageAlign: 'left',
        bgColor: '#ffffffff',
        textColor: 'black',
        buttonColor: '#213359',
        buttonTextColor: 'white',
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe('site pages', () => {
  it('assembles the redesigned home page', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    render(<HomePage />);
    HTMLCanvasElement.prototype.getContext = originalGetContext;

    const main = screen.getByRole('main');
    expect(main).not.toHaveClass('pt-24');
    expect(screen.getByRole('heading', { name: /Building Production-Ready Software/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Partnerships', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Who we are', hidden: true })).toBeInTheDocument();
    expect(screen.getAllByRole('contentinfo').length).toBeGreaterThan(0);
  });

  it('assembles the contact page around the inquiry form', () => {
    render(<ContactPage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Octopus' })).toHaveAttribute('src', '/Octopus_icon_3.png');
    expect(screen.getByRole('heading', { name: /love to hear from you/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('lets a visitor expand one join role at a time', async () => {
    const { user } = render(<JoinPage />);

    expect(screen.getByRole('heading', { name: 'Why should you join us?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Recruitment Process' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Project Roles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Committee Roles' })).toBeInTheDocument();

    await user.click(screen.getByText('AI Engineer'));
    expect(screen.getByRole('link', { name: 'Apply now' })).toBeInTheDocument();

    await user.click(screen.getByText('Marketing Officer'));
    expect(screen.getAllByRole('link', { name: 'Apply now' })).toHaveLength(1);
    expect(screen.queryByText(/Build and deploy AI models/)).not.toBeInTheDocument();

    await user.click(screen.getByText('Marketing Officer'));
    expect(screen.queryByRole('link', { name: 'Apply now' })).not.toBeInTheDocument();
  });

  it('renders the projects page from the loaded catalogue', () => {
    render(<ProjectsPage />);

    expect(screen.getByRole('heading', { name: 'Project 1: Community Hub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', 'https://example.com/hub');
  });
});
