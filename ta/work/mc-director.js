// Event-driven commentary, measured in real play seconds rather than animation speed.
const MC_LINES=MC_LINES_DATA;
class MCDirector{
 constructor(random=Math.random){this.random=random;this.bags={};this.lastLine={};this.reset()}
 reset(grace=4){this.time=0;this.until=0;this.next=grace;this.warningNext=grace;this.pending=[];this.warned=new Set();this.waveSeen=0;this.combo=[];this.serial=-1;this.full=false;this.caption='';this.lastClock=-1;this.spaceAfter=0}
 offer(kind,priority,valid=()=>true,commit=()=>{},ttl=2){if(!this.pending.some(p=>p.kind===kind))this.pending.push({kind,priority,valid,commit,expires:this.time+ttl})}
 choose(kind){let bag=this.bags[kind];if(!bag?.length){bag=[...MC_LINES[kind]];for(let i=bag.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag.length>1&&bag.at(-1).id===this.lastLine[kind]){[bag[0],bag[bag.length-1]]=[bag.at(-1),bag[0]]}this.bags[kind]=bag}const line=bag.pop();this.lastLine[kind]=line.id;return line}
 threat(l,e){return e.hp>0&&!e.entering&&['idle','walk','phone','case','baton','enforcerJab','enforcerSlam','enforcerBurst'].includes(e.action)&&(e.x-l.player.x)*l.player.face<-20&&Math.abs(e.x-l.player.x)<160&&Math.abs(e.y-l.player.y)<42&&l.enemyMode==='fight'}
 surrounded(l){const near=l.enemies.filter(e=>e.hp>0&&!e.entering&&!['down','defeated','grabbed'].includes(e.action)&&Math.abs(e.x-l.player.x)<170&&Math.abs(e.y-l.player.y)<55);return l.enemyMode==='fight'&&near.some(e=>e.x<l.player.x-25)&&near.some(e=>e.x>l.player.x+25)}
 event(e,l){if(e.type==='hit'&&e.who==='enemy'){if(e.weapon==='special'){this.offer('special',70);return}if(this.serial!==l.player.serial){this.serial=l.player.serial;this.combo=this.combo.filter(t=>this.time-t<2.5);this.combo.push(this.time)}if(this.combo.length>=3)this.offer('combo',50);else if(e.big||e.ko)this.offer('down',45);else this.offer('hit',20)}if(e.type==='hit'&&e.who==='player')this.combo=[]}
 tick(dt,l,emit,duration,busy=false){if(l.clock<this.lastClock)this.reset();this.lastClock=l.clock;this.time+=dt;const t=this.time;this.pending=this.pending.filter(p=>p.expires>=t&&p.valid());
 for(const e of l.enemies)if(this.threat(l,e)&&!this.warned.has(e.uid))this.offer('behind',100,()=>this.threat(l,e),()=>this.warned.add(e.uid),.6);
 if(t>=this.spaceAfter&&this.surrounded(l))this.offer('space',90,()=>this.surrounded(l),()=>this.spaceAfter=t+24,.8);
 const full=l.charge>=l.settings.recordsNeeded;if(full&&!this.full)this.offer('ready',80,()=>l.charge>=l.settings.recordsNeeded,()=>{},6);this.full=full;
 if(l.waveDelay!==null&&this.waveSeen!==l.wave){this.waveSeen=l.wave;this.offer('wave',75,()=>l.waveDelay!==null,()=>{},2)}
 this.pending=this.pending.filter(p=>p.expires>=t&&p.valid());if(busy||t<this.until||l.over)return;
 const p=this.pending.sort((a,b)=>b.priority-a.priority).find(p=>t>=(p.priority>=80?this.warningNext:this.next));if(!p)return;
 const line=this.choose(p.kind);this.caption=line.text;this.until=t+Math.max(1,duration(line.id));this.next=this.until+12+this.random()*8;this.warningNext=this.until+5;p.commit();this.pending=[];emit(line);
 }
}
if(typeof module!=='undefined')module.exports={MCDirector,MC_LINES};
