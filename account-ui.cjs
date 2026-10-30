// Bootstrap before any user-owned record is read. Recheck on return and before cloud transfers.
const accountSession=(()=>{
 let auth=null,scope=null,pending=null,changed=false,epoch=0,suspended=false,bootFailed=false;const listeners=[];
 const gate=()=>document.getElementById('accountGate'),status=()=>document.getElementById('accountGateStatus');
 function conceal(message){document.body.classList.add('account-locked');status().textContent=message;gate().hidden=false;scope?.suspend();}
 async function read(){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);try{const r=await fetch('/api/inventory/session',{credentials:'same-origin',cache:'no-store',signal:controller.signal});if(!r.ok)throw Error('A bejelentkezés most nem ellenőrizhető.');const a=await r.json();FabricatorAccount.identity(a);return a;}finally{clearTimeout(timer)}}
 function reveal(){scope.resume();gate().hidden=true;document.body.classList.remove('account-locked');}
 async function check(){if(changed||suspended||document.visibilityState==='hidden')return false;if(pending)return pending;let retry=false;const started=epoch;pending=(async()=>{try{const next=await read();if(started!==epoch){retry=true;return false;}if(suspended||document.visibilityState==='hidden')return false;if(scope&&FabricatorAccount.identity(next)!==scope.scope){try{for(const fn of listeners)fn()}catch{conceal('Fiókváltás történt, de a nem mentett előnézetet nem sikerült eltárolni. Nem töltjük újra az oldalt. Térj vissza az eredeti fiókhoz a módosítások megőrzéséhez.');return false;}changed=true;conceal('Másik fiók lett aktív. A korábbi készletet elkülönítve megőriztük; az oldal újratöltődik.');location.reload();return false;}if(bootFailed){location.reload();return false;}auth=next;if(!scope){scope=FabricatorAccount.create(localStorage,auth);window.accountStorage=scope.storage;}reveal();return true;}catch{conceal('A fiók most nem ellenőrizhető. A készletet biztonságosan elrejtettük; a mentések megmaradtak. Kapcsolódás után próbáld újra.');return false;}finally{pending=null;if(retry&&!suspended&&!changed)queueMicrotask(()=>void check());}})();return pending;}
 document.getElementById('accountRetry').onclick=()=>{if(scope)void check();else location.reload()};
 window.addEventListener('storage',event=>{if(event.key===FabricatorAccount.ACTIVE&&scope&&event.newValue!==scope.scope){epoch++;conceal('Fiókváltás ellenőrzése…');void check();}});
 document.addEventListener('visibilitychange',()=>{epoch++;if(document.visibilityState==='hidden'){suspended=true;conceal('Bejelentkezés ellenőrzése visszatéréskor…');}else{suspended=false;void check()}});
 // Losing window focus alone is not an account change (mouse exit, browser chrome, file picker).
 window.addEventListener('focus',()=>{epoch++;suspended=false;void check()});window.addEventListener('online',()=>void check());window.addEventListener('pageshow',()=>void check());
 setInterval(()=>{if(document.visibilityState==='visible')void check()},60000);
 return{check,bootFailed(){bootFailed=true},suspend:()=>conceal('Bejelentkezés újraellenőrzése…'),get auth(){return auth},get scope(){return scope},get ready(){try{scope?.assert();return !!scope&&!changed}catch{return false}},onChange:fn=>listeners.push(fn),accept(a){if(!scope||FabricatorAccount.identity(a)!==scope.scope){conceal('A bejelentkezés megváltozott. Újraellenőrzés…');void check();return false;}return true;}};
})();
window.accountSession=accountSession;
if(!await accountSession.check()){accountSession.bootFailed();return;}
