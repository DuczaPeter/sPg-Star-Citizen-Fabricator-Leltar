/* Only read access is requested. Directory handles stay in this browser's IndexedDB. */
const FabricatorFolders=(()=>{
 function create({load,save,pick}){const handles=new Map();return{
  async restore(channel){const h=await load(channel);if(h?.kind==='directory'&&!handles.has(channel))handles.set(channel,h);return handles.get(channel)||null},
  get:channel=>handles.get(channel)||null,
  async choose(channel){const h=await pick(handles.get(channel));if(!h||h.kind!=='directory')throw Error('Nem mappát választottál.');handles.set(channel,h);try{await save(channel,h);return{handle:h,saved:true}}catch(e){return{handle:h,saved:false}}},
  async files(channel){const h=handles.get(channel);if(!h)throw Error('Először válaszd ki a naplómappát.');if(await h.queryPermission({mode:'read'})!=='granted'&&await h.requestPermission({mode:'read'})!=='granted')throw Error('A beolvasáshoz engedélyezd a mappa olvasását.');const files=[];for await(const entry of h.values()){if(entry.kind==='file'&&/\.(log|txt)$/i.test(entry.name))files.push(await entry.getFile())}return files}
 }}return{create};
})();
if(typeof module!=='undefined')module.exports=FabricatorFolders;
let fallbackLogFiles=[],folderChannel=null,folderDB;
function openFolderDB(){if(!folderDB)folderDB=new Promise((resolve,reject)=>{const r=indexedDB.open('spg-fabricator-log-folders',1);r.onupgradeneeded=()=>r.result.createObjectStore('folders');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('A mappamentés most nem érhető el.'))});return folderDB}
async function folderLoad(ch){const db=await openFolderDB();return new Promise((resolve,reject)=>{const tx=db.transaction('folders','readonly'),r=tx.objectStore('folders').get(ch);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)})}
async function folderSave(ch,h){const db=await openFolderDB();return new Promise((resolve,reject)=>{const tx=db.transaction('folders','readwrite');tx.objectStore('folders').put(h,ch);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('A mappamentés megszakadt.'))})}
const logFolders=FabricatorFolders.create({load:folderLoad,save:folderSave,pick:startIn=>window.showDirectoryPicker({id:'spg-fabricator-logbackups',mode:'read',...(startIn?{startIn}:{})})});
function refreshFolderAccess(){const ch=ownershipChannel();if(ch===folderChannel)return;folderChannel=ch;fallbackLogFiles=[];$('logFolderPath').textContent='D:\\Roberts Space Industries\\StarCitizen\\'+(ch==='ptu'?'PTU':'LIVE')+'\\logbackups';$('logFolderStatus').textContent='Mentett mappa ellenőrzése…';logFolders.restore(ch).then(h=>{if(folderChannel===ch)$('logFolderStatus').textContent=h?'Megjegyzett mappa: '+h.name+'. Beolvasáskor a böngésző engedélyt kérhet.':'Még nincs kiválasztott mappa.'}).catch(()=>{if(folderChannel===ch)$('logFolderStatus').textContent='Még nincs elérhető mentett mappa.'})}
function initFolderAccess(){
 $('chooseLogFolder').onclick=async()=>{if(busy||ownershipScanning)return;if(typeof window.showDirectoryPicker!=='function'){$('ownedFolder').click();return}const ch=ownershipChannel();try{const r=await logFolders.choose(ch);if(ch!==ownershipChannel())return;$('logFolderStatus').textContent=r.saved?'Mappa megjegyezve: '+r.handle.name+'. Kattints a Beolvasás gombra.':'Mappa kiválasztva: '+r.handle.name+'. A böngésző most nem tudta megjegyezni.'}catch(e){if(e.name!=='AbortError'){$('logFolderStatus').textContent='A tartós mappaválasztás nem érhető el; válaszd ki újra az egyszeri mappaválasztóval.';$('ownedFolder').click()}}};
 $('readLogFolder').onclick=async()=>{if(busy||ownershipScanning||!raw)return;const ch=ownershipChannel();try{if(fallbackLogFiles.length){await importOwnedFiles(fallbackLogFiles);return}const files=await logFolders.files(ch);if(ch!==ownershipChannel())return;await importOwnedFiles(files)}catch(e){$('ownedProgress').textContent=e.message}};
 refreshFolderAccess();
}
