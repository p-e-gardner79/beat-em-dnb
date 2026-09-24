const fs = require('fs');
const html = fs.readFileSync('work/template.html','utf8');
const atlas = fs.readFileSync('outputs/promis-lab/sprite-atlas.png').toString('base64');
const walk = fs.readFileSync('outputs/promis-lab/walk-frames.png').toString('base64');
fs.writeFileSync('outputs/promis-lab/Promis.html',html.replace('ATLAS_DATA',atlas).replace('WALK_DATA',walk));
console.log('Built standalone Promis.html');
