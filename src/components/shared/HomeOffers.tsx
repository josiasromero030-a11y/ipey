import type { Product } from '../../catalog';
import { money, promotionalVariants } from '../../commerce';
import { heroPanels, serviceVisual } from '../../data/visualAssets';
import { ArtworkBackground } from './ArtworkBackground';

const freeFireArt = heroPanels.find(panel => panel.id === 'free-fire')?.art;

export function HomeOffers({ products }: { products: Product[] }) {
  const offers = products.flatMap(product => promotionalVariants(product).map(variant => ({ product, variant })));
  if (!offers.length) return null;
  const scrollable = offers.length > 1;

  return (
    <section className="home-offers" aria-labelledby="offers-heading">
      <div className="section-heading"><h2 id="offers-heading">Ofertas</h2></div>
      <div className={`offer-row${scrollable ? ' home-scroll-row' : ''}`} tabIndex={scrollable ? 0 : undefined} role={scrollable ? "group" : undefined} aria-label={scrollable ? "Promociones disponibles" : undefined}>
        {offers.map(({ product, variant }) => {
          const art = product.id === 'free-fire' ? freeFireArt : serviceVisual(product.id)?.art;

          return (
            <article className="home-offer" key={`${product.id}/${variant.id}`}>
              {art && <ArtworkBackground src={art} />}
              <div className="home-offer-copy">
                <h3>{product.name}</h3>
                <p>{variant.name}</p>
                <p className="home-offer-prices">
                  <s aria-label="Precio anterior">{money(variant.previousPrice!)}</s>
                  <strong aria-label="Precio de oferta">{money(variant.price)}</strong>
                </p>
                <a href={`#/producto/${product.id}`} className="button secondary">Ver oferta</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
