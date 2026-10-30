// User-owned browser records are scoped by the server-verified identity, never by URL input.
const FabricatorAccount=(()=>{
 const PREFIX='spg.fabricator.account.v1.',ACTIVE=PREFIX+'active';
 function identity(auth){if(auth?.format!==1||typeof auth.authenticated!=='boolean'||auth.authenticated&&(typeof auth.ownerId!=='string'||!auth.ownerId||auth.ownerId.length>200))throw Error('A bejelentkezési válasz nem támogatott.');return auth.authenticated?'owner:'+auth.ownerId:'guest';}
 function create(raw,auth){const scope=identity(auth),prefix=PREFIX+encodeURIComponent(scope)+'.';let active=true;
  function assert(){if(!active)throw Error('A fiók ellenőrzés alatt áll. A helyi adatokat megőriztük.');let last;try{last=raw.getItem(ACTIVE)}catch{}if(last&&last!==scope)throw Error('Másik fiók lett aktív egy másik lapon. Töltsd újra az oldalt.');}
  function announce(){try{raw.setItem(ACTIVE,scope)}catch{}}
  const storage={getItem(k){assert();return raw.getItem(prefix+k)},setItem(k,v){assert();raw.setItem(prefix+k,v)},removeItem(k){assert();raw.removeItem(prefix+k)}};
  return{scope,prefix,storage,assert,announce,suspend(){active=false},resume(){active=true;announce()},key:k=>prefix+k,
   // Used only to preserve this already-verified account's draft during a transition.
   stash(k,v){raw.setItem(prefix+k,v)},
   legacy(channel){if(!auth.authenticated||!['live','ptu'].includes(channel))return false;return raw.getItem('spg.fabricator.cloud.local-owner.v1.'+channel)===auth.ownerId;},
   legacyRead(k,channel){if(!this.legacy(channel))throw Error('A régi helyi adat nem köthető ehhez a fiókhoz.');return raw.getItem(k)},
   previousPreference(channel){if(!this.legacy(channel))return null;return raw.getItem('spg.fabricator.cloud.v1.'+auth.ownerId+'.'+channel)}
  };
 }
 return{PREFIX,ACTIVE,identity,create};
})();
if(typeof module!=='undefined')module.exports=FabricatorAccount;
