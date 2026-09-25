# MC QC combat commentary

27 supplied MP3 recordings are embedded in Promis.html (60 total audio assets). Original filenames and source mappings are retained in audio/manifest.json; phrase groups and captions are in work/mc-lines.json.

Events: nearby hostile enemy behind the player in the same fighting lane; enemies on both sides; ordinary hits; three distinct attack hits within 2.5 seconds; knockdowns; full vinyl meter; special hits; cleared waves.

Ordinary commentary waits 12–20 seconds after the previous line finishes. Urgent warnings/full-charge notifications may speak after a shorter five-second gap, but never interrupt another spoken line. Warnings have highest priority. Each enemy can trigger only one rear warning per run. Encirclement has a 24-second cooldown. Expired reactions are discarded instead of replayed late. Shuffled phrase pools use every alternative before reusing one, and avoid repetition across pool boundaries.

Captions and hype portrait follow the selected clip. Intro dialogue is protected from gameplay chatter. Pause resumes recorded speech from its saved offset; reset/stop/skip clear it. Music retains its existing independent 80% mix and effects 85%.

Verified: all 60 buffers decode without errors in browser; contextual rear warning starts exactly one MC source and matching caption. Tests cover cooldowns, threats, lane separation, stale expiry, shuffle rotation, speech exclusion, ready meter, audio resume, and existing opening/heist checks.
