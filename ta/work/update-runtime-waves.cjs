const fs=require('fs');let s=fs.readFileSync('work/combat-runtime-before-audio.js','utf8');
const t0=s.indexOf('function tone('),t1=s.indexOf('\nfunction input',t0);s=s.slice(0,t0)+s.slice(t1);
s=s.replace("shake=5;tone(e.type)","shake=5").replace("tone('hit');",'');s=s.replace("for(const e of lab.events.splice(0)){","for(const e of lab.events.splice(0)){if(!lab.inspect)fightAudio.event(e);");
s=s.replace("const foe=a.id==='enemy'","const foe=a.id==='enemy'");
s=s.replace("[lab.player,lab.enemy].sort", "[lab.player,...lab.enemies].filter(a=>a.action!=='defeated'||a.time<1.8).sort");s=s.replace('drawBoxes(lab.enemy)','lab.enemies.forEach(drawBoxes)');
s=s.replace("$('enemyAction').textContent=lab.enemy.action.toUpperCase();","$('enemyAction').textContent='WAVE '+lab.wave+' · '+lab.enemies.filter(e=>e.hp>0).length+' REMAIN';");
s=s.replace("$('enemyHealth').value=lab.enemy.hp;","$('enemyHealth').max=lab.enemies.length*100;$('enemyHealth').value=lab.enemies.reduce((n,e)=>n+e.hp,0);");
s=s.replace("$('enemyHP').textContent=lab.enemy.hp+' / 100';","$('enemyHP').textContent=lab.enemies.reduce((n,e)=>n+e.hp,0)+' / '+lab.enemies.length*100;");
s=s.replace("'HITS '+lab.hits.player+' : '+lab.hits.enemy","'WAVE '+lab.wave+' · KOs '+lab.kills+' · HITS '+lab.hits.player+' : '+lab.hits.enemy");
s=s.replace("const lab=new CombatLab();", "const lab=new CombatLab();let starting=false,runToken=0,started=false;");
const a=s.indexOf('function reset(){'),b=s.indexOf('\nfunction scan',a);
s=s.slice(0,a)+`async function startTest(){if(!ready||starting)return;const ticket=++runToken;starting=true;$('pause').textContent='Loading audio…';try{await fightAudio.prepare()}catch(e){$('audioStatus').textContent='Audio unavailable; test remains playable.'}if(ticket!==runToken)return;starting=false;started=true;paused=false;if(!lab.inspect)fightAudio.start();$('audioStatus').textContent=fightAudio.errors.length?'Audio unavailable: '+fightAudio.errors.join(', '):'Music stays below effects · heavy hits duck the soundtrack';syncPause();canvas.focus({preventScroll:true})}
function pauseTest(){runToken++;starting=false;paused=true;keys.clear();fightAudio.pause();syncPause()}
function stopTest(){pauseTest();fightAudio.pause(true);started=false;lab.reset();particles=[];rings=[];popups=[];$('sequence').value='free';lab.message='TEST STOPPED · Play to begin wave one';draw()}
function togglePlay(){if(starting||!paused)pauseTest();else startTest()}
function reset(){pauseTest();fightAudio.pause(true);started=false;lab.reset();keys.clear();particles=[];rings=[];popups=[];shake=0;$('sequence').value='free';syncPause();canvas.focus({preventScroll:true})}
function trigger(a){if(!ready||starting)return;if(paused)return;lab.trigger(a);$('sequence').value='free';canvas.focus({preventScroll:true})}
`+s.slice(b);
s=s.replace("function step(){paused=true;syncPause();update(1/12);draw()}","function step(){pauseTest();update(1/12);draw()}");
s=s.replace("else if(e.code==='KeyP'){paused=!paused;syncPause()}","else if(e.code==='KeyP')togglePlay()");
s=s.replace("$('pause').onclick=()=>{paused=!paused;syncPause()}","$('pause').onclick=togglePlay;$('stop').onclick=stopTest");
s=s.replace("$('sequence').onchange=e=>{keys.clear();", "$('sequence').onchange=e=>{pauseTest();keys.clear();");s=s.replace("}paused=false;syncPause()};", "}paused=a==='free';syncPause()};");
const sound0=s.indexOf("$('sound').onclick="),sound1=s.indexOf(";$('fullscreen')",sound0);
s=s.slice(0,sound0)+`$('sound').onclick=()=>{fightAudio.mute(fightAudio.enabled);$('sound').textContent=fightAudio.enabled?'Audio · on':'Audio · muted';$('sound').classList.toggle('active',fightAudio.enabled);$('sound').setAttribute('aria-pressed',fightAudio.enabled)};function mix(){const fx=Number($('fxVolume').value)/100,m=Number($('musicVolume').value)/100;fightAudio.volumes(fx,m);$('fxValue').textContent=Math.round(fx*100)+'%';$('musicValue').textContent=Math.round(m*100)+'%'}$('fxVolume').oninput=mix;$('musicVolume').oninput=mix`+s.slice(sound1);
s=s.replace("if(['phone','case','walk'].includes(lab.enemy.action))lab.set(lab.enemy,'idle');lab.enemy.cooldown=.5", "for(const e of lab.enemies){if(['phone','case','walk'].includes(e.action))lab.set(e,'idle');e.cooldown=.5}");
s=s.replace("if(!paused)update(dt*speed);draw()", "if(!paused){update(dt*speed);if(lab.over)pauseTest()}draw()");
s=s.replace('enemy:{...lab.enemy},frames:', 'enemy:{...lab.enemy},wave:lab.wave,enemies:lab.enemies.map(e=>({...e})),audio:{running:fightAudio.running,decoded:Object.keys(fightAudio.buffers).length,errors:fightAudio.errors},frames:');
s=s.replace('},reset,trigger};','},reset,trigger};');
fs.writeFileSync('work/combat-runtime.js',s);
