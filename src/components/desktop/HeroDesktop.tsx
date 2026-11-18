import { PlatformPanels } from '../shared/PlatformPanels';

export function HeroDesktop() {
  return (
    <section className="hero-desktop" aria-labelledby="home-heading">
      <div className="hero-copy">
        <p className="eyebrow">STREAMING · GAMING · RECARGAS</p>
        <h1 id="home-heading">Entretenimiento <span className="hero-accent">digital</span>,<br />simple y rápido</h1>
        <p className="hero-description">
          Explora tus plataformas de <strong className="hero-accent">streaming</strong> favoritas y <strong className="hero-accent">recargas de juegos</strong> en un solo lugar.
        </p>
      </div>
      <PlatformPanels />
    </section>
  );
}
