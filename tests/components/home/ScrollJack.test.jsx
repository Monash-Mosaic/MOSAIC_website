import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@tests/setup/test-utils.jsx';
import ScrollJack from '@/modules/home/components/ScrollJack';

function Fixture() {
  return (
    <>
      <ScrollJack>
        <section data-scroll-section id="top">
          Hero
        </section>
        <section data-scroll-section id="partners">
          Partners
        </section>
        <section data-scroll-section id="projects">
          Projects <a href="#top">Back to top</a>
        </section>
      </ScrollJack>
      <footer>Site footer</footer>
    </>
  );
}

function currentSection() {
  return document.querySelector('[data-scroll-state="current"]');
}

function wheel(deltaY) {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY });
  window.dispatchEvent(event);
  return event;
}

function mockMatchMedia({ desktop = true, reducedMotion = false } = {}) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes('prefers-reduced-motion') ? reducedMotion : desktop,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

const originalMatchMedia = window.matchMedia;

describe('ScrollJack', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState(null, '', '/');
    mockMatchMedia();
  });

  afterEach(() => {
    document.documentElement.classList.remove('home-scroll');
    window.matchMedia = originalMatchMedia;
    vi.useRealTimers();
  });

  it('fills the desktop viewport with one active layered section', () => {
    render(<Fixture />);

    expect(document.documentElement).toHaveClass('home-scroll');
    expect(currentSection()).toHaveAttribute('id', 'top');
    expect(document.getElementById('partners')).toHaveAttribute('data-scroll-state', 'future');
    expect(document.getElementById('partners')).toHaveAttribute('inert');
    expect(document.getElementById('partners')).toHaveStyle({
      '--section-depth': '1',
      '--section-future-y': '102.5%',
    });
    expect(document.getElementById('projects')).toHaveStyle({
      '--section-depth': '2',
      '--section-future-y': '104%',
    });
    expect(document.getElementById('projects').querySelector('footer')).toHaveTextContent(
      'Site footer'
    );
  });

  it('moves exactly one section for a continuous wheel gesture', () => {
    render(<Fixture />);

    expect(wheel(80).defaultPrevented).toBe(true);
    expect(currentSection()).toHaveAttribute('id', 'partners');
    expect(document.getElementById('top')).toHaveAttribute('data-scroll-state', 'past');
    expect(document.getElementById('top')).toHaveStyle({
      '--section-recede-y': '-2.75%',
      '--section-recede-z': '-36px',
      '--section-scale': '0.982',
    });

    wheel(80);
    vi.advanceTimersByTime(1000);
    expect(currentSection()).toHaveAttribute('id', 'partners');

    vi.advanceTimersByTime(200);
    wheel(80);
    expect(currentSection()).toHaveAttribute('id', 'projects');
  });

  it('supports keyboard navigation in both directions', () => {
    render(<Fixture />);

    fireEvent.keyDown(window, { key: 'End' });
    expect(currentSection()).toHaveAttribute('id', 'projects');
    vi.advanceTimersByTime(1000);

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(currentSection()).toHaveAttribute('id', 'partners');
    vi.advanceTimersByTime(1000);

    fireEvent.keyDown(window, { key: 'Home' });
    expect(currentSection()).toHaveAttribute('id', 'top');
  });

  it('uses the layered transition for same-page anchor links', () => {
    render(<Fixture />);

    fireEvent.keyDown(window, { key: 'End' });
    vi.advanceTimersByTime(1000);
    fireEvent.click(screen.getByRole('link', { name: 'Back to top' }));

    expect(currentSection()).toHaveAttribute('id', 'top');
    expect(window.location.hash).toBe('#top');
  });

  it('changes sections immediately when reduced motion is preferred', () => {
    mockMatchMedia({ reducedMotion: true });
    const { container } = render(<Fixture />);

    wheel(80);
    expect(currentSection()).toHaveAttribute('id', 'partners');
    expect(container.querySelector('[data-scroll-stack]')).not.toHaveClass('is-animating');
  });

  it('restores the page and footer on unmount', () => {
    const { unmount } = render(<Fixture />);
    unmount();

    expect(document.documentElement).not.toHaveClass('home-scroll');
    expect(document.querySelector('footer')?.parentElement).not.toBe(
      document.getElementById('projects')
    );
  });
});
