import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"

/**
 * BookLibrary — a searchable, sortable list of every published book note in a folder.
 * Renders only on one page (pageSlug), e.g. content/Books/Library.md -> "books/library".
 * Deliberately shows no reading status (date_finished etc.).
 * Hide a book from the library with `library: false` in its frontmatter.
 */
export interface BookLibraryOptions {
  folder?: string     // folder slug to collect books from (subfolders included)
  pageSlug?: string   // slug of the page this renders on
  title?: string      // optional heading above the search box
  className?: string
}

const defaultOptions: Required<BookLibraryOptions> = {
  folder: "books",
  pageSlug: "books/library",
  title: "",
  className: "book-library",
}

const asText = (v: unknown): string =>
  Array.isArray(v) ? v.join(", ") : v === undefined || v === null ? "" : String(v)

// Sort key: last name of the first author ("Justo L. González; ..." -> "gonzález")
function authorSortKey(author: string): string {
  const first = (author.split(/;|,| & | and /)[0] ?? "").replace(/\(.*?\)/g, "").replace(/\bet al\.?/g, "").trim()
  const parts = first.split(/\s+/).filter((p) => !/^(jr\.?|sr\.?|ii|iii|phd|md)$/i.test(p))
  return (parts[parts.length - 1] ?? "").toLowerCase()
}

const cover = (url: string): string => url.replace(/^http:/, "https:").replace("&edge=curl", "")

export default ((opts?: BookLibraryOptions) => {
  const options = { ...defaultOptions, ...opts }

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const slug = (props.fileData.slug ?? "").toLowerCase()
    if (slug !== options.pageSlug.toLowerCase()) return null

    const folder = options.folder.toLowerCase() + "/"
    const books = props.allFiles
      .filter((page) => {
        const s = (page.slug ?? "").toLowerCase()
        if (!s.startsWith(folder) || s.endsWith("index") || s === slug) return false
        // Skip Bases views and canvases (e.g. "Books Read.base")
        const fp = String((page as { filePath?: string }).filePath ?? "").toLowerCase()
        if (fp.endsWith(".base") || fp.endsWith(".canvas")) return false
        const fm = (page.frontmatter ?? {}) as Record<string, unknown>
        return fm.library !== false && fm.library !== "false"
      })
      .map((page) => {
        const fm = (page.frontmatter ?? {}) as Record<string, unknown>
        const title = asText(fm.title) || (page.slug ?? "").split("/").pop() || "Untitled"
        const author = asText(fm.author || fm.authors)
        const publisher = asText(fm.publisher)
        const year = asText(fm.published || fm.year)
        const categories = asText(fm.categories)
        const image = asText(fm.image || fm.coverUrl)
        return { slug: page.slug ?? "", title, author, publisher, year, categories, image }
      })
      .sort((a, b) => {
        const ka = authorSortKey(a.author), kb = authorSortKey(b.author)
        if (!ka !== !kb) return ka ? -1 : 1   // books with no author go last
        return ka.localeCompare(kb) || a.title.localeCompare(b.title)
      })

    if (books.length === 0) return null

    return (
      <div class={options.className}>
        {options.title && <h2>{options.title}</h2>}
        <div class="library-controls">
          <input type="search" class="library-search" placeholder="Search title, author, publisher…" aria-label="Search the library" />
          <select class="library-sort" aria-label="Sort by">
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
        </div>
        <p class="library-count" data-total={books.length}>{books.length} books</p>
        <ul class="library-list">
          {books.map((b) => (
            <li
              class="library-item"
              key={b.slug}
              data-search={`${b.title} ${b.author} ${b.publisher} ${b.categories}`.toLowerCase()}
              data-title={b.title.toLowerCase().replace(/^(the|a|an) /, "")}
              data-author={authorSortKey(b.author)}
              data-year={b.year}
            >
              <a href={`/${b.slug}`} class="internal library-link">
                <span class="library-cover">{b.image && <img src={cover(b.image)} alt="" loading="lazy" />}</span>
                <span class="library-text">
                  <span class="library-title">{b.title}</span>
                  {b.author && <span class="library-author">{b.author}</span>}
                  {(b.publisher || b.year) && (
                    <span class="library-meta">{[b.publisher, b.year].filter(Boolean).join(" · ")}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p class="library-empty" hidden>No books match.</p>
      </div>
    )
  }

  // Client-side search and sort. Runs on first load and after every SPA navigation.
  Component.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const root = document.querySelector(".${options.className}")
  if (!root || root.dataset.ready) return
  root.dataset.ready = "1"
  const input = root.querySelector(".library-search")
  const sort = root.querySelector(".library-sort")
  const list = root.querySelector(".library-list")
  const count = root.querySelector(".library-count")
  const empty = root.querySelector(".library-empty")
  const items = Array.from(list.children)
  const total = items.length

  const filter = () => {
    const terms = input.value.toLowerCase().trim().split(/\\s+/).filter(Boolean)
    let shown = 0
    for (const li of items) {
      const hay = li.dataset.search || ""
      const match = terms.every((t) => hay.includes(t))
      li.hidden = !match
      if (match) shown++
    }
    count.textContent = shown === total ? total + " books" : shown + " of " + total + " books"
    empty.hidden = shown !== 0
  }

  const reorder = () => {
    const key = sort.value
    const sorted = items.slice().sort((a, b) => {
      if (key === "year") return (b.dataset.year || "0").localeCompare(a.dataset.year || "0")
      const va = a.dataset[key] || "", vb = b.dataset[key] || ""
      if (!va !== !vb) return va ? -1 : 1
      return va.localeCompare(vb) ||
             (a.dataset.title || "").localeCompare(b.dataset.title || "")
    })
    for (const li of sorted) list.appendChild(li)
  }

  input.addEventListener("input", filter)
  sort.addEventListener("change", reorder)
})
`

  Component.css = `
.book-library .library-controls { display: flex; gap: 0.5rem; margin: 1rem 0 0.25rem; }
.book-library .library-search { flex: 1; min-width: 0; padding: 0.5rem 0.75rem; font: inherit; color: var(--dark);
  background: var(--light); border: 1px solid var(--lightgray); border-radius: 6px; }
.book-library .library-sort { padding: 0.5rem; font: inherit; color: var(--dark); background: var(--light);
  border: 1px solid var(--lightgray); border-radius: 6px; }
.book-library .library-count { margin: 0.25rem 0 0.75rem; font-size: 0.85rem; color: var(--gray); }
.book-library .library-list { list-style: none; padding: 0; margin: 0; }
.book-library .library-item { margin: 0; padding: 0; }
.book-library .library-item[hidden] { display: none; }
.book-library .library-link { display: flex; gap: 0.75rem; align-items: center; padding: 0.4rem 0;
  border-bottom: 1px solid var(--lightgray); text-decoration: none; color: inherit; background: none; }
.book-library .library-link:hover .library-title { color: var(--secondary); }
.book-library .library-cover { flex: 0 0 40px; width: 40px; height: 60px; background: var(--lightgray); border-radius: 2px; overflow: hidden; }
.book-library .library-cover img { width: 100%; height: 100%; object-fit: cover; display: block; margin: 0; }
.book-library .library-text { display: flex; flex-direction: column; min-width: 0; }
.book-library .library-title { font-weight: 600; line-height: 1.3; }
.book-library .library-author { font-size: 0.85rem; }
.book-library .library-meta { font-size: 0.75rem; color: var(--gray); }
`

  return Component
}) satisfies QuartzComponentConstructor<BookLibraryOptions>
