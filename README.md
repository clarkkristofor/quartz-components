# v4 → v5 migration notes

## Hosting
One bundled repo: `github.com/clarkkristofor/quartz-components`, each
component in its own `plugins/<name>` subfolder. `quartz.config.yaml`
references each one as `github:clarkkristofor/quartz-components//plugins/<name>`.
**Verify that `//subpath` syntax** against the actual CLI/docs before your
first `npx quartz plugin add` — inferred from general git-source convention,
not a confirmed Quartz example.

## Components — all ported from real source now
- `page-logo` — complete, including the gradient stops from your latest upload.
- `rpg-grid` — unchanged logic. Registers `index-only`, reused by every other
  homepage-only component.
- `garden-section` — unchanged logic, using the real `SimpleList.tsx` (icon
  branching for music/RPG/notes).
- `book-grid` — unchanged logic. Shows *finished* books (has `date_finished`).
- `generic-grid` — unchanged logic from your real upload. Note the inverted
  assumption from my earlier reconstruction: on the books folder, this shows
  books *without* a `date_finished` (currently-reading / recommendations),
  and shows everything for any other folder.
- `folder-grid-system` — unchanged, combines `book-grid` (Read) +
  `generic-grid` (Recs) on the books page, falls back to `generic-grid` alone
  elsewhere.
- `chapter-nav` — unchanged, exports `ChapterNavNext` (the real one, not a
  community-plugin guess) and a no-op `ChapterNavPrev` kept for parity.
- `swords-beyond-sidebar` — registers `swords-beyond`, now renders the real
  `ChapterNavNext` alongside `TableOfContents`.
- `_shared/BaseGrid.tsx` — card renderer shared by `book-grid` and `generic-grid`.

## Still open
1. **Two `garden-section` entries, same source, different options** (Music /
   Notes). Guessed `order: 1` / `order: 2` as the disambiguator — untested.
   Fallback: split into two subfolders with hardcoded options if the loader
   collides them.
2. **Manifest schema is inferred** — cross-check each `package.json`'s
   `"quartz"` field against `quartz-community/plugin-template` once cloned.
3. **`logo-lens` fill** is presumably `url(#flame-gradient)` via
   `custom.scss` rather than inline SVG — carry that CSS rule over from your
   v4 stylesheet, it wasn't part of any uploaded file.
4. First real test: push the repo, then
   `npx quartz plugin add github:clarkkristofor/quartz-components` (or the
   subpath variant) to confirm the hosting syntax before wiring the rest of
   `quartz.config.yaml` against it.
