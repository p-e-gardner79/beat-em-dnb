const fs=require('fs');let p='work/level-engine.js',s=fs.readFileSync(p,'utf8');
s=s.replace("extra:['corporate'],lane:[322,421]","extra:['corporate','green','corporate','black','corporate'],lane:[322,421]");
s=s.replaceAll("'travelFight','gate','boss'","'travelFight','gate','gateOpen','boss'");
s=s.replace("Math.abs(p.x-2410)>150","Math.abs(p.x-(this.camera+845))>155");
s=s.replace("this.change('travel');this.lab.bounds.right=LEVEL_ZONES[2].x+870;","this.change('gateOpen');this.lab.bounds.right=this.camera+900;");
s=s.replace("case'stairs':this.beginZone(3);break;","case'doorExit':this.beginZone(2);break;case'stairs':this.beginZone(3);break;");
s=s.replace("else if(l.player.x>this.camera+660)this.startTravel();","else if(this.zone===1){l.bounds.right=this.camera+750;this.change('gate');this.emit('gate')}\n  else if(l.player.x>this.camera+660)this.startTravel();");
s=s.replace("else if(this.state==='gate')this.hitGate();","else if(this.state==='gate')this.hitGate();\n else if(this.state==='gateOpen'&&l.player.x>=this.camera+790&&l.player.y>=335&&l.player.flight===null){this.doorStart={x:l.player.x-this.camera,y:l.player.y};this.change('doorExit')}\n else if(this.state==='doorExit'&&this.time>=3.2)this.nextScene();");
s=s.replace("this.state==='stairs'&&this.time>=6","this.state==='stairs'&&this.time>=6.2");
// The door is a zone boundary; only travel within the shop floor scrolls.
s=s.replace("else if(this.zone===1&&this.gateHP>0&&l.player.x>=2300){l.bounds.right=2325;this.change('gate');this.emit('gate');}","");
fs.writeFileSync(p,s);
p='work/level-runtime.js';s=fs.readFileSync(p,'utf8');
s=s.replaceAll("'travelFight','gate','boss'","'travelFight','gate','gateOpen','boss'");
s=s.replace("else if(s==='stairs')drawStairsDescent();","else if(s==='stairs')drawStairsDescent();else if(s==='doorExit')drawDoorExit();");
s=s.replace("campaign.state==='gate'?'J / K · Break through the stockroom door'","campaign.state==='gateOpen'?'Walk right through the broken doorway.':campaign.state==='gate'?'J / K · Break through the stockroom door'");
// Zone 2 now has its own full background. It is never visible beside Zone 1.
s=s.replace("if(campaign.zone===3){panel", "if(campaign.zone===2){ctx.drawImage(exitArt.stairs,0,0,960,470);return}if(campaign.zone===3){panel");
s=s.replace("if(campaign.state==='stairs')levelCue('stairs',1.5,'escape-step',.4);", "if(campaign.state==='stairs')levelCue('stairs',1.4,'escape-step',.4);if(campaign.state==='doorExit')levelCue('through-door',.2,'player-step',.35);");
fs.writeFileSync(p,s);
p='work/combat-runtime.js';s=fs.readFileSync(p,'utf8').replace('&&mcMoodReady&&deanReady','&&mcMoodReady&&deanReady&&exitArtReady');fs.writeFileSync(p,s);
p='work/build-combat.cjs';s=fs.readFileSync(p,'utf8').replace("fs.readFileSync('work/campaign-scenery.js','utf8');","fs.readFileSync('work/campaign-scenery.js','utf8')+'\\n'+fs.readFileSync('work/scene-exits.js','utf8');");fs.writeFileSync(p,s);
