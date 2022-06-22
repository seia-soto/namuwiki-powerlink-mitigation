// ==UserScript==
// @encoding    utf-8
// @name        namuwiki-powerlink-mitigation
// @description Mitigate powerlink ads from NamuWiki.
// @version     1.3.1
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

(()=>{var n=unsafeWindow||window,r={secret:Math.random()+(Date.now()*Math.random()).toString(36)},y=new Proxy(console.log,{apply(l,t,e){Reflect.apply(l,t,["[namuwiki-powerlink-mitigation]",...e])}});n.open=new Proxy(n.open,{apply(l,t,e){let[o]=e,s=()=>Reflect.apply(l,t,e);return e.indexOf(r.secret)>=0?o:s()}});n.HTMLTableElement.prototype.appendChild=new Proxy(n.HTMLTableElement.prototype.appendChild,{apply(l,t,e){let[o]=e,s=()=>Reflect.apply(l,t,e);if(!(o instanceof HTMLElement)||!o.querySelectorAll("img").length)return s();let c=o.querySelectorAll("a");for(let d of c){let f=n.open,a=!1;if(n.open=new Proxy(n.open,{apply(m,u,i){i.push(r.secret);let p=Reflect.apply(m,u,i);return typeof p=="string"&&(p.includes("saedu.naver.com/adbiz/searchad/")||p.includes("adcr.naver.com/adcr?x="))&&(a=!0),p}}),d.click(),n.open=f,a)return setTimeout(()=>{y("removing the target element"),t.remove()},1),o}}});})();
