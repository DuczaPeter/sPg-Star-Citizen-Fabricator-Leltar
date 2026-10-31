const vm=require('vm'),fs=require('fs'),assert=require('assert/strict');
const windowEvents={},documentEvents={},frames=[];let top=334,height=936,writes=0,observers=[];
const table={scrollWidth:1000,querySelectorAll:()=>[]};const box={offsetWidth:1000,clientWidth:1000,querySelector:()=>table,getBoundingClientRect:()=>({top}),style:{maxHeight:'',setProperty(){writes++}}};
const win={innerHeight:height,visualViewport:null,addEventListener:(n,f)=>windowEvents[n]=f};const doc={querySelector:()=>box,querySelectorAll:()=>[],addEventListener:(n,f)=>documentEvents[n]=f};
class RO{constructor(callback){this.callback=callback;observers.push(this)}observe(){}}class MO{constructor(callback){this.callback=callback}observe(){}}
vm.runInNewContext(fs.readFileSync('spg-fit.cjs','utf8'),{window:win,document:doc,requestAnimationFrame:f=>(frames.push(f),frames.length),ResizeObserver:RO,MutationObserver:MO,Math});
function flush(){while(frames.length)frames.shift()()}
flush();assert.equal(box.style.maxHeight,'578px');
// Outer page scrolling brings the matrix higher; height must update without touching any sidebar control.
top=140;assert.equal(typeof windowEvents.scroll,'function','outer scrolling must trigger sizing');windowEvents.scroll();flush();assert.equal(box.style.maxHeight,'772px');const densityWrites=writes;
// Opening an unrelated sidebar detail must not change sizing or refit text.
documentEvents.toggle({target:{closest:()=>null}});flush();assert.equal(box.style.maxHeight,'772px');assert.equal(writes,densityWrites);
// Return scroll and opening an editor inside the matrix correctly reduce the remaining viewport.
top=334;windowEvents.scroll();flush();assert.equal(box.style.maxHeight,'578px');assert.equal(writes,densityWrites);
top=500;documentEvents.toggle({target:{closest:()=>({})}});flush();assert.equal(box.style.maxHeight,'412px');
win.innerHeight=1200;windowEvents.resize();flush();assert.equal(box.style.maxHeight,'676px');
console.log('PASS: page scroll updates height immediately,sidebar toggle inert,scroll back restores height,relevant editor toggle and resize adapt;scroll does not repeatedly shrink/regrow fonts');
