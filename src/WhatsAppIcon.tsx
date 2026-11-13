export function WhatsAppIcon({size=27}:{size?:number;strokeWidth?:number}){
 return <img className="whatsapp-icon" src={`${import.meta.env.BASE_URL}logos/home/whatsapp.svg`} width={size} height={size} alt="" aria-hidden="true"/>;
}
