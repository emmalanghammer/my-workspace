# My Workspace

The Express welcome page. It answers: **when a property manager signs in, what
should the first screen give them?** Two screens sit side by side here.

**The original** is today's page, rebuilt from the production Figma frame:
four reference tiles — My Favorites, My Reports, Announcements, My Training.

**The proposal** is the Claude Design "Workspace" canvas (Option B — Splashy
v2) rebuilt on the RMX foundation. It keeps Favorites and Reports and adds the
work: what is waiting, what is late, who needs an answer.

**Owner** Emma Langhammer · **Started** 2026-09-10 · **Built with** rmx-prototype 2.0.0

## Screens

| Screen | What it shows |
|---|---|
| [`screens/my-workspace-original.html`](screens/my-workspace-original.html) | **The original.** Today's My Workspace, rebuilt from frame `My Workspace` (node 4969:70308) in RMX Pages. Four `Tile Style=Workspace` sections with their coloured overlines, the eight Favorites menu areas and four Reports areas with their real Express glyphs, two announcement cards with the real artwork, the Rent Manager University sign-in, and the two hidden-tile links bottom right. Each tile body scrolls, which is what the frame's clipped content is doing. Every link and menu says it is not built rather than dead-ending. |
| [`screens/my-workspace.html`](screens/my-workspace.html) | **The proposal.** The whole page in its default state, full-bleed and fluid. The announcement band is a two-item carousel; My Tasks filters All / Overdue through a real Toggle Switch and each task ticks off through a real Checkbox, with the open and overdue counts following; every link and menu that goes nowhere says so instead of doing nothing. |

Open `index.html` for the index.

---

# The original screen

## Where it came from

One frame, read directly, nothing inferred: **RMX Pages** (fileKey
`5XEzI94nmZsWE7rQQ7OIHP`) → page **General Pages** → section **Workspace** →
frame **My Workspace**, node `4969:70308`, 1920 × 929, read 2026-09-10.

Everything on the screen — structure, component variants, spacing, type
styles, colours, content strings and the three images — was measured off that
frame through the Figma MCP. Where the frame and the tokens disagree, the token
wins and the difference is logged below rather than copied.

Its own local layers are
[`assets/workspace-original.css`](assets/workspace-original.css) (layout, one
comment per rule citing the node it came from) and
[`assets/original-art.css`](assets/original-art.css) (the three images as data
URIs). `assets/workspace.css` is **not** loaded — it styles the proposal and
deliberately departs from the shipped page in several places.

## What the frame turned out to say

- **The tiles are `Tile Style=Workspace` at `--radius-sm` (4px), not 8.** White
  `background-tile`, 1px `border-primary`, effect style `dropshadow-md`
  (`1px 2px 12px rgba(76,76,76,.10)`, `0 4px 10px …/.10`,
  `0 -2px 20px …/.08`). The proposal's 8px radius is its own call; the shipped
  page is 4.
- **The overline is a real 4px element and each tile gets a different border
  token**: `border-secondary` on My Favorites, `border-success` on My Reports,
  `border-notice` on Announcements, `border-attention` on My Training. Solid
  colours, no gradients.
