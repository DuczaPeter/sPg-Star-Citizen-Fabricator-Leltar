# Biztonság / Security

## Magyar

Érintett területek: fiókok közti adatszivárgás, megbízhatatlan identitásfejléc elfogadása, Origin/CAS védelem megkerülése, rosszindulatú import és titok/log kiszivárgása. Az élő rendszert ne teszteld más felhasználó adatával vagy romboló kérésekkel. Reprodukálj szintetikus adattal helyi környezetben. Ne tegyél tokent, cookie-t, privát képet, készletmentést vagy részletes OCR-logot nyilvános issue-ba.

A repository még nincs létrehozva e csomag készítésekor, ezért nem találunk ki security e-mailt vagy privát bejelentő URL-t. A tulajdonos publikáláskor állítsa be a tényleges privát bejelentési csatornát/GitHub private vulnerability reportingot, ha elérhető. A csatorna hiányában ne publikáld a kihasználáshoz szükséges érzékeny részleteket.

A session/stock no-store, a PUT azonos Origint és szerveres ownert igényel. Ezek nem teszik a nyers headeres authot biztonságossá tetszőleges külső hostingon. A CDN és npm függőségek külön bizalmi lánc; a lockfile, frissítés és upstream biztonsági információk ellenőrzése szükséges. V026 ismert kivétel: megjegyzett mappahandle csak csatorna szerinti; közös böngészőn külön profil ajánlott, amíg célzott javítás nem történik.

## English

Security scope includes cross-account exposure,untrusted identity headers,Origin/CAS bypass,malicious imports and secret/log disclosure. Test locally with synthetic records,not destructive requests or other users' production data. Never post tokens,cookies,private screenshots,stock backups or detailed OCR reports publicly.

No repository/security address exists yet for this manual package,so none is invented. The owner should configure a real private channel or GitHub private vulnerability reporting when available. Until then,do not publish sensitive exploitation details.

Session/stock responses use no-store;PUT requires same Origin and server owner. This does not secure raw trusted-header auth on arbitrary external hosting. CDN/npm supply chains require lockfile/update/upstream-security review. Known V026 exception:remembered folder handles are only channel-scoped;use separate shared-machine browser profiles until targeted hardening.
