import {useState} from 'react';
import {ProductIdentity} from '../../ProductIdentity';

export function ServiceIdentity({id,name,symbol=false}:{id:string;name:string;symbol?:boolean}){
 const [failed,setFailed]=useState(false);
 if(!symbol&&!failed&&(id==='netflix'||id==='spotify'))return <img className={`service-wordmark wordmark-${id}`} src={`${import.meta.env.BASE_URL}logos/home/${id}.svg`} alt={name} onError={()=>setFailed(true)}/>;
 return <span className={`service-identity identity-${id}`}><ProductIdentity id={id} name={name}/></span>;
}
