const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const box={console,module:{exports:{}}};vm.createContext(box);vm.runInContext(['combat-engine.js','bouncer-engine.js','level-engine.js'].map(f=>fs.readFileSync('work/'+f,'utf8')).join('\n')+'\nthis.api={CombatLab,LevelCampaign,LEVEL_ZONES};',box);const {CombatLab,LevelCampaign,LEVEL_ZONES}=box.api;
assert.deepEqual(Array.from(LEVEL_ZONES,z=>z.number),[1,1,2,3]);
for(const fighter of ['promis','em','bully','change']){
 const l=new CombatLab();l.selectCharacter(fighter);const c=new LevelCampaign(l);l.campaignDirector=c;c.start();l.enemyMode='target';
 const tick=(input={})=>{if(!l.controlsLocked)l.update(1/60,input);c.update(1/60);assert(l.enemies.filter(e=>e.hp>0).length<=3);assert(l.enemies.every(e=>Number.isFinite(e.maxHP)))};
 const kill=()=>{for(const e of l.enemies)if(e.hp){e.hp=0;l.set(e,'defeated')}};
 let ambushes=0,gates=0,lastState='',corp=0,white=0;
 for(let i=0;i<24000&&c.state!=='bossIntro';i++){
  if(c.state==='combat'||c.state==='travelFight'){if(c.time>.5)kill();}
  if(c.state==='gate'){assert.equal(c.camera,1450);assert(l.player.x<=2200);if(['idle','walk'].includes(l.player.action))l.trigger('kick');}
  if(c.state!==lastState&&c.state==='travelFight')ambushes++;
  if(c.state!==lastState&&c.state==='gate')gates++;
  lastState=c.state;tick({dx:1,dy:c.zone===2&&l.player.y>320?-1:0});
  for(const e of c.events.splice(0))if(e.type==='spawn'){if(e.tier==='corporate')corp++;if(e.tier==='white')white++;}
 }
 assert.equal(c.state,'bossIntro');assert.equal(c.zone,3);assert.equal(ambushes,5);assert.equal(gates,1);assert.equal(c.gateHP,0);assert(corp>=6);assert(white>=3);assert(!l.enemies.length);
 c.nextScene();const boss=l.enemies.find(e=>e.kind==='boss');boss.hp=235;tick();assert(l.enemies.some(e=>e.tier==='gold'));assert.equal(boss.bossPhase,2);boss.hp=0;tick();assert.equal(c.state,'key');assert(c.key);
 l.player.x=170;assert(!c.collectKey());l.player.x=c.key.x;l.player.y=c.key.y;l.set(l.player,'idle');assert(l.trigger('punch'));assert.equal(c.state,'unlock');assert(c.hasKey);assert(!l.controlsLocked);
 l.player.x=200;tick();assert.equal(c.state,'unlock');l.player.x=730;l.player.y=350;tick();assert.equal(c.state,'rescue');assert(l.controlsLocked);assert(c.rescueStart);
 c.nextScene();assert.equal(c.stats.records,1);assert.equal(c.state,'handoff');c.nextScene();assert.equal(c.state,'tally');c.nextScene();assert.equal(c.state,'boarding');c.update(7.5);assert.equal(c.state,'transit');c.nextScene();assert.equal(c.state,'arrival');c.nextScene();assert.equal(c.state,'complete');
 c.retry();assert.equal(c.zone,3);assert.equal(c.state,'bossIntro');assert.equal(l.player.fighter,fighter);c.cancel();l.reset();assert.equal(l.enemies.length,1);assert(!l.campaignActive);assert.equal(l.bounds,null);
}
// Exit boundaries are fixed and cannot advance until the actor has disappeared.
{const l=new CombatLab(),c=new LevelCampaign(l);l.campaignDirector=c;c.start();c.beginZone(1);c.pending=[];c.change('gate');l.player.x=2200;l.player.y=375;
 for(let i=0;i<3;i++){l.set(l.player,'kick');l.player.time=.21;const move=l.moveData(l.player);l.player.time=(move.start+move.end)/2;c.hitGate()}
 assert.equal(c.state,'gateOpen');assert.equal(c.zone,1);assert.equal(c.camera,1450);c.update(5);assert.equal(c.zone,1);l.player.x=2250;c.update(.01);assert.equal(c.state,'doorExit');assert(l.controlsLocked);c.update(2.8);assert.equal(c.zone,1);c.update(.5);assert.equal(c.zone,2);assert.equal(c.camera,2900);
 c.change('stairs');c.update(5.7);assert.equal(c.zone,2);c.update(.6);assert.equal(c.zone,3);}
console.log('PASS: all four heroes, three zones, mixed enemies and cap, fixed right-hand door, attack/open/walk-through/cut sequencing, stair cut timing, boss/key/cage, boarding and retry.');
// Solid end walls never serve as enemy entrances, including requested right spawns.
{const l=new CombatLab(),c=new LevelCampaign(l);c.start();c.beginZone(1);for(const tier of ['corporate','green','black'])c.spawn(tier,1);assert(l.enemies.every(e=>e.x<c.camera&&e.face===1));
 c.beginZone(2);c.camera=LEVEL_ZONES[2].x+1920;c.spawn('corporate',1);assert(l.enemies[0].x<c.camera);
 c.retry();assert.equal(c.camera,2900);assert.equal(c.stockFinished,false);
 c.startTravel();assert.equal(c.travelTarget(),4820);assert.equal(c.roadStops.length,3);assert(c.roadStops.every(s=>s.roster.includes('corporate')));
 l.player.x=4000;c.update(.1);assert(c.camera>2900);assert.equal(c.zone,2);assert.equal(c.state,'travelFight');
}
console.log('PASS: end-wall spawn restrictions, stockroom scrolling/encounters and checkpoint reset.');
