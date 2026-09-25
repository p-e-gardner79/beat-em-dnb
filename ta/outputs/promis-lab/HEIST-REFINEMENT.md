# Heist refinement

Implemented: detailed wooden crate, grounded player entrance (2 seconds), first corporate wave entering from the left, five-frame thief running cycle, steady music during theft, MC QC overlay at bottom left, eight supplied effects and both MP3 voices.

Timeline: exterior 11s; interior 16.2s; total 27.2s. Search 2s, discovery 3.5s, corporate dialogue 4.5s, laugh 8.9s, escape 10.8s, MC voice 11.8s, FIGHT 16.2s. Interior music multiplier stays at 1. Effects 85%, music 80%. Voice/effect clips resume from their saved position after pause and stop on skip/reset.

Audio files are copied into audio/ and embedded into Promis.html. MP3 voices decode directly in Web Audio without conversion. Corporate duration 4.31s; MC duration 4.68s. Music remains independent of effect compression.

Artwork generated using built-in image generation. Saved final atlas: heist-refined.png.

## Generation prompt
Create a transparent sprite atlas for this existing detailed clean 16-bit arcade brawler, matching the attached grey pinstripe corporate thief exactly. 3 columns and 2 rows equal cells, six separate assets on transparent background with generous empty padding. First FIVE cells in reading order: five consecutive full-body running cycle frames of the corporate thief running RIGHT, slick brown hair grey pinstripe suit white shirt black tie black shoes, black vinyl with white label securely under left arm, brick mobile in right hand. Same character dimensions, side view, consistent head height and scale. Visibly different alternating leg poses: left contact, left passing, right contact, right passing, flight. Fully drawn limbs, no motion trails, no text. Sixth cell bottom right: a richly detailed wooden record crate in three-quarter arcade perspective, aged honey oak planks with grain, dovetail edges, metal corner fittings and handles, filled with individual assorted vintage cardboard record sleeves and visible round vinyl edges; restrained golden rim highlights, not a glowing geometric cube. Transparent background everywhere outside sprites. Preserve the existing facial identity and clean pixel shading.

## Final edit prompt
Edit this sprite atlas ONLY frames 2 (top middle) and 4 (bottom left). They must depict OPPOSITE leg contact to frames1/3: the NEAR leg trails backward stretched behind left, FAR leg thrust forward toward right. Reverse which leg leads. Frame2 both feet under hips passing, near knee high tucked behind, far shoe planted under chest. Frame4 near leg straight back left and far knee reaching forward right. Preserve faces, upper bodies, scale, held vinyl, phone, transparency, crate, all other frames exactly. This is a RUN CYCLE so leg silhouettes must substantially change instead of every pose having the same forward near leg.

## Checks
Passed: heist cue timings, four character selections, grounded left entrance, 33 audio mappings, cinematic pause/resume/skip, exterior opening, wave regressions, embedded JS syntax. Existing pre-vinyl test-combat.cjs remains obsolete as documented in HEIST-NOTES.md.

