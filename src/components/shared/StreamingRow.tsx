import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../catalog';
import { ServiceCard } from './ServiceCard';

export function StreamingRow({ products, desktop }: { products: Product[]; desktop: boolean }) {
  const row = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ overflow: false, start: true, end: false });

  useEffect(() => {
    const element = row.current;
    if (!element || !desktop) return;

    const update = () => {
      const remaining = element.scrollWidth - element.clientWidth - element.scrollLeft;
      setPosition({
        overflow: element.scrollWidth > element.clientWidth + 1,
        start: element.scrollLeft <= 1,
        end: remaining <= 1,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);
    element.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, [desktop, products.length]);

  function move(direction: number) {
    const element = row.current;
    const first = element?.firstElementChild;
    if (!element || !first) return;
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap || '0');
    element.scrollBy({
      left: direction * step,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <div className="streaming-carousel">
      <div
        ref={row}
        id="streaming-services"
        className="service-grid home-scroll-row home-service-row"
        role={desktop ? 'group' : undefined}
        aria-label={desktop ? 'Tarjetas de streaming' : undefined}
        tabIndex={desktop ? 0 : undefined}
      >
        {products.map(product => <ServiceCard key={product.id} product={product} compact />)}
      </div>
      {desktop && position.overflow && (
        <div className="streaming-scroll-controls">
          <button type="button" className="streaming-scroll-arrow previous" aria-label="Ver servicios anteriores" aria-controls="streaming-services" disabled={position.start} onClick={() => move(-1)}>
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="streaming-scroll-arrow next" aria-label="Ver más servicios" aria-controls="streaming-services" disabled={position.end} onClick={() => move(1)}>
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
