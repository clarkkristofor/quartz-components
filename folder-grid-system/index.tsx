import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"
import BookGrid from "../book-grid"
import GenericGrid from "../generic-grid"

const FolderGridSystem: QuartzComponent = (props: QuartzComponentProps) => {
  const slug = (props.fileData.slug ?? "").replace(/\/index$/, "")

  if (slug === "books") {
    const ReadGrid = BookGrid({
      title: "Read",
      folder: "books",
      displayClass: "book-grid",
      limit: 99999,
    })
    const RecsGrid = GenericGrid({
      title: "Reading List & Recommendations",
      folder: "books",
      displayClass: "book-grid",
    })

    return (
      <>
        <ReadGrid {...props} />
        <RecsGrid {...props} />
      </>
    )
  }

  const DefaultGrid = GenericGrid({ displayClass: "rpg-grid" })
  return <DefaultGrid {...props} />
}

export default (() => FolderGridSystem) satisfies QuartzComponentConstructor
