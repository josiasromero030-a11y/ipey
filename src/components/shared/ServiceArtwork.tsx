import type { CSSProperties } from 'react';
import { serviceVisual } from '../../data/visualAssets';
import { ArtworkBackground } from './ArtworkBackground';
import { ServiceIdentity } from './ServiceIdentity';

export function ServiceArtwork({ id, name }: { id: string; name: string }) {
  const visual = serviceVisual(id);
  if (!visual) return <ServiceIdentity name={name} />;

  return (
    <span className="service-artwork" style={{ '--focus': visual.focus, '--tone': visual.tone } as CSSProperties}>
      <ArtworkBackground src={visual.art} mobileSrc={visual.mobileArt} />
      <ServiceIdentity name={name} logo={visual.logo} />
    </span>
  );
}
