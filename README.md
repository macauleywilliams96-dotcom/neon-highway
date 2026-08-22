# NEON HIGHWAY

A single-file HTML5 Canvas rhythm game — Guitar Hero style — with a 3D synthwave
highway, YouTube-synced note charts, and an optional global Firebase leaderboard.

**Play:** https://macauleywilliams96-dotcom.github.io/neon-highway/

---

## Controls

| Key | Lane |
|-----|------|
| `Q` | Cyan |
| `W` | Magenta |
| `E` | Yellow |
| `R` | Green |
| `T` | Orange |

`L` toggles the engine log. `Esc` pauses. Lanes are also clickable/tappable.

Hit windows: **PERFECT** ±40 ms · **GREAT** ±80 ms · **GOOD** ±120 ms.
The multiplier steps up every 10 consecutive hits, to a maximum of 4x.

## How it works

- **Seeded charts.** An FNV-1a hash of the YouTube video ID plus the rounded track
  duration seeds a mulberry32 PRNG. Every player worldwide gets a byte-identical
  note map for the same song — no server, no chart files.
- **Absolute-time sync.** Notes are positioned from the player's `getCurrentTime()`
  rather than frame counts, interpolated between polls with drift correction, so
  frame-rate dips cannot desync the chart.
- **Anti-ad guard.** `getPlayerState()` and `getCurrentTime()` are polled every
  frame. Buffering and pausing freeze the highway; because ads keep the player
  reporting `PLAYING` while `currentTime` stops advancing, a 420 ms stall detector
  catches those too. Resuming hard-resyncs the clock and suppresses misses briefly.
- **3D projection.** A `1/(1+z)` perspective divide over pure 2D canvas, with a
  dynamic vanishing point, particle bursts and combo-scaled camera shake.

## Requirements

The YouTube IFrame API refuses to embed on `file://` URLs — opening `index.html`
directly shows a "Video player configuration error". Serve it over http(s):

```bash
npx serve .
```

Or just use the GitHub Pages URL, which works as-is.

## Enabling the global leaderboard

Without Firebase keys the game keeps scores in `localStorage`, per browser. To go
global (free, ~2 minutes):

1. Create a project at <https://console.firebase.google.com>.
2. **Build → Realtime Database → Create Database** (test mode is fine to start).
3. **Project settings → Your apps → Web `</>`** to generate a config.
4. Paste the values into the `firebaseConfig` object near the top of the `<script>`
   block in `index.html`, including `databaseURL`.
5. Commit and push — Pages redeploys automatically.

Test-mode rules leave the database world-writable. Before sharing widely, tighten
`scores/$videoId` to validate shape and rate-limit writes.

## Deploying

Push to GitHub, then **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
