import {useEffect,useState} from 'react';

export function useMobileLayout(maxWidth=768){
 const query=`(max-width: ${maxWidth}px)`;
 const [mobile,setMobile]=useState(()=>window.matchMedia(query).matches);
 useEffect(()=>{
  const media=window.matchMedia(query);
  const update=()=>setMobile(media.matches);
  media.addEventListener('change',update);
  update();
  return()=>media.removeEventListener('change',update);
 },[query]);
 return mobile;
}
