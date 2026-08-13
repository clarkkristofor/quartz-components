import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"
import { registerCondition } from "@quartz-community/types"
import * as ExternalPlugin from "../../.quartz/plugins"
import { ChapterNavNext } from "../chapter-nav"

// -----------------------------------------------------------------------
// v5 native piece: register the "swords-beyond" condition. This replaces
// the `slug.includes("swords-beyond")` check that used to be duplicated
// inline in both defaultContentPageLayout and defaultListPageLayout in
// your v4 quartz.layout.tsx.
// -----------------------------------------------------------------------
export function init() {
  registerCondition("swords-beyond", (props: QuartzComponentProps) => {
    const slug = (props.fileData.slug ?? "").toLowerCase()
    return slug.includes("swords-beyond") || slug.includes("swords beyond")
  })
}

const SidebarToc = ExternalPlugin.TableOfContents()
const ChapterNext = ChapterNavNext()

const SwordsBeyondSidebar: QuartzComponent = (props: QuartzComponentProps) => {
  return (
    <div className="sidebar-content">
      <img
        src="https://superclark.net/static/swords-beyond-logo.png"
        alt="Swords Beyond Logo"
        style={{ width: "100%", height: "auto", marginBottom: "1rem", borderRadius: "4px" }}
      />
      <SidebarToc {...props} />
      <ChapterNext {...props} />
    </div>
  )
}

export default (() => SwordsBeyondSidebar) satisfies QuartzComponentConstructor
