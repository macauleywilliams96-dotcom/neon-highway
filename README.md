# Dungeon OSHA Compliance Officer

A sarcastic 2D physics inspector game. You are an underpaid auditor for
**Dungeon Corp LLC**. You do not slay monsters — you crawl through trap-filled
corridors, document hazardous workplace conditions, and issue massive financial
citations before an adventuring party lawyers up and sues the Overlord.

**Play:** https://macauleywilliams96-dotcom.github.io/neon-highway/

---

## Controls

| Input | Action |
|---|---|
| `A` / `D` or `←` / `→` | Walk |
| `W` / `Space` / `↑` | Jump |
| `Left click` | Issue a citation on a hazard |
| `E` | Voluntary impact test — pays well, hurts a lot |

## The job

A 90-second shift. Cite hazards for revenue, and get hit by them for more.

| Section | Hazard | Fine |
|---|---|---|
| §402.B | Unlit torches — insufficient ambient visibility | $1,500 |
| §109.C | Spike pits — unprotected fall hazard | $1,500 |
| §881.A | Pendulum axes — missing safety cage & motion sensor | $1,500 |
| §12.F | Goblins without hardhats — PPE non-compliance | $1,500 |

Each hazard can only be cited once per run. Taking a hit — or pressing `E` to
throw yourself at something on purpose — awards a **Lethality Testing Bonus** of
$2,500 and costs you health. The shift ends when the timer expires or your
Life Insurance Meter hits zero.

Performance is graded from *Unpaid Intern* through *Corporate Parasite* to
*Regional Nightmare*.

## Technical

- **Matter.js 0.19.0** for rigid-body physics: the auditor, swinging pendulum
  constraints, patrolling goblins, and pit sensors. Getting hit applies a real
  `Body.applyForce` impulse and briefly switches the auditor to finite inertia so
  he actually tumbles, rather than sliding upright like a fridge.
- **Custom canvas renderer** rather than `Matter.Render`, so the dungeon can be
  drawn properly — brickwork, torchlight falloff, spike pits, stamped citations.
- **Tailwind CSS** (CDN) for the HUD, menus and modals layered over the canvas.
- **Firebase Realtime Database** for the global leaderboard.

## Files

- `index.html` — markup, HUD, and all game logic
- `config.js` — Firebase configuration, deliberately isolated

## Leaderboard

`config.js` holds the Firebase config and the node name. Runs are pushed to
`/leaderboard` as `{ name, fineRevenue, rating, timestamp }`, and the top 10 are
queried live into the **Employee of the Month** panel on both the main menu and
the game-over screen.

Only `databaseURL` is required — the Realtime Database needs nothing else under
public rules. With no valid config the game still runs end to end and falls back
to a local leaderboard in the browser.

> The database is world-writable under test-mode rules. Worth tightening before
> sharing widely.

## Previous builds

All preserved and restorable:

- [`scrapyard-v1`](../../tree/scrapyard-v1) — robot fight betting with a deterministic simulation
- [`blackjack-v1`](../../tree/blackjack-v1) — VELVET ACE, real-time multiplayer blackjack
- [`rhythm-game-v1`](../../tree/rhythm-game-v1) — NEON HIGHWAY, synthwave rhythm game
