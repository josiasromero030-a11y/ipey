/** Artwork and contrast are separate from logos and interactive HTML. */
export function ArtworkBackground({src,priority=false,shade=true}:{src:string;priority?:boolean;shade?:boolean}){
 return <><img className="visual-background ipey-cover__background" src={src} alt="" aria-hidden="true" draggable="false" decoding="async" fetchPriority={priority?'high':undefined}/>{shade&&<span className="visual-shade ipey-cover__shade" aria-hidden="true"/>}</>;
}
