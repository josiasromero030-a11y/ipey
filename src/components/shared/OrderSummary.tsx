import type {RefObject} from 'react';
import {MessageCircle,X} from 'lucide-react';
import {whatsappUrl} from '../../commerce';

export function OrderSummary({dialog,message,onCancel}:{dialog:RefObject<HTMLDialogElement|null>;message:string;onCancel:()=>void}){
 const link=message?whatsappUrl(message):null;
 return <dialog className="order-dialog" ref={dialog} aria-labelledby="order-heading" onCancel={onCancel}><div className="dialog-heading"><h2 id="order-heading">Revisa tu solicitud</h2><button className="icon-button" aria-label="Cerrar resumen" onClick={()=>dialog.current?.close()}><X/></button></div><pre>{message}</pre><p>Confirma que todos los datos son correctos antes de continuar.</p>{link?<a className="button full" href={link} target="_blank" rel="noreferrer"><MessageCircle size={18}/>Continuar a WhatsApp</a>:<p className="notice">WhatsApp pendiente de configuración. No se puede enviar la solicitud todavía.</p>}<small>WhatsApp abrirá un mensaje redactado. Tú decides cuándo enviarlo.</small></dialog>;
}
