import {Search,UserRound} from 'lucide-react';
import {whatsappUrl} from '../../commerce';
import {WhatsAppIcon} from '../../WhatsAppIcon';
import type {Store} from '../../hooks/useStore';
import {Brand} from '../shared/Brand';
import {PrimaryNavigation} from '../shared/PrimaryNavigation';

export function HeaderDesktop({store}:{store:Store}){
 const contact=whatsappUrl('Hola, quisiera información sobre el catálogo.');
 return <header className="header-desktop"><div className="shell desktop-header-row"><Brand/><PrimaryNavigation store={store}/><form className="global-search desktop-search" role="search" onSubmit={e=>{e.preventDefault();store.navigate('/buscar',false)}}><Search size={21} aria-hidden="true"/><input aria-label="Buscar en el catálogo" placeholder="Buscar un servicio, plataforma o juego…" value={store.query} onChange={e=>store.setQuery(e.target.value)}/></form><a className="whatsapp-contact" href={contact||'#/contacto'} aria-label="Contacto por WhatsApp"><WhatsAppIcon size={23}/><span>WhatsApp</span></a><a className="contact-info" href="#/contacto" aria-label="Información de contacto"><UserRound size={24}/><span>Contacto</span></a></div></header>;
}
