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
    expect(screen.getAllByRole('link', { name: 'MOSAIC logo' })).toHaveLength(2);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Page body').parentElement).toHaveClass('pt-24');
  });

  it('can render as a main landmark without the header offset', () => {
    render(
      <PageLayout as="main" offsetHeader={false} className="bg-white">
        <p>Flush body</p>
      </PageLayout>,
    );

    const main = screen.getByRole('main');
    expect(main).toHaveClass('bg-white');
    expect(main).not.toHaveClass('pt-24');
    expect(screen.getByText('Flush body')).toBeInTheDocument();
  });
});
