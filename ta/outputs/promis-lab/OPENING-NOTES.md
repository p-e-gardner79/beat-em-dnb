# Level 1 opening — Record Shop Riot

11 seconds of wall-clock animation, unaffected by the combat speed slider: arrival 3.5 seconds; exit 3 seconds; breach 2.5 seconds; title/transition 2 seconds.

Choose a fighter and press Start level. Space, Enter or Skip intro skips to the interior. P pauses/resumes. Reset prepares a fresh opening. Select Mechanics lab and Play to bypass the cinematic. Music starts only on Start/Play; Stop resets playback.

Audio defaults: effects 85%, music 80%. Music bypasses the effects compressor and heavy hits no longer duck it. A fixed output headroom gain reduces clipping risk. The existing Steel Grate Ambush track swells during the arrival and settles for gameplay. Engine, skid and door crack are synthesized temporary effects; existing ElevenLabs impacts and effort sounds are reused.

Selected hero performs the exit and breach; the other three remain in the car. Existing full-character poses drive the roll, walk and kick. The exterior has no bouncers. The new interior Dubplate Heist precedes the first combat wave; see HEIST-NOTES.md.

## Artwork generation prompts

### Exterior
Wide 2:1 16-bit arcade beat-em-up pixel art background, dramatic low street-level camera outside a 1995 London jungle drum and bass record shop named UNDERGROUND VINYL. Match attached interior's deep green signage, warm wooden frames, vinyl racks visible through large windows, pasted jungle rave flyers, dark brick architecture, gold details, dusk teal sky. Shop fills scene, sign clearly says UNDERGROUND VINYL. Shop entrance at 72% image width, door straight rectangular wooden frame with glass top, bottom at 65% image height, top at 30%. Wide empty asphalt foreground bottom35%, curb and sidewalk. Plenty empty street for a car stunt. No cars, no people, no smoke, no overlays. Rich deep colors crisp pixel detail, traditional arcade stage art, cohesive with attached interior. Door visible and unobstructed.

### Fiesta atlas
Game sprite atlas of a maroon dark red 1993 FORD FIESTA MK3 three-door hatchback, slightly lowered alloy wheels, square headlights and classic rounded boxy Mk3 silhouette. Clean detailed 16-bit arcade pixel art. Exact 2 columns x3 rows, SIX separate complete vehicles, same scale, isolated on solid flat medium GREY #808080 background. No shadows, floor, people, smoke, text or borders. Row1 left: side view front points RIGHT, all doors shut; row1 right: front three-quarter view nose right and towards viewer. Row2 left: head-on FRONT view; row2 right: front three-quarter view nose LEFT. Row3 left: side view nose LEFT all doors shut; row3 right: same side view nose LEFT but near-side passenger door swung OPEN towards viewer, dark doorway and interior visible. Windows dark glass simple large clean shapes for later character overlays. All complete cars with generous margins, exact equally-sized grid cells. Consistent maroon car throughout, no perspective floor. High resolution crisp restrained pixel shading.

Images generated with the imagegen skill; originals retained as intro-exterior.png and intro-fiesta.png. Runtime removes background-connected gray from the Fiesta atlas and crops its six frames. The production HTML embeds images, music and sound effects for offline use.

Cabin revision: occupants now use the playable walking sprite artwork directly, replacing the separate seated portraits. All six car angles have cabin masks and occupant positions. The open door and seat are composited in front of intact occupants. Car rotation sizing is capped to prevent front-view enlargement. Browser inspection covered arrival, both quarter-turn angles, front, stopped and open-door views. Intro timing remains 11 seconds.

Opening cleanup: removed exterior tumbling bouncers, interior decorative bodies and breach landing sounds. Regular combat enemies remain. Seated bodies now extend below the torso with character-specific bent legs; the foreground seat patch no longer hides the waist. Verified seated Promis, the breach and the interior arrival in-browser.
