const fs=require('fs');
function edit(file,fn){let s=fs.readFileSync(file,'utf8');fs.writeFileSync(file,fn(s))}
edit('work/level-engine.js',s=>s
 .replace("this.roadIndex=0;this.roadStops=[];", "this.stockFinished=false;this.roadIndex=0;this.roadStops=[];")
 .replace("index===1?750:index===2?650:870", "index===1?750:870")
 .replace("spawn(tier,side=1){const l=this.lab;", "spawn(tier,side=1){if(this.zone===1||(this.zone===0&&this.camera>1200)||(this.zone===2&&this.camera>=LEVEL_ZONES[2].x+1600))side=-1;const l=this.lab;")
 .replace("startTravel(){const l=this.lab;", "travelTarget(){return this.zone===2?LEVEL_ZONES[2].x+1920:LEVEL_ZONES[this.zone+1].x}\n startTravel(){const l=this.lab;if(this.zone===2){this.change('travel');l.enemies=[];l.bounds.right=this.travelTarget()+570;l.lane=[292,425];this.roadIndex=0;this.roadStops=[{x:LEVEL_ZONES[2].x+950,roster:['corporate','green']},{x:LEVEL_ZONES[2].x+1700,roster:['black','corporate','green']},{x:LEVEL_ZONES[2].x+2390,roster:['corporate','black']}];return;}")
 .replace("if(this.zone===2){if(l.player.x>this.camera+660&&l.player.y<350", "if(this.zone===2){if(!this.stockFinished){if(l.player.x>this.camera+660)this.startTravel()}else if(l.player.x>this.camera+570&&l.player.y<335")
 .replace("const target=LEVEL_ZONES[this.zone+1].x,desired", "const target=this.travelTarget(),desired")
 .replace("right:this.camera+870};stop.roster", "right:this.camera+(this.zone===2&&this.camera>=target-30?570:870)};stop.roster")
 .replace("else if(this.camera>=target){const px=", "else if(this.camera>=target&&this.zone===2){this.stockFinished=true;this.change('clear');l.bounds.right=this.camera+620;this.emit('clear')}\n  else if(this.camera>=target){const px=")
 .replace("l.bounds.right=LEVEL_ZONES[this.zone+1].x+870;this.emit('clear')", "l.bounds.right=this.travelTarget()+(this.zone===2?620:870);this.emit('clear')")
);
edit('work/level-runtime.js',s=>s.replace("ctx.drawImage(exitArt.stairs,0,0,960,470);return", "drawStockroomWorld();return").replace("if(campaign.zone===2)arcadeText('BASEMENT →',811,268,14)", "if(campaign.zone===2&&campaign.stockFinished)arcadeText('BASEMENT →',590,240,14)"));
edit('work/test-level-v2.cjs',s=>s.replace("assert.equal(ambushes,2)","assert.equal(ambushes,5)"));