- **The tile title is the library's own `Web/Heading/M/Regular`** — 20px / 400 /
  28 in `--text-primary` (#666), grey and regular. This is the same style whose
  use the proposal overrides to navy SemiBold (deviation logged for that
  screen). The original uses it as published, which is what makes the two
  screens worth comparing rather than reconciling.
- **The header has no bottom rule** and no results count: 44px, 8/16 padding,
  title left, one 20px brand-blue glyph right — `more_vert` on the two tiles
  the user can configure, `visibility_off` on the two they can hide.
- **Every menu entry is `Button Type=Action text`**, 16px tall, label
  `Web/Label/M/Regular` in `--text-link`. Every area block is the `Card`
  component with `Color Bar? = false`, `dropshadow-sm`, an 8/16 row and a
  42px icon square at `--radius-sm` holding a 32px `Flexible Icon`
  (`Icon Set=Express, Size=X-Large, Color=White`).
- **The area icon colours are semantic icon tokens, not decoration**:
  `icon-success` for Rental Info and Receivables, `icon-attention` for
  Communication and Owners, `icon-notice` for Admin and Payables,
  `icon-brand` for Services and Accounting.
- **The Favorites tile has five areas in its first column, not four.**
  `Services` (Issues · Tasks · Appointments · New Issue · Make-Ready Board ·
  Calendar) sits below `Admin` and is clipped by the tile in the frame. It is
  present here and reachable by scrolling.
- **The content slot insets 16 — except My Favorites, which insets 24 on the
  right.** Kept per-tile rather than averaged; it is the kind of thing that
  is either the component's default or three overrides of it, and worth a look.
- **The Announcements "NEW" badge is a `Lozenge State=Success` with its fill
  overridden**, and the date under each headline is `Web/Label/S/Italic` in
  `--text-disabled`.
- **My Training is a Card inside a Card**: the outer card's slot carries a
  second white surface with effect style `dropshadow-lg`, and inside it an
  `Input Field Style=Express` (white, not the usual `component-input-default`)
  and a `Button Type=Primary` whose fill is overridden to `icon-attention`.

## The three images

Real assets out of the frame, not stand-ins, and inlined as data URIs in
`assets/original-art.css` because a published page has every external host
blocked and `bundle.mjs` inlines stylesheets but not image files:

| Asset | Source |
|---|---|
| The patterned ground | node `4969:70309`, the `RMX_Background` component instance (`Theme=Light, Device=Web`), 1920 × 844. PNG rather than SVG — the vector is 39 kB of individual dots. |
| The announcement artwork | the Artwork rect's image fill (hash `3d704643…`), 2880 × 1612 behind a Figma CROP transform. The crop is baked in at 2× so the markup needs no transform. Both cards use this one image in the frame too. |
| The Rent Manager University lockup | image hash `4eed47e8…`, 1091 × 307, the complete lockup. In Figma the frame draws its top line as a vector group and its bottom line as a crop of this image; here it is one asset. |

## Icons

Seven glyphs this screen needs that neither the bundled core nor the
proposal's harvest carried: `bills`, `reports-owners`, `setup` (Express) and
`Mail outline`, `visibility_off`, `campaign_filled`, `school_filled`
(Material). All seven were exported from RMX Iconography with
`exportAsync({format:'SVG_STRING'})` and appended to
[`assets/icons-local.svg`](assets/icons-local.svg).

**All seven were then verified against the live library by FNV-1a hash of the
path data — every one matches, so nothing is a transcription of a glyph rather
than the glyph.** Nothing on this screen is drawn by hand and nothing is
marked provisional.

## Not real yet

- **Nothing navigates.** Every menu entry, tile kabob, hide-tile eye, app-bar
  button, Command Launch and the two hidden-tile links carry `data-rmx-todo`
  and toast rather than dead-ending.
- **The announcement feed is the frame's two items**, both dated
  January 21, 2026, both carrying the same artwork — as in the frame.
- **Rent Manager University sign-in does nothing.** The email field and Sign In
  are real controls with no wiring.
- **Favorites and Reports are not customisable.** Which areas and links appear
  is the frame's curation; the kabob says so.
- **Light mode only.**

## Deliberate deviations — the original screen

| Rule | Where | Why we kept it |
|---|---|---|
| A colour with no variable behind it (#195ca4) | the "NEW" Lozenge | The frame overrides a `State=Success` Lozenge's fill to #195ca4, which no Foundations variable carries. Kept because the badge reads dark blue on the shipped page and `State=Success` would render it green — the alternative was to change what the screen looks like. Marked `UNBOUND` at the rule and raised below. |
| Contrast below 4.5:1 (every menu link) | `.ows-link` | `--text-link` (#008dd5) on white is 3.64:1. The design system's own link colour on its own surface — not this screen's to solve, and the same finding the proposal carries. |
| Contrast below 4.5:1 (the announcement dates) | `.ows-ann__date` | `--text-disabled` (#b3b3b3) on white is ~2:1. It is the token the frame binds for the date, so the screen uses it; the finding belongs to the token. |
| The welcome lines use `--text-primary`, not the frame's #575353 | `.ows-welcome` | The frame's two greeting lines carry an unbound #575353. The type style (`Web/Heading/L/Regular`, `Web/Heading/M/Regular`) is real; the colour is not, so the screen uses the token it is one step away from. Invisible at this size, and the tokens are the source of truth. |
| The inner My Training panel is 4px, not the frame's 5 | `.ows-training` | 5px is backed by no radius token and reads as an authoring slip. `--radius-sm` instead. |
| `border-success` and `border-notice` written with a hex fallback | `.ows-overline` | Both are real Foundations variables, read off the bound stroke, but `tokens.css` carries neither. Written `var(--border-success, #a8d48f)` so a `check.mjs --fix` refresh of the foundation cannot silently un-colour two tiles. Raised below. |
| Local overrides on `.rmx-field__box`, `.rmx-btn` and `.rmx-contextbar__trailing button` | `assets/workspace-original.css` | Three places where the frame is more specific than `rmx.css`: `Input Field Style=Express` is white, the Sign In button's fill is overridden to `icon-attention`, and the Context Bar's trailing text action has a type style at all. All three scoped to this screen and raised below. |
| The app bar departs from three equal columns below 760px | `assets/workspace-original.css` | Same stopgap as the proposal, for the same reason: `Header (app bar)` is authored at 1920 and has no responsive variant. Company Code goes first, then the icon cluster, then the logo scales. Not a design. |

## Responsive behaviour — the original screen

The frame is authored at one width and has no responsive variant, so anything
below 1920 is the prototype's own behaviour rather than the design's:

| Width | Layout |
|---|---|
| **≥ 1920** | Exactly the frame: 64px gutters, a 1792 row, tiles at 558 / 558 / 314 / 314 with 16px gaps, each 580 tall. The row stays 1792 and centres on a wider window, as the frame's Tile Row does. |
| **1200–1920** | The tiles keep their widths and wrap when they no longer fit; the two bars take the window width, which is their own `overflow: clip` behaviour. |
| **900–1200** | 32px gutters. |
| **< 900** | 16px gutters, one tile per row, and the two-column menu areas drop to one column. |

Verified with no horizontal overflow, no console errors and no off-ramp type
size at 1920, 1440, 900, 600 and 390px.

## What the check said

**The 2.0.0 tooling this screen was built against is no longer on disk** — the
skill folder was replaced mid-session with a different version, so
`check.mjs --fix` and `bundle.mjs` could not be run. What was available is the
older `audit.mjs`, and it ran clean apart from one rule:

- **15 errors, all `bespoke-on-component`, all `Card`.** See item 18 below —
  `rmx.css` has no `.rmx-card`, so the fifteen Card instances on this page can
  only be built from a local class, which that rule forbids. Not a defect in
  the screen; a gap between the stylesheet and the rule.
- **65 `contrast` warnings** — every one is `--text-link` on white at 3.64:1,
  the design system's own link colour on its own surface. Item 12 of the
  proposal's list.
- **62 `control-height` warnings** — every one is a `Button Type=Action text`
  at its real 16px height. The rule assumes every control is 36px; action
  text is not. Item 3.
- **`stamp-stale`** — the screen is stamped 2.0.0 and the skill on disk now
  reports 4.0.0. Deliberately not re-stamped: re-stamping without the matching
  references would claim a check that has not happened.

In place of the visual audit the screen was verified in a browser at five
widths: computed colours, control heights, slot insets, type styles and every
icon reference read back against the frame's measurements, plus no horizontal
overflow and no console errors. Everything in "What the frame turned out to
say" above is a measured value, not an intention.

---

# The proposal

## Where it came from

`Workspace.zip` — a Claude Design canvas with six artboards (My Workspace,
My Workspace v3 "Calm vs Splashy", Splashy, Splashy v2, a standalone bundle,
and Tenant Details Splashy). **Splashy v2 is the one rebuilt here**; it is the
newest and the only one whose section set the others do not supersede.

Read as a spec, not as source. The export's own `<style>` block was discarded
whole, as the skill requires — it forced Inter over RMX's Roboto, loaded
Material Symbols by ligature, and invented a 10/11/13/15/18/22/36px type ramp
with 700 weights. None of that survived.

**Not built:** the Start My Day stepper (`start-my-day.jsx`) and the Tenant
Details redesign (`tenant-details.jsx`). Both are in the export and both were
deliberately left for later. Adding either is a new screen in `screens/`, not a
restructure — nothing here moves.

## What was read off the live library rather than assumed

- **`Tile Style=Workspace` is the right component for these sections, and its
  coloured top bar is real.** The variant is a vertical frame on
  `background-tile` with a 1px `border-primary` stroke, whose first child is an
  **`Overline` frame, 4px tall, with a 4px `border-secondary` top stroke**
  (node 4075:109743), then a header that hugs to 44px at 16/8 padding, then the
  `content ↓` slot at 16px padding and 16px gap. So the export's coloured
  header bar was not decoration invented on the canvas — it is the component,
  recoloured per tile exactly the way production My Workspace does it (blue on
  Favorites, green on Reports, orange on Training).
- **The Workspace tile's title is `Web/Heading/M/Regular` in the library** —
  20px / 400 / 28px in `--text-primary` (#666), read off Header Style=Workspace,
  node 7331:5299. **This screen does not use it.** Emma's call on 2026-09-10:
  the titles are `Web/Paragraph/L/SemiBold` (16 / 600 / 24) in
  `--text-secondary`, following production, because a grey regular title does
  not hold a card. Logged as a deviation below and as a component question in
  "Worth raising" — the library and the shipped app disagree here, and this is
  the app's answer. (`rmx.css`'s own `.rmx-tile__title` is 14/600 navy, the
  *Content* header's size, so it is wrong for a Workspace tile either way.)
- **The Express product icon set, not Material lookalikes.** The eight
  menu-area squares carry the real `rental-info`, `email-center`, `owners`,
  `system-preferences`, `issues`, `accounting`, `receivables` and `payables`
  glyphs, which is what production draws in these tiles. Those plus seven
  Material glyphs (`checklist`, `school_outline`, `open_in_new`, `play_arrow`,
  `schedule`, `playlist_add_check`, `sms / outlined`) were exported from RMX
  Iconography as SVG strings and live in
  [`assets/icons-local.svg`](assets/icons-local.svg) with their source name and
  component key on each symbol. **Nothing is hand-drawn and nothing is
  provisional.**
- **The app bar brand is the `#rmx-logo` vector**, per 2.0.0 — it was a text
  span before, which is the thing 2.0.0 called out explicitly.
- **The app bar's second glyph is Express `reports`.** `templates/screen.html`
  renders `#description` there; `references/page-patterns.md` and the real frame
  both say `menu · reports (Express) · grade`.
- **One trailing Context Bar item, and it is text.** General pages carry one
  (16 frames) or two (11) — three is the register default. Production My
  Workspace carries exactly one and it reads "My Dashboard →", so it is a
  `Context Bar Item` text action, not an icon.
- **`Radius/md` is 8px and `Spacing/6xl` is 64px.** Both are named in the 2.0.0
  anatomy (`Radius/md` is `Tile Style=Dashboard`'s own radius) and neither is in
  `tokens.css`. The two numbers this screen was asked for are therefore real
  library values, not chosen ones. See "Worth raising".
- **`dropshadow-md`** — the named effect style on Tile Style=Workspace, node
  4075:109757: `0 -2px 10px rgba(76,76,76,.08), 0 4px 5px rgba(76,76,76,.10),
  1px 2px 6px rgba(76,76,76,.10)`. Replaced the shadow this file had invented.

## Responsive behaviour

The page fills the viewport rather than sitting in a fixed column — the export
was authored at a 1400px canvas width and that is not a design decision worth
inheriting.

| Width | Layout |
|---|---|
| **≥ 900** | Two card columns. **64px gutter** (`Spacing/6xl`) beside the welcome band and the tile grid, held all the way down. The app bar keeps its three equal columns, so Command Launch stays centred; the search field shrinks from 454px below about 1780, which is the bar's own `overflow: clip` behaviour rather than an override. |
| **< 900** | One column, 32px gutter, and **the cards reorder so the work comes before the menus** — My Mentions, My Tasks, then Favorites, Reports, Rent Manager University. That is the order the export's own one-column layout specified. The menu-area blocks drop to a single column, and Company Code gives up its space in the bar. |
| **< 600** | 16px gutter. The announcement band stacks, the welcome band's Customize button goes full width, and the app bar drops its three Command Launch icon buttons and scales the logo to fit its column. |

Verified with no horizontal overflow and no console errors at 2560, 1920, 1440,
1280, 1024, 900, 820, 600 and 390px.

**Below about 768px the app bar is a stopgap, not a design.** The Header
component is authored at a fixed desktop width and the library has no
responsive variant, so rather than invent one this screen does the three
smallest things that stop it visibly breaking. See "Worth raising".

## Not real yet

Everything on the page is realistic Express content, but none of it is wired:

- **No data.** Tenants, properties, vendors and figures are fixed strings. The
  same people hold the same facts across the screen (Marcia Clark's duplicate
  charge is both Karen Hsu's mention and a task; Riverview #204's carpet is
  both Diego Alvarez's mention and a task), so it reads as one afternoon.
- **My Favorites and My Reports are not customisable.** The tune icon on each
  says so. Which areas and links appear is the export's curation.
- **The announcement carousel does not auto-advance** and has no source. Two
  items, switched by the dots.
- **Nothing navigates.** Every area link, tile menu, app-bar button and the
  Command Launch field carry `data-rmx-todo` and toast rather than dead-end.
- **My Dashboard, Customize and Start My Day do not exist.** Customize is the
  affordance the concept most depends on and is the obvious next screen.
- **Light mode only.** Foundations has dark-mode variables but no verified
  values in this skill.

## Deliberate deviations

| Rule | Where | Why we kept it |
|---|---|---|
| **`radius` — 5 errors** | The five section Tiles and the announcement band | 8px, Emma's call on 2026-09-10, and it is `Radius/md` — a real token that `Tile Style=Dashboard` uses. **The audit rule is stale, not the screen:** its message still reads "RMX is radius-sm (4px); only Pill (12) and Orion surfaces (8/24) go higher", which 2.0.0's own anatomy contradicts. Inner surfaces stay at `radius-sm`, which is correct nesting. Fix the rule; see "Worth raising". |
| Workspace tile title is navy SemiBold, not the library's grey Regular | `.rmx-tile[data-ws-tile] .rmx-tile__title` | `Header Style=Workspace` carries `Web/Heading/M/Regular` (20/400, `--text-primary`). This screen uses `Web/Paragraph/L/SemiBold` (16/600, `--text-secondary`) instead — Emma's call, following production. The harvested value was tried and read as too weak to hold a card. |
| Borders over shadows | Every section card, the announcement band | Emma chose to keep the export's card language. Cards carry `dropshadow-md`, the real named effect style on Tile Style=Workspace. |
| White text on the announcement band | `.ws-ann__panel` | Emma's call on 2026-09-10; it is what the export had. **It does not clear WCAG AA and cannot be made to** — white measures 2.59:1 on `--icon-attention` (#f58220), 1.99:1 on `--icon-notice` (#faa61c), 2.47:1 on `--icon-success` (#6eb744) and 1.19:1 on `--component-lozenge-success` (#e2f1da). Orange is light enough that no size threshold rescues it. Three ways out: navy text (4.97–6.7:1, what this screen had before), a darker ground, or a dark scrim over the gradient. Emma's to pick. |
| Gradient on the Tile overline | `.ws-overline[data-ws-accent]` | The overline is a real 4px element and its default is a solid `--border-secondary`. Three of the five run a gradient between two real tokens instead of a solid, which is the export's treatment. |
| A full-bleed welcome band | `.ws-band` | RMX has no welcome or landing surface. Built from tokens: `--container-secondary-dark` → `--component-context-header`, textures in white at low opacity, glow from `--icon-attention` at 28%. See "Worth raising". |
| A marketing announcement band | `.ws-ann` | Also has no component — Callout is outlined and 40px, Bulk Action is the register banner, Toast auto-dismisses, Reminder is the green appointment surface. Left **untagged** rather than labelled with a component it is not. |
| A percentage ring | `.ws-donut` | `Progress Bar` has three states and `Progress Circle` counts steps; neither is a percentage ring. Drawn from tokens, untagged. |
| No underline on action text or links | `.rmx-text--link`, `.rmx-btn--text`, the Context Bar action | Emma's call, 2026-09-10: blue action text carries no underline in either state. Two causes, both fixed — the area links were underlined by the browser's `<a>` default, which neither `rmx.css` nor `proto.css` resets, and `rmx.css` deliberately underlines `.rmx-btn--text` labels on hover. |
| Contrast below 4.5:1 (×45) | Every `.rmx-text--link` | `--text-link` (#008dd5) on white is 3.64:1. This is the design system's own link colour on its own surface, so every RMX link in every prototype fails this check. Not this screen's problem to solve, but worth someone's. |
| Three category tags share `State=Brand` | My Tasks Lozenges | Lozenge has five usable status states and the task set has six categories. Eviction→Error, Make-Ready and Leasing→Success, Vendor→Caution, Tenant and Reporting→Brand. See "Worth raising". |
| Two accent colours dropped | My Tasks, Rent Manager University | The export used teal (#0bb5c9) and purple (#9747ff). Foundations has neither, and `background-teal` / `background-purple` exist but are scoped "exclusively for signature fields in Signable Documents". Both sections fall back to a solid real accent rather than being approximated. |
| The app bar departs from three equal columns | below 900px | Equal columns squeeze Command Launch to nothing. The middle column takes double weight and Company Code hides; below 600px the icon buttons hide and the logo scales. Not a design — see "Worth raising". |
| Bespoke JS | the inline script in the screen | `assets/app.js` owns the Checkboxes and every `data-rmx-todo` toast. The announcement carousel, the Toggle Switch filter and the counts that follow are not behaviours it covers. No `alert()`. |

`assets/workspace.css` is the prototype-local layer and says the same things at
each rule. A developer handed this deletes it and keeps `rmx.css`.

---

# Worth raising with the design system

Found while building these two screens, verified against the live libraries,
and **for Emma to decide on** — none of it was worked around quietly. Items
1–11 came out of the proposal, 12–17 out of rebuilding the original.

1. **`tokens.css` is missing `Radius/md` (8px)** even though the 2.0.0 anatomy
   names it as `Tile Style=Dashboard`'s radius — and **`scripts/audit.mjs`
   still errors on any radius ≥ 8 outside Orion**, so the skill's own audit now
   contradicts the skill's own harvest. The rule should allow `--radius-md` on
   a Tile. Five errors on this screen are that rule, not a violation.
2. **`tokens.css` is missing the upper spacing scale.** The anatomy references
   `Spacing/xxxs` (2px), `4xl` (48), `6xl` (64) and `8xl` (80); `tokens.css`
   stops at `3xl` (40) with a comment saying to add them. This screen needs
   64px and declares it locally.
3. **`.rmx-btn--text` is 36px tall; `Button Type=Action text` measures 20px
   with zero padding.** This screen uses `.rmx-text--link` for action text to
   avoid it. *(The `.rmx-btn` 14px/500 problem is fixed in 2.0.0.)*
4. **The Workspace tile's title style is wrong in the library, or wrong in the
   app.** `Header Style=Workspace` says 20px Regular in `--text-primary`; every
   shipped My Workspace tile draws a navy SemiBold title nearer 16–18px. One of
   the two needs to change, and a prototype cannot settle it — the proposal
   follows the app. Same question likely applies to the Dashboard header, which
   the anatomy records as 16px/600 navy.
   **Narrowed 2026-09-10:** the production *design* frame (node 4969:70308)
   uses the library value as published — 20/400 grey — so the library and the
   Figma page agree and it is the **implementation** that differs. That makes
   this an implementation bug to raise with engineering rather than a
   Foundations question, and it makes the two screens here disagree on purpose:
   `my-workspace-original.html` uses 20/400 grey, `my-workspace.html` uses
   16/600 navy on Emma's call.
5. **`.rmx-tile__header` and `.rmx-tile__title` encode the Content header
   only** — 36px with a 2px `border-secondary` bottom stroke and a 14/600 navy
   title. The three Tile variants differ in radius, title type and rule token,
   as 2.0.0 itself notes; `rmx.css` has one `.rmx-tile`. It wants three.
6. **An unchecked `.rmx-check` renders a gray tick.** `rmx.css` colours the
   glyph white when checked but never hides it when not. Both this prototype
   and `rmx-tenant-register` carry the same one-line fix, which is the signal
   it belongs upstream.
7. **`Component/workspace-tile` is a Foundations colour that `tokens.css` does
   not carry.** It is the Overline frame's fill (the 4px `border-secondary`
   stroke covers it, so nothing here depends on the value).
8. **There is no categorical colour set.** Lozenge's five status states are
   semantic, so any screen that needs to colour-code more than five
   *categories* — a task list, a tag set, a chart series — has to either
   collapse them or invent colours. This is what pushed the export to teal,
   purple and magenta. A named categorical ramp in Foundations would close it.
9. **The no-underline rule contradicts a Foundations text style.**
   `Web/Paragraph/S/Special/Underline` exists and its own description is "Use
   for links on hover". If blue action text is never underlined, that style has
   no remaining use and should either be retired or have its description
   corrected — right now the library says both things.
10. **`Header (app bar)` has no responsive variant.** It is authored at
   `Display/Display` (1920) and `rmx.css` carries that width literally, so any
   prototype narrower than a desktop window either overflows or is
   hand-adjusted. This page hand-adjusts it in three places and says so. A
   compact Header variant — or a stated minimum width for Express — would
   settle it.
11. **There is no welcome / landing surface, and no marketing announcement
    surface.** Both are load-bearing for this page and both are currently
    hand-built. If My Workspace ships in anything like this shape, they are two
    real components.
12. **`tokens.css` is missing `Border/border-success` (#a8d48f) and
    `Border/border-notice` (#f79b4d).** Both are real Foundations variables —
    read off the bound strokes of two Workspace Tile overlines on the
    production frame — and neither is in the stylesheet, which carries only
    `border-primary`, `border-secondary`, `border-disabled` and
    `border-attention`. Two of the four tiles on the shipped page cannot be
    coloured from tokens alone today.
13. **`Lozenge` has no state for the dark-blue "NEW" badge, so the production
    frame overrides a `State=Success` Lozenge's fill to an unbound #195ca4.**
    Either that badge is wrong and should be a real status state, or the
    library needs the state — right now the shipped page is held together by
    a detached colour. This is the same gap as item 8 seen from the other
    side: Lozenge's five states are semantic and the page needs a sixth,
    non-semantic one.
14. **The Context Bar's trailing text action has no type style in `rmx.css`,
    so it renders at the browser's 13.33px button default.** The frame says
    `Web/Label/M/Regular` in `Text/text-OnDark`. It is a one-line fix in
    `rmx.css` and it affects every prototype that puts text rather than an
    icon in that slot — both screens here did.
15. **`.rmx-field__box` hard-codes `--component-input-default` (#f5f8fa), but
    `Input Field Style=Express` measures `Container/primary` (white).** The
    variant axis exists in the component and not in the stylesheet, so any
    Express-style field has to be overridden per screen.
16. **A `Button Type=Primary` on the shipped page is painted with
    `Icon/icon-attention`.** The Rent Manager University Sign In button is
    orange, not brand blue, and it does it by overriding the Primary fill with
    an *icon* token rather than by being the Marketing button
    (`--background-tertiary-button`, #f79b4d — a different orange). Worth
    deciding which it is meant to be; a screen cannot.
17. **`Tile Style=Workspace`'s content slot insets 24 on the right in one
    instance and 16 in the other three** on the same frame. Either the
    component's default is 24 and three instances override it, or the reverse.
    Small, but it is the kind of drift that makes a rebuilt screen look
    subtly off for no findable reason.
18. **`rmx.css` has no `Card`, and the audit's `bespoke-on-component` rule
    makes that unresolvable.** `Card` is the second most-used component on
    this page — fifteen instances — and the stylesheet has no `.rmx-card`, so
    a Card can only be built from a prototype-local class. The audit then
    errors on every one of them, because it treats *any* non-`rmx-` class on a
    tagged element as a hand-restyled component. Both halves are right on
    their own and together they leave no legal way to build a Card. Either
    `rmx.css` gains `.rmx-card` (preferred — it is a real component with a
    real anatomy), or the rule needs to distinguish "restyled a component
    rmx.css implements" from "implemented a component rmx.css does not".
    Fifteen of this screen's errors are that, and they are the only errors.
