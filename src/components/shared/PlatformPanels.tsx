import {catalog} from '../../catalog';
import {ServiceIdentity} from './ServiceIdentity';

export function PlatformPanels({composition}:{composition:'desktop'|'mobile'}){
 return <div className={`platform-panels panels-${composition}`} aria-hidden="true">{catalog.filter(p=>p.active).map(p=><div className={`platform-panel panel-${p.id}`} key={p.id}><div className={`panel-illustration artwork artwork-${p.id}`}/><ServiceIdentity id={p.id} name={p.name} symbol={p.id==='netflix'&&composition==='mobile'}/></div>)}</div>;
}
