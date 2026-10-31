// Replaceable transport. Contract v1 contains stock only; no auth tokens, images or OCR logs.
const FabricatorCloud=(()=>{
 const Stock=typeof FabricatorStock!=='undefined'?FabricatorStock:require('./stock-store.cjs');
 function create(fetcher){let owner=null;
 async function request(path,options={}){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);try{const response=await fetcher(path,{...options,credentials:'same-origin',cache:'no-store',signal:controller.signal});let data;try{data=await response.json()}catch{throw Error('A közös készlet válasza nem értelmezhető.')}if(!response.ok){const e=Error(data.message||'A közös készlet nem elérhető.');e.code=data.code;e.status=response.status;throw e;}return data;}finally{clearTimeout(timer)}}
 const path=channel=>{if(!['live','ptu'].includes(channel))throw Error('Csak LIVE vagy PTU közös készlet használható.');return'/api/inventory/stock?channel='+channel;};
 function record(data,channel){if(!data||data.format!==1||data.channel!==channel||typeof data.ownerId!=='string'||!data.ownerId||!((data.revision===null&&data.snapshot===null)||(typeof data.revision==='string'&&data.revision&&data.snapshot)))throw Error('Nem támogatott közös készletformátum.');if(data.snapshot){Stock.validate(data.snapshot,channel);data.snapshot=Stock.backup(data.snapshot).snapshot;}return data;}
 return{provider:'sites-d1',async session(){const s=await request('/api/inventory/session');if(s?.format!==1||typeof s.authenticated!=='boolean'||s.authenticated&&typeof s.ownerId!=='string')throw Error('Nem támogatott bejelentkezési válasz.');owner=s.authenticated?s.ownerId:null;return s;},async read(channel){return record(await request(path(channel)),channel);},async write(channel,snapshot,expectedRevision){const safe=Stock.backup(snapshot).snapshot;if(safe.channel!==channel)throw Error('Eltérő készletcsatorna.');return record(await request(path(channel),{method:'PUT',headers:{'Content-Type':'application/json','x-spg-client':'inventory-v1','x-spg-owner':owner||''},body:JSON.stringify({format:1,expectedRevision,snapshot:safe})}),channel);}};
 }
 return{FORMAT:1,create};
})();
if(typeof module!=='undefined')module.exports=FabricatorCloud;
