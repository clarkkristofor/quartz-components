import { createRequire } from 'module';

createRequire(import.meta.url);

// src/util/bookStatus.ts
function getBookStatus(frontmatter) {
  const raw = frontmatter?.date_finished;
  if (!raw) return "to-read";
  const finishedDate = new Date(raw);
  if (isNaN(finishedDate.getTime())) return "to-read";
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  finishedDate.setHours(0, 0, 0, 0);
  return finishedDate.getTime() > today.getTime() ? "reading" : "finished";
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/BookGrid.tsx
var defaultOptions = {
  folder: "books",
  status: "finished",
  title: "",
  limit: 6,
  coverWidth: 150,
  className: "book-grid",
  restrictTo: ["home"]
};
var BookGrid_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const Component = (props) => {
    const slug = props.fileData.slug ?? "";
    const isHome = slug === "index" || slug === "" || slug === "/";
    const isFolderIndex = slug === `${options.folder}/index`;
    if (options.restrictTo.length > 0) {
      const contextMatches = options.restrictTo.includes("home") && isHome || options.restrictTo.includes("folderPage") && isFolderIndex;
      if (!contextMatches) return null;
    }
    const folder = options.folder;
    const pages = props.allFiles.filter((page) => {
      const pslug = page.slug ?? "";
      const isDirectChild = pslug.split("/").length === folder.split("/").length + 1;
      if (!pslug.startsWith(folder + "/") || pslug.endsWith("index") || !isDirectChild) return false;
      return getBookStatus(page.frontmatter) === options.status;
    }).sort((a2, b2) => {
      const dateA = a2.frontmatter?.date_finished;
      const dateB = b2.frontmatter?.date_finished;
      return (dateB ? new Date(dateB).getTime() : 0) - (dateA ? new Date(dateA).getTime() : 0);
    });
    const displayedPages = options.limit ? pages.slice(0, options.limit) : pages;
    if (displayedPages.length === 0) return null;
    return /* @__PURE__ */ u2("div", { class: options.className, children: [
      options.title && /* @__PURE__ */ u2("h2", { class: "garden-title", children: options.title }),
      /* @__PURE__ */ u2("div", { class: "folder-grid", style: { display: "flex", flexWrap: "wrap", gap: "1.25rem" }, children: displayedPages.map((page) => {
        const fm = page.frontmatter ?? {};
        const targetLink = fm.link || fm.url || `/${page.slug}`;
        const imageUrl = fm.image || fm.coverUrl;
        const isExternal = targetLink.startsWith("http");
        const author = fm.author || fm.authors;
        const authorText = Array.isArray(author) ? author.join(", ") : author;
        return /* @__PURE__ */ u2(
          "a",
          {
            href: targetLink,
            class: "grid-card",
            title: fm.description ?? "",
            target: isExternal ? "_blank" : "_self",
            rel: isExternal ? "noopener noreferrer" : "",
            style: { width: `${options.coverWidth}px` },
            children: [
              imageUrl && /* @__PURE__ */ u2("div", { class: "card-image", children: /* @__PURE__ */ u2("img", { src: imageUrl, alt: "" }) }),
              /* @__PURE__ */ u2("div", { class: "card-content", children: [
                /* @__PURE__ */ u2("h3", { children: fm.title ?? page.slug?.split("/").pop() ?? "Untitled" }),
                authorText && /* @__PURE__ */ u2("p", { class: "card-author", children: authorText })
              ] })
            ]
          },
          page.slug
        );
      }) })
    ] });
  };
  Component.css = `
.book-grid .grid-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; }
.book-grid .card-image { width: 100%; overflow: hidden; border-radius: 6px; border: 1px solid var(--lightgray); }
.book-grid .card-image img { width: 100%; height: auto; display: block; }
.book-grid .card-content { padding-top: 0.5rem; }
.book-grid .card-content h3 { margin: 0; font-size: 0.9rem; line-height: 1.3; }
.book-grid .card-author { margin: 0.15rem 0 0; font-size: 0.8rem; color: var(--gray); }
`;
  return Component;
});

// src/index.ts
var configured = BookGrid_default();
function init(options) {
  configured = BookGrid_default(options);
}
var BookGrid = (props) => configured(props);
var src_default = BookGrid;

export { BookGrid, src_default as default, init };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map