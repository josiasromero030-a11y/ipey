import {ArrowRight} from 'lucide-react';
import type {Product} from '../../catalog';
import {money,promotion,purchasable} from '../../commerce';
import {ServiceIdentity} from './ServiceIdentity';

export function ServiceCard({product:p,horizontal=false}:{product:Product;horizontal?:boolean}){
 const prices=p.variants.filter(v=>purchasable(p,v)).map(v=>v.price!);
 return <article className={`product-card service-card service-card-${p.id}${horizontal?' service-card-wide':''}`}>
  <a className={`service-cover artwork artwork-${p.id}`} href={`#/producto/${p.id}`} aria-label={`Ver ${p.name}`}><ServiceIdentity id={p.id} name={p.name}/>{promotion(p)&&<span className="offer-badge">Oferta activa</span>}</a>
  <div className="service-card-body"><div className="service-card-copy"><h3><a href={`#/producto/${p.id}`}>{p.name}</a></h3><p>{p.variants.length} {p.category==='gaming'?'paquetes por ID':'modalidades'}</p></div>
   <span className={prices.length?'service-price':'service-price pending'}>{prices.length?<><small>Desde</small>{money(Math.min(...prices))}</>:'Precio por definir'}</span>
   <a className="card-action" href={`#/producto/${p.id}`} aria-label={`${p.category==='gaming'?'Ver paquetes':'Ver planes'} de ${p.name}`}><ArrowRight size={21}/></a>
  </div>
 </article>;
}
