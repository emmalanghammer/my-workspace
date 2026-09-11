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

## Overdue rows, reversed again — and three small corrections

Emma's calls, all 2026-09-10, all on the My Tasks tile:

- **Overdue rows are filled, not outlined.** "Instead of red outline,
  display light red background fill on overdue tasks" — so the red stroke
  from the round above is gone and the row carries
  `--component-lozenge-error` (#fbd6d8), the error Lozenge's own tint and the
  light red the palette actually has. Flat, not the diagonal gradient the
  original export used. The border is back to the same `--border-disabled`
  every other row carries, so the fill does the work on its own. This
  supersedes "Overdue rows are outlined, not filled" below; the intermediate
  step is what took the gradient off, and the fill came back deliberately.
- **Overdue tasks are always at the top.** A task added from the mini bar was
  landing above them, which put the two things most in need of attention
  third and fourth. It is a stable partition rather than a sort, so the order
  inside each group is untouched — the overdue two keep their oldest-first
  order and everything else keeps the order it arrived in. Runs on load too,
  in case the authored markup ever drifts.
- **A regular due date is `--text-primary`, not `--text-disabled`.** A due
  date is real information; disabled grey reads as "not applicable". Overdue
  rows still override it with `--text-error`.
- **The overdue fill is 50% of the lightest red Foundations has.** Emma asked
  for it lighter still, and `#fbd6d8` (`--component-lozenge-error`) is the
  lightest red the library carries — so rather than invent a hex, this thins
  the real token over the tile surface: `color-mix(in srgb,
  var(--component-lozenge-error) 50%, var(--background-tile))`, which computes
  to **#fdeaec**. The token itself is the fallback for anything without
  `color-mix()`. See design-system item 27.
- **The task row shows a pointer.** It opens the task's details and did not
  say so. Swept the rest of the tile at the same time — the mentions, the
  icon buttons, the checkbox, the quick-add controls and the carousel dots
  all already had one; the row was the only gap.
- **The Toggle Switch's selected segment now rounds at the group's corners.**
  Its blue ring is an inset `box-shadow`, drawn on the button's own square
  box, so at the group's rounded corners it ran into the curve and got sliced
  off — which is what looked wrong. Each end segment carries the matching
  outer radius now, so the ring follows the curve instead of being clipped
  by it.

## People or roles, never both

Emma's call, 2026-09-11: a task can go to several users, or to several roles,
but not to a mix. Picking one kind when the other is already selected now
switches the assignment rather than adding to it — four people, then a role,
leaves just the role; two roles is fine; then a person, and the roles give
way. The list's ticks clear as it happens, which is the feedback, and nothing
is kept behind the scenes to reappear later.

Both pickers share the rule, because they share the function — the Task
Details Assignee field and the quick-add bar's Users Bubbles. Checked the
existing data too: no task was already carrying a mixed assignment.

## Two small ones

**A toast replaces the one before it.** Emma's call, 2026-09-11: clearing a
list fired one toast per task and six stacked up over the welcome band. The
shared `assets/app.js` now shows the most recent and drops the rest, with the
dismiss timer re-armed each call. This is a change to the skill's own
foundation file rather than to this prototype, so it is worth Emma deciding
whether it belongs upstream — every prototype built from the skill stacks
toasts today.

**Input value text is navy, not grey.** `--text-secondary` inside any
input-shaped control, which is what the real Input Field draws; grey belongs
to the label beside it, not the value inside it. Applied to every field on the
screen rather than the one Emma caught — Action detail fields, due date and
time, Reminder, Assignee, Display, Saved Filters and the whole Quick Filters
panel. Placeholders stay italic `--text-disabled`, and a disabled field still
greys out: checked after the change, values navy, labels grey, the disabled
Add Link search still `#b3b3b3` on `#f2f2f2`.

## Other Users' Tasks opens with Quick Filters

Built from Tasks Enhancements `3502:93452` / `3703:121005`, Emma's call,
2026-09-11. The "Show Quick Filters" link used to only swap its own label —
there was no panel behind it. There is now, and Other Users' Tasks opens with
it showing, because choosing whose tasks you are looking at is the first thing
you do there.

**Assigned To is what drives who shows.** It is the Select Other Users picker
worn as an input — one implementation — and the field reports what it holds
("1 Selected", "All Selected"). Picking Chris cuts the register to his one
task. That replaces the old behaviour where the tab shoved the picker overlay
in your face before you had seen anything; the picker is still there, reached
when you want it.

**Filters are staged, not live.** The panel has Apply and Reset, so choices
sit until you commit them — which is what those buttons mean. Verified:
staging High Priority leaves the list alone until Apply, then empties it
correctly, and Reset restores all ten. The one exception is Assigned To, which
applies when you Save inside its own picker, because that Save is itself a
commit.

What is real: **Assigned To**, **Show Checklist Items** (expands every
checklist inline, 4 child rows to 7), **Workflow Project** (options built from
the tasks' own values), **High Priority**, and **Reset**. Marked not-built,
with reasons: Property/Owner and Group, Created By (nothing records it),
Linked To, and the relative Due Date.

**Closed Tasks is the interesting one.** In the product a closed task drops
out of the register until you ask for it. Here a task you tick stays put,
struck through, which is what makes ticking one legible in a demo — and
implementing the filter quietly took My Tasks from ten rows to nine by hiding
the completed one. It is left as the one checkbox honestly not built, rather
than breaking the ten Emma just asked for.

## Scene 5 — clear the list, then claim what's left

Emma's scene, 2026-09-11. Tony works his My Tasks tile down to nothing, and
the tile then offers him what he is eligible to pick up.

**The role queue only surfaces when there is nothing of his own left open.**
That is the whole idea: while he has work, the tile is a to-do list; once he
hasn't, it becomes the place that offers him the next thing. It stays hidden
under the Overdue filter too, where an unassigned task has no business being.

**Claim works from the tile**, with no trip to the register — the task moves
into My Tasks in place, keeping its due date and its context, and the queue
hides again because he now has something open. Verified: six open → tick them
all → open 0 and the queue appears → Claim → open 1, the task in the list at
09/15/26 05:00 PM against "All properties", one card left in the queue.

A claim row has no checkbox — it is not his to tick yet — so it drops the
checkbox column and ends in the Claim button, which is the same button the
register uses so the action reads identically in both places.

**This lives on the tile only.** The register's ten tasks are untouched;
Claim is already demonstrable there on "Record Park's records". Keeping the
queue local to My Workspace is what stops the tile and the register
disagreeing about how many tasks Tony has.

## My Tasks is ten tasks

Emma's call, 2026-09-11. It had grown to seventeen, which made every scene a
scroll. Ten now, and each earns its place:

- the **six the My Workspace tile mirrors**, including the two overdue ones
  that tile counts — cutting any of them would make the tile and the register
  disagree;
- **New Vendor Onboarding**, scene 2;
- **Approve Daniel for Pet**, the one task carrying a template checklist,
  links and history;
- **Record Park's records**, held by a role, so Claim is reachable from My
  Tasks and not only from the other tab;
- **Upload receipts for property expenses**, already complete, so the done
  state is visible somewhere.

Two overdue, as before, and both are the tile's pair.

## A checklist item belongs to a person

Emma's call: user roles cannot be assigned to checklist items. A task can sit
with Accounting or the Property Manager, but a step inside it is somebody's
job. "Close all tickets" was the only item breaking that — it named two roles
— and it now names two people.

## Scene 4 — oversight, down to the checklist item

Emma's scene, 2026-09-11: Tony checks Other Users' Tasks, sees which specific
checklist item is stalled and who owns it, and leaves a note tagging that
person.

**The same vendor onboarding process, seen from the outside.** A second copy
lives in `otherTasks`, in flight: Tony found the vendor on the 5th, Dave
created the account on the 8th, and Chris's step has sat since — the task is
his, 2/4, and overdue. Its checklist is expanded inline, so the stalled item
and its owner are readable straight off the register without opening
anything, which is the whole point of the scene.

**Checklist rows carry their own date** now — a completed item shows when it
was done, an open one shows when it was due, in red. That is what makes "three
days after Dave created the vendor" something you can see rather than
something the presenter has to assert.

**Add Note opens the real History / Notes overlay**, pointed at the task
instead of a tenant or an issue. It was an unwired link in the tile header.
Tony types `@chris`, gets a blue chip (he is tagging someone else), saves, and
the note comes back onto the task and into the modal's own History tile —
`onChange` reports every write to the host, so the overlay and the tile cannot
disagree about what has been written.

Three things had to be fixed to get there:

- **The Select Other Users overlay was decorative.** You picked people and
  then saw every other user's tasks regardless. It filters now — a task shows
  if any of its assignees was picked, so a role-held task shows for whoever
  picked that role. The totals line counts what is shown.
- **The overlay kept its own list of people**, so Chris — who exists on the
  Tasks page — could not be tagged. A host screen now passes its own list in
  on the record and it wins. That is the same two-lists bug as before, one
  layer up, and worth watching for wherever a shared asset holds data of its
  own.
- **The History tile was broken by the assignee-key refactor**: it still read
  `.initials` off what had become a key string, so every avatar in it rendered
  blank. Fixed.

## Scene 3 — creating a task and handing it to a role

Emma's scene, 2026-09-11: Tony creates a task for Owner Klydon's W-9, gives it
a category and a due date, assigns it to **Accounting** rather than a person,
links it to the owner, and saves it into the shared queue. Four things had to
become real for that walkthrough to hold up.

- **Accounting is a role.** Added to `ROLES` and offered in the dropdown's
  User Roles tab. It is deliberately *not* in `MY_ROLES` — Tony is handing the
  task away, so Claim must not appear on it afterwards, and it doesn't.
- **Owner is a link type.** `Tenant / Unit / Property / Owner / Vendor` now,
  with Sally Klydon among the owner records — the same Sally Klydon the
  mentions tile links to, so the record reads the same wherever you meet it.
  Typing "kly" finds her.
- **Display is a real category picker.** It was static text with a navy
  swatch. It now offers five categories and sets the task's colour bar in the
  register, using the four colours `colorBarHTML` already allows rather than a
  new palette.
- **The due date and time open the real pickers.** The Task Details overlay
  adopted `assets/datetime.{css,js}`, which is what that shared file was for —
  the calendar in the overlay is the same RMX Date Picker as the one on the My
  Workspace quick-add bar. A new task defaults to today an hour from now, the
  same as the quick-add bar.

**The Link column and the Links tile are one thing now.** Linking a record in
the overlay put it in the tile but left the register's Link column empty,
because they were separate fields — the same split the checklist had. The
column reads the `links` array where a task has one, shows the first with a
`+N` for the rest, and falls back to the older free-text `link` otherwise, so
no existing row moved.

Everything the overlay edits now actually saves: due date, time, category and
assignees were all being dropped on save before this pass.

## New Vendor Onboarding — a task that hands itself on

A demo scene of Emma's, 2026-09-11. "New Vendor Onboarding" is an internal
process task whose four checklist items each belong to a different person:

| | |
|---|---|
| Find new preferred vendor for services | Tony Little |
| Create vendor account in system | Dave Hegemann |
| Send new vendor agreement & W-9 | Chris Griesinger |
| Confirm COI, W-9, & payment method are on file | Ali Ferryman |

**The task follows its checklist.** Whoever owns the first item still open
owns the task, recomputed on every tick — so Tony ticking his own item leaves
the task assigned to Dave, without Tony touching the Assignee field. It is
symmetrical: unticking hands it back. Verified end to end — Tony → Dave →
Chris → Ali as each item is ticked, back to Tony when the first is unticked,
and the register agrees after a save (the row's avatar goes TL → DH and the
progress count 0/4 → 1/4).

This is general, not scripted for one task: any checklist whose items carry
their own assignees behaves this way, and tasks whose items carry none are
untouched. Saving now persists `assigned` too, which it did not before — the
Assignee field became editable a round ago and its changes were being dropped.

Dave Hegemann, Chris Griesinger and Ali Ferryman are new people in `USERS`.
Nothing in the UI explains the hand-off; that belongs to whoever is
presenting it.

## Claim, and one list of who exists

Three of Emma's calls on 2026-09-11, and together they finally settle the
two-user-list problem this file has been flagging since the Assignee field
was built.

**Tasks reference a key now, never a pair of initials.** The old data stored
`av('CA','blue')` and left the reader to work out which `CA` that was — and
the two lists disagreed: `ASSIGNEE_USERS` said Charlie Apegian,
`ROLE_USERS` said Carly Anderson. Keys make the question disappear. Two
people are *allowed* to share initials, and both of those now sit in one
`USERS` list showing `CA`, because the record says which is which. The old
"Roles" list — three real roles plus five people wearing a role's clothes —
is now `ROLES`, three roles and the unnamed one below.

**Claim is derived, not authored.** It used to be a hand-set `claim: true` on
three tasks. It now appears on any task held by a role Tony is in, which is
exactly the tasks showing an orange bubble — verified: the set of rows with a
Claim button and the set with an orange avatar are identical, four rows.
Clicking it hands the task to Tony: the role that was holding it comes off,
anyone else on it stays, and the button goes with it.

**The Assignee field shows what the register shows.** It could not before, for
the `CA` reason; it can now. A task on a role reads "Property Manager" with
an orange bubble, a task on two people reads both their names. **Users and
User Roles are two lists over one selection**, so switching tabs changes what
you are choosing from without losing what you have already chosen — picking a
role, switching to Users and picking a person leaves all three on the task.

**One thing needs your answer:** `SA`. It is an orange bubble on four tasks
and matches no role anyone has written down. It is carried as a role named
"SA" — visible in the Roles tab, claimable like any other — rather than
folded into Property Manager, because guessing what it stands for is exactly
the kind of quiet invention that makes a prototype wrong in a way nobody
catches. Item 30.

## Real date and time pickers on the quick-add bar

Emma's call, 2026-09-11: default the due date to today an hour later, and open
a picker from each field.

**The default is exact.** Today's date, and the time an hour from now — not
rounded to a tidy quarter hour, because "an hour later" means an hour later.
It recomputes every time the bar is opened rather than at page load, so a tab
left sitting all morning still offers an hour from *now*.

**The calendar is the real component**, not a hand-drawn grid: RMX Components
`Date Picker`, `Style=Calendar` (157:2396), transcribed down to its 288px
width, the 32px day cell with 8px padding, the alternating row ground on
`--component/input-default`, the selected day as a 32x36 `--container/secondary`
block at `--radius/xs`, and the Today / Clear footer under a 272px divider.
That striping is worth a note: RMX registers are never striped, and this grid
is, because the component itself is.

**The time list is not a component, because there isn't one.** The Date & Time
page carries Date Pickers and their sub-parts and nothing else — no Time
Picker at any size. Rather than invent one, the time field uses the documented
dropdown pattern: an input-shaped trigger and a floating white panel, 96
entries at quarter-hour steps, scrolled to the nearest one on open. Raised as
item 29.

Both live in `assets/datetime.{css,js}`, self-injecting and `dt-`prefixed, so
any screen picks them up with two lines and opens them against any element:

    RMXDateTime.openDate(anchor, { value: '09/11/26', onPick: fn })
    RMXDateTime.openTime(anchor, { value: '09:25 AM', onPick: fn })

A picker is the bar's own UI even though it is appended to `<body>`, so the
quick-add bar's click-outside handler ignores clicks inside one — without
that, choosing a time closed the bar you were filling in. Emma's call,
2026-09-11. Clicking genuinely away still closes an empty bar.

They reuse the clamp-and-flip placement from the Tasks screen, so a picker
near the bottom of the window flips above its field instead of running off the
edge. **The Task Details due date, the Tasks page's own quick-add bar and Note
Details' Start Date and Time are all still plain text** — they can each adopt
this with one call, and should, but that is a separate pass rather than
something to fold in silently.

Verified end to end: picking 09/18/26 and 02:30 PM put "09/18/26 02:30 PM" on
the task that was then added, and reopening the bar reset the fields to an
hour from the current minute.

## Floating panels stay inside the viewport

Emma: "the scroll for the assigned to dropdown is getting cut off, I need to
be able to scroll through all of the users." The list itself was already
scrollable — the problem was one level up. Every floating panel on this screen
is `position: fixed`, so once one runs past the bottom of the viewport the
overflowing part is simply unreachable: you cannot scroll to it, because the
page scrolls underneath it. `positionPanel` had been placing every panel at
`anchor.bottom + 6` with no vertical clamp at all, and the Assignee field sits
low enough in a scrolled modal to push a ~420px panel off the bottom.

It now measures the panel at its natural height, puts it below the anchor if
it fits, **flips it above when there is more room that way**, and caps its
height to whatever room it ends up with so the contents scroll instead of
spilling. The cap is only applied when the panel is genuinely taller than the
space, so the stylesheet's own `max-height` still governs when there is room.
The Assignee dropdown became a flex column for this: its tabs, search row and
footer hold their height and the list is the part that gives, so a squeezed
panel still shows you its tabs and its clear link.

Measured at three viewport heights, with the field deliberately low:

| Viewport | Where it went | Inside the viewport | All 7 users reachable |
|---|---|---|---|
| 700px, field low | flipped **above** | yes | yes — list scrolls 343px in 245px |
| 700px, field high | below | yes | yes |
| 480px | above, capped to 206px | yes, tabs and footer both visible | yes — 343px in a 60px box |

This fixed every panel on the screen, not just this one — the Actions
dropdown, the row kebab, the link results and the checklist menus all go
through the same function.

## The row hover is dropshadow-sm — and the shadows were all wrong

Emma's call: make the task-row hover less aggressive and use `dropshadow-sm`
from Foundations. Going to fetch it turned up something bigger.

`dropshadow-sm` is real, and its description is exactly the intent — "Used
for subtle separation". But **every shadow this prototype carried was an
approximation**, and each was missing layers:

| | Was | Actually |
|---|---|---|
| `dropshadow-sm` | 2 layers | **3** |
| `dropshadow-md` | a different shape entirely (4 layers, closer to lg) | **3** |
| `dropshadow-lg` | 2 layers | **4** |

The real definitions are now in all three stylesheets, read straight off the
Foundations styles rather than off an instance or the skill's cache.
`importStyleByKeyAsync` is blocked in read-only mode, so the route was
`getStyleByIdAsync` against the nodes that carry each style on the Components
file's "Cards & Tiles" page — the same workaround the Mega Menu build needed
for `importComponentByKeyAsync`. Figma's shadow radius is the CSS blur and its
spread the CSS spread; the colour is `#4C4C4C` at every level.

The hover itself: it had been an invented shadow *heavier* than the tile's
own, so a row appeared to float above the card containing it — which is
what read as aggressive. It is `dropshadow-sm` now, and the tile picked up
the corrected `dropshadow-md` in the same pass.

## Add Link's search field: no placeholder, and it looks disabled

Emma's call: remove the placeholder and keep the field disabled until a type
is chosen. It *was* already unusable before a type was picked — it just did
not look it, because only the inner `<input>` carried the attribute while the
wrapper stayed white. The whole field now takes the `.disabled` treatment
(`--background-disabled` ground, disabled-grey icon and text) and drops both
placeholders — the "Choose a type first" prompt and the "Find a tenant" one
that replaced it. An `aria-label` carries what the placeholder used to say,
so the field is still named for a screen reader.

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

They are there at the component's own values: the 255x36 date/time field with
its two 28px icon cells, and Add Action. The assignee bubble was there too
until Emma removed it — see below. The row wraps rather than squeezing — controls on one line, the two
links on the next when the tile is too narrow for both, which is the same
container-driven wrap the Add Link row and the Task Details tile pair use.

**No assignee control.** Emma's call, 2026-09-10: "remove the user here since
it's only my tasks." The full bar carries assignee bubbles because it sits
above a register that shows everyone's tasks; this one sits in the My Tasks
tile, so a task added here is the signed-in user's by definition and a picker
would only invite you to contradict the tile you are standing in.

Clicking the date or Add Action opens the full Task Details form with whatever
has been typed so far. Those three fields are only really
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

**Who you can tag is per record.** Emma's call: "include any users who have
added notes as users available to @ tag in a note." The list is the seven
users plus anyone who has written a note on the record you are looking at, so
Karen Hsu is taggable on Marcia Clark's history, Diego Alvarez on the Issue,
Sally Klydon on the prospect — none of whom is in `ASSIGNEE_USERS`. It reads
oddly to get a note from someone you cannot reply to. Derived entries show a
name and initials but no username, because the note record gives us a name
and not a login.

The Note field carries no placeholder — Emma's call, 2026-09-10, and it
matches the real product, whose Note field is empty too. Nothing on screen
advertises that `@` works, which is how it ships.

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

### Task Details tile: 16px between its field groups

Emma's call: 16px between Links, Description, Display and Attachments. They
had been relying on each label's own 6px bottom margin, which left the four
groups crowded and unevenly spaced — the gap between a field and the next
label was whatever the previous control happened to leave. The tile body is a
16px-gap column now, which is the same step the Note Details dialog's content
uses, so the two forms space their fields identically.

### One size, whatever record it opens

Emma's call: "the history/notes overlay should be the same height and width
across different ones, and the register inside should fill the height." A
record with two notes and one with forty are now the same shape — the overlay
fills the viewport less its 24px margin, capped at the frame's own 1561px, and
the register takes up the slack rather than the overlay shrinking to fit its
contents. Measured across all four records at 1440x900: same width (1392),
same height (852), same Scoreboard height (64) and **the same register height
(526)**, with the rows sitting at the top and the empty area below them white,
which is what the real product does.

What makes it work is a chain of `flex: 1` + `min-height: 0` from the overlay
down to the register, so the register scrolls inside a fixed frame instead of
stretching it, and everything above it (header, Scoreboard, filters, the
Add/Print row) is `flex: none` so a long list cannot squeeze them. The
register's header is sticky now, since its rows scroll.

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

## Claim, from inside the task as well as the register

Emma's call, 2026-09-11, against frame `4077:78705`: a claimable task should
offer Claim next to its Assigned To field, not only on the register row.

The frame settles three things the register version did not have to answer:

- **The field is labelled.** Assigned To sat unlabelled in the details row
  before, between a labelled Due Date and an unlabelled checkbox. The frame
  labels it, so it is labelled now, and the row aligns on the field's baseline
  rather than the top of the group — otherwise Make private floated up level
  with the label.
- **The button is a Primary, immediately right of the field**, sized to its
  own content while the field takes the remaining width.
- **Make private is disabled while the task is held by a role**, which is not
  a detail I would have guessed — and it is the right call: a task sitting in
  a shared queue cannot be private, because the people it is waiting on are
  the ones private would hide it from. It greys out, loses its tick, and comes
  back the moment the task belongs to a person.

Claim is derived exactly as it is on the register — any assignee that is a
role Tony belongs to — so a task cannot show the button in one place and not
the other. Clicking it drops the roles Tony is in, leaves anyone else on the
task, adds Tony, and fires the same green toast. It does not save the task;
Save still does that, so Cancel still backs it out.

## The Workspace tile shows everything that is Tony's, or his roles'

Emma's call, 2026-09-11, on the My Tasks tile: *all of the tasks assigned to
the current user or their user roles should display here.* It was showing six
while the register's My Tasks held ten, because the tile's rows were written
before the register's data grew.

The tile now mirrors the register. Three rows joined his own list — New Vendor
Onboarding, Approve Daniel for Pet, and the completed Upload receipts, which
stays listed and struck through rather than disappearing, because that is what
the register does with a closed task. Record Park's records joined the role
queue, since it is held by Property Manager.

**The role queue is no longer hidden until his list is empty.** It was built
for the demo's last scene, where clearing his own work is what surfaces it.
"Everything assigned to your roles displays here" and "your roles' work
appears only once you are idle" cannot both be true, so the queue now sits
permanently below his own tasks, labelled, with Claim on each row. The scene
still reads: as he ticks his own off, the queue is what is left. *If you
wanted the reveal kept, that is the one line to put back.*

Three smaller things fell out of it:

- **The greeting counts what the tile counts.** "You have 6 tasks open, 2
  overdue" was a fixed sentence that went stale the moment anything was ticked
  or claimed. It reads the same rows the tile does now.
- **A claimed task keeps its id**, so its details still open after it moves out
  of the queue. A task typed into the mini bar has no id and still doesn't —
  it exists only on that page.
- **The open count excludes the role queue.** Those tasks are listed but not
  yet his, so counting them as his open work would overstate it. Say if you'd
  rather the number covered everything on the tile.

## The register's quick-add bar catches up with the tile's

Three calls, same afternoon, all of them closing gaps between the full bar on
the Tasks register and the mini one on the Workspace tile.

**The date and time are real fields now.** They were two fixed strings —
`09/17/2025`, `11:00 AM` — that nothing read; a task added from the bar got
that date whatever the bar showed. Each field and its icon opens the same
picker `assets/datetime.js` gives the tile, the bar stays open while you pick,
and what is showing is what the task gets. Same for the assignee: the bar's
own selection, not a hard-coded Tony.

**Opening the bar starts from now.** Today, an hour ahead, assigned to
whoever is signed in — every time it opens, not just the first. A quick-add
bar is for the next thing, so inheriting the last thing's date is wrong twice
over.

**The avatar cluster follows the library.** Avatar's `Style=Inline Avatar
Group` records `itemSpacing: -4` — the bubbles overlap by 4px, which is what
the register's rows already did and the bar did not. And a role is orange
wherever it appears, including in the bar, which was the one place still
drawing every assignee blue.

**The `+N` bubble is filled, not outlined.** It now matches the avatars it
stands for — blue among users, orange among roles. The library records an
`Style=Outline` Avatar (white fill, blue stroke, blue initials) but nothing
that says the overflow bubble is one, so this is Emma's call rather than a
harvest; item 33. Applied to the register's rows as well as the bar, since a
rule that holds in one cluster and not the other is just a bug with a reason.

## Add Note writes a note; the arrow opens the history

The History / Notes tile header had one link doing two jobs: `Add Note ⧉`
opened the whole History / Notes overlay *and* the Note dialog on top of it,
so asking to write one sentence put a full register behind it.

Split, on Emma's call: **Add Note** opens only the Note Details dialog, over
Task Details, with nothing between them. The **jump arrow** opens the History /
Notes overlay on top of Task Details, which is what a jump arrow means
everywhere else on this screen. `RMXHistory.open` takes a `noteOnly` option
for the first case — the shared overlay still loads the record, it just
doesn't show its register.

## New mentions content: five records, five reasons to open one

Emma's content, 2026-09-11. The old four were placeholder-shaped — a carpet
quote, a billing credit, a vendor autopay, a proforma — and they did not say
much about *why* a manager would open the record. These five do, and they
spread across the record types Tony actually works: two tenants, two
prospects, an owner.

| Who tagged him | Record | What it is |
|---|---|---|
| Becky Carle | Tenant · Daniel Smith | Wants a dog; records attached, question is addendum or deposit first |
| Danielle Gardin | Prospect · Nicole Brandt | Wants the quote repriced with the covered parking space in the rent |
| Ali Ferryman | Prospect · Renee Vogel | Needs a dog park; asking for the lead to move to Brookside |
| Karen Hsu | Tenant · Marcia Clark | Adding a roommate within six months, wants the process in writing |
| Dave Hegemann | Owner · Sally Klydon | Closing on a fourplex, wants the management agreement started |

Each opens its own History / Notes, and each history is a thread rather than a
single line — the tagged note sits on top of the two or three that led to it,
so opening one tells you what happened before somebody needed you. Daniel's
carries the vet records and renter's policy as attachments; Sally's carries
the quote PDF she wants repriced.

Some of it connects to what is already here on purpose. **Daniel Smith** is
the tenant on the register's "Approve Daniel for Pet" task, so the mention and
the task are two views of one request. **Marcia Clark** keeps her billing
history and gains the roommate thread above it, which is also what "Return
Marcia Clark's call" is about.

Two judgement calls worth knowing:

- **Klydon is the owner; the parking prospect is Nicole Brandt.** Sally Klydon
  arrived as an Owner Prospect sending a proforma, and the parking-quote note
  would have made her a rental prospect instead — while Scene 3 needs an
  "Owner Klydon" to re-verify a W-9 against. Emma's call, 2026-09-11: Klydon
  is the owner, with the management-agreement thread and the Owner link Scene 3
  attaches; the prospect asking about covered parking is a different person.
  One name, one role, in the demo and in the data.
- **The Issue and Vendor records are still in the file, now unlinked.** Issue
  #4821 and Anderson Pest Control are real, coherent histories, and the
  register still carries a Riverview #204 task and vendor links that could
  point at them later. Nothing on the Workspace opens them today. Say if you
  would rather they went.

## Six corrections, 2026-09-11

**The role queue sits below Tony's own tasks now, not above them.** They are
his to take, not yet his to do, so they read as what is left rather than what
is next. The Claim button moved ahead of the due date in the row.

**A queue row is an ordinary task row.** It had a grey ground, no checkbox and
no hover, on the reasoning that a task you have not claimed is not yours to
tick. Emma's call went the other way, and it is the better one: people finish
things and then record them, so a row you can see is a row you can close. Same
white ground, same checkbox, same hover as the rest of the list, with one extra
column for Claim. Ticking one strikes it through without adding it to the open
count — it was never counted there — and claiming one moves the row itself
rather than rebuilding it, so its checkbox, flag, link and id all come with it.

**Every queue row is a real register task.** Two of them were workspace-only
markup, so clicking one did nothing while the third opened details — now
"Send renewal reminders" and "Walk vacant units at Flagstone" are records in
the register's data, held by Property Manager like "Record Park's records".
That has two consequences worth knowing: the register's My Tasks is **twelve**
rather than the ten you asked for a round ago (the extra two are these,
claimable rather than assigned), and claiming from the tile now *moves* the row
instead of rebuilding it, so its title, flag, link and id all survive the move
and its details still open afterwards.

**Every due date that is not overdue is in the future.** Most of the data was
written against 2025 and today is 09/11/26, so rows sat weeks past due while
showing no overdue styling. Twenty-nine dates were moved across both screens.
Only the four tasks actually flagged overdue are in the past now, which is
also the only way the red rows mean anything. The completed task is dated
ahead too — closed early, rather than closed late with no warning on it.

**Quick Filters' Assigned To says "Tony Little" on My Tasks.** The tab *is*
the filter there, so "All Selected" was answering a question nobody asked. It
goes back to the count on Other Users' Tasks, where choosing is the point.

**An unselected High Priority chip has no fill.** It was white on the panel's
pale blue ground, which read as switched on. It is flat now and only takes the
pink when it is actually on. *The open question from earlier rounds still
stands: default and hover match the spec, and selected reuses the hover pink,
so the two are still hard to tell apart — worth a decision when you have one.*

**The Toggle Switch has its middle line back.** The first segment had dropped
its right border so the two would not double up, which left no divider at all.
It keeps one now, blue while that segment is active so the line matches the
outline it belongs to.

**A Scoreboard item that stands for several records names the first and counts
the rest in a Pill.** Gerald Hupp read "Hupp Holdings — 2 properties", which
names neither; it reads "Brookside Apartments +1" now. The Pill is RMX's own —
20px, Radius/lg, white on a Border/secondary hairline.

## The two filter checkboxes are Checkbox State=Blue

Emma's call, 2026-09-11, and it turned up a bug underneath it.

The frame's own instances say what they are: a 2px `#008dd5` box on white at
Radius/xs, and the label in `Text/text-link` rather than the grey a Default
checkbox uses — read off `I4628:44305;…;4628:44246` ("Only Notes with
Attachments") and `…;4628:44247` ("Unit Notes"). Checked follows the same
variant, so the tick lands on blue, not on the orange a Default checkbox gets.

**Scoped, not global.** Note Details' own checkboxes — Lock Information, Pin,
Show on payments tab, and Follow-up Date — are Default grey in `3779:60444`,
checked in the frame before changing anything, so they stay grey. Two
checkboxes on one screen are deliberately different components and the
prototype now says so.

**And they had never actually ticked.** `toggleAttachOnly` and `toggleCheck`
both queried `.chkbox` while the markup carries `.hn-chkbox` — a leftover from
the round where this stylesheet was regenerated with prefixed class names.
Every checkbox in the overlay was inert, silently, because the handler was
toggling a class on nothing. Fixed in three places; "Only Notes with
Attachments" now filters the register (four notes to two on Daniel Smith's
record), and the Note dialog's three checkboxes tick.

## Closed tasks sink, then they are gone

Emma's call, 2026-09-11, on the My Workspace tile. Two halves of one rule:

**Ticked, it sinks.** The list orders overdue, then everything still open,
then anything closed. A task you tick does not vanish from under your cursor —
it drops to the bottom, where you can see what you just did and untick it if
the tick was a mistake.

**Come back, and it is gone.** A task that was already closed when the page
loaded never renders. The tile is a list of what is still open; the register
is where closed tasks live and it keeps every one of them, with its own Closed
Tasks filter. That is why "Upload receipts for property expenses" is on the
register and not on the tile.

## Editing a checklist item

Edit was a disabled menu item with a tooltip saying it opened an overlay this
prototype does not model. It edits in place instead, on Emma's call: the row
stays a row, the description becomes an input and the assignee a dropdown
trigger, with Save and Cancel where the kebab was. Enter saves, Escape cancels.

Three things worth knowing:

- **A checklist item goes to people, never to a role.** The dropdown opens on
  Users with the User Roles tab hidden, rather than offering a choice the data
  model does not allow.
- **Reassigning the item you are waiting on reassigns the task**, the same way
  ticking it off does — that is the whole point of the baton-pass behaviour,
  and editing is just another way of moving the baton.
- **A saved item carries assignee keys.** Checklist rows arrived in two shapes:
  a name string (`assignee`) from the template data, or a list of keys
  (`assigned`) from the scene tasks. Saving normalises to keys, so an edited
  item no longer depends on a name matching a person exactly.

Also: **Make private centres on the Assigned To field.** It was aligned to the
field's bottom edge, which sat it low against a 36px input.

## The History / Notes tile runs flush, per 3502:94985

Emma's call, 2026-09-11, on the padding. The frame is unambiguous: the tile's
content area carries `Spacing/none`, so the register runs edge to edge and only
the tile header keeps its 8px. The prototype was giving it the standard 16px
tile padding, which inset the register and cost it most of the Note column.

Read straight off the frame:

- **Header row:** 32px, 8px of its own padding, a `Border/primary` rule
  underneath, 14px SemiBold navy.
- **Rows:** 40px, 8px sides, and **no separators** — the register in this tile
  is spaced, not ruled.
- **Note cell:** a 24px `Container/secondary` avatar, 4px gap, then the text.

Two judgement calls the frame forced:

- **Date and Type hug their content.** They were fixed at 70px and 60px, which
  wrapped a date onto two lines the moment a note carried a time. They size to
  their text now and the Note column takes what is left.
- **The tile prints the date without the time.** The frame shows `08/08/25`,
  and printing `09/11/26 10:10 AM` widened the column enough to push every note
  onto two lines in a tile this narrow. The full timestamp is still there in
  the History / Notes overlay's own register, which has the width for it.

## One link of each type per task

Emma's call, 2026-09-11. The Type dropdown offered all five every time, so a
task already linked to Anderson Mechanical could be given a second Vendor.

A type already on the task is no longer offered — open Add Link on "Sign off on
Brookside HVAC scope", which carries a Vendor, and the list is Tenant, Unit,
Property, Owner. Remove that link and Vendor comes back, since the constraint
is read off the task's current links rather than stored anywhere.

Two consequences worth noting:

- **Add Link disappears when all five are used.** There is nothing left to
  link, so offering the action would open a dropdown with nothing in it.
- **If you somehow reach the menu with nothing available**, it says so rather
  than rendering empty.

## Add Action, on both bars, from one list

Emma's call, 2026-09-11: the Workspace tile's Add Action "freaks out" — it did
not open a dropdown at all. It threw the half-filled bar away and opened the
full Task Details overlay, because the button was still wired to the same
handler as "Add More Details" from the round where the mini bar was built.

It opens the real Select an Action list now, and once something is picked the
control *is* the action: its name in navy with a blue x that clears it.
Picking leaves the bar open, the same way choosing a time does.

**The same gap was on the register, quieter.** Its quick-add bar opened the
menu correctly and then did nothing with what you picked — `pickActionItem`
only handled the modal. It shows the action now, and a task added from the bar
carries it, so quick-adding "Draft the addendum letter" with Write Letter puts
Write Letter in the register's Action column.

**One list, `assets/actions.js`.** Three groups and twenty-six items, the real
New Action UI's own. The register was carrying them as hard-coded markup and
My Workspace had no copy at all; both read the shared file now — the register
generates its existing panel's rows from `RMXActions.markup()`, and My
Workspace opens the self-contained `RMXActions.open()` panel, which clamps and
flips inside the viewport like the date pickers do. That keeps the register's
panel exactly as the frame sizes it (to the field that opens it, with its
collapsible groups) while making sure a new action only has to be added once.

**One thing this nearly shipped broken.** The shared scripts load after the
inline block, so filling the register's panel at init threw `RMXActions is not
defined` — and because that line sat above `renderRegister()`, it took the
whole cold load with it: the register rendered empty and only came back when
something else re-rendered it. It waits for `DOMContentLoaded` now, next to the
quick-add bar's date default, which waits for `assets/datetime.js` for exactly
the same reason. Worth remembering as a shape: anything touching a shared asset
has to run after the document, not inline.

## A task added from the mini bar opens like any other

Emma, 2026-09-11: *why can't I click on a task to open the details if it was
created via the quick add task?* Because it had nothing to open — the row was
built with no id, on the reasoning that a task typed on the Workspace has no
record on the register for the overlay to look up. True, and beside the point:
you had just typed it, so the details are the ones you typed.

The row carries them now. Its title, due date, time and action sit on it as
data attributes, and clicking it opens the overlay as a New Task prefilled with
exactly those — not a blank form, and not nothing. "Add More Details" goes
through the same call, so the two ways of reaching the form are one code path
and both bring the whole bar with them rather than just the typed name.

**It reports back.** Renaming or flagging the task in the overlay updates the
row it came from, the same way saving a real task does. That needed a handle:
the row gets a `token`, the overlay takes it in the query string and returns it
with the saved message, and the Workspace finds the row by token when there is
no id to find it by. Saving also rewrites the stored title, so reopening the
row shows the name you gave it rather than the one you typed first.

**A note on what bit me here.** The overlay first opened with the title and
dates prefilled but no action, which looked like a bug in the prefill and was
not: the iframe was serving a cached `screens/tasks.html`. Loading the same URL
directly proved the code correct. Third time this session that a cached asset
made working code look broken — verify against a fresh fetch before changing
anything.

## Handing a task on takes it off My Tasks

Emma's call, 2026-09-11, completing the baton pass. Ticking your checklist item
already moved the Assignee field to the next person — but the task stayed on My
Tasks and on the Workspace tile, which made the hand-off look like a label
change rather than the task actually leaving.

**Which tab a task belongs to is now a fact about who holds it.** Saving asks
one question: is any assignee me, or a role I am in? If yes it belongs on My
Tasks; if no it belongs on Other Users' Tasks, and the task moves between the
two datasets accordingly. So ticking Tony's item on New Vendor Onboarding and
saving takes My Tasks from twelve to eleven and the task appears under Dave
Hegemann on the other tab.

It works in every direction, not just the demo's:

- **Claim keeps a task**, because claiming makes you an assignee.
- **Reassigning a task away by hand moves it**, the same as ticking an item
  does — there is one rule, not a special case for checklists.
- **An ordinary save moves nothing**, because the answer to the question has
  not changed.

**The Workspace tile follows.** The overlay's saved message carries a
`handedOver` flag, and a tile row that gets one removes itself, drops out of
the open count and out of the greeting. The tile is My Tasks; a task that is no
longer Tony's has no business on it.

## Walking the demo end to end

Emma walked the five scenes, 2026-09-11. Three things came out of it.

**Enter did nothing on the register's quick-add bar.** Scene 1 is "type it and
hit enter" and the register's bar had no key handler at all — only the
Workspace tile's mini bar did, from the round where that was built. Enter adds
and Escape backs out on both now. The whole point of a quick-add bar is not
reaching for the mouse.

**A closed task only sank on the next re-sort.** Ticking one set its state and
repainted the counts but did not reorder, so it sat where it was until
something else — an add, a claim — happened to re-sort the list. It sinks the
moment it is closed now, and unticking brings it back up among the open ones.

**Scene 1's line does not fit.** "Send new vendor agreement to Precision
Heating & Cooling" is 56 characters and the quick-add field stops at 50 — the
frame's own counter reads 0/50, so that is the product's limit and not this
prototype's. Typed in full it truncates to "…Precision Heating & C". A shorter
line is the fix; the field is not.

## The two screens agree about a task

Emma's call, 2026-09-11: *is it possible to keep the data consistent across
screens?* It is, and it now is. Close a task on the register, walk to My
Workspace, and the Workspace already knows.

`assets/taskstate.js` is deliberately thin — an overlay of what *changed*, not
a database. Per task id it records the fields a person can actually change, and
separately the tasks created during the visit. Each screen still ships with its
own starting data and still owns its own rendering; it just applies whatever
the other one recorded before it draws, and records its own changes as it goes.

What crosses, in both directions:

- **Completing a task.** Ticked on the register, or on the tile.
- **Renaming, flagging, re-dating** — anything a save writes.
- **Claiming.** Claimed on the register, and the tile's queue row moves into
  the list, drops its Claim button and gains a checkbox. Claimed on the tile,
  and the register has it on My Tasks.
- **Handing a task on.** Tick your checklist item and save, and the task is off
  the tile and on Other Users' Tasks wherever you look next.
- **Creating one.** Quick-added on the register, and it is on the tile with its
  real id, so clicking it opens its real details.

**sessionStorage, not localStorage, and that is the point.** State lives as long
as the tab does, so a demo keeps everything you did while you move between
screens, and a fresh tab always starts from the same known set — no clearing
anything between run-throughs. Every read and write is wrapped, so a browser
with storage blocked loses the syncing rather than the prototype.

**One consequence worth stating.** A task closed on the register does not
appear on the Workspace tile at all, because the tile shows what is still open
— your earlier call, and it now applies to closures made anywhere rather than
only to ones made on the tile. The count and the greeting drop to match. If
you would rather see it struck through at the bottom instead, that is the same
one-line switch it was before.

## Closed Tasks is a real filter now

Emma's call, 2026-09-11. It had been the one checkbox in Quick Filters honestly
marked as not built — the note on it said a ticked task stays visible here, so
there was nothing for it to reveal. That reasoning had the default backwards.

**It starts ticked.** The register shows everything, closed tasks included,
struck through where you left them — which is what makes ticking one legible.
Untick Closed Tasks, hit Apply, and they go. Tick it back, Apply, and they
return. Reset puts the tick back with everything else.

Two details that fall out of the panel's own model:

- **Unticking on its own changes nothing.** Quick Filters are staged, not
  live — that is what Apply and Reset mean — so the register does not move
  until you apply.
- **It covers tasks closed during the visit, not just the one that shipped
  closed.** Close "Return Marcia Clark's call", untick, Apply, and My Tasks
  goes from twelve rows to ten with the totals line reading "10 of 12 Tasks".

## The second walkthrough, and the one thing it broke

Emma walked the flow again after the cross-screen state landed, 2026-09-11.
Everything held, and the sync made the scenes carry: the task quick-added in
Scene 1 is on the Workspace tile by Scene 5, the task handed to Dave in Scene 2
is gone from it, and the Accounting task from Scene 3 never appears on it at
all.

**One thing the sync broke.** Scene 2's task now moves to Other Users' Tasks
when Tony hands it on — and landed directly beside the record Scene 4 inspects,
both titled "New Vendor Onboarding", differing only by owner, due date and
progress. Two identical rows is a puzzle, not a register. The Scene 4 record is
named after its own vendor now — **New Vendor Onboarding — Anderson
Mechanical** — which its own history already said it was. They read as two
onboardings in flight, which is what they are.

*If you would rather they were literally the same task at two points in time,
that is a different build: Scene 4's state would have to be reached by ticking
Dave's item as well as Tony's, live in the demo.*

## A task ticked on the tile opens complete

Emma's call, 2026-09-11. The shared state was recording the tick correctly, and
Task Details opened showing the task still open. Two separate reasons, both
about *when* rather than *what*.

**The overlay was reading the data before the sync applied it.** The query-param
opener ran inline at the end of the register's script, while `applySharedState()`
waited for `DOMContentLoaded` — so a task opened from My Workspace was drawn
from the shipped data and nothing the Workspace had recorded reached it. The
opener is a named function now, called after the state is applied.

**And the frame would not reload for the same task twice.** Setting an iframe's
`src` to the value it already has does not re-run the page, so opening a task,
ticking it, and opening it again showed the state from the first opening. The
overlay's URL carries a reload token now — it reads the shared state on load,
so it has to actually load.

Same shape as the actions-panel bug from earlier in the day: the thing was
right, the order was wrong. Anything that depends on a shared asset or shared
state has to run after the document, and anything that reads state on load has
to be made to load.

## Blue when selected, and no tab bar over one list

Emma's calls, 2026-09-11.

**The Assigned To dropdown's active tab underlines blue.** It had been orange
on the strength of a note in this prototype's own CSS citing design.md §7.1 —
"tabs underline in RMX orange, never blue". The skill's visual DNA says the
opposite in as many words: the one brand blue carries "primary buttons, links,
active borders, selected states — and active tabs". Two written rules, one
contradicting the other, and the prototype had followed the wrong one. Item 34.

**A checklist item's picker has no tab bar.** It offers Users only, because an
item cannot go to a role — so the panel opened with a single "Users" tab, which
is a label pretending to be a choice. It opens straight into the search and the
list now.

**The edit field keeps the browser's focus ring off.** The orange ring around a
checklist item being edited was the browser's own `:focus-visible` indicator,
not anything in the stylesheet. Every other input on this screen suppresses it
and shows a blue border instead; this one does too now. *Not visually verified —
the automated browser never holds OS focus, so `:focus` does not match there.
The rule is the same one the rest of the screen's inputs use.*

## Every toast is green

Emma's call, 2026-09-11. There were three toasts across these screens and all
three defaulted to the navy Toast State=Action ground, with green reserved for
the two calls that asked for it by name.

Green is the right default here. Every toast these screens raise reports
something that finished — task added, saved, created, deleted, closed, claimed,
checklist populated, note added, filters applied — and that is Toast
State=Success (`#6eb744`). All three now start there:

- **The register's own toast** (`.toast`) — green ground; `.toast.success`
  stays so existing callers keep working, it just no longer changes anything.
- **The History / Notes overlay's toast** (`.hn-toast`) — same.
- **`RMX.toast` in the skill's `app.js`** — the `kind` default moves from
  `neutral` to `success`, so a caller that genuinely needs the navy
  State=Action ground can still ask for `'neutral'` and get it.

Both toasts already carried the filled check-circle glyph, so the green needed
nothing else to read right.

**One message is now green that arguably should not be.** "Task name is
required" is the only toast on either screen that reports a failure rather than
a completion, and it is green like the rest. Toast has a `State=Failure`
(`--text-error`) that it could use instead — say the word and that one call
gets it, without disturbing the rule for everything else.

**And one thing for you to decide upstream.** This is the second local change
to the skill's `app.js` — the first was making a toast replace rather than
stack. Both look like they belong in the skill rather than in this prototype;
`check.mjs` reports the file as drifted either way.

## Six fixes off a pass over the register and the menu

Emma's list, 2026-09-11.

**The register fits now.** Its columns came off the frame at 1888px in total,
which no laptop shows without scrolling — and Assigned To was 270px to hold
three 24px bubbles. Every column is sized to the widest value this prototype's
data actually puts in it plus the cell's padding: 1888px becomes **1388px**,
and nothing truncates (checked cell by cell, not by eye).

**The Mega Menu's notch was mirrored.** The active category's fold hung off the
bottom-right with its solid edge on the left, which pointed it the wrong way.
Flipped.

**Tasks is in My Favorites, under Services.** It is a real screen and that tile
is where you would reach for it, so it is a real link rather than another `#`.

**Users have different coloured bubbles.** Three colours — the same
Container/secondary blue, Container/secondary-dark navy and Icon/success green
the Mentions tile has used since it was built — assigned by the user's position
in the list, so a person is the same colour everywhere and two people side by
side are rarely the same. *Orange is deliberately not in the set: an orange
bubble means a role, and that has to keep meaning only that.* A real
categorical ramp would do this properly; that gap is item 8.

**Other Users' Tasks is spread across the team.** Ten rows were sharing five
people, with Becky Carle on five of them. They now run across twelve, leaving
the checklist owners the demo depends on exactly where they were.

**Quick Filters stays as you left it.** Switching to Other Users' Tasks used to
force the panel open, on the reasoning that choosing whose tasks you are
looking at is the first thing you do there. It pushes the register down the
page every time you switch, which is worse than one extra click.

**And the cursor tells the truth.** A register row opens that task's details
and showed a text caret; so did the collapsed quick-add bar. Both point now.
Audited the rest of both screens rather than fixing only the two reported —
everything else with a click handler already pointed.

## Bubbles say who they are, and a checked box is the right orange

Emma's calls, 2026-09-11.

**Hovering a bubble names the person; hovering a "+N" names all of them.** The
single bubbles had a native `title`, which is slow and unstyled; the "+N" had
nothing at all, because it could not have had anything — it was a literal
`'+2'` sitting in the data with no people behind it. The cluster is computed
now: two bubbles and a "+N" carrying the names of the rest, so the tooltip has
something true to say. A register cell clips its overflow, so the tooltip is a
fixed-position element on `<body>` rather than a child of the cell.

**The Assigned To column centres**, header and bubbles together.

**A checklist item's checkbox is the same control wherever you meet it.** In
the register it was a 16px green box; in Task Details a 20px orange one. Green
belongs to the task-done control on the row above it, and the two meaning
different things is the point — so the register's now matches Task Details.

**And that turned up a real one.** `.chkbox.checked` was filled with
`--rmx-marketing` (#f79b4d) rather than `Icon/icon-attention` (#f58220). The
skill names this exact mistake — *"a checked checkbox is orange,
`--icon-attention`, **not** the marketing orange"* — and every checked checkbox
on the Tasks screen had the wrong one. One line, and both screens were wrong
together, so nothing looked out of place enough to notice.

## The register fills its page

Emma's call, 2026-09-11. Sizing the columns to their content fixed the
horizontal scroll and left the opposite problem: on a wide window the register
stopped at 1388px and the rest of the page was a dead strip.

Every column but Tasks keeps the width it needs; **Tasks takes whatever is
left**. At 1800px it runs to 762px and the table fills the page; below the sum
of the fixed columns the table still scrolls rather than crushing anything.

## Announcements and My Training start hidden

Also Emma's, and it explains something the reference build had drawn but never
wired. The frame puts two links in the bottom-right corner — Announcements and
My Training — because those two tiles are *hidden*; that corner is where a
hidden tile waits. Both the crossed-eye in each tile's header and both links
were `data-rmx-todo`, so neither end did anything and both tiles were always
up, which made the links look like decoration.

They start hidden now. A link brings its tile back, the crossed-eye puts it
away again, and the bar itself disappears once there is nothing left in it to
offer. One thing fixed on the way past: the second link read "My Workspace",
and the frame says My Training — which is the tile it actually restores.

**Services leads My Favorites.** It was the last card in its column, so
reaching Tasks — the one built screen in that tile — meant scrolling.

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
27. **Foundations has no red lighter than `#fbd6d8`.** It is the error
    Lozenge's tint (`Component/lozenge-error`), and it is the full-strength
    fill for a small chip — used as the ground of a whole list row it reads
    heavy, which is what Emma reacted to twice. This prototype thins it with
    `color-mix()` to 50% over the tile surface (#fdeaec). Every semantic
    family probably wants a second, paler step for row and section grounds,
    not just the chip-strength one: the same gap will appear the first time
    anything needs a pale green or amber row.
28. **`dropshadow-lg`'s description says it is for My Workspace tiles, but
    the tile instance uses `dropshadow-md`.** The style's own description in
    Foundations reads "Used mainly for My Workspace tiles", while
    `Tile Style=Workspace` on node 4075:109757 carries `dropshadow-md`
    ("Most commonly used"). One of the two is stale. This prototype follows
    the instance, because that is what the frame actually draws — but if lg
    is the intended tile shadow, the component wants updating, and if md is,
    the description does. Worth a look either way: they are visibly
    different, lg being four layers and noticeably deeper.
29. **There is no Time Picker component.** RMX Components' "Date & Time" page
    carries the `Date Picker` set (Date Paginator, Calendar, Date Range) and
    its sub-parts, and nothing for time — yet time fields are everywhere: a
    task's due time, Note Details' Start Date and Time, the quick-add bar.
    Every screen that needs one therefore composes its own from the dropdown
    pattern, which is how they drift. A Time Picker beside the Date Picker
    would close it.
30. **`SA` is an orange assignee that matches no role.** It appears on four
    tasks in this prototype's data, styled as a role, and there is no
    Administrator / Leasing Agent / Property Manager it corresponds to. It is
    carried as a role named "SA" rather than guessed at. Either it is a real
    role that wants naming, or those four tasks belong to one of the three
    that exist — a one-line answer either way, and not one a prototype should
    invent.
31. **The Primary button has no hover state.** `rmx.css` gives Secondary one
    (`--border-disabled`) and Primary none, and Foundations carries no
    `primary-button-hover` token to build one from. Every primary action in
    the product is therefore inert under the cursor. Either the token is
    missing or the state is deliberate, but one blue button that never
    responds next to a Secondary that does reads as an oversight.
32. **`Component/tenant-header` (#e8f6fa) is not in `tokens.css`.** It is the
    Quick Filters panel's ground in `3703:121005`, and the stylesheet carries
    no `component-*` background at that value, so the panel declares the hex
    locally. Same family of gap as items 12 and 21 — a real Foundations colour
    the export does not reach.
33. **The `+N` overflow bubble is not a recorded variant.** Avatar ships seven
    styles — Inline, Default, Outline, Large, two Scoreboard sizes and Inline
    Avatar Group — and the group's anatomy is three identical 24px Avatar
    Items overlapped by 4px. Nothing records what the bubble standing for the
    ones you cannot see should look like, though the product clearly has one.
    This prototype fills it with the colour of the cluster it belongs to —
    blue among users, orange among roles — on Emma's call. Either Inline
    Avatar Group wants an overflow item, or the pattern wants writing down.
34. **The design docs disagree about active tabs.** This prototype's CSS
    carried an orange tab underline citing design.md §7.1 — "tabs underline in
    RMX orange, never blue" — while the rmx-prototype skill's visual DNA lists
    active tabs among the things the single brand blue carries, alongside
    primary buttons, links and selected states. Both are written down, they
    cannot both hold, and a prototype following either one looks wrong to
    whoever read the other. Emma's call here was blue; the losing document
    wants correcting either way.
