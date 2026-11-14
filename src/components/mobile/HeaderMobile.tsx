import {useEffect,useRef,useState} from 'react';
import {Menu,X} from 'lucide-react';
import {whatsappUrl} from '../../commerce';
import {WhatsAppIcon} from '../../WhatsAppIcon';
import type {Store} from '../../hooks/useStore';
import {Brand} from '../shared/Brand';
import {PrimaryNavigation} from '../shared/PrimaryNavigation';
import {SearchDialog} from '../shared/SearchDialog';

export function HeaderMobile({store}:{store:Store}){
 const [menu,setMenu]=useState(false);
 const trigger=useRef<HTMLButtonElement>(null);
 const contact=whatsappUrl('Hola, quisiera información sobre el catálogo.');
 useEffect(()=>setMenu(false),[store.route]);
 return <header className="header-mobile"><div className="shell mobile-header-row"><Brand/><div className="mobile-header-actions"><SearchDialog store={store}/><a className="icon-button mobile-contact" href={contact||'#/contacto'} aria-label="Contacto por WhatsApp"><WhatsAppIcon size={28}/></a><button className="icon-button" ref={trigger} aria-label={menu?'Cerrar menú':'Abrir menú'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X size={26}/>:<Menu size={26}/>}</button></div></div><div className="mobile-navigation-row"><PrimaryNavigation store={store}/></div>
  {menu&&<nav id="mobile-menu" className="mobile-menu" aria-label="Más información" onKeyDown={e=>{if(e.key==='Escape'){setMenu(false);trigger.current?.focus()}}}><a href="#/contacto" onClick={()=>setMenu(false)}>Contacto</a><a href="#/preguntas" onClick={()=>setMenu(false)}>Preguntas frecuentes</a><a href="#/condiciones" onClick={()=>setMenu(false)}>Condiciones</a><a href="#/privacidad" onClick={()=>setMenu(false)}>Privacidad</a></nav>}
 </header>;
}
