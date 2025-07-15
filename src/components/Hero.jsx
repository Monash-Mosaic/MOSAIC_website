export default function Hero() {
  return (
    <section className="text-center max-w-3xl mt-20 px-6">
      <h1 style={{color: '#BDFF15'}} className="text-4xl md:text-6xl font-extrabold">AI for Social Impact</h1>
      <p className="mt-6 text-base md:text-lg text-gray-200">
        MOSAIC (Monash Students for AI with Communities) is where cutting-edge technology meets social impact.
        Join a team that applies data science and human-centred computing to real-world challenges faced by marginalised communities.
      </p>
      <button style={{background: '#BDFF15'}} className="mt-8 bg-lime-400 text-[#0C1D45] px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition">
        Explore projects
      </button>
    </section>
  );
}
