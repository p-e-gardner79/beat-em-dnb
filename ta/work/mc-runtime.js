const mcDirector=new MCDirector();
function tickMC(dt){if(lab.inspect||paused||opening)return;const busy=[...fightAudio.voices].some(s=>/^(mc-|corporate-)/.test(s.clip?.name||''));mcDirector.tick(dt,lab,line=>fightAudio.play(line.id,{gain:1.05,x:480}),id=>fightAudio.buffers[id]?.duration||2.5,busy)}
function drawMC(){if(mcDirector.caption&&mcDirector.time<mcDirector.until+.6)setMC(true,mcDirector.caption);else if(entryScene&&lab.clock<4)setMC(true,"YES YES YES! Don't let him take the signal! MASSIVE, ATTACK!");else setMC(false,'MC QC · KEEP THE SIGNAL ALIVE')}
