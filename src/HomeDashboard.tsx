import {useState,type CSSProperties} from 'react';
import {ArrowRight,Gamepad2,Play,Zap,Layers,ShieldCheck,Diamond} from 'lucide-react';
import {catalog,type Product} from './catalog';
import {ProductIdentity} from './ProductIdentity';
import {WhatsAppIcon} from './WhatsAppIcon';
import {useMobileLayout} from './useMobileLayout';
import {money,purchasable,promotion,whatsappUrl} from './commerce';

const products=catalog.filter(p=>p.active);
const streaming=products.filter(p=>p.category==='streaming');
const game=products.find(p=>p.id==='free-fire');
const atlas=new URL(`${import.meta.env.BASE_URL}art/home/editorial-atlas.webp`,document.baseURI).href;
const compactAtlas=new URL(`${import.meta.env.BASE_URL}art/home/editorial-mobile.webp`,document.baseURI).href;
export const homeArtworkStyle={'--home-art':`url(${atlas})`} as CSSProperties;
export function getHomeArtworkStyle(compact:boolean){return compact?{'--home-art':`url(${compactAtlas})`} as CSSProperties:homeArtworkStyle;}
const process=[
 {Icon:Zap,title:'Consulta servicios',text:'Explora nuestro catálogo'},
 {Icon:Layers,title:'Compara modalidades',text:'Revisa opciones y condiciones'},
 {Icon:WhatsAppIcon,title:'Atención por WhatsApp',text:whatsappUrl('Hola')?'Consulta antes de contratar':'Contacto pendiente de configurar'},
 {Icon:ShieldCheck,title:'Revisa tu solicitud',text:'Confirma los detalles antes de enviar'},
];

// Only Inicio uses these wordmarks. Existing product identities stay unchanged elsewhere.
function HomeIdentity({p,cover=false}:{p:Product;cover?:boolean}){
 const [failed,setFailed]=useState(false);
 if(p.id==='free-fire')return <span className="home-game-name">Free Fire</span>;
 if(cover&&!failed&&['netflix','spotify'].includes(p.id))return <img className={`home-wordmark wordmark-${p.id}`} src={`${import.meta.env.BASE_URL}logos/home/${p.id}.svg`} alt={p.name} onError={()=>setFailed(true)}/>;
 return <div className={`home-identity identity-${p.id}`}><ProductIdentity id={p.id} name={p.name}/>{p.id==='crunchyroll'&&<span className="home-service-name">Crunchyroll</span>}</div>;
}

export function HomeServiceCard({p}:{p:Product}){
 const prices=p.variants.filter(v=>purchasable(p,v)).map(v=>v.price!);
 const action=p.category==='gaming'?'Ver paquetes':'Ver planes';
 return <article className="product-card home-service-card">
  <a className={`home-cover art-${p.id}`} href={`#/producto/${p.id}`} aria-label={`Ver ${p.name}`}>
   <HomeIdentity p={p} cover/>
   {promotion(p)&&<span className="home-offer">Oferta activa</span>}
  </a>
  <div className="home-card-details"><h3><a href={`#/producto/${p.id}`}>{p.name}</a></h3>
   <p><span>{p.variants.length} modalidades</span><span>{prices.length?`Desde ${money(Math.min(...prices))}`:'Precio por definir'}</span></p>
   <a className="home-card-action" href={`#/producto/${p.id}`} aria-label={`${action} de ${p.name}`}><span className="home-card-action-label">{action}</span><ArrowRight size={19}/></a>
  </div>
 </article>;
}

function ProcessStrip(){
 return <div className="home-process" aria-label="Cómo consultar y solicitar">{process.map(({Icon,title,text})=><div className="home-process-item" key={title}><Icon size={32} strokeWidth={1.5} aria-hidden="true"/><div><strong>{title}</strong><span>{text}</span></div></div>)}</div>;
}

