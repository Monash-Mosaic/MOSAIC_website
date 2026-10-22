import { fireEvent, render, screen } from '@tests/setup/test-utils.jsx';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ScrollJack from '@/modules/home/components/ScrollJack';

function Fixture({ nestedTarget = false } = {}) {
  return (
    <>
      <ScrollJack>
        <section data-scroll-section id="top">
          Hero
          {nestedTarget ? <div id="nested-anchor">Nested</div> : null}
          <a href="#partners">Go partners</a>
          <a href="#missing">Missing</a>
          <a href="https://example.com/out">External</a>
          <a href="/contact">Other page</a>
          <a href="/other#partners">Other path hash</a>
          <button type="button">Action</button>
        </section>
        <section data-scroll-section id="partners">
          <div data-testid="inner-scroll" style={{ overflowY: 'auto', height: '40px' }}>
            <div style={{ height: '200px' }}>Partners content</div>
          </div>
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

function wheel(deltaY, target = window) {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY });
  target.dispatchEvent(event);
  return event;
}

function mockMatchMedia({ desktop = true, reducedMotion = false } = {}) {
  const queries = new Map();

  window.matchMedia = vi.fn().mockImplementation((query) => {
    if (queries.has(query)) return queries.get(query);

    const reduced = query.includes('prefers-reduced-motion');
    const listeners = new Set();
    const mql = {
      matches: reduced ? reducedMotion : desktop,
      media: query,
      addEventListener: vi.fn((_event, handler) => listeners.add(handler)),
      removeEventListener: vi.fn((_event, handler) => listeners.delete(handler)),
      dispatchChange(matches) {
        mql.matches = matches;
        listeners.forEach((handler) => {
          handler({ matches });
        });
      },
    };
    queries.set(query, mql);
    return mql;
  });

  return {
    getDesktop: () => queries.get('(min-width: 768px)'),
  };
}

