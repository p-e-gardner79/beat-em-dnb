const fs=require('fs');
function edit(file,fn){fs.writeFileSync(file,fn(fs.readFileSync(file,'utf8')))}
edit('work/combat-engine.js',s=>s.replace("this.settings={...DEFAULTS}","this.character='promis';this.settings={...DEFAULTS}")
.replace("get enemy(){","selectCharacter(name){if(!['promis','em'].includes(name))return false;this.character=name;this.reset();return true}\n get playerName(){return this.character==='em'?'DJ Em':'Promis'}\n get enemy(){")
.replace("punchCount:0,hand:0","fighter:id==='player'?this.character:null,kickCount:0,kickVariant:0,punchCount:0,hand:0")
.replace("return {...m,damage:","if(a.fighter==='em'){const variants={punch:{duration:.36,start:.13,end:.23,damage:8},kick:a.kickVariant?{duration:.66,start:.25,end:.40,reach:165,damage:19,force:250}:{duration:.48,start:.17,end:.29,reach:145,damage:13,force:165},elbow:{duration:.48,start:.13,end:.25,reach:82,damage:this.settings.elbowDamage+2,force:210},dash:{damage:23,reach:125},special:{duration:1.12,start:.43,end:.91,reach:this.settings.blastRadius,depth:70,damage:42,force:440}};return {...m,...variants[a.action]}}return {...m,damage:")
.replace("if(action==='punch')a.hand", "if(action==='kick')a.kickVariant=a.kickCount++%2;if(action==='punch')a.hand")
.replace("weapon:action,who:a.id", "weapon:action,fighter:a.fighter,who:a.id")
.replace("if(p.action==='punch'&&action==='punch')", "if(p.fighter==='em'&&p.action==='kick'&&action==='kick'){this.queue='kick';return true}if(p.action==='punch'&&action==='punch')")
.replace("return MOVES[a.action]?.duration", "return this.moveData(a)?.duration")
.replace("if(a.action==='special'){const depth", "if(a.action==='special'&&a.fighter==='em'){const progress=Math.max(0,Math.min(1,(a.time-m.start)/(.7*.72))),extent=Math.max(75,reach*progress);return {x:a.face>0?a.x+10:a.x-extent,y:a.y-m.depth,w:extent-10,h:m.depth*2,radial:false}}if(a.action==='special'){const depth")
.replace("?'Promis':'Corporate Bully'", "?this.playerName:'Corporate Bully'")
.replace("this.message='PROMIS DOWN — R to reset'", "this.message=this.playerName.toUpperCase()+' DOWN — R to reset'")
.replace("special:'shockwave'", "special:a.fighter==='em'?'Synaptic Kick':'shockwave',elbow:a.fighter==='em'?'rising knee':'elbow',dash:a.fighter==='em'?'advancing kick':'dash'")
.replace("radius:a.action==='special'?this.area(a).w/2:0", "fighter:a.fighter,face:a.face,radius:a.action==='special'?this.settings.blastRadius*this.settings.reach:0")
.replace("a.action==='punch'&&this.queue", "['punch','kick'].includes(a.action)&&this.queue")
.replace("this.queue=null;this.set(p,'punch');p.chain", "const queued=this.queue;this.queue=null;this.set(p,queued);p.chain"));
edit('work/combat-runtime.js',s=>s.replace('sprites=[],enemySprites=[]','sprites=[],emSprites=[],enemySprites=[]')
.replace('ready=false,shopLoaded','ready=false,emLoaded=false,emWalkLoaded=false,shopLoaded')
.replace('function actorSequence(a){',`const emSequences={idle:{frames:[0,20],times:[.48,.48]},walk:{frames:[24,25,26,27],times:[.18,.18,.18,.18]},elbow:{frames:[8,12,0],times:[.13,.15,.20]},dash:{frames:[13,16,11],times:[.17,.17,.28]},pickup:{frames:[23],times:[.32]},special:{frames:[17,18,19,10,20],times:[.20,.23,.25,.23,.21]},jump:{frames:[14],times:[.71]},airborne:{frames:[14],times:[.71]},hurt:{frames:[21],times:[1]},down:{frames:[22],times:[2]},defeated:{frames:[22],times:[10]},recover:{frames:[23,20],times:[.21,.21]}};
function actorSequence(a){if(a.fighter==='em'){if(a.action==='punch')return {frames:a.flight!==null?[14,15,14]:[5,a.hand?7:6,0],times:[.13,.10,.13]};if(a.action==='kick'){if(a.flight!==null)return {frames:[14,16,14],times:[.17,.23,.26]};return a.kickVariant?{frames:[8,10,11,0],times:[.25,.15,.14,.12]}:{frames:[8,9,11,0],times:[.17,.12,.10,.09]}}return emSequences[a.action]||emSequences.idle}`)
.replace('&&movesLoaded;', '&&movesLoaded&&emLoaded&&emWalkLoaded;')
.replace('(foe?enemySprites:sprites)[f]',"(foe?enemySprites:a.fighter==='em'?emSprites:sprites)[f]")
.replace("if(!foe&&['down','defeated']", "if(!foe&&a.fighter!=='em'&&['down','defeated']")
.replace('const m=MOVES[a.action],active','const m=lab.moveData(a),active')
.replace("'L · SHOCKWAVE READY'", "(lab.character==='em'?'L · SYNAPTIC KICK READY':'L · SHOCKWAVE READY')")
.replace("function ring(r){",`function ring(r){if(r.fighter==='em'){const t=r.age/.7,x=r.x+r.face*r.radius*Math.min(1,t/.72);ctx.save();ctx.globalAlpha=1-t;ctx.strokeStyle='#65eaff';ctx.shadowColor='#14bfff';ctx.shadowBlur=22;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,r.y-94,30,96,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#edffff';ctx.lineWidth=2;for(let j=0;j<6;j++){ctx.beginPath();for(let i=0;i<8;i++){const px=x+(i%2?12:-12)+Math.sin(i*13+j*7+r.age*32)*13,py=r.y-185+i*25; i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke()}ctx.strokeStyle='#47d7ff';ctx.beginPath();ctx.ellipse(x,r.y,65,23,0,0,Math.PI*2);ctx.stroke();ctx.restore();return}`)
.replace("$('pause').onclick=togglePlay;",`$('fighter').onchange=e=>{pauseTest();fightAudio.pause(true);lab.selectCharacter(e.target.value);reset();syncCharacter();draw()};
function syncCharacter(){const em=lab.character==='em';$('playerName').textContent=em?'DJ EM':'PROMIS / PHIL';$('playerHealth').setAttribute('aria-label',lab.playerName+' health');$('fighterDescription').textContent=em?'DJ Em · fast kicks, rising knee and forward electrical Synaptic Kick.':'Promis · alternating fists, elbow, shoulder dash and radial shockwave.';document.querySelector('[data-move="elbow"]').textContent=em?'Rising knee · J + K':'Elbow · J + K';document.querySelector('[data-move="special"]').textContent=em?'Synaptic Kick · L':'Shockwave · L';$('sequence').querySelector('[value="elbow"]').textContent=em?'Rising knee':'Elbow';$('sequence').querySelector('[value="dash"]').textContent=em?'Advancing kick':'Dash';$('sequence').querySelector('[value="special"]').textContent=em?'Synaptic Kick':'Shockwave';}
syncCharacter();$('pause').onclick=togglePlay;`));
edit('work/build-combat.cjs',s=>s.replace('<b>PROMIS / PHIL</b><span id="playerHP">','<b id="playerName">PROMIS / PHIL</b><span id="playerHP">')
.replace('INSERT COIN TO WIN','STEEL GRATE AMBUSH').replace("'Promis speed'","'Player speed'").replace("'Elbow damage'","'Combo damage'")
.replace("const enemyLoader=",`html=html.replace('<div class="stage', '<div class="combat-options"><label for="fighter">Fighter</label><select id="fighter"><option value="promis">Promis / Phil</option><option value="em">DJ Em</option></select><span id="fighterDescription"></span></div><div class="stage');
html=html.replace('J + K: elbow.', 'J + K: elbow / rising knee.').replace('knockdown dash.', 'knockdown dash / advancing kick.');
const enemyLoader=`)
.replace("fs.readFileSync('work/moves-loader.js','utf8');", "fs.readFileSync('work/moves-loader.js','utf8')+'\\n'+fs.readFileSync('work/em-loader.js','utf8');")
.replace("['ATLAS_DATA','sprite-atlas-clean.png']", "['EM_ATLAS_DATA','dj-em-atlas.png'],['EM_WALK_DATA','dj-em-walk.png'],['ATLAS_DATA','sprite-atlas-clean.png']"));
edit('work/audio-system.js',s=>s.replace("e.weapon==='elbow'?'punch':'kick'", "e.weapon==='elbow'&&e.fighter!=='em'?'punch':'kick'").replace("this.play('slam',{gain:1", "this.play(e.fighter==='em'?'kick-hit':'slam',{gain:1"));
const path='outputs/promis-lab/audio/manifest.json',manifest=JSON.parse(fs.readFileSync(path));manifest.music={source:'Steel_Grate_Ambush.mp3',file:'steel-grate-ambush.mp3'};fs.writeFileSync(path,JSON.stringify(manifest,null,2));
