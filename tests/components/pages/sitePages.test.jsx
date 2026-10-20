import { describe, expect, it } from 'vitest';
import HomePage from '@/modules/home';
import ContactPage from '@/modules/contact';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('site pages', () => {
  it('assembles the redesigned home page', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    render(<HomePage />);
    HTMLCanvasElement.prototype.getContext = originalGetContext;

    const main = screen.getByRole('main');
    expect(main).not.toHaveClass('pt-24');
    expect(main).toHaveClass('text-white');
    expect(screen.getByRole('banner').parentElement.parentElement).toHaveClass('text-ink');
    expect(screen.getByRole('heading', { name: /Building Production-Ready Software/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Partnerships', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Who we are', hidden: true })).toBeInTheDocument();
    expect(screen.getAllByRole('contentinfo').length).toBeGreaterThan(0);
  });

  it('assembles the contact page around the email and makerspace address', () => {
    render(<ContactPage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shoot us an email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mosaic@monash.edu' })).toHaveAttribute(
      'href',
      'mailto:mosaic@monash.edu'
    );
    expect(screen.getByRole('button', { name: 'copy email' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Makerspace Address' })).toBeInTheDocument();

    const email = screen.getByRole('link', { name: 'mosaic@monash.edu' });
    expect(email.parentElement).toHaveClass('@container', 'min-w-0', 'flex-1');
    expect(email.parentElement.parentElement).toHaveClass('min-w-0');
  });
});
