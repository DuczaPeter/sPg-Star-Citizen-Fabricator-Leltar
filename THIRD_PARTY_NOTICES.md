# Third-party notices / Külső komponensek

Reviewed2026-10-30 for a source-only ZIP. Own-code MIT does not relicense the entries below. No node_modules,OCR binary/model or full source database is redistributed. This is not a legal opinion or a compiled-bundle transitive-license certification.

| Component | Official source | License/evidence | Package treatment |
| --- | --- | --- | --- |
| SCMDB_DATA | https://github.com/KrovaxCode/SCMDB_DATA | GitHub API license:null;no LICENSE/README/NOTICE in inspected24-entry main tree | Runtime reference/attribution;full fixtures/expanded database reports excluded;rights UNKNOWN |
| Original Refinery Kép Elemző | https://github.com/DuczaPeter/sPg-Refinery-Kep-Elemzo | MIT,2026 sPg Refinery Kép Elemző contributors | Attribution retained;historic monolith with embedded external cart image excluded from skill snapshot |
| Tesseract.js5.1.1 | https://github.com/naptha/tesseract.js/tree/v5.1.1 | Apache-2.0 | Runtime CDN dependency;license copied in docs/licenses |
| Tesseract.js-core5.1.1 | https://github.com/naptha/tesseract.js-core/tree/v5.1.1 | Apache-2.0 | Runtime WASM dependency,not bundled |
| English traineddata | https://github.com/naptha/tessdata | npm @tesseract.js-data/eng metadata MIT,but upstream gh-pages LICENSE Apache-2.0 | Exact rights/provenance not normalized to MIT;model not bundled |
| Vinext | https://github.com/cloudflare/vinext | Installed1.0.0-beta.5,MIT,2026Cloudflare | Lockfile dependency,upstream notice retained |
| Vendored Sites Vite plugin0.2.0 | scripts/vite/sites-vite-plugin.ts | MIT,2026OpenAI,adjacent explicit license | Source and license retained;this grant is not generalized to every platform helper/service |
| Remaining Sites scaffolding | Authorized Sites development environment | No blanket redistribution grant independently established here | Omitted;exact required paths/hashes and local restoration tool supplied |
| Runtime/framework dependencies | package.json/package-lock.json | Actual installed direct metadata inventory below | Code installed separately;preserve their original licenses if distributing compiled output |
| Star Citizen marks/content | https://robertsspaceindustries.com/tos | RSI terms,including XIII.D personal/fansite use | Unofficial disclaimer;no official affiliation or blanket asset rights inferred |

OCR default URLs are controlled partly by upstream5.1.1:main script https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js ;worker @v5.1.1/dist/worker.min.js ;core @v5.1.1;model @tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz. The model URL lacks an explicit npm package version. Runtime availability is not an assertion of perpetual free service or redistribution rights.

Magyar:Az SCMDB teljes adatbázisát és a jogilag nem tisztázott referencia-képeket nem csomagoljuk újra. A program a külső forrásra hivatkozik; az adat nem kerül a saját MIT-licencünk alá. A platform általános segédkódját külön, jogosultan elérhető környezetből kell visszaállítani. A letöltendő függőségek saját licencei továbbra is érvényesek.

The direct dependency declarations below were inspected from installed metadata;individual files and transitive modules can have additional notices. Exact resolution is in package-lock.json. No new claim of universal legal clearance is made.

| Direct dependency | Installed version | Declared license |
| --- | --- | --- |
| `@base-ui/react` | 1.7.0 | MIT |
| `@hookform/resolvers` | 5.7.1 | MIT |
| `@shadcn/react` | 0.3.0 | MIT |
| `class-variance-authority` | 0.7.1 | Apache-2.0 |
| `clsx` | 2.1.1 | MIT |
| `cmdk` | 1.1.1 | MIT |
| `date-fns` | 4.4.0 | MIT |
| `drizzle-orm` | 0.45.2 | Apache-2.0 |
| `embla-carousel-react` | 8.6.0 | MIT |
| `input-otp` | 1.4.2 | MIT |
| `lucide-react` | 1.31.0 | ISC |
| `next` | 16.3.4 | MIT |
| `next-themes` | 0.4.6 | MIT |
| `radix-ui` | 1.6.7 | MIT |
| `react` | 19.2.6 | MIT |
| `react-day-picker` | 10.0.1 | MIT |
| `react-dom` | 19.2.6 | MIT |
| `react-hook-form` | 7.85.0 | MIT |
| `react-resizable-panels` | 4.12.2 | MIT |
| `recharts` | 3.8.0 | MIT |
| `sonner` | 2.0.8 | MIT |
| `tailwind-merge` | 3.6.0 | MIT |
| `vaul` | 1.1.2 | MIT |
| `zod` | 3.25.76 | MIT |
| `@cloudflare/vite-plugin` | 1.37.1 | MIT |
| `@cloudflare/workers-types` | 4.20260515.1 | MIT OR Apache-2.0 |
| `@tailwindcss/postcss` | 4.2.1 | MIT |
| `@types/node` | 22.19.19 | MIT |
| `@types/react` | 19.2.14 | MIT |
| `@types/react-dom` | 19.2.3 | MIT |
| `@vitejs/plugin-react` | 6.0.2 | MIT |
| `@vitejs/plugin-rsc` | 0.5.26 | MIT |
| `drizzle-kit` | 0.31.10 | MIT |
| `eslint` | 9.39.4 | MIT |
| `eslint-config-next` | 16.3.4 | MIT |
| `json-rpc-2.0` | 1.7.1 | MIT |
| `raw-body` | 3.0.2 | MIT |
| `react-server-dom-webpack` | 19.2.6 | MIT |
| `tailwindcss` | 4.2.1 | MIT |
| `tw-animate-css` | 1.4.0 | MIT |
| `typescript` | 5.9.3 | Apache-2.0 |
| `vinext` | 1.0.0-beta.5 | MIT |
| `vite` | 8.0.13 | MIT |
| `wrangler` | 4.92.0 | MIT OR Apache-2.0 |
