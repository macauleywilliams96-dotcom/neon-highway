# VELVET ACE

A single-file, real-time **multiplayer blackjack** table. A bot dealer runs the
shoe; anyone who opens the URL can sit down and play at the same table, seeing
each other's cards, bets and busts live.

**Play:** https://macauleywilliams96-dotcom.github.io/neon-highway/

---

## Table rules

6-deck shoe · dealer stands on all 17s · blackjack pays **3:2** · double on any
two cards · split once · reshuffle at the cut card.

## Controls

| Key | Action |
|-----|--------|
| `H` | Hit |
| `S` | Stand |
| `D` | Double |
| `P` | Split |
| `Enter` | Lock in your bet |

Chips are click-to-stack with undo and re-bet. Optional basic-strategy hints
highlight the correct play on your turn.

## How the multiplayer works

There is no game server — the table runs peer-to-peer over Firebase Realtime
Database:

- **Host election.** One *seated* client holds a short lease on `/host` and runs
  the dealer engine, writing authoritative table state. If the lease goes stale
  (tab closed) another player takes over within seconds — verified live: closing
  the host's tab mid-game handed off in under 8s with rounds uninterrupted. A
  host that still renews its lease but has stopped advancing the game (throttled
  or zombie tab) is forcibly replaced.
- **The engine runs on a timer, not `requestAnimationFrame`.** Browsers pause rAF
  in hidden tabs, which would freeze the table for everyone the moment the host
  switched away.
- **Seats are held by heartbeat**, written outside the state object the host
  rewrites, and pruned after 30s of silence. Using `onDisconnect` alone dropped
  players whose socket merely idled.
- **Shoe as (seed, index).** The shoe is a seeded Fisher–Yates shuffle, so state
  carries only a seed and a deal index — a few bytes instead of 312 cards, and
  any new host rebuilds the identical shoe.
- **Actions, not state.** Non-host players write only to an action queue; the
  host consumes and applies them. Clients never mutate shared game state
  directly, which keeps the rules authoritative.
- **Presence.** `onDisconnect()` frees a seat automatically when a player's tab
  closes, so seats never leak.

## Solo mode

Multiplayer is live on this deployment. Without Firebase credentials the game
falls back to **solo against the bot dealer**, with
optional basic-strategy bot players filling empty seats. Everything works —
there is simply nowhere for other humans to connect.

## Enabling multiplayer

1. Create a project at <https://console.firebase.google.com>.
2. **Build → Realtime Database → Create Database** (test mode to start).
3. **Project settings → Your apps → Web `</>`** to generate a config.
4. Paste the values into `firebaseConfig` at the top of the `<script>` block in
   `index.html`, including `databaseURL`.
5. Commit and push — Pages redeploys automatically.

Players sharing a **table name** (Options → Table Name) play together, so you
can run private tables on the same deployment.

> Test-mode rules leave the database world-writable. Before sharing widely,
> restrict writes to `/tables/$room` and cap payload sizes.

## Notes

- Bankroll and session stats persist in `localStorage`; rebuy from Options.
- Sound is synthesised with the Web Audio API — no asset files.
- The previous project at this URL, a synthwave rhythm game, is preserved at the
  git tag [`rhythm-game-v1`](../../tree/rhythm-game-v1).
