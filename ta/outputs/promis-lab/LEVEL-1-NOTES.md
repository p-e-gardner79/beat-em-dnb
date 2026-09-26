# Level 1 — Underground Vinyl / Record Shop Riot

The Story campaign now runs from the existing Fiesta arrival and dubplate theft through four encounters, Dean's rescue and the introduction to Level 2. The mechanics lab remains an independent endless mode.

## Play

Choose a fighter, select **Level 1 · Story campaign**, and press **Start level**.

- Move: arrows / WASD; Shift runs. Follow **GO! →** after clearing each encounter.
- J punches, picks up rare vinyl and weapons, and collects the dropped basement key.
- K kicks; Space jumps; J or K during a jump attacks. J+K is the character's combination move. Double-tap left/right to dash. L uses the charged special.
- P pauses. Enter/Space skips a cinematic; at Vibe Check, the first press completes counting and the next continues.
- **Retry checkpoint** restarts the current encounter. **N** does this after defeat, including in fullscreen. R resets the run.
- Infinite health remains available for testing. The tally identifies runs using it as practice runs.

## Progression

| Zone | Encounter | Exit |
|---|---|---|
| Front Counter | Two White enforcers enter from the sides after a short preparation beat. | Clear, walk right, then scroll along the shop. |
| Vinyl Aisles | Three Whites; a Green reinforcement enters when only one remains. | Clear and follow the next scrolling stretch. |
| Stockroom | Two White guards and a Green flank; a second Green, then Black, enter as the crowd thins. | Clear, approach the metal door, kick it open and descend. |
| Basement | Reginald Smythe, 480 HP; a Gold enforcer joins at half health. | Defeat Reginald, collect the key with J, free Dean. |

The shop is a 3,860-unit continuous world. Encounter cameras lock at x=0, 1450 and 2900. Between these points, camera tracking accelerates smoothly behind the player. The basement is a separate arena reached through a fade. Character, effect, weapon, pickup and collision positions use world coordinates; audio panning uses screen coordinates. A narrower floor lane defines the vinyl aisles.

Reginald uses a readable punch, an overhead CLOSED-sign slam and a wider radial burst. His second phase shortens attack timing. The warning area marks the attack's reach; jump or move out of it before impact. Normal hit-stun, knockdowns and specials still apply.

## Story and timing

The existing 11-second arrival and 16.2-second theft remain. Added scenes: stairs 6 seconds; boss introduction 8 seconds; rescue 18 seconds; hand-off 11 seconds; tally waits for input; drive 9 seconds; tower arrival 12 seconds. Cinematic timing is independent of the combat speed slider.

Dean celebrates, prepares his deck, performs the Bass Signal rewind, clears scripted Corporate Suits, returns the Master Dubplate and receives the Tower Block warning. The boss introduction shows the stolen record being secured in the crate, linking the theft to the rescue.

The Vibe Check tracks enforcer defeats, maximum consecutive hits within a 2.5-second window, active play time, one story dubplate rescued, and damage taken. Rank points = max combo × 25 + enforcers × 100 + 1000 − active seconds × 2 − damage × 3. Thresholds: S 1800, A 1300, B 750, otherwise C. This is an initial tuning model.

The ending reaches the security gates of **Level 2: Pirate Radio Tower Block**. Level 2 combat is not implemented in this build.

## Audio and MC

Effects 85%, Music 80%, normal speed 1.30×. Existing fight, car and story recordings are reused. The basement filters the soundtrack toward bass; transit muffles the in-car stereo. Impacts do not duck the music.

MC QC has six new portrait moods: idle, call to arms, hype, warning, boss alert and victory. Existing contextual combat lines continue with their cooldowns; story captions take priority. The supplied “Rewind!” recording plays during Dean's blast, and existing praise lines accompany the rank.

**New narrative lines are subtitles, pending dedicated voice recordings.** No artificial replacement voice has been added. Suggested recordings: Green/Black/Gold warnings, stockroom instruction, basement descent, Gatekeeper introduction, Dean rescue reaction, Tower Block warning, S/A/B/C rank reactions and Level 2 briefing. Dean's phone message also needs a voice if desired.

## Files and build

Canonical additions: `work/level-engine.js`, `work/level-runtime.js`, `work/test-level.cjs`. Integration edits are in the existing combat engine/runtime, bouncer engine, MC director and build script. Run `node work/build-combat.cjs` from the project root.

Keep the five new PNGs beside Promis.html when copying the game: `level-cast-key.png`, `level-cast-motion-key.png`, `level-zones.png`, `level-finale-period.png`, `mc-moods.png`. They are local resources, requiring no external service during play. Older game art and audio remain embedded. Loading these new images separately avoids an oversized HTML/browser transport payload.

Checkpoints are held in memory for the current run. Reloading starts a new run. Retry restores the selected hero and checkpoint resources/statistics. Tuning settings are preserved. Endless lab reset behaviour is retained.

## Validation

- Automated coverage for all four heroes through zones, world travel, staged reinforcements, maximum three live opponents, boss phases, key pickup, rescue, tally, transit, checkpoint retry and returning to the lab.
- World-space attacks, dropped weapons and pickup tested beyond the original screen bounds.
- Existing bouncer, MC commentary, audio and opening tests passed after integration.
- Browser inspection of the aisle fight, basement boss, rescue, Vibe Check and ending; no console errors in inspected scenes.

The new walking loops and cinematic poses are initial limited-frame animation intended for the next visual tuning pass.

## Artwork provenance and final prompt set

Generated with the built-in image-generation tool, using the user-supplied Reginald/Dean/MC sheets and the existing clean shop artwork as references. No external paid API fallback was used. Final project assets are saved in this folder.

1. **level-cast-key.png** — Production sprite atlas, 3 columns × 2 rows: Reginald in pinstripe suit/gold chains holding CLOSED sign, overhead wind-up, sign slam; Dean celebrating with records, scratching turntable on milk crates, offering record. Detailed clean arcade art; adult proportions; all bodies contained in cells. Final background edit: replace every background pixel with flat RGB(255,0,255), no gradients/shadows/halos; preserve sprites. Runtime removes the magenta key.
2. **level-cast-motion-key.png** — Companion 4 × 2 atlas: Reginald two walk poses, punch and defeated pose; Dean two walk poses, brick-phone pose and recovery. Same faces and clothing. Final edit explicitly replaces the smoky backdrop with solid pure RGB(255,0,255). Runtime keys and extracts connected silhouettes.
3. **level-zones.png** — Two stacked full-width arcade backgrounds: a 1995 London jungle record aisle and a back stockroom with vinyl boxes, industrial shelving, amps and a BASEMENT door on the right. Warm amber light; grey concrete fighting floor; no people/UI. Reference: record-shop-clean.png.
4. **level-finale-period.png** — Two stacked backgrounds: dark brick record-shop basement with speakers, pipes, single bare bulb and STOLEN MUSIC crate; rainy brutalist London estate with gated tower and red radio beacon. Final historical edit preserves the basement and replaces modern skyline landmarks with 1995 low-rise rooftops, chimneys, cranes and council blocks.
5. **mc-moods.png** — 3 × 2 HUD portrait atlas of MC QC, short black hair, white T-shirt, gold chain and microphone: calm narrator, pointing call to arms, raised-fist hype, serious warning, alarmed boss alert, joyous victory. Consistent adult face and arcade shading. Opaque portrait cells are retained inside the HUD frame.
