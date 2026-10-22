import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';
import SmoothScroll from '@/components/SmoothScroll';
import { mockUsePathname } from '@tests/setup/next-mocks';
import { render } from '@tests/setup/test-utils.jsx';

vi.mock('lenis', () => ({
  default: vi.fn(
    class {
      raf = vi.fn();
      destroy = vi.fn();
    },
  ),
}));

describe('SmoothScroll', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/contact');
    vi.mocked(Lenis).mockClear();
    vi.mocked(frame.update).mockClear();
    vi.mocked(cancelFrame).mockClear();
  });

  afterEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('leaves Lenis off when the home page owns the scroll gestures', () => {
    mockUsePathname.mockReturnValue('/');
    render(<SmoothScroll />);

    expect(Lenis).not.toHaveBeenCalled();
    expect(frame.update).not.toHaveBeenCalled();
  });

  it('renders nothing into the page', () => {
    const { container } = render(<SmoothScroll />);

    expect(container).toBeEmptyDOMElement();
  });

  it("drives Lenis from framer-motion's frame loop instead of its own", () => {
    render(<SmoothScroll />);

    expect(Lenis).toHaveBeenCalledExactlyOnceWith({ autoRaf: false, anchors: true });
    expect(frame.update).toHaveBeenCalledExactlyOnceWith(expect.any(Function), true);

    const [update] = vi.mocked(frame.update).mock.calls[0];
    update({ timestamp: 1234 });

    expect(vi.mocked(Lenis).mock.instances[0].raf).toHaveBeenCalledWith(1234);
  });

  it('stops the frame loop and tears Lenis down on unmount', () => {
    const { unmount } = render(<SmoothScroll />);
    const [update] = vi.mocked(frame.update).mock.calls[0];
    const lenis = vi.mocked(Lenis).mock.instances[0];

    unmount();

    expect(cancelFrame).toHaveBeenCalledWith(update);
    expect(lenis.destroy).toHaveBeenCalledOnce();
  });
});
