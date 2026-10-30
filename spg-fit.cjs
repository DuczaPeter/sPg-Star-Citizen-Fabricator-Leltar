// Width fits text; viewport position fits height. Sidebar details never drive the matrix.
(()=>{let frame=0,previousWidth=0,densityDirty=true;const box=document.querySelector('[data-spg-fit]');if(!box)return;
function schedule(){if(!frame)frame=requestAnimationFrame(fit)}
function fit(){frame=0;const table=box.querySelector('table');if(!box.offsetWidth||!table)return;
 const viewport=window.visualViewport?.height||window.innerHeight,top=box.getBoundingClientRect().top;
 const budget=Math.floor(Math.max(180,Math.min(viewport-120,viewport-Math.max(0,top)-24)));
 if(box.style.maxHeight!==budget+'px')box.style.maxHeight=budget+'px';
 if(!densityDirty)return;densityDirty=false;
 let size=22;for(;size>=12;size--){box.style.setProperty('--spg-data-size',size+'px');if(table.scrollWidth<=box.clientWidth&&![...table.querySelectorAll('.spg-value,.quantity-placeholder')].some(cell=>cell.scrollWidth>cell.clientWidth+1))break}box.style.setProperty('--spg-data-size',Math.max(12,size)+'px');}
window.requestSPGFit=()=>{densityDirty=true;schedule()};
const ro=new ResizeObserver(entries=>{const w=entries[0].contentRect.width;if(w!==previousWidth){previousWidth=w;window.requestSPGFit()}});ro.observe(box);
new MutationObserver(window.requestSPGFit).observe(box,{childList:true,subtree:true,characterData:true});
const layoutObserver=new ResizeObserver(schedule);document.querySelectorAll('#view-matrix .inventory-tool-grid,#view-matrix .cloud-inline,#view-matrix .inventory-filterbar,#view-matrix .intro,#toggleSettings').forEach(node=>layoutObserver.observe(node));
document.addEventListener('toggle',event=>{if(event.target.closest?.('#view-matrix'))schedule()},true);
window.addEventListener('scroll',schedule,{passive:true});window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',window.requestSPGFit);window.visualViewport?.addEventListener('resize',window.requestSPGFit);document.fonts?.ready.then(window.requestSPGFit);window.requestSPGFit();})();
