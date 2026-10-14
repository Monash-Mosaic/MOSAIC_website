import { describe, expect, it } from 'vitest';
import WhoWeAreSection from '@/modules/home/components/WhoWeAreSection';
import { fireEvent, render, screen } from '@tests/setup/test-utils.jsx';

describe('WhoWeAreSection', () => {
  it('renders Team Overview as the default panel', () => {
    render(<WhoWeAreSection />);

    expect(screen.getByRole('heading', { name: 'Who we are' })).toBeInTheDocument();
    expect(screen.getByText('Engineering for community resilience and global equity')).toBeInTheDocument();
    const section = document.getElementById('about');
    expect(section.className).toContain('bg-white');
    expect(section.firstElementChild.style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(section.firstElementChild.style.backgroundImage).toContain('who-we-are-texture.svg');
    expect(screen.getByRole('button', { name: '[00] TEAM_OVERVIEW' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('[04] TRACK_RECORD')).toBeInTheDocument();
    expect(screen.getByText('FACULTY OF IT BACKED // EST. 2025')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Established in 2025, we’re a team of Monash students backed and funded by the Faculty of IT. We work directly with real-world clients to build and deliver software projects.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact us/i })).toHaveAttribute('aria-pressed', 'false');
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('switches to the contact panel when the partnership option is selected', () => {
    render(<WhoWeAreSection />);

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    expect(screen.getByRole('button', { name: /contact us/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('EXECUTE_PARTNERSHIP.EXE [SUCCESS]')).toBeInTheDocument();
    expect(screen.getByText('Alan Finkel Building for Technology, Monash Clayton')).toBeInTheDocument();
    expect(screen.getByText('mosaic@monash.edu')).toHaveAttribute('href', 'mailto:mosaic@monash.edu');
    expect(screen.getByRole('link', { name: '[ OPEN MAIL CLIENT ]' })).toHaveAttribute(
      'href',
      'mailto:mosaic@monash.edu',
    );
  });

  it('shows copy feedback when the email action is used', async () => {
    render(<WhoWeAreSection />);

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));
    fireEvent.click(screen.getByRole('button', { name: '[ CLICK TO COPY EMAIL ]' }));

    expect(await screen.findByRole('button', { name: '[ EMAIL COPIED ]' })).toBeInTheDocument();
  });

  it('renders bold phrases inside a topic description', () => {
    render(<WhoWeAreSection />);

    fireEvent.click(screen.getByRole('button', { name: '[01] CAPABILITIES' }));

    expect(screen.getByRole('button', { name: '[01] CAPABILITIES' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Engineering:').tagName).toBe('STRONG');
    expect(screen.getByText('FULL-STACK & AI SYSTEMS')).toBeInTheDocument();
  });

  it('reports a failed copy when the clipboard is unavailable or rejects', async () => {
    const writeText = navigator.clipboard.writeText.bind(navigator.clipboard);
    navigator.clipboard.writeText = undefined;
    render(<WhoWeAreSection />);
    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));
    fireEvent.click(screen.getByRole('button', { name: '[ CLICK TO COPY EMAIL ]' }));
    expect(screen.getByRole('button', { name: '[ COPY FAILED ]' })).toBeInTheDocument();

    navigator.clipboard.writeText = () => Promise.reject(new Error('denied'));
    fireEvent.click(screen.getByRole('button', { name: '[ COPY FAILED ]' }));
    expect(await screen.findByRole('button', { name: '[ COPY FAILED ]' })).toBeInTheDocument();
    navigator.clipboard.writeText = writeText;
  });

  it('links back to the top of the page', () => {
    render(<WhoWeAreSection />);

    expect(screen.getByRole('link', { name: /scroll to top/i })).toHaveAttribute('href', '#top');
  });
});
