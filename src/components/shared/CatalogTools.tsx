import { useRef, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { business } from '../../catalog';
import { emptyFilters, type Store } from '../../hooks/useStore';

export function CatalogTools({ store }: { store: Store }) {
  const { category, filters, query, setFilters, setQuery, setSort, sort } = store;
  const gaming = category === 'gaming';
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState({ filters, sort });
  const [expanded, setExpanded] = useState(false);

  const chips = [
    { key: 'category', text: filters.category === 'gaming' ? 'Juegos' : 'Streaming' },
    { key: 'availability', text: 'Disponibles' },
    { key: 'max', text: `Hasta ${filters.max} ${business.currency}` },
  ] as const;
  const activeChips = chips.filter(({ key }) => filters[key] && (key !== 'category' || !category));

  function openFilters() {
    setDraft({ filters, sort });
    dialog.current?.showModal();
    setExpanded(true);
  }

  function updateFilter(key: keyof typeof filters, value: string) {
    setDraft(current => ({ ...current, filters: { ...current.filters, [key]: value } }));
  }

  return (
    <div className="catalog-tools">
      <div className="catalog-search" role="search" aria-label="Buscar en esta sección">
        <label className="catalog-search-field">
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            aria-label={gaming ? 'Buscar juegos' : 'Buscar servicios'}
            placeholder={gaming ? 'Buscar un juego' : 'Buscar un servicio'}
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="catalog-filter-trigger"
          ref={trigger}
          onClick={openFilters}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          aria-controls="catalog-filter-dialog"
          aria-label={activeChips.length ? `Filtros (${activeChips.length} activos)` : 'Filtros'}
        >
          <Filter size={18} aria-hidden="true" />
          <span className="catalog-filter-label">Filtros</span>
          {activeChips.length > 0 && <span className="catalog-filter-count" aria-hidden="true">{activeChips.length}</span>}
        </button>
      </div>

      {activeChips.length > 0 && (
        <div className="catalog-filter-chips" role="group" aria-label="Filtros activos">
          {activeChips.map(({ key, text }) => (
            <button key={key} type="button" onClick={() => setFilters({ ...filters, [key]: '' })} aria-label={`Quitar filtro: ${text}`}>
              {text}<X size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      <dialog
        id="catalog-filter-dialog"
        className="catalog-filter-dialog"
        ref={dialog}
        aria-labelledby="catalog-filter-heading"
        onClose={() => {
          setExpanded(false);
          trigger.current?.focus();
        }}
      >
        <div className="catalog-filter-heading">
          <h2 id="catalog-filter-heading">Filtros</h2>
          <button type="button" className="icon-button" aria-label="Cerrar filtros" onClick={() => dialog.current?.close()}>
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={event => {
          event.preventDefault();
          setFilters(draft.filters);
          setSort(draft.sort);
          dialog.current?.close();
        }}>
          <div className="catalog-filter-fields">
            {!category && (
              <label>Categoría
                <select aria-label="Categoría" value={draft.filters.category} onChange={event => updateFilter('category', event.target.value)}>
                  <option value="">Todas las categorías</option>
                  <option value="streaming">Streaming</option>
                  <option value="gaming">Juegos</option>
                </select>
              </label>
            )}
            <label>Disponibilidad
              <select value={draft.filters.availability} onChange={event => updateFilter('availability', event.target.value)}>
                <option value="">Toda disponibilidad</option>
                <option value="yes">Disponibles</option>
              </select>
            </label>
            <label>Precio máximo ({business.currency})
              <input type="number" inputMode="decimal" min="0" step="any" placeholder="Sin límite" value={draft.filters.max} onChange={event => updateFilter('max', event.target.value)} />
            </label>
            <label>Ordenar
              <select value={draft.sort} onChange={event => setDraft(current => ({ ...current, sort: event.target.value }))}>
                <option value="name">Nombre A–Z</option>
                <option value="asc">Menor precio</option>
                <option value="desc">Mayor precio</option>
              </select>
            </label>
          </div>
          <div className="catalog-filter-actions">
            <button type="button" className="button secondary" onClick={() => setDraft({ filters: emptyFilters, sort: 'name' })}>Limpiar</button>
            <button type="submit" className="button">Aplicar filtros</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
