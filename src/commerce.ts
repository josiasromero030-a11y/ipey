import {business, type Product, type Variant} from './catalog';
export const validPrice=(v:Variant)=>Number.isFinite(v.price)&&v.price!==null&&v.price>0;
export const purchasable=(p:Product,v:Variant)=>p.active&&p.variants.includes(v)&&v.available&&validPrice(v);
export const money=(price:number|null)=>price===null?'Precio por definir':new Intl.NumberFormat(business.locale,{style:'currency',currency:business.currency}).format(price);
export const validPlayerId=(id:string)=>/^\d{6,15}$/.test(id.trim());
export const validPhone=(phone:string)=>/^[1-9]\d{7,14}$/.test(phone);
export function orderMessage(p:Product,v:Variant,playerId='') {
 if(!purchasable(p,v))throw new Error('La opción no está disponible o no tiene precio válido.');
 if(p.category==='gaming'&&!validPlayerId(playerId))throw new Error('Introduce un ID de jugador de 6 a 15 dígitos.');
 return [p.category==='gaming'?'Hola, quiero solicitar una recarga.':'Hola, quiero contratar un servicio.',`${p.category==='gaming'?'Juego':'Servicio'}: ${p.name}`,`${p.category==='gaming'?'Paquete':'Plan'}: ${v.name}`,v.duration?`Duración: ${v.duration} mes(es)`:null,`Precio: ${money(v.price)}`,p.category==='gaming'?`ID de jugador: ${playerId.trim()}`:null,'Quisiera confirmar la disponibilidad y continuar con la solicitud.'].filter(Boolean).join('\n\n');
}
export function whatsappUrl(message:string,phone=business.whatsapp){return validPhone(phone)?`https://wa.me/${phone}?text=${encodeURIComponent(message)}`:null;}
export function promotion(p:Product){return p.offer&&p.variants.some(v=>purchasable(p,v)&&v.previousPrice!==undefined&&v.previousPrice>v.price!);}
