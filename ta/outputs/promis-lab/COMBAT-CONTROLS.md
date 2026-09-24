# Promis — 1995 record-shop combat lab

Open **Promis.html** in a browser. The single HTML file contains every sprite, 22 supplied sound effects and the supplied Insert Coin To Win soundtrack, so it also works offline.

Press **Play** or **P** to start the test and music. The page opens silent and paused. Audio decoding happens on the first Play.

- WASD / arrows: move. Shift: run. J: punch (alternates right/left fists; tap to chain). K: kick. L: shockwave. Space: neutral jump. While airborne, press J for a punch or K for a kick. One deliberate attack per jump; landing cancels any unfinished attack. The attack does not restart or extend the jump.
- P: pause/resume. Music resumes at its previous position; active effects stop on pause.
- Stop test: end the run, stop all audio, rewind the soundtrack and return to wave one, paused.
- R / Reset: return to wave one, paused, retaining tuning and volume settings for the session.
- T: quarter speed / normal speed. Period: silently advance 1/12 second. C: scanlines.

Waves contain one bully, then two, then repeating groups of three, with a 2.2-second interval after clearing a wave. New groups enter from both sides. Attack starts are staggered. The shockwave can hit multiple opponents, once per target. The upper-right health bar totals the current group's health; the wave, remaining-enemy and knockout counters track progress.

Infinite player health is enabled by default, but damage reactions and knockdowns remain. Disable it for defeat testing. Enemy modes: Fight, Follow only, Stationary target. Live tuning controls cover speed, aggression, attack timing, reach, damage, hit-stun and knockback. Shared attack modifiers affect both sides.

**Audio mix:** effects 90%, music 18% by default, with separate sliders and a master Audio mute. WAV effects are trimmed for leading/trailing silence and peak-balanced on decoding. Heavy impacts receive a modest bass lift and compressor protection. Hits briefly duck the music. Swing sounds play on misses; impact/hurt sounds require contact. Footsteps follow distance-based steps; jump, landing, fall, knockout and shockwave layers are event-driven. The music loops at its original speed, independently of slow motion. The inspector freezes combat and stays silent until returning to free play and pressing Play.

`audio/manifest.json` records the original-to-game filename mappings. Source audio is copied without modifying the supplied originals. All source audio remains in the audio folder as well as being embedded in Promis.html.

Animations remain prototype sprite sequences. Promis's fall reuses a complete existing sprite with rotation. No segmented leg rig is used.

Checks: repeated 1/2/3 wave progression, multi-target hit deduplication, staggered attacks, event mapping, misses versus impacts, step/landing events, optional defeat, pause/resume music offsets, mute, ducking and stopping active audio sources. Browser checked audio startup without decode errors, pause/resume/stop, volume controls and live progression into repeated three-enemy waves.

The record-shop backdrop and new complete-body punch/jump poses were generated with the built-in image generation tool. Assets: record-shop.png and action-poses.png. Prompts: shop-artwork-prompts.txt. Fixtures are scenery; the fighting floor stays clear. Extra checks cover alternating fists, neutral jumps, airborne movement and attacks, and unchanged landing time.


## Vinyl and power moves
- Normal simulation speed is 1.30x on opening, Reset and Stop. T toggles quarter speed / 1.30x; music stays at its original speed.
- J + K within 90 milliseconds: elbow strike. On-screen Elbow button also available. Close range; adjustable damage.
- Double-tap A/D or left/right within 260 milliseconds: shoulder dash in that direction. Hits knock enemies down. Short recovery and 1.05 simulation-second cooldown.
- Rare vinyl starts with three random records on the reachable floor. Another spawns every 5–8 simulation seconds, up to five present.
- Move close and press J to collect instead of punching. A nearby prompt identifies pickups. At full power, records remain on the floor.
- Collect three records to fill SPECIAL POWER, then L performs the larger radial ground blast and spends the charge. The special protects its wind-up; it cannot be used in the air.
- New live tuning: dash speed, elbow damage, blast radius and records per special. Shared reach also scales the blast radius.
- Reset clears charge and creates a new set of vinyl; pausing preserves progress. Inspector previews are free and do not consume charge or deal damage.

Extra whole-character artwork: extra-moves.png, created with the built-in image generation tool. Prompt: six complete Promis poses in a 3-column, 2-row sheet, matching the clean arcade character—elbow wind-up, elbow impact, elbow recovery, two shoulder-dash strides and a crouched vinyl pickup. Keep identity and clothes, clean shading and all figures facing right. Follow-up replaced the background with solid #FF00FF for chroma-key extraction and clarified the bent elbow impact pose.
