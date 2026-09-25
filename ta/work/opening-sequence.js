// Wall-clock timeline: independent of combat speed and frozen while paused.
class OpeningSequence {
 constructor(fighter){this.fighter=fighter;this.time=0;this.finished=false;this.events=[];this.fired=new Set()}
 get phase(){return this.time<3.5?'arrival':this.time<6.5?'exit':this.time<9?'breach':this.time<11?'title':'complete'}
 update(dt){if(this.finished)return;this.time=Math.min(11,this.time+Math.max(0,dt));for(const [time,name] of [[0,'engine'],[1.6,'brake'],[3.15,'stop'],[3.65,'door'],[4.05,'roll'],[5.65,'ready'],[7.65,'windup'],[8.15,'breach'],[9,'title']])if(this.time>=time&&!this.fired.has(name)){this.fired.add(name);this.events.push(name)}if(this.time>=11)this.finished=true}
 skip(){this.time=11;this.finished=true;this.events=[]}
}
if(typeof module!=='undefined')module.exports={OpeningSequence};
