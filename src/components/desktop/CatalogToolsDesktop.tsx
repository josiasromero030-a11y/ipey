import {Search,SlidersHorizontal} from 'lucide-react';
import {business} from '../../catalog';
import type {Store} from '../../hooks/useStore';

export function CatalogToolsDesktop({store:s}:{store:Store}){
 return <div className="catalog-filters-desktop"><label className="catalog-search-field"><Search size={18}/><input type="search" aria-label="Buscar servicios" placeholder="Buscar un servicio…" value={s.query} onChange={e=>s.setQuery(e.target.value)}/></label><SlidersHorizontal size={19} aria-hidden="true"/>
  <select aria-label="Plataforma" value={s.filters.selected} onChange={e=>s.setFilters({...s.filters,selected:e.target.value})}><option value="">Todas las plataformas</option>{s.products.filter(p=>!s.category||p.category===s.category).map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select>
  {s.category!=='gaming'&&<select aria-label="Duración" value={s.filters.duration} onChange={e=>s.setFilters({...s.filters,duration:e.target.value})}><option value="">Todas las duraciones</option><option value="1">1 mes</option><option value="3">3 meses</option></select>}
  <input type="number" min="0" aria-label="Precio máximo" placeholder={`Máximo ${business.currency}`} value={s.filters.max} onChange={e=>s.setFilters({...s.filters,max:e.target.value})}/>
  <select aria-label="Disponibilidad" value={s.filters.availability} onChange={e=>s.setFilters({...s.filters,availability:e.target.value})}><option value="">Toda disponibilidad</option><option value="yes">Disponibles</option></select>
  <select aria-label="Ordenar" value={s.sort} onChange={e=>s.setSort(e.target.value)}><option value="name">Nombre A–Z</option><option value="asc">Menor precio</option><option value="desc">Mayor precio</option></select>
 </div>;
}
