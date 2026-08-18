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
  sectionTitle: "",
  sectionLink: "",
  title: "",
  limit: 6,
  coverWidth: 150,
  className: "book-grid",
  restrictTo: ["home"]
};
var BookGrid_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const Component = (props) => {
    const slug2 = props.fileData.slug ?? "";
    const isHome = slug2 === "index" || slug2 === "" || slug2 === "/";
    const isFolderIndex = slug2 === `${options.folder}/index`;
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
      options.sectionTitle && /* @__PURE__ */ u2("h1", { id: options.sectionTitle.toLowerCase(), children: /* @__PURE__ */ u2("a", { href: options.sectionLink, class: "internal internal-link alias", children: options.sectionTitle }) }),
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
.book-grid .card-image { width: 100%; overflow: hidden; }
.book-grid .card-image img { width: 100%; height: auto; display: block; }
.book-grid .card-content { padding-top: 0.5rem; }
.book-grid .card-content h3 { margin: 0; font-size: 0.9rem; line-height: 1.3; }
.book-grid .card-author { margin: 0.15rem 0 0; font-size: 0.8rem; color: var(--gray); }
`;
  return Component;
});

// src/components/NoteList.tsx
var defaultOptions2 = {
  folder: "blog",
  sectionTitle: "",
  sectionLink: "",
  title: "",
  limit: 0,
  className: "note-list",
  restrictTo: ["home"]
};
var MusicIcon = () => /* @__PURE__ */ u2("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "list-icon", children: [
  /* @__PURE__ */ u2("path", { d: "M9 18V5l12-2v13" }),
  /* @__PURE__ */ u2("circle", { cx: "6", cy: "18", r: "3" }),
  /* @__PURE__ */ u2("circle", { cx: "18", cy: "16", r: "3" })
] });
var NoteIcon = () => /* @__PURE__ */ u2("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "list-icon", children: /* @__PURE__ */ u2("path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" }) });
var NoteList_default = ((opts) => {
  const options = { ...defaultOptions2, ...opts };
  const Component = (props) => {
    const slug2 = props.fileData.slug ?? "";
    const isHome = slug2 === "index" || slug2 === "" || slug2 === "/";
    const isFolderIndex = slug2 === `${options.folder}/index`;
    let matchedContext = null;
    if (options.restrictTo.length > 0) {
      if (options.restrictTo.includes("home") && isHome) matchedContext = "home";
      else if (options.restrictTo.includes("folderPage") && isFolderIndex) matchedContext = "folderPage";
      else return null;
    }
    const folder = options.folder;
    const pages = props.allFiles.filter((page) => {
      const pslug = page.slug ?? "";
      const isDirectChild = pslug.split("/").length === folder.split("/").length + 1;
      return pslug.startsWith(folder + "/") && !pslug.endsWith("index") && isDirectChild;
    }).sort((a2, b2) => {
      const dateA = a2.frontmatter?.date;
      const dateB = b2.frontmatter?.date;
      return (dateB ? new Date(dateB).getTime() : 0) - (dateA ? new Date(dateA).getTime() : 0);
    });
    const displayedPages = options.limit ? pages.slice(0, options.limit) : pages;
    if (displayedPages.length === 0) return null;
    const isMusic = folder === "music";
    return /* @__PURE__ */ u2("div", { class: options.className, children: [
      matchedContext === "home" && options.sectionTitle && /* @__PURE__ */ u2("h1", { id: options.sectionTitle.toLowerCase(), children: /* @__PURE__ */ u2("a", { href: options.sectionLink, class: "internal internal-link alias", children: options.sectionTitle }) }),
      options.title && /* @__PURE__ */ u2("h2", { class: "garden-title", children: options.title }),
      /* @__PURE__ */ u2("div", { class: "simple-list", children: displayedPages.map((page) => {
        const fm = page.frontmatter ?? {};
        const description = page.description ?? fm.description;
        const rawDate = fm.date;
        const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : void 0;
        return /* @__PURE__ */ u2("a", { href: `/${page.slug}`, class: "internal internal-link grid-card list-item-card", "data-slug": page.slug, children: [
          /* @__PURE__ */ u2("div", { class: "card-icon-wrapper", children: isMusic ? /* @__PURE__ */ u2(MusicIcon, {}) : /* @__PURE__ */ u2(NoteIcon, {}) }),
          /* @__PURE__ */ u2("div", { class: "card-content", children: [
            /* @__PURE__ */ u2("h3", { children: fm.title ?? page.slug?.split("/").pop() ?? "Untitled" }),
            /* @__PURE__ */ u2("div", { class: "card-metadata", children: [
              formattedDate && /* @__PURE__ */ u2("span", { class: "card-date", children: formattedDate }),
              formattedDate && description && /* @__PURE__ */ u2("span", { class: "meta-separator", children: " \u2022 " }),
              description && /* @__PURE__ */ u2("span", { class: "card-desc", children: description })
            ] })
          ] })
        ] }, page.slug);
      }) })
    ] });
  };
  return Component;
});

// node_modules/@quartz-community/utils/dist/index.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"));
  return res.length === 0 ? "/" : res;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  return s2;
}

// src/components/PopularNotes.tsx
var defaultOptions3 = {
  folder: "garden",
  sectionTitle: "",
  sectionLink: "",
  title: "",
  limit: 10,
  showCount: true,
  minLinks: 1,
  className: "popular-notes",
  restrictTo: ["home"],
  excludeSubfoldersOf: ["rpgs/protected"]
};
var HubIcon = () => /* @__PURE__ */ u2("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "list-icon", children: [
  /* @__PURE__ */ u2("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ u2("path", { d: "M12 2v4" }),
  /* @__PURE__ */ u2("path", { d: "M12 18v4" }),
  /* @__PURE__ */ u2("path", { d: "M4.93 4.93l2.83 2.83" }),
  /* @__PURE__ */ u2("path", { d: "M16.24 16.24l2.83 2.83" }),
  /* @__PURE__ */ u2("path", { d: "M2 12h4" }),
  /* @__PURE__ */ u2("path", { d: "M18 12h4" }),
  /* @__PURE__ */ u2("path", { d: "M4.93 19.07l2.83-2.83" }),
  /* @__PURE__ */ u2("path", { d: "M16.24 7.76l2.83-2.83" })
] });
var isInExcludedSubfolder = (slug2, prefixes) => {
  return prefixes.some((prefix) => {
    const rest = slug2.startsWith(prefix + "/") ? slug2.slice(prefix.length + 1) : null;
    if (rest === null) return false;
    return rest.includes("/");
  });
};
var PopularNotes_default = ((opts) => {
  const options = { ...defaultOptions3, ...opts };
  const Component = (props) => {
    const slug2 = props.fileData.slug ?? "";
    const isHome = slug2 === "index" || slug2 === "" || slug2 === "/";
    const isFolderIndex = slug2 === `${options.folder}/index`;
    let matchedContext = null;
    if (options.restrictTo.length > 0) {
      if (options.restrictTo.includes("home") && isHome) matchedContext = "home";
      else if (options.restrictTo.includes("folderPage") && isFolderIndex) matchedContext = "folderPage";
      else return null;
    }
    const backlinkCounts = /* @__PURE__ */ new Map();
    for (const page of props.allFiles) {
      const sourceSlug = page.slug ?? "";
      if (isInExcludedSubfolder(sourceSlug, options.excludeSubfoldersOf)) continue;
      const outboundLinks = page.links ?? [];
      for (const target of outboundLinks) {
        backlinkCounts.set(target, (backlinkCounts.get(target) ?? 0) + 1);
      }
    }
    const ranked = props.allFiles.filter((page) => page.slug && !page.slug.endsWith("index")).filter((page) => !isInExcludedSubfolder(page.slug, options.excludeSubfoldersOf)).map((page) => {
      const simple = simplifySlug(page.slug);
      return { page, count: backlinkCounts.get(simple) ?? 0 };
    }).filter((entry) => entry.count >= options.minLinks).sort((a2, b2) => b2.count - a2.count);
    const displayedPages = options.limit ? ranked.slice(0, options.limit) : ranked;
    if (displayedPages.length === 0) return null;
    return /* @__PURE__ */ u2("div", { class: options.className, children: [
      matchedContext === "home" && options.sectionTitle && /* @__PURE__ */ u2("h1", { id: options.sectionTitle.toLowerCase(), children: /* @__PURE__ */ u2("a", { href: options.sectionLink, class: "internal internal-link alias", children: options.sectionTitle }) }),
      options.title && /* @__PURE__ */ u2("h2", { class: "garden-title", children: options.title }),
      /* @__PURE__ */ u2("div", { class: "simple-list", children: displayedPages.map(({ page, count }) => {
        const fm = page.frontmatter ?? {};
        return /* @__PURE__ */ u2("a", { href: `/${page.slug}`, class: "internal internal-link grid-card list-item-card", "data-slug": page.slug, children: [
          /* @__PURE__ */ u2("div", { class: "card-icon-wrapper", children: /* @__PURE__ */ u2(HubIcon, {}) }),
          /* @__PURE__ */ u2("div", { class: "card-content", children: [
            /* @__PURE__ */ u2("h3", { children: fm.title ?? page.slug?.split("/").pop() ?? "Untitled" }),
            /* @__PURE__ */ u2("div", { class: "card-metadata", children: options.showCount && /* @__PURE__ */ u2("span", { class: "card-date", children: [
              count,
              " ",
              count === 1 ? "backlink" : "backlinks"
            ] }) })
          ] })
        ] }, page.slug);
      }) })
    ] });
  };
  return Component;
});

// src/components/HomeArchiveRow.tsx
var HomeArchiveRow = ((props) => {
  return /* @__PURE__ */ u2("div", { class: "home-archive-row", children: [
    NoteListMusicHome(props),
    NoteListBlogHome(props)
  ] });
});
HomeArchiveRow.displayName = "HomeArchiveRow";
var HomeArchiveRow_default = HomeArchiveRow;

// src/components/index.ts
function withDisplayName(fn, name) {
  fn.displayName = name;
  return fn;
}
var BookGridReadingNow = withDisplayName(
  BookGrid_default({
    folder: "books",
    status: "reading",
    sectionTitle: "Books",
    sectionLink: "/books/",
    title: "Reading Now",
    limit: 5,
    className: "book-grid",
    restrictTo: ["home"]
  }),
  "BookGridReadingNow"
);
var BookGridRead = withDisplayName(
  BookGrid_default({
    folder: "books",
    status: "finished",
    title: "Read",
    limit: 0,
    className: "book-grid",
    restrictTo: ["folderPage"]
  }),
  "BookGridRead"
);
var NoteListMusicHome = withDisplayName(
  NoteList_default({
    folder: "music",
    sectionTitle: "Music",
    sectionLink: "/music/",
    limit: 3,
    restrictTo: ["home"]
  }),
  "NoteListMusicHome"
);
var NoteListBlogHome = withDisplayName(
  NoteList_default({
    folder: "blog",
    sectionTitle: "Blog",
    sectionLink: "/blog/",
    limit: 3,
    restrictTo: ["home"]
  }),
  "NoteListBlogHome"
);
var NoteListMusicArchive = withDisplayName(
  NoteList_default({
    folder: "music",
    sectionTitle: "Music",
    sectionLink: "/music/",
    limit: 0,
    restrictTo: ["folderPage"]
  }),
  "NoteListMusicArchive"
);
var NoteListBlogArchive = withDisplayName(
  NoteList_default({
    folder: "blog",
    sectionTitle: "Blog",
    sectionLink: "/blog/",
    limit: 0,
    restrictTo: ["folderPage"]
  }),
  "NoteListBlogArchive"
);
var PopularNotesHubHome = withDisplayName(
  PopularNotes_default({
    folder: "garden",
    sectionTitle: "Hub Notes",
    sectionLink: "/garden/",
    limit: 8,
    showCount: true,
    minLinks: 3,
    className: "popular-notes",
    restrictTo: ["home"]
  }),
  "PopularNotesHubHome"
);
var PopularNotesGardenFolder = withDisplayName(
  PopularNotes_default({
    folder: "garden",
    title: "Most Linked",
    limit: 0,
    showCount: true,
    minLinks: 2,
    className: "popular-notes",
    restrictTo: ["folderPage"]
  }),
  "PopularNotesGardenFolder"
);

export { BookGridRead, BookGridReadingNow, HomeArchiveRow_default as HomeArchiveRow, NoteListBlogArchive, NoteListBlogHome, NoteListMusicArchive, NoteListMusicHome, PopularNotesGardenFolder, PopularNotesHubHome };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map