export function HomeDashboard({onNavigate,mobile=false}:{onNavigate:()=>void;mobile?:boolean}){
 const [slide,setSlide]=useState(0);
 const compact=useMobileLayout(480);
 const slides=[
  {title:<>Streaming y juegos<br/>en <span>un solo lugar</span></>,description:'Explora tus plataformas favoritas y recargas de videojuegos desde un solo lugar.',primary:'/streaming',label:'Ver streaming',secondary:'/juegos',secondaryLabel:'Ver juegos'},
  {title:<>Tus historias y música<br/>en <span>un solo lugar</span></>,description:'Explora las modalidades de Netflix, Disney+, HBO Max, Crunchyroll y Spotify.',primary:'/streaming',label:'Ver streaming',secondary:'/buscar',secondaryLabel:'Explorar catálogo'},
  {title:<>Tu próxima partida<br/><span>empieza aquí</span></>,description:game?.description||'Explora los juegos del catálogo.',primary:'/producto/free-fire',label:'Ver paquetes',secondary:'/juegos',secondaryLabel:'Ver juegos'},
 ];
 const active=slides[mobile?0:slide];
 return <div className="home-dashboard" style={getHomeArtworkStyle(mobile&&compact)}>
  <section className={`home-hero home-slide-${slide}`} aria-labelledby="home-heading" aria-roledescription={mobile?undefined:'carrusel'}>
   <div className="home-hero-copy">
    {mobile&&<div className="mobile-hero-kicker"><span>STREAMING Y GAMING</span><div aria-hidden="true"><ProductIdentity id="netflix" name="Netflix"/><Gamepad2 size={24}/></div></div>}
    <h1 id="home-heading">{active.title}</h1>
    <p>{active.description}</p>
    <div className="home-hero-actions"><a className="button" href={`#${active.primary}`} onClick={onNavigate}><Play size={19}/>{active.label}</a><a className="button secondary" href={`#${active.secondary}`} onClick={onNavigate}><Gamepad2 size={20}/>{active.secondaryLabel}</a></div>
   </div>
   {!mobile&&<div className="home-platforms" aria-hidden="true">{products.map((p,i)=><div className={`home-platform platform-${p.id}`} key={p.id} style={{'--layer':i} as CSSProperties}><div className={`home-panel-art art-${p.id}`}/><HomeIdentity p={p}/></div>)}</div>}
   {!mobile&&<div className="home-slide-controls" aria-label="Diapositivas del banner">{slides.map((_,i)=><button key={i} aria-label={`Ver diapositiva ${i+1}`} aria-pressed={slide===i} onClick={()=>setSlide(i)}/>)}</div>}
  </section>
  {!mobile&&<ProcessStrip/>}
  {mobile&&<nav className="mobile-categories" aria-label="Categorías"><a href="#/streaming" onClick={onNavigate}><Play size={22}/><span>Streaming</span><ArrowRight size={17}/></a><a href="#/juegos" onClick={onNavigate}><Gamepad2 size={24}/><span>Juegos</span><ArrowRight size={17}/></a></nav>}
  <section className="home-streaming" aria-labelledby="streaming-heading">
   <div className="home-section-heading"><h2 id="streaming-heading">Servicios de streaming</h2><a href="#/streaming" onClick={onNavigate}>Ver todos <ArrowRight size={19}/></a></div>
   <div className="home-streaming-grid">{streaming.map(p=><HomeServiceCard key={p.id} p={p}/>)}</div>
  </section>
  {game&&<section className="home-gaming" aria-labelledby="gaming-heading">
   <div className="home-section-heading"><h2 id="gaming-heading">Recargas de juegos</h2><a href="#/juegos" onClick={onNavigate}>Ver todos <ArrowRight size={19}/></a></div>
   <article className="home-game-banner product-card">
    <a className="home-game-art" href={`#/producto/${game.id}`} aria-label={`Ver ${game.name}`}>
     <img className="home-game-scene" src={mobile&&compact?compactAtlas:atlas} alt="Ilustración original de un explorador en un paisaje de aventura"/>
     <HomeIdentity p={game}/>
    </a>
    <div className="home-game-copy"><h3>{game.name}</h3><p>{game.description}</p><a className="home-game-packages" href={`#/producto/${game.id}`}><Diamond size={19}/>Consultar paquetes de diamantes</a></div>
    <a className="home-game-action" href={`#/producto/${game.id}`} aria-label={`Ver paquetes de ${game.name}`}><span>Ver paquetes</span><ArrowRight size={22}/></a>
   </article>
  </section>}
  {mobile&&<ProcessStrip/>}
  {products.some(promotion)&&<section aria-labelledby="home-offers-heading"><div className="home-section-heading"><h2 id="home-offers-heading">Ofertas del catálogo</h2></div><div className="home-streaming-grid">{products.filter(promotion).map(p=><HomeServiceCard key={p.id} p={p}/>)}</div></section>}
 </div>;
}
