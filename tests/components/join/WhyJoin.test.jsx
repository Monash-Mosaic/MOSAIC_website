import { describe, expect, it } from 'vitest';
import WhyJoin from '@/modules/join/components/WhyJoin';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('WhyJoin', () => {
  it('explains why people should join MOSAIC', () => {
    render(<WhyJoin />);
    expect(screen.getByRole('heading', { name: 'Why should you join us?' })).toBeInTheDocument();
    expect(screen.getByText(/apply your skills in AI, design, and IT/)).toBeInTheDocument();
  });
});
