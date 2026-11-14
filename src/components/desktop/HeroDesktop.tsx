import {Gamepad2,Play} from 'lucide-react';
import type {Store} from '../../hooks/useStore';
import {PlatformPanels} from '../shared/PlatformPanels';
import {ArtworkBackground} from '../shared/ArtworkBackground';
import {visualAssets} from '../../data/visualAssets';

export function HeroDesktop({store}:{store:Store}){return <section className="hero-desktop" aria-labelledby="home-heading"><div className="hero-background"><ArtworkBackground src={visualAssets.hero} priority shade={false}/></div><div className="hero-copy"><p className="eyebrow">STREAMING · GAMING · RECARGAS</p><h1 id="home-heading">Entretenimiento digital,<br/><span>simple y rápido</span></h1><p className="hero-description">Explora tus plataformas de streaming favoritas y recargas de juegos en un solo lugar.</p><div className="hero-actions"><a className="button" href="#/streaming" onClick={store.reset}><Play size={19}/>Explorar servicios</a><a className="button secondary" href="#/juegos" onClick={store.reset}><Gamepad2 size={21}/>Ver recargas</a></div></div><PlatformPanels composition="desktop"/></section>}
