import { Gamepad2, TvMinimalPlay } from 'lucide-react';
import type { Store } from '../../hooks/useStore';
import { PlatformPanels } from '../shared/PlatformPanels';

export function HeroMobile({ store }: { store: Store }) {
  return (
    <section className="hero-mobile" aria-labelledby="home-heading">
      <PlatformPanels />
      <div className="hero-copy">
        <h1 id="home-heading">Todo tu entretenimiento <span>digital</span></h1>
        <p className="hero-description">Streaming, planes y recargas gaming en un solo lugar.</p>
        <div className="hero-actions">
          <a className="button" href="#/streaming" onClick={store.reset}><TvMinimalPlay size={15} aria-hidden="true" />Streaming</a>
          <a className="button secondary" href="#/juegos" onClick={store.reset}><Gamepad2 size={16} aria-hidden="true" />Juegos</a>
        </div>
      </div>
    </section>
  );
}
