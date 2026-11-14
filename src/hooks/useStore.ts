import {useEffect,useState} from 'react';
import {catalog,type Product} from '../catalog';
import {purchasable} from '../commerce';

export type Filters={selected:string;duration:string;availability:string;max:string};
const emptyFilters:Filters={selected:'',duration:'',availability:'',max:''};

export function useStore(){
 const [route,setRoute]=useState(location.hash.slice(1)||'/');
 const [query,setQuery]=useState('');
 const [filters,setFilters]=useState<Filters>({...emptyFilters});
 const [sort,setSort]=useState('name');
 useEffect(()=>{
  const update=()=>{setRoute(location.hash.slice(1)||'/');window.scrollTo(0,0)};
  addEventListener('hashchange',update);
  return()=>removeEventListener('hashchange',update);
 },[]);
 const products=catalog.filter(p=>p.active);
 const category=route==='/streaming'?'streaming':route==='/juegos'?'gaming':null;
 const current=route.startsWith('/producto/')?products.find(p=>p.id===route.split('/')[2]):undefined;
 const {selected,duration,availability,max}=filters;
 // The existing filtering and price-ordering rules are shared by both presentations.
 const filtered=products.filter(p=>(!category||p.category===category)&&(!query||`${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()))&&(!selected||p.id===selected)&&(!duration||p.variants.some(v=>v.duration===Number(duration)))&&(!availability||p.variants.some(v=>purchasable(p,v)))&&(!max||p.variants.some(v=>v.price!==null&&v.price<=Number(max)))).sort((a,b)=>{
  const price=(p:Product)=>Math.min(...p.variants.filter(v=>v.price!==null).map(v=>v.price!));
  return sort==='asc'?price(a)-price(b)||a.name.localeCompare(b.name):sort==='desc'?price(b)-price(a)||a.name.localeCompare(b.name):a.name.localeCompare(b.name);
 });
 const reset=()=>{setQuery('');setFilters({...emptyFilters});setSort('name')};
 const navigate=(path:string,clear=true)=>{if(clear)reset();location.hash=path;if(route===path)window.scrollTo(0,0)};
 const active=route==='/'?'/':category==='streaming'||current?.category==='streaming'?'/streaming':category==='gaming'||current?.category==='gaming'?'/juegos':null;
 return {route,query,setQuery,filters,setFilters,sort,setSort,products,category,current,filtered,reset,navigate,active};
}
export type Store=ReturnType<typeof useStore>;
