export { BookGridRead, BookGridReadingNow, BookLibrary, HomeArchiveRow, NoteListBlogArchive, NoteListBlogHome, NoteListMusicArchive, NoteListMusicHome, PopularNotesGardenFolder, PopularNotesHubHome } from './components/index.js';
export { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from '@quartz-community/types';

type BookStatus = "to-read" | "reading" | "finished";

type BookGridContext = "home" | "folderPage";
interface BookGridOptions {
    folder?: string;
    status?: BookStatus;
    sectionTitle?: string;
    sectionLink?: string;
    title?: string;
    limit?: number;
    coverWidth?: number;
    className?: string;
    restrictTo?: BookGridContext[];
}

type NoteListContext = "home" | "folderPage";
interface NoteListOptions {
    folder?: string;
    sectionTitle?: string;
    sectionLink?: string;
    title?: string;
    limit?: number;
    className?: string;
    restrictTo?: NoteListContext[];
}

/**
 * BookLibrary — a searchable, sortable list of every published book note in a folder.
 * Renders only on one page (pageSlug), e.g. content/Books/Library.md -> "books/library".
 * Deliberately shows no reading status (date_finished etc.).
 * Hide a book from the library with `library: false` in its frontmatter.
 */
interface BookLibraryOptions {
    folder?: string;
    pageSlug?: string;
    title?: string;
    className?: string;
}

export type { BookGridOptions, BookLibraryOptions, NoteListOptions };
