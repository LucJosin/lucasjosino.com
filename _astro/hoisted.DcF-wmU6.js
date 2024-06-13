import"./hoisted.DqF-FDcr.js";var b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},x=function(e){return"IMG"===e.tagName},le=function(e){return NodeList.prototype.isPrototypeOf(e)},A=function(e){return e&&1===e.nodeType},Z=function(e){return".svg"===(e.currentSrc||e.src).substr(-4).toLowerCase()},_=function(e){try{return Array.isArray(e)?e.filter(x):le(e)?[].slice.call(e).filter(x):A(e)?[e].filter(x):"string"==typeof e?[].slice.call(document.querySelectorAll(e)).filter(x):[]}catch{throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},ce=function(e){var t=document.createElement("div");return t.classList.add("medium-zoom-overlay"),t.style.background=e,t},se=function(e){var t=e.getBoundingClientRect(),o=t.top,n=t.left,i=t.width,r=t.height,d=e.cloneNode(),a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,l=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return d.removeAttribute("id"),d.style.position="absolute",d.style.top=o+a+"px",d.style.left=n+l+"px",d.style.width=i+"px",d.style.height=r+"px",d.style.transform="",d},L=function(e,t){var o=b({bubbles:!1,cancelable:!1,detail:void 0},t);if("function"==typeof window.CustomEvent)return new CustomEvent(e,o);var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,o.bubbles,o.cancelable,o.detail),n},ue=function e(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=window.Promise||function(e){function t(){}e(t,t)},i=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];var n=t.reduce((function(e,t){return[].concat(e,_(t))}),[]);return n.filter((function(e){return-1===l.indexOf(e)})).forEach((function(e){l.push(e),e.classList.add("astro-OiydsR_y")})),m.forEach((function(e){var t=e.type,o=e.listener,i=e.options;n.forEach((function(e){e.addEventListener(t,o,i)}))})),g},r=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).target,t=function(){var e={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},t=void 0,o=void 0;if(u.container)if(u.container instanceof Object)t=(e=b({},e,u.container)).width-e.left-e.right-2*u.margin,o=e.height-e.top-e.bottom-2*u.margin;else{var n=(A(u.container)?u.container:document.querySelector(u.container)).getBoundingClientRect(),i=n.width,r=n.height,d=n.left,a=n.top;e=b({},e,{width:i,height:r,left:d,top:a})}t=t||e.width-2*u.margin,o=o||e.height-2*u.margin;var l=f.zoomedHd||f.original,m=Z(l)?t:l.naturalWidth||t,c=Z(l)?o:l.naturalHeight||o,s=l.getBoundingClientRect(),p=s.top,g=s.left,h=s.width,v=s.height,z=Math.min(Math.max(h,m),t)/h,y=Math.min(Math.max(v,c),o)/v,E=Math.min(z,y),w="scale("+E+") translate3d("+((t-h)/2-g+u.margin+e.left)/E+"px, "+((o-v)/2-p+u.margin+e.top)/E+"px, 0)";f.zoomed.style.transform=w,f.zoomedHd&&(f.zoomedHd.style.transform=w)};return new n((function(o){if(e&&-1===l.indexOf(e))o(g);else{if(f.zoomed)o(g);else{if(e)f.original=e;else{if(!(l.length>0))return void o(g);var n=l;f.original=n[0]}if(f.original.dispatchEvent(L("medium-zoom:open",{detail:{zoom:g}})),s=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,c=!0,f.zoomed=se(f.original),document.body.appendChild(p),u.template){var i=A(u.template)?u.template:document.querySelector(u.template);f.template=document.createElement("div"),f.template.appendChild(i.content.cloneNode(!0)),document.body.appendChild(f.template)}if(f.original.parentElement&&"PICTURE"===f.original.parentElement.tagName&&f.original.currentSrc&&(f.zoomed.src=f.original.currentSrc),document.body.appendChild(f.zoomed),window.requestAnimationFrame((function(){document.body.classList.add("medium-zoom--opened")})),f.original.classList.add("medium-zoom-image--hidden"),f.zoomed.classList.add("medium-zoom-image--opened"),f.zoomed.addEventListener("click",d),f.zoomed.addEventListener("transitionend",(function e(){c=!1,f.zoomed.removeEventListener("transitionend",e),f.original.dispatchEvent(L("medium-zoom:opened",{detail:{zoom:g}})),o(g)})),f.original.getAttribute("data-zoom-src")){f.zoomedHd=f.zoomed.cloneNode(),f.zoomedHd.removeAttribute("srcset"),f.zoomedHd.removeAttribute("sizes"),f.zoomedHd.removeAttribute("loading"),f.zoomedHd.src=f.zoomed.getAttribute("data-zoom-src"),f.zoomedHd.onerror=function(){clearInterval(r),console.warn("Unable to reach the zoom image target "+f.zoomedHd.src),f.zoomedHd=null,t()};var r=setInterval((function(){f.zoomedHd.complete&&(clearInterval(r),f.zoomedHd.classList.add("medium-zoom-image--opened"),f.zoomedHd.addEventListener("click",d),document.body.appendChild(f.zoomedHd),t())}),10)}else if(f.original.hasAttribute("srcset")){f.zoomedHd=f.zoomed.cloneNode(),f.zoomedHd.removeAttribute("sizes"),f.zoomedHd.removeAttribute("loading");var a=f.zoomedHd.addEventListener("load",(function(){f.zoomedHd.removeEventListener("load",a),f.zoomedHd.classList.add("medium-zoom-image--opened"),f.zoomedHd.addEventListener("click",d),document.body.appendChild(f.zoomedHd),t()}))}else t()}}}))},d=function(){return new n((function(e){if(!c&&f.original){c=!0,document.body.classList.remove("medium-zoom--opened"),f.zoomed.style.transform="",f.zoomedHd&&(f.zoomedHd.style.transform=""),f.template&&(f.template.style.transition="opacity 150ms",f.template.style.opacity=0),f.original.dispatchEvent(L("medium-zoom:close",{detail:{zoom:g}})),f.zoomed.addEventListener("transitionend",(function t(){f.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(f.zoomed),f.zoomedHd&&document.body.removeChild(f.zoomedHd),document.body.removeChild(p),f.zoomed.classList.remove("medium-zoom-image--opened"),f.template&&document.body.removeChild(f.template),c=!1,f.zoomed.removeEventListener("transitionend",t),f.original.dispatchEvent(L("medium-zoom:closed",{detail:{zoom:g}})),f.original=null,f.zoomed=null,f.zoomedHd=null,f.template=null,e(g)}))}else e(g)}))},a=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).target;return f.original?d():r({target:e})},l=[],m=[],c=!1,s=0,u=o,f={original:null,zoomed:null,zoomedHd:null,template:null};"[object Object]"===Object.prototype.toString.call(t)?u=t:(t||"string"==typeof t)&&i(t),u=b({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},u);var p=ce(u.background);document.addEventListener("click",(function(e){var t=e.target;t!==p?-1!==l.indexOf(t)&&a({target:t}):d()})),document.addEventListener("keyup",(function(e){var t=e.key||e.keyCode;("Escape"===t||"Esc"===t||27===t)&&d()})),document.addEventListener("scroll",(function(){if(!c&&f.original){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(s-e)>u.scrollOffset&&setTimeout(d,150)}})),window.addEventListener("resize",d);var g={open:r,close:d,toggle:a,update:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e;if(e.background&&(p.style.background=e.background),e.container&&e.container instanceof Object&&(t.container=b({},u.container,e.container)),e.template){var o=A(e.template)?e.template:document.querySelector(e.template);t.template=o}return u=b({},u,t),l.forEach((function(e){e.dispatchEvent(L("medium-zoom:update",{detail:{zoom:g}}))})),g},clone:function(){return e(b({},u,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}))},attach:i,detach:function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];f.zoomed&&d();var n=t.length>0?t.reduce((function(e,t){return[].concat(e,_(t))}),[]):l;return n.forEach((function(e){e.classList.remove("astro-OiydsR_y"),e.dispatchEvent(L("medium-zoom:detach",{detail:{zoom:g}}))})),l=l.filter((function(e){return-1===n.indexOf(e)})),g},on:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.forEach((function(n){n.addEventListener("medium-zoom:"+e,t,o)})),m.push({type:"medium-zoom:"+e,listener:t,options:o}),g},off:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.forEach((function(n){n.removeEventListener("medium-zoom:"+e,t,o)})),m=m.filter((function(o){return!(o.type==="medium-zoom:"+e&&o.listener.toString()===t.toString())})),g},getOptions:function(){return u},getImages:function(){return l},getZoomedImage:function(){return f.original}};return g};function fe(e,t){void 0===t&&(t={});var o=t.insertAt;if(!(typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var ge=".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.astro-OiydsR_y{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";fe(ge),ue(document.querySelectorAll("img"),{background:"#000000e0"});const F=document.querySelectorAll("#share"),pe=document.querySelectorAll("#share-title"),M=document.querySelector(".astro-SAoDuxuj"),ve=document.querySelector(".astro-FrecmLpx");function he(){const e=document.body.scrollHeight-window.innerHeight,t=window.scrollY/e*100;ve.style.width=`${t}%`}function ze(){M.addEventListener("click",(()=>window.scrollTo(0,0)))}function ye(){(document.documentElement.scrollTop||document.body.scrollTop)>900?M.classList.add("show"):M.classList.remove("show")}function be(){for(let e=0;e<F.length;e++){const t=F[e],o=pe[e];t.addEventListener("click",(async e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();const n=t.getAttribute("data-href");await navigator.clipboard.writeText(n),o.innerText="Copied!",setTimeout((()=>{o.innerText="Copy link"}),2e3)}))}}window.onload=()=>{ze(),be()},window.onscroll=()=>{he(),ye()};