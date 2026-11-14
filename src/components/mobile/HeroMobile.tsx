import {Gamepad2,Play} from 'lucide-react';
import type {Store} from '../../hooks/useStore';
import {PlatformPanels} from '../shared/PlatformPanels';

export function HeroMobile({store}:{store:Store}){return <section className="hero-mobile" aria-labelledby="home-heading"><div className="hero-copy"><h1 id="home-heading">Todo tu<br/>{' '}entretenimiento<br/><span>digital</span></h1><p className="hero-description">Streaming, planes y recargas gaming en un solo lugar.</p><div className="hero-actions"><a className="button" href="#/streaming" onClick={store.reset}><Play size={19}/>Streaming</a><a className="button secondary" href="#/juegos" onClick={store.reset}><Gamepad2 size={21}/>Juegos</a></div></div><PlatformPanels composition="mobile"/></section>}
