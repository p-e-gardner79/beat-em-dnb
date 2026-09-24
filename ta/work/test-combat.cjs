const assert=require('node:assert/strict');const {CombatLab}=require('./combat-engine.js');
function fixture(){const l=new CombatLab();l.enemyMode='target';l.enemy.x=l.player.x+100;return l}
let l=fixture();l.trigger('punch');l.update(.3);assert.equal(l.enemy.hp,91);l.update(.05);assert.equal(l.enemy.hp,91,'one hit per attack');
for(const [label,change] of [['behind',l=>l.player.face=-1],['depth',l=>l.enemy.y+=50],['range',l=>l.enemy.x+=180]]){l=fixture();change(l);l.trigger('punch');l.update(.3);assert.equal(l.enemy.hp,100,label+' must miss')}
l=fixture();l.trigger('kick');l.update(.3);assert.equal(l.enemy.hp,85);assert(l.enemy.vx>0);
l=fixture();l.trigger('special');l.update(.6);assert.equal(l.enemy.hp,75);assert.equal(l.enemy.action,'down');l.update(1.7);assert.equal(l.enemy.action,'idle');
l=new CombatLab();const initial=l.enemy.x;l.update(2);assert(l.enemy.x<initial);l.update(4);assert(l.player.hp<100,'fight AI attacks');
l=new CombatLab();l.enemyMode='follow';l.update(8);assert.equal(l.player.hp,100);assert(l.enemy.x<450);
l=new CombatLab();l.enemyMode='target';l.update(8);assert.equal(l.enemy.x,665);assert.equal(l.player.hp,100);
l=fixture();l.enemyMode='fight';l.enemy.cooldown=0;l.update(.1);assert.equal(l.enemy.action,'phone');l.update(.5,{dy:-1});assert.equal(l.player.hp,100,'dodge out of lane');
l=fixture();l.enemyMode='fight';l.enemy.cooldown=0;l.update(.1);l.trigger('jump');l.update(.4);assert.equal(l.player.hp,100,'jump clears phone attack');
l=fixture();l.enemyMode='fight';l.enemy.cooldown=0;l.update(.1);l.trigger('punch');l.update(.2);assert.equal(l.enemy.action,'hurt','interrupt windup');assert.equal(l.player.hp,100);
l=fixture();l.enemy.hp=5;l.trigger('punch');l.update(.3);assert(l.over);assert.equal(l.enemy.action,'defeated');assert.equal(l.trigger('kick'),false);l.reset();assert.equal(l.enemy.hp,100);assert.equal(l.over,false);
l=fixture();l.enemyMode='fight';l.god=true;l.update(7);assert.equal(l.player.hp,100);
l=fixture();l.settings.damage=2;l.trigger('punch');l.update(.3);assert.equal(l.enemy.hp,82);l.settings.playerSpeed=200;l.reset();const x=l.player.x;l.enemyMode='target';l.update(.2,{dx:1});assert(Math.abs(l.player.x-x-40)<1e-6);assert.equal(l.settings.damage,2,'reset keeps tuning');
l=fixture();l.inspect={actor:'enemy'};l.set(l.enemy,'phone');l.update(2);assert.equal(l.player.hp,100,'inspection freezes combat');
l=fixture();l.player.x=135;l.player.face=-1;l.update(1,{dx:-1});assert.equal(l.player.x,135);
l=fixture();l.trigger('punch');l.trigger('punch');l.update(.41);assert.equal(l.player.action,'punch');assert.equal(l.player.chain,2);
console.log('PASS: range/facing/depth misses, one hit per attack, damage, knockback, knockdown/recovery, AI pursuit/attacks, target/follow modes, dodge, jump, interruption, KO/reset, invulnerability option, live settings, inspector isolation, boundaries, combo buffer.');
