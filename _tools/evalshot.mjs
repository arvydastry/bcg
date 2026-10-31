// Ekrano nuotrauka po JS išraiškos (pvz. slinkimo): node _tools/evalshot.mjs <url> <out.png> <plotis> <aukštis> "<išraiška>"
import { spawn } from 'node:child_process'; import { writeFileSync } from 'node:fs';
const [url, out, w, h, expr] = process.argv.slice(2);
const port = 9400 + Math.floor(Math.random()*90), tmp = `/tmp/bcg-es-${port}`;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--mute-audio',`--remote-debugging-port=${port}`,`--user-data-dir=${tmp}`,'about:blank'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms)); let ws, id=0; const pending=new Map();
for (let i=0;i<40&&!ws;i++){ try{ const l=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p=l.find(t=>t.type==='page'); if(p){ ws=new WebSocket(p.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);} }catch(e){} await sleep(250); }
ws.onmessage = m => { const d=JSON.parse(m.data); if(d.id&&pending.has(d.id)){ pending.get(d.id)(d); pending.delete(d.id);} };
const send=(method,params={})=>new Promise(r=>{const i=++id; pending.set(i,r); ws.send(JSON.stringify({id:i,method,params}));});
await send('Emulation.setDeviceMetricsOverride',{width:+w,height:+h,deviceScaleFactor:1,mobile:+w<700});
await send('Page.navigate',{url}); await sleep(3500);
await send('Runtime.evaluate',{expression:`try{localStorage.setItem('bcg-cookies','all');localStorage.setItem('demo-cookies','all')}catch(e){};document.getElementById('cookie')&&(document.getElementById('cookie').hidden=true);`});
await send('Runtime.evaluate',{expression:expr,awaitPromise:true}); await sleep(800);
const s = await send('Page.captureScreenshot',{format:'png'}); writeFileSync(out, Buffer.from(s.result.data,'base64')); console.log('saved', out);
ws.close(); chrome.kill('SIGKILL'); spawn('rm',['-rf',tmp]); setTimeout(()=>process.exit(),200);
