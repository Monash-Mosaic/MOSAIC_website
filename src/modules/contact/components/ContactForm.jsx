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
    'w-full p-3 text-xl border-2 rounded-lg text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400';

  return (
    <form className="flex-1 flex flex-col gap-8 max-w-6xl" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-26">
        <div className="md:w-1/3 flex flex-col gap-y-14">
          <div className="flex flex-col gap-y-2">
            <label className="block text-lime-400 text-2xl font-semibold mb-1">
              Name <span className="text-base text-lime-400">(Required)</span>
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
            <label className="block text-lime-400 text-2xl font-semibold mb-1">
              Email <span className="text-base text-lime-400">(Required)</span>
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
            <label className="block text-lime-400 text-2xl font-semibold mb-1">
              Inquiry type <span className="text-base text-lime-400">(Required)</span>
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

        <div className="md:w-2/3 flex flex-col gap-y-2">
          <label className="block text-lime-400 text-2xl font-semibold mb-1">
            Message <span className="text-base text-lime-400">(Required)</span>
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

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-lime-400 text-[#213359] p-4 text-xl px-12 py-4 rounded-full font-semibold hover:bg-lime-300 transition shadow-md mt-4 disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {status === 'success' && <p className="text-green-400 mt-2">Thank you! Your message has been sent.</p>}
      {status === 'error' && <p className="text-red-400 mt-2">Something went wrong. Please try again.</p>}
    </form>
  );
}
