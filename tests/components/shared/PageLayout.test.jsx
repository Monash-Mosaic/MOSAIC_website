import { describe, expect, it } from 'vitest';
import PageLayout from '@/components/PageLayout';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('PageLayout', () => {
  it('wraps page content with navigation and footer', () => {
    render(
      <PageLayout>
        <p>Page body</p>
      </PageLayout>,
    );

    expect(screen.getByText('Page body')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'MOSAIC logo' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
