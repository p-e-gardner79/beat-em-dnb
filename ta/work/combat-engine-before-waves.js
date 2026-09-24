const MOVES={
 punch:{duration:.40,start:.16,end:.26,reach:123,depth:24,damage:9,force:110},
 kick:{duration:.65,start:.235,end:.40,reach:154,depth:26,damage:15,force:205},
 special:{duration:1.02,start:.495,end:.64,reach:205,depth:58,damage:25,force:285,knockdown:true},
 phone:{duration:.90,start:.38,end:.51,reach:133,depth:23,damage:10,force:125},
 case:{duration:1.30,start:.65,end:.83,reach:162,depth:28,damage:18,force:235,knockdown:true}
};
const DEFAULTS={playerSpeed:145,enemySpeed:90,tempo:1,aggression:.65,reach:1,damage:1,stun:.32,knockback:1};
class CombatLab{
 constructor(){this.settings={...DEFAULTS};this.enemyMode='fight';this.god=false;this.reset()}
 make(id,x,face){return {id,x,y:367,face,action:'idle',time:0,hp:100,vx:0,invuln:0,cooldown:id==='enemy'?1.5:0,hit:false,impact:false,serial:0,chain:0}}
 reset(){this.player=this.make('player',300,1);this.enemy=this.make('enemy',665,-1);this.events=[];this.queue=null;this.over=false;this.clock=0;this.hits={player:0,enemy:0};this.message='Close the gap. J punch · K kick · L shockwave';this.inspect=null}
 set(a,action){a.action=action;a.time=0;a.hit=false;a.impact=false;a.serial++}
 trigger(action){if(this.over)return false;this.inspect=null;const p=this.player;if(['idle','walk'].includes(p.action)){this.set(p,action);p.chain=action==='punch'?1:0;return true}if(p.action==='punch'&&action==='punch'){this.queue='punch';return true}return false}
 duration(a){return MOVES[a.action]?.duration??({jump:.71,hurt:this.settings.stun,down:1.05,recover:.42,defeated:Infinity,walk:.72,idle:.96}[a.action]??1)}
 height(a){return a.action==='jump'?Math.sin(Math.min(1,a.time/.71)*Math.PI)*89:0}
 area(a){const m=MOVES[a.action];if(!m)return null;const reach=m.reach*this.settings.reach;if(a.action==='special')return {x:a.x-reach,y:a.y-m.depth,w:reach*2,h:m.depth*2,radial:true};return {x:a.face>0?a.x+10:a.x-reach,y:a.y-m.depth,w:reach-10,h:m.depth*2,radial:false}}
 inRange(a,b){const r=this.area(a);if(!r||['down','recover','defeated'].includes(b.action)||b.invuln>0||this.height(b)>38)return false;if(r.radial){const m=MOVES[a.action];return Math.hypot((b.x-a.x)/(m.reach*this.settings.reach),(b.y-a.y)/m.depth)<=1}const forward=(b.x-a.x)*a.face;return forward>=10&&forward<=r.w+10&&Math.abs(b.y-a.y)<=r.h/2}
 hit(a,b){const m=MOVES[a.action];if(a.hit||!this.inRange(a,b))return false;a.hit=true;const damage=Math.round(m.damage*this.settings.damage);if(!(b.id==='player'&&this.god))b.hp=Math.max(0,b.hp-damage);b.vx=(Math.sign(b.x-a.x)||a.face)*m.force*this.settings.knockback;b.invuln=.12;this.queue=b.id==='player'?null:this.queue;this.set(b,b.hp===0?'defeated':m.knockdown?'down':'hurt');b.cooldown=.6;this.hits[a.id]++;this.events.push({type:'hit',x:b.x,y:b.y-135,damage,big:m.knockdown,who:b.id});this.message=(a.id==='player'?'Promis':'Corporate Bully')+' landed '+({case:'briefcase swing',phone:'phone strike',special:'shockwave'}[a.action]||a.action)+' · '+damage+' damage';if(b.hp===0){this.over=true;this.message=(b.id==='enemy'?'CORPORATE BULLY DOWN':'PROMIS DOWN')+' — R to reset';this.events.push({type:'ko'})}return true}
 move(a,dx,dy,speed,dt){const n=Math.hypot(dx,dy)||1,ox=a.x,oy=a.y;if(dx)a.face=Math.sign(dx);a.x=Math.max(135,Math.min(825,a.x+dx/n*speed*dt));a.y=Math.max(280,Math.min(435,a.y+dy/n*speed*.55*dt));const distance=Math.hypot(a.x-ox,(a.y-oy)/.55);if(a.action!=='jump'){if(distance>.00001){if(a.action!=='walk')this.set(a,'walk');a.time=(a.time+distance/145)%.72}else if(a.action==='walk')this.set(a,'idle')}}
 update(dt,input={}){for(let left=dt;left>1e-8;left-=1/120)this.tick(Math.min(left,1/120),input)}
 tick(dt,input){this.clock+=dt;const p=this.player,e=this.enemy;if(this.inspect){const a=this.inspect.actor==='enemy'?e:p;a.time=(a.time+dt*(a.id==='enemy'?this.settings.tempo:1))%this.duration(a);return}
 for(const a of [p,e]){a.invuln=Math.max(0,a.invuln-dt);a.cooldown=Math.max(0,a.cooldown-dt);a.x=Math.max(135,Math.min(825,a.x+a.vx*dt));a.vx*=Math.exp(-11*dt);if(a.action!=='walk')a.time+=dt*(a.id==='enemy'&&MOVES[a.action]?this.settings.tempo:1)}
 if(!this.over){if(['idle','walk','jump'].includes(p.action))this.move(p,input.dx||0,input.dy||0,this.settings.playerSpeed*(input.run?1.62:1),dt);
 if(['idle','walk'].includes(e.action)){const dx=p.x-e.x,dy=p.y-e.y;e.face=Math.sign(dx)||e.face;if(this.enemyMode!=='target'){const gap=this.enemyMode==='follow'?108:Math.min(103,MOVES.phone.reach*this.settings.reach*.85);if(Math.abs(dx)>gap||Math.abs(dy)>8)this.move(e,Math.abs(dx)>gap?Math.sign(dx):0,Math.abs(dy)>8?Math.sign(dy):0,this.settings.enemySpeed,dt);else{if(e.action==='walk')this.set(e,'idle');if(this.enemyMode==='fight'&&e.cooldown===0&&this.settings.aggression>0){this.set(e,e.chain++%2?'case':'phone');this.events.push({type:'windup',weapon:e.action});e.cooldown=(1.5-this.settings.aggression*1.2)}}}else if(e.action==='walk')this.set(e,'idle')}
 for(const [a,b] of [[p,e],[e,p]]){const m=MOVES[a.action];if(!m)continue;if(a.time>=m.start&&!a.impact){a.impact=true;this.events.push({type:a.action==='special'?'shockwave':'swing',x:a.x+a.face*35,y:a.y,weapon:a.action})}if(a.time>=m.start&&a.time<=m.end)this.hit(a,b)}
 // Prevent bodies walking through each other on the same floor lane.
 if(Math.abs(p.y-e.y)<18&&this.height(p)<20&&!['down','defeated'].includes(e.action)&&Math.abs(p.x-e.x)<48){const sign=Math.sign(p.x-e.x)||-p.face,overlap=48-Math.abs(p.x-e.x);p.x=Math.max(135,Math.min(825,p.x+sign*overlap/2));e.x=Math.max(135,Math.min(825,e.x-sign*overlap/2))}
 }
 for(const a of [p,e]){if(a.time<this.duration(a))continue;if(['idle','walk'].includes(a.action)){a.time%=this.duration(a);continue}if(a.action==='defeated')continue;if(a.action==='down'){this.set(a,'recover');a.invuln=.6;continue}if(a.action==='recover'){this.set(a,'idle');a.invuln=.2;continue}if(a===p&&a.action==='punch'&&this.queue&&!this.over){this.queue=null;this.set(p,'punch');p.chain=p.chain%3+1}else{this.set(a,'idle');if(a===e)a.cooldown=Math.max(a.cooldown,(1.5-this.settings.aggression*1.2)/this.settings.tempo)}}
 }
}
if(typeof module!=='undefined')module.exports={CombatLab,MOVES,DEFAULTS};
