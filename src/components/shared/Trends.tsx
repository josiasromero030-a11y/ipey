import { useEffect, useState, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { serviceVisual } from '../../data/visualAssets';
import { ArtworkBackground } from './ArtworkBackground';
import { ServiceIdentity } from './ServiceIdentity';

const rotationDelay = 8_000;
const reducedMotion = '(prefers-reduced-motion: reduce)';
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => matchMedia(reducedMotion).matches);
  const [hidden, setHidden] = useState(() => document.hidden);
  const rotating = !paused && !hidden;

  useEffect(() => {
    const motion = matchMedia(reducedMotion);
    const pauseForMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setPaused(true);
    };
    const updateVisibility = () => setHidden(document.hidden);

    motion.addEventListener('change', pauseForMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      motion.removeEventListener('change', pauseForMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const advance = window.setTimeout(() => {
      if (!document.hidden) setIndex(current => (current + 1) % highlights.length);
    }, rotationDelay);
    return () => window.clearTimeout(advance);
  }, [index, rotating]);

  const highlight = highlights[index];
  const visual = serviceVisual(highlight.product);
  const changeSlide = (direction: number) => {
    setIndex(current => (current + direction + highlights.length) % highlights.length);
  };

  return (
    <section className="trends-section" aria-labelledby="trends-heading">
      <div className="section-heading"><h2 id="trends-heading">Tendencias</h2></div>
      <div className={`trend-banner trend-${highlight.product}`} style={{ '--trend-focus': highlight.focus } as CSSProperties}>
        <ArtworkBackground src={`${import.meta.env.BASE_URL}recursos/destacados/${highlight.art}`} />
        <ServiceIdentity key={highlight.product} name={highlight.brand} logo={visual?.logo} />
      </div>
      <div className="trend-controls" role="group" aria-label="Controles de Tendencias">
        <button type="button" className="trend-control" aria-label="Título anterior" onClick={() => changeSlide(-1)}><ChevronLeft size={20} /></button>
        <p className="trend-caption" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
          {highlight.title} · {index + 1} de {highlights.length}
        </p>
        <button type="button" className="trend-control" aria-label="Título siguiente" onClick={() => changeSlide(1)}><ChevronRight size={20} /></button>
        <button type="button" className="trend-control" aria-label={paused ? 'Reanudar rotación' : 'Pausar rotación'} onClick={() => setPaused(current => !current)}>
          {paused ? <Play size={17} /> : <Pause size={17} />}
        </button>
      </div>
    </section>
  );
}
