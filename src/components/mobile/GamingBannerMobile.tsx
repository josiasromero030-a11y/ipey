import type {Product} from '../../catalog';
import {GamingAction,GamingArtwork,GamingCopy} from '../shared/GamingContent';

export function GamingBannerMobile({product}:{product:Product}){return <article className="product-card gaming-banner gaming-banner-mobile"><GamingArtwork product={product}/><div className="gaming-mobile-content"><GamingCopy product={product}/><GamingAction product={product}/></div></article>}
