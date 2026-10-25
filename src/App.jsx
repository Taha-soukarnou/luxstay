function App() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        {/* Small heading */}
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
          Welcome to LuxStay
        </p>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6">
          Discover
          <span className="text-primary"> Extraordinary </span>
          Stays
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
          Experience exceptional hotels, breathtaking destinations,
          and unforgettable moments around the world.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">

          <button className="bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-full font-semibold transition-colors duration-300">
            Explore Hotels
          </button>

          <button className="border border-border-custom hover:border-primary px-8 py-3 rounded-full transition-colors duration-300">
            Learn More
          </button>

        </div>

      </div>
    </main>
  );
}

export default App;