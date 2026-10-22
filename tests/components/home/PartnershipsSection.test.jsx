import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/home/data', async () => {
  const actual = await vi.importActual('@/modules/home/data');
  return {
    ...actual,
    partners: [
      ...actual.partners,
      {
        id: 'overflow',
        description: 'Additional partner',
        logos: [{ name: 'Overflow Lab', src: '/overflow.png', link: 'https://overflow.example' }],
      },
    ],
  };
});

import { render, screen } from '@tests/setup/test-utils.jsx';
import PartnershipsSection from '@/modules/home/components/PartnershipsSection';
import { partners } from '@/modules/home/data';

function installCanvas() {
  const ctx = {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    arc: vi.fn(),
    fillStyle: '',
  };
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ctx);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 320,
    height: 180,
    top: 0,
    left: 0,
    right: 320,
    bottom: 180,
    x: 0,
    y: 0,
    toJSON() {},
  });
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 3 });
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    callback();
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        this.callback();
      }
      disconnect = vi.fn();
    }
  );
  return ctx;
}

const originalGetContext = HTMLCanvasElement.prototype.getContext;

describe('PartnershipsSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    vi.unstubAllGlobals();
  });

  it('shows partner logos, descriptions, and the scroll cue', () => {
    const ctx = installCanvas();
    const { unmount } = render(<PartnershipsSection />);

    expect(screen.getByRole('heading', { name: 'Partnerships' })).toBeInTheDocument();
    expect(
      screen.getByText('Building high-stakes software alongside global leaders and research labs.')
    ).toBeInTheDocument();
    expect(document.getElementById('partners')).toBeInTheDocument();

    for (const partner of partners) {
      expect(screen.getByText(partner.description)).toBeInTheDocument();
      for (const logo of partner.logos) {
        const logoLink = document.querySelector(`a[aria-label="Visit ${logo.name}"]`);
        expect(logoLink).toHaveAttribute('href', logo.link);
        expect(logoLink.querySelector('img')).toHaveAttribute('src', logo.src);
      }
    }

    expect(screen.getByRole('link', { name: /scroll to projects/i })).toHaveAttribute(
      'href',
      '#projects'
    );
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
    unmount();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('skips the particle field when the canvas has no drawing context', () => {
    HTMLCanvasElement.prototype.getContext = () => null;
    render(<PartnershipsSection />);
    expect(screen.getByRole('heading', { name: 'Partnerships' })).toBeInTheDocument();
  });

  it('draws the denser desktop particle field', () => {
    const ctx = installCanvas();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 1280,
      height: 800,
      top: 0,
      left: 0,
      right: 1280,
      bottom: 800,
      x: 0,
      y: 0,
      toJSON() {},
    });
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
    render(<PartnershipsSection />);
    expect(ctx.arc.mock.calls.length).toBeGreaterThan(3000);
  });

  it('falls back to a 1x device pixel ratio when the browser omits it', () => {
    const ctx = installCanvas();
    Object.defineProperty(window, 'devicePixelRatio', {
      configurable: true,
      get: () => undefined,
    });
    render(<PartnershipsSection />);
    expect(ctx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  });

  it('skips drawing when the canvas has no parent section', () => {
    const ctx = installCanvas();
    const parentDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'parentElement');
    Object.defineProperty(HTMLCanvasElement.prototype, 'parentElement', {
      configurable: true,
      get() {
        return null;
      },
    });

    render(<PartnershipsSection />);
    expect(screen.getByRole('heading', { name: 'Partnerships' })).toBeInTheDocument();
    expect(ctx.arc).not.toHaveBeenCalled();

    if (parentDescriptor) {
      Object.defineProperty(Node.prototype, 'parentElement', parentDescriptor);
    } else {
      delete HTMLCanvasElement.prototype.parentElement;
    }
  });
});
