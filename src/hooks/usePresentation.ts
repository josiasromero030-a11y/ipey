import {useEffect,useState} from 'react';

/** The structures switch together; tablet uses the mobile composition with its own spacing. */
export function usePresentation(){
 const [compact,setCompact]=useState(()=>matchMedia('(max-width: 1023px)').matches);
 useEffect(()=>{
  const media=matchMedia('(max-width: 1023px)');
  const update=()=>setCompact(media.matches);
  media.addEventListener('change',update);
  return()=>media.removeEventListener('change',update);
 },[]);
 return compact?'mobile':'desktop';
}
