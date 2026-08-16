import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"

export type NoteListContext = "home" | "folderPage"

export interface NoteListOptions {
  folder?: string
  sectionTitle?: string
  sectionLink?: string
  title?: string
  limit?: number
  className?: string
  restrictTo?: NoteListContext[]
}

const defaultOptions: Required<NoteListOptions> = {
  folder: "blog",
  sectionTitle: "",
  sectionLink: "",
  title: "",
  limit: 0,
  className: "note-list",
  restrictTo: ["home"],
}

const MusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="list-icon">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
)

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="list-icon">
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </svg>
)

export default ((opts?: NoteListOptions) => {
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
        return pslug.startsWith(folder + "/") && !pslug.endsWith("index") && isDirectChild
      })
      .sort((a, b) => {
        const dateA = a.frontmatter?.date as string | undefined
        const dateB = b.frontmatter?.date as string | undefined
        return (dateB ? new Date(dateB).getTime() : 0) - (dateA ? new Date(dateA).getTime() : 0)
      })

    const displayedPages = options.limit ? pages.slice(0, options.limit) : pages

    if (displayedPages.length === 0) return null

    const isMusic = folder === "music"

    return (
      <div class={options.className}>
        {options.sectionTitle && (
          <h1 id={options.sectionTitle.toLowerCase()}>
            <a href={options.sectionLink} class="internal internal-link alias">
              {options.sectionTitle}
            </a>
          </h1>
        )}
        {options.title && <h2 class="garden-title">{options.title}</h2>}

        <div class="simple-list">
          {displayedPages.map((page) => {
            const fm = (page.frontmatter ?? {}) as Record<string, any>
            const description = fm.description as string | undefined
            const rawDate = fm.date as string | undefined

            return (
              <a href={`/${page.slug}`} class="grid-card list-item-card" key={page.slug}>
                <div class="card-icon-wrapper">
                  {isMusic ? <MusicIcon /> : <NoteIcon />}
                </div>
                <div class="card-content">
                  <h3>{fm.title ?? page.slug?.split("/").pop() ?? "Untitled"}</h3>
                  <div class="card-metadata">
                    {description && <span class="card-desc">{description}</span>}
                    {description && rawDate && <span class="meta-separator"> • </span>}
                    {rawDate && <span class="card-date">{new Date(rawDate).toLocaleDateString()}</span>}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  return Component
}) satisfies QuartzComponentConstructor<NoteListOptions>