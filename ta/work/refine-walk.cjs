const fs=require('fs');let s=fs.readFileSync('work/template.html','utf8');
s=s.replace('<option value="walk">Walk cycle</option>','<option value="walk">Walk sideways</option><option value="walkUp">Walk away / up</option><option value="walkDown">Walk toward / down</option>');
s=s.replace("dir=mode==='free'?{x:walkDirection.x*p.face,y:walkDirection.y}:{x:1,y:0}","dir={x:walkDirection.x*p.face,y:walkDirection.y}");
s=s.replace("mode=e.target.value;keys.clear();queued=null;particles=[];rings=[];shake=0;setAction(mode==='free'?'idle':mode);", "mode=e.target.value;walkDirection=mode==='walkUp'?{x:0,y:-1}:mode==='walkDown'?{x:0,y:1}:{x:1,y:0};if(mode==='walkUp'||mode==='walkDown')mode='walk';keys.clear();queued=null;particles=[];rings=[];shake=0;setAction(mode==='free'?'idle':mode);");
fs.writeFileSync('work/template.html',s);
