import {useRef,useState} from 'react';
import {Search,SlidersHorizontal,X} from 'lucide-react';
import {business,type Product} from '../../catalog';

export type CatalogFilterValues={selected:string;duration:string;availability:string;max:string};
const empty:CatalogFilterValues={selected:'',duration:'',availability:'',max:''};

type Props={products:Product[];gaming:boolean;query:string;onQuery:(value:string)=>void;sort:string;onSort:(value:string)=>void;filters:CatalogFilterValues;onChange:(value:CatalogFilterValues)=>void};
export function MobileCatalogTools({products,gaming,query,onQuery,sort,onSort,filters,onChange}:Props){
 const dialog=useRef<HTMLDialogElement>(null);
 const [draft,setDraft]=useState(filters);
 const [expanded,setExpanded]=useState(false);
 const chips=[
  {key:'selected',text:products.find(p=>p.id===filters.selected)?.name||'Plataforma seleccionada'},
  {key:'duration',text:`${filters.duration} mes${filters.duration==='1'?'':'es'}`},
  {key:'availability',text:'Disponibles'},
  {key:'max',text:`Hasta ${filters.max} ${business.currency}`},
 ].filter(item=>filters[item.key as keyof CatalogFilterValues]);
 function close(){dialog.current?.close();setExpanded(false)}
 function open(){setDraft({...filters});setExpanded(true);dialog.current?.showModal()}
 return <div className="mobile-catalog-tools">
  <label className="mobile-catalog-search"><Search size={19} aria-hidden="true"/><input type="search" aria-label="Buscar servicios" placeholder={gaming?'Buscar un juego':'Buscar un servicio'} value={query} onChange={e=>onQuery(e.target.value)}/></label>
  <div className="mobile-catalog-toolbar">
   <button className="mobile-filter-trigger" onClick={open} aria-haspopup="dialog" aria-expanded={expanded} aria-controls="mobile-filter-dialog" aria-label={chips.length?`Filtros (${chips.length} activos)`:'Filtros'}><SlidersHorizontal size={18}/>Filtros{chips.length>0&&<span>{chips.length}</span>}</button>
   <label className="mobile-sort"><span>Ordenar</span><select aria-label="Ordenar" value={sort} onChange={e=>onSort(e.target.value)}><option value="name">Nombre A–Z</option><option value="asc">Menor precio</option><option value="desc">Mayor precio</option></select></label>
  </div>
  {chips.length>0&&<div className="mobile-filter-chips" aria-label="Filtros activos">{chips.map(({key,text})=><button key={key} onClick={()=>onChange({...filters,[key]:''})} aria-label={`Quitar filtro: ${text}`}>{text}<X size={14}/></button>)}</div>}
  <dialog id="mobile-filter-dialog" className="mobile-filter-sheet" ref={dialog} aria-labelledby="mobile-filter-heading" onCancel={()=>setExpanded(false)} onClose={()=>setExpanded(false)}>
   <div className="mobile-sheet-heading"><h2 id="mobile-filter-heading">Filtros</h2><button type="button" aria-label="Cerrar filtros" onClick={close}><X/></button></div>
   <form onSubmit={e=>{e.preventDefault();onChange({...draft});close()}}>
    <div className="mobile-filter-fields">
     {products.length>1&&<label>Plataforma<select aria-label="Plataforma" value={draft.selected} onChange={e=>setDraft({...draft,selected:e.target.value})}><option value="">Todas las plataformas</option>{products.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>}
     {!gaming&&<label>Duración<select aria-label="Duración" value={draft.duration} onChange={e=>setDraft({...draft,duration:e.target.value})}><option value="">Todas las duraciones</option><option value="1">1 mes</option><option value="3">3 meses</option></select></label>}
     <label>Precio máximo ({business.currency})<input aria-label="Precio máximo" type="number" inputMode="decimal" min="0" step="any" placeholder="Sin límite" value={draft.max} onChange={e=>setDraft({...draft,max:e.target.value})}/></label>
     <label>Disponibilidad<select aria-label="Disponibilidad" value={draft.availability} onChange={e=>setDraft({...draft,availability:e.target.value})}><option value="">Toda disponibilidad</option><option value="yes">Disponibles</option></select></label>
    </div>
    <div className="mobile-filter-actions"><button type="button" onClick={()=>setDraft({...empty})}>Limpiar</button><button className="button" type="submit">Aplicar filtros</button></div>
   </form>
  </dialog>
 </div>;
}
