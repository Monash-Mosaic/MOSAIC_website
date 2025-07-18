'use client';

import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    InquiryType: '',
    Message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const suffixPath = 'contact_us_form'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${suffixPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ Name: '', Email: '', InquiryType: '', Message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#213359] relative flex flex-col items-center">
      <Navbar color="dark" />
      <section className="w-full flex flex-col items-center mt-10 px-4">
        <img src="/Octopus_icon_3.png" alt="Octopus" className="mx-auto mb-4 w-20 md:w-28" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: '#213359' }}>
          We’d love to hear from you!
        </h1>
        <div className="w-full max-w-6xl bg-[#213359] rounded-2xl mt-8 p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <form className="flex-1 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Name <span className="text-xs text-lime-400">(Required)</span></label>
              <input name="Name" type="text" required placeholder="Type your name here" value={form.Name} onChange={handleChange} className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Email <span className="text-xs text-lime-400">(Required)</span></label>
              <input name="Email" type="email" required placeholder="abc@gmail.com" value={form.Email} onChange={handleChange} className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Inquiry type <span className="text-xs text-lime-400">(Required)</span></label>
              <input name="InquiryType" type="text" required placeholder="Text input" value={form.InquiryType} onChange={handleChange} className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Message <span className="text-xs text-lime-400">(Required)</span></label>
              <textarea name="Message" required placeholder="Type your message here" rows={7} value={form.Message} onChange={handleChange} className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none" />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="bg-lime-400 text-[#213359] px-10 py-3 rounded-full font-semibold text-lg hover:bg-lime-300 transition shadow-md mt-4 disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {status === 'success' && <p className="text-green-400 mt-2">Thank you! Your message has been sent.</p>}
            {status === 'error' && <p className="text-red-400 mt-2">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}