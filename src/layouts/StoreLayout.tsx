import type {ReactNode} from 'react';
import type {Store} from '../hooks/useStore';
import {visualAssets} from '../data/visualAssets';
import {HeaderDesktop} from '../components/desktop/HeaderDesktop';
import {FooterDesktop} from '../components/desktop/FooterDesktop';
import {HeaderMobile} from '../components/mobile/HeaderMobile';
import {FooterMobile} from '../components/mobile/FooterMobile';

/** Keep main mounted when orientation changes, preserving selected plans and player IDs. */
export function StoreLayout({store,presentation,children}:{store:Store;presentation:'desktop'|'mobile';children:ReactNode}){
 const desktop=presentation==='desktop';
 return <div className={`storefront ${presentation}-layout`}>
  <img className="store-texture" src={visualAssets.texture} alt="" aria-hidden="true"/>
  {desktop?<HeaderDesktop store={store}/>:<HeaderMobile store={store}/>}
  <main id="contenido" tabIndex={-1} className="shell">{children}</main>
  {desktop?<FooterDesktop store={store}/>:<FooterMobile store={store}/>}
 </div>;
}
