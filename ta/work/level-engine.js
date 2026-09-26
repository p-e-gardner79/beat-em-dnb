// Finite campaign director. Combat remains in CombatLab; this owns progression only.
const LEVEL_ZONES=[
 {name:'THE SHOP FLOOR',number:1,x:0,roster:['white','corporate'],extra:['white'],lane:[280,435]},
 {name:'THE VINYL AISLES',number:1,x:1450,roster:['white','corporate','green'],extra:['corporate','green','corporate','black','corporate'],lane:[322,421]},
 {name:'THE STOCKROOM',number:2,x:2900,roster:['corporate','green','black'],extra:['corporate','green'],lane:[292,425]},
 {name:'THE BASEMENT',number:3,x:0,roster:['boss'],extra:[],lane:[280,435]}
];
class LevelCampaign{
 constructor(lab){this.lab=lab;this.active=false;this.camera=0;this.zone=0;this.state='off';this.time=0;this.elapsed=0;this.events=[];this.serial=0;this.stats={defeats:0,enforcers:0,combo:0,maxCombo:0,lastHit:-99,records:0,damage:0};this.checkpoint=null}
 start(){this.active=true;this.elapsed=0;this.stats={defeats:0,enforcers:0,combo:0,maxCombo:0,lastHit:-99,records:0,damage:0};this.gateHP=3;this.gateHitSerial=-1;this.hasKey=false;this.lab.campaignActive=true;this.lab.reset();this.lab.enemies=[];this.lab.player.x=170;this.lab.player.y=375;this.beginZone(0)}
 cancel(){this.active=false;this.state='off';this.camera=0;this.lab.campaignActive=false;this.lab.bounds=null;this.lab.lane=null;this.lab.controlsLocked=false;this.events=[]}
 emit(type,data={}){this.events.push({type,...data})}
 change(state){this.state=state;this.time=0;this.lab.controlsLocked=!['combat','clear','travel','travelFight','gate','gateOpen','boss','key','unlock'].includes(state);if(state==='clear'&&this.zone===2)this.lab.bounds.right=this.camera+870;this.emit('state',{state})}
 beginZone(index,retry=false){const l=this.lab,z=LEVEL_ZONES[index];this.zone=index;this.camera=z.x;this.hasKey=false;if(index<=1)this.gateHP=3;this.stockFinished=false;this.roadIndex=0;this.roadStops=[];l.bounds={left:z.x+90,right:z.x+(index===1?750:870)};l.lane=z.lane;l.enemies=[];l.weapons=[];l.vinyl=[];l.wave=index+1;l.waveDelay=null;l.player.x=z.x+170;l.player.y=375;l.player.flight=null;l.player.vx=0;l.player.invuln=1.2;l.releaseGrab();l.set(l.player,'idle');l.over=false;l.events=[];l.nextAttack=l.clock+2;this.pending=[...z.extra];this.spawned=false;this.reinforced=false;this.spawnTimer=0;this.key=null;l.vinylTimer=5;for(let i=0;i<3;i++)l.spawnVinyl();this.change(index===3?'bossIntro':'entry');if(!retry)this.checkpoint={zone:index,hp:Math.max(50,l.player.hp),charge:l.charge,held:l.player.held?{...l.player.held}:null,stats:{...this.stats},elapsed:this.elapsed};this.emit('zone',{index})}
 spawn(tier,side=1){if(this.zone===1||(this.zone===0&&this.camera>1200)||(this.zone===2&&this.camera>=LEVEL_ZONES[2].x+1600))side=-1;const l=this.lab;if(l.enemies.filter(e=>e.hp>0).length>=3)return false;const e=l.make('enemy',this.camera+(side<0?-40:1000),side<0?1:-1);e.uid='level-'+(++this.serial);e.entering=true;e.y=338+(this.serial%3)*32;e.cooldown=2;e.maxHP=100;if(tier==='boss'){e.kind='boss';e.hp=e.maxHP=480;e.x=690;e.y=367;e.entering=false;e.bossPhase=1}else if(tier&&tier!=='corporate'){e.kind='enforcer';e.tier=tier;e.hp=e.maxHP=ENFORCERS[tier].hp;if(['black','gold'].includes(tier))e.held=l.newBaton(tier==='gold')}l.enemies=l.enemies.filter(a=>a.hp>0||a.time<1.5);l.enemies.push(e);this.emit('spawn',{tier});return true}
 record(e){if(!this.active)return;if(e.type==='hit'){if(e.who==='enemy'){if(this.elapsed-this.stats.lastHit>2.5)this.stats.combo=0;this.stats.combo++;this.stats.maxCombo=Math.max(this.stats.maxCombo,this.stats.combo);this.stats.lastHit=this.elapsed;if(e.ko){this.stats.defeats++;if(e.targetKind==='enforcer')this.stats.enforcers++}}else{this.stats.damage+=e.damage;this.stats.combo=0}}}
 retry(){if(!this.checkpoint)return;const c=this.checkpoint,l=this.lab;this.stats={...c.stats,combo:0,lastHit:-99};this.elapsed=c.elapsed;l.campaignActive=true;l.reset();l.player.hp=c.hp;l.charge=c.charge;l.player.held=c.held?{...c.held}:null;this.beginZone(c.zone,true)}
 collectKey(){if(this.state!=='key'||!this.key)return false;const p=this.lab.player;if(Math.hypot(p.x-this.key.x,(p.y-this.key.y)*2)>52)return false;this.key=null;this.hasKey=true;this.change('unlock');this.emit('cageKey');return true}
 travelTarget(){return this.zone===2?LEVEL_ZONES[2].x+1920:LEVEL_ZONES[this.zone+1].x}
 startTravel(){const l=this.lab;if(this.zone===2){this.change('travel');l.enemies=[];l.bounds.right=this.travelTarget()+570;l.lane=[292,425];this.roadIndex=0;this.roadStops=[{x:LEVEL_ZONES[2].x+950,roster:['corporate','green']},{x:LEVEL_ZONES[2].x+1700,roster:['black','corporate','green']},{x:LEVEL_ZONES[2].x+2390,roster:['corporate','black']}];return;}this.change('travel');l.enemies=[];l.bounds.right=LEVEL_ZONES[this.zone+1].x+870;l.lane=[300,425];this.roadIndex=0;this.roadStops=[{x:LEVEL_ZONES[this.zone].x+950,roster:['corporate',this.zone?'green':'white']},{x:LEVEL_ZONES[this.zone].x+1390,roster:[this.zone?'black':'white','corporate']}];}
 hitGate(){const p=this.lab.player;if(this.state!=='gate'||p.flight!==null||p.face!==1||Math.abs(p.x-(this.camera+845))>155||!['punch','kick','elbow','dash','special'].includes(p.action)||this.gateHitSerial===p.serial)return;const m=this.lab.moveData(p);if(!m||p.time<m.start||p.time>m.end)return;this.gateHitSerial=p.serial;this.gateHP=Math.max(0,this.gateHP-(p.action==='special'?3:1));this.emit('gateHit',{broken:this.gateHP===0});if(!this.gateHP){this.change('gateOpen');this.lab.bounds.right=this.camera+900;}}
 nextScene(){switch(this.state){case'doorExit':this.beginZone(2);break;case'stairs':this.beginZone(3);break;case'bossIntro':this.spawn('boss');this.change('boss');break;case'rescue':this.stats.records=1;this.change('handoff');break;case'handoff':this.change('tally');this.emit('rank');break;case'tally':this.change('boarding');break;case'boarding':this.change('transit');break;case'transit':this.change('arrival');break;case'arrival':this.change('complete');break}}
 get rank(){const s=this.stats;const points=s.maxCombo*25+s.enforcers*100+1000-Math.floor(this.elapsed)*2-s.damage*3;return points>=1800?'S':points>=1300?'A':points>=750?'B':'C'}
 update(dt){if(!this.active)return;const l=this.lab;this.time+=dt;if(['combat','boss','travel','travelFight','gate','clear','key','unlock'].includes(this.state)&&!l.over)this.elapsed+=dt;if(this.stats.combo&&this.elapsed-this.stats.lastHit>2.5)this.stats.combo=0;
 if(l.over)return;
 const live=l.enemies.filter(e=>e.hp>0);
 if(this.state==='entry'&&this.time>=1.5){LEVEL_ZONES[this.zone].roster.forEach((tier,i)=>this.spawn(tier,this.zone===2&&i===2?-1:i%2?-1:1));this.change('combat')}
 else if(this.state==='combat'){
  if(this.pending.length&&live.length<=1&&this.time-this.spawnTimer>1.2){this.spawn(this.pending.shift(),this.zone===2?-1:1);this.spawnTimer=this.time}
  if(live.length===0&&!this.pending.length&&this.time>1){this.change('clear');this.emit('clear')}
 }else if(this.state==='clear'&&this.time>=1.2){
  if(this.zone===2){if(!this.stockFinished){if(l.player.x>this.camera+660)this.startTravel()}else if(l.player.x>this.camera+570&&l.player.y<335&&l.player.flight===null){this.stairsStart={x:l.player.x-this.camera,y:l.player.y};this.change('stairs')}}
  else if(this.zone===1){l.bounds.right=this.camera+750;this.change('gate');this.emit('gate')}
  else if(l.player.x>this.camera+660)this.startTravel();
 }else if(this.state==='travel'){
  const target=this.travelTarget(),desired=Math.max(this.camera,Math.min(target,l.player.x-480));this.camera+=(desired-this.camera)*Math.min(1,dt*5);if(target-this.camera<.25)this.camera=target;l.bounds.left=this.camera+65;
  const stop=this.roadStops[this.roadIndex];
  if(stop&&l.player.x>=stop.x){this.roadIndex++;l.bounds={left:this.camera+65,right:this.camera+(this.zone===2&&this.camera>=target-30?570:870)};stop.roster.forEach((tier,i)=>this.spawn(tier,i?-1:1));this.change('travelFight');this.emit('ambush');}
  
  else if(this.camera>=target&&this.zone===2){this.stockFinished=true;this.change('clear');l.bounds.right=this.camera+620;this.emit('clear')}
  else if(this.camera>=target){const px=l.player.x,py=l.player.y;this.beginZone(this.zone+1);l.player.x=px;l.player.y=py}
 }else if(this.state==='travelFight'){if(!live.length&&this.time>1){this.change('travel');l.bounds.right=this.travelTarget()+(this.zone===2?620:870);this.emit('clear')}}
 else if(this.state==='gate')this.hitGate();
 else if(this.state==='gateOpen'&&l.player.x>=this.camera+790&&l.player.y>=335&&l.player.flight===null){this.doorStart={x:l.player.x-this.camera,y:l.player.y};this.change('doorExit')}
 else if(this.state==='doorExit'&&this.time>=3.2)this.nextScene();
 else if(this.state==='unlock'){if(Math.hypot(l.player.x-745,(l.player.y-350)*1.5)<65&&l.player.flight===null){this.rescueStart={x:l.player.x,y:l.player.y};this.lab.enemies=[];this.lab.weapons=[];this.change('rescue');this.emit('rescue')}}
 else if(this.state==='stairs'&&this.time>=6.2)this.nextScene();
 else if(this.state==='bossIntro'&&this.time>=8)this.nextScene();
 else if(this.state==='boss'){
  const boss=l.enemies.find(e=>e.kind==='boss');
  if(boss&&boss.hp<=240&&!this.reinforced&&boss.hp>0){boss.bossPhase=2;this.reinforced=true;this.spawn('gold',-1);this.emit('phase2')}
  if(boss&&boss.hp===0){this.key={x:boss.x,y:boss.y};for(const e of l.enemies)if(e!==boss){e.hp=0;l.set(e,'defeated')}this.change('key');this.emit('key')}
 }else if(this.state==='rescue'&&this.time>=18)this.nextScene();
 else if(this.state==='handoff'&&this.time>=11)this.nextScene();
 else if(this.state==='boarding'&&this.time>=7.5)this.nextScene();
 else if(this.state==='transit'&&this.time>=9)this.nextScene();
 else if(this.state==='arrival'&&this.time>=12)this.nextScene();
 }
}
Object.assign(MOVES,{bossJab:{duration:1.05,start:.45,end:.59,reach:150,depth:28,damage:15,force:210},bossSlam:{duration:2.2,start:1.05,end:1.22,reach:235,depth:65,damage:25,force:350,knockdown:true},bossBurst:{duration:2.5,start:1.3,end:1.49,reach:290,depth:95,damage:28,force:410,knockdown:true}});
const levelSet=CombatLab.prototype.set,levelArea=CombatLab.prototype.area,levelMove=CombatLab.prototype.moveData,levelTrigger=CombatLab.prototype.trigger,levelHit=CombatLab.prototype.hit;
CombatLab.prototype.set=function(a,action){if(a.kind==='boss'&&['phone','case'].includes(action))action=['bossJab','bossSlam','bossBurst'][a.chain%3];return levelSet.call(this,a,action)};
CombatLab.prototype.moveData=function(a){const m=levelMove.call(this,a);if(a.kind==='boss'&&m&&a.bossPhase===2)return {...m,duration:m.duration*.85,start:m.start*.85,end:m.end*.85};return m};
CombatLab.prototype.area=function(a){if(['bossSlam','bossBurst'].includes(a.action)){const m=this.moveData(a),r=m.reach*this.settings.reach;return {x:a.x-r,y:a.y-m.depth,w:r*2,h:m.depth*2,radial:true}}return levelArea.call(this,a)};
CombatLab.prototype.trigger=function(action){if(this.controlsLocked)return false;if(this.campaignDirector?.state==='key'&&action==='punch'&&this.campaignDirector.collectKey())return true;return levelTrigger.call(this,action)};
CombatLab.prototype.hit=function(a,b){const before=this.events.length,result=levelHit.call(this,a,b);if(result)for(let i=before;i<this.events.length;i++)if(this.events[i].type==='hit')this.events[i].targetKind=b.kind;return result};
if(typeof module!=='undefined')module.exports={LevelCampaign,LEVEL_ZONES};
