import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
const executablePath=process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
const browser=await chromium.launch({executablePath,args:['--no-sandbox']});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const base=process.env.CAPTURE_URL||'http://127.0.0.1:4173/ipey/';
 for(const [name,route,heading] of [['inicio','/','Desconecta de todo.'],['streaming','/streaming','Dale play a tu mundo.'],['juegos','/juegos','Tu siguiente nivel.']]){
  await page.goto(`${base}#${route}`);
  await page.reload();
  await page.getByRole('heading',{level:1}).filter({hasText:heading}).waitFor();
  await page.evaluate(()=>document.fonts.ready);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Desbordamiento horizontal: '+name);
  const count=await page.locator('.product-card').count();
  const expected={inicio:6,streaming:5,juegos:1}[name];
  if(count!==expected)throw new Error(`Catálogo incorrecto ${name}: ${count}`);
  await page.screenshot({path:`docs/capturas/${name}.png`,fullPage:true});
  console.log(`${name}: recarga, encabezado y ${count} productos verificados; captura guardada.`);
 }
 if(errors.length)throw new Error(errors.join('\n'));
}finally{await browser.close()}
