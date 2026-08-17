import type { QuartzComponent, QuartzComponentProps } from "@quartz-community/types"
import { NoteListMusicHome, NoteListBlogHome } from "./index"

const HomeArchiveRow = ((props: QuartzComponentProps) => {
  return (
    <div class="home-archive-row">
      {NoteListMusicHome(props) as any}
      {NoteListBlogHome(props) as any}
    </div>
  )
}) as QuartzComponent & { displayName: string }

HomeArchiveRow.displayName = "HomeArchiveRow"

export default HomeArchiveRow