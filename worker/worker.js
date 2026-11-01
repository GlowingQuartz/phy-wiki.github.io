// Cloudflare Worker: penerima entri (komunitas) dan penerbit entri terkurasi (pengembang).
// Variabel: ORIGIN (mis. https://USERNAME.github.io), GH_REPO (USERNAME/Phy-Wiki), BRANCH (main); Secret: GH_TOKEN, DEV_KEY
const dec=c=>new TextDecoder().decode(Uint8Array.from(atob(c.replace(/\n/g,'')),x=>x.charCodeAt(0)));
const enc=s=>{let t='';new TextEncoder().encode(s).forEach(x=>t+=String.fromCharCode(x));return btoa(t)};
export default{async fetch(req,env){
const h={'Access-Control-Allow-Origin':env.ORIGIN,'Access-Control-Allow-Headers':'Content-Type,X-Dev-Key','Access-Control-Allow-Methods':'POST,OPTIONS'};
const J=(b,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{...h,'Content-Type':'application/json'}});
if(req.method==='OPTIONS')return new Response(null,{headers:h});
if(req.headers.get('Origin')!==env.ORIGIN)return J({error:'origin'},403);
const dev=!!env.DEV_KEY&&req.headers.get('X-Dev-Key')===env.DEV_KEY;
if(new URL(req.url).pathname==='/verify')return dev?J({ok:1}):J({error:'key'},401);
let b;try{b=await req.json()}catch{return J({error:'json'},400)}
const e=b.entry;
if(!e||typeof e.title!=='string'||typeof e.result!=='string'||!Array.isArray(e.steps)||!e.steps.length||JSON.stringify(e).length>60000)return J({error:'invalid'},400);
const cur=dev&&b.target==='curated';
if(!cur&&!['ai','web','lib'].includes(e.status))return J({error:'status'},400);
const c={id:String(e.id||'').slice(0,60),title:e.title.slice(0,200),field:String(e.field||'').slice(0,80),tags:(e.tags||[]).slice(0,12),problem:String(e.problem||'').slice(0,800),conditions:(e.conditions||[]).slice(0,12),result:e.result,steps:e.steps.slice(0,30),relations:(e.relations||[]).slice(0,12),sources:(e.sources||[]).slice(0,15),status:cur?'user':e.status,model:String(e.model||'').slice(0,40),added:new Date().toISOString()};
const api=`https://api.github.com/repos/${env.GH_REPO}/contents/data/${cur?'entries':'community'}.json`,br=env.BRANCH||'main';
const gh={Authorization:`Bearer ${env.GH_TOKEN}`,'User-Agent':'phywiki',Accept:'application/vnd.github+json'};
for(let i=0;i<3;i++){const f=await(await fetch(`${api}?ref=${br}`,{headers:gh})).json();
const arr=JSON.parse(dec(f.content)).filter(x=>x.id!==c.id);arr.push(c);
const r=await fetch(api,{method:'PUT',headers:gh,body:JSON.stringify({message:`${cur?'Entri terkurasi':'Entri komunitas'}: ${c.title}`.slice(0,100),content:enc(JSON.stringify(arr,null,1)),sha:f.sha,branch:br})});
if(r.ok)return J({ok:1});if(r.status!==409&&r.status!==422)return J({error:'github'},502)}
return J({error:'conflict'},503)}}
