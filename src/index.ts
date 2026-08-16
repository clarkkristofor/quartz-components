import createBookGrid from "./components/BookGrid";
import type { BookGridOptions } from "./components/BookGrid";
import type { QuartzComponent, QuartzComponentProps } from "@quartz-community/types";

let configured: QuartzComponent = createBookGrid();

export function init(options?: Record<string, unknown>): void {
  configured = createBookGrid(options as BookGridOptions);
}

const BookGrid: QuartzComponent = (props: QuartzComponentProps) => configured(props);

export default BookGrid;
export { BookGrid };

export type { BookGridOptions } from "./components/BookGrid";

export type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";