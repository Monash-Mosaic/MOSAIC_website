import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useScroll, useTransform } from 'framer-motion';
import { ParallaxLayer, ParallaxSection } from '@/components/Parallax';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Parallax', () => {
  beforeEach(() => {
    vi.mocked(useScroll).mockClear();
    vi.mocked(useTransform).mockClear();
  });

  it('tracks the section element through the viewport by default', () => {
    render(
      <ParallaxSection id="intro" className="relative">
        <p>Section body</p>
      </ParallaxSection>,
    );

    const section = document.getElementById('intro');
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('relative');
    expect(screen.getByText('Section body')).toBeInTheDocument();
    expect(useScroll).toHaveBeenLastCalledWith({
      target: { current: section },
      offset: ['start end', 'end start'],
    });
  });

  it('renders as another element with a custom offset', () => {
    render(
      <ParallaxSection as="div" id="hero" offset={['start start', 'end start']}>
        <p>Hero</p>
      </ParallaxSection>,
    );

    expect(document.getElementById('hero').tagName).toBe('DIV');
    expect(useScroll).toHaveBeenLastCalledWith(
      expect.objectContaining({ offset: ['start start', 'end start'] }),
    );
  });

  it('maps section progress onto the layer range and keeps its own props', () => {
    render(
      <ParallaxSection>
        <ParallaxLayer y={[64, -64]} className="absolute" aria-hidden="true" style={{ color: 'red' }}>
          <p>Layer content</p>
        </ParallaxLayer>
      </ParallaxSection>,
    );

    const layer = screen.getByText('Layer content').parentElement;
    // 0 is the mocked section's scrollYProgress, handed down through context
    expect(useTransform).toHaveBeenLastCalledWith(0, [0, 1], [64, -64]);
    expect(layer).toHaveClass('absolute');
    expect(layer).toHaveAttribute('aria-hidden', 'true');
    expect(layer.style.color).toBe('red');
  });

  it('holds still for users who prefer reduced motion', () => {
    render(
      <ParallaxSection>
        <ParallaxLayer y={[0, 100]}>
          <p>Layer content</p>
        </ParallaxLayer>
      </ParallaxSection>,
    );

    expect(screen.getByText('Layer content').parentElement).toHaveClass('motion-reduce:transform-none!');
  });
});
