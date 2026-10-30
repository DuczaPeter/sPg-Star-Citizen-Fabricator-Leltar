// Deliberate legacy recovery, only for the previously recorded matching cloud owner.
(()=>{
 const account=window.accountSession,scope=account?.scope;if(!scope)return;
 let offered='';
 function current(){return activeOnlineChannel||(activeOrigin==='import'?'import':requestedChannel)}
 function refresh(){const ch=current();let eligible=false;try{eligible=scope.legacy(ch)&&!!(scope.legacyRead(FabricatorStock.key(ch),ch)||scope.legacyRead(ownershipKey(ch),ch));}catch{}$('legacyPanel').hidden=!eligible;offered=eligible?ch:'';$('legacyStatus').textContent='A frissítés előtti '+ch.toUpperCase()+' helyi adatok ehhez a fiókhoz kapcsolódtak. Átvételkor csak a még üres saját tárolókat töltjük fel; meglévő készletet vagy receptlistát nem írunk felül. A régi másolat megmarad.';}
 const previous=window.refreshShell;window.refreshShell=(...args)=>{previous?.(...args);refresh()};
 $('legacyClaim').onclick=async()=>{if(!await account.check()||!offered)return;const ch=offered;try{
 const stockText=scope.legacyRead(FabricatorStock.key(ch),ch),ownedText=scope.legacyRead(ownershipKey(ch),ch);
 // Validate every candidate before making any copy. Old records are never removed.
 const stock=stockText?FabricatorStock.validate(JSON.parse(stockText),ch):null,owned=ownedText?FabricatorOwnership.validate(JSON.parse(ownedText)):null;
 if(stock&&!accountStorage.getItem(FabricatorStock.key(ch)))accountStorage.setItem(FabricatorStock.key(ch),JSON.stringify(FabricatorStock.backup(stock).snapshot));
 if(owned&&!accountStorage.getItem(ownershipKey(ch)))accountStorage.setItem(ownershipKey(ch),JSON.stringify(owned));
 location.reload();
 }catch(e){$('legacyStatus').textContent='Az átvétel nem fejeződött be. A régi mentés megmaradt: '+e.message;}};refresh();
})();
