import type {Store} from '../hooks/useStore';
import {HeroDesktop} from '../components/desktop/HeroDesktop';
import {HeroMobile} from '../components/mobile/HeroMobile';
import {CategoryNavigationDesktop} from '../components/desktop/CategoryNavigationDesktop';
import {CategoryNavigationMobile} from '../components/mobile/CategoryNavigationMobile';
import {GamingBannerDesktop} from '../components/desktop/GamingBannerDesktop';
import {GamingBannerMobile} from '../components/mobile/GamingBannerMobile';
import {ServiceCard} from '../components/shared/ServiceCard';
import {ProcessStrip} from '../components/shared/ProcessStrip';
import {Faq} from '../components/shared/Faq';
import {ArrowRight} from 'lucide-react';

export function HomePage({store,presentation}:{store:Store;presentation:'desktop'|'mobile'}){
 const desktop=presentation==='desktop';
 const game=store.products.find(p=>p.id==='free-fire');
 const streaming=store.products.filter(p=>p.category==='streaming');
 return <div className="home-page">
  {desktop?<HeroDesktop store={store}/>:<HeroMobile store={store}/>}
  {desktop?<CategoryNavigationDesktop store={store}/>:<CategoryNavigationMobile store={store}/>}
  <section className="streaming-section" aria-labelledby="streaming-heading"><div className="section-heading"><div><h2 id="streaming-heading">Servicios de streaming</h2>{desktop&&<p>Modalidades de tus plataformas favoritas.</p>}</div><a href="#/streaming" onClick={store.reset}>Ver todos<ArrowRight size={19}/></a></div><div className="service-grid">{streaming.map(p=><ServiceCard key={p.id} product={p} horizontal={p.id==='spotify'}/>)}</div></section>
  {game&&<section className="gaming-section" aria-label="Recargas de juegos">{!desktop&&<div className="section-heading"><h2>Recargas de juegos</h2><a href="#/juegos" onClick={store.reset}>Ver todos<ArrowRight size={19}/></a></div>}{desktop?<GamingBannerDesktop product={game}/>:<GamingBannerMobile product={game}/>}</section>}
  <ProcessStrip/>
  {!desktop&&<Faq/>}
 </div>;
}
