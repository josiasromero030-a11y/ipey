import {test,expect,type Page} from '@playwright/test';
import {mkdir} from 'node:fs/promises';

const demoCatalog=async(page:Page)=>{
 await page.route('**/src/catalog.ts',async route=>{
  const response=await route.fetch();
  await route.fulfill({response,body:(await response.text())+'\nbusiness.whatsapp="50512345678"; catalog.forEach(p=>p.variants.forEach(v=>{v.price=7.5;v.available=true}));'});
 });
};
async function ready(page:Page){
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode()))});
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}

test('navegación directa y descubrimiento antes de la información comercial',async({page})=>{
 await page.goto('/');
 const nav=page.getByRole('navigation',{name:'Principal',exact:true});
 await expect(nav).toHaveCount(1);
 for(const name of ['Inicio','Streaming','Juegos'])await expect(nav.getByRole('link',{name,exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Ver diapositiva 1',exact:true})).toHaveCount(0);
 await expect(page.getByRole('navigation',{name:'Categorías'})).toBeVisible();
 const order=await page.evaluate(()=>['.home-hero','.mobile-categories','.home-streaming','.home-gaming','.home-process'].map(s=>document.querySelector(s)!.getBoundingClientRect().top));
 expect(order).toEqual([...order].sort((a,b)=>a-b));
 await nav.getByRole('link',{name:'Juegos',exact:true}).click();
 await expect(page.getByRole('heading',{level:1,name:'Juegos',exact:true})).toBeVisible();
 await expect(nav.getByRole('link',{name:'Juegos',exact:true})).toHaveAttribute('aria-current','page');
 await page.getByRole('button',{name:'Abrir menú',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'Más información'}).getByRole('link',{name:'Privacidad',exact:true})).toBeVisible();
});

test('filtros: borrador, cancelar, aplicar, quitar y limpiar',async({page})=>{
 await page.goto('/#/streaming');
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await page.getByRole('combobox',{name:'Plataforma',exact:true}).selectOption('netflix');
 await page.keyboard.press('Escape');
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await expect(page.getByRole('combobox',{name:'Plataforma',exact:true})).toHaveValue('');
 await page.getByRole('combobox',{name:'Plataforma',exact:true}).selectOption('netflix');
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(1);
 await expect(page.getByRole('button',{name:/^Filtros/})).toBeFocused();
 await page.getByRole('button',{name:'Quitar filtro: Netflix',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await page.getByRole('combobox',{name:'Disponibilidad',exact:true}).selectOption('yes');
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.getByRole('heading',{name:'No encontramos resultados'})).toBeVisible();
 await page.getByRole('button',{name:/^Filtros/}).click();
 await page.getByRole('button',{name:'Limpiar',exact:true}).click();
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('searchbox',{name:'Buscar servicios',exact:true}).fill('Spotify');
 await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByRole('combobox',{name:'Ordenar',exact:true}).selectOption('desc');
 await expect(page.locator('.product-card h3')).toHaveText('Spotify');
});

test('ID, condiciones y resumen en una ventana reducida',async({page})=>{
 await demoCatalog(page);
 await page.goto('/#/producto/free-fire');
 const id=page.getByRole('textbox',{name:'ID de jugador',exact:true});
 await expect(id).toHaveAttribute('inputmode','numeric');
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 await expect(id).toBeFocused();
 await expect(id).toHaveAttribute('aria-invalid','true');
 await expect(page.getByRole('alert')).toContainText('6 a 15 dígitos');
 await page.setViewportSize({width:390,height:500});
 await id.scrollIntoViewIfNeeded();
 await id.fill('12345678');
 await expect(id).toBeInViewport();
 await page.getByText('Condiciones del servicio',{exact:true}).click();
 await expect(page.getByText('Verifica el ID antes de solicitar una recarga.',{exact:false})).toBeVisible();
 await page.getByRole('radio').nth(2).check();
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Revisa tu solicitud',exact:true});
 await expect(dialog).toBeVisible();
 await expect(dialog.locator('pre')).toContainText('520 diamantes');
 const link=dialog.getByRole('link',{name:'Continuar a WhatsApp',exact:true});
 await link.scrollIntoViewIfNeeded();
 await expect(link).toBeInViewport();
 const href=await link.getAttribute('href');expect(new URL(href!).hostname).toBe('wa.me');
 await dialog.getByRole('button',{name:'Cerrar resumen'}).click();
 await expect(dialog).not.toBeVisible();
});

for(const width of [320,360,390,430,768]){
 test(`capturas y recorrido móvil a ${width}px`,async({page,context})=>{
  test.setTimeout(90000);
  await page.setViewportSize({width,height:844});
  const folder=`docs/capturas/mobile-ux/${width}`;await mkdir(folder,{recursive:true});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  for(const [name,route] of [['inicio','/'],['streaming','/streaming'],['juegos','/juegos'],['netflix','/producto/netflix'],['free-fire','/producto/free-fire']]){
   await page.goto('/#'+route);await ready(page);
   if(name==='inicio'){
    const heroHeight=await page.locator('.home-hero').evaluate(e=>e.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThanOrEqual(255);
   }
   await page.screenshot({path:`${folder}/${name}.png`,fullPage:true});
  }
  await page.goto('/#/streaming');await page.getByRole('button',{name:'Filtros',exact:true}).click();
  await page.screenshot({path:`${folder}/filtros.png`,fullPage:true});await page.keyboard.press('Escape');
  const demo=await context.newPage();await demo.setViewportSize({width,height:844});
  await demoCatalog(demo);await demo.goto('/#/producto/free-fire');
  await demo.getByRole('radio').nth(2).check();await demo.getByRole('textbox',{name:'ID de jugador'}).fill('12345678');
  await demo.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
  await expect(demo.getByRole('dialog',{name:'Revisa tu solicitud'})).toBeVisible();await ready(demo);
  // Capture a stable page origin: full-page captures otherwise repeat sticky UI
  // at the scroll position reached by the review button.
  await demo.evaluate(()=>window.scrollTo(0,0));
  await demo.screenshot({path:`${folder}/resumen-demo.png`,fullPage:true});
  await demo.screenshot({path:`${folder}/resumen-demo-panel.png`});await demo.close();
  expect(errors).toEqual([]);
 });
}
