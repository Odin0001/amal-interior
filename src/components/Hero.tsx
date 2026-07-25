const Hero = () => (
  <div id="hero-container" className="absolute inset-0">
    <video
      className="w-full h-full object-cover"
      src="/hero-vid.mp4"
      poster="/hero.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
    <div className="absolute inset-0 bg-black/20" />
  </div>
);

export default Hero;