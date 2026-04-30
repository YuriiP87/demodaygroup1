import{a as S,i as Q}from"./vendor-BgQWO4R4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const E of n.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&s(E)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const u=document.querySelector("[data-menu]"),q=document.querySelector("[data-menu-open]"),$=document.querySelector("[data-menu-close]");q==null||q.addEventListener("click",()=>{u==null||u.classList.add("is-open"),document.body.classList.add("no-scroll")});$==null||$.addEventListener("click",()=>{u==null||u.classList.remove("is-open"),document.body.classList.remove("no-scroll")});const D="https://your-energy.b.goit.study/api",z=1e4,f={quote:"your-energy-quote",favorites:"your-energy-favorites"},m=S.create({baseURL:D,timeout:z,headers:{"Content-Type":"application/json"}});m.interceptors.response.use(t=>t.data,t=>{var s;if(S.isCancel(t)||t.code==="ERR_CANCELED")return Promise.reject(t);const e=(s=t.response)==null?void 0:s.status,r=t.code==="ECONNABORTED"?"Request timed out. Please try again.":e?`Request failed (${e}).`:"Network error. Please check your connection.";return Q.error({title:"Error",message:r,position:"topRight"}),Promise.reject(t)});function K(t="Muscles",e=1,r=12,{signal:s}={}){return m.get("/filters",{params:{filter:t,page:e,limit:r},signal:s})}function W(t,{signal:e}={}){return m.get("/exercises",{params:t,signal:e})}function Y(t,{signal:e}={}){return m.get(`/exercises/${t}`,{signal:e})}function G({signal:t}={}){return m.get("/quote",{signal:t})}function V(t){return m.post("/subscription",{email:t})}const h=document.querySelector("[data-quote]");function X(){return new Date().toISOString().split("T")[0]}function N({quote:t,author:e}){h&&(h.innerHTML=`
    <div class="quote-head">
      <span>🏃</span>
      <h3>Quote of the day</h3>
      <span>“</span>
    </div>
    <p>${t}</p>
    <strong>${e}</strong>
  `)}async function Z(){if(h)try{const t=JSON.parse(localStorage.getItem(f.quote)),e=X();if(t&&t.date===e){N(t.data);return}const r=await G();localStorage.setItem(f.quote,JSON.stringify({date:e,data:r})),N(r)}catch{h.innerHTML="<p>Quote is temporarily unavailable.</p>"}}Z();const c=document.querySelector("[data-modal]"),b=document.querySelector("[data-modal-content]"),T=document.querySelector("[data-modal-close]");function I(){return JSON.parse(localStorage.getItem(f.favorites))||[]}function H(t){localStorage.setItem(f.favorites,JSON.stringify(t))}function B(t){return I().some(e=>e._id===t)}function x(t){const e=I();B(t._id)?H(e.filter(r=>r._id!==t._id)):H([...e,t]),C(t._id)}function tt(t){const e=B(t._id)?"Remove from favorites":"Add to favorites";b.innerHTML=`
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
  `,b.querySelector("[data-fav-btn]").addEventListener("click",()=>{x(t)})}async function C(t){if(!(!c||!b)){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),b.innerHTML="<p>Loading...</p>";try{const e=await Y(t);tt(e)}catch{b.innerHTML="<p>Failed to load exercise.</p>"}}}function O(){c&&(c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"))}T==null||T.addEventListener("click",O);c==null||c.addEventListener("click",t=>{t.target===c&&O()});document.addEventListener("keydown",t=>{t.key==="Escape"&&O()});const l=document.querySelector("[data-exercises-list]"),_=document.querySelector("[data-search-form]");let p=null;function et(){const t={page:a.page,limit:10,keyword:a.keyword},e={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};return t[e[a.filter]]=a.category.toLowerCase(),t}function rt(t){return`
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
  `}async function U(){if(l){l.innerHTML="<li>Loading...</li>",p==null||p.abort(),p=new AbortController;try{const e=(await W(et(),{signal:p.signal})).results||[];if(!e.length){l.innerHTML="<li>No exercises found.</li>";return}l.innerHTML=e.map(rt).join(""),l.querySelectorAll("[data-start]").forEach(r=>{r.addEventListener("click",()=>{C(r.dataset.start)})})}catch(t){if(S.isCancel(t))return;l.innerHTML="<li>Failed to load exercises.</li>"}}}_&&_.addEventListener("submit",t=>{t.preventDefault(),a.keyword=t.currentTarget.elements.search.value.trim(),a.page=1,U()});const i=document.querySelector("[data-categories-list]"),g=document.querySelector("[data-exercises-list]"),M=document.querySelector("[data-search-form]"),P=document.querySelector("[data-current-category]");let y=null;function at(t){return`
    <li class="category-card" data-category="${t.name}">
      <img src="${t.imgURL}" alt="${t.name}" loading="lazy" />
      <div>
        <h3>${t.name}</h3>
        <p>${t.filter}</p>
      </div>
    </li>
  `}async function j(){if(i){i.classList.remove("is-hidden"),g&&g.classList.add("is-hidden"),i.innerHTML="<li>Loading...</li>",y==null||y.abort(),y=new AbortController;try{const e=(await K(a.filter,a.page,a.limit,{signal:y.signal})).results||[];if(!e.length){i.innerHTML="<li>No categories found.</li>";return}i.innerHTML=e.map(at).join(""),i.querySelectorAll("[data-category]").forEach(r=>{r.addEventListener("click",()=>{a.category=r.dataset.category,a.page=1,a.mode="exercises",i.classList.add("is-hidden"),g==null||g.classList.remove("is-hidden"),M==null||M.classList.remove("is-hidden"),P&&(P.textContent=`/ ${a.category}`),U()})})}catch(t){if(S.isCancel(t))return;i.innerHTML="<li>Failed to load categories.</li>"}}}j();const A=document.querySelectorAll("[data-filter]"),w=document.querySelector("[data-search-form]"),R=document.querySelector("[data-current-category]"),a={filter:"Muscles",category:"",keyword:"",page:1,limit:12,mode:"categories"};A.forEach(t=>{t.addEventListener("click",()=>{A.forEach(e=>e.classList.remove("active")),t.classList.add("active"),a.filter=t.dataset.filter,a.category="",a.keyword="",a.page=1,a.mode="categories",w==null||w.classList.add("is-hidden"),R&&(R.textContent=""),j()})});const v=document.querySelector("[data-favorites-list]"),d=document.querySelector("[data-favorites-empty]");function F(){return JSON.parse(localStorage.getItem(f.favorites))||[]}function ot(t){localStorage.setItem(f.favorites,JSON.stringify(t))}function nt(t){return`
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
  `}function J(){if(!v)return;const t=F();if(!t.length){v.innerHTML="",d==null||d.classList.remove("is-hidden");return}d==null||d.classList.add("is-hidden"),v.innerHTML=t.map(nt).join(""),v.querySelectorAll("[data-start]").forEach(e=>{e.addEventListener("click",()=>C(e.dataset.start))}),v.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>{const r=F().filter(s=>s._id!==e.dataset.remove);ot(r),J()})})}J();const L=document.querySelector("[data-subscribe-form]");L==null||L.addEventListener("submit",async t=>{t.preventDefault();const e=t.currentTarget.elements.email.value.trim();try{await V(e),alert("Subscription created successfully"),L.reset()}catch{alert("Subscription failed. Try another email.")}});const k=document.querySelector("[data-scroll-up]");k&&(window.addEventListener("scroll",()=>{k.classList.toggle("is-visible",window.scrollY>400)}),k.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=main-DImSLy9k.js.map
