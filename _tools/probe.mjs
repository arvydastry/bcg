// Įvertina JS išraišką puslapyje per CDP ir išspausdina rezultatą: node _tools/probe.mjs <url> <plotis> <aukštis> "<išraiška>"
import { spawn } from 'node:child_process';
const [url, w, h, expr] = process.argv.slice(2);
const port = 9600 + Math.floor(Math.random()*90), tmp = `/tmp/bcg-probe-${port}`;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--mute-audio',`--remote-debugging-port=${port}`,`--user-data-dir=${tmp}`,'about:blank'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms)); let ws, id=0; const pending=new Map();
for (let i=0;i<40&&!ws;i++){ try{ const l=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p=l.find(t=>t.type==='page'); if(p){ ws=new WebSocket(p.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);} }catch(e){} await sleep(250); }
ws.onmessage = m => { const d=JSON.parse(m.data); if(d.id&&pending.has(d.id)){ pending.get(d.id)(d); pending.delete(d.id);} };
const send=(method,params={})=>new Promise(r=>{const i=++id; pending.set(i,r); ws.send(JSON.stringify({id:i,method,params}));});
await send('Emulation.setDeviceMetricsOverride',{width:+w,height:+h,deviceScaleFactor:1,mobile:+w<700});
await send('Page.navigate',{url}); await sleep(3000);
const r = await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});
console.log(JSON.stringify(r.result?.result?.value ?? r, null, 1).slice(0,3000));
ws.close(); chrome.kill('SIGKILL'); spawn('rm',['-rf',tmp]); setTimeout(()=>process.exit(),200);
