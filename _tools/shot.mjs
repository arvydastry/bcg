// Ekrano nuotraukos per Chrome DevTools protokolą (Node 22, be priklausomybių).
// node _tools/shot.mjs <url> <out.png> [width=1440] [height=900] [--full | --segments=1700] [--mobile] [--reduce] [--y=0]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
setTimeout(() => { console.error('timeout'); process.exit(2); }, 90000);
const [url, out, w = '1440', h = '900', ...flags] = process.argv.slice(2);
const flag = n => { const f = flags.find(x => x.startsWith('--' + n)); return f ? (f.includes('=') ? f.split('=')[1] : true) : null; };
const full = !!flag('full'), seg = flag('segments'), mobile = !!flag('mobile'), reduce = !!flag('reduce'), yStart = +(flag('y') || 0);
const port = 9300 + Math.floor(Math.random() * 500);
const tmp = `/tmp/bcg-cdp-${port}`;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--mute-audio', `--remote-debugging-port=${port}`, `--user-data-dir=${tmp}`, `--window-size=${w},${h}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
async function connect() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const list = await r.json(); const page = list.find(t => t.type === 'page'); if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; }); ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } }; return; } } catch (e) {}
    await sleep(250);
  }
  throw new Error('chrome not reachable');
}
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
const save = (file, data) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, Buffer.from(data, 'base64')); };
try {
  await connect();
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  if (reduce) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.navigate', { url });
  await sleep(3500);
  await evaluate(`(async()=>{try{localStorage.setItem('bcg-cookies','all')}catch(e){};const c=document.getElementById('cookie');if(c)c.hidden=true;const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=Math.round(window.innerHeight*0.6)){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,140));}window.scrollTo(0,0);const t0=Date.now();while(Date.now()-t0<9000&&!Array.from(document.images).every(i=>i.complete)){await new Promise(r=>setTimeout(r,200));}await new Promise(r=>setTimeout(r,500));return H})()`);
  const freeze = `(async()=>{document.querySelectorAll('[data-reveal],[data-stagger],[data-split],[data-mask],.hl').forEach(e=>e.classList.add('in'));document.querySelectorAll('[data-count]').forEach(e=>{e.textContent=e.dataset.count+(e.dataset.suffix||'')});document.querySelectorAll('.px').forEach(e=>e.style.transform='none');const s=document.getElementById('site-header');if(s)s.classList.remove('is-hidden');await new Promise(r=>setTimeout(r,1300));})()`;
  if (full || seg) {
    await evaluate(`(()=>{const st=document.createElement('style');st.id='pin';st.textContent='.hero--video{min-height:0!important;height:auto!important}.hero--page{min-height:0!important;height:auto!important}.mobile-bar{display:none!important}';document.head.appendChild(st);})()`);
    await sleep(300);
  }
  if (full) {
    const height = Math.min(16384, await evaluate('document.documentElement.scrollHeight'));
    await send('Emulation.setDeviceMetricsOverride', { width: +w, height, deviceScaleFactor: 1, mobile });
    await evaluate(freeze);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: +w, height, scale: 1 } });
    save(out, shot.result.data); console.log(`saved ${out} ${w}x${height}`);
  } else if (seg) {
    const sh = +seg; await send('Emulation.setDeviceMetricsOverride', { width: +w, height: sh, deviceScaleFactor: 1, mobile });
    await evaluate(freeze);
    const H = await evaluate('document.documentElement.scrollHeight'); let n = 0;
    for (let y = 0; y < H; y += sh) {
      await evaluate(`window.scrollTo(0,${y})`); await sleep(450);
      await evaluate(`(()=>{const s=document.getElementById('site-header');if(s)s.classList.remove('is-hidden');})()`); await sleep(150);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const file = out.replace(/\.png$/, `-${++n}.png`); save(file, shot.result.data); console.log(`saved ${file} (y=${y})`);
    }
  } else {
    await evaluate(`window.scrollTo(0,${yStart})`); await sleep(500);
    await evaluate(freeze);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    save(out, shot.result.data); console.log(`saved ${out} ${w}x${h} y=${yStart}`);
  }
} catch (e) { console.error('ERR', e.message); process.exitCode = 1; }
finally { try { ws && ws.close(); } catch (e) {} chrome.kill('SIGKILL'); spawn('rm', ['-rf', tmp]); setTimeout(() => process.exit(), 300); }
