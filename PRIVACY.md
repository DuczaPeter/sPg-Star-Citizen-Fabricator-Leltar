# Adatvédelem / Privacy — V026

## Magyar

A képek OCR-feldolgozása a böngészőben történik. A Tesseract motor, worker, WASM és angol modell CDN-ről töltődhet; ezek a hálózati szolgáltatók szokásos kapcsolati adatokat láthatnak. A SCMDB JSON-lekérés szintén közvetlen hálózati kérés. Saját analytics és automatikus távoli logküldés nincs a kódban; a Sites és a böngésző saját szolgáltatási adatkezelése ettől külön kérdés.

A helyi böngésző tárolja a megerősített készletet, sajátlistát, beállításokat, cloud preferenciát, korlátozott működési naplót, valamint szükség esetén az alkalmazott draftot. A public forráscache külön van. A fájlválasztás/kép eredeti tartalma és OCR-kivágások az ellenőrzési munkamenetben maradnak; a készletsnapshot nem tárolja őket. A megjegyzett naplómappa-handle IndexedDB-ben V026-ban LIVE/PTU szerint, nem fiókonként elkülönül.

Opcionális közös készletnél a Sites D1 a belső owner UUID-t, hitelesítésszolgáltató/subject kapcsolatot, csatornát, revíziót, időpontot és a megerősített sorokat, valamint előző snapshotot tárol. A szolgáltatás nem ment e-mailt vagy nevet. A platform a bejelentkezést kezeli. A kliens nem választhat tetszőleges owner rekordot; a Site tulajdonos/admin adatbázis-kezelési jogosultsága más szint, mint egy átlagos oldalnéző hozzáférése.

Az általános log metadata; a részletes OCR-log fájlnevet, anyagot, Q-t, mennyiséget és olvasatokat is tartalmazhat. Ne töltsd fel ezeket nyilvános issue-ba ellenőrzés nélkül. A készlet-JSON is saját készletadat. Sem az AI, sem a fejlesztő nem látja automatikusan a helyi képeidet/logjaidat.

A helyi adat nincs alkalmazásszinten titkosítva; közös OS/böngészőprofil adminisztrátora olvashatja. Külön fiókok készlete névtérrel különül el, de ez nem védi az adatot a helyi rendszeradminisztrátortól. A böngészőadatok törlése törli a helyi példányt. A kijelentkezés vagy Csak helyi készlet nem törli a szerveres snapshotot. Szerveres törlő UI/API nincs ebben a kiadásban; adatkezelési kérésnél a Site tényleges üzemeltetőjéhez kell fordulni. A ZIP nem tartalmaz felhasználói állapotot.

## English

OCR runs inside the browser. Engine,worker,WASM and English model can download from CDN providers,which can observe normal connection metadata. SCMDB JSON requests also go directly over the network. The app contains no own analytics or automatic remote diagnostic upload;Sites/browser service processing is separate.

Browser storage holds confirmed stock,ownership,settings,cloud preferences,bounded operation history and where needed applied drafts. Public source cache is separate. Original images/crops stay in the review session and are excluded from stock snapshots. V026 remembered log-directory handles in IndexedDB are channel-scoped rather than account-scoped.

Optional Sites D1 sync stores portable owner UUID,provider/subject mapping,channel,revision,time,confirmed rows and previous snapshot. The service does not persist email or name. The platform handles authentication. Clients cannot select arbitrary owners;Site operator/database administration is distinct from ordinary visitor access.

General logs contain metadata;detailed OCR reports can contain filenames,materials,Q,quantities and candidate readings. Review before posting publicly. Stock JSON is also user data. AI/developers do not automatically see your local pictures/logs.

Local storage is not application-encrypted;OS/browser-profile administrators can inspect it. Account namespaces are not protection from the local administrator. Clearing site data deletes local copies. Sign-out/local-only mode does not delete server snapshots. This release has no server deletion UI/API;contact the actual Site operator for data-management requests. The ZIP contains no user state.
