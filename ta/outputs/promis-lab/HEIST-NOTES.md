# The Dubplate Heist

The 11-second exterior now leads into a 10-second interior scene (21 seconds total). Timing uses wall-clock time and is unaffected by the combat speed slider.

- 0–1.5s: entry recovery, settling wood, dust and quiet shop ambience.
- 1.5–4s: gold crate search and glowing Master Dubplate reveal.
- 4–7.5s: phone gesture, mocking shoulder movement and readable taunt.
- 7.5–10s: escape, discarded vinyl, MC QC hype caption and combat handoff.

MC QC has idle and hype portrait states, with a small animated hype bounce. His panel remains visible in fullscreen. Vocals are intentionally deferred. The combat HUD fades in, FIGHT flashes, and two enemies descend before the repeating waves continue. Score awards 100 per hit and 500 per knockout. Existing vinyl powers Rage / Special.

Effects remain 85%, music 80%; soundtrack remains independent of impact compression. The shop interlude quiets the music and uses synthesized hum/item cues; combat restores the soundtrack. No audio begins on page load.

## Artwork

Built-in image generation mode was used. Final transparent six-pose atlas: `heist-atlas.png`, embedded in `Promis.html` for offline use.

Production prompt brief (reconstructed summary): Create a clean, detailed 16-bit arcade sprite atlas matching the established game. Three columns by two rows, six separate poses, transparent background, no text or frames. Top row: MC QC waist-up with microphone, white T-shirt, gold chain and slicked black hair; MC QC hype pose with arm raised; full-body grey pinstriped A&R suit rummaging. Bottom row: suit raising a glowing white-label record with brick mobile in the other hand; suit pointing his phone while holding the record under his arm; suit running right with the stolen record. Maintain consistent anatomy and character identity, clear faces, restrained outlines, crisp pixels and generous separation between cells.

Final edit brief: preserve poses/style; improve cell separation, with a uniform removable background. The returned PNG supplied transparency, which is preserved in the project asset.

## Validation

Passed: heist timing/once-only cues/all four character selections/drop height, existing exterior opening and syntax checks, audio mixing checks, endless-wave regression, vinyl/move regression. Browser verified reveal, taunt, full exterior-to-interior-to-combat transition, first-wave frame, MC hype and fullscreen panel; no runtime errors observed.

Legacy `test-combat.cjs` still assumes the old unlimited 25-damage special and single-enemy end-of-round behavior; its first failing expectation is obsolete (the current game requires vinyl and deals 40 damage). Current wave and vinyl tests cover these mechanics.
