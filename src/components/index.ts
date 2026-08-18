// src/components/index.ts
import createBookGrid from "./BookGrid"
import createNoteList from "./NoteList"
import createPopularNotes from "./PopularNotes"

function withDisplayName<T extends Function>(fn: T, name: string): T {
  ;(fn as unknown as { displayName: string }).displayName = name
  return fn
}

export const BookGridReadingNow = withDisplayName(
  createBookGrid({
    folder: "books", status: "reading",
    sectionTitle: "Books", sectionLink: "/books/",
    title: "Reading Now", limit: 5, className: "book-grid",
    restrictTo: ["home"],
  }),
  "BookGridReadingNow",
)

export const BookGridRead = withDisplayName(
  createBookGrid({
    folder: "books", status: "finished",
    title: "Read", limit: 0, className: "book-grid",
    restrictTo: ["folderPage"],
  }),
  "BookGridRead",
)

export const NoteListMusicHome = withDisplayName(
  createNoteList({
    folder: "music", sectionTitle: "Music", sectionLink: "/music/",
    limit: 3, restrictTo: ["home"],
  }),
  "NoteListMusicHome",
)

export const NoteListBlogHome = withDisplayName(
  createNoteList({
    folder: "blog", sectionTitle: "Blog", sectionLink: "/blog/",
    limit: 3, restrictTo: ["home"],
  }),
  "NoteListBlogHome",
)

export const NoteListMusicArchive = withDisplayName(
  createNoteList({
    folder: "music", sectionTitle: "Music", sectionLink: "/music/",
    limit: 0, restrictTo: ["folderPage"],
  }),
  "NoteListMusicArchive",
)

export const NoteListBlogArchive = withDisplayName(
  createNoteList({
    folder: "blog", sectionTitle: "Blog", sectionLink: "/blog/",
    limit: 0, restrictTo: ["folderPage"],
  }),
  "NoteListBlogArchive",
)

export { default as HomeArchiveRow } from "./HomeArchiveRow"

export const PopularNotesHubHome = withDisplayName(
  createPopularNotes({
    folder: "garden",
    sectionTitle: "Hub Notes", sectionLink: "/garden/",
    limit: 8, showCount: true, minLinks: 3,
    className: "popular-notes", restrictTo: ["home"],
  }),
  "PopularNotesHubHome",
)

export const PopularNotesGardenFolder = withDisplayName(
  createPopularNotes({
    folder: "garden",
    title: "Most Linked",
    limit: 0, showCount: true, minLinks: 2,
    className: "popular-notes", restrictTo: ["folderPage"],
  }),
  "PopularNotesGardenFolder",
)