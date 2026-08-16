import * as _quartz_community_types from '@quartz-community/types';
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

declare const BookGrid: (opts?: BookGridOptions) => _quartz_community_types.QuartzComponent;
declare const NoteList: (opts?: NoteListOptions) => _quartz_community_types.QuartzComponent;

export { BookGrid, type BookGridOptions, NoteList, type NoteListOptions };
