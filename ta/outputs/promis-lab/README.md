# Promis — Endless combat and audio lab

Open **Promis.html** in a browser. The single HTML file contains every sprite, 22 supplied sound effects and the supplied Insert Coin To Win soundtrack, so it also works offline.

Press **Play** or **P** to start the test and music. The page opens silent and paused. Audio decoding happens on the first Play.

- WASD / arrows: move. Shift: run. J: punch (tap to chain). K: kick. L: shockwave. Space: jump.
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

## Record shop update
1995 jungle record-shop backdrop; alternating fist punches. Space jumps neutrally. Press J or K during the jump for an aerial attack (one per jump). See COMBAT-CONTROLS.md for all controls.
