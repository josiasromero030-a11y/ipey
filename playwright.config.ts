import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
const executablePath=process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
export default defineConfig({
 testDir:'./e2e',
 use:{baseURL:'http://127.0.0.1:5173',launchOptions:{executablePath,args:['--no-sandbox']}},
 webServer:{command:'npm run dev -- --port 5173',url:'http://127.0.0.1:5173',reuseExistingServer:true},
 projects:[
  {name:'desktop',testMatch:'**/store-flows.spec.ts',use:{viewport:{width:1440,height:900}}},
  {name:'mobile',testMatch:['**/store-flows.spec.ts','**/mobile-interactions.spec.ts'],use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  {name:'tablet',testMatch:['**/store-flows.spec.ts','**/mobile-interactions.spec.ts'],use:{viewport:{width:820,height:1180},isMobile:true,hasTouch:true}},
  {name:'visual',testMatch:['**/reference-layout.spec.ts','**/layer-composition.spec.ts']},
 ],
});
