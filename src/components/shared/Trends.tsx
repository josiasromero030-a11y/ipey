import { useState, type CSSProperties } from 'react';
import { serviceVisual } from '../../data/visualAssets';
import { ArtworkBackground } from './ArtworkBackground';
import { ServiceIdentity } from './ServiceIdentity';

const highlights = [
  { title: 'Un trabajo maldito', product: 'netflix', brand: 'Netflix', art: 'trabajo-maldito.jpg', focus: 'center' },
  { title: 'Lupin: Parte 4', product: 'netflix', brand: 'Netflix', art: 'lupin.jpg', focus: 'center 37%' },
  { title: 'Bluey', product: 'disney', brand: 'Disney+', art: 'bluey.jpg', focus: 'center' },
  { title: 'Nadie quiere esto · Temporada 3', product: 'netflix', brand: 'Netflix', art: 'nadie-quiere-esto.jpg', focus: 'center 42%' },
  { title: 'VisionQuest', product: 'disney', brand: 'Disney+', art: 'visionquest.jpg', focus: 'center 38%' },
  { title: 'Palomas negras · Temporada 2', product: 'netflix', brand: 'Netflix', art: 'palomas-negras.jpg', focus: 'center 40%' },
  { title: 'The Gilded Age', product: 'max', brand: 'HBO Max', art: 'gilded.jpg', focus: 'center 35%' },
  { title: 'WAR', product: 'max', brand: 'HBO Max', art: 'war.jpg', focus: 'center 42%' },
  { title: 'Los diarios de la boticaria · Temporada 3', product: 'crunchyroll', brand: 'Crunchyroll', art: 'boticaria.jpg', focus: 'center 40%' },
  { title: 'Black Clover · Temporada 2', product: 'crunchyroll', brand: 'Crunchyroll', art: 'clover.jpg', focus: 'center 37%' },
];

export function Trends() {
  const [paused, setPaused] = useState(false);
  const action = paused ? 'Reanudar movimiento' : 'Pausar movimiento';

  return (
    <section className="trends-section" aria-labelledby="trends-heading">
      <div className="section-heading">
        <h2 id="trends-heading">Tendencias</h2>
        <button type="button" className="trend-motion-control" onClick={() => setPaused(current => !current)}>
          {action}
        </button>
      </div>
      <div className="trend-strip" data-paused={paused}>
        <div className="trend-track">
          {[false, true].map(copy => (
            <div className="trend-cycle" key={String(copy)} aria-hidden={copy || undefined}>
              {highlights.map(highlight => {
                const visual = serviceVisual(highlight.product);
                return (
                  <article className="trend-card service-card service-card-compact" key={highlight.art}>
                    <div className={`trend-banner service-cover artwork artwork-${highlight.product}`}>
                      <div className="service-artwork" style={{ '--focus': highlight.focus, '--tone': visual?.tone } as CSSProperties}>
                        <ArtworkBackground src={`${import.meta.env.BASE_URL}recursos/destacados/${highlight.art}`} />
                        <ServiceIdentity name={highlight.brand} logo={visual?.logo} />
                      </div>
                    </div>
                    <h3 className="trend-title" onClick={() => setPaused(current => !current)}>{highlight.title}</h3>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
