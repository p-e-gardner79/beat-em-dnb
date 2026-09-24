const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map();function element(){return {value:'',textContent:'',children:[],classList:{toggle(){return true},add(){}},getContext(){return new Proxy({},{get:(o,k)=>o[k]||(()=>{}),set:(o,k,v)=>(o[k]=v,true)})},addEventListener(){},focus(){},setAttribute(){},replaceChildren(...v){this.children=v}}}
const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},querySelectorAll(){return []},addEventListener(){},createElement:element};
const sandbox={document,window:{addEventListener(){}},console,Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
let source=fs.readFileSync('work/template.html','utf8').split('<script>')[1].split('</script>')[0];vm.runInContext(source+'\nready=true;',sandbox);const lab=sandbox.window.__promis;
function tick(seconds){for(let t=0;t<seconds;t+=.01)lab.update(.01)}
lab.reset();lab.keys.add('KeyD');tick(1);assert(lab.state.player.x>620);assert.equal(lab.state.player.action,'walk');lab.keys.clear();tick(.02);assert.equal(lab.state.player.action,'idle');
lab.reset();lab.keys.add('KeyA');tick(8);assert.equal(lab.state.player.x,145);assert.equal(lab.state.player.face,-1);lab.keys.clear();
for(const move of ['punch','kick','special','jump']){lab.reset();lab.trigger(move);assert.equal(lab.state.player.action,move);tick(lab.duration(move)+.04);assert.equal(lab.state.player.action,'idle',move+' recovers')}
lab.reset();lab.trigger('special');tick(.51);assert.equal(lab.state.rings,1);assert(lab.state.particles>0);tick(2);assert.equal(lab.state.rings,0);assert.equal(lab.state.particles,0);
lab.reset();lab.trigger('punch');lab.trigger('punch');tick(.41);assert.equal(lab.state.player.action,'punch');tick(.5);assert.equal(lab.state.player.action,'idle');
lab.reset();lab.trigger('kick');lab.step();assert.equal(lab.state.paused,true);assert.equal(lab.frameAt('kick',lab.state.player.time).index,1);
lab.reset();lab.keys.add('KeyD');lab.keys.add('ShiftLeft');tick(1);assert(lab.state.player.x>710);lab.keys.clear();
// Gait phase follows actual distance in each movement direction.
for(const inputs of [['KeyD'],['KeyW'],['KeyS'],['KeyD','KeyW'],['KeyD','ShiftLeft']]){
lab.reset();inputs.forEach(k=>lab.keys.add(k));const before=lab.state.player;tick(.2);const after=lab.state.player;const distance=Math.hypot(after.x-before.x,(after.y-before.y)/.55);assert(Math.abs(after.time-distance/145)<1e-9,'stride follows distance '+inputs);lab.keys.clear();
}
lab.reset();lab.keys.add('KeyD');tick(.1);lab.step();assert.equal(lab.state.mode,'walk');assert.equal(lab.state.paused,true);
console.log('PASS: movement, facing, boundaries, run, attack recovery, punch buffer, effects, walk stepping, distance-based gait in five movement modes, whole-frame sprite sequence.');

