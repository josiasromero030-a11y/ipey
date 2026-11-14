import {ArrowRight,Diamond,Gamepad2,LayoutGrid,Play,Tag} from 'lucide-react';
import type {Store} from '../../hooks/useStore';

export function CategoryNavigationDesktop({store}:{store:Store}){return <nav className="categories-desktop" aria-label="Categorías"><strong>Explora por categoría</strong><div>{([
 ['/buscar','Todos',LayoutGrid],['/streaming','Streaming',Play],['/juegos','Juegos',Gamepad2],['/juegos','Recargas',Tag],['/producto/free-fire','Free Fire',Diamond],
] as const).map(([path,label,Icon],i)=><a className={i===0?'selected':undefined} href={`#${path}`} key={label} onClick={store.reset}><Icon size={18}/>{label}</a>)}</div><a className="catalog-link" href="#/buscar" onClick={store.reset}>Ver catálogo completo<ArrowRight size={19}/></a></nav>}
