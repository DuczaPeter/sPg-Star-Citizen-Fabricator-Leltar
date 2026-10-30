// Only review previews; no OCR observation is a confirmed inventory record.
const FabricatorOCR=(()=>{
 const normalized=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
 function suggest(filename,names){const f=' '+normalized(filename)+' ',m=names.filter(n=>f.includes(' '+normalized(n)+' '));return m.length===1?m[0]:''}
 function recipe(filename,blueprints){const f=' '+normalized(filename)+' ',names=[...new Set((blueprints||[]).map(b=>b.productName).filter(Boolean))].filter(n=>f.includes(' '+normalized(n)+' ')).sort((a,b)=>normalized(b).length-normalized(a).length);return names[0]||''}
 function parse(text){const lines=String(text||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);let quality=null,quantity=null,unit='',approximate=false;for(const line of lines){const q=line.match(/^(\d{1,4})\s*[QO]$/i)||line.match(/^Q\s*(\d{1,4})$/i);if(q&&Number(q[1])<=1000)quality=Number(q[1]);const a=line.match(/^(\d+(?:[.,]\d+)?)\s*([KM])?\s*((?:[µμu])?SCU|CSCU|UNITS?)$/i);if(a){quantity=Number(a[1].replace(',','.'))*(a[2]?.toUpperCase()==='K'?1000:a[2]?.toUpperCase()==='M'?1000000:1);unit=/^UNIT/i.test(a[3])?'db':/^[µμu]/i.test(a[3])?'µSCU':a[3].toUpperCase();approximate=!!a[2]}}return{quality,quantity,unit,...(approximate?{approximate:true}:{})}}
 function readQuality(text,allowed){const p=parse(text).quality;if(p!==null&&allowed.includes(p))return p;const t=String(text||'').trim(),m=t.match(/^(\d{1,4})(?:\s+[QO0])?$/i);if(m&&allowed.includes(Number(m[1])))return Number(m[1]);const joined=t.match(/^(\d{3})0$/);return joined&&allowed.includes(Number(joined[1]))?Number(joined[1]):null}
 const signature=r=>JSON.stringify([r.quantity,r.unit,!!r.approximate]);
 const label=r=>(r.approximate?'≈ ':'')+r.quantity.toLocaleString('hu-HU',{maximumFractionDigits:20})+' '+r.unit;
 function status(r,quality,types){if(!r.material)return'Hiányzó alapanyag';const p=quality?.materials?.[r.material];if(!p||(p.status!=='verified'&&!p.userValues?.includes(r.quality)))return'Nem egyértelmű minőségi forrás';if(!Number.isInteger(r.quality))return'Hiányzó Q';if(!(p.inventoryValues||p.values).includes(r.quality))return'Q '+r.quality+' nincs a forráslépcsők között';if(!Number.isFinite(r.quantity)||r.quantity<0)return'Hiányzó vagy bizonytalan mennyiség';if(!['SCU','CSCU','µSCU','db'].includes(r.unit))return'Hiányzó mértékegység';const k=types?.[r.material]||[];if(k.length!==1)return'Nem egyértelmű alapanyagtípus';if(k[0]==='item'?r.unit!=='db':r.unit==='db')return'Eltérő mértékegység';return''}
 function cells(rows,quality,types){const groups=new Map();for(const r of rows.filter(r=>r.enabled&&!status(r,quality,types))){const k=r.material+'|'+r.quality;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r)}return new Map([...groups].map(([key,rs])=>{const variants=new Map();for(const r of rs){const sig=signature(r);if(!variants.has(sig))variants.set(sig,[]);variants.get(sig).push(r)}return[key,{label:variants.size===1?label(rs[0]):'Ütközés',conflict:variants.size>1,repeats:rs.length-variants.size,rows:rs,variants:[...variants.values()].map(v=>({row:v[0],rows:v,label:label(v[0])}))}]}))}
 function suggestion(row,rows,quality,types){if(!status(row,quality,types)||!row.material)return null;const p=quality?.materials[row.material],qKnown=Number.isInteger(row.quality),matches=rows.filter(r=>r.id!==row.id&&r.material===row.material&&r.enabled&&!status(r,quality,types)&&(!qKnown||r.quality===row.quality)&&(row.quantity===null||row.quantity===undefined||r.quantity===row.quantity)&&(!row.unit||r.unit===row.unit)),unique=new Map(matches.map(r=>[r.quality+'|'+signature(r),r]));return unique.size===1?[...unique.values()][0]:null}
 function stats(rows,quality,types){const map=cells(rows,quality,types);return{map,missing:rows.filter(r=>r.enabled&&status(r,quality,types)),conflicts:[...map].filter(([,v])=>v.conflict),repeats:[...map.values()].reduce((n,v)=>n+v.repeats,0),approximate:rows.filter(r=>r.enabled&&r.approximate).length}}
 function discordParts(text,limit=1900){
  const parts=[];let current='';
  const push=block=>{if(current&&(current+'\n\n'+block).length>limit){parts.push(current);current=''}current+=(current?'\n\n':'')+block};
  for(const group of text.split('\n\n')){if(group.length<=limit){push(group);continue}const [head,...lines]=group.split('\n');let block=head;for(const line of lines){if((block+'\n'+line).length>limit){push(block);block=head}block+='\n'+line}push(block)}
  if(current)parts.push(current);return parts;
 }
 function discord(rows,quality,types,{emptyImages=0}={}){
  const s=stats(rows,quality,types);
  if(emptyImages||s.missing.length||s.conflicts.length)return{text:'',count:0,error:'Előbb javítsd a hiányzó adatokat és az ütközéseket, vagy kapcsold ki a kihagyandó sorok Használat jelölését.'};
  const values=[...s.map.values()].map(c=>c.rows[0]).filter(r=>r.quantity>0).sort((a,b)=>(a.unit==='db')-(b.unit==='db')||a.material.localeCompare(b.material,'hu',{sensitivity:'base',numeric:true})||a.quality-b.quality);
  const groups=[];let material='';
  const number=n=>new Intl.NumberFormat('hu-HU',{maximumFractionDigits:12,useGrouping:false}).format(n);
  for(const r of values){if(r.material!==material){material=r.material;groups.push(['**'+material.replace(/([\\*_~`|<>])/g,'\\$1')+'**'])}const unit=r.unit==='CSCU'?'SCU':r.unit,amount=r.unit==='CSCU'?r.quantity/100:r.quantity;groups.at(-1).push('Q'+r.quality+' — '+(r.approximate?'≈ ':'')+number(amount)+' '+unit)}
  return{text:groups.map(g=>g.join('\n')).join('\n\n'),count:values.length,parts:values.length?discordParts(groups.map(g=>g.join('\n')).join('\n\n')):[],error:values.length?'':'Nincs másolható, pozitív mennyiségű OCR-adat.'};
 }
 return{normalized,suggest,recipe,parse,readQuality,signature,label,status,cells,suggestion,stats,discord,discordParts};
})();
if(typeof module!=='undefined')module.exports=FabricatorOCR;
