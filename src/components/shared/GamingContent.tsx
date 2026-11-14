import {ArrowRight,Diamond} from 'lucide-react';
import type {Product} from '../../catalog';
import {ServiceIdentity} from './ServiceIdentity';
import {ArtworkBackground} from './ArtworkBackground';
import {visualAssets} from '../../data/visualAssets';

export function GamingArtwork({product}:{product:Product}){return <a className="gaming-artwork artwork artwork-free-fire" href={`#/producto/${product.id}`} aria-label={`Ver ${product.name}`}><ArtworkBackground src={visualAssets.freeFireBanner}/><ServiceIdentity id={product.id} name={product.name}/></a>}
export function GamingCopy({product,desktop=false}:{product:Product;desktop?:boolean}){return <div className="gaming-copy"><h3>{desktop?'Recargas de ':''}{product.name}</h3><p>{product.description}</p>{desktop&&<div className="gaming-facts"><span><Diamond size={17}/>Diamantes</span><span>{product.variants.length} paquetes por ID</span></div>}</div>}
export function GamingAction({product}:{product:Product}){return <a className="button gaming-action" href={`#/producto/${product.id}`} aria-label={`Ver paquetes de ${product.name}`}><Diamond className="gaming-action-icon" size={18}/>Ver paquetes<ArrowRight size={20}/></a>}
