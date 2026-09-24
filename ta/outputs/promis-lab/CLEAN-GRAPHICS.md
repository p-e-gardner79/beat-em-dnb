# Cleaner arcade graphics

The working game is Promis.html. It embeds all artwork and audio and opens paused.

- Drawing resolution: 1920 × 940, with the original 960 × 470 gameplay coordinates and character sizes.
- Sprite crops retain source detail rather than being reduced to half size before enlargement.
- The shop uses its full-resolution image rather than a 480 × 235 intermediate copy.
- Scanline opacity reduced from 13% to 3.5%.
- Combat timing, hitboxes, movement, alternating fists, deliberate aerial attacks, enemy waves and audio behaviour are unchanged.

## Artwork

Created using the built-in image generation tool. The approved Cleaner Arcade comparison guided the initial pass. Original artwork remains alongside the new assets.

- [Promis main poses](sprite-atlas-clean.png)
- [Promis walking](walk-frames-clean.png)
- [Punch and jump poses](action-poses-clean.png)
- [Corporate Bully](bully-atlas-clean.png)
- [Record shop](record-shop-clean.png)

## Prompts

Initial shared style pass: Edit the existing game asset using the right-hand Cleaner Arcade panel as style reference. Preserve exact canvas aspect ratio, every pose, position, scale, silhouette, spacing, clothing, identity and object arrangement. Use thinner selective coloured edges, crisp faces and hands, defined fabric folds, clear colour clusters, and less speckled texture. No blur, vector/3D treatment, or baked scanlines. Keep the sprite-sheet grid unchanged.

Shop final prompt: Clean up this 1995 arcade record-shop background: dramatically reduce speckled noise on floor and wooden bins; retain broad subtle floor cracks and muted warm grey colour. Crisp finer pixel art, clear sleeves and turntables, lower background contrast. Keep EXACT shop layout, framing and empty lower-half floor. No characters, HUD, text captions, scanlines or comparison panels.

Action poses final prompt: Refine the entire 4 column 2 row 8-character sprite sheet in place. Preserve EVERY pose, scale, location, near/far alternating punching arms and tucked jump legs. Thin coloured selective edges instead of thick black outlines; dark olive jacket, navy jeans, brown skin shadows. Crisp finer arcade pixel art, defined faces and hands, calm colour shading without speckle. Genuine transparent alpha background, NO backdrop or shadows. Keep exact canvas aspect ratio and sprite layout.

Bully final prompt: Refine the entire 4 column 3 row 12-character sprite sheet in place. Preserve EVERY pose, scale, location, phone, briefcase, slicked brown hair, grey pinstripe suit and character identity. Thin coloured selective edges instead of thick black outlines; charcoal suit edges, brown skin shadow edges. Crisp finer arcade pixel art, defined faces and hands, calm colour shading without speckle. Genuine transparent alpha background, NO backdrop or shadows. Keep exact canvas aspect ratio and sprite layout.

Main atlas background correction: REPLACE THE ENTIRE BACKGROUND with perfectly flat solid neon magenta #FF00FF. Absolutely no brown, grey, gradient, floor, glow backdrop or scenery anywhere between the characters. Keep every character, clothing and pose unchanged, same exact positions in 6 columns 4 rows on 1536x1024 canvas. Preserve the cyan special-move glow around the fist only. This is a chroma-key game sprite sheet and must have a SOLID MAGENTA BACKGROUND. The loader removes magenta when extracting frames.

Validation: all 48 extracted frames visually reviewed; mechanics, enemy-wave and audio regression checks passed.