function makeScrollable(
  element,
  { scrollTop = 0, clientHeight = 40, scrollHeight = 200, overflowY = 'auto' } = {}
) {
  let top = scrollTop;
  Object.defineProperty(element, 'scrollTop', {
    configurable: true,
    get: () => top,
    set: (value) => {
      top = value;
    },
  });
  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    get: () => clientHeight,
  });
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    get: () => scrollHeight,
  });
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) => {
    if (node === element) {
      return { overflowY };
    }
    return { overflowY: 'visible' };
  });
  return element;
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
    vi.restoreAllMocks();
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

    // Trackpad inertia in the same gesture must not skip through the stack.
    wheel(80);
    wheel(80);
    expect(currentSection()).toHaveAttribute('id', 'partners');

    // A short quiet gap ends the gesture; the next flick advances one section.
    vi.advanceTimersByTime(280);
    wheel(80);
    expect(currentSection()).toHaveAttribute('id', 'projects');
  });

  it('ignores wheel gestures below the movement threshold and non-cancelable wheels', () => {
    render(<Fixture />);

    wheel(10);
    expect(currentSection()).toHaveAttribute('id', 'top');

    const nonCancelable = new WheelEvent('wheel', { bubbles: true, cancelable: false, deltaY: 80 });
    window.dispatchEvent(nonCancelable);
    expect(currentSection()).toHaveAttribute('id', 'partners');

    vi.advanceTimersByTime(280);
    wheel(-80);
    expect(currentSection()).toHaveAttribute('id', 'top');
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

  it('skips keyboard shortcuts while typing, editing, or holding modifiers', () => {
    render(<Fixture />);

    const input = document.createElement('input');
    const editable = document.createElement('div');
    Object.defineProperty(editable, 'isContentEditable', { value: true });
    document.body.append(input, editable);

    try {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(editable, { key: 'ArrowDown' });
      fireEvent.keyDown(window, { key: 'ArrowDown', metaKey: true });
      fireEvent.keyDown(window, { key: 'ArrowDown', ctrlKey: true });
      fireEvent.keyDown(window, { key: 'ArrowDown', altKey: true });
      fireEvent.keyDown(screen.getByRole('button', { name: 'Action' }), { key: ' ' });
      fireEvent.keyDown(screen.getByRole('link', { name: 'Go partners' }), { key: ' ' });
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(currentSection()).toHaveAttribute('id', 'top');

      fireEvent.keyDown(window, { key: 'ArrowDown' });
      fireEvent.keyDown(window, { key: 'Home' });
      expect(currentSection()).toHaveAttribute('id', 'partners');
    } finally {
      input.remove();
      editable.remove();
    }
  });

  it('uses the layered transition for same-page anchor links', () => {
    render(<Fixture />);

    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }));
    expect(currentSection()).toHaveAttribute('id', 'partners');
    expect(window.location.hash).toBe('#partners');

    vi.advanceTimersByTime(1000);
    fireEvent.keyDown(window, { key: 'End' });
    vi.advanceTimersByTime(1000);
    fireEvent.click(screen.getByRole('link', { name: 'Back to top' }));

    expect(currentSection()).toHaveAttribute('id', 'top');
    expect(window.location.hash).toBe('#top');
  });

  it('ignores modified clicks and non-section links', () => {
    render(<Fixture />);

    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }), { button: 1 });
    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }), { metaKey: true });
    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }), { ctrlKey: true });
    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }), { shiftKey: true });
    fireEvent.click(screen.getByRole('link', { name: 'Go partners' }), { altKey: true });
    fireEvent.click(screen.getByRole('button', { name: 'Action' }));
    fireEvent.click(screen.getByRole('link', { name: 'External' }));
    fireEvent.click(screen.getByRole('link', { name: 'Other page' }));
    fireEvent.click(screen.getByRole('link', { name: 'Other path hash' }));
    fireEvent.click(screen.getByRole('link', { name: 'Missing' }));

    expect(currentSection()).toHaveAttribute('id', 'top');
  });

  it('resolves nested hash targets and history changes', () => {
    window.history.replaceState(null, '', '/#does-not-exist');
    render(<Fixture nestedTarget />);
    expect(currentSection()).toHaveAttribute('id', 'top');

    window.history.replaceState(null, '', '/#nested-anchor');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(currentSection()).toHaveAttribute('id', 'top');

    window.history.replaceState(null, '', '/#projects');
    window.dispatchEvent(new PopStateEvent('popstate'));
    expect(currentSection()).toHaveAttribute('id', 'projects');

    window.history.replaceState(null, '', '/#missing');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(currentSection()).toHaveAttribute('id', 'projects');
  });

  it('lets nested scroll containers handle wheel and touch until exhausted', () => {
    render(<Fixture />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    vi.advanceTimersByTime(1000);

    const inner = makeScrollable(screen.getByTestId('inner-scroll'), {
      scrollTop: 0,
      overflowY: 'scroll',
    });
    expect(wheel(80, inner).defaultPrevented).toBe(false);
    expect(currentSection()).toHaveAttribute('id', 'partners');

    fireEvent.touchStart(inner, { touches: [{ clientY: 200 }] });
    fireEvent.touchMove(inner, { touches: [{ clientY: 120 }], cancelable: true });
    expect(currentSection()).toHaveAttribute('id', 'partners');

    Object.defineProperty(inner, 'scrollTop', {
      configurable: true,
      get: () => 200,
      set: () => {},
    });
    vi.advanceTimersByTime(200);
    expect(wheel(80, inner).defaultPrevented).toBe(true);
    expect(currentSection()).toHaveAttribute('id', 'projects');

    vi.advanceTimersByTime(1200);
    makeScrollable(inner, { scrollTop: 5, overflowY: 'overlay' });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    vi.advanceTimersByTime(1000);
    expect(wheel(-80, inner).defaultPrevented).toBe(false);
    expect(currentSection()).toHaveAttribute('id', 'partners');
  });

  it('advances sections from touch gestures', () => {
    render(<Fixture />);

    fireEvent.touchStart(window, { touches: [{ clientY: 200 }] });
    fireEvent.touchMove(window, { touches: [{ clientY: 180 }], cancelable: true });
    expect(currentSection()).toHaveAttribute('id', 'top');

    fireEvent.touchMove(window, { touches: [{ clientY: 140 }], cancelable: true });
    expect(currentSection()).toHaveAttribute('id', 'partners');

    vi.advanceTimersByTime(1000);
    fireEvent.touchStart(window, { touches: [] });
    fireEvent.touchStart(window, { touches: [{ clientY: 220 }] });
    fireEvent.touchMove(window, { touches: [{ clientY: 140 }], cancelable: false });
    expect(currentSection()).toHaveAttribute('id', 'projects');

    vi.advanceTimersByTime(1000);
    fireEvent.touchStart(window, { touches: [{ clientY: 120 }] });
    fireEvent.touchMove(window, { touches: [{ clientY: 200 }], cancelable: true });
    expect(currentSection()).toHaveAttribute('id', 'partners');
  });

  it('changes sections immediately when reduced motion is preferred', () => {
    mockMatchMedia({ reducedMotion: true });
    const { container } = render(<Fixture />);

    wheel(80);
    expect(currentSection()).toHaveAttribute('id', 'partners');
    expect(container.querySelector('[data-scroll-stack]')).not.toHaveClass('is-animating');
  });

  it('disables on mobile and re-enables when the viewport becomes desktop', () => {
    const media = mockMatchMedia({ desktop: false });
    render(<Fixture />);

    expect(document.documentElement).not.toHaveClass('home-scroll');
    expect(document.querySelector('[data-scroll-state]')).toBeNull();

    media.getDesktop().dispatchChange(true);
    expect(document.documentElement).toHaveClass('home-scroll');
    expect(currentSection()).toHaveAttribute('id', 'top');

    media.getDesktop().dispatchChange(false);
    expect(document.documentElement).not.toHaveClass('home-scroll');
  });

  it('leaves an already attached footer in place', () => {
    const { unmount } = render(
      <ScrollJack>
        <section data-scroll-section id="only">
          Only
          <footer>Embedded footer</footer>
        </section>
      </ScrollJack>
    );

    expect(document.querySelector('#only footer')).toHaveTextContent('Embedded footer');
    unmount();
    expect(document.querySelector('footer')).toBeNull();
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
