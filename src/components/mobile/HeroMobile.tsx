import { HeroCopy } from '../shared/HeroCopy';
import { PlatformPanels } from '../shared/PlatformPanels';

export function HeroMobile() {
  return (
    <section className="hero-mobile" aria-labelledby="home-heading">
      <PlatformPanels />
      <HeroCopy />
    </section>
  );
}
