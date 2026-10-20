import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@tests/setup/test-utils.jsx';

const observerKill = vi.fn();
let observerConfig;
const delayedCalls = [];

vi.mock('gsap/Observer', () => ({
  Observer: {
    create: vi.fn((config) => {
      observerConfig = config;
      return { kill: observerKill };
    }),
  },
}));

vi.mock('gsap', () => {
  const gsap = {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
    killTweensOf: vi.fn(),
    delayedCall: vi.fn((_duration, callback) => {
      delayedCalls.push(callback);
      return { kill: vi.fn() };
    }),
    matchMedia() {
      return {
        add(_query, setup) {
          this.cleanup = setup();
        },
        revert() {
          this.cleanup?.();
        },
      };
    },
  };
  return { default: gsap };
});

vi.mock('@gsap/react', async () => {
  const React = await import('react');
  return {
    useGSAP(callback) {
      React.useLayoutEffect(() => {
        const cleanup = callback();
        return () => cleanup?.();
      }, []);
    },
  };
});

import ScrollJack from '@/modules/home/components/ScrollJack';
import gsap from 'gsap';

function Fixture() {
  return (
    <>
      <ScrollJack>
        <section data-scroll-section id="top">
          <header>
            <a href="#about">About from header</a>
          </header>
          <h1>Hero</h1>
        </section>
        <section data-scroll-section id="partners">
          <h2>Partners</h2>
          <div data-testid="inner-scroll">inner</div>
        </section>
        <section data-scroll-section id="about">
          <h2>About</h2>
          <a href="#top">Back to hero</a>
          <a href="/contact">Contact</a>
          <a href="#missing">Missing</a>
        </section>
      </ScrollJack>
      <footer>Site footer</footer>
    </>
  );
}

function currentSection() {
  return [...document.querySelectorAll('[data-scroll-section]')].find(
    (section) => !section.hasAttribute('inert'),
  );
}

function unlock() {
  delayedCalls.splice(0).forEach((callback) => callback());
}

const originalMatchMedia = window.matchMedia;

