import {Layers,ShieldCheck,Zap} from 'lucide-react';
import {WhatsAppIcon} from '../../WhatsAppIcon';

const items=[
 {Icon:Zap,title:'Consulta servicios',text:'Explora el catálogo'},
 {Icon:ShieldCheck,title:'Revisa condiciones',text:'Consulta cada modalidad'},
 {Icon:WhatsAppIcon,title:'Atención por WhatsApp',text:'Contacto según configuración'},
 {Icon:Layers,title:'Compara modalidades',text:'Elige una opción'},
];
export function ProcessStrip(){return <section className="process-strip" aria-label="Cómo consultar y solicitar">{items.map(({Icon,title,text})=><div className="process-item" key={title}><Icon size={31} aria-hidden="true"/><div><strong>{title}</strong><span>{text}</span></div></div>)}</section>}
