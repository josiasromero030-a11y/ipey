import { ArrowRight } from 'lucide-react';
import type { Product } from '../../catalog';
import { money, promotion, purchasable } from '../../commerce';
import { ServiceArtwork } from './ServiceArtwork';

export function ServiceCard({
  product, horizontal = false, compact = false,
}: {
  product: Product;
  horizontal?: boolean;
  compact?: boolean;
}) {
  const prices = product.variants.filter(variant => purchasable(product, variant)).map(variant => variant.price!);
  const lowestPrice = prices.length ? Math.min(...prices) : null;
  const price = money(lowestPrice);
  const href = `#/producto/${product.id}`;
  const action = `${product.category === 'gaming' ? 'Ver paquetes' : 'Ver planes'} de ${product.name}`;
  const className = `product-card service-card service-card-${product.id}`;
  const coverClass = `service-cover artwork artwork-${product.id}`;
  const artwork = (
    <>
      <ServiceArtwork id={product.id} name={product.name} />
      {promotion(product) && <span className="offer-badge">Oferta activa</span>}
    </>
  );

  if (compact) {
    const priceId = `compact-price-${product.id}`;
    return (
      <article className={`${className} service-card-compact`}>
        <a className="compact-service-link" href={href} aria-label={action} aria-describedby={priceId}>
          <div className={coverClass}>{artwork}</div>
          <div className="compact-service-details">
            <h3>{product.name}</h3>
            <span id={priceId} className="compact-service-price">
              {lowestPrice !== null && <small>Desde </small>}{price}
            </span>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article className={`${className}${horizontal ? ' service-card-wide' : ''}`}>
      <a className={coverClass} href={href} aria-label={`Ver ${product.name}`}>{artwork}</a>
      <div className="service-card-body">
        <div className="service-card-copy">
          <h3><a href={href}>{product.name}</a></h3>
          <p>{product.variants.length} {product.category === 'gaming' ? 'paquetes por ID' : 'modalidades'}</p>
        </div>
        <span className={lowestPrice === null ? 'service-price pending' : 'service-price'}>
          {lowestPrice !== null && <small>Desde</small>}{price}
        </span>
        <a className="card-action" href={href} aria-label={action}><ArrowRight size={21} /></a>
      </div>
    </article>
  );
}
