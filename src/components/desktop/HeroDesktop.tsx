import { HeroCopy } from '../shared/HeroCopy';
import { PlatformPanels } from '../shared/PlatformPanels';

export function HeroDesktop() {
  return (
    <section className="hero-desktop" aria-labelledby="home-heading">
      <HeroCopy />
      <PlatformPanels />
    </section>
  );
}
