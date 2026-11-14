import {Mail} from 'lucide-react';
import {business} from '../../catalog';
import {whatsappUrl} from '../../commerce';
import {WhatsAppIcon} from '../../WhatsAppIcon';
import {Brand} from './Brand';
import type {Store} from '../../hooks/useStore';

export function FooterIdentity(){return <div className="footer-identity"><Brand/><p>Tu mundo digital. A tu manera.</p></div>}
export function FooterExplore({store,mobile=false}:{store:Store;mobile?:boolean}){return <div className="footer-column"><h3>Explora</h3><a href="#/streaming" onClick={store.reset}>Streaming</a><a href="#/juegos" onClick={store.reset}>Juegos</a><a href={mobile?'#/preguntas':'#/producto/free-fire'}>{mobile?'Preguntas frecuentes':'Free Fire'}</a></div>}
export function FooterHelp(){return <div className="footer-column"><h3>Ayuda</h3><a href="#/preguntas">Preguntas frecuentes</a><a href="#/preguntas">Cómo solicitar un servicio</a><a href="#/contacto">Contacto por WhatsApp</a></div>}
export function FooterLegal(){return <div className="footer-column"><h3>Legal</h3><a href="#/condiciones">Términos y condiciones</a><a href="#/privacidad">Política de privacidad</a></div>}
export function FooterContact(){const contact=whatsappUrl('Hola, quisiera información sobre el catálogo.');return <div className="footer-column footer-contact"><h3>Contáctanos</h3><a href={contact||'#/contacto'}><WhatsAppIcon size={20}/>WhatsApp</a><a href="#/contacto"><Mail size={19}/>Soporte y consultas</a></div>}
export function FooterCopyright(){return <span>© {new Date().getFullYear()} {business.name}. Comercio independiente.</span>}
export function TrademarkNote(){return <p className="trademark-note">Las marcas pertenecen a sus respectivos titulares. No se afirma afiliación ni autorización oficial. Iconos Disney+ y HBO Max: <a href="https://selfh.st/icons/" target="_blank" rel="noreferrer">selfh.st</a>, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>.</p>}
export function FooterBottom(){return <><div className="footer-bottom"><FooterCopyright/><div><a href="#/condiciones">Condiciones</a><a href="#/privacidad">Privacidad</a></div></div><TrademarkNote/></>}
