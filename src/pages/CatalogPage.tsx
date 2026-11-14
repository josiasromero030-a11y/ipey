import {ChevronRight,Search} from 'lucide-react';
import type {Store} from '../hooks/useStore';
import {MobileCatalogTools} from '../components/mobile/MobileCatalogTools';
import {CatalogToolsDesktop} from '../components/desktop/CatalogToolsDesktop';
import {ServiceCard} from '../components/shared/ServiceCard';
import {GamingBannerMobile} from '../components/mobile/GamingBannerMobile';
import {GamingBannerDesktop} from '../components/desktop/GamingBannerDesktop';

export function CatalogPage({store:s,mobile}:{store:Store;mobile:boolean}){
 const title=s.category==='streaming'?'Streaming':s.category==='gaming'?'Juegos':'Buscar servicios';
 return <section className="catalog-page"><div className="breadcrumb"><a href="#/">Inicio</a><ChevronRight size={14}/>{title}</div><h1>{title}</h1><p className="lead">{s.category==='gaming'?'Elige un juego y consulta sus paquetes.':'Encuentra tu servicio y compara sus modalidades.'}</p>
  {mobile?<MobileCatalogTools products={s.products.filter(p=>!s.category||p.category===s.category)} gaming={s.category==='gaming'} query={s.query} onQuery={s.setQuery} sort={s.sort} onSort={s.setSort} filters={s.filters} onChange={s.setFilters}/>:<CatalogToolsDesktop store={s}/>}
  <div className="catalog-results"><span role="status">{s.filtered.length} {s.filtered.length===1?'producto':'productos'}</span><button className="text-button" onClick={s.reset}>Limpiar filtros</button></div>
  {s.filtered.length?<div className="catalog-grid service-grid">{s.filtered.map((p,i)=>p.category==='gaming'&&s.category==='gaming'?(mobile?<GamingBannerMobile key={p.id} product={p}/>:<GamingBannerDesktop key={p.id} product={p}/>):<ServiceCard key={p.id} product={p} horizontal={p.id==='spotify'&&i===s.filtered.length-1&&s.filtered.length%2===1}/>)}</div>:<div className="empty-state"><Search size={32}/><h2>No encontramos resultados</h2><p>Prueba otro término o cambia los filtros.</p><button className="button" onClick={s.reset}>Mostrar todo</button></div>}
  <p className="notice">Catálogo en preparación: los precios y la disponibilidad están pendientes de configuración.</p>
 </section>;
}
