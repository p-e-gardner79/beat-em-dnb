const fs=require('fs');let s=fs.readFileSync('work/template.html','utf8');
s=s.replace("walk:{frames:[1,2,3,4],times:[.105,.105,.105,.105]}","walk:{frames:[1,1,1,1,1,1,1,1],times:Array(8).fill(144/145/8)}");
s=s.replace('const W=960,H=470,keys=new Set(),sprites=[];','const W=960,H=470,keys=new Set(),sprites=[];\nlet walkParts=null,walkDirection={x:1,y:0};');
s=s.replace("player.time+=dt;const impact", "if(a!=='walk'||mode!=='free')player.time+=dt;const impact");
const start=s.indexOf("const run=keys.has('ShiftLeft')");const end=s.indexOf("\nif(player.time>=duration",start);
s=s.slice(0,start)+`const run=keys.has('ShiftLeft')||keys.has('ShiftRight'),v=run?235:145,n=Math.hypot(dx,dy)||1,ox=player.x,oy=player.y;player.x=Math.max(145,Math.min(W-145,player.x+dx/n*v*dt));player.y=Math.max(270,Math.min(435,player.y+dy/n*v*.55*dt));if(player.action!=='jump'){const mx=player.x-ox,my=(player.y-oy)/.55,dist=Math.hypot(mx,my),next=dist>.00001?'walk':'idle';if(next!==player.action)setAction(next);if(next==='walk'){walkDirection={x:mx/dist,y:my/dist};player.time+=dist/145}}}
`+s.slice(end);
s=s.replace("if(sprite){let bob=", "if(a==='walk'&&walkParts){drawWalk(p)}else if(sprite){let bob=");
s=s.replace("ready=true;$('loading')", "ready=!!walkParts;if(ready)$('loading')");
s=s.replace("const seq=sequences[player.action],f=frameAt", "if(player.action==='walk'&&mode==='free'){mode='walk';$('sequence').value='walk';keys.clear()}const seq=sequences[player.action],f=frameAt");
s=s.replace('24 generated sprite poses • Reference-guided artwork','Coordinated walk cycle • Reference-guided artwork');
const rig=`
// Alternating stance/swing legs, textured with the reference-guided pixel artwork.
// Gait phase is distance-based. Support feet travel backwards relative to the body.
function footPose(phase,dir){const t=((phase%1)+1)%1,stance=t<.5,u=stance?t*2:(t-.5)*2,forward=stance?36-72*u:-36+72*u,lift=stance?0:Math.sin(Math.PI*u)*19;return {x:forward*dir.x,y:forward*dir.y*.55-lift,stance}}
function drawWalk(p){const phase=p.time/duration('walk'),dir=mode==='free'?{x:walkDirection.x*p.face,y:walkDirection.y}:{x:1,y:0};const bob=Math.cos(phase*Math.PI*4)*1.4;ctx.save();ctx.translate(Math.round(p.x),Math.round(p.y));ctx.scale(p.face,1);
function leg(offset,far){const foot=footPose(phase+offset,dir),hip={x:far?-8:6,y:-94+bob},ankle={x:foot.x+(far?-6:6),y:foot.y-13+(far?-3:1)},vx=ankle.x-hip.x,vy=ankle.y-hip.y,d=Math.min(91,Math.hypot(vx,vy)),L=48,h=Math.sqrt(Math.max(0,L*L-d*d/4)),nx=vx/(Math.hypot(vx,vy)||1),ny=vy/(Math.hypot(vx,vy)||1),knee={x:hip.x+nx*d/2+ny*h,y:hip.y+ny*d/2-nx*h};ctx.save();if(far)ctx.filter='brightness(0.72)';
function segment(part,a,b,w){ctx.save();ctx.translate(Math.round(a.x),Math.round(a.y));ctx.rotate(Math.atan2(b.y-a.y,b.x-a.x)-Math.PI/2);ctx.drawImage(part,-w/2,-5,w,Math.hypot(b.x-a.x,b.y-a.y)+10);ctx.restore()}
segment(walkParts.thigh,hip,knee,31);segment(walkParts.shin,knee,ankle,28);ctx.drawImage(walkParts.shoe,Math.round(ankle.x-17),Math.round(ankle.y-7),51,23);ctx.restore()}
leg(.5,true);leg(0,false);ctx.drawImage(walkParts.body,-67,Math.round(-227+bob),141,149);ctx.restore()}
const walkImage=new Image();walkImage.onload=()=>{const c=document.createElement('canvas');c.width=walkImage.width;c.height=walkImage.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(walkImage,0,0);const im=g.getImageData(0,0,c.width,c.height);for(let i=0;i<im.data.length;i+=4){let d=im.data;if(d[i]>100&&d[i+2]>100&&d[i]>d[i+1]*1.45&&d[i+2]>d[i+1]*1.45)d[i+3]=0}g.putImageData(im,0,0);
function part(x,y,w,h,polygon){let t=document.createElement('canvas');t.width=Math.ceil(w/2);t.height=Math.ceil(h/2);let q=t.getContext('2d');q.imageSmoothingEnabled=false;if(polygon){q.beginPath();polygon.forEach(([a,b],i)=>i?q.lineTo(a/2,b/2):q.moveTo(a/2,b/2));q.closePath();q.clip()}q.drawImage(c,x,y,w,h,0,0,t.width,t.height);return t}
walkParts={body:part(830,90,235,248,[[0,0],[235,0],[235,223],[79,223],[79,248],[0,248]]),thigh:part(913,311,52,77),shin:part(917,378,48,67),shoe:part(913,441,89,39)};ready=sprites.length===24;if(ready){$('loading').classList.add('hidden');draw()}};walkImage.onerror=()=>{$('loading').textContent='Could not load walking artwork.'};walkImage.src='data:image/png;base64,WALK_DATA';
`;
s=s.replace('window.__promis=',rig+'\nwindow.__promis=');s=s.replace('trigger,update,reset,step,frameAt,duration,sequences,keys','trigger,update,reset,step,frameAt,duration,sequences,keys,footPose');fs.writeFileSync('work/template.html',s);
