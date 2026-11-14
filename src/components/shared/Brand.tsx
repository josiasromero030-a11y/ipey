import {business} from '../../catalog';

export function Brand(){
 return <a className="brand" href="#/" aria-label={`${business.name}, Inicio`}>
  <svg className="brand-symbol" width="34" height="40" viewBox="0 0 34 42" aria-hidden="true"><path fill="#008cff" d="M11 2 21 4 10 39 0 37Z"/><path fill="#00c7f3" d="m22 6 12 12-4 12-17 9 5-15 9-5-9-7Z"/></svg>
  <span>{business.name}</span>
 </a>;
}
