import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"
import { getBookStatus } from "../util/bookStatus"
import type { BookStatus } from "../util/bookStatus"

export interface BookGridOptions {
  folder?: string
  status?: BookStatus
  title?: string
  limit?: number
  columns?: number
  className?: string
  restrictToHome?: boolean
}

const defaultOptions: Required<BookGridOptions> = {
  folder: "books",
  status: "finished",
  title: "",
  limit: 6,
  columns: 3,
  className: "book-grid",
  restrictToHome: true,
}

export default ((opts?: BookGridOptions) => {
  const options = { ...defaultOptions, ...opts }

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const slug = props.fileData.slug ?? ""
    const isHome = slug === "index" || slug === "" || slug === "/"
    if (options.restrictToHome && !isHome) return null

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
      .slice(0, options.limit)

    if (pages.length === 0) return null

    return (
      <div class={options.className}>
        {options.title && <h2 class="garden-title">{options.title}</h2>}
        <div
          class="folder-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${options.columns}, 1fr)`, gap: "1.25rem" }}
        >
          {pages.map((page) => {
            const fm = (page.frontmatter ?? {}) as Record<string, any>
            const targetLink = (fm.link || fm.url || `/${page.slug}`) as string
            const imageUrl = fm.image || fm.coverUrl
            const isExternal = targetLink.startsWith("http")

            return (
              <a
                href={targetLink}
                class="grid-card"
                key={page.slug}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
              >
                {imageUrl && (
                  <div class="card-image">
                    <img src={imageUrl} alt="" />
                  </div>
                )}
                <div class="card-content">
                  <h3>{fm.title ?? page.slug?.split("/").pop() ?? "Untitled"}</h3>
                  {fm.description && <p>{fm.description}</p>}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  Component.css = `
.book-grid .grid-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  overflow: hidden;
  background: var(--light);
  text-decoration: none;
  color: inherit;
}
.book-grid .card-image {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
}
.book-grid .card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.book-grid .card-content {
  padding: 0.75rem;
}
.book-grid .card-content h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}
`

  return Component
}) satisfies QuartzComponentConstructor<BookGridOptions>