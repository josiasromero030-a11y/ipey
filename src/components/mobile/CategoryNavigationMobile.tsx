import {ChevronRight,Gamepad2,Play} from 'lucide-react';
import type {Store} from '../../hooks/useStore';
import {ArtworkBackground} from '../shared/ArtworkBackground';
import {visualAssets} from '../../data/visualAssets';

export function CategoryNavigationMobile({store}:{store:Store}){return <nav className="categories-mobile" aria-label="Categorías"><a href="#/streaming" onClick={store.reset}><ArtworkBackground src={visualAssets.categories.streaming}/><Play className="category-icon" size={29}/><div><strong>Streaming</strong><span>Películas, series y más</span></div><ChevronRight className="category-arrow" size={20}/></a><a href="#/juegos" onClick={store.reset}><ArtworkBackground src={visualAssets.categories.gaming}/><Gamepad2 className="category-icon" size={30}/><div><strong>Juegos</strong><span>Recargas y contenido gaming</span></div><ChevronRight className="category-arrow" size={20}/></a></nav>}
