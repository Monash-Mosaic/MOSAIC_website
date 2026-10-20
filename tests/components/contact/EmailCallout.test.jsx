import { describe, expect, it } from 'vitest';
import EmailCallout from '@/modules/contact/components/EmailCallout';
import { contactEmail } from '@/modules/contact/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

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
  });
});
