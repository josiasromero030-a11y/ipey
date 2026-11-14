import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';

// QA-only compositions. These reference images are never used by the application.
const output=process.env.CAPTURE_DIR||'docs/capturas/kit-v3';
const inline=async(path,type='image/png')=>`data:${type};base64,${(await readFile(path)).toString('base64')}`;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const font=await inline('public/fonts/inter/inter-latin-wght-normal.woff2','font/woff2');
 for(const [name,reference,capture,width] of [['escritorio','01_escritorio.png','inicio-1672x941.png',800],['movil','02_movil.png','inicio-887x1774.png',443]]){
  const page=await browser.newPage({viewport:{width:width*2+24,height:900},deviceScaleFactor:1});
  const before=await inline(`docs/visual-kit-v3/referencias/${reference}`);
  const after=await inline(`${output}/${capture}`);
  await page.setContent(`<style>@font-face{font-family:Inter;src:url('${font}')}*{box-sizing:border-box}body{margin:0;background:#080b10;color:#f8fafc;font-family:Inter,sans-serif}main{display:grid;grid-template-columns:repeat(2,${width}px);gap:24px;align-items:start}h2{height:48px;margin:0;padding:14px 12px;font-size:17px;font-weight:500}img{display:block;width:100%;height:auto}</style><main><section><h2>Referencia aprobada</h2><img src="${before}" alt="Referencia del kit"/></section><section><h2>Captura real (misma anchura)</h2><img src="${after}" alt="Implementación funcional"/></section></main>`);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
  await page.screenshot({path:`${output}/comparacion-${name}.png`,fullPage:true});
  await page.close();
 }
}finally{await browser.close()}
