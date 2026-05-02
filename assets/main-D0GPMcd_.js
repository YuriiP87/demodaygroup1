import{a as T,i as tt}from"./vendor-Di1_TD7j.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const v=document.querySelector("[data-menu]"),H=document.querySelector("[data-menu-open]"),A=document.querySelector("[data-menu-close]");H==null||H.addEventListener("click",()=>{v==null||v.classList.add("is-open"),document.body.classList.add("no-scroll")});A==null||A.addEventListener("click",()=>{v==null||v.classList.remove("is-open"),document.body.classList.remove("no-scroll")});const et="https://your-energy.b.goit.study/api",at=1e4,L={quote:"your-energy-quote",favorites:"your-energy-favorites"},E=T.create({baseURL:et,timeout:at,headers:{"Content-Type":"application/json"}});E.interceptors.response.use(t=>t.data,t=>{var r;if(T.isCancel(t)||t.code==="ERR_CANCELED")return Promise.reject(t);const e=(r=t.response)==null?void 0:r.status,a=t.code==="ECONNABORTED"?"Request timed out. Please try again.":e?`Request failed (${e}).`:"Network error. Please check your connection.";return tt.error({title:"Error",message:a,position:"topRight"}),Promise.reject(t)});function nt(t="Muscles",e=1,a=12,{signal:r}={}){return E.get("/filters",{params:{filter:t,page:e,limit:a},signal:r})}function rt(t,{signal:e}={}){return E.get("/exercises",{params:t,signal:e})}function st(t,{signal:e}={}){return E.get(`/exercises/${t}`,{signal:e})}function it({signal:t}={}){return E.get("/quote",{signal:t})}const x=document.querySelector("[data-quote]");function ot(){return new Date().toISOString().split("T")[0]}function U({quote:t,author:e}){x&&(x.innerHTML=`
    <div class='quote-block'>
      <div class='quote-icon-wrap'>
        <svg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M17.7293 5.90698C17.4611 5.59399 16.9834 5.55284 16.6631 5.81384L14.5637 7.53692L13.5983 5.19977C13.564 5.11205 13.5119 5.03841 13.452 4.97342C13.2547 4.54455 12.9122 4.17633 12.44 3.96297C12.235 3.872 12.0233 3.82326 11.8116 3.79944C11.765 3.77561 11.7229 3.7442 11.6697 3.72796L7.9754 2.72184C7.76813 2.6666 7.55975 2.70234 7.38905 2.79981C7.18621 2.86696 7.0122 3.011 6.92907 3.22002L5.53802 6.71491C5.38728 7.09505 5.58014 7.52392 5.9703 7.67338C6.35824 7.82067 6.79827 7.63114 6.95012 7.24992L8.12503 4.29871L9.80759 4.75574C9.76657 4.82072 9.72224 4.88137 9.68899 4.95068L7.53204 9.51884C7.501 9.58598 7.48438 9.65421 7.46221 9.72353L4.84084 14.0177L0.453779 15.4516C-0.0427858 15.8144 -0.148084 16.4978 0.218797 16.983C0.587895 17.4692 1.28951 17.5721 1.78497 17.2137L6.274 15.7029C6.41144 15.6054 6.5112 15.4776 6.58657 15.34C6.6431 15.2816 6.70738 15.235 6.75061 15.1624L8.31346 12.6022L11.0878 14.9123L8.11949 18.1808C7.71049 18.6313 7.7515 19.3255 8.21481 19.7241C8.67702 20.1259 9.38528 20.0836 9.7965 19.6309L13.5008 15.5534C13.6161 15.4278 13.6848 15.2826 13.7313 15.131C13.759 15.0487 13.759 14.9632 13.7657 14.8776C13.7657 14.8343 13.7823 14.7953 13.779 14.7552C13.769 14.4563 13.6449 14.1661 13.3944 13.9592L10.8417 11.8322C11.0257 11.661 11.182 11.4574 11.2951 11.2181L12.9488 7.71887L13.4786 9.09754C13.5008 9.21992 13.5429 9.34014 13.6316 9.44086C13.7114 9.534 13.8134 9.59573 13.922 9.63905C13.9331 9.64447 13.9464 9.64555 13.9597 9.6488C14.0284 9.67263 14.0982 9.69537 14.1703 9.69862C14.2556 9.7062 14.3421 9.69537 14.4296 9.67154C14.4318 9.67046 14.4329 9.67046 14.4329 9.67046C14.4562 9.66504 14.4795 9.66938 14.5028 9.65963C14.6258 9.61414 14.72 9.53725 14.8009 9.44736L17.8136 6.94884C18.1339 6.68567 17.9987 6.21997 17.7293 5.90698Z' fill='#F4F4F4'/>
          <path d='M13.9191 4.12629C15.0853 4.12629 16.0306 3.20259 16.0306 2.06314C16.0306 0.923701 15.0853 0 13.9191 0C12.753 0 11.8076 0.923701 11.8076 2.06314C11.8076 3.20259 12.753 4.12629 13.9191 4.12629Z' fill='#F4F4F4'/>
        </svg>
      </div>
      <div class='quote-text'>
        <h3 class='quote-title'>Quote of the day</h3>
        <p class='quote-body'>${t}</p>
      </div>
    </div>
    <p class='quote-author'>${e}</p>
    <svg class='quote-commas' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' fill='#f4f4f4'/>
    </svg>
  `)}async function ct(){if(x)try{const t=JSON.parse(localStorage.getItem(L.quote)),e=ot();if(t&&t.date===e){U(t.data);return}const a=await it();localStorage.setItem(L.quote,JSON.stringify({date:e,data:a})),U(a)}catch{x.innerHTML="<p>Quote is temporarily unavailable.</p>"}}ct();const z=document.querySelectorAll("[data-filter]"),N=document.querySelector("[data-search-form]"),V=document.querySelector("[data-current-category]"),s={filter:"Muscles",category:"",keyword:"",page:1,limit:12,mode:"categories"};function lt(t){z.forEach(e=>{e.addEventListener("click",()=>{z.forEach(a=>a.classList.remove("active")),e.classList.add("active"),s.filter=e.dataset.filter,s.category="",s.keyword="",s.page=1,s.mode="categories",N==null||N.classList.add("is-hidden"),V&&(V.textContent=""),t()})})}const c=document.querySelector("[data-modal]"),l=document.querySelector("[data-modal-content]"),_=document.querySelector("[data-modal-close]");let k=null,f=0;function Y(){return JSON.parse(localStorage.getItem(L.favorites))||[]}function Z(t){localStorage.setItem(L.favorites,JSON.stringify(t))}function G(t){return Y().some(e=>e._id===t)}function dt(t){const e=Number(t)||0,a=Math.round(e);return Array.from({length:5},(r,n)=>`<span class="${n<a?"is-active":""}">★</span>`).join("")}function D(t=0){return Array.from({length:5},(e,a)=>{const r=a+1;return`
      <button
        class="rating-star ${r<=t?"is-active":""}"
        type="button"
        data-rating-value="${r}"
        aria-label="Rate ${r}"
      >
        ★
      </button>
    `}).join("")}function ut(t){const e=Y();G(t._id)?Z(e.filter(a=>a._id!==t._id)):Z([...e,t]),P(t)}function P(t){var a,r;k=t;const e=G(t._id)?"Remove from favorites":"Add to favorites";l.innerHTML=`
    <div class="modal-content-grid">
      <img class="modal-img" src="${t.gifUrl}" alt="${t.name}" />

      <div class="modal-details">
        <h2>${t.name}</h2>

        <div class="modal-rating">
          <span class="modal-rating-number">${Number(t.rating||0).toFixed(1)}</span>

          <div class="modal-stars">
            ${dt(t.rating)}
          </div>
        </div>

        <ul class="modal-info">
          <li><b>Target</b><span>${t.target}</span></li>
          <li><b>Body Part</b><span>${t.bodyPart}</span></li>
          <li><b>Equipment</b><span>${t.equipment}</span></li>
          <li><b>Popular</b><span>${t.popularity}</span></li>
          <li><b>Burned calories</b><span>${t.burnedCalories} / 3 min</span></li>
        </ul>

        <p class="modal-description">${t.description}</p>

        <div class="modal-actions">
          <button class="favorite-btn" type="button" data-fav-btn>
            ${e}
            <span>♡</span>
          </button>

          <button class="rating-btn" type="button" data-open-rating>
            Give a rating
          </button>
        </div>
      </div>
    </div>
  `,(a=l.querySelector("[data-fav-btn]"))==null||a.addEventListener("click",()=>{ut(t)}),(r=l.querySelector("[data-open-rating]"))==null||r.addEventListener("click",()=>{gt()})}function gt(){f=0,l.innerHTML=`
    <form class="rating-form" data-rating-form>
      <label class="rating-label">Rating</label>

      <div class="rating-form-top">
        <span class="rating-current" data-rating-current>0.0</span>

        <div class="rating-stars-interactive" data-rating-stars>
          ${D(f)}
        </div>
      </div>

      <input
        class="rating-input"
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <textarea
        class="rating-textarea"
        name="comment"
        placeholder="Your comment"
        required
      ></textarea>

      <button class="rating-send-btn" type="submit">
        Send
      </button>
    </form>
  `;const t=l.querySelector("[data-rating-current]"),e=l.querySelector("[data-rating-stars]"),a=l.querySelector("[data-rating-form]");e==null||e.addEventListener("click",r=>{const n=r.target.closest("[data-rating-value]");n&&(f=Number(n.dataset.ratingValue),t.textContent=f.toFixed(1),e.innerHTML=D(f))}),a==null||a.addEventListener("submit",r=>{if(r.preventDefault(),!k){R();return}P(k)})}async function K(t){if(!(!c||!l)){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),l.innerHTML='<p class="modal-loading">Loading...</p>';try{const e=await st(t);P(e)}catch{l.innerHTML='<p class="modal-error">Failed to load exercise.</p>'}}}function R(){c&&(c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),k=null,f=0)}_==null||_.addEventListener("click",R);c==null||c.addEventListener("click",t=>{t.target===c&&R()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!(c!=null&&c.classList.contains("is-hidden"))&&R()});const pt=new URL("data:image/svg+xml,%3csvg%20width='18'%20height='20'%20viewBox='0%200%2018%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.3232%205.90673C17.0611%205.59374%2016.5944%205.55259%2016.2814%205.81359L14.2301%207.53667L13.2868%205.19953C13.2533%205.1118%2013.2024%205.03816%2013.1439%204.97318C12.9511%204.5443%2012.6164%204.17608%2012.1551%203.96272C11.9547%203.87175%2011.7479%203.82302%2011.541%203.79919C11.4955%203.77536%2011.4544%203.74396%2011.4024%203.72771L7.79271%202.72159C7.59019%202.66636%207.38658%202.7021%207.2198%202.79957C7.02161%202.86672%206.85157%203.01076%206.77035%203.21978L5.41116%206.71466C5.26388%207.0948%205.45232%207.52367%205.83354%207.67313C6.21259%207.82042%206.64255%207.63089%206.79092%207.24967L7.93892%204.29846L9.58293%204.75549C9.54286%204.82047%209.49954%204.88112%209.46705%204.95043L7.3595%209.51858C7.32918%209.58573%207.31294%209.65396%207.29128%209.72327L4.72995%2014.0174L0.443384%2015.4513C-0.0418057%2015.8141%20-0.144692%2016.4975%200.213785%2016.9827C0.574429%2017.469%201.25998%2017.5719%201.74408%2017.2134L6.13029%2015.7026C6.26458%2015.6051%206.36205%2015.4773%206.4357%2015.3398C6.49093%2015.2813%206.55374%2015.2347%206.59598%2015.1622L8.12303%2012.6019L10.8338%2014.912L7.9335%2018.1805C7.53387%2018.6311%207.57394%2019.3253%208.02664%2019.7238C8.47826%2020.1256%209.1703%2020.0834%209.5721%2019.6307L13.1915%2015.5531C13.3042%2015.4275%2013.3713%2015.2824%2013.4168%2015.1308C13.4439%2015.0484%2013.4439%2014.9629%2013.4504%2014.8773C13.4504%2014.834%2013.4666%2014.795%2013.4634%2014.7549C13.4536%2014.456%2013.3323%2014.1658%2013.0876%2013.9589L10.5934%2011.8319C10.7732%2011.6608%2010.9259%2011.4572%2011.0363%2011.2178L12.6522%207.71861L13.1699%209.09729C13.1915%209.21967%2013.2327%209.33988%2013.3193%209.4406C13.3973%209.53374%2013.4969%209.59547%2013.6031%209.6388C13.6139%209.64421%2013.6269%209.64529%2013.6399%209.64854C13.707%209.67237%2013.7753%209.69511%2013.8457%209.69836C13.9291%209.70594%2014.0135%209.69511%2014.0991%209.67129C14.1013%209.6702%2014.1023%209.6702%2014.1023%209.6702C14.1251%209.66479%2014.1478%209.66912%2014.1706%209.65937C14.2908%209.61389%2014.3828%209.53699%2014.4619%209.4471L17.4055%206.94859C17.7185%206.68542%2017.5864%206.21972%2017.3232%205.90673Z'%20fill='%23242424'/%3e%3cpath%20d='M13.6002%204.12628C14.7397%204.12628%2015.6634%203.20258%2015.6634%202.06314C15.6634%200.923699%2014.7397%200%2013.6002%200C12.4608%200%2011.5371%200.923699%2011.5371%202.06314C11.5371%203.20258%2012.4608%204.12628%2013.6002%204.12628Z'%20fill='%23242424'/%3e%3c/svg%3e",import.meta.url).href,mt=new URL("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.5%2014L14%207.5M14%207.5L7.5%201M14%207.5H1'%20stroke='%23242424'%20stroke-width='1.3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",import.meta.url).href,p=document.querySelector("[data-exercises-list]"),J=document.querySelector("[data-search-form]"),d=document.querySelector("[data-pagination]");let y=null;function ft(){const t={page:s.page,limit:10,keyword:s.keyword},e={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};return t[e[s.filter]]=s.category.toLowerCase(),t}function vt(t){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <div class="exercise-card-meta">
          <span class="badge">Workout</span>
          <span class="exercise-rating">${t.rating||"0.0"} ★</span>
        </div>

        <button class="start-btn" type="button" data-start="${t._id}">
          Start
          <img src="${mt}" alt="" />
        </button>
      </div>

      <div class="exercise-card-title">
        <span class="exercise-icon" aria-hidden="true">
          <img src="${pt}" alt="" />
        </span>

        <h3>${t.name}</h3>
      </div>

      <p class="exercise-info">
        <span>Burned calories: <b>${t.burnedCalories}</b> / 3 min</span>
        <span>Body part: <b>${t.bodyPart}</b></span>
        <span>Target: <b>${t.target}</b></span>
      </p>
    </li>
  `}function Lt(t){if(!d)return;const e=Array.from({length:t},(a,r)=>{const n=r+1;return`
      <button
        class="pagination-btn ${n===s.page?"active":""}"
        type="button"
        data-page="${n}"
      >
        ${n}
      </button>
    `}).join("");d.innerHTML=e}async function B(){if(p){p.innerHTML="<li>Loading...</li>",y==null||y.abort(),y=new AbortController;try{const t=await rt(ft(),{signal:y.signal}),e=t.results||[];if(!e.length){p.innerHTML="<li>No exercises found.</li>",d&&(d.innerHTML="");return}p.innerHTML=e.map(vt).join(""),Lt(t.totalPages||3),p.querySelectorAll("[data-start]").forEach(a=>{a.addEventListener("click",()=>{K(a.dataset.start)})})}catch(t){if(T.isCancel(t))return;p.innerHTML="<li>Failed to load exercises.</li>",d&&(d.innerHTML="")}}}d==null||d.addEventListener("click",t=>{t.target.classList.contains("pagination-btn")&&s.mode==="exercises"&&(s.page=Number(t.target.dataset.page),B())});J&&J.addEventListener("submit",t=>{t.preventDefault(),s.keyword=t.currentTarget.elements.search.value.trim(),s.page=1,B()});const Ct=new URL("data:image/svg+xml,%3csvg%20width='18'%20height='20'%20viewBox='0%200%2018%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.3232%205.90673C17.0611%205.59374%2016.5944%205.55259%2016.2814%205.81359L14.2301%207.53667L13.2868%205.19953C13.2533%205.1118%2013.2024%205.03816%2013.1439%204.97318C12.9511%204.5443%2012.6164%204.17608%2012.1551%203.96272C11.9547%203.87175%2011.7479%203.82302%2011.541%203.79919C11.4955%203.77536%2011.4544%203.74396%2011.4024%203.72771L7.79271%202.72159C7.59019%202.66636%207.38658%202.7021%207.2198%202.79957C7.02161%202.86672%206.85157%203.01076%206.77035%203.21978L5.41116%206.71466C5.26388%207.0948%205.45232%207.52367%205.83354%207.67313C6.21259%207.82042%206.64255%207.63089%206.79092%207.24967L7.93892%204.29846L9.58293%204.75549C9.54286%204.82047%209.49954%204.88112%209.46705%204.95043L7.3595%209.51858C7.32918%209.58573%207.31294%209.65396%207.29128%209.72327L4.72995%2014.0174L0.443384%2015.4513C-0.0418057%2015.8141%20-0.144692%2016.4975%200.213785%2016.9827C0.574429%2017.469%201.25998%2017.5719%201.74408%2017.2134L6.13029%2015.7026C6.26458%2015.6051%206.36205%2015.4773%206.4357%2015.3398C6.49093%2015.2813%206.55374%2015.2347%206.59598%2015.1622L8.12303%2012.6019L10.8338%2014.912L7.9335%2018.1805C7.53387%2018.6311%207.57394%2019.3253%208.02664%2019.7238C8.47826%2020.1256%209.1703%2020.0834%209.5721%2019.6307L13.1915%2015.5531C13.3042%2015.4275%2013.3713%2015.2824%2013.4168%2015.1308C13.4439%2015.0484%2013.4439%2014.9629%2013.4504%2014.8773C13.4504%2014.834%2013.4666%2014.795%2013.4634%2014.7549C13.4536%2014.456%2013.3323%2014.1658%2013.0876%2013.9589L10.5934%2011.8319C10.7732%2011.6608%2010.9259%2011.4572%2011.0363%2011.2178L12.6522%207.71861L13.1699%209.09729C13.1915%209.21967%2013.2327%209.33988%2013.3193%209.4406C13.3973%209.53374%2013.4969%209.59547%2013.6031%209.6388C13.6139%209.64421%2013.6269%209.64529%2013.6399%209.64854C13.707%209.67237%2013.7753%209.69511%2013.8457%209.69836C13.9291%209.70594%2014.0135%209.69511%2014.0991%209.67129C14.1013%209.6702%2014.1023%209.6702%2014.1023%209.6702C14.1251%209.66479%2014.1478%209.66912%2014.1706%209.65937C14.2908%209.61389%2014.3828%209.53699%2014.4619%209.4471L17.4055%206.94859C17.7185%206.68542%2017.5864%206.21972%2017.3232%205.90673Z'%20fill='%23242424'/%3e%3cpath%20d='M13.6002%204.12628C14.7397%204.12628%2015.6634%203.20258%2015.6634%202.06314C15.6634%200.923699%2014.7397%200%2013.6002%200C12.4608%200%2011.5371%200.923699%2011.5371%202.06314C11.5371%203.20258%2012.4608%204.12628%2013.6002%204.12628Z'%20fill='%23242424'/%3e%3c/svg%3e",import.meta.url).href,yt=new URL("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.5%2014L14%207.5M14%207.5L7.5%201M14%207.5H1'%20stroke='%23242424'%20stroke-width='1.3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",import.meta.url).href,h=document.querySelector("[data-favorites-list]"),m=document.querySelector("[data-favorites-empty]");function Q(){return JSON.parse(localStorage.getItem(L.favorites))||[]}function ht(t){localStorage.setItem(L.favorites,JSON.stringify(t))}function bt(t){return`
    <li class="exercise-card">
      <div class="exercise-card-top">
        <div class="exercise-card-actions">
          <span class="badge">Workout</span>

          <button
            class="remove-btn"
            type="button"
            data-remove="${t._id}"
            aria-label="Remove from favorites"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.6667 4.00004V3.46671C10.6667 2.71997 10.6667 2.3466 10.5213 2.06139C10.3935 1.8105 10.1895 1.60653 9.93865 1.4787C9.65344 1.33337 9.28007 1.33337 8.53333 1.33337H7.46667C6.71993 1.33337 6.34656 1.33337 6.06135 1.4787C5.81046 1.60653 5.60649 1.8105 5.47866 2.06139C5.33333 2.3466 5.33333 2.71997 5.33333 3.46671V4.00004M6.66667 7.66671V11M9.33333 7.66671V11M2 4.00004H14M12.6667 4.00004V11.4667C12.6667 12.5868 12.6667 13.1469 12.4487 13.5747C12.2569 13.951 11.951 14.257 11.5746 14.4487C11.1468 14.6667 10.5868 14.6667 9.46667 14.6667H6.53333C5.41323 14.6667 4.85318 14.6667 4.42535 14.4487C4.04903 14.257 3.74307 13.951 3.55132 13.5747C3.33333 13.1469 3.33333 12.5868 3.33333 11.4667V4.00004"
                stroke="#242424"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <button class="start-btn" type="button" data-start="${t._id}">
          Start
          <img src="${yt}" alt="" />
        </button>
      </div>

      <div class="exercise-card-title">
        <span class="exercise-icon" aria-hidden="true">
          <img src="${Ct}" alt="" />
        </span>

        <h3>${t.name}</h3>
      </div>

      <p class="exercise-info">
        <span>Burned calories: <b>${t.burnedCalories}</b> / 3 min</span>
        <span>Body part: <b>${t.bodyPart}</b></span>
        <span>Target: <b>${t.target}</b></span>
      </p>
    </li>
  `}function X(){if(!h)return;const t=Q();if(!t.length){h.innerHTML="",m==null||m.classList.remove("is-hidden");return}m==null||m.classList.add("is-hidden"),h.innerHTML=t.map(bt).join(""),h.querySelectorAll("[data-start]").forEach(e=>{e.addEventListener("click",()=>{K(e.dataset.start)})}),h.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>{const a=Q().filter(r=>r._id!==e.dataset.remove);ht(a),X()})})}X();const wt=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,St="https://your-energy.b.goit.study/api/subscription",$=document.getElementById("subscriptionForm");if($){let r=function(C){return wt.test(C.trim())},n=function(){t.classList.add("is-invalid"),t.classList.remove("is-valid"),e.classList.add("visible")},i=function(){t.classList.remove("is-invalid"),t.classList.add("is-valid"),e.classList.remove("visible")},g=function(){t.classList.remove("is-invalid","is-valid"),e.classList.remove("visible")},j=function(C,M="success"){var q;(q=document.querySelector(".footer-toast"))==null||q.remove();const o=document.createElement("div");o.className="footer-toast",o.textContent=C,Object.assign(o.style,{position:"fixed",bottom:"32px",right:"32px",padding:"14px 24px",borderRadius:"8px",fontSize:"14px",fontWeight:"500",color:"#fff",zIndex:"9999",background:M==="success"?"#27ae60":"#e74c3c",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",opacity:"1",transition:"opacity 0.3s ease"}),document.body.appendChild(o),setTimeout(()=>{o.style.opacity="0",setTimeout(()=>o.remove(),300)},3e3)};const t=document.getElementById("subscriptionEmail"),e=document.getElementById("emailError"),a=$.querySelector(".footer__btn");t.addEventListener("input",()=>{if(t.value.trim()===""){g();return}r(t.value)?i():n()}),$.addEventListener("submit",async C=>{C.preventDefault();const M=t.value.trim();if(!r(M)){n(),t.focus();return}a.disabled=!0,a.textContent="Sending...";try{const o=await fetch(St,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:M})});if(!o.ok){const q=await o.json().catch(()=>({}));throw new Error(q.message||`Error ${o.status}`)}$.reset(),g(),j("Successfully subscribed! 🎉","success")}catch(o){j(o.message||"Something went wrong. Try again.","error")}finally{a.disabled=!1,a.textContent="Send"}})}const F=document.querySelector("[data-scroll-up]");F&&(window.addEventListener("scroll",()=>{F.classList.toggle("is-visible",window.scrollY>400)}),F.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));function Et(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}const u=document.querySelector("[data-categories-list]"),b=document.querySelector("[data-exercises-list]"),I=document.querySelector("[data-search-form]"),W=document.querySelector("[data-current-category]"),S=document.querySelector("[data-pagination]");let w=null;function Mt(t){return`
    <li class="category-card" data-category="${t.name}">
      <img src="${t.imgURL}" alt="${t.name}" loading="lazy" />
      <div>
        <h3>${t.name}</h3>
        <p>${t.filter}</p>
      </div>
    </li>
  `}function qt(t){if(!S)return;const e=Array.from({length:t},(a,r)=>{const n=r+1;return`
      <button
        class="pagination-btn ${n===s.page?"active":""}"
        type="button"
        data-page="${n}"
      >
        ${n}
      </button>
    `}).join("");S.innerHTML=e}async function O(){if(u){u.classList.remove("is-hidden"),b&&b.classList.add("is-hidden"),u.innerHTML="<li>Loading...</li>",w==null||w.abort(),w=new AbortController;try{const t=await nt(s.filter,s.page,s.limit,{signal:w.signal}),e=t.results||[];if(!e.length){u.innerHTML="<li>No categories found.</li>";return}u.innerHTML=e.map(Mt).join(""),qt(t.totalPages||1),u.querySelectorAll("[data-category]").forEach(a=>{a.addEventListener("click",()=>{s.category=a.dataset.category,s.page=1,s.mode="exercises",u.classList.add("is-hidden"),b==null||b.classList.remove("is-hidden"),I==null||I.classList.remove("is-hidden"),W&&(W.textContent=Et(s.category)),B()})})}catch(t){if(T.isCancel(t))return;u.innerHTML="<li>Failed to load categories.</li>"}}}S==null||S.addEventListener("click",t=>{t.target.classList.contains("pagination-btn")&&s.mode!=="exercises"&&(s.page=Number(t.target.dataset.page),O())});document.addEventListener("DOMContentLoaded",()=>{lt(O),O()});
//# sourceMappingURL=main-D0GPMcd_.js.map
