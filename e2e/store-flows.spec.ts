import {test,expect} from '@playwright/test';
import {demoCatalog,imagesReady} from './helpers';

test('categorías y las dos acciones del hero llevan a destinos reales',async({page},info)=>{
 const desktop=info.project.name==='desktop';
 const entries=desktop?[['Todos',6],['Streaming',5],['Juegos',1],['Recargas',1],['Free Fire',0]] as const:[['Streaming',5],['Juegos',1]] as const;
 for(const [name,count] of entries){
  await page.goto('/');
  await page.getByRole('navigation',{name:'Categorías',exact:true}).getByRole('link',{name:desktop?name:new RegExp('^'+name),exact:desktop}).click();
  if(name==='Free Fire')await expect(page.getByRole('heading',{level:1,name:'Free Fire',exact:true})).toBeVisible();
  else await expect(page.locator('.product-card')).toHaveCount(count);
 }
 for(const index of [0,1]){
  await page.goto('/');await page.locator('.hero-actions a').nth(index).click();
  await expect(page.locator('.product-card')).toHaveCount(index===0?5:1);
 }
});

test('catálogo único y enlaces reales a los seis productos',async({page})=>{
 await page.goto('/');await imagesReady(page);
 const streaming=page.getByRole('region',{name:'Servicios de streaming',exact:true});
 await expect(streaming.locator('h3')).toHaveText(['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']);
 await expect(page.locator('.product-card')).toHaveCount(6);
 for(const name of ['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']){
  await streaming.getByRole('link',{name:`Ver planes de ${name}`,exact:true}).click();
  await expect(page.getByRole('heading',{level:1,name,exact:true})).toBeVisible();
  await expect(page.getByRole('radio')).toHaveCount(2);
  await page.goto('/');
 }
 await page.getByRole('link',{name:'Ver paquetes de Free Fire',exact:true}).click();
 await expect(page.getByRole('heading',{level:1,name:'Free Fire',exact:true})).toBeVisible();
 await expect(page.getByRole('radio')).toHaveCount(5);
});

