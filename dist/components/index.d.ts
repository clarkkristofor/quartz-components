import * as preact from 'preact';
import * as _quartz_community_types from '@quartz-community/types';
import { QuartzComponent } from '@quartz-community/types';

declare const HomeArchiveRow: QuartzComponent & {
    displayName: string;
};

declare const BookGridReadingNow: _quartz_community_types.QuartzComponent;
declare const BookGridRead: _quartz_community_types.QuartzComponent;
declare const NoteListMusicHome: _quartz_community_types.QuartzComponent;
declare const NoteListBlogHome: _quartz_community_types.QuartzComponent;
declare const NoteListMusicArchive: _quartz_community_types.QuartzComponent;
declare const NoteListBlogArchive: _quartz_community_types.QuartzComponent;

declare const PopularNotesHubHome: _quartz_community_types.QuartzComponent;
declare const PopularNotesGardenFolder: _quartz_community_types.QuartzComponent;
declare const BookLibrary: _quartz_community_types.QuartzComponent;
declare const MobileSidebarToggle: () => {
    (): preact.JSX.Element;
    css: string;
    afterDOMLoaded: string;
};

export { BookGridRead, BookGridReadingNow, BookLibrary, HomeArchiveRow, MobileSidebarToggle, NoteListBlogArchive, NoteListBlogHome, NoteListMusicArchive, NoteListMusicHome, PopularNotesGardenFolder, PopularNotesHubHome };
