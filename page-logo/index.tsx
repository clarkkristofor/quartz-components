import { pathToRoot, FullSlug } from "@quartz-community/utils"
import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "@quartz-community/types"

const PageLogo: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = (fileData?.slug ?? "") as FullSlug
  const baseDir = pathToRoot(slug)

  return (
    <a href={baseDir} aria-label="Home" className="logo-link">
      <svg viewBox="0 0 473 470" xmlns="http://www.w3.org/2000/svg" className="header-logo">
        <defs>
          <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(62)">
            <stop offset="0%" stopColor="#8b0000" />
            <stop offset="45%" stopColor="#e53935" />
            <stop offset="100%" stopColor="#ffcc33" />
          </linearGradient>
        </defs>
        <g>
          {/* Main Logo Body */}

          {/* Individual Lens Paths */}
          <path id="lens-left" className="logo-lens" d="M79.242,357.899C81.193,347.087 86.085,336.958 95.959,330.183C124.904,310.323 209.981,314.947 210.036,359.845C210.144,447.294 127.357,453.254 97.22,424.327C91.414,418.184 91.024,418.221 86.22,409.105C82.798,402.611 75.442,378.96 79.242,357.899Z"/>
          <path id="lens-right" className="logo-lens" d="M263.355,342.961C269.709,332.663 283.276,323.713 310.721,319.861C318.33,318.793 331.108,318.354 344.133,320.359C358.412,322.557 372.989,327.694 381.377,338.162C382.746,339.87 383.95,341.72 384.961,343.723C386.522,346.815 391.836,357.34 389.25,386.803C388.358,396.959 383.269,407.068 382.443,408.707C380.141,413.28 373.125,422.234 372.244,423.358C363.245,430.263 354.807,438.371 328.717,439.797C300.597,441.334 267.15,423.249 260.382,380.916C258.824,371.173 255.317,355.989 263.355,342.961Z"/>
        </g>
      </svg>
    </a>
  )
}

export default (() => PageLogo) satisfies QuartzComponentConstructor

// No init() — this component has no conditional placement logic,
// it just sits in layout.position: header via YAML.
// (`logo-lens` fill is presumably wired to `url(#flame-gradient)` via
// custom.scss rather than inline here — carry that CSS rule over too.)
