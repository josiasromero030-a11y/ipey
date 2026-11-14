import {useEffect} from 'react';
import {business} from './catalog';
import {usePresentation} from './hooks/usePresentation';
import {useStore} from './hooks/useStore';
import {StoreLayout} from './layouts/StoreLayout';
import {HomePage} from './pages/HomePage';
import {CatalogPage} from './pages/CatalogPage';
import {DetailPage} from './pages/DetailPage';
import {InformationPage} from './pages/InformationPage';

export function App(){
 const store=useStore();
 const presentation=usePresentation();
 const mobile=presentation==='mobile';
 const title=store.current?.name||(store.category==='streaming'?'Streaming':store.category==='gaming'?'Juegos':store.route==='/buscar'?'Buscar':store.route==='/condiciones'?'Condiciones':store.route==='/privacidad'?'Privacidad':store.route==='/contacto'?'Contacto':store.route==='/preguntas'?'Ayuda':'Inicio');
 useEffect(()=>{document.title=`${title} · ${business.name}`},[title]);
 return <><a className="skip-link" href="#contenido" onClick={e=>{e.preventDefault();document.getElementById('contenido')?.focus();document.getElementById('contenido')?.scrollIntoView()}}>Saltar al contenido</a><StoreLayout store={store} presentation={presentation}>{store.route==='/'?<HomePage store={store} presentation={presentation}/>:store.current?<DetailPage key={store.current.id} product={store.current} mobile={mobile}/>:store.category||store.route==='/buscar'?<CatalogPage store={store} mobile={mobile}/>:<InformationPage route={store.route}/>}</StoreLayout></>;
}
