import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';

const output=process.env.CAPTURE_DIR||'docs/capturas/kit-v3';
const base=process.env.CAPTURE_URL||'http://127.0.0.1:4173/ipey/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
const sizes=[[1280,800],[1440,900],[1672,941],[1920,1080],[320,700],[360,800],[390,844],[430,932],[768,1024],[820,1180],[887,1774],[1024,900]];
const results=[];
async function ready(page){
 await page.evaluate(async()=>{
  await document.fonts.ready;
  await Promise.all([...document.images].map(i=>i.decode()));
  for(const artwork of document.querySelectorAll('.artwork')){
   const img=artwork.querySelector(':scope > img.visual-background');
   if(!img?.naturalWidth||getComputedStyle(img).objectFit!=='cover')throw new Error('Portada sin fondo independiente correctamente cargado');
  }
 });
}
await mkdir(output,{recursive:true});
try{
 for(const [width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},isMobile:width<1024,hasTouch:width<1024,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.goto(base+'#/');await page.reload();
  await page.mouse.move(0,0);
  await ready(page);
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,panels:document.querySelectorAll('.platform-panel').length,cards:document.querySelectorAll('.product-card').length,hero:document.querySelector('.hero-desktop,.hero-mobile')?.getBoundingClientRect().toJSON()}));
  if(metrics.scrollWidth>width||errors.length)throw new Error(JSON.stringify({width,metrics,errors}));
  await page.screenshot({path:`${output}/inicio-${width}x${height}.png`,fullPage:true});
  results.push({width,height,...metrics,errors});
  console.log(`${width} × ${height}: ${metrics.panels} paneles, ${metrics.cards} productos, sin desbordamiento.`);
  if(width===390||width===1440){
   for(const [name,path] of [['streaming','/streaming'],['juegos','/juegos'],['catalogo','/buscar'],['netflix','/producto/netflix'],['free-fire','/producto/free-fire'],['contacto','/contacto'],['condiciones','/condiciones'],['privacidad','/privacidad'],['ayuda','/preguntas']]){
    await page.goto(base+'#'+path);await page.reload();
    await ready(page);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error(`Desbordamiento ${path} ${width}`);
    await page.screenshot({path:`${output}/${name}-${width}.png`,fullPage:true});
   }
   if(errors.length)throw new Error(errors.join('\n'));
  }
  await page.close();
 }
 await writeFile(`${output}/verificacion.json`,JSON.stringify({base,results},null,2)+'\n');
}finally{await browser.close()}

await import('./compare-kit.mjs');
