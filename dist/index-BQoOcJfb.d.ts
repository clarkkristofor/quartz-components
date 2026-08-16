import { QuartzComponent } from '@quartz-community/types';

type BookStatus = "to-read" | "reading" | "finished";

type BookGridContext = "home" | "folderPage";
interface BookGridOptions {
    folder?: string;
    status?: BookStatus;
    title?: string;
    limit?: number;
    coverWidth?: number;
    className?: string;
    restrictTo?: BookGridContext[];
}
declare const _default: (opts?: BookGridOptions) => QuartzComponent;

export { type BookGridOptions as B, _default as _ };
