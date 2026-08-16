import createBookGrid from "./components/BookGrid"
import createNoteList from "./components/NoteList"
import type { BookGridOptions } from "./components/BookGrid"
import type { NoteListOptions } from "./components/NoteList"

export const BookGrid = createBookGrid
export const NoteList = createNoteList

export type { BookGridOptions } from "./components/BookGrid"
export type { NoteListOptions } from "./components/NoteList"

export type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"