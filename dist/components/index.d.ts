import { QuartzComponent } from '@quartz-community/types';

type BookStatus = "to-read" | "reading" | "finished";

interface BookGridOptions {
    folder?: string;
    status?: BookStatus;
    title?: string;
    limit?: number;
    columns?: number;
    className?: string;
    restrictToHome?: boolean;
}
declare const _default: (opts?: BookGridOptions) => QuartzComponent;

export { type BookGridOptions as B, _default as BookGrid };
