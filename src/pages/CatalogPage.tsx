import {SearchX} from 'lucide-react';
import type {Store} from '../hooks/useStore';
import {CatalogTools} from '../components/shared/CatalogTools';
import {ServiceCard} from '../components/shared/ServiceCard';
import {GamingBannerMobile} from '../components/mobile/GamingBannerMobile';
import {GamingBannerDesktop} from '../components/desktop/GamingBannerDesktop';

export function CatalogPage({store:s,mobile}:{store:Store;mobile:boolean}){
 const title=s.category==='streaming'?'Streaming':s.category==='gaming'?'Juegos':'Buscar servicios';
 const hasRefinements=Boolean(s.query||s.sort!=='name'||Object.values(s.filters).some(Boolean));
 return <section className="catalog-page" data-category={s.category ?? undefined}><h1>{title}</h1><p className="lead">{s.category==='gaming'?'Elige un juego y consulta sus paquetes.':'Encuentra tu servicio y compara sus modalidades.'}</p>
  <CatalogTools key={s.route} store={s}/>
  <div className="catalog-results"><span role="status">{s.filtered.length} {s.filtered.length===1?'producto':'productos'}</span>{hasRefinements&&<button className="text-button" onClick={s.reset}>Limpiar filtros</button>}</div>
  {s.filtered.length?<div className="catalog-grid service-grid">{s.filtered.map((p,i)=>p.category==='gaming'&&s.category==='gaming'?(mobile?<GamingBannerMobile key={p.id} product={p}/>:<GamingBannerDesktop key={p.id} product={p}/>):<ServiceCard key={p.id} product={p} horizontal={p.id==='spotify'&&i===s.filtered.length-1&&s.filtered.length%2===1}/>)}</div>:<div className="empty-state"><SearchX size={32} aria-hidden="true"/><h2>No encontramos resultados</h2><p>Prueba otro término o cambia los filtros.</p><button className="button" onClick={s.reset}>Mostrar todo</button></div>}
  <p className="notice">Catálogo en preparación: los precios y la disponibilidad están pendientes de configuración.</p>
 </section>;
}
