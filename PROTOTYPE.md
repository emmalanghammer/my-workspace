# My Workspace

The Express welcome page. It answers: **when a property manager signs in, what
should the first screen give them?** Today's My Workspace is four reference
tiles — My Favorites, My Reports, Announcements, My Training. This is a
proposal for what replaces it: keeps Favorites and Reports, adds the work —
what is waiting, what is late, who needs an answer.

**Owner** Emma Langhammer · **Started** 2026-09-10 · **Built with** rmx-prototype 2.0.0

## Screens

| Screen | What it shows |
|---|---|
| [`index.html`](index.html) | **The proposal — the page.** Full-bleed and fluid. The announcement band is a two-item carousel; My Tasks filters All / Overdue through a real Toggle Switch and each task ticks off through a real Checkbox, with the open and overdue counts following; every link and menu that goes nowhere says so instead of doing nothing. |
| [`screens/my-workspace-original.html`](screens/my-workspace-original.html) | **The original — reference only, not part of the main flow.** Today's My Workspace, rebuilt from frame `My Workspace` (node 4969:70308) in RMX Pages, for comparison against the proposal above. Four `Tile Style=Workspace` sections with their coloured overlines, the eight Favorites menu areas and four Reports areas with their real Express glyphs, two announcement cards with the real artwork, the Rent Manager University sign-in, and the two hidden-tile links bottom right. Reached only by direct link — a one-line "← Back to My Workspace" is its only navigation. |
| [`screens/tasks.html`](screens/tasks.html) | **Tasks — a separate screen**, brought in from another session's artifact and given a real, matching app bar / Context Bar in this session. My Tasks' "Open Tasks" jump link (the icon in its top-right corner, matching Rent Manager University's icon/pattern — but real, not a `data-rmx-todo` placeholder) opens the full register here. Individual task rows on My Workspace instead open this screen's Task Details modal *in place*, via `?embed=1` — see "Task details, opened in place" below. Full task register (My Tasks / Other Users' Tasks), a Quick Add bar, an Assigned To dropdown, a New Task / Task Details modal with a live checklist, links, and history/notes. See "The Tasks screen" below for what it is and isn't. |

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

## The proposal is the site

`index.html` *is* the proposed screen — not a picker, not a redirect. Emma's
call, 2026-09-10: My Workspace is the only page most visitors need, so it lives
at the root with no indirection. `screens/my-workspace.html` (the old location)
is now a one-line redirect stub, kept only so an old link or bookmark still
lands somewhere.

`screens/my-workspace-original.html` was added by a parallel session, rebuilt
from the real production frame in RMX Pages rather than from the Claude Design
export — a faithful baseline to measure the proposal against, not a second
proposal. It is unlinked from the main flow; its only navigation is a single
"← Back to My Workspace" line above the app bar.

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
| My Tasks' icon button is a real link, everywhere else it is a placeholder | `[data-ws-tasks] a.ws-iconbtn` | Deliberately inconsistent with its own tile row: every other `data-rmx-todo` icon in this screen is a dead end that toasts. This one genuinely navigates, because `screens/tasks.html` is a real screen to navigate to — see "The Tasks screen" below. |

`assets/workspace.css` is the prototype-local layer and says the same things at
each rule. A developer handed this deletes it and keeps `rmx.css`.

---

# The Tasks screen

`screens/tasks.html` came in whole from a separate artifact — **"Tasks
Enhancements"**, shared with Emma, built by a different session — added here
because it needed a real home to link to from My Tasks' "Open Tasks" icon.
Its app bar and Context Bar were then brought into conformance with this
repo, Emma's call on 2026-09-10; everything below the Context Bar is
untouched.

**What it is:** a complete, working Tasks register — My Tasks / Other Users'
Tasks, search, a resizable-column register, a Quick Add bar, Users Bubbles
assignment with an Assigned To dropdown, and a New Task / Task Details modal
carrying a live checklist (with a "from template" flow), Links, and
History / Notes. Ten seed tasks on My Tasks, nine on Other Users' Tasks — all
real property-management content (assign to maintenance, close service
tickets, distribute owner payments), no lorem ipsum.

**The header conformance pass — what changed:**

- **The app bar and Context Bar are now the real, shared components** —
  `.rmx-appbar` / `.rmx-contextbar`, linked to this repo's actual
  `assets/tokens.css`, `assets/type.css` and `assets/rmx.css` rather than
  re-derived from a different reference doc. The nine icon symbols the header
  needs (`rmx-logo`, `menu`, `reports`, `grade`, `search`, `notifications`,
  `print`, `autorenew`, `help`) were copied byte-for-byte from
  `assets/icons.svg` — verified by diff against the source after copying,
  because a hand-retyped first attempt at the 10KB logo path drifted by one
  digit in one coordinate. Not a value to eyeball twice; diff it.
- **Avatar reads `TL`**, matching Tony (the signed-in persona on the proposal
  screen), not the original artifact's `EL`.
- **The Context Bar drops the original's leading "Calendar >" item.** It
  doesn't match any real Context Bar Item content type (`Title Text | Search
  | Dropdown | Pagination | Filter Button | Navigation | Icon | Tour Action |
  Print Button`) — not a case of picking the wrong one, there wasn't a right
  one to pick. Trailing stays print / autorenew / help — the register-page
  default (`page-patterns.md`: 23 of 30 register frames carry exactly these
  three) — so unlike the "Calendar" item, this part of the original was
  already right, just re-pointed at the real icon symbols.
- **Full-bleed and sticky-pinned on scroll**, same as the proposal screen.
- **Its own `toast()` now fires on every borrowed header placeholder**
  (Mega Menu, Reports, Favorites, Command Launch, Print, Refresh, Help) via a
  small `data-rmx-todo` click listener added at the end of the existing
  `<script>` block — this screen doesn't link `assets/app.js`, so the
  behaviour is wired locally rather than pulling in a script dependency for
  one listener.

**What is still exactly as delivered, below the Context Bar:**

- **Not built against this repo's foundation.** It carries its own inlined
  stylesheet and its own token names (`--rmx-blue`, `--r-sm`, …) rather than
  `assets/tokens.css` / `assets/rmx.css`, and none of its elements carry
  `data-rmx-component`. Its own header comments say why: it was built RMX-
  conformant against an earlier design-system reference doc (`design.md`),
  without Figma access, in one self-contained file — a different (valid)
  path to the same design system this repo also targets, not a lesser one.
  Reconciling the *rest* of it onto this repo's foundation — same tokens,
  same components, same audit — is real work and a real decision, not
  something to do silently while fixing a header.
- **Not audited.** `check.mjs` / `audit.mjs` check `data-rmx-component`
  tagging and this repo's token names; neither exists below the header, so a
  run would be mostly noise, not signal. Its own header comments are its
  equivalent of an audit trail — ten numbered RMX-conformance corrections,
  then an explicit list of extensions beyond the base system and its
  reasoning for each.
- **Icons are Material Symbols**, not this repo's harvested SVG sheet — a
  deliberate substitution its own comments call out (`view_column` for the
  register's column picker, `apartment` for the property/company domain,
  `sms` / `mail` / `description` for Send Text / Write Letter / Publish
  Signable Document), not an oversight. The header conformance pass above
  added a second, real icon sheet (9 symbols) alongside this one — the two
  coexist because they cover different, non-overlapping parts of the page.
- **Not responsive.** Built and verified at a 1920px desktop width; the
  register does not reflow narrower. Unlike the proposal, this was not
  something asked for here.

**The integration point — My Tasks' jump link:**

```html
<a class="ws-iconbtn" aria-label="Open Tasks" href="screens/tasks.html">
  <svg class="rmx-icon"><use href="#open-in-new"></use></svg>
</a>
```

Same icon, same `.ws-iconbtn` treatment as Rent Manager University's "Open
Rent Manager University" button — but a real `<a href>`, not a
`data-rmx-todo` placeholder, because a real destination exists. Rent Manager
University's icon stays a placeholder; it has nowhere real to go yet.

## The two task lists are one task list

My Workspace's My Tasks preview and the Tasks screen's own dataset were two
independent, disconnected sets of mock data until this pass — a task could
share a title by coincidence but not an identity. Emma's call, 2026-09-10:
"combine the data so it all makes sense." Now:

- The six tasks on My Workspace's My Tasks (`ws-post-notice`,
  `ws-carpet-vendor`, `ws-marcia-clark`, `ws-hvac-scope`, `ws-rent-roll`,
  `ws-tomas-renewal`) are real entries in `myTasks`, prepended ahead of the
  artifact's own ten, assigned to `TL` (Tony, this prototype's signed-in
  persona) rather than Emma Langhammer. Tony was also added to
  `ASSIGNEE_USERS` so the Assigned To dropdown can find him.
- **Clicking a `.ws-task` row on My Workspace** (anywhere but its Checkbox)
  navigates to `screens/tasks.html?open=<id>`, which opens that exact task's
  Task Details modal on load — the same task, not a different one that
  happens to share a title.
- **Checking a My Workspace task done now toasts** — `RMX.toast('Task closed
  successfully', 'success')`, matching the Tasks register's own message for
  the same action — and its checked box is **green**
  (`.ws-task .rmx-check[data-checked="true"] .rmx-check__box`), matching the
  Tasks screen's own green-for-row-completed convention, scoped to this one
  tile. Every other checkbox in this prototype stays the real RMX orange
  (`--icon-attention`); this is a deliberate, narrow exception, not a
  reinterpretation of the component.

## Toasts are for a completed action, not a placeholder

Emma's call, 2026-09-10, on both screens: a toast means something finished —
a task added, saved, deleted, closed, a checklist populated from a template —
never a `data-rmx-todo` "not built" click. Two different mechanisms, because
the two screens don't share a script:

- **My Workspace** suppresses `assets/app.js`'s `todos()` toast with a
  capture-phase listener in its own inline script (`e.stopPropagation()` on
  any `[data-rmx-todo]` click, registered on `document` in the capture
  phase — capture always runs before app.js's bubble-phase listener,
  regardless of script load order). `data-rmx-todo` stays on every element as
  a marker of what isn't built; it just produces no toast now.
- **The Tasks screen** simply had its equivalent listener (added earlier this
  session, for its borrowed header) removed outright — its own `toast()`
  calls for real actions were never touched.
- **Both toast surfaces moved to top-centre**, below the sticky app bar +
  Context Bar (96px) — `.rmx-toaststack` on My Workspace (overridden in
  `workspace.css`; shared `proto.css` still defaults to bottom-centre for
  every other prototype) and `#toastEl` on the Tasks screen (which
  **reverses that artifact's own §7.4-cited decision** to move it from
  centre to a top-right corner).

## Interaction refinements — Emma's calls, 2026-09-10, verified against the live screen

- **The Select Other Users overlay opens once.** It showed on the very first
  click of "Other Users' Tasks" (correct — no selection exists yet) but also
  reopened every time you revisited the tab afterward, even with a selection
  already made ("a discoverable revisit affordance," per the artifact's own
  comment). That revisit branch is removed: once a selection exists, clicking
  the tab — including clicking it again while it's already active — just
  shows the tab.
- **Users Bubbles: hover reveals, one click acts.** Was a two-step flow —
  click the avatar to reveal a "+", click the "+" to open Assigned To. Now
  hovering the wrapper reveals the name tooltip and the "+" together (CSS
  only, `.user-bubble-wrap:hover`), and a single click anywhere in the
  wrapper opens Assigned To directly. `toggleUserBubble()` and its
  click-outside `.active` cleanup are gone — nothing sets that class anymore.

## A second small round of interaction fixes, 2026-09-10

- **High Priority chip: plain by default, pink on hover, pink once selected.**
  The unselected chip already used the right colors (`--text-primary` gray,
  no background), but hovering it did nothing — there was no preview before
  committing to the click. Added `.hp-chip:not(.active):hover`, matching the
  existing `.active` treatment.
- **The Select an Action / Add Link floating panels wouldn't dismiss on an
  outside click, while a task modal was open.** `#taskOverlay`'s own modal
  wrapper calls `event.stopPropagation()` on every click inside it (so
  clicking the modal doesn't also close the whole overlay) — which meant the
  global `document` click listeners that dismiss `actionsPanel`,
  `linkTypePanel` and `linkResultsPanel` never saw those clicks at all. Both
  listeners are now named functions (`dismissFloatingPanels`,
  `dismissLinkPanels`) invoked directly from the modal's own `onclick`, so a
  click anywhere in the modal — not just outside it — closes whichever panel
  is open.
- **A stray "Tenant" lozenge on the "Return Marcia Clark's call" row.** This
  task has no workflow and no linked record (`workflow:''`, `link:''` in the
  data), but the row still carried a leftover `Tenant` category lozenge next
  to its plain-text context — implying a linked tenant that doesn't exist.
  Removed; the row now matches the other genuinely-unlinked rows (plain
  context text, no lozenge).
- **The Add Link row (Type + search) could run past the Links tile's edge.**
  Both fields were hardcoded to `width:250px`, sized for the full-width
  Figma frame, not the narrower Task Details column they actually render in.
  Both are `flex:1; min-width:0` now, so they share the tile's real width
  instead of overflowing it.

## Checked against the real Figma frames

Two frames, both in `Tasks-Enhancements`
(fileKey `snY4UsgGTXdSKrLxNqIYuc`), fetched 2026-09-10 — `get_design_context`
wasn't available in this session (needs a skill this session doesn't have
loaded), so these came from `get_metadata` + `get_screenshot`, read and
adapted by hand rather than pasted.

**"Filters + buttons" (node `4077:74713`)** — the toolbar row. Two real
discrepancies against the artifact's own delivered markup:

- **"Bulk Actions" is filled Primary, not outlined Secondary.** The
  artifact's own header comment (#5) asserts the opposite, citing "design.md
  §6.3: the register filter row's leading action is a Secondary button" —
  that assertion doesn't hold against the actual frame for this feature.
  Corrected to `.btn-primary`.
- **The Saved Filters field's attached icon is `tune`** (filter sliders), not
  `calendar_today`. Corrected.

Everything else on that row — the 16px gaps between Bulk Actions / Search /
Saved Filters / Show Quick Filters, the toggle switch flush right — already
matched.

**"2.2.5 Task Details - Desktop" (node `3502:94964`)** — the exact frame the
artifact's own comments say the New Task / Task Details modal and its Links /
History-Notes content were built from. Close to begin with; one real
discrepancy:

- **History / Notes' tile header is orange, not blue.** The artifact's own
  comment (#8) asserts a single blue underline for every tile header on this
  modal ("the per-tile green/gray/orange underlines... were invented
  variants with no basis in design.md") — that assertion doesn't hold for
  this tile against the real frame either. Fixed with a scoped `.orange`
  modifier (`.tile-header.orange`), Task Details' header stays blue.

**Pattern worth naming:** the artifact's own header comments record two
"corrections" the author made *away* from what a real Figma frame actually
shows (Bulk Actions, and now History/Notes), both citing the same reference
doc (`design.md §6.3` / an unnamed general rule) as justification. That
reference doc may be generalizing from a different pattern than this specific
feature, or may itself be stale. Worth Emma flagging to whoever maintains it
— the design.md-vs-real-frame gap looks systematic, not a one-off typo.

## Task details, opened in place

Clicking a task on My Workspace used to navigate away to `screens/tasks.html`.
Emma's call, 2026-09-10: it should open on My Workspace itself.

The Task Details modal — its checklist, Assigned To dropdown, Select an
Action, Links, History/Notes, every floating panel it needs — already exists
as real, working code on the Tasks screen. Duplicating a few hundred lines of
that into `index.html` would fork it, and a fork drifts. Instead:

- `screens/tasks.html` gained an **embed mode** (`?embed=1`): when set, the
  app bar, Context Bar, register and Select Other Users modal are hidden
  (`body.rmx-embedded` in its own `<style>`), leaving only the Task Details
  overlay-scrim visible — which was already full-viewport, already dimmed,
  already click-outside-to-close. Nothing about the modal itself changed.
- `closeTaskModal()` gained one addition: when framed (`window.self !==
  window.top`), it posts `{source:'rmx-tasks', type:'close'}` to the parent.
  Every close path — the X, Cancel, clicking the scrim, Save, Delete — already
  calls this function, so all of them notify the parent for free.
- `index.html` frames `screens/tasks.html?embed=1&open=<id>` full-viewport in
  an iframe (`#wsTaskFrame`) when a task row is clicked, and tears the iframe
  down (`src="about:blank"`, so the next open starts clean) on receiving that
  message, on Escape, or after Save. **One implementation of the modal, used
  two ways** — a real navigation for anyone who lands on `screens/tasks.html`
  directly, an in-place overlay for anyone who opens a task from My Workspace.

**My Tasks now caps its height and scrolls.** A 7th task would otherwise push
the whole page down; `.ws-tasklist` caps at 340px (four full rows measured at
74px + 8px gap, plus a sliver of the fifth as a scroll cue) and scrolls
internally past that. Emma's call, 2026-09-10.

## Any Communication action, not just Send Email

The Actions Dropdown's Communication group has four items — Send Text, Write
Letter, Publish Signable Document, Send Email — but only Send Email showed
its Type / Template / Tenant detail row; the other three showed a bare
"Action <name> ×" card with nothing below it. Emma's call, 2026-09-10: "this
is how a task action should work for any communication based action."

All four now share the same field shape (`COMMUNICATION_ACTION_DEMOS`, keyed
by action label), the middle field's label swapping per action (Email
Template / Text Template / Letter Template / Document Template) — the
non-Communication actions (View Issues, Post Owner Checks, …) are unaffected
and still show only the bare card. Demo content stays on the Daniel Smith /
pet-approval record this whole feature is themed around, since that's the
one real detail the rest of the page already commits to; the specific
template names (`Pet Request Reminder`, `Pet Addendum Cover Letter`, `Pet
Addendum`) are realistic-sounding mock content in the same spirit as the
existing Send Email demo, not something read off a real source — there was
no real source for these three to read from.

## Add Link, actually built

`+ Add Link` in Task Details was a bare `<a>` with no `onclick` at all — it
did nothing. Checked against the real frame (`2.2.6 Task Linking Details`,
node `4385:103128`, fetched 2026-09-10 via `get_metadata` + `get_screenshot`,
three progressive states of the same interaction): clicking it reveals a
**Type dropdown + a search field + a cancel X**, matching the frame's own
proportions (two 250px fields). Now real: pick a type (`Tenant` / `Unit` /
`Property` / `Vendor`), the search field filters a small list of records and
picking one adds it as a new, removable chip above.

The record lists (`LINK_RECORDS`) aren't invented — every name in them was
already used somewhere else in this prototype's own data (`Riverview
Apartments` is the frame's own example; `Anderson Mechanical` is My
Workspace's HVAC task; `FMHP` / `HH` / `PARK` / `BUCK` are property codes
already appearing in `myTasks` / `otherTasks`' `link` fields).

**A checked-off task is green here too.** The Task Details modal's own "mark
this task done" checkbox (top-left, next to the title) used the default
marketing-orange checked state; it's the same "whole task complete" semantic
as the register's row-level checkbox, which is already green — now so is
this one (`.chkbox.green`). Checklist *item* checkboxes are unaffected — a
sub-item is a different, more granular thing than the task itself.

**High Priority uses a real flag asset, not a Material Symbols glyph.** Emma
supplied the SVG directly (14×16, `#EB343C` — the real RMX error-red token) —
used in both places a flag appears: the High Priority chip in Task Details,
and the small flag next to a high-priority task's title in the register row.

## Similar link UI, on My Workspace

Three of My Workspace's six task rows genuinely reference a specific record
— "Patrick O'Malley" is a Tenant, "Riverview #204" is a Unit, "Anderson
Mechanical" is a Vendor — and now carry the same label + blue-value
treatment as the Tasks screen's own Links section, instead of plain gray
text. The other three ("Duplicate charge on statement", "All properties",
"Lease ends in 32 days") are notes, not links to anything, and stay plain —
applying link styling to them would have implied a record that doesn't
exist. Emma's call, 2026-09-10.

Clicking through from one of the three now-linked rows to that task's
details (the in-place modal from the previous round) shows the matching
link chip — `myWorkspaceTasks` in `screens/tasks.html` gained a `links:[...]`
array for those three entries, so the row's implied link and the modal's
actual Links section agree.

## The Mega Menu, built in full

The hamburger icon in the app bar was a `data-rmx-todo` placeholder since the
very first pass at this screen. Emma asked for it built for real, from the
actual Figma frame — RMX-Pages (fileKey `5XEzI94nmZsWE7rQQ7OIHP`), node
`4077:83115`, "Menu" — and to build it in full rather than just the one
category state the frame happened to have open (Full Menu → Receivables).

**What's real.** The header's six tabs (Workspace, Dashboard, Administration,
Full Menu, Search, Help), all 7 Full Menu categories (Rental Info,
Accounting, Receivables, Payables, Owners, Services, Communication) with
their real column headings and roughly 150 real item names transcribed from
the frame, and each category's real Setup/Reports footer links. Only two
things actually go anywhere: **Workspace** (the header tab — this page is
already My Workspace) and **Tasks**, which lives under Services → Calendar →
Tasks and opens `screens/tasks.html`. Everything else — every other header
tab, every one of the ~150 module items, every footer link — is
`data-rmx-todo`; clicking it does nothing, per this screen's own rule that
`data-rmx-todo` no longer produces a toast (see "Toasts are for a completed
action"), which turned out to be exactly the right behavior here too: a
placeholder-heavy screen like this would otherwise toast constantly.

**Tasks isn't a real item anywhere else in this menu.** Checked — there's no
"Tasks" in Rental Info, Accounting, or any other category. Emma named the one
real spot for it: Services → Calendar → Tasks, which is where it actually
sits in the production menu.

**One content bug found in the source frame, kept as-is.** The "Workflows"
column under Services (Workflow Projects / Workflow Boards / Workflow
Templates) is titled "Online Listing" in the actual Figma frame — the same
title text used in the Rental Info tab, apparently reused without renaming.
Since the rule is to transcribe the real content exactly rather than
silently fix what looks like someone else's mistake, the title stays
"Online Listing" here too. Worth flagging to whoever owns this page in
Figma.

**Icons, harvested, not reused from a similarly-named neighbor.** Four new
icons for the header tabs — Workspace, Dashboard, Administration, Full Menu —
came from RMX Iconography (componentKey per symbol, in `index.html`'s own
icon block). It would have been easy to reach for the Favorites-tile "Admin"
icon (`system-preferences`, a gear) already sitting in `assets/icons-local.svg`
since the label matches, but it's a different Figma component (a
gear-in-hexagon, not the Mega Menu's shield-with-person) — confirmed by
comparing componentKeys before reusing anything. Setup and Reports footer
icons *do* reuse the core sprite's `settings`/`reports` symbols — checked
byte-for-byte against a fresh harvest of the actual footer-link instances
first, and they're identical.

**One deliberate simplification: the sidebar's active-item notch is a plain
CSS triangle, not a harvested shape.** The real frame's active category tab
has a small folded-corner tail bleeding into the content area; that's a
one-off decorative flourish, not a named, reusable RMX component, so it's
approximated with a CSS border-triangle rather than being harvested as if it
were a real icon or component.

**Responsive note.** The frame is a fixed 1384px wide; this screen scales it
to `min(1320px, 96vw)` with the content area's columns wrapping via flexbox
instead of the frame's fixed column positions, and the header's six tabs
wrap to a second line under about 700px of tab-row width. Same deliberate
"the proposal is the site" responsive approach as the rest of this
prototype, not a fixed-width recreation.

## Trued up against the frame's own SVG

Emma sent the frame's SVG export and asked for the UI to match exactly.
Reading measurements and colors straight off it turned up five real
discrepancies in the first pass, all now fixed:

| What | First pass | The frame |
|---|---|---|
| Accent blue | `--text-link` (#008dd5) | **#0071AA** — sidebar text, active row, column-title text and underline |
| Sidebar width | 190px | **200px** |
| Sidebar rows | 40px padded blocks | **28px tall, 12px apart**, 8px top inset |
| Active row | full-width bar, centre-right arrow | **bleeds 12px into the content area**, with a navy notch off its *bottom-right corner* |
| Version text | `--text-disabled` (#b3b3b3) | **#666666** (`--text-primary`) |
| Corner radius | `--radius-sm` (4px) | **8px** |

**The accent blue is genuinely a different blue.** #0071AA is not this
prototype's link blue and not a token in `tokens.css` — it's what the
component actually uses for every blue element in it. Kept as a literal,
scoped to `.megamenu` as `--mm-blue`, rather than snapped to the nearest
existing token, because rounding it to #008dd5 is exactly the kind of
"close enough" that the icons rule exists to prevent. Worth resolving
against Foundations — see item 20 below.

**Columns hug their content.** The frame's five Receivables columns measure
185/198/188/162/170px, each sized to its longest item rather than to a
shared grid; giving them a fixed flex basis wrapped the last column onto a
second row the real menu doesn't have. With content-hugging widths the
Rental Info columns now come out 107/151/119/85/154 against the frame's
107/149/122/87/152 — within a few px of font rendering. The empty space to
the right of the columns is authentic too: Rental Info's five columns end
at x=737 of a 1164px content area in the frame as well.

**No scroll on the sidebar, deliberately.** Seven fixed rows always fit, the
frame has no scrollbar there either, and any `overflow` value on that
element clips both the active row's 12px bleed and its corner notch.

## The menu was unreachable below 600px — fixed

Emma reported not being able to open the menu in a browser at all. It
reproduced immediately at narrow width: `.rmx-appbar__icons { display: none }`
in the phone-width block hid the whole icon cluster, so the hamburger — the
Mega Menu's only entry point — did not exist to click, and clicking where it
should have been did nothing silently (this screen suppresses the
`data-rmx-todo` toast).

That rule predates the menu and was correct when it was written: its own
comment says it drops "the three Command Launch icon buttons, which are the
only things in the bar that lead nowhere in this prototype anyway." Building
the Mega Menu behind the first of those three quietly invalidated it. The
rule now hides only Reports and Favorites, which still lead nowhere, and
keeps the Mega Menu button at every width.

**A stopgap phone layout came with it, and it is a stopgap.** Once the button
was reachable at 338px the desktop layout arrived with its header tabs
clipped, the close button sitting on top of "Workspace", and the 200px
sidebar taking most of a 290px-wide menu. Below 600px the header now stacks
(brand, then tabs full width) and the category list runs as a horizontally
scrolling strip above its content rather than beside it. The active row's
12px bleed and corner notch are dropped there, since both point into a
content area that is no longer to the right. None of this is evidence that
the real component behaves this way — RMX has no responsive variant of the
frame, exactly as with the phone app bar. Desktop rendering is unchanged:
200px sidebar, 211px active row with the notch, five columns in one row.

**Worth taking from this:** a `display: none` justified by "these lead
nowhere" becomes a bug the moment one of them leads somewhere. Worth a look
at the other placeholders that responsive rules currently drop.

## The brand lockup is its own component

Emma pointed at the logo-and-"Menu" lockup: it should match `Admin Menu Logo`
(RMX-Components `YhvzfcXOniQJ7xlC8ONzS4`, node `10135:5172`). The first pass
reached for the app bar's full 175x32 wordmark and scaled it to 20px high,
which was simply the wrong asset — the component uses the **mark on its own,
with no "Rent Manager" wordmark**:

- a 40x40 `Express Icon / Admin Menu` mark, harvested from the component and
  spliced in by script rather than retyped (`#mm-brand`)
- `gap: 20px` — Spacing/lg
- the title in **Web/Heading/L/Regular** (`--type-heading-l-regular`,
  400 24px/32px) at `--text-secondary`

Total renders 120px against the component's 121px. The mark keeps its literal
brand fills rather than `currentColor`, the same as `#rmx-logo` — it's
three-colour artwork, not a monochrome glyph.

## Task Details / History stack when the row is tight

Emma's call: the two tiles in the Task Details modal stack instead of staying
side by side once the width is tight. They now wrap below ~340px per tile,
which is what the Add Link row needs before its controls start truncating.

Driven by the row's own width via `flex-wrap`, not a viewport media query —
this modal is 1200px capped at 94vw, so it's the modal shrinking that should
decide, not the screen. Same reasoning applied one level down: the Add Link
row's type dropdown and search field share a 130px basis, so they sit side by
side while both fit and stack when they don't. Before that, a stacked tile
left the search input 54px wide; it's 162px now. Desktop is unchanged —
566px tiles side by side, both fields in one row.

## The menu is one implementation, used on every screen

Emma: "I can't access the menu on the tasks page, it should always be
clickable." It wasn't there to click — the menu had been built inside
`index.html`, and the tasks screen's hamburger was still a `data-rmx-todo`
placeholder. Copying the menu into the second screen would have made two
copies to keep in step, so it moved out instead: `assets/megamenu.css` and
`assets/megamenu.js`, linked by both pages. Same reasoning as the Task
Details modal, which is one file shown in an iframe rather than two markup
blocks.

`megamenu.js` is self-contained and self-wiring — sprite, markup, the seven
categories and their ~150 items, and an `init()` that injects the overlay and
binds every opener it can find (`[data-rmx-megamenu]`, `#megaMenuBtn`,
`[aria-label="Mega Menu"]`), stripping the placeholder attribute as it goes.
A screen gets the menu by adding two lines and giving its hamburger an id.
Nothing else changed on either page: `index.html` shrank by 22KB and still
measures 200px sidebar, 211px active row, a 12px notch and 5 columns.

Two things the extraction had to get right:

- **Icon ids are `mm-`-prefixed.** The sprite ships inside the shared script
  and lands in whatever screen includes it, so unprefixed names like `#search`
  would have collided with a host screen's own harvested icons.
- **Links resolve from the site root, not the page.** `href="index.html"` is
  correct from `index.html` and wrong from `screens/tasks.html`. The script
  reads its own `document.currentScript.src`, walks up one level, and builds
  every href from that — so Workspace and Tasks both resolve correctly from
  any depth, and on GitHub Pages under `/my-workspace/` as well as at a
  domain root. Verified on the tasks page: Workspace → site root
  `index.html`, Services → Calendar → **Tasks** → `screens/tasks.html`.

Still only Workspace and Tasks navigate, as asked. Every other item is real
content and inert.

## The Add Task bar, trued up against its own component

Emma gave the two states as frames — Tasks Enhancements `4098:74461`
(default) and `3502:96852` (selected) — and the bar was wrong in three ways,
all in the default state:

| | Was | The component says |
|---|---|---|
| Radius | 4px | **8px** |
| Shadow | none | **`dropshadow-xs`**, `0 4px 6px rgba(0,0,0,.04)` |
| "+ Add a task" | `--text-link` blue | **`--text-secondary`** #13314C, icon and label both |

The first two were my doing, and they were argued for in this file: an
earlier conformance pass took the radius down to 4px and stripped the shadow
on the reasoning that RMX is border-led and nothing above 4px belongs on a
control. The reasoning was sound and the conclusion was wrong — this is a
card, not a control, and the component carries both. The design source wins
over an inference from the rules, so both are back and that conformance item
now records the reversal instead of the original claim.

The selected state needed nothing: blue border, 52/52 rows, `#f5f8fa` second
row, the 255x36 date/time field, `#b3b3b3` character count and blue links all
already matched, and are now measured rather than assumed.

## Quick add from the My Workspace tile

Emma's call: the tile's "+" opens a mini Add Task bar between the All/Overdue
filter and the first task, so a task can be added without leaving the page.

**Same component, fewer parts — and this is the deviation to look at.** The
real bar's second row carries a 255px date/time field, the assignee bubbles
and Add Action; that row alone measures 610px and the tile's content box is
534px. Squeezing it in wraps it into something taller than the tasks it sits
above, which defeats the point. So the mini bar keeps what makes it quick —
the icon, the name field, the 50-character count, the two links — and treats
**Add More Details** as the way to reach everything it drops. That link hands
the typed name to the same Task Details modal the task rows open, in new-task
mode (`?embed=1&new=<title>`), where the due date, assignee, action and
checklist all already work. One implementation of the modal, now used three
ways.

Every value is the component's own — 8px radius, `dropshadow-xs`,
`#cedbe7` resting border going `#008dd5` on focus, tertiary second row,
disabled-grey links. The only numbers that aren't are the two row heights,
44px instead of 52px, which is what makes it read as "mini" next to 74px task
rows. **No Figma frame exists for a tile-sized variant of Add Task**, so if
this pattern is worth keeping it wants one — that is the honest status of it.

A task added here lives only on this page, so it deliberately carries no
`data-ws-task-id`: clicking it does nothing rather than asking the Tasks
register to open details for a task it has never heard of.

## Inline checklist items are checklist items, not tasks

Two things were wrong under "Close service tickets", and they had the same
root cause — the inline rows were a separate `children` array that nothing
else could see.

- **Ticking one showed "Task closed successfully".** Nothing was closed; it
  is one item on a checklist. No toast now. The parent row's progress count
  ticking from 0/2 to 1/2 is the feedback, which is both quieter and more
  informative.
- **They didn't appear in the Task Details Checklist tile.** They do now,
  because there is only one array: `task.checklist`. The register draws an
  item as an inline row with initials bubbles, the Checklist tile draws the
  same item as a table row with a name, and both read and write the same
  data — so a tick in either shows up in the other, and the modal's Add /
  Delete reach the register rows too.

Two things that fell out of unifying them:

- **The progress count is counted, not typed.** "Record Park's records" and
  the other-user copy of "Close service tickets" carried hard-coded `0/1` and
  `1/2` labels over empty checklists — a label that could not move and a
  Checklist tile that opened empty. Both now have real items matching their
  counts, and the label is derived, so it moves when you tick something.
- **`SA` is an initials bubble with no user behind it.** It appears three
  times in the register's data and matches nothing in either user list, so
  the Checklist tile's Assigned To column shows "Property Manager, SA" — the
  names that resolve, and the raw initials for the one that doesn't. Left
  visible rather than having a person invented for it. It may just be `AS`
  (Amy Scharffe, a real record) typed backwards, but that is a guess and it
  is Emma's to make.

## The logo is the way home

Emma's call: "on click of the logo it should always take you to the workspace
no matter the page." The app-bar lockup is now a link to My Workspace on both
screens. The anchor is layout-neutral — the mark keeps its 175x32 and
`flex: none` from `rmx.css` — and it is not underlined in either state.

## The tile's task rows: no category Lozenges, a real priority flag

Emma's call: the category Lozenges come off the My Workspace task rows —
Eviction, Make-Ready, Vendor, Reporting, Leasing — and a **High Priority
flag** shows next to the name instead, when the task is saved as high
priority. The row now carries the task, its priority, its linked entity and
when it is due, and nothing else. It reads much quieter, and the one piece of
colour left in it means something.

Two things worth knowing about how it works:

- **The flag is the same glyph the register uses**, lifted from
  `screens/tasks.html` programmatically rather than retyped — 14x16,
  `--icon-error`, now `#flag-priority` in this page's sprite. A task looks the
  same in both places because it is the same geometry.
- **It follows the saved state, not the state at page load.** Open a task from
  the tile, mark it High Priority, save, and the flag appears on the row
  behind you; turn it off and it goes. The framed modal already posted a
  `close` message on every close path, so saving now posts a `saved` message
  alongside it (`id`, `flag`, `title`) and the tile applies it. Nothing polls
  and there is no second copy of the task's state — the frame stays the one
  implementation of the modal.

The "2 overdue" Lozenge on the filter row stays. It is a status Lozenge doing
what Lozenges are for, which is precisely what the category tags were not.

## The Assignee field opens the real dropdown

Emma's call: clicking the Assignee field in Task Details opens the
Users / User Roles dropdown. It was static text — an avatar, "Emma
Langhammer" and a chevron that did nothing.

It now opens the dropdown that already existed for the quick-add bar's Users
Bubbles: the same tabs, search, checkboxes, selected count and clear. Two
changes made that possible without duplicating it — the panel anchors on
whatever opened it (it had assumed a `.user-bubble-wrap` and got `null` from
anywhere else), and it keeps a **separate selection per trigger**, because the
quick-add bar and an open task are two different tasks. Selecting in one no
longer moves the other. The field renders what is selected: avatars plus
names, and italic grey "Unassigned" when nothing is, which is the one thing
italic grey is allowed to mean.

**The field opens on the current user rather than on the task's own
assignees, and that is deliberate.** The register's avatars take initials from
`ROLE_USERS` while this dropdown lists `ASSIGNEE_USERS`, and the two lists
disagree: `CA` is **Charlie Apegian** in one and **Carly Anderson** in the
other, `JC` and `AS` exist only in the first, `AA`, `AB`, `DG` and `TL` only
in the second. Seeding the field from a task would mean choosing which list
wins, and a task assigned to `JC` would either show a name the Users tab
cannot tick or show nothing at all. Both are worse than a visible default. **A
single user list would fix it, and which name `CA` belongs to is Emma's
call** — see also the `SA` bubble noted above, which belongs to neither list.

## Overdue rows are outlined, not filled

Emma's call: "only display red outline not gradient." The tinted gradient
came in with the Claude Design export and it was the loudest thing in the
tile, applied to the rows least in need of decoration — the two overdue tasks
read as a warning banner rather than as two rows in a list. They now keep the
tile surface and carry the error colour in the stroke and the due text only,
which is enough to find them and quiet enough to read past.

The stroke is `--icon-error`, because `tokens.css` has no red border token at
all — the same gap design-system item 12 reports for `Border/border-success`
and `Border/border-notice`. Using an icon token for a border is not right; it
is the only red available.

## Make-readys are Issues

Emma's correction: "make-ready's don't exist they're just issues." The word
was sitting in two record-shaped slots and both are wrong:

- The Diego Alvarez mention read **"Make-Ready · Riverview #204"**, in the
  same slot where the other three mentions name a real record type — Tenant,
  Vendor, Owner Prospect. It reads "Issue" now. Its message said "before I
  close this **WO**", which is the same mistake spelled differently, so that
  is "before I close this issue".
- A task's Workflow Project column read **"Make-Ready"**; it is now "Unit
  Renovation", a project name already in the register's data, so nothing new
  was invented to fill the gap.

The Mega Menu's **Make Ready Templates** and **Make Ready Board** are left
exactly as they are. Those came from the real Services frame and are real
menu items — the product area exists, and it is the *record type* that does
not. The category Lozenge that read "Make-Ready" is already gone, removed
with the rest of them in the round above.

## Due dates are dates, not phrases

Emma's call: the tile's due column shows the actual due date and time in the
register's own format — `09/08/25 09:00 AM` — rather than "2 days late",
"Yesterday", "Fri" or "Next week". The tile is a preview of the Tasks
register, so the same task has to read the same in both places; a relative
phrase also quietly rots, because "Fri" stops being true the moment anyone
opens the prototype on a different day.

Every value is copied from that task's own record in `screens/tasks.html`, so
the two screens cannot disagree, and a task added from the mini bar gets the
same default the register gives a new task (`09/17/25 11:00 AM`). Overdue
rows still colour the date, which is what the register's Due Date column
does.

Making the tile honest turned up the same bug inside the Task Details modal:
its **Due Date and Time fields were hard-coded** to `09/17/25` and
`11:00 AM`, so a task due the 8th opened claiming it was due the 17th. They
read from the task now. It is the same shape of defect as the Assignee field
noted above — a static field that looked filled in — and worth watching for
in the rest of that form.

## The signed-in user is Tony, everywhere

Emma's call: "any task opened from the my tasks should be assigned to tony."
The Assignee field read "Emma Langhammer" for every task — Emma is the
designer, not the persona. Tony Little is the signed-in user on every other
piece of this prototype: the app bar's `TL` avatar, "Good morning, Tony", all
four `@Tony` mentions, and the six My Workspace tasks, which already said
`TL`. `EL` had crept in as a stand-in on the later-authored register rows.

So Tony now owns what is his: the seven My Tasks rows that said `EL`, the
"claimed task" history entry, the checklist items on his own tasks, the
quick-add bar's default assignee, and a brand-new task. Emma Langhammer stays
in the user list as a real person you can assign things to — she just no
longer stands in for whoever is logged in.

Other Users' Tasks are by definition **not** Tony's, so they open with the
italic "Unassigned" placeholder rather than a name. That field still cannot
say whose they are, for the reason recorded above: `CA` is Charlie Apegian in
`ASSIGNEE_USERS` and Carly Anderson in `ROLE_USERS`, and the register draws
its avatars from the second list while the dropdown lists the first. One user
list fixes it and it needs Emma's answer on `CA`.

## Task rows: lighter type, and only real links

Three of Emma's calls, all pushing the same direction — the rows had more
emphasis than their content deserved.

- **Task names are regular weight**, not SemiBold. With the category
  Lozenges gone there is less competing for attention, and a list of bold
  titles reads as a list of headings.
- **Due dates are regular weight** too.
- **The free-text context line is gone.** Emma, pointing at "Duplicate charge
  on statement": "why is this displaying". Because it was flavour text from
  the original export, and her earlier rule — remove the meta line when there
  is no linked entity — already covered it; the previous round only took out
  the stray Lozenge and left the note. Two rows have no linked record and now
  show nothing: "Return Marcia Clark's call" and "Review May rent roll
  variance".
- The third note, "Lease ends in 32 days", turned out to be hiding a real
  link: the register's Link column for that task says **Tomas Webber**. The
  tile shows `Tenant Tomas Webber` now, and the register gained the typed link
  record it was missing — its Link column had a value while its Links tile
  opened empty.

## The mini Add Task bar gets the rest of the controls

Emma, revisiting the reduced version: "this should still have the same date,
assigned to, and action selector I think as the regular quick add task." Fair
— the argument for dropping them was that they do not fit, and that is a
layout problem, not a reason to remove function.

They are all there now, at the component's own values: the 255x36 date/time
field with its two 28px icon cells, the assignee bubble (Tony), and Add
Action. The row wraps rather than squeezing — controls on one line, the two
links on the next when the tile is too narrow for both, which is the same
container-driven wrap the Add Link row and the Task Details tile pair use.

Clicking the date, the assignee or Add Action opens the full Task Details
form with whatever has been typed so far. Those three fields are only really
editable there, and porting their three floating panels onto My Workspace
would mean a second copy of each; this is the same handoff "Add More Details"
already makes, through the same code path. A control that leads somewhere it
can actually be set beats one that looks live and is not.

## Select an Action is the real New Action UI

Emma: "make the select an action follow this UI exactly" — Tasks Enhancements
`4465:114954`, the `New Action UI` component and its four variants. What was
there was a "Select an Action ▾" text link over a narrow 231px menu. What the
component actually is:

1. **Add Action** — the card with a `+ Add Action` link.
2. **The Action field** — the same card, now a row: a labelled dropdown
   (`#f5f8fa`, 36px, 4px radius) and a blue X that abandons it.
3. **That field open** — the field's border goes `#008dd5` and the panel
   opens **as wide as the field**, not as a narrow menu; the frame's is 1088px
   under a 1088px input. It has a search field ("Search actions", italic
   placeholder) the old menu had no equivalent of.
4. **Selected** — "Action / *Send Email* / ✕", a rule, then the detail fields.

The middle state is the interesting one: the old link had no way to represent
"the field is on screen with nothing chosen in it yet", so that step did not
exist. Three smaller corrections came out of reading the frame:

- **The list is navy, not blue.** The frame uses `text-link` in exactly four
  places and none of them is in this list; group names are 14px SemiBold navy
  and items 14px Regular navy, both `p-8px` with a 20px leading slot. An
  item's slot is empty, which is what indents it under its group.
- **Group headers collapse.** They carry a chevron, which is the only thing a
  chevron on a header can mean; it did nothing before. A search reaches into
  collapsed groups, and groups with no match hide entirely.
- **Three labels were wrong.** "Publish Signable Document" is plural in the
  frame, and Communication is alphabetical there but was not here. In the
  View group, "View Customers" and "View Service Tickets" are **View
  Tenants** and **View Issues** — the same vocabulary correction Emma made
  about make-readys, found independently in the design.

## 72px page gutter

Emma's call: 72px beside the welcome band and the tile grid, up from 64px.
Worth flagging that **72 is off the spacing scale** — Foundations runs 40
(3xl), 48 (4xl), 64 (6xl), 80 (8xl), with nothing between 64 and 80. It is
declared as a literal rather than dressed up in a `var()` that would look
official, and it is item 24 below.

## History / Notes, opened from a mention

Emma's call, 2026-09-10: "on click of each line display the history notes of
the specific entity (issue, tenant, etc.)", "I want each note to be
accessible and to be able to add a new note" — built from two frames in
RMX-Pages and nothing else, `4628:44305` (History Notes Overlay) and
`3779:60444` (Note Details Dialog).

**It is an overlay, not a page.** I built it as a screen first and Emma
corrected it: "the history notes is an overlay on the workspace not a page."
So it lives in `assets/history-notes.css` + `assets/history-notes.js` — one
self-contained, self-injecting overlay that any screen picks up with two
lines and opens with `RMXHistory.open('<record key>')`. Same arrangement as
the Mega Menu, and it means there is no second copy of it and no navigation
away from the workspace. The standalone screen I had written was deleted
rather than left lying around.

Two rules that file lives by, because a host screen includes it:

- **Nothing may be styled outside the overlay.** No bare `body`, `*` or `a`
  rules — they would restyle My Workspace. Every reset is scoped.
- **Every class and glyph id is `hn-`prefixed.** The markup lands in a page
  that has its own `.btn`, `.toast` and `.chkbox`, and its own `call` and
  `mail` icons.

What each mention opens: the Diego Alvarez mention is about an **Issue**
(Riverview #204's carpet), Karen Hsu's is about a **Tenant**, Anthony Park's
a **Vendor**, Sally Klydon's an **Owner Prospect**. Each has a Scoreboard,
its own notes, and every note is clickable — the row or its kebab opens Note
Details, and **Add** opens the same dialog empty. There is no separate "new
note" form.

The register's filters are real, not decoration: Search, Users, History
Category and Type all filter (their options are built from the notes'
own data), the date range accepts typed `mm/dd/yy`, and "Only Notes with
Attachments" works. **Unit Notes** and **Print** are the two that don't, and
they carry `data-rmx-todo` — Unit Notes is a scoping rule this prototype has
no second scope to model.

### The @ tag

Emma sent a screenshot of the real product for this: **an outlined pill
carrying the person's name with no "@" left showing — orange when you tag
yourself, blue when you tag anyone else.** So the Note field is
`contenteditable` rather than a `<textarea>`, because the chips live inside
it the way they do in the product: type `@`, the user list opens, typing
filters it, arrow keys move through it, Enter or a click inserts a chip and
the caret carries on after it.

A note is still stored as plain text with `@Name` in it, so the same tag
renders as the same chip in the field, in the register's Note column and in
the data. That is deliberate, and it is where the real product currently
slips: its register prints the raw token — `@u:53(Izzy Geza)Izzy Geza test`
— in the Note column, showing the internal form next to the display name.
Worth raising with engineering; it is item 25 below.

### Faked, and worth knowing

- **The Scoreboard only carries a status Lozenge and a Balance for the
  tenant**, because that is the only entity type the frame documents. An
  Issue's status and a prospect's stage would both need Lozenge copy and a
  state the library does not define, so those Scoreboards carry just the
  record and its links rather than inventing a sixth Lozenge state. Emma's
  reference screenshot shows a second real one — a **Future** tenant on an
  amber Lozenge — which suggests the tenant states at least are a known set
  worth harvesting.
- **Upload and Paste both attach the frame's own example file.** There is no
  file picker in a prototype, and a dropzone that does nothing when you click
  it is worse than one that shows you the result.
- **Follow-up is disabled until its checkbox is ticked**, which is what the
  frame draws — `border-disabled` hairlines, the greyed field, and the button
  in `brand-primary-disabled`.
- **Notes reset each time the overlay opens.** There is nothing to persist
  them to, and a half-finished edit surviving into the next sitting would
  read as a bug rather than a feature.

### Two things this round taught me

- **The icon-font trap is real.** The overlay first landed on My Workspace
  with its glyphs rendered as the literal words `keyboard_arrow_down`,
  `add_circle`, `print` — because it used Material Symbols by ligature and My
  Workspace, unlike the Tasks screen, does not load that font. Exactly the
  failure the skill warns about. All 22 glyphs are harvested SVG symbols now:
  14 from `assets/icons.svg`, and 8 pulled from the two frames' own exports —
  `reorder`, `cloud_upload`, `rmx-paste`, and the five Scoreboard glyphs,
  two of which (`properties`, `units`) are Express icons the core sheet does
  not carry. Extracted programmatically, never redrawn.
- **A floating panel appended to `<body>` is a sibling of the overlay, not a
  child.** The filter menus and the @ list were rendering *behind* the thing
  that opened them until the stack was set deliberately: overlay 520, Note
  dialog 540, menus 560, toast 580.

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
    coloured from tokens alone today. **There is no red border either** —
    an outlined overdue row has to reach for `--icon-error`, an icon token, to
    get a stroke. If `Border/border-error` exists in Foundations it belongs in
    the stylesheet with the other two; if it does not, it is worth adding,
    because outlining something as wrong is a common need.
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
19. **A copy-paste title bug in the Mega Menu frame (RMX-Pages, node
    `4077:83115`).** Services' "Workflows" column (Workflow Projects /
    Workflow Boards / Workflow Templates) is titled "Online Listing" —
    the same title used one tab over, in Rental Info, for its actual Online
    Listing column. Kept as-is here rather than silently corrected, per the
    "transcribe exactly, flag what looks wrong" rule — see "The Mega Menu,
    built in full" above.
20. **The Mega Menu's accent blue is #0071AA, which is not a Foundations
    token.** Every blue element in that component — sidebar item text, the
    active row's fill, column-title text and its underline — uses #0071AA,
    read off the frame's own SVG export. `tokens.css` has #008dd5 for
    `--text-link` / `--border-secondary` / `--icon-brand`, and nothing at
    #0071AA. So either the component is off-token, or Foundations is missing
    a darker brand blue that the component is correctly using. This screen
    keeps #0071AA as a local `--mm-blue` rather than rounding to #008dd5,
    but it should be one or the other, not both. Emma's call.

21. **`tokens.css` carries no shadows at all**, though Foundations names at
    least four effect styles (`dropshadow-xs`, `-sm`, `-md`, `-lg`) and real
    components depend on them: `dropshadow-md` on Tile Style=Workspace,
    `dropshadow-xs` on Add Task. Both screens here declare the ones they need
    locally, which means two prototypes could easily disagree about what
    `dropshadow-md` is. They belong in the stylesheet next to the colours.
22. **The `Add Task` card is 8px with a shadow, which the audit rejects.**
    Same collision as item 1, from the other direction: `scripts/audit.mjs`
    errors on any radius >= 8 outside Orion and the skill's own Visual DNA
    rule 3 reads as "borders, not shadows", but the real component
    (`4098:74461`) is 8px *and* carries `dropshadow-xs`. A card is not a
    control and the rules currently give no way to say so. Worth resolving
    together with item 1.
23. **There is no tile-sized variant of `Add Task`.** Its second row is 610px
    of controls, which does not fit any Workspace Tile (534px of content box),
    so putting quick-add inside a tile — which Emma asked for, and which is
    the natural place for it — currently means composing a reduced version by
    hand. If quick-add-from-a-tile is a real pattern, the component wants a
    compact variant so every prototype reduces it the same way.
24. **The page gutter Emma wants is 72px, which is not on the spacing scale.**
    Foundations goes 40 (3xl), 48 (4xl), 64 (6xl), 80 (8xl) — nothing between
    64 and 80, and 72 is a natural gutter width for a two-column page at this
    density. Either the scale wants a step there, or the gutter should snap to
    64 or 80. This prototype declares 72 as a literal so the gap stays
    visible; it should not become a habit across prototypes.
25. **The real product prints a note's raw mention token in the register.**
    Emma's reference screenshot of History / Notes shows the Note column
    reading `@u:53(Izzy Geza)Izzy Geza test` and
    `@u:121(Emma Langhammer)Emma Langhammer reminder to add this tenants
    details later` — the internal `@u:<id>(Name)` form rendered next to the
    display name instead of being resolved to the chip the Note field shows.
    An implementation bug rather than a design question, and worth passing to
    engineering. This prototype renders the chip in both places.
26. **`Lozenge` has no documented state set for record statuses.** The
    History / Notes Scoreboard shows a tenant as **Current** (green) in the
    frame and **Future** (amber) in Emma's screenshot of the product, so
    there is clearly a real set — but `data/components.json` records only the
    five semantic states, so an Issue's status or a prospect's stage cannot be
    drawn without inventing copy and a colour. Those Scoreboards here carry
    no Lozenge at all rather than guess. If record statuses are a pattern,
    they want either named states or a documented mapping.
