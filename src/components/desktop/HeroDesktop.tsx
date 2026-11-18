import {Gamepad2,TvMinimalPlay} from 'lucide-react';
import type {Store} from '../../hooks/useStore';
import {PlatformPanels} from '../shared/PlatformPanels';

export function HeroDesktop({store}:{store:Store}){return <section className="hero-desktop" aria-labelledby="home-heading"><div className="hero-copy"><p className="eyebrow">STREAMING · GAMING · RECARGAS</p><h1 id="home-heading">Entretenimiento digital,<br/><span>simple y rápido</span></h1><p className="hero-description">Explora tus plataformas de streaming favoritas y recargas de juegos en un solo lugar.</p><div className="hero-actions"><a className="button" href="#/streaming" onClick={store.reset}><TvMinimalPlay size={19} aria-hidden="true"/>Explorar servicios</a><a className="button secondary" href="#/juegos" onClick={store.reset}><Gamepad2 size={21}/>Ver recargas</a></div></div><PlatformPanels/></section>}
