# Exit scenery refinement — 26 September 2026

Implemented detailed door, recessed staircase and cage assets in `scene-exits.js`.

- Zone 1 camera holds at the right-hand stockroom exit. Three hits (or special) break the door. Walking into it starts a 3.2-second walk-through, then cuts to Zone 2.
- Zone 2 uses a new stockroom background. Approaching the right-hand stairs starts a 6.2-second walk/descent; the foreground masonry and rail occlude the hero before the cut to Zone 3.
- Dean remains visible, tied up behind the cage bars; the gate opens during the existing rescue.
- Two former pre-stockroom travel ambushes are now mixed corporate/bouncer reinforcements in the aisle encounter. The earlier shop travel ambushes remain. The three-enemy cap remains.

Artwork generated with ImageGen from the existing game context and user references:
- stockroom-exit-v3.png: paired registered closed/breached worn oak stockroom door, brass plaque, detailed brick surround, broken timber and threshold; dense arcade pixel rendering.
- stockroom-stairs-v3.png: record-shop stockroom with crates, weathered masonry and recessed stairs descending down-right behind a low brick parapet and iron railing; edited posters to Jungle / D&B themes.
- dean-cage-v3.png: rusted riveted steel cage, hinged front gate, lock and wood base, SEIZED STOCK plaque; edited background and bar gaps to magenta for runtime keying. Gate and frame are separated by the runtime loader.

Validation: built bundle; all-four-character campaign progression, fixed-door interaction/cut timing, stair timing, enemy cap, bouncers/weapons and heist regression tests passed. Browser screenshots checked the closed/breached door, descending character behind the stairwell, captive Dean and opened cage.
