import {ChevronRight,Gamepad2,Play} from 'lucide-react';
import type {Store} from '../../hooks/useStore';
import {CategoryArtwork} from './CategoryArtwork';

export function CategoryNavigationMobile({store}:{store:Store}){return <nav className="categories-mobile" aria-label="Categorías"><a href="#/streaming" onClick={store.reset}><Play className="category-icon" size={29}/><div><strong>Streaming</strong><span>Películas, series y más</span></div><CategoryArtwork/><ChevronRight className="category-arrow" size={20}/></a><a href="#/juegos" onClick={store.reset}><Gamepad2 className="category-icon" size={30}/><div><strong>Juegos</strong><span>Recargas y contenido gaming</span></div><CategoryArtwork gaming/><ChevronRight className="category-arrow" size={20}/></a></nav>}
