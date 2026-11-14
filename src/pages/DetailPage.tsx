import {useRef,useState,type FormEvent} from 'react';
import {ArrowRight,Check,ChevronRight,ShieldCheck} from 'lucide-react';
import type {Product} from '../catalog';
import {money,orderMessage,purchasable,validPlayerId} from '../commerce';
import {ProductIdentity} from '../ProductIdentity';
import {OrderSummary} from '../components/shared/OrderSummary';
import {ArtworkBackground} from '../components/shared/ArtworkBackground';
import {serviceCover} from '../data/visualAssets';

export function DetailPage({product:p,mobile}:{product:Product;mobile:boolean}){
 const [chosen,setChosen]=useState(p.variants[0]?.id||'');
 const [player,setPlayer]=useState('');
 const [error,setError]=useState('');
 const [message,setMessage]=useState('');
 const dialog=useRef<HTMLDialogElement>(null);
 const playerInput=useRef<HTMLInputElement>(null);
 const v=p.variants.find(v=>v.id===chosen);
 function review(e:FormEvent){
  e.preventDefault();
  try{
   if(!v)throw new Error('Selecciona una opción.');
   setMessage(orderMessage(p,v,player));setError('');dialog.current?.showModal();
  }catch(e){
   setError((e as Error).message);
   if(p.category==='gaming'&&!validPlayerId(player)){playerInput.current?.focus();playerInput.current?.scrollIntoView({block:'center'})}
  }
 }
 return <section className="detail-page"><div className="breadcrumb"><a href="#/">Inicio</a><ChevronRight size={14}/><a href={p.category==='gaming'?'#/juegos':'#/streaming'}>{p.category==='gaming'?'Juegos':'Streaming'}</a><ChevronRight size={14}/>{p.name}</div>
  <div className="detail-layout"><div><div className={`detail-art artwork artwork-${p.id}`}><ArtworkBackground src={serviceCover(p.id)}/><ProductIdentity id={p.id} name={p.name}/></div><p className="privacy-reminder"><ShieldCheck size={20}/>No te pediremos contraseñas ni códigos de verificación.</p></div><div>
   <p className="eyebrow">{p.category==='gaming'?'RECARGAS GAMING':'CATÁLOGO DE STREAMING'}</p><h1>{p.name}</h1><p className="lead">{p.description}</p>
   <form onSubmit={review} noValidate><fieldset><legend>{p.category==='gaming'?'Elige tu paquete':'Compara y elige una modalidad'}</legend><div className="variants">{p.variants.map(option=><label className={chosen===option.id?'variant selected':'variant'} key={option.id}><input type="radio" name="variant" value={option.id} checked={chosen===option.id} onChange={()=>{setChosen(option.id);setError('')}}/><div><strong>{option.name}</strong><span>{option.duration?`${option.duration} mes(es)`:'Recarga por ID'}</span><ul>{option.features.map(f=><li key={f}><Check size={13}/>{f}</li>)}</ul><small>{option.available?'Disponible':'Disponibilidad pendiente'}</small></div><b>{money(option.price)}</b></label>)}</div></fieldset>
    {p.category==='gaming'&&<label className="player-label">ID de jugador<input ref={playerInput} aria-label="ID de jugador" inputMode="numeric" autoComplete="off" maxLength={15} placeholder="Introduce tu ID de Free Fire" value={player} onChange={e=>setPlayer(e.target.value)} aria-invalid={Boolean(error)&&!validPlayerId(player)} aria-describedby={error?'player-help player-error':'player-help'}/><small id="player-help">De 6 a 15 dígitos. Comprueba el ID dentro del juego; no verificamos la cuenta con el proveedor.</small></label>}
    {mobile?<details className="conditions"><summary>Condiciones del servicio</summary><p>{p.conditions}</p></details>:<div className="conditions"><h2>Condiciones del servicio</h2><p>{p.conditions}</p></div>}
    {error&&<p role="alert" id="player-error" className="error">{error}</p>}
    {v&&purchasable(p,v)?<button className="button full review-button" type="submit">Revisar solicitud<ArrowRight size={18}/></button>:<p className="notice">La contratación se habilitará cuando esta opción tenga precio y disponibilidad confirmados.</p>}
    <p className="checkout-note">La solicitud no confirma una compra ni realiza un pago.</p>
   </form>
  </div></div>
  <OrderSummary dialog={dialog} message={message} onCancel={()=>setMessage('')}/>
 </section>;
}
