/** Presentation-only mapping from the user's v3 manifest; commerce stays in catalog.ts. */
const asset=(path:string)=>new URL(`${import.meta.env.BASE_URL}visual/assets/${path}`,document.baseURI).href;
const coverFiles:Record<string,string>={netflix:'netflix',disney:'disney',max:'hbo-max',crunchyroll:'crunchyroll',spotify:'spotify','free-fire':'free-fire'};
export const visualAssets={
 hero:asset('backgrounds/hero-base.webp'),
 texture:asset('backgrounds/texture-sutil.webp'),
 freeFireBanner:asset('banners/free-fire-banner.webp'),
 categories:{streaming:asset('categories/streaming.webp'),gaming:asset('categories/juegos.webp')},
};
export function serviceCover(id:string){return coverFiles[id]?asset(`covers/${coverFiles[id]}.webp`):visualAssets.hero}
