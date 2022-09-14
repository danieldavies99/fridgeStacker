(()=>{"use strict";var t,s={92:(t,s,e)=>{var i=e(882);class h extends i.xsS{onInitialize(t){}onActivate(){}onDeactivate(){}}class n extends i.vtX{constructor(t,s,e){let h=255-Math.random()/2*255,n=e?new i.Ilk(175,162,255):new i.Ilk(h,h,h);super({pos:(0,i.Bhw)(t/2,50),width:40,height:80,color:n}),this.hasLanded=!1,this.isBouncy=!1,this.isBouncy=e,this.gameWidth=t,this.gameHeight=s}onInitialize(){this.body.collisionType=i.v2G.Active,this.body.bounciness=this.isBouncy?.75:.05,this.on("collisionstart",(()=>{this.land()})),this.onPostUpdate=()=>{this.isOutOfBounds()&&this.land()}}isOutOfBounds(){return this.pos.x>this.gameWidth||this.pos.x<0||this.pos.y>this.gameHeight||this.pos.y<0}snapLeft(){this.pos.x-=40}snapRight(){this.pos.x+=40}land(){this.hasLanded=!0}getHasLanded(){return this.hasLanded}}const o=new i.R_p([i.bnF.Box(240,80,(0,i.Bhw)(.5,0)),i.bnF.Box(80,80,(0,i.Bhw)(1.5,1))]);class r extends i.mgq{constructor(){super({points:[(0,i.Bhw)(0,0),(0,i.Bhw)(80,0),(0,i.Bhw)(80,80),(0,i.Bhw)(240,80),(0,i.Bhw)(240,160),(0,i.Bhw)(0,160),(0,i.Bhw)(0,80)],color:new i.Ilk(232,72,85)})}}class a extends i.vtX{constructor(t,s){super({pos:(0,i.Bhw)(t,s-100),width:300,height:80,collider:o})}onInitialize(){const t=new r;this.graphics.use(t),this.body.collisionType=i.v2G.Fixed,this.body.bounciness=.05,this.vel=(0,i.Bhw)(-20,0)}}class d extends i.vtX{constructor(t,s,e){let h=255-Math.random()/2*255,n=e?new i.Ilk(175,162,255):new i.Ilk(h,h,h);super({pos:(0,i.Bhw)(t/2,50),width:80,height:40,color:n}),this.hasLanded=!1,this.isBouncy=!1,this.isBouncy=e,this.gameWidth=t,this.gameHeight=s}onInitialize(){this.body.collisionType=i.v2G.Active,this.body.bounciness=this.isBouncy?.75:.05,this.on("collisionstart",(()=>{this.land()})),this.onPostUpdate=()=>{this.isOutOfBounds()&&this.land()}}isOutOfBounds(){return this.pos.x>this.gameWidth||this.pos.x<0||this.pos.y>this.gameHeight||this.pos.y<0}snapLeft(){this.pos.x-=40}snapRight(){this.pos.x+=40}land(){this.hasLanded=!0}getHasLanded(){return this.hasLanded}}class l extends i.vtX{constructor(t,s,e){let h=255-Math.random()/2*255,n=e?new i.Ilk(175,162,255):new i.Ilk(h,h,h);super({pos:(0,i.Bhw)(t/2,50),width:80,height:80,color:n}),this.hasLanded=!1,this.isBouncy=!1,this.isBouncy=e,this.gameWidth=t,this.gameHeight=s}onInitialize(){this.body.collisionType=i.v2G.Active,this.body.bounciness=this.isBouncy?.75:.05,this.on("collisionstart",(()=>{this.land()})),this.onPostUpdate=()=>{this.isOutOfBounds()&&this.land()}}isOutOfBounds(){return this.pos.x>this.gameWidth||this.pos.x<0||this.pos.y>this.gameHeight||this.pos.y<0}snapLeft(){this.pos.x-=40}snapRight(){this.pos.x+=40}land(){this.hasLanded=!0}getHasLanded(){return this.hasLanded}}class u extends i.D4V{constructor(){super({displayMode:i.d1Y.FitScreen,suppressPlayButton:!0,backgroundColor:new i.Ilk(43,58,103)}),this.fridges=[],this.newFridgeQueued=!1}spawnNewFridge(){this.newFridgeQueued=!1;const t=Math.random(),s=Math.random()<.1;let e;e=t<.33?new n(this.drawWidth,this.drawHeight,s):t<.66?new d(this.drawWidth,this.drawHeight,s):new l(this.drawWidth,this.drawHeight,s),this.fridges.push(e),this.levelOne.add(this.fridges[this.fridges.length-1])}getCurrentFridge(){return this.fridges[this.fridges.length-1]}start(){return this.levelOne=new h,this.spawnNewFridge(),this.truck=new a(this.drawWidth,this.drawHeight),this.levelOne.add(this.truck),c.input.keyboard.on("press",(t=>{"ArrowLeft"!==t.key&&"KeyA"!==t.key||this.getCurrentFridge().getHasLanded()||this.getCurrentFridge().snapLeft(),"ArrowRight"!==t.key&&"KeyD"!==t.key||this.getCurrentFridge().getHasLanded()||this.getCurrentFridge().snapRight()})),c.add("levelOne",this.levelOne),this.levelOne.onPostUpdate=()=>{this.getCurrentFridge().getHasLanded()&&!this.newFridgeQueued&&(this.newFridgeQueued=!0,setTimeout((()=>{this.spawnNewFridge()}),1e3))},super.start()}}const c=new u;i.wIZ.useRealisticPhysics(),i.wIZ.acc=(0,i.Bhw)(0,200),c.start().then((()=>{c.goToScene("levelOne")}))}},e={};function i(t){var h=e[t];if(void 0!==h)return h.exports;var n=e[t]={exports:{}};return s[t](n,n.exports,i),n.exports}i.m=s,t=[],i.O=(s,e,h,n)=>{if(!e){var o=1/0;for(l=0;l<t.length;l++){for(var[e,h,n]=t[l],r=!0,a=0;a<e.length;a++)(!1&n||o>=n)&&Object.keys(i.O).every((t=>i.O[t](e[a])))?e.splice(a--,1):(r=!1,n<o&&(o=n));if(r){t.splice(l--,1);var d=h();void 0!==d&&(s=d)}}return s}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[e,h,n]},i.d=(t,s)=>{for(var e in s)i.o(s,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:s[e]})},i.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),(()=>{var t={179:0};i.O.j=s=>0===t[s];var s=(s,e)=>{var h,n,[o,r,a]=e,d=0;if(o.some((s=>0!==t[s]))){for(h in r)i.o(r,h)&&(i.m[h]=r[h]);if(a)var l=a(i)}for(s&&s(e);d<o.length;d++)n=o[d],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(l)},e=self.webpackChunkexcalibur_webpack=self.webpackChunkexcalibur_webpack||[];e.forEach(s.bind(null,0)),e.push=s.bind(null,e.push.bind(e))})();var h=i.O(void 0,[882],(()=>i(92)));h=i.O(h)})();
//# sourceMappingURL=main.js.map