const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/mermaid.core.D2WQHxI7.js","_astro/_commonjsHelpers.CqkleIqs.js"])))=>i.map(i=>d[i]);
const p="modulepreload",E=function(e){return"/"+e},m={},y=function(c,t,i){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),n=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(t.map(r=>{if(r=E(r),r in m)return;m[r]=!0;const d=r.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${f}`))return;const o=document.createElement("link");if(o.rel=d?"stylesheet":p,d||(o.as="script"),o.crossOrigin="",o.href=r,n&&o.setAttribute("nonce",n),document.head.appendChild(o),d)return new Promise((h,g)=>{o.addEventListener("load",h),o.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(a){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=a,window.dispatchEvent(n),!n.defaultPrevented)throw a}return s.then(a=>{for(const n of a||[])n.status==="rejected"&&l(n.reason);return c().catch(l)})};async function u(e){const{default:c}=await y(async()=>{const{default:t}=await import("./mermaid.core.D2WQHxI7.js").then(i=>i.by);return{default:t}},__vite__mapDeps([0,1]));c.initialize({startOnLoad:!1,theme:document.documentElement.dataset.theme==="dark"?"dark":"neutral"});for(const t of Array.from(e)){const i=t.getAttribute("data-content");if(!i)continue;const s=document.createElement("svg");s.id="mermaid-"+Math.round(Math.random()*1e5),t.appendChild(s),c.render(s.id,i.replace(/(%0A)+/g,`
`)).then(l=>{t.innerHTML=l.svg})}}function v(){const e=document.getElementsByClassName("mermaid");e.length>0&&u(e)}v();window.updateDiagrams=function(){const e=document.getElementsByClassName("mermaid");e.length>0&&u(e)};export{y as _};
