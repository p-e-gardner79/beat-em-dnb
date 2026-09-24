const fs=require('fs');function edit(p,fn){fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')))}
edit('work/combat-engine.js',s=>s.replace("['promis','em','bully']","['promis','em','bully','change']").replace("return this.character==='bully'?", "return this.character==='change'?'DJ Change':this.character==='bully'?")
.replace("if(a.fighter==='bully'){const variants", "if(a.fighter==='change'){const phase=a.time<.38?0:a.time<.60?1:2;const variants={punch:{duration:.30,start:.10,end:.18,damage:7,force:65},kick:{duration:.34,start:.11,end:.21,damage:10,force:60},elbow:{duration:.40,start:.12,end:.24,damage:this.settings.elbowDamage-3,force:145},dash:{duration:.52,start:.20,end:.34,damage:16,force:285,reach:125},special:{duration:1.05,start:[.18,.38,.60][phase],end:[.28,.48,.78][phase],reach:145,depth:30,damage:phase===2?26:8,force:phase===2?340:35,knockdown:phase===2}};return {...m,...variants[a.action]}}if(a.fighter==='bully'){const variants")
.replace('a.hitTargets=new Set();if(action', 'a.hitTargets=new Set();a.burstPhase=-1;if(action')
.replace("if(p.fighter==='em'&&p.action==='kick'", "if(['em','change'].includes(p.fighter)&&p.action==='kick'")
.replace("if(a.action==='special'){const depth", "if(a.action==='special'&&a.fighter!=='change'){const depth")
.replace("special:a.fighter==='bully'?", "special:a.fighter==='change'?'Tempo Burst':a.fighter==='bully'?")
.replace("elbow:a.fighter==='bully'?", "elbow:a.fighter==='change'?'turning backfist':a.fighter==='bully'?")
.replace("dash:a.fighter==='bully'?", "dash:a.fighter==='change'?'dash thrust':a.fighter==='bully'?")
.replace("(p.fighter==='bully'?.86:1)","(p.fighter==='change'?1.14:p.fighter==='bully'?.86:1)")
.replace("(p.fighter==='bully'?.85:1)","(p.fighter==='change'?1.15:p.fighter==='bully'?.85:1)")
.replace(" for(const a of [p,...this.enemies]){if(a.flight",` if(!this.over&&p.fighter==='change'&&p.action==='special'){
 const phase=p.time<.38?0:p.time<.60?1:2;if(phase!==p.burstPhase){p.burstPhase=phase;p.hitTargets=new Set();p.impact=false}
 if(p.time>=.12&&p.time<.60){let distance=this.settings.dashSpeed*.95*dt;for(const foe of this.enemies){const gap=(foe.x-p.x)*p.face;if(foe.hp>0&&!['down','defeated'].includes(foe.action)&&Math.abs(foe.y-p.y)<30&&gap>0)distance=Math.min(distance,Math.max(0,gap-95))}p.x=Math.max(135,Math.min(825,p.x+p.face*distance))}
 }
 for(const a of [p,...this.enemies]){if(a.flight`));
edit('work/combat-runtime.js',s=>s.replace('bullySprites=[],enemySprites=[]','bullySprites=[],changeSprites=[],enemySprites=[]').replace('ready=false,bullyLoaded','ready=false,changeLoaded=false,bullyLoaded').replace('&&bullyLoaded;','&&bullyLoaded&&changeLoaded;')
.replace('function actorSequence(a){',`const changeSequences={...emSequences,walk:{frames:[1,2,3,4],times:[.18,.18,.18,.18]},elbow:{frames:[5,12,20],times:[.12,.12,.16]},dash:{frames:[13,19,20],times:[.20,.14,.18]},special:{frames:[17,18,6,18,7,18,19,20],times:[.12,.06,.10,.10,.10,.12,.18,.27]}};
function actorSequence(a){if(a.fighter==='change'){if(a.action==='punch')return {frames:a.flight!==null?[14,15,14]:[5,a.hand?7:6,20],times:[.10,.08,.12]};if(a.action==='kick')return {frames:a.flight!==null?[14,16,14]:[8,a.kickVariant?10:9,11],times:[.11,.10,.13]};return changeSequences[a.action]||changeSequences.idle}`)
.replace("a.fighter==='bully'?bullySprites:","a.fighter==='change'?changeSprites:a.fighter==='bully'?bullySprites:")
.replace('function ring(r){',"function ring(r){if(r.fighter==='change')return;")
.replace('drawVinyl();rings.forEach(ring);',`drawVinyl();rings.forEach(ring);if(lab.player.fighter==='change'&&['dash','special'].includes(lab.player.action)&&lab.player.time>.12&&lab.player.time<.8){for(let i=3;i>=1;i--){ctx.save();ctx.globalAlpha=.16*(1-i/4);ctx.filter='sepia(1) saturate(4) hue-rotate(135deg)';drawActor({...lab.player,x:lab.player.x-lab.player.face*i*25});ctx.restore()}ctx.save();ctx.strokeStyle='#6deaff';ctx.globalAlpha=.65;ctx.lineWidth=2;for(let i=0;i<5;i++){const x=lab.player.x-lab.player.face*(30+i*8),y=lab.player.y-65-i*25;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-lab.player.face*(45+i*8),y);ctx.stroke()}ctx.restore()}`)
.replace("lab.character==='bully'?'L · BASS-SLAM READY'", "lab.character==='change'?'L · TEMPO BURST READY':lab.character==='bully'?'L · BASS-SLAM READY'")
.replace("const em=lab.character==='em',big=lab.character==='bully';", "const em=lab.character==='em',big=lab.character==='bully',fast=lab.character==='change';")
.replace("textContent=big?'DJ BULLY'", "textContent=fast?'DJ CHANGE':big?'DJ BULLY'")
.replace("textContent=big?'DJ Bully ·", "textContent=fast?'DJ Change · quick punches, Rewind Kicks, turning backfist and Tempo Burst.':big?'DJ Bully ·")
.replace("textContent=big?'Hammer blow ·", "textContent=fast?'Backfist · J + K':big?'Hammer blow ·")
.replaceAll("textContent=big?'Bass-Slam Drop'", "textContent=fast?'Tempo Burst':big?'Bass-Slam Drop'")
.replace("textContent=big?'Grab, lift and ground burst'", "textContent=fast?'Rush, rapid strikes, final thrust':big?'Grab, lift and ground burst'")
.replace("textContent=big?'Heavy boot'", "textContent=fast?'Rewind Kick':big?'Heavy boot'")
.replace("textContent=big?'Heavy front kick'", "textContent=fast?'Tap K repeatedly to chain':big?'Heavy front kick'")
.replace("textContent=big?'Hammer blow':", "textContent=fast?'Turning backfist':big?'Hammer blow':")
.replace("textContent=big?'Shoulder charge'", "textContent=fast?'Dash thrust':big?'Shoulder charge'")
.replace("canvas.setAttribute('aria-label'", "$('sequence').querySelector('[value=\"kick\"]').textContent=fast?'Rewind Kick':big?'Heavy boot':em?'Kick combo':'High kick';canvas.setAttribute('aria-label'"));
edit('work/audio-system.js',s=>s.replace("if(e.weapon!=='special')", "if(e.weapon==='special'&&e.fighter==='change')this.play('punch-hit',{gain:e.big?1:.75,x:e.x,heavy:e.big});if(e.weapon!=='special')").replace("if(e.type==='shockwave'){", "if(e.type==='shockwave'&&e.fighter==='change'){this.play('punch-swing',{gain:.7,x:e.x});this.play('burst',{gain:.18,x:e.x});return}if(e.type==='shockwave'){"));
edit('work/build-combat.cjs',s=>s.replace('<option value="bully">DJ Bully</option>','<option value="bully">DJ Bully</option><option value="change">DJ Change</option>').replace('elbow / rising knee / hammer blow.','elbow / rising knee / hammer blow / backfist.').replace("fs.readFileSync('work/dj-bully-loader.js','utf8');","fs.readFileSync('work/dj-bully-loader.js','utf8')+'\\n'+fs.readFileSync('work/dj-change-loader.js','utf8');").replace("['DJ_BULLY_DATA'","['DJ_CHANGE_DATA','dj-change-clean.png'],['DJ_BULLY_DATA'"));
let loader=fs.readFileSync('work/dj-bully-loader.js','utf8').replaceAll('loadBullyImage','loadChangeImage').replaceAll('bullySprites','changeSprites').replaceAll('bullyLoaded','changeLoaded').replaceAll('DJ Bully','DJ Change').replace('263/boxes[0].height','235/boxes[0].height').replace('[0,256/1536,500/1536,733/1536,985/1536,1225/1536,1]','[0,1/6,2/6,3/6,4/6,5/6,1]').replace(/const anchors=\[[^;]+;/,'const anchors='+JSON.stringify([175,540,900,1270,175,540,895,1270,175,515,880,1250,175,540,900,1260,145,540,900,1250,175,540,900,1270].map(x=>x*1024/1448))+';').replace(/row===1\?\[0,\.25,505\/1024,\.735,1\]:row===5\?\[0,\.25,475\/1024,\.75,1\]:\[0,\.25,\.5,\.75,1\]/,'[0,.25,.5,.75,1]').replace('DJ_BULLY_DATA','DJ_CHANGE_DATA');fs.writeFileSync('work/dj-change-loader.js',loader);
