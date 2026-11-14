import {business} from '../catalog';
import {whatsappUrl} from '../commerce';
import {Faq} from '../components/shared/Faq';

export function InformationPage({route}:{route:string}){
 const contact=whatsappUrl('Hola, quisiera información sobre el catálogo.');
 const title=route==='/condiciones'?'Condiciones':route==='/privacidad'?'Privacidad':route==='/contacto'?'Contacto':route==='/preguntas'?'Ayuda':'Página no encontrada';
 return <section className="information-page"><p className="eyebrow">INFORMACIÓN DE IPEY</p><h1>{title}</h1>{route==='/preguntas'?<Faq/>:<p className="lead">{route==='/condiciones'?business.terms:route==='/privacidad'?business.privacy:route==='/contacto'?business.contact:'La página que buscas no está disponible.'}</p>}
  {route==='/contacto'&&(contact?<a className="button" href={contact} target="_blank" rel="noreferrer">Abrir WhatsApp</a>:<p className="notice">WhatsApp pendiente de configuración. Las solicitudes todavía no están habilitadas.</p>)}
  {!['/condiciones','/privacidad','/contacto','/preguntas'].includes(route)&&<a className="button" href="#/">Volver al inicio</a>}
 </section>;
}
