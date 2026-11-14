import {catalog} from '../../catalog';
import {ServiceIdentity} from './ServiceIdentity';
import {ArtworkBackground} from './ArtworkBackground';
import {serviceCover} from '../../data/visualAssets';

export function PlatformPanels({composition}:{composition:'desktop'|'mobile'}){
 return <div className={`platform-panels panels-${composition}`} aria-hidden="true">{catalog.filter(p=>p.active).map(p=><div className={`platform-panel panel-${p.id}`} key={p.id}><div className={`panel-illustration artwork artwork-${p.id}`}><ArtworkBackground src={serviceCover(p.id)}/></div><ServiceIdentity id={p.id} name={p.name} symbol={p.id==='netflix'&&composition==='mobile'}/></div>)}</div>;
}
