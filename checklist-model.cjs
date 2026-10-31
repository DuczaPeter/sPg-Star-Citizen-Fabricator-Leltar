// Presentation model: assigns each newly covered input to its existing optimal step.
const checklistMaterialGroups=typeof module!=='undefined'?require('./material-colors.cjs').materialLegendGroups:materialLegendGroups;
function recipeMaterialOrder(recipe,names=recipe.mats||[]){
 const wanted=new Set(names),ordered=[];
 for(const slot of recipe.slots||[])for(const option of slot.options||[]){const name=option.type==='resource'?option.resourceName:option.type==='item'?option.itemName:null;if(wanted.has(name)&&!ordered.includes(name))ordered.push(name)}
 for(const name of names)if(!ordered.includes(name))ordered.push(name);
 return ordered;
}
function buildRecipeChecklist(selected,query=''){
 const q=String(query).trim().toLocaleLowerCase('hu');
 return selected.map((recipe,index)=>{const ordered=recipeMaterialOrder(recipe,recipe.newMats);const recipeMatch=recipe.name.toLocaleLowerCase('hu').includes(q);return{step:index+1,recipe,materials:ordered.filter(name=>!q||recipeMatch||name.toLocaleLowerCase('hu').includes(q)),previouslyCovered:recipeMaterialOrder(recipe,recipe.mats.filter(m=>!recipe.newMats.includes(m)))}}).filter(g=>g.materials.length);
}
if(typeof module!=='undefined')module.exports={buildRecipeChecklist,recipeMaterialOrder};
// Material-first view: same selected recipes, mining catalogue order across recipes.
function buildMaterialChecklist(selected,names,query=''){
 const q=String(query).trim().toLocaleLowerCase('hu'),assigned=new Map();
 selected.forEach((recipe,index)=>recipe.mats.forEach(name=>{if(!assigned.has(name))assigned.set(name,{recipe,step:index+1})}));
 const buckets=[{id:'ship',title:'Ship Mineables',sections:[]},{id:'roc',title:'ROC Mineables',sections:[]},{id:'fps',title:'FPS Mineables',sections:[]},{id:'salvage',title:'Salvage',sections:[]},{id:'other',title:'Egyéb crafting inputok',sections:[]}];
 for(const group of checklistMaterialGroups([...new Set(names)])){
  const bucket=buckets.find(b=>b.id===group.id)||buckets[0];
  const rows=group.names.map(name=>({name,context:group.id,...assigned.get(name)})).filter(row=>!q||row.name.toLocaleLowerCase('hu').includes(q)||row.recipe?.name.toLocaleLowerCase('hu').includes(q));
  if(rows.length)bucket.sections.push({...group,rows});
 }
 return buckets.filter(b=>b.sections.length);
}
if(typeof module!=='undefined')module.exports.buildMaterialChecklist=buildMaterialChecklist;
