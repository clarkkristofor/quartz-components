# quartz-components

Custom components for [Quartz v5](https://quartz.jzhao.xyz/), built as installable plugins via the `quartz plugin add` workflow.

> **Status:** `BookGrid` is the only component currently built, installed, and confirmed working under Quartz v5's plugin build pipeline. Several other components (`rpg-grid`, `garden-section`, `page-logo`, `folder-grid-system`, `chapter-nav`, `swords-beyond-sidebar`) exist in this repo as source ported from an earlier v4 site, but have not yet been rebuilt/verified against the v5 scaffold. Treat anything not listed below as in-progress.

## Components

### BookGrid

Renders a filtered, sorted grid of book notes from a folder, based on a `date_finished` frontmatter field.

Status is derived via `getBookStatus`:
- empty `date_finished` → `to-read`
- future `date_finished` → `reading`
- today or past `date_finished` → `finished`

**Install**

```bash
npx quartz plugin add github:clarkkristofor/quartz-components --subdir book-grid
```

**Options**

| Option | Type | Default | Description |
|---|---|---|---|
| `folder` | `string` | `"books"` | Folder to pull book notes from (direct children only) |
| `status` | `"to-read" \| "reading" \| "finished"` | `"finished"` | Which status bucket to display |
| `sectionTitle` | `string` | `""` | Optional linked `<h1>` section header (e.g. `"Books"`) |
| `sectionLink` | `string` | `""` | Href for `sectionTitle` |
| `title` | `string` | `""` | Optional plain `<h2>` subtitle (e.g. `"Reading Now"`) |
| `limit` | `number` | `6` | Max cards to show. **Use `0` for unbounded** — omitting the key falls back to the default of `6`, it does not mean unlimited |
| `coverWidth` | `number` | `150` | Fixed card width in px |
| `className` | `string` | `"book-grid"` | Wrapper class |
| `restrictTo` | `("home" \| "folderPage")[]` | `["home"]` | Which page contexts this instance is allowed to render on. Empty array = unrestricted. `"folderPage"` matches the exact slug `{folder}/index` |

**Multiple instances**

Since `status` and `restrictTo` let you show different slices on different pages, you'll often want more than one instance of `BookGrid` in your config. Give each a unique `name` to disambiguate:

```yaml
  - source: github:clarkkristofor/quartz-components
    name: bookgrid-reading-now
    options:
      folder: books
      status: reading
      sectionTitle: "Books"
      sectionLink: "/books/"
      title: "Reading Now"
      limit: 5
      className: book-grid
      restrictTo: ["home"]
    order: 50
    layout:
      position: afterBody
      priority: 25

  - source: github:clarkkristofor/quartz-components
    name: bookgrid-read
    options:
      folder: books
      status: finished
      title: "Read"
      limit: 0
      className: book-grid
      restrictTo: ["folderPage"]
    order: 51
    layout:
      position: afterBody
      priority: 25
```

**Known limitations**

- Requires the `date_finished` frontmatter convention described above; notes without it won't sort or bucket correctly.
- `limit: 0` is the only way to get an unbounded grid — an omitted `limit` key falls back to the default of `6`.
- `restrictTo: ["folderPage"]` matches only the exact slug `{folder}/index`.
- Cards are fixed-width (`coverWidth`) and wrap via flexbox rather than resizing to fit a fixed column count.
- No pagination — `limit` truncates, it doesn't page.
- Cover images render with empty `alt=""`; no accessible alt text is generated from frontmatter.
- Author display reads `author` or `authors` frontmatter keys specifically; other field names aren't picked up.

## License

MIT