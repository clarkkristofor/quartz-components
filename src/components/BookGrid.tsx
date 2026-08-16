import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"
import { getBookStatus } from "../util/bookStatus"
import type { BookStatus } from "../util/bookStatus"

export type BookGridContext = "home" | "folderPage"

export interface BookGridOptions {
  folder?: string
  status?: BookStatus
  title?: string
  limit?: number
  coverWidth?: number
  className?: string
  restrictTo?: BookGridContext[]
}

const defaultOptions: Required<BookGridOptions> = {
  folder: "books",
  status: "finished",
  title: "",
  limit: 6,
  coverWidth: 150,
  className: "book-grid",
  restrictTo: ["home"],
}

export default ((opts?: BookGridOptions) => {
  const options = { ...defaultOptions, ...opts }

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const slug = props.fileData.slug ?? ""
    const isHome = slug === "index" || slug === "" || slug === "/"
    const isFolderIndex = slug === `${options.folder}/index`

    if (options.restrictTo.length > 0) {
      const contextMatches =
        (options.restrictTo.includes("home") && isHome) ||
        (options.restrictTo.includes("folderPage") && isFolderIndex)
      if (!contextMatches) return null
    }

    const folder = options.folder
    const pages = props.allFiles
      .filter((page) => {
        const pslug = page.slug ?? ""
        const isDirectChild = pslug.split("/").length === folder.split("/").length + 1
        if (!pslug.startsWith(folder + "/") || pslug.endsWith("index") || !isDirectChild) return false
        return getBookStatus(page.frontmatter) === options.status
      })
      .sort((a, b) => {
        const dateA = a.frontmatter?.date_finished as string | undefined
        const dateB = b.frontmatter?.date_finished as string | undefined
        return (dateB ? new Date(dateB).getTime() : 0) - (dateA ? new Date(dateA).getTime() : 0)
      })

    const displayedPages = options.limit ? pages.slice(0, options.limit) : pages

    if (displayedPages.length === 0) return null

    return (
      <div class={options.className}>
        {options.title && <h2 class="garden-title">{options.title}</h2>}
        <div class="folder-grid" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
          {displayedPages.map((page) => {
            const fm = (page.frontmatter ?? {}) as Record<string, any>
            const targetLink = (fm.link || fm.url || `/${page.slug}`) as string
            const imageUrl = fm.image || fm.coverUrl
            const isExternal = targetLink.startsWith("http")
            const author = fm.author || fm.authors
            const authorText = Array.isArray(author) ? author.join(", ") : author

            return (
              <a href={targetLink} class="grid-card" key={page.slug}
                  title={fm.description ?? ""}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  style={{ width: `${options.coverWidth}px` }}
                >
                {imageUrl && (
                  <div class="card-image">
                    <img src={imageUrl} alt="" />
                  </div>
                )}
                <div class="card-content">
                  <h3>{fm.title ?? page.slug?.split("/").pop() ?? "Untitled"}</h3>
                  {authorText && <p class="card-author">{authorText}</p>}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  Component.css = `
.book-grid .grid-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; }
.book-grid .card-image { width: 100%; overflow: hidden; border-radius: 6px; border: 1px solid var(--lightgray); }
.book-grid .card-image img { width: 100%; height: auto; display: block; }
.book-grid .card-content { padding-top: 0.5rem; }
.book-grid .card-content h3 { margin: 0; font-size: 0.9rem; line-height: 1.3; }
.book-grid .card-author { margin: 0.15rem 0 0; font-size: 0.8rem; color: var(--gray); }
`

  return Component
}) satisfies QuartzComponentConstructor<BookGridOptions>