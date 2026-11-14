import {test,expect} from '@playwright/test';
import {imagesReady} from './helpers';

for(const [width,height] of [[1280,800],[1440,900],[1672,941],[1920,1080],[320,700],[360,800],[390,844],[430,932],[768,1024],[820,1180],[1024,900]]){
 test(`composición y recursos de las referencias a ${width} × ${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.goto('/');await imagesReady(page);
  const mobile=width<1024;
  await expect(page.locator(mobile?'.hero-mobile':'.hero-desktop')).toBeVisible();
  await expect(page.locator('.platform-panel')).toHaveCount(6);
  await expect(page.getByRole('navigation',{name:'Principal',exact:true})).toHaveCount(1);
  const cards=page.locator('.streaming-section .service-card');
  await expect(cards.locator('h3')).toHaveText(['Netflix','Disney+','HBO Max','Crunchyroll','Spotify']);
  const rects=await cards.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),width:r.width}}));
  if(mobile){
   expect(rects[0].y).toBe(rects[1].y);expect(rects[2].y).toBe(rects[3].y);
   expect(rects[4].width).toBeGreaterThan(rects[0].width*1.9);
   for(const action of await cards.locator('.card-action').all())expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44);
   const panelRows=await page.locator('.platform-panel').evaluateAll(es=>[...new Set(es.map(e=>Math.round(e.getBoundingClientRect().top)))]);
   expect(panelRows).toHaveLength(2);
   await expect(page.getByRole('region',{name:'Preguntas frecuentes',exact:true})).toBeVisible();
  }else{
   expect(new Set(rects.map(r=>r.y)).size).toBe(1);
   expect(new Set(rects.map(r=>r.x)).size).toBe(5);
   const categories=page.getByRole('navigation',{name:'Categorías',exact:true});
   for(const name of ['Todos','Streaming','Juegos','Recargas','Free Fire'])await expect(categories.getByRole('link',{name,exact:true})).toBeVisible();
  }
  const clipped=await page.locator('.hero-copy h1,.service-card h3,.gaming-copy h3').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent));
  expect(clipped).toEqual([]);
  for(const route of ['/streaming','/juegos','/producto/netflix','/producto/free-fire']){
   await page.goto('/#'+route);await imagesReady(page);
  }
 });
}