describe('ScrollJack', () => {
  beforeEach(() => {
    observerConfig = undefined;
    delayedCalls.length = 0;
    observerKill.mockClear();
    vi.mocked(gsap.to).mockClear();
    vi.mocked(gsap.set).mockClear();
    vi.mocked(gsap.killTweensOf).mockClear();
    window.history.replaceState(null, '', '/');
    window.matchMedia = originalMatchMedia;
  });

  afterEach(() => {
    document.documentElement.classList.remove('home-scroll');
    window.matchMedia = originalMatchMedia;
  });

  it('pins desktop sections and moves the footer onto the last panel', () => {
    render(<Fixture />);

    expect(document.documentElement).toHaveClass('home-scroll');
    expect(currentSection()).toHaveAttribute('id', 'top');
    expect(document.getElementById('about').querySelector('footer')).toHaveTextContent('Site footer');
    expect(observerConfig.type).toBe('wheel,touch');
  });

  it('advances and rewinds with keyboard shortcuts', () => {
    render(<Fixture />);

    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(currentSection()).toHaveAttribute('id', 'partners');
    unlock();

    fireEvent.keyDown(window, { key: 'PageDown' });
    expect(currentSection()).toHaveAttribute('id', 'about');
    unlock();

    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.keyDown(window, { key: 'Home' });
    expect(currentSection()).toHaveAttribute('id', 'top');
    unlock();

    fireEvent.keyDown(window, { key: 'End' });
    expect(currentSection()).toHaveAttribute('id', 'about');
    unlock();

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(currentSection()).toHaveAttribute('id', 'partners');
    unlock();

    fireEvent.keyDown(window, { key: 'PageUp' });
    expect(currentSection()).toHaveAttribute('id', 'top');
    unlock();

    fireEvent.keyDown(window, { key: ' ' });
    expect(currentSection()).toHaveAttribute('id', 'partners');
  });

  it('ignores keys while typing or when modifiers are held', () => {
    render(<Fixture />);
    const field = document.createElement('input');
    document.body.append(field);

    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(currentSection()).toHaveAttribute('id', 'top');

    const button = document.createElement('button');
    document.body.append(button);
    fireEvent.keyDown(button, { key: ' ' });
    expect(currentSection()).toHaveAttribute('id', 'top');

    fireEvent.keyDown(window, { key: 'ArrowDown', metaKey: true });
    expect(currentSection()).toHaveAttribute('id', 'top');

    const editable = document.createElement('div');
    Object.defineProperty(editable, 'isContentEditable', { value: true });
    document.body.append(editable);
    fireEvent.keyDown(editable, { key: 'End' });
    expect(currentSection()).toHaveAttribute('id', 'top');

    const anchor = document.createElement('a');
    document.body.append(anchor);
    fireEvent.keyDown(anchor, { key: ' ' });
    expect(currentSection()).toHaveAttribute('id', 'top');

    fireEvent.keyDown(window, { key: 'End' });
    expect(currentSection()).toHaveAttribute('id', 'about');
    fireEvent.keyDown(window, { key: 'Home' });
    expect(currentSection()).toHaveAttribute('id', 'about');
    unlock();

    field.remove();
    button.remove();
    editable.remove();
    anchor.remove();
  });

  it('intercepts same-page section links and hash changes', () => {
    render(<Fixture />);

    fireEvent.click(screen.getByRole('link', { name: 'Back to hero' }), { button: 0 });
    expect(currentSection()).toHaveAttribute('id', 'top');
    expect(window.location.hash).toBe('#top');
    unlock();

    window.location.hash = '#about';
    fireEvent(window, new Event('hashchange'));
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.click(screen.getByRole('link', { name: 'Missing' }));
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.click(screen.getByRole('link', { name: 'Back to hero' }), { button: 1 });
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.click(screen.getByRole('link', { name: 'Back to hero' }), { button: 0, shiftKey: true });
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.click(screen.getByRole('heading', { name: 'About' }));
    expect(currentSection()).toHaveAttribute('id', 'about');

    window.location.hash = '#missing';
    fireEvent(window, new Event('hashchange'));
    expect(currentSection()).toHaveAttribute('id', 'about');

    fireEvent.keyDown(window, { key: 'Home' });
    window.location.hash = '#about';
    fireEvent(window, new Event('hashchange'));
    expect(currentSection()).toHaveAttribute('id', 'top');
  });

  it('uses the wheel observer unless an inner panel can still scroll', () => {
    render(<Fixture />);
    const cancelableEvent = { cancelable: true, preventDefault: vi.fn(), target: document.body };

    observerConfig.onUp({ event: cancelableEvent });
    expect(currentSection()).toHaveAttribute('id', 'partners');
    expect(cancelableEvent.preventDefault).toHaveBeenCalled();
    observerConfig.onUp({ event: cancelableEvent });
    expect(cancelableEvent.preventDefault).toHaveBeenCalledTimes(2);
    unlock();

    const inner = screen.getByTestId('inner-scroll');
    Object.defineProperty(inner, 'scrollHeight', { configurable: true, value: 400 });
    Object.defineProperty(inner, 'clientHeight', { configurable: true, value: 100 });
    inner.scrollTop = 0;
    const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => ({
      overflowY: element === inner ? 'auto' : 'visible',
      getPropertyValue: () => '',
    }));

    observerConfig.onUp({ event: { cancelable: true, preventDefault: vi.fn(), target: inner } });
    expect(currentSection()).toHaveAttribute('id', 'partners');

    inner.scrollTop = 40;
    styleSpy.mockImplementation((element) => ({
      overflowY: element === inner ? 'overlay' : 'visible',
      getPropertyValue: () => '',
    }));
    observerConfig.onDown({ event: { cancelable: true, preventDefault: vi.fn(), target: inner } });
    expect(currentSection()).toHaveAttribute('id', 'partners');

    inner.scrollTop = 300;
    observerConfig.onUp({ event: { cancelable: true, preventDefault: vi.fn(), target: inner } });
    expect(currentSection()).toHaveAttribute('id', 'about');
    unlock();

    observerConfig.onDown({ event: { cancelable: true, preventDefault: vi.fn(), target: document.body } });
    expect(currentSection()).toHaveAttribute('id', 'partners');
    unlock();

    observerConfig.onUp({
      event: {
        cancelable: true,
        preventDefault: vi.fn(),
        target: document.querySelector('header a'),
      },
    });
    expect(currentSection()).toHaveAttribute('id', 'about');
    styleSpy.mockRestore();
  });

  it('skips motion and restores the footer when unmounted', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = render(<Fixture />);
    fireEvent.keyDown(window, { key: 'End' });
    expect(currentSection()).toHaveAttribute('id', 'about');
    expect(delayedCalls).toHaveLength(0);

    unmount();
    expect(observerKill).toHaveBeenCalled();
    expect(gsap.killTweensOf).toHaveBeenCalled();
    expect(gsap.set).toHaveBeenCalled();
    expect(document.documentElement).not.toHaveClass('home-scroll');
  });
});
