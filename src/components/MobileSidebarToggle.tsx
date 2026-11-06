// MobileSidebarToggle — mobile-only floating button that opens the left sidebar as a slide-in drawer.
// Use the same imports and withDisplayName wrapper as your other components (e.g. NoteList).
// Remember: add "MobileSidebarToggle" to package.json "quartz"."components" too.

import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"

const MobileSidebarToggle = () => {
  const Component = () => (
    <div class="mobile-sidebar-toggle">
      <button class="sidebar-toggle" type="button" aria-label="Open contents and backlinks" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="3.5" cy="6" r="1" />
          <circle cx="3.5" cy="12" r="1" />
          <circle cx="3.5" cy="18" r="1" />
        </svg>
      </button>
      <div class="sidebar-backdrop" aria-hidden="true"></div>
    </div>
  )

  Component.css = `
.sidebar-toggle,
.sidebar-backdrop {
  display: none;
}

@media all and (max-width: 800px) {
  /* Floating button, always visible while scrolling */
  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1001;
    width: 3.25rem;
    height: 3.25rem;
    border: none;
    border-radius: 50%;
    background: var(--secondary);
    color: var(--light);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  /* Sidebar becomes an off-screen drawer.
     !important is needed to beat Quartz's base mobile sidebar rules. */
  .sidebar.left {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: auto !important;
    width: min(85vw, 22rem) !important;
    height: 100dvh !important;
    overflow-y: auto !important;
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    align-items: stretch !important;
    gap: 1.5rem !important;
    padding: 2rem 1.25rem 6rem !important;
    background: var(--light) !important;
    z-index: 1000 !important;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 0.25s ease, visibility 0.25s;
  }

  body.sidebar-open .sidebar.left {
    transform: none;
    visibility: visible;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.25);
  }

  /* Dim the page behind the open drawer; tap it to close */
  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  body.sidebar-open .sidebar-backdrop {
    opacity: 1;
    pointer-events: auto;
  }

  body.sidebar-open {
    overflow: hidden;
  }
}
`

  Component.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const btn = document.querySelector(".sidebar-toggle")
  const backdrop = document.querySelector(".sidebar-backdrop")
  const sidebar = document.querySelector(".sidebar.left")
  if (!btn || !sidebar) return

  const setOpen = (open) => {
    document.body.classList.toggle("sidebar-open", open)
    btn.setAttribute("aria-expanded", String(open))
    btn.setAttribute("aria-label", open ? "Close contents and backlinks" : "Open contents and backlinks")
  }
  const toggle = () => setOpen(!document.body.classList.contains("sidebar-open"))
  const close = () => setOpen(false)
  const onSidebarClick = (e) => { if (e.target.closest("a")) close() }
  const onKey = (e) => { if (e.key === "Escape") close() }

  close() // always start closed on each page

  btn.addEventListener("click", toggle)
  backdrop?.addEventListener("click", close)
  sidebar.addEventListener("click", onSidebarClick)
  document.addEventListener("keydown", onKey)

  window.addCleanup?.(() => {
    btn.removeEventListener("click", toggle)
    backdrop?.removeEventListener("click", close)
    sidebar.removeEventListener("click", onSidebarClick)
    document.removeEventListener("keydown", onKey)
  })
})
`

  return Component
}

export default MobileSidebarToggle
