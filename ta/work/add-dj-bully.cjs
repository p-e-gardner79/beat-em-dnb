const fs=require('fs');function edit(p,fn){fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')))}
edit('work/combat-engine.js',s=>s.replace("['promis','em']","['promis','em','bully']").replace("return this.character==='em'?'DJ Em':'Promis'","return this.character==='bully'?'DJ Bully':this.character==='em'?'DJ Em':'Promis'")
.replace('reset(){this.player=', 'reset(){this.grabTarget=null;this.grabAttempted=false;this.player=')
.replace("if(a.fighter==='em'){const variants", "if(a.fighter==='bully'){const variants={punch:{duration:.52,start:.21,end:.34,damage:14,force:165},kick:{duration:.76,start:.28,end:.46,damage:22,force:270},elbow:{duration:.68,start:.28,end:.43,damage:this.settings.elbowDamage+8,force:280,knockdown:true},dash:{duration:.70,damage:28,force:370},special:{duration:1.40,start:.76,end:.92,damage:50,force:460,reach:this.settings.blastRadius}};return {...m,...variants[a.action]}}if(a.fighter==='em'){const variants")
.replace('set(a,action){a.action=', "releaseGrab(){if(this.grabTarget){const e=this.grabTarget;this.grabTarget=null;e.grabbedBy=false;this.set(e,'idle')}}\n set(a,action){if(a.id==='player'){if(action!=='special')this.releaseGrab();else this.grabAttempted=false}a.action=")
.replace('p.invuln=1.05',"p.invuln=p.fighter==='bully'?1.4:1.05")
.replace('pickup:.32,jump:.71','grabbed:Infinity,pickup:.32,jump:.71')
.replace('height(a){return',"height(a){if(a.grabbedBy){const t=this.player.time;return t<.6?Math.min(1,Math.max(0,(t-.25)/.22))*80:80*Math.max(0,1-(t-.6)/.16)}return")
.replace("special:a.fighter==='em'?", "special:a.fighter==='bully'?'Bass-Slam Drop':a.fighter==='em'?")
.replace("elbow:a.fighter==='em'?", "elbow:a.fighter==='bully'?'hammer blow':a.fighter==='em'?")
.replace("dash:a.fighter==='em'?", "dash:a.fighter==='bully'?'shoulder charge':a.fighter==='em'?")
.replace('this.settings.playerSpeed*(input.run?1.62:1)',"this.settings.playerSpeed*(p.fighter==='bully'?.86:1)*(input.run?1.62:1)")
.replace('p.face*this.settings.dashSpeed*dt',"p.face*this.settings.dashSpeed*(p.fighter==='bully'?.85:1)*dt")
.replace(' for(const a of [p,...this.enemies]){const m=this.moveData(a);',` if(p.fighter==='bully'&&p.action==='special'){if(!this.grabAttempted&&p.time>=.25){this.grabAttempted=true;const candidates=this.enemies.filter(e=>e.hp>0&&!['down','recover','defeated','grabbed'].includes(e.action)&&e.invuln<=0&&(e.x-p.x)*p.face>0&&(e.x-p.x)*p.face<145&&Math.abs(e.y-p.y)<30).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x));if(candidates[0]){this.grabTarget=candidates[0];this.set(this.grabTarget,'grabbed');this.grabTarget.grabbedBy=true;this.grabTarget.vx=0;this.grabTarget.flight=null}}if(this.grabTarget){this.grabTarget.x=p.x+p.face*105;this.grabTarget.y=p.y;this.grabTarget.face=-p.face;if(p.time>=.76)this.releaseGrab()}}
 for(const a of [p,...this.enemies]){const m=this.moveData(a);`)
.replace("!['down','defeated'].includes(e.action)","!['down','defeated','grabbed'].includes(e.action)"));
edit('work/combat-runtime.js',s=>s.replace('emSprites=[],enemySprites=[]','emSprites=[],bullySprites=[],enemySprites=[]').replace('ready=false,emLoaded','ready=false,bullyLoaded=false,emLoaded')
.replace('&&emWalkLoaded;','&&emWalkLoaded&&bullyLoaded;')
.replace('function actorSequence(a){',`const bullySequences={...emSequences,walk:{frames:[1,2,3,4],times:[.18,.18,.18,.18]},elbow:{frames:[12,19,20],times:[.28,.15,.25]},dash:{frames:[13,17,20],times:[.20,.14,.36]},special:{frames:[17,18,18,19,20],times:[.25,.35,.16,.20,.44]}};
function actorSequence(a){if(a.fighter==='bully'){if(a.action==='punch')return {frames:a.flight!==null?[14,15,14]:[5,a.hand?7:6,20],times:[.21,.13,.18]};if(a.action==='kick')return {frames:a.flight!==null?[14,16,14]:[8,9,11,20],times:a.flight!==null?[.28,.18,.30]:[.28,.18,.16,.14]};return bullySequences[a.action]||bullySequences.idle}`)
.replace("case'hurt':return", "case'grabbed':return 8;case'hurt':return")
.replace("a.fighter==='em'?emSprites:sprites", "a.fighter==='bully'?bullySprites:a.fighter==='em'?emSprites:sprites")
.replace("a.fighter!=='em'&&['down'", "a.fighter==='promis'&&['down'")
.replace("function ring(r){",`function ring(r){if(r.fighter==='bully'){ctx.save();const t=r.age/.7;ctx.globalAlpha=1-t;ctx.strokeStyle='#3f3930';ctx.lineWidth=3;for(let i=0;i<12;i++){const angle=i*2.399;ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+Math.cos(angle)*80,r.y+Math.sin(angle)*24);ctx.lineTo(r.x+Math.cos(angle+.12)*150,r.y+Math.sin(angle+.12)*48);ctx.stroke();ctx.fillStyle='#b59e78';const dist=30+t*170;ctx.fillRect(r.x+Math.cos(angle)*dist,r.y+Math.sin(angle)*dist*.35-Math.sin(t*Math.PI)*40,10,8)}ctx.restore()}`)
.replace("lab.character==='em'?'L · SYNAPTIC KICK READY'", "lab.character==='bully'?'L · BASS-SLAM READY':lab.character==='em'?'L · SYNAPTIC KICK READY'")
.replace("const em=lab.character==='em';", "const em=lab.character==='em',big=lab.character==='bully';")
.replace("textContent=em?'DJ EM'", "textContent=big?'DJ BULLY':em?'DJ EM'")
.replace("textContent=em?'DJ Em ·", "textContent=big?'DJ Bully · heavy fists, hammer blow, shoulder charge and grab-and-slam special.':em?'DJ Em ·")
.replace("textContent=em?'Rising knee ·", "textContent=big?'Hammer blow · J + K':em?'Rising knee ·")
.replaceAll("textContent=em?'Synaptic Kick'", "textContent=big?'Bass-Slam Drop':em?'Synaptic Kick'")
.replace("textContent=em?'Forward electrical burst'", "textContent=big?'Grab, lift and ground burst':em?'Forward electrical burst'")
.replace("textContent=em?'Kick combo'", "textContent=big?'Heavy boot':em?'Kick combo'")
.replace("textContent=em?'Tap K twice: front → side'", "textContent=big?'Heavy front kick':em?'Tap K twice: front → side'")
.replace("textContent=em?'Rising knee':'Elbow'", "textContent=big?'Hammer blow':em?'Rising knee':'Elbow'")
.replace("textContent=em?'Advancing kick'", "textContent=big?'Shoulder charge':em?'Advancing kick'"));
edit('work/build-combat.cjs',s=>s.replace('<option value="em">DJ Em</option>','<option value="em">DJ Em</option><option value="bully">DJ Bully</option>').replace("fs.readFileSync('work/em-loader.js','utf8');","fs.readFileSync('work/em-loader.js','utf8')+'\\n'+fs.readFileSync('work/dj-bully-loader.js','utf8');").replace("['EM_ATLAS_DATA'","['DJ_BULLY_DATA','dj-bully-clean.png'],['EM_ATLAS_DATA'").replace('elbow / rising knee.','elbow / rising knee / hammer blow.'));
let loader=fs.readFileSync('work/em-loader.js','utf8');loader=loader.replaceAll('loadEmImage','loadBullyImage').replaceAll('emSprites','bullySprites').replaceAll('DJ Em','DJ Bully').replace('239/boxes[0].height','263/boxes[0].height').replace('[0,270/1536,514/1536,769/1536,1017/1536,1255/1536,1]','[0,256/1536,500/1536,733/1536,985/1536,1225/1536,1]').replace(/const anchors=\[[^;]+;/,'const anchors=[130,385,630,885,130,385,610,855,125,340,610,875,125,375,640,880,110,370,620,880,125,375,625,890];').replace(/row===4\?\[0,286\/1024,\.5,716\/1024,1\]:row===5\?\[0,\.25,480\/1024,\.75,1\]:\[0,\.25,\.5,\.75,1\]/,"row===1?[0,.25,505/1024,.735,1]:row===5?[0,.25,475/1024,.75,1]:[0,.25,.5,.75,1]").replace('if(walk)emWalkLoaded=true;else emLoaded=true;','bullyLoaded=true;').replace("loadBullyImage('EM_ATLAS_DATA');loadBullyImage('EM_WALK_DATA',true);","loadBullyImage('DJ_BULLY_DATA');");fs.writeFileSync('work/dj-bully-loader.js',loader);
