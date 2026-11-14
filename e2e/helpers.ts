import {expect,type Page} from '@playwright/test';

/** Browser-only fixtures: never change the catalog on disk or send messages. */
export async function demoCatalog(page:Page){
 await page.route('**/src/catalog.ts',async route=>{
  const response=await route.fetch();
  await route.fulfill({response,body:(await response.text())+'\nbusiness.whatsapp="50512345678"; catalog.forEach(p=>p.variants.forEach(v=>{v.price=7.5;v.available=true}));'});
 });
}
export async function imagesReady(page:Page){
 await page.evaluate(async()=>{
  await document.fonts.ready;
  await Promise.all([...document.images].map(img=>img.decode()));
  for(const artwork of document.querySelectorAll('.artwork')){
   const image=artwork.querySelector<HTMLImageElement>(':scope > img.visual-background');
   if(!image?.naturalWidth)throw new Error('Falta la imagen independiente de una portada');
   if(getComputedStyle(image).objectFit!=='cover')throw new Error('El fondo debe usar object-fit: cover');
  }
 });
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}
