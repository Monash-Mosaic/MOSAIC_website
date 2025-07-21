'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    InquiryType: '',
    Message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/proxy-contact', {
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
      <section className="w-full flex flex-col items-center mt-10 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}  // Start above and invisible
          animate={{ opacity: 1, y: 0 }}    // Slide down and fade in
          transition={{
            type: "spring",  // Bouncy spring animation
            duration: 1,
            damping: 10,     // Less bounciness
            stiffness: 50   // Snappier motion
          }}>
          <img src="/Octopus_icon_3.png" alt="Octopus" className="mx-auto mb-4 w-20 md:w-28" />
          <h1 className="text-2xl md:text-5xl font-extrabold text-center mb-2" style={{ color: '#213359' }}>
            We’d love to hear from you!
          </h1>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}  // Start above and invisible
          animate={{ opacity: 1, y: 0 }}    // Slide down and fade in
          transition={{
            type: "spring",  // Bouncy spring animation
            duration: 1,
            damping: 15,     // Less bounciness
            stiffness: 60   // Snappier motion
          }}
          className="w-full max-w-7xl bg-[#213359] rounded-2xl mt-8 p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-center">
          <form className="flex-1 flex flex-col gap-8 max-w-6xl" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-26 ">

              {/* {First Column} */}
              <div className="md:w-1/3 flex flex-col gap-y-14">
                <div className='flex flex-col gap-y-2'>
                  <label className="block text-lime-400 text-2xl font-semibold mb-1">Name <span className="text-base text-lime-400">(Required)</span></label>
                  <input name="Name" type="text" required placeholder="Type your name here" value={form.Name} onChange={handleChange} className="w-full p-3 text-xl border-2 rounded-lg rounded-md text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label className="block text-lime-400 text-2xl font-semibold mb-1">Email <span className="text-base text-lime-400">(Required)</span></label>
                  <input name="Email" type="email" required placeholder="abc@gmail.com" value={form.Email} onChange={handleChange} className="w-full p-3 text-xl border-2 rounded-lg  rounded-md  text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label className="block text-lime-400 text-2xl font-semibold mb-1">Inquiry type <span className="text-base text-lime-400">(Required)</span></label>
                  <select name="InquiryTypeDropdown" value={form.InquiryType} onChange={handleChange} className="w-full text-xl border-2 rounded-lg  rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400">
                    <option value="General">General</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Projects">Projects</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>
              </div>

              {/* {Second Column} */}
              <div className="md:w-2/3 flex flex-col gap-y-2">
                <label className="block text-lime-400 text-2xl font-semibold mb-1">Message <span className="text-base text-lime-400">(Required)</span></label>
                <textarea name="Message" required placeholder="Type your message here" rows={7} value={form.Message} onChange={handleChange} className="w-full p-4 text-xl border-2 rounded-lg  rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="bg-lime-400 text-[#213359] p-4 text-xl  px-12 py-4 rounded-full font-semibold text-lg hover:bg-lime-300 transition shadow-md mt-4 disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {status === 'success' && <p className="text-green-400 mt-2">Thank you! Your message has been sent.</p>}
            {status === 'error' && <p className="text-red-400 mt-2">Something went wrong. Please try again.</p>}
          </form>
          <div className="border-b-2 border-blue-500"></div>
        </motion.div>
      </section>
      <Footer/>
    </main>
  );
}