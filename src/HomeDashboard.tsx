import {ArrowRight,Gamepad2,Play,Search,Layers,MessageCircle,ClipboardCheck,Diamond} from 'lucide-react';
import {catalog} from './catalog';
import {ProductIdentity} from './ProductIdentity';
import {ProductCard} from './ProductCard';
import {promotion,whatsappUrl} from './commerce';

const products=catalog.filter(p=>p.active);
const streaming=products.filter(p=>p.category==='streaming');
const game=products.find(p=>p.id==='free-fire');
const process=[
 {Icon:Search,title:'Consulta servicios',text:'Explora nuestro catálogo'},
 {Icon:Layers,title:'Compara modalidades',text:'Revisa opciones y condiciones'},
 {Icon:MessageCircle,title:'Atención por WhatsApp',text:whatsappUrl('Hola')?'Consulta antes de contratar':'Contacto pendiente de configurar'},
 {Icon:ClipboardCheck,title:'Revisa tu solicitud',text:'Confirma los detalles antes de enviar'},
];

export function HomeDashboard({onNavigate}:{onNavigate:()=>void}){
 return <div className="home-dashboard">
  <section className="home-hero" aria-labelledby="home-heading">
   <div className="home-hero-copy">
    <h1 id="home-heading">Streaming y juegos<br/>en <span>un solo lugar</span></h1>
    <p>Explora tus plataformas favoritas y recargas de videojuegos desde un solo lugar.</p>
    <div className="home-hero-actions"><a className="button" href="#/streaming" onClick={onNavigate}><Play size={19}/>Ver streaming</a><a className="button secondary" href="#/juegos" onClick={onNavigate}><Gamepad2 size={20}/>Ver juegos</a></div>
   </div>
   <div className="home-platforms" aria-hidden="true">{products.map(p=><div className={`home-platform platform-${p.id}`} key={p.id} style={{backgroundImage:`linear-gradient(#080d1480,#080d1460),url(${import.meta.env.BASE_URL}art/${p.id}.svg)`}}><ProductIdentity id={p.id} name={p.name}/>{p.category==='gaming'&&<span>{p.name}</span>}</div>)}</div>
  </section>
  <div className="home-process" aria-label="Cómo consultar y solicitar">{process.map(({Icon,title,text})=><div className="home-process-item" key={title}><Icon size={28} strokeWidth={1.5} aria-hidden="true"/><div><strong>{title}</strong><span>{text}</span></div></div>)}</div>
  <section className="home-streaming" aria-labelledby="streaming-heading">
   <div className="home-section-heading"><h2 id="streaming-heading">Servicios de streaming</h2><a href="#/streaming" onClick={onNavigate}>Ver todos <ArrowRight size={18}/></a></div>
   <div className="home-streaming-grid">{streaming.map(p=><ProductCard key={p.id} p={p} compact/>)}</div>
  </section>
  {game&&<section className="home-gaming" aria-labelledby="gaming-heading">
   <div className="home-section-heading"><h2 id="gaming-heading">Recargas de juegos</h2><a href="#/juegos" onClick={onNavigate}>Ver todos <ArrowRight size={18}/></a></div>
   <article className="home-game-banner product-card">
    <a className="home-game-art" href={`#/producto/${game.id}`} aria-label={`Ver ${game.name}`}><ProductIdentity id={game.id} name={game.name}/><span>{game.name}</span></a>
    <div className="home-game-copy"><h3>{game.name}</h3><p>{game.description}</p><a className="home-game-packages" href={`#/producto/${game.id}`}><Diamond size={18}/>Consultar paquetes de diamantes</a></div>
    <a className="home-game-action" href={`#/producto/${game.id}`} aria-label={`Ver paquetes de ${game.name}`}><ArrowRight size={24}/></a>
   </article>
  </section>}
  {products.some(promotion)&&<section aria-labelledby="home-offers-heading"><div className="home-section-heading"><h2 id="home-offers-heading">Ofertas del catálogo</h2></div><div className="home-streaming-grid">{products.filter(promotion).map(p=><ProductCard key={p.id} p={p} compact/>)}</div></section>}
 </div>;
}
