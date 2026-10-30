![sPg Fabricator Leltár — V026](docs/images/social-preview.png)

# sPg Star Citizen – Fabricator Leltár

[English](README.en.md) · [Magyar használati útmutató](docs/USER_GUIDE.hu.md) · [Műszaki leírás](docs/ARCHITECTURE.hu.md)

**Leltározás a lehető legkevesebb megnyitott Fabricator-receptből.** A program megkeresi a kiválasztott receptkészlettel lefedhető crafting inputokat, javasolt ellenőrzési sorrendet ad, majd képfelismeréssel vagy kézi bevitellel pontos Q-minőséghez rendeli a készletet. A drágakövek és más item inputok is szerepelnek; a típusukat és mértékegységüket külön kezeli.

Ez leltározó, nem automatikus gyártó és nem játékba belépő eszköz. A játék készletét képekből vagy általad megadott számokból ismeri; nincs közvetlen játékhozzáférése.

## Aktuális kiadás

- Program: **V026**. Dokumentációs/csomagolási revízió: **1**. Szabvány: **V4.2**.
- Fő elfogadott UI-artifact: [artifacts/fabricator-v026.html](artifacts/fabricator-v026.html), változatlan bájtokkal. Ez a teljes Sites alkalmazás frontendje, **nem önálló offline HTML-kiadás**.
- A működő alkalmazás helye: [ChatGPT Sites](https://spg-fabricator-leltar.ganoslal.chatgpt.site).
- Ez a repository forrás és dokumentáció; a GitHubra feltöltés önmagában nem indítja el a Sites bejelentkezést és adatbázist. GitHub Pages nem része a működésnek.
- A ZIP nem tartalmaz személyes készletet, valódi felhasználói OCR-logot, képeket, kulcsot vagy az eredeti telepítés projektazonosítóját.

![Valódi V026 felület — leltározási útvonal](docs/images/inventory-desktop.jpg)

## Gyors használat

1. Nyisd meg a Sites oldalt, válassz LIVE vagy PTU csatornát.
2. Az **Adatok és mentés → Saját receptjeim** részen olvasd be a játék naplóit, vagy jelöld kézzel a birtokolt recepteket. A missziós kapcsolat nem bizonyítja, hogy nálad megvan a recept.
3. A **Leltározó** fülön használd a saját recepteket és az alapból járókat. Választhatsz anyag- vagy receptsorrendet.
4. A játékban nyisd meg a javasolt recepteket, anyagonként kattints a slotra, és készíts teljes 16:9 Fabricator-képet.
5. A **Lefedettség → Képek és OCR** alatt olvasd be a képeket. Ellenőrizd az anyagot, Q-t, mennyiséget és egységet; javítsd a hiányokat/ütközéseket.
6. **Ellenőrzött készlet mentése**: a felmérés lecseréli a csatorna készletét, nem hozzáadódik. Kimaradt anyagot nem visz át automatikusan.
7. Több géphez ugyanazzal a ChatGPT-fiókkal jelentkezz be, majd a **Közös készlet** részen válaszd ki az első betöltést vagy feltöltést. Kapcsolódás után a megerősített mentések feltöltődnek; a többi látható lap percenként és visszatéréskor ellenőriz.

## Miért hasznos?

| Feladat | Megoldás |
| --- | --- |
| Sok recept ismételt nyitogatása | Set Cover keresés: greedy kezdés és időkorlátos egzakt bizonyítás |
| Nincs meg minden adatbázisbeli recept | Saját receptlista, alapreceptek, kizárás, külön megszerezhetőségi státusz |
| Gemstone vagy egyéb item alapanyag | Resource/item típusjelölés, SCU és db elkülönítése |
| Pontos készlet minőség szerint | Forrás szerinti Q-lépcsők és külön jelölt Q500 bontási lépcső |
| OCR hiány vagy két eltérő olvasat | Javítási előnézet, képkivágás, választás, blokkolt hibás mentés |
| Ugyanaz az anyag több receptben | Ismételt azonos megfigyelés egyszer számít; eltérő érték ütközés |
| Recept nélküli anyag | Kézi készletbevitel ugyanabba a minőségi mátrixba |
| Másik számítógép vagy iPad | Fiókhoz kötött teljes készlet-pillanatkép; JSON tartalék |
| Nehezen visszakereshető hiba | Egygombos működési log; külön részletes OCR-log |

## Követelmények és korlátok

A használathoz modern böngésző és a futó Sites alkalmazás kell. A forrás és az OCR-motor első betöltéséhez internet szükséges; a fiókellenőrzés miatt hideg offline indulás nem támogatott. A mappamegjegyzés böngészőfüggő; fájlválasztásos tartalék van. Az OCR a kipróbált teljes 16:9 elrendezésre készült, nem tévedhetetlen. A Q500 felhasználói játéktapasztalatból hozzáadott lépcső, nem új SCMDB-adat. Az alternatíva kapcsoló nem bizonyítja, hogy a játék egyszerre minden alternatíva készletét mutatja.

A V026-ban talált fontos kivétel: a megjegyzett helyi naplómappa-handle LIVE/PTU szerint különül el, de nem fiókonként. A készlet, saját receptlista, beállítások és működési log fióknévtere ettől külön működik. Megosztott böngészőprofilon ne tekintsd a mappamegjegyzést felhasználói jogosultsághatárnak. [Részletek és további korlátok](docs/ARCHITECTURE.hu.md#ismert-korlátok).

## Fejlesztés és ellenőrzés

Python 3 és Node.js 22.13+ szükséges. A csomagban lévő saját kód mellett a teljes framework-buildhez a kompatibilis Sites scaffoldingot a saját, jogosultan elérhető Sites környezetből kell visszaállítani. A másolásra váró fájlok hash-elt listája a `docs/PLATFORM_REQUIREMENTS.json`; a hiányzó platformfájlokat nem címkézzük át saját MIT-kódnak.

```sh
python tools/check_release.py
node tools/test-public.cjs
# A teljes helyi buildhez: lásd a fejlesztői útmutatót.
```

A csomag saját/szintetikus tesztjei nem igénylik a személyes képeket. A régi, valódi adatbázison futó tesztek külön, általad biztosított fixture-mappából indíthatók; teljes SCMDB-adatdump nincs a ZIP-ben. Új OCR-képes benchmark, új fizikai mobilteszt és második valódi fiókkal végzett próba nem része ennek a dokumentációs kiadásnak. Az aktuális eredményeket és a régi bizonyítékokat külön kezeli a [tesztleírás](docs/TESTING.hu.md) és a [kiadási jelentés](docs/RELEASE_REPORT.md).

## Dokumentáció

- [Használati útmutató](docs/USER_GUIDE.hu.md) / [English user guide](docs/USER_GUIDE.en.md)
- [Műszaki felépítés és a döntések indokai](docs/ARCHITECTURE.hu.md) / [Architecture and rationale](docs/ARCHITECTURE.en.md)
- [Fejlesztői indítás és GitHub-feltöltés](docs/DEVELOPMENT.hu.md) / [Development and upload](docs/DEVELOPMENT.en.md)
- [Adatforrások, frissítés és tesztek](docs/TESTING.hu.md) / [Sources and tests](docs/TESTING.en.md)
- [Skillek: forrás, alkalmazás és újrafelhasználás](docs/SKILLS.hu.md) / [Skills](docs/SKILLS.en.md)
- [Adatvédelem](PRIVACY.md), [biztonság](SECURITY.md), [közreműködés](CONTRIBUTING.md), [kiadási jelentés](docs/RELEASE_REPORT.md)
- [Licenc és külső komponensek](THIRD_PARTY_NOTICES.md), [változások](CHANGELOG.md), [AI-fejlesztői szabályok](AGENTS.md)

## Licenc és köszönet

A saját sPg-kód MIT-licencű a tulajdonos választása szerint. A külső kódok, játéknevek, adatbázisok és platformszolgáltatások megtartják saját jogaikat. [KrovaxCode / SCMDB_DATA](https://github.com/KrovaxCode/SCMDB_DATA) szolgáltatja a recepteket, missziós kapcsolatokat és bányászati minőségeket. Az OCR Tesseract.js-alapú, külön fizetős AI/API nélkül.

**Nem hivatalos Star Citizen rajongói projekt.** Nem kapcsolódik a Cloud Imperium Gameshez vagy a Roberts Space Industrieshez, és nem élvezi azok jóváhagyását. A Star Citizen és a kapcsolódó megjelölések joga az illetékes jogosultaké.
