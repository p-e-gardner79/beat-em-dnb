const fs=require('fs');let s=fs.readFileSync('work/template.html','utf8');
s=s.replace('let walkParts=null,walkDirection={x:1,y:0};','let walkLoaded=false,walkDirection={x:1,y:0};');
s=s.replace('walk:{frames:[1,1,1,1,1,1,1,1],times:Array(8).fill(144/145/8)}','walk:{frames:[24,25,26,27],times:[.18,.18,.18,.18]}');
s=s.replace("if(a==='walk'&&walkParts){drawWalk(p)}else if(sprite)","if(sprite)");s=s.replace(":a==='walk'?Math.round(Math.sin(p.time*30)*2):0",':0');
s=s.replace('ready=!!walkParts;', 'ready=walkLoaded;');
const start=s.indexOf('// Alternating stance/swing legs'),end=s.indexOf('window.__promis=',start);
s=s.slice(0,start)+`
// Whole-frame sprites: no isolated limbs, rotations, stretching or synthetic joints.
const walkImage=new Image();walkImage.onload=()=>{try{const sheet=document.createElement('canvas');sheet.width=walkImage.width;sheet.height=walkImage.height;const g=sheet.getContext('2d',{willReadFrequently:true});g.drawImage(walkImage,0,0);const pixels=g.getImageData(0,0,sheet.width,sheet.height).data,boxes=[];const cw=Math.floor(sheet.width/2),ch=Math.floor(sheet.height/2);
for(let row=0;row<2;row++)for(let col=0;col<2;col++){let left=(col+1)*cw,right=col*cw,top=(row+1)*ch,bottom=row*ch;for(let y=row*ch;y<(row+1)*ch;y++)for(let x=col*cw;x<(col+1)*cw;x++){if(pixels[(y*sheet.width+x)*4+3]>150){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}}let headLeft=right,headRight=left;for(let y=top;y<top+(bottom-top)*.18;y++)for(let x=left;x<=right;x++){if(pixels[(y*sheet.width+x)*4+3]>150){headLeft=Math.min(headLeft,x);headRight=Math.max(headRight,x)}}boxes.push({left,top,width:right-left+1,height:bottom-top+1,anchor:(headLeft+headRight)/2-25})}
const scale=235/Math.max(...boxes.map(b=>b.height));boxes.forEach((b,i)=>{const c=document.createElement('canvas');c.width=Math.round(b.width*scale/2);c.height=Math.round(b.height*scale/2);const q=c.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(sheet,b.left,b.top,b.width,b.height,0,0,c.width,c.height);sprites[24+i]={canvas:c,left:b.left*scale,anchor:b.anchor*scale,width:b.width*scale,height:b.height*scale}});walkLoaded=true;ready=!!sprites[0];if(ready){$('loading').classList.add('hidden');draw()}}catch(e){$('loading').textContent='Walking sprite preparation failed: '+e.message}};walkImage.onerror=()=>{$('loading').textContent='Could not load walking sprites.'};walkImage.src='data:image/png;base64,WALK_DATA';
`+s.slice(end);
s=s.replace('keys,footPose','keys');s=s.replace('Coordinated walk cycle • Reference-guided artwork','Full-sprite walk cycle • Reference-guided artwork');
// Assign base frames explicitly so image load ordering cannot displace walking frames.
s=s.replace('sprites.push({canvas:s,left,anchor,width,height})','sprites[row*6+col]={canvas:s,left,anchor,width,height}');
fs.writeFileSync('work/template.html',s);
let t=fs.readFileSync('work/test.cjs','utf8');t=t.replace(/for\(const dir of \[\{x:1,y:0\}[\s\S]*?\}\nlab.reset\(\);lab.keys.add\('KeyD'\);tick\(\.1\);/,'lab.reset();lab.keys.add(\'KeyD\');tick(.1);');t=t.replace('planted-foot stability and alternating support','whole-frame sprite sequence');t=t.replace('// One full stride is 144 floor units, regardless of direction or running speed.','// Gait phase follows actual distance in each movement direction.');fs.writeFileSync('work/test.cjs',t);
