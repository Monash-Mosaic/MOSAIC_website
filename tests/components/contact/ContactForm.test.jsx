import { describe, expect, it } from 'vitest';
import ContactForm from '@/modules/contact/components/ContactForm';
import { contactFormValues } from '@tests/fixtures/contact.js';
import { render, screen, waitFor } from '@tests/setup/test-utils.jsx';

describe('ContactForm', () => {
  it('submits the form payload and shows a success message', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const { user } = render(<ContactForm />);

    await user.type(screen.getByPlaceholderText('Type your name here'), contactFormValues.Name);
    await user.type(screen.getByPlaceholderText('abc@gmail.com'), contactFormValues.Email);
    await user.selectOptions(screen.getByRole('combobox'), contactFormValues.InquiryType);
    await user.type(screen.getByPlaceholderText('Type your message here'), contactFormValues.Message);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Thank you! Your message has been sent.')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/proxy-contact',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(contactFormValues),
      }),
    );
    expect(screen.getByPlaceholderText('Type your name here')).toHaveValue('');

    vi.unstubAllGlobals();
  });

  it('shows an error when the proxy fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));

    const { user } = render(<ContactForm />);
    await user.type(screen.getByPlaceholderText('Type your name here'), 'Ada');
    await user.type(screen.getByPlaceholderText('abc@gmail.com'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('Type your message here'), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
