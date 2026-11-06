// src/components/PopularNotes.tsx
import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  FullSlug,
  SimpleSlug,
} from "@quartz-community/types"
import { simplifySlug } from "@quartz-community/utils"

export type PopularNotesContext = "home" | "folderPage"

export interface PopularNotesOptions {
  folder?: string
  sectionTitle?: string
  sectionLink?: string
  title?: string
  limit?: number
  showCount?: boolean
  minLinks?: number
  className?: string
  restrictTo?: PopularNotesContext[]
  // Folder prefixes whose SUBFOLDERS are excluded entirely from this list:
  // - a note living in a subfolder of one of these is never a candidate,
  //   no matter how many backlinks it has
  // - a link ORIGINATING from a note in a subfolder of one of these never
  //   counts toward anyone's tally, regardless of where it points
  // Old-style hub-and-spoke campaigns bundled session/character/faction
  // notes into subfolders that link constantly to each other and to their
  // hub — this treats that whole layer as internal scaffolding, not part
  // of the popularity graph. Doesn't affect the hub note itself (e.g.
  // "rpgs/heartland-justice"), only things living IN a subfolder below it.
  excludeSubfoldersOf?: string[]
}

const defaultOptions: Required<PopularNotesOptions> = {
  folder: "garden",
  sectionTitle: "",
  sectionLink: "",
  title: "",
  limit: 10,
  showCount: true,
  minLinks: 1,
  className: "popular-notes",
  restrictTo: ["home"],
  excludeSubfoldersOf: ["rpgs/protected"],
}

const HubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="list-icon">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4" /><path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" /><path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
  </svg>
)

// True if slug lives in a SUBFOLDER of one of the given prefixes —
// i.e. strictly deeper than the prefix itself, not the prefix folder's
// own index/hub note.
const isInExcludedSubfolder = (slug: string, prefixes: string[]): boolean => {
  return prefixes.some((prefix) => {
    const rest = slug.startsWith(prefix + "/") ? slug.slice(prefix.length + 1) : null
    if (rest === null) return false
    // rest has at least one more path segment => it's in a subfolder,
    // not just a direct sibling file sitting right at the prefix level
    return rest.includes("/")
  })
}

export default ((opts?: PopularNotesOptions) => {
  const options = { ...defaultOptions, ...opts }

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const slug = props.fileData.slug ?? ""
    const isHome = slug === "index" || slug === "" || slug === "/"
    const isFolderIndex = slug === `${options.folder}/index`

    let matchedContext: PopularNotesContext | null = null
    if (options.restrictTo.length > 0) {
      if (options.restrictTo.includes("home") && isHome) matchedContext = "home"
      else if (options.restrictTo.includes("folderPage") && isFolderIndex) matchedContext = "folderPage"
      else return null
    }

    // 1. Tally inbound links, skipping any link whose SOURCE lives in an
    //    excluded subfolder.
    const backlinkCounts = new Map<SimpleSlug, number>()
    for (const page of props.allFiles) {
      const sourceSlug = page.slug ?? ""
      if (isInExcludedSubfolder(sourceSlug, options.excludeSubfoldersOf)) continue

      const outboundLinks = page.links ?? []
      for (const target of outboundLinks) {
        backlinkCounts.set(target, (backlinkCounts.get(target) ?? 0) + 1)
      }
    }

    // 2. Match counts back to real pages, dropping any candidate that
    //    itself lives in an excluded subfolder.
    const ranked = props.allFiles
      .filter((page) => page.slug && !page.slug.endsWith("index"))
      .filter((page) => !isInExcludedSubfolder(page.slug as string, options.excludeSubfoldersOf))
      .map((page) => {
        const simple = simplifySlug(page.slug as FullSlug)
        return { page, count: backlinkCounts.get(simple) ?? 0 }
      })
      .filter((entry) => entry.count >= options.minLinks)
      .sort((a, b) => b.count - a.count)

    const displayedPages = options.limit ? ranked.slice(0, options.limit) : ranked

    if (displayedPages.length === 0) return null

    return (
      <div class={options.className}>
        {matchedContext === "home" && options.sectionTitle && (
          <h1 id={options.sectionTitle.toLowerCase()}>
            <a href={options.sectionLink} class="internal internal-link alias">
              {options.sectionTitle}
            </a>
          </h1>
        )}
        {options.title && <h2 class="garden-title">{options.title}</h2>}

        <div class="simple-list">
          {displayedPages.map(({ page, count }) => {
            const fm = (page.frontmatter ?? {}) as Record<string, any>

            return (
              <a href={`/${page.slug}`} class="internal internal-link grid-card list-item-card" data-slug={page.slug} key={page.slug}>
                <div class="card-icon-wrapper">
                  <HubIcon />
                </div>
                <div class="card-content">
                  <h3>{fm.title ?? page.slug?.split("/").pop() ?? "Untitled"}</h3>
                  <div class="card-metadata">
                    {options.showCount && (
                      <span class="card-date">
                        {count} {count === 1 ? "backlink" : "backlinks"}
                      </span>
                    )} 
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
}) satisfies QuartzComponentConstructor<PopularNotesOptions>