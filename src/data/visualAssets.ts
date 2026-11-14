import approvedVisuals from './approvedVisuals.json';

const asset = (path: string) => new URL(`${import.meta.env.BASE_URL}${path}`, document.baseURI).href;

export const visualAssets = {
  texture: asset('visual/assets/backgrounds/texture-sutil.webp'),
  categories: {
    streaming: asset('visual/assets/categories/streaming.webp'),
    gaming: asset('visual/assets/categories/juegos.webp'),
  },
};

type ApprovedVisual = (typeof approvedVisuals.catalog)[number];
const approvedById = new Map(approvedVisuals.catalog.map(entry => [entry.id, entry]));

export const heroPanels = approvedVisuals.heroOrder.map(id => {
  const { hero, tone } = approvedById.get(id)!;
  return { id, tone, art: asset(hero.art), focus: hero.focus };
});

export function serviceVisual(id: string) {
  const visual: ApprovedVisual | undefined = approvedById.get(id === 'max' ? 'hbo' : id);
  if (!visual) return undefined;

  return {
    art: asset(visual.service.art),
    mobileArt: visual.service.mobileArt ? asset(visual.service.mobileArt) : undefined,
    focus: visual.service.focus,
    logo: asset(visual.logo),
    tone: visual.tone,
  };
}
