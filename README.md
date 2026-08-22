# SCRAPYARD

Two robots are built from scratch, fight to the death with random power-up
drops, and everyone watching bets on the outcome. Single self-contained
`index.html`, hosted on GitHub Pages.

**Watch:** https://macauleywilliams96-dotcom.github.io/neon-highway/

---

## How the fight is shared

The interesting part. Combat is **never streamed**. The fight is a pure
function of `(botSeed, fightSeed, tick)`, so every viewer runs the identical
simulation locally and sees the identical fight, punch for punch — the network
carries only a phase, a deadline and two 32-bit seeds.

**Two seeds, not one, and that separation is the anti-cheat:**

| Seed | Published | Determines |
|---|---|---|
| `botSeed` | when betting opens | the robots, their stats, and therefore the odds |
| `fightSeed` | when the bell rings | every combat roll |

Because the combat seed does not exist while bets are open, nobody can
fast-forward the simulation to see who wins and then bet on a certainty.

A viewer who arrives mid-fight rebuilds the sim and fast-forwards it to the
correct tick, landing exactly in step with everyone else. Same mechanism
recovers a tab that was hidden and fell thousands of ticks behind.

An elected host only advances the phase machine — it never arbitrates combat,
because it doesn't need to: everyone already agrees on the outcome.

## The odds are honest

Published odds are fitted against the simulation, not guessed. An early build
gave both robots an identical stat budget, which made every fight a 50/50 coin
flip and the odds meaningless. Robots now roll their own build budget, and the
score-to-probability mapping is a logistic fitted to 1,500 simulated fights.

Measured calibration over 1,500 fights:

| Implied | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 |
|---|---|---|---|---|---|---|---|---|---|
| **Actual** | 0.07 | 0.17 | 0.26 | 0.39 | 0.51 | 0.64 | 0.71 | 0.82 | 0.96 |

Longshots pay up to **9.4x**. House margin is 6%; backing favourites runs at
about −1% expected value, so reading the stat lines genuinely pays.

## Power-ups

Dropped into the arena mid-fight; either robot can grab them.

`NANO REPAIR` +28% hull · `OVERCLOCK` speed and damage · `ION SHIELD` absorbs
· `BERSERK` heavy damage boost · `EMP BLAST` stuns the opponent · `ROCKET POD`
five high-damage shots.

## Fight facts

100% of fights end in a knockout, median length ~14
seconds, and neither corner has a side bias (measured 145/155 over 300 fights).

## Database

Uses the same Firebase Realtime Database as the previous build. Only
`databaseURL` is required. Without it the arena runs solo — you still watch and
bet, but nobody shares your clock.

Paths: `arena/$room/{state,bets,chat,viewers,host}` and `richlist`.

> The database is world-writable under public rules, and the chat is
> unmoderated. Worth tightening before sharing widely.

## Previous builds

Both preserved and restorable:

- [`blackjack-v1`](../../tree/blackjack-v1) — VELVET ACE, real-time multiplayer blackjack
- [`rhythm-game-v1`](../../tree/rhythm-game-v1) — NEON HIGHWAY, synthwave rhythm game
