// ==UserScript==
// @encoding    utf-8
// @name        namuwiki-powerlink-mitigation
// @description Mitigate powerlink ads from NamuWiki.
// @version     1.0.0
// @author      HoJeong Go <seia@outlook.kr>
// @license     ISC
//
// @namespace   github:seia-soto
// @homepageURL https://github.com/seia-soto/namuwiki-powerlink-mitigation
// @supportURL  https://github.com/seia-soto/namuwiki-powerlink-mitigation/issues
// @updateURL   https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/bundle.user.js
// @downloadURL https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/bundle.user.js
//
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

(()=>{var o=unsafeWindow||window,i="INITIAL_STATE",n={[i]:[],fired:!1,warningShown:!1},s=()=>{if(n.warningShown)return;let e=(Date.now()*Math.random()*Math.atanh(Date.now())).toString(36).slice(0,6);o.document.querySelector("div#app>div[id]>div+div")?.insertAdjacentHTML("beforebegin",`
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
`),o.document.getElementById(e)?.querySelector("button")?.addEventListener("click",()=>{let a=JSON.stringify({[i]:n[i],ua:navigator.userAgent}).replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g,"IP_ADDR_HIDDEN");o.prompt("Please copy to clipboard",a)},{once:!0}),n.warningShown=!0},r=e=>{for(let t in e)typeof e[t]=="object"?e[t]=r(e[t]):t==="enable_ads"&&!isNaN(e[t])&&(console.log("[namuwiki-powerlink-mitigation] defused namuwiki powerlink"),e[t]="0",n.fired=!0);return e};Object.defineProperty(o,i,{get(){return n[i][n[i].length-1]},set(e){n[i].push(r(e)),n.fired||s()}});})();
