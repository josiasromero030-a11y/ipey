import {Gamepad2,Home,Play} from 'lucide-react';
import type {Store} from '../../hooks/useStore';

export type NavigationProps={store:Store};
export function PrimaryNavigation({store}:NavigationProps){
 return <nav className="primary-navigation" aria-label="Principal">{([
  ['/','Inicio',Home],['/streaming','Streaming',Play],['/juegos','Juegos',Gamepad2],
 ] as const).map(([path,label,Icon])=><a href={`#${path}`} key={path} onClick={store.reset} className={store.active===path?'active':undefined} aria-current={store.route===path?'page':store.active===path?'location':undefined}><Icon size={23} aria-hidden="true"/><span>{label}</span></a>)}</nav>;
}
