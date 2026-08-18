export { BookGridRead, BookGridReadingNow, HomeArchiveRow, NoteListBlogArchive, NoteListBlogHome, NoteListMusicArchive, NoteListMusicHome, PopularNotesGardenFolder, PopularNotesHubHome } from './components/index.js';
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

export type { BookGridOptions, NoteListOptions };
