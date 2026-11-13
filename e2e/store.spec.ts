import {test,expect} from '@playwright/test';
test('inicio separa streaming y recargas y abre los productos existentes',async({page})=>{
 await page.goto('/');
 const streaming=page.getByRole('region',{name:'Servicios de streaming'});
 await expect(streaming.locator('h3')).toHaveText(['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']);
 await expect(streaming.getByRole('link',{name:'Ver todos',exact:true})).toHaveAttribute('href','#/streaming');
 const games=page.getByRole('region',{name:'Recargas de juegos'});
 await expect(games.getByRole('link',{name:'Ver todos',exact:true})).toHaveAttribute('href','#/juegos');
 for(const name of ['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']){
  await streaming.getByRole('link',{name:`Ver planes de ${name}`,exact:true}).click();
  await expect(page.getByRole('heading',{level:1,name,exact:true})).toBeVisible();
  await page.goto('/');
 }
 await games.getByRole('link',{name:'Ver paquetes de Free Fire',exact:true}).click();
 await expect(page.getByRole('heading',{level:1,name:'Free Fire',exact:true})).toBeVisible();
 await expect(page.getByRole('radio')).toHaveCount(5);
 await page.goto('/');
 await page.getByText('¿Cómo solicito un servicio?',{exact:true}).click();
 await expect(page.getByText('Elige un producto y una opción con precio y disponibilidad confirmados.',{exact:false})).toBeVisible();
});
test('logotipos locales en catálogo y detalle, con respaldo si falla la carga',async({page})=>{
 await page.goto('/');
 for(const name of ['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']){
  const image=page.locator('.product-card').getByRole('img',{name,exact:true});
  await expect(image).toBeVisible();
  await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 }
 const gameArt=page.getByRole('img',{name:'Ilustración original de un explorador en un paisaje de aventura'});
 await expect(gameArt).toBeVisible();
 await expect.poll(()=>gameArt.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 await page.goto('/#/producto/disney');
 await expect(page.locator('.detail-art').getByRole('img',{name:'Disney+',exact:true})).toBeVisible();
 await page.route('**/logos/netflix.svg',route=>route.abort());
 await page.goto('/#/producto/netflix');
 await expect(page.locator('.detail-art .product-name-fallback')).toHaveText('Netflix');
});
test('catálogo, filtros, planes y navegación',async({page},info)=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.getByRole('heading',{name:/Streaming y juegos/})).toBeVisible();await expect(page.locator('.product-card')).toHaveCount(6);await page.getByRole('link',{name:'Ver streaming',exact:true}).click();await expect(page.locator('.product-card')).toHaveCount(5);await page.getByRole('textbox',{name:'Buscar servicios'}).fill('spotify');await expect(page.locator('.product-card')).toHaveCount(1);await page.getByRole('link',{name:'Ver planes',exact:true}).click();await expect(page.getByRole('heading',{name:'Spotify',exact:true})).toBeVisible();await page.getByRole('radio').nth(1).check();await expect(page.getByRole('radio').nth(1)).toBeChecked();await expect(page.getByRole('button',{name:'Revisar solicitud'})).toHaveCount(0);await page.goto('/#/juegos');await page.reload();await expect(page.locator('.product-card')).toHaveCount(1);await page.getByRole('link',{name:'Ver paquetes',exact:true}).click();await expect(page.getByRole('radio')).toHaveCount(5);await page.getByRole('textbox',{name:'ID de jugador'}).fill('12345678');await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);await page.goto('/#/streaming');await page.getByRole('combobox',{name:'Disponibilidad',exact:true}).selectOption('yes');await expect(page.getByRole('heading',{name:'No encontramos resultados'})).toBeVisible();await page.getByRole('button',{name:'Mostrar todo'}).click();await expect(page.locator('.product-card')).toHaveCount(5);await page.goto('/#/contacto');await expect(page.getByText('WhatsApp pendiente de configuración.',{exact:false})).toBeVisible();await page.goto('/');await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`/tmp/ipey-${info.project.name}.png`,fullPage:true});expect(errors).toEqual([])});
test('buscador global y menú móvil',async({page},info)=>{await page.goto('/');await page.getByRole('button',{name:'Abrir búsqueda',exact:true}).click();await expect(page.getByRole('dialog',{name:'Busca tu próximo favorito'})).toBeVisible();await page.getByRole('textbox',{name:'Buscar en el catálogo'}).fill('Netflix');await page.getByRole('textbox',{name:'Buscar en el catálogo'}).press('Enter');await expect(page.getByRole('dialog',{name:'Busca tu próximo favorito'})).not.toBeVisible();await expect(page.locator('.product-card')).toHaveCount(1);if(info.project.name==='mobile'){await page.getByRole('button',{name:'Abrir menú'}).click();await page.getByRole('navigation',{name:'Principal'}).getByRole('link',{name:'Juegos'}).click();await expect(page.locator('.product-card')).toHaveCount(1)}});
test('solicitud configurada valida ID y prepara WhatsApp',async({page})=>{await page.route('**/src/catalog.ts',async route=>{const response=await route.fetch();let body=await response.text();body+='\nbusiness.whatsapp="50512345678"; catalog.forEach(p=>p.variants.forEach(v=>{v.price=7.5;v.available=true}));';await route.fulfill({response,body})});await page.goto('/#/producto/free-fire');await page.getByRole('button',{name:'Revisar solicitud'}).click();await expect(page.getByRole('alert')).toHaveText('Introduce un ID de jugador de 6 a 15 dígitos.');await page.getByRole('textbox',{name:'ID de jugador'}).fill('12345678');await page.getByRole('radio').nth(2).check();await page.getByRole('button',{name:'Revisar solicitud'}).click();await expect(page.getByRole('dialog')).toBeVisible();const href=await page.getByRole('link',{name:'Continuar a WhatsApp'}).getAttribute('href');const url=new URL(href!);expect(url.hostname).toBe('wa.me');expect(url.pathname).toBe('/50512345678');expect(url.searchParams.get('text')).toContain('520 diamantes');expect(url.searchParams.get('text')).toContain('ID de jugador: 12345678');expect(url.searchParams.get('text')).toMatch(/7[.,]50/);await page.getByRole('button',{name:'Cerrar resumen'}).click();await expect(page.getByRole('dialog')).not.toBeVisible()});
