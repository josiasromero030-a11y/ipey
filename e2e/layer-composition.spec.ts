import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {imagesReady} from './helpers';

const manifest=JSON.parse(readFileSync('docs/visual-kit-v3/docs/manifest.json','utf8'));
const tokens=JSON.parse(readFileSync('docs/visual-kit-v3/design/tokens.json','utf8'));

for(const [width,height] of [[1440,900],[390,844]]){
 test(`kit por capas: recursos, tokens y logo independiente a ${width}px`,async({page})=>{
  const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
  await page.setViewportSize({width,height});await page.goto('/');await imagesReady(page);
  for(const [id,value] of Object.entries(manifest.assets) as [string,{background:string;logo_repo:string}][]){
   const panel=page.locator(`.panel-${id}`);
   const bg=panel.locator('img.visual-background');
   const logo=panel.locator('img.product-logo,img.service-wordmark');
   await expect(bg).toHaveAttribute('src',new RegExp('/visual/'+value.background+'$'));
   await expect(logo).toHaveCount(1);
   // The reference's mobile Netflix panel uses the real N; all covers use the wordmark.
   const logoPath=width<1024&&id==='netflix'?'logos/netflix.svg':value.logo_repo.replace('public/','');
   await expect(logo).toHaveAttribute('src',new RegExp('/'+logoPath+'$'));
   expect(await bg.evaluate(e=>getComputedStyle(e).objectFit)).toBe('cover');
   expect(await logo.evaluate(e=>getComputedStyle(e).objectFit)).toBe('contain');
  }
  expect(requests.some(u=>u.includes('/referencias/')||u.includes('Guia_Visual')||u.includes('Detalle_Capas'))).toBe(false);
  expect(new Set(requests.filter(u=>u.includes('/visual/assets/covers/'))).size).toBe(6);
  const freeFireLogo=await page.locator('.panel-free-fire .product-logo').boundingBox();
  const freeFirePanel=await page.locator('.panel-free-fire').boundingBox();
  const hero=await page.locator('.hero-desktop,.hero-mobile').boundingBox();
  expect(freeFireLogo!.x+freeFireLogo!.width).toBeLessThanOrEqual(Math.min(freeFirePanel!.x+freeFirePanel!.width,hero!.x+hero!.width));
  await expect(page.locator('.gaming-artwork>.visual-background')).toHaveAttribute('src',/\/banners\/free-fire-banner\.webp$/);
  await expect(page.locator('.service-card-netflix .service-wordmark')).toHaveAttribute('src',/\/logos\/home\/netflix\.svg$/);
  await expect(page.locator('.service-card-spotify .service-wordmark')).toHaveAttribute('src',/\/logos\/home\/spotify\.svg$/);
  const font=await page.evaluate(async()=>{
   const fonts=await document.fonts.load('400 14px Inter');
   return {family:getComputedStyle(document.body).fontFamily,loaded:fonts.some(f=>f.status==='loaded')};
  });
  expect(font.family).toContain('Inter');expect(font.loaded).toBe(true);
  for(const [variable,color] of [['--ipey-bg',tokens.colors.background],['--ipey-blue',tokens.colors.accent],['--ipey-muted',tokens.colors.textMuted]]){
   expect(await page.evaluate(key=>getComputedStyle(document.documentElement).getPropertyValue(key).trim().toLowerCase(),variable)).toBe(color.toLowerCase());
  }
  const card=page.locator('.service-card-netflix');
  const bg=card.locator('img.visual-background');const logo=card.locator('img.service-wordmark');
  const measure=()=>bg.evaluate((e:HTMLImageElement)=>({src:e.src,rect:e.getBoundingClientRect().toJSON(),fit:getComputedStyle(e).objectFit}));
  const original=await measure();const originalLogo=await logo.boundingBox();
  await logo.evaluate(e=>{e.style.width='45px';e.style.height='20px'});
  expect(await logo.boundingBox()).not.toEqual(originalLogo);
  expect(await measure()).toEqual(original);
  await logo.evaluate(async(e:HTMLImageElement)=>{e.src=new URL('logos/home/spotify.svg',document.baseURI).href;await e.decode()});
  expect(await measure()).toEqual(original);
  await expect(card.getByRole('heading',{level:3})).toHaveText('Netflix');
  await expect(card.getByRole('link',{name:'Ver planes de Netflix',exact:true})).toHaveAttribute('href','#/producto/netflix');
 });
}
