# Level 1 refinement — 26 September 2026

Three main zones: shop floor (including vinyl aisles), stockroom, basement. Internal encounter checkpoints remain separate for shorter retries.

- Stockroom partition: three successful attacks break the door; one charged special also works. Approach facing right and use J or K. Door stays open for the remainder of the run.
- Four extra scrolling ambushes mix corporate phone/briefcase fighters with bouncers. Encounter camera locks during these fights. Maximum three living enemies.
- Once the stockroom is clear, move up and right towards the visible stairs. The descent then plays automatically.
- Dean is tied to a stool inside a visible cage during the boss encounter. Pick up Reginald's key with J, then approach the cage. The player unlocks it, Dean leaves, cues his 1210 and performs the rewind.
- New Dean walk/pass and restrained sprites; walking animation used in both the release and handover.
- Continue after Vibe Check to board the Fiesta, shut the door, rev the engine and drive left. Wheel rims rotate on departure, journey and the moving tower approach, using source-atlas hub coordinates.
- Opening thief enlarged from 190 to about 231 logical pixels, including the escape cycle.

Validation: four-fighter progression simulation covers the mixed spawns, four road encounters, maximum enemy count, actual kick-based door breaking, automatic stairs, boss phases, key pickup, cage approach, boarding and checkpoint reset. Existing opening, heist, bouncer, audio and MC checks also pass. Browser inspection covered the doorway, descent, visible captive, boarding and wheel alignment.

Keep `dean-story-v2.png` with the HTML and the other external level images when copying the game.

## Artwork provenance

Built-in image-generation mode, using `level-cast-motion-key.png` as the character reference. Final atlas: `dean-story-v2.png`. Prompt requested six isolated sprites in a 3×2 layout: four walking/contact/passing poses carrying a record, Dean restrained on a stool, and a neutral record-holding pose, preserving the bomber jacket, beard, jeans and trainers. Background-removal attempts produced a gradient; the accepted final edit explicitly requested a uniform opaque hot-pink `#FF00FF` background, preserving all six figures. Runtime chroma-keying removes that background. Scenery materials and wheel rims reuse existing game artwork through canvas rendering.
