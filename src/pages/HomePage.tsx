import { ArrowRight } from 'lucide-react';
import type { Store } from '../hooks/useStore';
import { HeroDesktop } from '../components/desktop/HeroDesktop';
import { HeroMobile } from '../components/mobile/HeroMobile';
import { GamingBannerDesktop } from '../components/desktop/GamingBannerDesktop';
import { GamingBannerMobile } from '../components/mobile/GamingBannerMobile';
import { ServiceCard } from '../components/shared/ServiceCard';
import { StreamingRow } from '../components/shared/StreamingRow';
import { Trends } from '../components/shared/Trends';
import { HomeOffers } from '../components/shared/HomeOffers';
import { ProcessStrip } from '../components/shared/ProcessStrip';
import { Faq } from '../components/shared/Faq';

export function HomePage({ store, presentation }: { store: Store; presentation: 'desktop' | 'mobile' }) {
  const desktop = presentation === 'desktop';
  const streaming = store.products.filter(product => product.category === 'streaming');
  const games = store.products.filter(product => product.category === 'gaming');
  const [game] = games;
  const GamingBanner = desktop ? GamingBannerDesktop : GamingBannerMobile;

  return (
    <div className="home-page">
      {desktop ? <HeroDesktop /> : <HeroMobile />}
      <Trends />
      <section className="streaming-section" aria-labelledby="streaming-heading">
        <div className="section-heading">
          <div>
            <h2 id="streaming-heading">Servicios de streaming</h2>
            {desktop && <p>Modalidades de tus plataformas favoritas.</p>}
          </div>
          <a href="#/streaming" onClick={store.reset}>Ver todos<ArrowRight size={19} /></a>
        </div>
        <StreamingRow products={streaming} desktop={desktop} />
      </section>
      {game && (
        <section className="gaming-section" aria-labelledby="gaming-heading">
          <div className="section-heading">
            <h2 id="gaming-heading">Recargas de juegos</h2>
            <a href="#/juegos" onClick={store.reset}>Ver todos<ArrowRight size={19} /></a>
          </div>
          {games.length === 1 ? <GamingBanner product={game} /> : (
            <div className="service-grid home-scroll-row home-service-row">
              {games.map(product => <ServiceCard key={product.id} product={product} />)}
            </div>
          )}
        </section>
      )}
      <HomeOffers products={store.products} />
      <ProcessStrip />
      {!desktop && <Faq />}
    </div>
  );
}
