import { render, screen } from '@tests/setup/test-utils.jsx';
import { describe, expect, it, vi } from 'vitest';
import EmailCallout from '@/modules/contact/components/EmailCallout';
import { contactEmail } from '@/modules/contact/data';

describe('EmailCallout', () => {
  it('links to the contact email', () => {
    render(<EmailCallout />);
    expect(screen.getByRole('link', { name: contactEmail })).toHaveAttribute(
      'href',
      `mailto:${contactEmail}`
    );
  });

  it('copies the email when the copy button is clicked', async () => {
    const { user } = render(<EmailCallout />);
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

    await user.click(screen.getByRole('button', { name: 'copy email' }));

    expect(writeText).toHaveBeenCalledWith(contactEmail);
    expect(await screen.findByRole('button', { name: 'copied!' })).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'copy email' }, { timeout: 3000 })
    ).toBeInTheDocument();
  });

  it('scales the email to the available width instead of overflowing', () => {
    render(<EmailCallout />);

    const email = screen.getByRole('link', { name: contactEmail });
    expect(email).toHaveClass(
      'max-w-full',
      'text-[min(8vw,9.6cqi)]',
      'lg:text-[min(6.49vw,9.6cqi)]'
    );
    expect(email.parentElement).toHaveClass('@container', 'w-full', 'min-w-0', 'flex-1');
  });
});