test('búsqueda, disponibilidad y limpieza conservan las reglas del catálogo',async({page},info)=>{
 await page.goto('/#/streaming');
 await page.getByRole('searchbox',{name:'Buscar servicios',exact:true}).fill('Spotify');
 await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByRole('link',{name:'Ver planes de Spotify',exact:true}).click();
 await page.getByRole('radio').nth(1).check();
 await expect(page.getByRole('radio').nth(1)).toBeChecked();
 await expect(page.getByRole('button',{name:'Revisar solicitud'})).toHaveCount(0);
 await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
 await page.getByRole('navigation',{name:'Principal',exact:true}).getByRole('link',{name:'Streaming',exact:true}).click();
 if(info.project.name!=='desktop')await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await page.getByRole('combobox',{name:'Disponibilidad',exact:true}).selectOption('yes');
 if(info.project.name!=='desktop')await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.getByRole('heading',{name:'No encontramos resultados',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Mostrar todo',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.goto('/#/juegos');await page.reload();
 await expect(page.locator('.product-card')).toHaveCount(1);
});

test('buscador del encabezado y navegación activa',async({page},info)=>{
 await page.goto('/');
 if(info.project.name!=='desktop')await page.getByRole('button',{name:'Abrir búsqueda',exact:true}).click();
 await page.getByRole('textbox',{name:'Buscar en el catálogo',exact:true}).fill('Netflix');
 await page.getByRole('textbox',{name:'Buscar en el catálogo',exact:true}).press('Enter');
 await expect(page.getByRole('heading',{level:1,name:'Buscar servicios',exact:true})).toBeVisible();
 await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByRole('link',{name:'Ver planes de Netflix',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'Principal',exact:true}).getByRole('link',{name:'Streaming',exact:true})).toHaveAttribute('aria-current','location');
});

test('logotipos cargados, imágenes locales y respaldo ante un recurso fallido',async({page})=>{
 await page.goto('/');await imagesReady(page);
 for(const name of ['Netflix','Disney+','HBO Max','Crunchyroll','Spotify'])await expect(page.locator('.product-card').getByRole('img',{name,exact:true})).toBeVisible();
 await page.goto('/#/producto/disney');
 await expect(page.locator('.detail-art').getByRole('img',{name:'Disney+',exact:true})).toBeVisible();
 await page.route('**/logos/netflix.svg',route=>route.abort());
 await page.goto('/#/producto/netflix');
 await expect(page.locator('.detail-art .product-name-fallback')).toHaveText('Netflix');
});

test('modalidad de Netflix seleccionada y resumen con datos aislados',async({page})=>{
 await demoCatalog(page);await page.goto('/#/producto/netflix');
 await page.getByRole('radio').nth(1).check();
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Revisa tu solicitud',exact:true});
 await expect(dialog).toBeVisible();
 await expect(dialog.locator('pre')).toContainText('Modalidad trimestral');
 await expect(dialog.locator('pre')).toContainText('Duración: 3 mes(es)');
 await expect(dialog.locator('pre')).not.toContainText('ID de jugador');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
});

test('recarga configurada valida el ID y genera el enlace de WhatsApp sin enviarlo',async({page})=>{
 await demoCatalog(page);await page.goto('/#/producto/free-fire');
 const input=page.getByRole('textbox',{name:'ID de jugador',exact:true});
 await expect(input).toHaveAttribute('inputmode','numeric');
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 await expect(page.getByRole('alert')).toHaveText('Introduce un ID de jugador de 6 a 15 dígitos.');
 await expect(input).toBeFocused();
 await input.fill('123a');await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 await expect(input).toHaveAttribute('aria-invalid','true');
 await input.fill('12345678');await page.getByRole('radio').nth(2).check();
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Revisa tu solicitud',exact:true});
 const url=new URL((await dialog.getByRole('link',{name:'Continuar a WhatsApp',exact:true}).getAttribute('href'))!);
 expect(url.hostname).toBe('wa.me');expect(url.pathname).toBe('/50512345678');
 expect(url.searchParams.get('text')).toContain('520 diamantes');
 expect(url.searchParams.get('text')).toContain('ID de jugador: 12345678');
 expect(url.searchParams.get('text')).toMatch(/7[.,]50/);
 await dialog.getByRole('button',{name:'Cerrar resumen',exact:true}).click();await expect(dialog).not.toBeVisible();
});

test('ayuda y páginas legales siguen accesibles, sin cuentas ficticias',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/preguntas');
 await page.getByText('¿Cómo solicito un servicio?',{exact:true}).click();
 await expect(page.getByText('Elige un producto y una opción con precio y disponibilidad confirmados.',{exact:false})).toBeVisible();
 for(const [route,title] of [['/condiciones','Condiciones'],['/privacidad','Privacidad'],['/contacto','Contacto']]){
  await page.goto('/#'+route);await page.reload();
  await expect(page.getByRole('heading',{level:1,name:title,exact:true})).toBeVisible();
 }
 await expect(page.getByText('WhatsApp pendiente de configuración.',{exact:false})).toBeVisible();
 await expect(page.getByRole('link',{name:'Mi cuenta',exact:true})).toHaveCount(0);
 expect(errors).toEqual([]);
});

test('cambiar de presentación conserva paquete e ID y no duplica la navegación',async({page})=>{
 await page.goto('/#/producto/free-fire');
 await page.getByRole('radio').nth(2).check();
 await page.getByRole('textbox',{name:'ID de jugador',exact:true}).fill('12345678');
 for(const width of [1024,768,430,1440]){
  await page.setViewportSize({width,height:900});
  await expect(page.getByRole('radio').nth(2)).toBeChecked();
  await expect(page.getByRole('textbox',{name:'ID de jugador',exact:true})).toHaveValue('12345678');
  await expect(page.getByRole('navigation',{name:'Principal',exact:true})).toHaveCount(1);
 }
});
