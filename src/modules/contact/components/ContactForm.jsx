'use client';

import { useState } from 'react';

const INITIAL_FORM = {
  Name: '',
  Email: '',
  InquiryType: 'General',
  Message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/proxy-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) {
        setForm(INITIAL_FORM);
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full min-w-0 rounded-lg border-2 bg-gray-100 p-3 text-base text-[#213359] focus:ring-2 focus:ring-lime-400 focus:outline-none md:text-xl';

  return (
    <form className="flex max-w-6xl min-w-0 flex-1 flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex min-w-0 flex-col gap-8 md:flex-row md:gap-16 lg:gap-26">
        <div className="flex min-w-0 flex-col gap-y-6 md:w-1/3 md:gap-y-14">
          <div className="flex flex-col gap-y-2">
            <label className="mb-1 block text-xl font-semibold text-lime-400 md:text-2xl">
              Name <span className="text-sm text-lime-400 md:text-base">(Required)</span>
            </label>
            <input
              name="Name"
              type="text"
              required
              placeholder="Type your name here"
              value={form.Name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="mb-1 block text-xl font-semibold text-lime-400 md:text-2xl">
              Email <span className="text-sm text-lime-400 md:text-base">(Required)</span>
            </label>
            <input
              name="Email"
              type="email"
              required
              placeholder="abc@gmail.com"
              value={form.Email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="mb-1 block text-xl font-semibold text-lime-400 md:text-2xl">
              Inquiry type <span className="text-sm text-lime-400 md:text-base">(Required)</span>
            </label>
            <select
              name="InquiryType"
              required
              value={form.InquiryType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="General">General</option>
              <option value="Recruitment">Recruitment</option>
              <option value="Projects">Projects</option>
              <option value="Collaboration">Collaboration</option>
            </select>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-y-2 md:w-2/3">
          <label className="mb-1 block text-xl font-semibold text-lime-400 md:text-2xl">
            Message <span className="text-sm text-lime-400 md:text-base">(Required)</span>
          </label>
          <textarea
            name="Message"
            required
            placeholder="Type your message here"
            rows={7}
            value={form.Message}
            onChange={handleChange}
            className={`${inputClass} p-4 resize-none`}
          />
        </div>
      </div>

      <div className="flex justify-stretch sm:justify-end">
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-lime-400 px-8 py-3 text-lg font-semibold text-[#213359] shadow-md transition hover:bg-lime-300 disabled:opacity-60 sm:mt-4 sm:w-auto sm:px-12 sm:py-4 sm:text-xl"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {status === 'success' && <p className="text-green-400 mt-2">Thank you! Your message has been sent.</p>}
      {status === 'error' && <p className="text-red-400 mt-2">Something went wrong. Please try again.</p>}
    </form>
  );
}
