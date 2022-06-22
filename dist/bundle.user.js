// ==UserScript==
// @encoding    utf-8
// @name        namuwiki-powerlink-mitigation
// @description Mitigate powerlink ads from NamuWiki.
// @version     1.2.0
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

(()=>{var o=unsafeWindow||window,i="INITIAL_STATE",t={[i]:[],fired:!1,warningShown:!1},s=new Proxy(console.log,{apply(e,n,r){Reflect.apply(e,n,["[namuwiki-powerlink-mitigation]",...r])}}),d=e=>e,c=()=>{if(t.warningShown)return;let e=(Date.now()*Math.random()*Math.atanh(Date.now())).toString(36).slice(0,6);o.document.querySelector("div#app>div[id]>div+div")?.insertAdjacentHTML("beforebegin",`
<div id="${e}">
  <style>
    #${e} { padding: 2px 16px; }
  </style>
  <p>
    <strong>namuwiki-powerlink-mitigation</strong>
    \uAD11\uACE0 \uAC12\uC774 \uC815\uC0C1\uC801\uC73C\uB85C \uCC28\uB2E8\uB418\uC9C0 \uC54A\uC558\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
    \uC544\uB798\uC5D0\uC11C \uC18D\uC131 \uAC12\uC744 \uBCF5\uC0AC\uD558\uC5EC
    <a
      href="https://github.com/seia-soto/namuwiki-powerlink-mitigation/issues"
    >\uC5EC\uAE30</a>\uC5D0\uC11C \uC81C\uBCF4\uD574\uC8FC\uC138\uC694.
    <br/>

    <button>\uC18D\uC131 \uAC12 \uBCF4\uAE30</button>
  </p>
</div>
`),o.document.getElementById(e)?.querySelector("button")?.addEventListener("click",()=>{let r=JSON.stringify({[i]:t[i],ua:navigator.userAgent}).replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g,"IP_ADDR_HIDDEN");o.prompt("Please copy to clipboard",r)},{once:!0}),t.warningShown=!0},a=e=>{for(let n in e)if(typeof e[n]=="object")e[n]=a(e[n]);else if(typeof e[n]=="string"&&e[n].indexOf("adcr")>=0)try{return JSON.parse(e[n]),s("defusing ad alignments"),t.fired=!0,"[]"}catch(r){d(r)}return e};Object.defineProperty(o,i,{get(){return t[i][t[i].length-1]},set(e){t[i].push(a(e)),t.fired||c()}});})();
