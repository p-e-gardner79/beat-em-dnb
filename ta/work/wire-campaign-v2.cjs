const fs=require('fs');let p='work/level-runtime.js',s=fs.readFileSync(p,'utf8');
s=s.replace("['entry','combat','clear','travel','boss','key']","['entry','combat','clear','travel','travelFight','gate','boss','key','unlock']");
s=s.replace("if(campaign.state==='stairs'){levelCue('door',.8,'intro-breach');levelCue('stairs',2,'escape-step',.25)}","if(campaign.state==='stairs')levelCue('stairs',1.5,'escape-step',.4)");
s=s.replace("levelCue('open',1,'intro-door');levelCue('found',2,'record-found');levelCue('deck',6,'record-search')","levelCue('open',2,'intro-door');levelCue('found',3.5,'record-found');levelCue('deck',6.5,'record-search')");
s=s.replace("if(campaign.state==='tally'){levelCue", "if(campaign.state==='boarding'){levelCue('door-open',1.2,'intro-door',.6);levelCue('door-close',4,'intro-door',.7);levelCue('departure',4.3,'intro-engine',.9)}if(campaign.state==='tally'){levelCue");
s=s.replace("if(e.type==='rank')", "if(e.type==='ambush')levelSay('Company on the floor! Watch both sides!','CALL TO ARMS',4);\n if(e.type==='gate')levelSay('Stockroom ahead. Smash that door!','CALL TO ARMS',5);\n if(e.type==='gateHit'){fightAudio.play(e.broken?'intro-breach':'kick-hit',{gain:.9});shake=e.broken?7:3;}\n if(e.type==='cageKey'){fightAudio.play('record-found',{gain:.65});levelSay('Key secured. Walk up to Dean’s cage!','CALL TO ARMS',8);}\n if(e.type==='rank')");
s=s.replaceAll("(campaign.zone+1)+' / 4'","LEVEL_ZONES[campaign.zone].number+' / 3'");
s=s.replaceAll("(campaign.zone+1)+' / 4 · KOs '","LEVEL_ZONES[campaign.zone].number+' / 3 · KOs '");
s=s.replaceAll("'tally','transit'","'tally','boarding','transit'");
s=s.replace("campaign.state==='key'?'The Gatekeeper dropped the key. Walk over and press J.'", "campaign.state==='unlock'?'Key secured. Walk up to Dean’s cage to release him.':campaign.state==='gate'?'J / K · Break through the stockroom door':campaign.state==='key'?'The Gatekeeper dropped the key. Walk over and press J.'");
// Props are drawn before actors, with stair railing as the foreground occluder.
s=s.replace('function renderCombatLevel(){drawLevelBackground();','function renderCombatLevel(){drawLevelBackground();if(campaign.zone===3)drawDeanCage(0,true);');
s=s.replace("ctx.restore();if(campaign.state==='entry')", "ctx.restore();if(campaign.zone===2)drawStairwell(true);if(campaign.state==='unlock')arcadeText('KEY SECURED · APPROACH CAGE →',700,370,12);if(campaign.state==='entry')");
s=s.replace("if(campaign.state==='combat'&&campaign.time<1.2)","if(['combat','travelFight'].includes(campaign.state)&&campaign.time<1.2)");
s=s.replace("function drawBasementStory(){drawLevelBackground();", "function drawBasementStory(){if(campaign.state==='rescue'){drawRescue();return}if(campaign.state==='handoff'){drawHandoff();return}drawLevelBackground();drawDeanCage(0,true);");
// The old handoff branch is unreachable; the new sequence uses a proper four-frame cycle.
s=s.replace("if(t<4.5){storySuit(t<2?3:4,770,337,.72);if(t<2.8)record(758,225,true);", "if(t<4.5){storySuit(t<2?3:4,630,362,.95);if(t<2.8)record(630,225,true);");
let a=s.indexOf(" else if(s==='stairs'){"),b=s.indexOf(" else if(['bossIntro'",a);
s=s.slice(0,a)+" else if(s==='stairs')drawStairsDescent();\n"+s.slice(b);
s=s.replace("else if(s==='tally')drawTally();else if(s==='transit')", "else if(s==='tally')drawTally();else if(s==='boarding')drawBoarding();else if(s==='transit')");
s=s.replace("['entry','combat','clear','travel','boss','key'].includes(s)","['entry','combat','clear','travel','travelFight','gate','boss','key','unlock'].includes(s)");
s=s.replace("storyCar(480+Math.sin(t*3)*3,418,470,0);", "storyCar(480+Math.sin(t*3)*3,418,470,0);rotatingWheels(0,480+Math.sin(t*3)*3,418,470,t*18);");
s=s.replace("storyCar(-280+660*easeOut((t-3.5)/2),421,420,t>6?5:0);", "storyCar(-280+660*easeOut((t-3.5)/2),421,420,t>6?5:0);if(t<5.5)rotatingWheels(0,-280+660*easeOut((t-3.5)/2),421,420,18*easeOut((t-3.5)/2));");
s=s.replace("const saved=opening;opening={fighter:lab.character};drawCar(frame,x,y,w,frame>=4?6:0)","const saved=opening;opening={fighter:lab.character};drawCar(frame,x,y,w,frame>=4?6:0)");
// Replace the overlapping scenery seam with a narrow structural partition.
s=s.replace("for(const x of [960,2410])", "for(const x of [960])");
const bgEnd="drawEntryScene();ctx.restore()}}}";
s=s.replace(bgEnd,"drawEntryScene();ctx.restore()}drawShopPartition();if(campaign.zone===2)drawStairwell(false)}}");
fs.writeFileSync(p,s);
p='work/campaign-scenery.js';s=fs.readFileSync(p,'utf8').replace('seventy=70','70');fs.writeFileSync(p,s);
p='work/combat-runtime.js';s=fs.readFileSync(p,'utf8').replace('&&levelMotionReady&&mcMoodReady','&&levelMotionReady&&mcMoodReady&&deanReady');fs.writeFileSync(p,s);
p='work/build-combat.cjs';s=fs.readFileSync(p,'utf8').replace("fs.readFileSync('work/level-runtime.js','utf8');","fs.readFileSync('work/level-runtime.js','utf8')+'\\n'+fs.readFileSync('work/campaign-scenery.js','utf8');");fs.writeFileSync(p,s);
p='work/level-engine.js';s=fs.readFileSync(p,'utf8').replace('p.x-2580','p.x-2410').replace('l.player.x>=2470','l.player.x>=2300').replace('l.bounds.right=2495','l.bounds.right=2325');fs.writeFileSync(p,s);
