import{l as i,s as a}from"./back-to-top.BOw8QGJm.js";const r=document.querySelectorAll("#share"),l=document.querySelectorAll("#share-title"),c=document.querySelector(".astro-hyuzazUW");window.onload=()=>{i(),u()};window.onscroll=()=>{d(),a()};function d(){const t=document.body.scrollHeight-window.innerHeight,o=window.scrollY/t*100;c.style.width=`${o}%`}function u(){for(let t=0;t<r.length;t++){const o=r[t],n=l[t];o.addEventListener("click",async e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();const s=o.getAttribute("data-href");await navigator.clipboard.writeText(s),n.innerText="Copied!",setTimeout(()=>{n.innerText="Copy link"},2e3)})}}
