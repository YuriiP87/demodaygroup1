(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const b of n.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&s(b)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const l=document.querySelector("[data-menu]"),L=document.querySelector("[data-menu-open]"),h=document.querySelector("[data-menu-close]");L==null||L.addEventListener("click",()=>{l==null||l.classList.add("is-open"),document.body.classList.add("no-scroll")});h==null||h.addEventListener("click",()=>{l==null||l.classList.remove("is-open"),document.body.classList.remove("no-scroll")});const p="https://your-energy.b.goit.study/api",u={quote:"your-energy-quote",favorites:"your-energy-favorites"};async function y(e,t){const r=await fetch(e,t);if(!r.ok)throw new Error(`Request failed: ${r.status}`);return r.json()}function I(e="Muscles",t=1,r=12){const s=new URLSearchParams({filter:e,page:t,limit:r});return y(`${p}/filters?${s}`)}function R(e){const t=new URLSearchParams;return Object.entries(e).forEach(([r,s])=>{s&&t.append(r,s)}),y(`${p}/exercises?${t}`)}function J(e){return y(`${p}/exercises/${e}`)}function j(){return y(`${p}/quote`)}function U(e){return y(`${p}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})}const v=document.querySelector("[data-quote]");function Q(){return new Date().toISOString().split("T")[0]}function T({quote:e,author:t}){v&&(v.innerHTML=`
    <div class="quote-head">
      <span>🏃</span>
      <h3>Quote of the day</h3>
      <span>“</span>
    </div>
    <p>${e}</p>
    <strong>${t}</strong>
  `)}async function D(){if(v)try{const e=JSON.parse(localStorage.getItem(u.quote)),t=Q();if(e&&e.date===t){T(e.data);return}const r=await j();localStorage.setItem(u.quote,JSON.stringify({date:t,data:r})),T(r)}catch{v.innerHTML="<p>Quote is temporarily unavailable.</p>"}}D();const c=document.querySelector("[data-modal]"),m=document.querySelector("[data-modal-content]"),w=document.querySelector("[data-modal-close]");function C(){return JSON.parse(localStorage.getItem(u.favorites))||[]}function M(e){localStorage.setItem(u.favorites,JSON.stringify(e))}function N(e){return C().some(t=>t._id===e)}function K(e){const t=C();N(e._id)?M(t.filter(r=>r._id!==e._id)):M([...t,e]),q(e._id)}function W(e){const t=N(e._id)?"Remove from favorites":"Add to favorites";m.innerHTML=`
    <div class="modal-content-grid">
      <img class="modal-img" src="${e.gifUrl}" alt="${e.name}" />

      <div>
        <h2>${e.name}</h2>
        <p>${e.rating} ★★★★★</p>

        <ul class="modal-info">
          <li><b>Target</b><span>${e.target}</span></li>
          <li><b>Body Part</b><span>${e.bodyPart}</span></li>
          <li><b>Equipment</b><span>${e.equipment}</span></li>
          <li><b>Popular</b><span>${e.popularity}</span></li>
          <li><b>Burned Calories</b><span>${e.burnedCalories} / 3 min</span></li>
        </ul>

        <p>${e.description}</p>

        <div class="modal-actions">
          <button type="button" data-fav-btn>${t} ♡</button>
        </div>
      </div>
    </div>
  `,m.querySelector("[data-fav-btn]").addEventListener("click",()=>{K(e)})}async function q(e){if(!(!c||!m)){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),m.innerHTML="<p>Loading...</p>";try{const t=await J(e);W(t)}catch{m.innerHTML="<p>Failed to load exercise.</p>"}}}function E(){c&&(c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"))}w&&w.addEventListener("click",E);c&&c.addEventListener("click",e=>{e.target===c&&E()});document.addEventListener("keydown",e=>{e.key==="Escape"&&E()});const d=document.querySelector("[data-exercises-list]"),k=document.querySelector("[data-search-form]");function Y(){const e={page:a.page,limit:10,keyword:a.keyword},t={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};return e[t[a.filter]]=a.category.toLowerCase(),e}function z(e){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <span class="badge">Workout</span>
        <span>${e.rating||"0.0"} ★</span>
        <button type="button" data-start="${e._id}">Start →</button>
      </div>

      <h3>🏃 ${e.name}</h3>

      <p>
        Burned calories: <b>${e.burnedCalories}</b> / 3 min
        &nbsp; Body part: <b>${e.bodyPart}</b>
        &nbsp; Target: <b>${e.target}</b>
      </p>
    </li>
  `}async function _(){if(d){d.innerHTML="<li>Loading...</li>";try{const t=(await R(Y())).results||[];if(!t.length){d.innerHTML="<li>No exercises found.</li>";return}d.innerHTML=t.map(z).join(""),d.querySelectorAll("[data-start]").forEach(r=>{r.addEventListener("click",()=>{q(r.dataset.start)})})}catch{d.innerHTML="<li>Failed to load exercises.</li>"}}}k&&k.addEventListener("submit",e=>{e.preventDefault(),a.keyword=e.currentTarget.elements.search.value.trim(),a.page=1,_()});const i=document.querySelector("[data-categories-list]"),G=document.querySelector("[data-exercises-list]"),x=document.querySelector("[data-search-form]"),V=document.querySelector("[data-current-category]");function X(e){return`
    <li class="category-card" data-category="${e.name}">
      <img src="${e.imgURL}" alt="${e.name}" loading="lazy" />
      <div>
        <h3>${e.name}</h3>
        <p>${e.filter}</p>
      </div>
    </li>
  `}async function A(){if(i){i.innerHTML="<li>Loading...</li>";try{const t=(await I(a.filter,a.page,a.limit)).results||[];if(!t.length){i.innerHTML="<li>No categories found.</li>";return}i.innerHTML=t.map(X).join(""),i.querySelectorAll("[data-category]").forEach(r=>{r.addEventListener("click",()=>{a.category=r.dataset.category,a.page=1,a.mode="exercises",i.classList.add("is-hidden"),G.classList.remove("is-hidden"),x.classList.remove("is-hidden"),V.textContent=`/ ${a.category}`,_()})})}catch{i.innerHTML="<li>Failed to load categories.</li>"}}}A();const O=document.querySelectorAll("[data-filter]"),F=document.querySelector("[data-search-form]"),H=document.querySelector("[data-current-category]"),a={filter:"Muscles",category:"",keyword:"",page:1,limit:12,mode:"categories"};O.forEach(e=>{e.addEventListener("click",()=>{O.forEach(t=>t.classList.remove("active")),e.classList.add("active"),a.filter=e.dataset.filter,a.category="",a.keyword="",a.page=1,a.mode="categories",F&&F.classList.add("is-hidden"),H&&(H.textContent=""),A()})});const f=document.querySelector("[data-favorites-list]"),g=document.querySelector("[data-favorites-empty]");function P(){return JSON.parse(localStorage.getItem(u.favorites))||[]}function Z(e){localStorage.setItem(u.favorites,JSON.stringify(e))}function ee(e){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <span class="badge">Workout</span>
        <button type="button" data-start="${e._id}">Start →</button>
      </div>

      <h3>🏃 ${e.name}</h3>

      <p>
        Burned calories: <b>${e.burnedCalories}</b> / 3 min
        &nbsp; Body part: <b>${e.bodyPart}</b>
        &nbsp; Target: <b>${e.target}</b>
      </p>

      <button class="remove-btn" type="button" data-remove="${e._id}">
        Remove from favorites 🗑
      </button>
    </li>
  `}function B(){if(!f)return;const e=P();if(!e.length){f.innerHTML="",g.classList.remove("is-hidden");return}g==null||g.classList.add("is-hidden"),f.innerHTML=e.map(ee).join(""),f.querySelectorAll("[data-start]").forEach(t=>{t.addEventListener("click",()=>q(t.dataset.start))}),f.querySelectorAll("[data-remove]").forEach(t=>{t.addEventListener("click",()=>{const r=P().filter(s=>s._id!==t.dataset.remove);Z(r),B()})})}B();const S=document.querySelector("[data-subscribe-form]");S&&S.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.elements.email.value.trim();try{await U(t),alert("Subscription created successfully"),S.reset()}catch{alert("Subscription failed. Try another email.")}});const $=document.querySelector("[data-scroll-up]");$&&(window.addEventListener("scroll",()=>{$.classList.toggle("is-visible",window.scrollY>400)}),$.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=main-BXjn2ulz.js.map
