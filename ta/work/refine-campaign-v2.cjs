const fs=require('fs');
let p='work/level-engine.js',s=fs.readFileSync(p,'utf8');
s=s.replace("this.lab.campaignActive=true;this.lab.reset()","this.gateHP=3;this.gateHitSerial=-1;this.hasKey=false;this.lab.campaignActive=true;this.lab.reset()");
s=s.replace("['combat','clear','travel','boss','key'].includes(state)","['combat','clear','travel','travelFight','gate','boss','key','unlock'].includes(state)");
s=s.replace("this.zone=index;this.camera=z.x;","this.zone=index;this.camera=z.x;this.hasKey=false;if(index<=1)this.gateHP=3;this.roadIndex=0;this.roadStops=[];");
s=s.replace("else if(tier){e.kind='enforcer'","else if(tier&&tier!=='corporate'){e.kind='enforcer'");
const a=s.indexOf(' collectKey(){'),b=s.indexOf(' nextScene()',a);
s=s.slice(0,a)+` collectKey(){if(this.state!=='key'||!this.key)return false;const p=this.lab.player;if(Math.hypot(p.x-this.key.x,(p.y-this.key.y)*2)>52)return false;this.key=null;this.hasKey=true;this.change('unlock');this.emit('cageKey');return true}
 startTravel(){const l=this.lab;this.change('travel');l.enemies=[];l.bounds.right=LEVEL_ZONES[this.zone+1].x+870;l.lane=[300,425];this.roadIndex=0;this.roadStops=[{x:LEVEL_ZONES[this.zone].x+950,roster:['corporate',this.zone?'green':'white']},{x:LEVEL_ZONES[this.zone].x+1390,roster:[this.zone?'black':'white','corporate']}];}
 hitGate(){const p=this.lab.player;if(this.state!=='gate'||p.flight!==null||p.face!==1||Math.abs(p.x-2580)>150||!['punch','kick','elbow','dash','special'].includes(p.action)||this.gateHitSerial===p.serial)return;const m=this.lab.moveData(p);if(!m||p.time<m.start||p.time>m.end)return;this.gateHitSerial=p.serial;this.gateHP=Math.max(0,this.gateHP-(p.action==='special'?3:1));this.emit('gateHit',{broken:this.gateHP===0});if(!this.gateHP){this.change('travel');this.lab.bounds.right=LEVEL_ZONES[2].x+870;}}
`+s.slice(b);
s=s.replace("case'tally':this.change('transit');break;","case'tally':this.change('boarding');break;case'boarding':this.change('transit');break;");
s=s.replace("['combat','boss','travel','clear','key'].includes(this.state)","['combat','boss','travel','travelFight','gate','clear','key','unlock'].includes(this.state)");
s=s.replace("l.set(l.player,'kick');this.change('stairs')","this.stairsStart={x:l.player.x-this.camera,y:l.player.y};this.change('stairs')");
s=s.replace("this.change('travel');l.enemies=[];l.bounds.right=LEVEL_ZONES[this.zone+1].x+870;l.lane=[300,425]","this.startTravel()");
// Replace only update's travel branch; travel fights pause the camera and progression.
const ta=s.indexOf(" }else if(this.state==='travel'){"),tb=s.indexOf(" }else if(this.state==='stairs'",ta);
s=s.slice(0,ta)+` }else if(this.state==='travel'){
  const target=LEVEL_ZONES[this.zone+1].x,desired=Math.max(this.camera,Math.min(target,l.player.x-480));this.camera+=(desired-this.camera)*Math.min(1,dt*5);if(target-this.camera<.25)this.camera=target;l.bounds.left=this.camera+65;
  const stop=this.roadStops[this.roadIndex];
  if(stop&&l.player.x>=stop.x){this.roadIndex++;l.bounds={left:this.camera+65,right:this.camera+870};stop.roster.forEach((tier,i)=>this.spawn(tier,i?-1:1));this.change('travelFight');this.emit('ambush');}
  else if(this.zone===1&&this.gateHP>0&&l.player.x>=2470){l.bounds.right=2495;this.change('gate');this.emit('gate');}
  else if(this.camera>=target){const px=l.player.x,py=l.player.y;this.beginZone(this.zone+1);l.player.x=px;l.player.y=py}
 }else if(this.state==='travelFight'){if(!live.length&&this.time>1){this.change('travel');l.bounds.right=LEVEL_ZONES[this.zone+1].x+870;this.emit('clear')}}
 else if(this.state==='gate')this.hitGate();
 else if(this.state==='unlock'){if(Math.hypot(l.player.x-745,(l.player.y-350)*1.5)<65&&l.player.flight===null){this.rescueStart={x:l.player.x,y:l.player.y};this.lab.enemies=[];this.lab.weapons=[];this.change('rescue');this.emit('rescue')}}
`+s.slice(tb).replace(/^ }else if/,' else if');
s=s.replace("else if(this.state==='transit'&&this.time>=9)","else if(this.state==='boarding'&&this.time>=7.5)this.nextScene();\n else if(this.state==='transit'&&this.time>=9)");
fs.writeFileSync(p,s);
p='work/heist-runtime.js';s=fs.readFileSync(p,'utf8').replaceAll('355,.84','375,1.02').replace('const h=190,w=frame.width/frame.height*h','const h=231,w=frame.width/frame.height*h').replace('355-h,w,h','375-h,w,h').replace('619,305-h','619,326-h');fs.writeFileSync(p,s);
