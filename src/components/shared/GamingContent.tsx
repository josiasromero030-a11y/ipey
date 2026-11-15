import { Gem, MoveRight } from 'lucide-react';
import type { Product } from '../../catalog';
import { ServiceArtwork } from './ServiceArtwork';

export function GamingArtwork({ product }: { product: Product }) {
  return (
    <a className="gaming-artwork artwork artwork-free-fire" href={`#/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
      <ServiceArtwork id={product.id} name={product.name} />
    </a>
  );
}

export function GamingCopy({ product, desktop = false }: { product: Product; desktop?: boolean }) {
  return (
    <div className="gaming-copy">
      <h3>{desktop ? 'Recargas de ' : ''}{product.name}</h3>
      <p>{product.description}</p>
      {desktop && (
        <div className="gaming-facts">
          <span><Gem size={17} aria-hidden="true" />Diamantes</span>
          <span>{product.variants.length} paquetes por ID</span>
        </div>
      )}
    </div>
  );
}

export function GamingAction({ product }: { product: Product }) {
  return (
    <a className="button gaming-action" href={`#/producto/${product.id}`} aria-label={`Ver paquetes de ${product.name}`}>
      <Gem className="gaming-action-icon" size={18} aria-hidden="true" />
      Ver paquetes
      <MoveRight size={20} aria-hidden="true" />
    </a>
  );
}
