import{i as a}from"./init.Gi6I4Gst.js";class o extends Map{constructor(e,t=g){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),null!=e)for(const[t,n]of e)this.set(t,n)}get(e){return super.get(c(this,e))}has(e){return super.has(c(this,e))}set(e,t){return super.set(l(this,e),t)}delete(e){return super.delete(p(this,e))}}function c({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):n}function l({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function p({_intern:e,_key:t},n){const r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function g(e){return null!==e&&"object"==typeof e?e.valueOf():e}const f=Symbol("implicit");function h(){var e=new o,t=[],n=[],r=f;function s(s){let u=e.get(s);if(void 0===u){if(r!==f)return r;e.set(s,u=t.push(s)-1)}return n[u%n.length]}return s.domain=function(n){if(!arguments.length)return t.slice();t=[],e=new o;for(const r of n)e.has(r)||e.set(r,t.push(r)-1);return s},s.range=function(e){return arguments.length?(n=Array.from(e),s):n.slice()},s.unknown=function(e){return arguments.length?(r=e,s):r},s.copy=function(){return h(t,n).unknown(r)},a.apply(s,arguments),s}export{h as o};