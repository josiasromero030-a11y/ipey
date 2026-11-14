import {useRef} from 'react';
import {Search,X} from 'lucide-react';
import type {Store} from '../../hooks/useStore';

export function SearchDialog({store}:{store:Store}){
 const dialog=useRef<HTMLDialogElement>(null);
 return <><button className="icon-button search-toggle" aria-label="Abrir búsqueda" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}><Search size={24}/></button>
  <dialog className="search-dialog" ref={dialog} aria-labelledby="search-heading" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><div className="dialog-heading"><h2 id="search-heading">Busca tu próximo favorito</h2><button className="icon-button" aria-label="Cerrar búsqueda" onClick={()=>dialog.current?.close()}><X/></button></div>
   <form className="global-search" role="search" onSubmit={e=>{e.preventDefault();store.navigate('/buscar',false);dialog.current?.close()}}><Search size={20} aria-hidden="true"/><input autoFocus aria-label="Buscar en el catálogo" placeholder="Servicio, plataforma o juego…" value={store.query} onChange={e=>store.setQuery(e.target.value)}/><button className="button" type="submit">Buscar</button></form>
  </dialog>
 </>;
}
