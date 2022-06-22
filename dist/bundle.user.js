// ==UserScript==
// @encoding    utf-8
// @name        namuwiki-powerlink-mitigation
// @description Mitigate powerlink ads from NamuWiki.
// @version     1.3.0
// @author      HoJeong Go <seia@outlook.kr>
// @license     ISC
//
// @namespace   github:seia-soto
// @homepageURL https://github.com/seia-soto/namuwiki-powerlink-mitigation
// @supportURL  https://github.com/seia-soto/namuwiki-powerlink-mitigation/issues
// @updateURL   https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/bundle.user.js
// @downloadURL https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/bundle.user.js
//
// @match https://namu.wiki
// @match https://namu.wiki/*
//
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

(()=>{var n=unsafeWindow||window,i={secret:Math.random()+(Date.now()*Math.random()).toString(36)},y=new Proxy(console.log,{apply(o,t,e){Reflect.apply(o,t,["[namuwiki-powerlink-mitigation]",...e])}});n.open=new Proxy(n.open,{apply(o,t,e){let[l]=e,r=()=>Reflect.apply(o,t,e);return e.indexOf(i.secret)>=0?l:r()}});n.HTMLTableElement.prototype.appendChild=new Proxy(n.HTMLTableElement.prototype.appendChild,{apply(o,t,e){let[l]=e,r=()=>Reflect.apply(o,t,e);if(!l.querySelectorAll("img").length)return r();let c=l.querySelectorAll("a");for(let d of c){let f=n.open,s=!1;if(n.open=new Proxy(n.open,{apply(m,u,a){a.push(i.secret);let p=Reflect.apply(m,u,a);return typeof p=="string"&&(p.includes("saedu.naver.com/adbiz/searchad/")||p.includes("adcr.naver.com/adcr?x="))&&(s=!0),p}}),d.click(),n.open=f,s)return setTimeout(()=>{y("removing the target element"),t.remove()},1),l}}});})();
