import {useState} from 'react';

const logos:Record<string,string>={netflix:'netflix.svg',disney:'disney-plus.svg',max:'hbo-max.svg',crunchyroll:'crunchyroll.svg',spotify:'spotify.svg'};

export function ProductIdentity({id,name}:{id:string;name:string}){
 const [failed,setFailed]=useState(false);
 if(id==='free-fire')return <span className="game-wordmark">Free Fire</span>;
 if(failed||!logos[id])return <span className="product-name-fallback">{name}</span>;
 return <img className={`product-logo logo-${id}`} src={`${import.meta.env.BASE_URL}logos/${logos[id]}`} alt={name} onError={()=>setFailed(true)}/>;
}
