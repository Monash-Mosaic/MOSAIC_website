import Navbar from '../../components/Navbar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#213359] relative flex flex-col items-center">
      <Navbar color="dark" />
      <section className="w-full flex flex-col items-center mt-10 px-4">
        <img src="/Octopus_icon_green_1.png" alt="Octopus" className="mx-auto mb-4 w-20 md:w-28" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: '#213359' }}>
          We’d love to hear from you!
        </h1>
        <div className="w-full max-w-6xl bg-[#213359] rounded-2xl mt-8 p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <form className="flex-1 flex flex-col gap-6">
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Name <span className="text-xs text-lime-400">(Required)</span></label>
              <input type="text" required placeholder="Type your name here" className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Email <span className="text-xs text-lime-400">(Required)</span></label>
              <input type="email" required placeholder="abc@gmail.com" className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Inquiry type <span className="text-xs text-lime-400">(Required)</span></label>
              <input type="text" required placeholder="Text input" className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400" />
            </div>
          </form>
          <form className="flex-1 flex flex-col gap-6 justify-between">
            <div>
              <label className="block text-lime-400 text-lg font-semibold mb-1">Message <span className="text-xs text-lime-400">(Required)</span></label>
              <textarea required placeholder="Type your message here" rows={7} className="w-full rounded-md p-3 text-[#213359] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-lime-400 text-[#213359] px-10 py-3 rounded-full font-semibold text-lg hover:bg-lime-300 transition shadow-md mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
} 