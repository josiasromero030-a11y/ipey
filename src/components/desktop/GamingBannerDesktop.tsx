import type {Product} from '../../catalog';
import {GamingAction,GamingArtwork,GamingCopy} from '../shared/GamingContent';

export function GamingBannerDesktop({product}:{product:Product}){return <article className="product-card gaming-banner gaming-banner-desktop"><GamingArtwork product={product}/><GamingCopy product={product} desktop/><GamingAction product={product}/></article>}
