# sPg Fabricator development contract

Purpose:help Hungarian Star Citizen users inspect exact-Q inventory through the minimum practical Fabricator recipe route,then review/save observations safely.

Canonical application baseline:V026,51dcc143331e03e92bdbbd07a6f3111374d7d1b2. Product version is release.json;package.json0.1.0 is retained framework npm metadata. Main accepted UI artifact:artifacts/fabricator-v026.html. Editable authority:page.html,root functional CJS/CSS modules,server/,app/route.ts,app/api/,db/schema.ts,drizzle migration. Generated output is not authoritative source.

Before substantial work record BASELINE,SCOPE,DO NOT TOUCH,REQUIRED GATES,ACCEPTANCE CRITERIA,TARGETED TESTS and STOP CONDITION. Preserve dirty work. No reset,force overwrite,unrelated cleanup or other-project edits. Package-only tasks do not authorize live deployment or database writes.

Critical invariants:
- Discover LIVE/PTU from manifest;validate recipe/mission/mining candidates atomically and keep last-good on failure.
- Keep resource/item distinction while covering all intended crafting inputs;unknown names/types/tiers/quantities are not guessed.
- Scope optimality to actual candidate universe;timeout means unproven. Do not conflate100% considered coverage with whole-catalog coverage.
- Use material+literalQ keys,never column index. Q500 has user provenance. Missing is not zero;approximate remains approximate;units stay explicit.
- Global observations deduplicate,never silently sum. Conflicts require review. Manual replacement and full-snapshot save remain explicit.
- Private initialization follows verified identity. Server authorizes every owner/channel query;client owner header is only a stale-account guard. CAS conflicts preserve data.
- Visible window blur stays nonblocking;real hidden/uncertain identity gates remain. Preserve former-owner applied drafts before reload.
- Known V026 exception:directory handles are channel-only,not account-scoped. Do not claim otherwise;fix only in a separately scoped hardening task.
- General metadata logging and voluntary detailed OCR evidence have different privacy scopes. Logging never owns recovery.
- Preserve accepted sPg appearance and reversible matrix fitting;styling changes cannot alter stock.

Public source cache is separate from private stock/ownership/settings/log. Browser state is not encrypted. No raw user pictures/logs/stock or credentials in commits/tests/skills. Do not distribute full SCMDB/UEX datasets without verified rights. Do not silently turn future-format storage into empty data.

Testing:python tools/check_release.py;node tools/test-public.cjs. Full typed build and cloud-test need compatible restored platform scaffolding and installed dependencies. External source tests need explicitly supplied authorized fixtures;private image benchmark is intentionally unavailable publicly. Add a regression reproducing any meaningful fix. Distinguish static,Node/VM,local D1,browser,hosted and physical-device evidence. Update HU/EN docs together and refresh affected screenshots.

Use docs/SKILLS.en.md for knowledge/module boundaries;retained snapshots are not all complete installable bundles. Prefer actual target code over stale reference assumptions.

For full GitHub release or release-package work,use docs/RELEASE_STANDARD.md. Do not load/apply the full workflow during ordinary development. The project-local pinned standard remains authoritative unless explicitly overridden by the user. Regenerate inventory/checksums only after final artifacts;never rewrite baseline hashes to conceal changes.
