import type { CSSProperties } from 'react';
import { heroPanels } from '../../data/visualAssets';
import { ArtworkBackground } from './ArtworkBackground';

export function PlatformPanels({ composition }: { composition: 'desktop' | 'mobile' }) {
  const scrollable = composition === 'mobile';

  return (
    <div
      className="hero-gallery"
      role={scrollable ? 'region' : undefined}
      aria-label={scrollable ? 'Galería del hero' : undefined}
      tabIndex={scrollable ? 0 : undefined}
    >
      <div className="platform-panels" aria-hidden="true">
        {heroPanels.map(({ id, art, focus, tone }, index) => (
          <div
            className={`platform-panel panel-${id}`}
            key={id}
            style={{ '--panel': index + 1, '--tone': tone, '--focus': focus } as CSSProperties}
          >
            <ArtworkBackground src={art} priority shade={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
