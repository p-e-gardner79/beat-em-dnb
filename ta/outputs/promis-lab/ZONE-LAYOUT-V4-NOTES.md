# Zone layout refinement v4 — 26 September 2026

## Implementation
- Zone 1 final encounter forces every enemy entrance to the left; the final shop travel approach also stops using the right entrance.
- Stockroom door uses a narrower angled sprite and threshold, with a brick wall behind it. Closed and breached variants share placement. Break / walk-through / cut is unchanged.
- Zone 2 now spans 2,880 logical pixels (three screen widths), with 1,920 pixels of camera travel, an initial encounter and three mixed corporate/bouncer travel encounters. Camera locks for each encounter. Three-enemy limit remains.
- Final stockroom approach forces left entrances. After the last encounter, approaching the left end of the staircase starts automatic left-to-right descent. Foreground rail and parapet mask the actor until they disappear, then Zone 3 begins.
- Checkpoint retry resets the stockroom route and encounters.

## Artwork provenance
Built-in ImageGen was used; final assets are beside Promis.html:
- stockroom-exit-key-v4.png
- stockroom-corridor-v4.png
- stockroom-stairs-v4.png
Original v3 assets remain for recovery; the v3 door also supplies the wall texture.

Prompt set:
1. Edit the paired door sprite sheet for a 16-bit arcade brawler. Two equal halves: closed oak STOCKROOM door and breached dark opening. Both set into a right side wall at a slight oblique angle; vertical jambs, lintel and threshold slope down toward the right about 12 degrees. Narrow brick margin, recessed worn oak, brass plaque, rusty hinges and splinters. Same geometry and registration; no floor rectangle or UI.
2. Replace only the brown exterior around both angled door silhouettes with uniform RGB 255,0,255, including above lintels and below thresholds. Preserve all details and black doorway interior. The runtime keys this exterior.
3. Edit the stockroom background keeping dense arcade pixel style, amber lighting and record-storage setting. Stairwell at far right is side-on: top step at left, steps descend left-to-right across screen rather than toward viewer. Near railing and low brick parapet run horizontally, hiding lower steps. No character or HUD; left floor stays clear.
4. Create a 3:1 scrolling corridor extension matching the stockroom reference: long back wall with varied vinyl shelves, Jungle/D&B/dubplate crates, speaker cases, cables, brick columns, pipes and loading shutter; warm industrial lighting. Wall-floor join around 53 percent, uninterrupted concrete floor below. No stairs, characters or HUD; side-view arcade architecture.

## Verification
All-four-character campaign progression passed, including five total travel encounters (two shop / three stockroom), enemy cap, doors, stair cut, boss, rescue and retry. Added specific tests for forced left entrances at solid end walls, stockroom camera movement and reset. Bouncer/weapons and opening tests passed. Browser inspected angled door, stockroom corridor join and sideways descent. Browser console errors checked on final game load.
