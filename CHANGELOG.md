# Changelog / Változások

## V026 — accepted application baseline

Fixed / Javítva:ordinary visible-window blur previously hid the entire app while awaiting identity return. Removed the incorrect blur-conceal listener. Focus rechecks the same account without hiding valid visible content;real document-hidden and uncertain-identity protections remain. Regression first reproduced the V025 failure and passes V026. OCR,quantities,server schema and save semantics are unchanged.

## V026 — documentation/package revision1 (2026-10-30)

Added / Hozzáadva:equivalent Hungarian/English README,user guide,architecture/rationale,development/testing and skill documentation;actual V026 local UI screenshots;own social preview and technical diagram;source/skill provenance and exclusions;MIT for original code at owner's choice;third-party/privacy/security notices;portable release gate,synthetic Set Cover oracle and CI;inventory/checksums and publication instructions. Original accepted UI bytes retained. No application version bump or live deployment.

Packaging changes:deployment ID removed,public fixture paths configurable,private acceptance blocks excluded,archived skill TypeScript excluded from app tsc,CommonJS boundary added for skill tests,platform scaffolding restored separately from an authorized compatible source. Full external datasets/rights-unclear reference images are not redistributed. None of these implies a runtime feature change.

## Earlier accepted milestones / Korábbi elfogadott lépések

- V025:verified-account browser namespaces,guest separation,explicit legacy recovery and former-owner applied-draft preservation. Known exception discovered during packaging:folder handles remained channel-only.
- V024:matrix height follows visible viewport/root scrolling without depending on unrelated sidebar disclosure.
- V023:compact manual/OCR/source controls preserve useful matrix area.
- V022:own-account Sites D1 stock sync and atomic revision protection.
- Earlier releases:exact-Q matrix with Q500,resource+item coverage,owned recipes,OCR review/DC,local snapshots,backups,manual entry and bounded operation logs. Historical detailed assertions remain in artifacts/release-v026.json;they are not newly rerun image/device evidence.
