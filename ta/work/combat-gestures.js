class CombatGestures{
 constructor(){this.reset()}
 reset(){this.lastAttack=null;this.lastDirection=null}
 attack(action,now){const last=this.lastAttack;this.lastAttack={action,time:now};if(last&&last.action!==action&&now-last.time<=90){this.lastAttack=null;return 'elbow'}return action}
 direction(direction,now){const last=this.lastDirection;this.lastDirection={direction,time:now};if(last&&last.direction===direction&&now-last.time<=260){this.lastDirection=null;return true}return false}
}
if(typeof module!=='undefined')module.exports={CombatGestures};
