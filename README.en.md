![sPg Fabricator Inventory — V026](docs/images/social-preview.png)

# sPg Star Citizen – Fabricator Inventory

[Magyar](README.md) · [English user guide](docs/USER_GUIDE.en.md) · [Architecture](docs/ARCHITECTURE.en.md)

**Check stock using as few Fabricator recipe views as possible.** The app selects recipes covering the crafting inputs reachable under your chosen filters, provides an inspection order, and records quantities at exact Q qualities through browser OCR or manual entry. Gemstones and other item inputs are included, with their type and units kept distinct.

This is an inventory assistant, not an automated manufacturer or game client. It knows quantities only from screenshots or your entries; it has no direct access to game inventory.

## Current release

- Application **V026**; documentation/package revision **1**; release standard **V4.2**.
- Accepted UI artifact: [artifacts/fabricator-v026.html](artifacts/fabricator-v026.html), preserved byte-for-byte. It is the full Sites app's frontend, **not a standalone offline HTML edition**.
- Running application: [ChatGPT Sites](https://spg-fabricator-leltar.ganoslal.chatgpt.site).
- Uploading this source repository to GitHub does not provide Sites sign-in or its database. GitHub Pages hosting is not part of this project.
- No personal stock, real user OCR reports, user screenshots, credentials or original deployment project ID are included.

![Actual V026 UI — inventory route](docs/images/inventory-desktop.jpg)

## Quick start

1. Open the Sites app and choose LIVE or PTU.
2. Under **Adatok és mentés → Saját receptjeim**, read your game logs or mark acquired recipes manually. A mission reward link does not prove that you own a recipe.
3. In **Leltározó**, use owned recipes plus defaults. Choose material order or recipe-opening order.
4. Open suggested recipes in game, select each material slot, and capture full 16:9 Fabricator screenshots.
5. Import them under **Lefedettség → Képek és OCR**. Check material, Q, quantity and unit; resolve incomplete/conflicting readings.
6. **Ellenőrzött készlet mentése** replaces that channel's snapshot with the current survey. It does not add quantities or automatically retain omitted materials.
7. For multiple devices, sign in with the same ChatGPT account and explicitly choose the first cloud load or upload under **Közös készlet**. Connected confirmed saves upload; other visible tabs check every minute and on foreground return.

## Features

| Problem | Behavior |
| --- | --- |
| Reopening many recipes | Set Cover search: greedy incumbent plus time-limited exact proof |
| Unowned catalog recipes | Owned list, defaults, manual exclusions and separate availability evidence |
| Gemstone and other item inputs | Resource/item classification with separate SCU and piece units |
| Stock by exact quality | Source Q steps plus separately identified user-observed Q500 dismantling step |
| Missing/conflicting OCR fields | Review with crops, choices and blocked invalid saves |
| Same stock in multiple recipes | Identical observations count once; different values conflict |
| No covering recipe | Manual stock entry into the same quality matrix |
| Another PC or iPad | Own-account full-snapshot sync plus JSON backup |
| Difficult diagnosis | One operation-log copy action; separate detailed OCR evidence |

## Requirements and limitations

Use a modern browser and the running Sites app. Initial source/OCR loading needs internet; cold offline startup is unsupported because account identity must be verified. Remembered folder access depends on browser support, with file selection fallback. OCR targets the tested full 16:9 layout and can fail. Q500 is added from user gameplay experience, not invented SCMDB metadata. Enabling alternatives does not establish simultaneous in-game stock visibility for every option.

Important V026 exception: remembered local log-directory handles are channel-scoped, **not account-scoped**. Stock, ownership, settings and operation history use separate account namespaces. Do not treat folder persistence as a user permission boundary on a shared browser profile. [Architecture and limits](docs/ARCHITECTURE.en.md#known-limitations).

## Development and verification

Python 3 and Node.js 22.13+ are required. A full framework build also needs compatible Sites scaffolding restored from your authorized Sites environment. Its required files/hashes are listed in `docs/PLATFORM_REQUIREMENTS.json`; platform files are not silently relicensed as project MIT code.

```sh
python tools/check_release.py
node tools/test-public.cjs
# For a full local build, follow the development guide.
```

Portable synthetic tests do not need private images. Historical real-source tests accept a separately supplied fixture directory; no full SCMDB dump is redistributed. No new image OCR benchmark, physical mobile campaign or second-real-account trial is claimed for this documentation release. [Testing](docs/TESTING.en.md) and the [release report](docs/RELEASE_REPORT.md) separate newly executed evidence from historical claims.

## Documentation

- [User guide](docs/USER_GUIDE.en.md) / [Magyar útmutató](docs/USER_GUIDE.hu.md)
- [Architecture and rationale](docs/ARCHITECTURE.en.md) / [Magyar műszaki leírás](docs/ARCHITECTURE.hu.md)
- [Development and GitHub upload](docs/DEVELOPMENT.en.md) / [Magyar fejlesztői útmutató](docs/DEVELOPMENT.hu.md)
- [Sources and tests](docs/TESTING.en.md) / [Magyar tesztleírás](docs/TESTING.hu.md)
- [Skills and reuse](docs/SKILLS.en.md) / [Skillek](docs/SKILLS.hu.md)
- [Privacy](PRIVACY.md), [security](SECURITY.md), [contributing](CONTRIBUTING.md), [release report](docs/RELEASE_REPORT.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md), [changes](CHANGELOG.md), [AI continuation rules](AGENTS.md)

## License and attribution

Original sPg contributions use MIT at the owner's explicit choice. External software, game names, databases and platform services retain their own rights. [KrovaxCode / SCMDB_DATA](https://github.com/KrovaxCode/SCMDB_DATA) supplies recipes, reward links and mining quality data. OCR uses Tesseract.js without a paid AI/API dependency.

**Unofficial Star Citizen fan project.** Not affiliated with, endorsed by or sponsored by Cloud Imperium Games or Roberts Space Industries. Star Citizen and associated marks belong to their respective rights holders.
