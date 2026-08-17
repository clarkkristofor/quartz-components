import createBookGrid from "./BookGrid"
import createNoteList from "./NoteList"

export const BookGridReadingNow = createBookGrid({
  folder: "books",
  status: "reading",
  sectionTitle: "Books",
  sectionLink: "/books/",
  title: "Reading Now",
  limit: 5,
  className: "book-grid",
  restrictTo: ["home"],
})

export const BookGridRead = createBookGrid({
  folder: "books",
  status: "finished",
  title: "Read",
  limit: 0,
  className: "book-grid",
  restrictTo: ["folderPage"],
})

export const NoteListMusicHome = createNoteList({
  folder: "music",
  sectionTitle: "Music",
  sectionLink: "/music/",
  limit: 3,
  restrictTo: ["home"],
})

export const NoteListBlogHome = createNoteList({
  folder: "blog",
  sectionTitle: "Blog",
  sectionLink: "/blog/",
  limit: 3,
  restrictTo: ["home"],
})

export const NoteListMusicArchive = createNoteList({
  folder: "music",
  sectionTitle: "Music",
  sectionLink: "/music/",
  limit: 0,
  restrictTo: ["folderPage"],
})

export const NoteListBlogArchive = createNoteList({
  folder: "blog",
  sectionTitle: "Blog",
  sectionLink: "/blog/",
  limit: 0,
  restrictTo: ["folderPage"],
})