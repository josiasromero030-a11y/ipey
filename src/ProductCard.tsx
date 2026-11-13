import type {CSSProperties} from 'react';
import {ArrowRight} from 'lucide-react';
import type {Product} from './catalog';
import {money,purchasable,promotion} from './commerce';
import {ProductIdentity} from './ProductIdentity';

export function ProductCard({p,compact=false}:{p:Product;compact?:boolean}){
 const prices=p.variants.filter(v=>purchasable(p,v)).map(v=>v.price!);
 const action=p.category==='gaming'?'Ver paquetes':'Ver planes';
 return <article className={compact?'product-card home-service-card':'product-card'}>
  <a className={`product-visual visual-${p.id}`} href={`#/producto/${p.id}`}
   style={{'--product-color':p.color,backgroundImage:`url(${import.meta.env.BASE_URL}art/${p.id}.svg)`} as CSSProperties}
   aria-label={`Ver ${p.name}`}>
   <ProductIdentity id={p.id} name={p.name}/>
   {promotion(p)&&<span className="badge">Oferta activa</span>}
  </a>
  <div className="card-body">
   <div className="card-title-row">
    <h3><a href={`#/producto/${p.id}`}>{p.name}</a></h3>
    <span className="card-price">{prices.length?`Desde ${money(Math.min(...prices))}`:'Precio por definir'}</span>
   </div>
   {compact&&<p className="home-service-info">{p.variants.length} modalidades</p>}
   <div className="card-meta">
    <span>{p.category==='gaming'?'Recargas por ID':'Streaming'}</span>
    <a href={`#/producto/${p.id}`} aria-label={compact?`${action} de ${p.name}`:undefined}>
     {compact?<span>{action}</span>:action} <ArrowRight size={14}/>
    </a>
   </div>
  </div>
 </article>;
}
