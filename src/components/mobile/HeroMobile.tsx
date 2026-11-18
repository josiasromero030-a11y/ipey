import { PlatformPanels } from '../shared/PlatformPanels';

export function HeroMobile() {
  return (
    <section className="hero-mobile" aria-labelledby="home-heading">
      <PlatformPanels />
      <div className="hero-copy">
        <h1 id="home-heading">Todo tu entretenimiento <span className="hero-accent">digital</span></h1>
        <p className="hero-description">Streaming, planes y <strong className="hero-accent">recargas gaming</strong> en un solo lugar.</p>
      </div>
    </section>
  );
}
