// Source quality bands stay intact. Inventory adds the user-reported dismantling Q500 separately.
const FabricatorQuality=(()=>{
 const key=typeof module!=='undefined'?require('./material-colors.cjs').materialKey:materialKey;
 function validate(data){
  const bad=(code,message)=>{throw SPGVersioning.compatibilityError(code,message)};
  if(!data||typeof data!=='object'||Array.isArray(data)||!data.mineableElements||typeof data.mineableElements!=='object'||Array.isArray(data.mineableElements)||!Object.keys(data.mineableElements).length)bad('MINING_SCHEMA','Hiányzó bányászati anyagjegyzék.');
  if(data.schema!==undefined&&data.schema!==1)bad('MINING_SCHEMA_VERSION','Új bányászati séma: programellenőrzés szükséges.');
  const validSteps=a=>Array.isArray(a)&&a.length>0&&a.length<=128&&a.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=1000&&(!i||n>a[i-1]));
  if(!validSteps(data.qualityBandBoundaries))bad('QUALITY_BOUNDARIES','Hiányzó vagy nem támogatott minőségi lépcsőhatárok.');
  for(const [id,r] of Object.entries(data.mineableElements)){
   if(!r||typeof r.name!=='string'||!r.name.trim()||(r.materialName!==undefined&&(typeof r.materialName!=='string'||!r.materialName.trim())))bad('QUALITY_MATERIAL_NAME','Hiányzó vagy hibás bányászati anyagnév: '+id);
   if(!validSteps(r.qualityBands)||r.qualityBands.length!==data.qualityBandBoundaries.length)bad('QUALITY_STEPS','Hiányzó, rendezetlen vagy eltérő hosszúságú qualityBands: '+r.name);
  }
  if(!data.meta||data.meta.totalElements!==Object.keys(data.mineableElements).length)bad('MINING_COUNTS','A bányászati anyagszám nem egyezik a tartalommal.');
  return {elements:Object.keys(data.mineableElements).length,steps:data.qualityBandBoundaries.length};
 }
 const inventoryProfile=p=>({...p,inventoryValues:[...new Set([...p.values,500])].sort((a,b)=>a-b),userValues:p.values.includes(500)?[]:[500]});
 function prepare(data,names){
  if(!data)return{available:false,build:null,steps:0,inventorySteps:1,materials:Object.fromEntries(names.map(n=>[n,inventoryProfile({status:'unavailable',values:[],sourceIds:[]})]))};
  validate(data);const index=new Map();
  for(const [id,r] of Object.entries(data.mineableElements)){const k=key(r.materialName||r.name);if(!index.has(k))index.set(k,[]);index.get(k).push({id,values:r.qualityBands})}
  const materials={};for(const name of names){const matches=index.get(key(name))||[],variants=[...new Set(matches.map(r=>JSON.stringify(r.values)))];materials[name]=inventoryProfile({status:variants.length===1?'verified':variants.length?'ambiguous':'missing',values:variants.length===1?JSON.parse(variants[0]):[],sourceIds:matches.map(r=>r.id)})}
  return{available:true,build:data.version,steps:data.qualityBandBoundaries.length,inventorySteps:Math.max(1,...Object.values(materials).map(p=>p.inventoryValues.length)),boundaries:[...data.qualityBandBoundaries],materials};
 }
 return{validate,prepare};
})();
if(typeof module!=='undefined')module.exports=FabricatorQuality;
