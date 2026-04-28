(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const u=document.querySelector("[data-menu]"),S=document.querySelector("[data-menu-open]"),$=document.querySelector("[data-menu-close]");S==null||S.addEventListener("click",()=>{u==null||u.classList.add("is-open"),document.body.classList.add("no-scroll")});$==null||$.addEventListener("click",()=>{u==null||u.classList.remove("is-open"),document.body.classList.remove("no-scroll")});const g="https://your-energy.b.goit.study/api",f={quote:"your-energy-quote",favorites:"your-energy-favorites"};async function v(t,e){const r=await fetch(t,e);if(!r.ok)throw new Error(`Request failed: ${r.status}`);return r.json()}function j(t="Muscles",e=1,r=12){const s=new URLSearchParams({filter:t,page:e,limit:r});return v(`${g}/filters?${s}`)}function U(t){const e=new URLSearchParams;return Object.entries(t).forEach(([r,s])=>{s&&e.append(r,s)}),v(`${g}/exercises?${e}`)}function Q(t){return v(`${g}/exercises/${t}`)}function D(){return v(`${g}/quote`)}function K(t){return v(`${g}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})})}const L=document.querySelector("[data-quote]");function W(){return new Date().toISOString().split("T")[0]}function O({quote:t,author:e}){L&&(L.innerHTML=`
    <div class="quote-head">
      <span>🏃</span>
      <h3>Quote of the day</h3>
      <span>“</span>
    </div>
    <p>${t}</p>
    <strong>${e}</strong>
  `)}async function Y(){if(L)try{const t=JSON.parse(localStorage.getItem(f.quote)),e=W();if(t&&t.date===e){O(t.data);return}const r=await D();localStorage.setItem(f.quote,JSON.stringify({date:e,data:r})),O(r)}catch{L.innerHTML="<p>Quote is temporarily unavailable.</p>"}}Y();const c=document.querySelector("[data-modal]"),y=document.querySelector("[data-modal-content]"),q=document.querySelector("[data-modal-close]");function A(){return JSON.parse(localStorage.getItem(f.favorites))||[]}function H(t){localStorage.setItem(f.favorites,JSON.stringify(t))}function I(t){return A().some(e=>e._id===t)}function z(t){const e=A();I(t._id)?H(e.filter(r=>r._id!==t._id)):H([...e,t]),M(t._id)}function G(t){const e=I(t._id)?"Remove from favorites":"Add to favorites";y.innerHTML=`
    <div class="modal-content-grid">
      <img class="modal-img" src="${t.gifUrl}" alt="${t.name}" />

      <div>
        <h2>${t.name}</h2>
        <p>${t.rating} ★★★★★</p>

        <ul class="modal-info">
          <li><b>Target</b><span>${t.target}</span></li>
          <li><b>Body Part</b><span>${t.bodyPart}</span></li>
          <li><b>Equipment</b><span>${t.equipment}</span></li>
          <li><b>Popular</b><span>${t.popularity}</span></li>
          <li><b>Burned Calories</b><span>${t.burnedCalories} / 3 min</span></li>
        </ul>

        <p>${t.description}</p>

        <div class="modal-actions">
          <button type="button" data-fav-btn>${e} ♡</button>
        </div>
      </div>
    </div>
  `,y.querySelector("[data-fav-btn]").addEventListener("click",()=>{z(t)})}async function M(t){if(!(!c||!y)){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),y.innerHTML="<p>Loading...</p>";try{const e=await Q(t);G(e)}catch{y.innerHTML="<p>Failed to load exercise.</p>"}}}function k(){c&&(c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"))}q==null||q.addEventListener("click",k);c==null||c.addEventListener("click",t=>{t.target===c&&k()});document.addEventListener("keydown",t=>{t.key==="Escape"&&k()});const d=document.querySelector("[data-exercises-list]"),P=document.querySelector("[data-search-form]");function V(){const t={page:a.page,limit:10,keyword:a.keyword},e={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};return t[e[a.filter]]=a.category.toLowerCase(),t}function X(t){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <span class="badge">Workout</span>
        <span>${t.rating||"0.0"} ★</span>
        <button type="button" data-start="${t._id}">Start →</button>
      </div>

      <h3>🏃 ${t.name}</h3>

      <p>
        Burned calories: <b>${t.burnedCalories}</b> / 3 min
        &nbsp; Body part: <b>${t.bodyPart}</b>
        &nbsp; Target: <b>${t.target}</b>
      </p>
    </li>
  `}async function R(){if(d){d.innerHTML="<li>Loading...</li>";try{const e=(await U(V())).results||[];if(!e.length){d.innerHTML="<li>No exercises found.</li>";return}d.innerHTML=e.map(X).join(""),d.querySelectorAll("[data-start]").forEach(r=>{r.addEventListener("click",()=>{M(r.dataset.start)})})}catch{d.innerHTML="<li>Failed to load exercises.</li>"}}}P&&P.addEventListener("submit",t=>{t.preventDefault(),a.keyword=t.currentTarget.elements.search.value.trim(),a.page=1,R()});const i=document.querySelector("[data-categories-list]"),m=document.querySelector("[data-exercises-list]"),E=document.querySelector("[data-search-form]"),C=document.querySelector("[data-current-category]");function Z(t){return`
    <li class="category-card" data-category="${t.name}">
      <img src="${t.imgURL}" alt="${t.name}" loading="lazy" />
      <div>
        <h3>${t.name}</h3>
        <p>${t.filter}</p>
      </div>
    </li>
  `}async function B(){if(i){i.classList.remove("is-hidden"),m&&m.classList.add("is-hidden"),i.innerHTML="<li>Loading...</li>";try{const e=(await j(a.filter,a.page,a.limit)).results||[];if(!e.length){i.innerHTML="<li>No categories found.</li>";return}i.innerHTML=e.map(Z).join(""),i.querySelectorAll("[data-category]").forEach(r=>{r.addEventListener("click",()=>{a.category=r.dataset.category,a.page=1,a.mode="exercises",i.classList.add("is-hidden"),m==null||m.classList.remove("is-hidden"),E==null||E.classList.remove("is-hidden"),C&&(C.textContent=`/ ${a.category}`),R()})})}catch{i.innerHTML="<li>Failed to load categories.</li>"}}}B();const N=document.querySelectorAll("[data-filter]"),T=document.querySelector("[data-search-form]"),_=document.querySelector("[data-current-category]"),a={filter:"Muscles",category:"",keyword:"",page:1,limit:12,mode:"categories"};N.forEach(t=>{t.addEventListener("click",()=>{N.forEach(e=>e.classList.remove("active")),t.classList.add("active"),a.filter=t.dataset.filter,a.category="",a.keyword="",a.page=1,a.mode="categories",T==null||T.classList.add("is-hidden"),_&&(_.textContent=""),B()})});const p=document.querySelector("[data-favorites-list]"),l=document.querySelector("[data-favorites-empty]");function F(){return JSON.parse(localStorage.getItem(f.favorites))||[]}function x(t){localStorage.setItem(f.favorites,JSON.stringify(t))}function tt(t){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <span class="badge">Workout</span>
        <button type="button" data-start="${t._id}">Start →</button>
      </div>

      <h3>🏃 ${t.name}</h3>

      <p>
        Burned calories: <b>${t.burnedCalories}</b> / 3 min
        &nbsp; Body part: <b>${t.bodyPart}</b>
        &nbsp; Target: <b>${t.target}</b>
      </p>

      <button class="remove-btn" type="button" data-remove="${t._id}">
        Remove from favorites 🗑
      </button>
    </li>
  `}function J(){if(!p)return;const t=F();if(!t.length){p.innerHTML="",l==null||l.classList.remove("is-hidden");return}l==null||l.classList.add("is-hidden"),p.innerHTML=t.map(tt).join(""),p.querySelectorAll("[data-start]").forEach(e=>{e.addEventListener("click",()=>M(e.dataset.start))}),p.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>{const r=F().filter(s=>s._id!==e.dataset.remove);x(r),J()})})}J();const b=document.querySelector("[data-subscribe-form]");b==null||b.addEventListener("submit",async t=>{t.preventDefault();const e=t.currentTarget.elements.email.value.trim();try{await K(e),alert("Subscription created successfully"),b.reset()}catch{alert("Subscription failed. Try another email.")}});const w=document.querySelector("[data-scroll-up]");w&&(window.addEventListener("scroll",()=>{w.classList.toggle("is-visible",window.scrollY>400)}),w.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=main-UnILYSJo.js.map
