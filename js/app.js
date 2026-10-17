(function(){
const D=window.NL,root=document.body.dataset.root||"";const $=(s,c=document)=>c.querySelector(s);
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const links=[["Home","index.html"],["Training","pages/training.html"],["Programs","pages/programs.html"],["Coaches","pages/coaches.html"],["Timetable","pages/timetable.html"],["Membership","pages/membership.html"],["Journal","pages/journal.html"],["Contact","pages/contact.html"]];
const here=location.pathname.split("/").pop()||"index.html";
const emblem='<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" fill="none" stroke="#FF5A1F" stroke-width="2"/><path d="M7 25V7h4l10 12V7h4v18h-4L11 13v12z" fill="#F3F2ED"/></svg>';
const FB='<svg viewBox="0 0 200 80" fill="none" stroke="#92989C" stroke-width="3"><path d="M4 40h192M30 14v52M44 6v68M156 6v68M170 14v52"/></svg>';
window.nlFb=el=>{if(!el.dataset.t){el.dataset.t=1;el.src="https://images.unsplash.com/"+D.img[el.dataset.k]+"?auto=format&fit=crop&w=1200&q=70";return}el.parentNode.insertAdjacentHTML("beforeend",'<span class="fb">'+FB+'</span>');el.remove()};
window.nlImg=(k,alt="Training photo")=>`<span class="fill"><img data-k="${k}" src="${root}assets/images/${k}.jpg" alt="${alt}" loading="lazy" onerror="nlFb(this)"></span>`;
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.i);toast.i=setTimeout(()=>t.classList.remove("show"),3200)}
$("#shell-top").innerHTML=`<div id="announce"><span>YOUR NEXT PERSONAL BEST STARTS HERE.</span><button aria-label="Dismiss announcement">×</button></div>
<header class="site" id="hdr"><div class="wrap nav"><a class="logo" href="${root}index.html" aria-label="${D.brand.name} home">${emblem}<span>NEVERLIGHT<small>ATHLETICS</small></span></a>
<button class="burger" id="open" aria-expanded="false" aria-controls="menu">MENU</button>
<ul class="menu" id="menu"><li><button class="burger close" id="shut">CLOSE</button></li>${links.map(l=>`<li><a href="${root}${l[1]}" ${l[1].endsWith(here)?'aria-current="page"':""}>${l[0]}</a></li>`).join("")}</ul>
<a class="btn nav-cta" href="${root}pages/book-trial.html">Book a trial</a></div></header>`;
$("#shell-bottom").innerHTML=`<footer><div class="wrap"><div class="cols"><div><a class="logo" href="${root}index.html">${emblem}<span>NEVERLIGHT</span></a><p class="mono">${D.brand.tagline}</p></div>
<div><h3>Visit</h3><p class="mono">${D.brand.hours}<br>${D.brand.location}<br>${D.brand.email}<br>${D.brand.phone}</p></div>
<div><h3>Newsletter</h3><form id="news" novalidate><label class="mono" for="ne">Email</label><input id="ne" type="email" required><button class="btn" type="submit">Subscribe (demo)</button></form></div></div>
<p class="mono" style="margin:2rem 0">All content, prices, hours and contact details are sample data. Forms are frontend-only demos and send nothing. © Neverlight Athletics (demo)</p>
<a class="btn ghost" href="#top">Back to top</a></div></footer><div id="toast" role="status" aria-live="polite"></div>`;
$("#announce button").onclick=()=>$("#announce").remove();
const hb=$(".bgimg");if(hb)hb.insertAdjacentHTML("afterbegin",nlImg("hero","Athlete training on the gym floor"));
document.querySelectorAll(".nlimg").forEach(e=>e.outerHTML=nlImg(e.dataset.k,"Training area"));
const hdr=$("#hdr"),menu=$("#menu");
const onS=()=>hdr.classList.toggle("solid",scrollY>40);onS();addEventListener("scroll",onS,{passive:true});
const setMenu=o=>{menu.classList.toggle("open",o);$("#open").setAttribute("aria-expanded",o);if(o)$("#shut").focus()};
$("#open").onclick=()=>setMenu(true);$("#shut").onclick=()=>setMenu(false);
addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
$("#news").onsubmit=e=>{e.preventDefault();toast(/^\S+@\S+\.\S+$/.test($("#ne").value)?"Demo only: nothing was subscribed or sent.":"Enter a valid email address.")};
const inr=n=>"₹"+n.toLocaleString("en-IN");
const progCard=p=>`<article class="pcard">${nlImg(D.imgByGoal[p.goal],p.title)}<span class="mono">${p.level} · ${p.freq}x/week · ${p.weeks} weeks</span><h3>${p.title}</h3><p>${p.blurb}</p><span class="mono">Focus: ${p.focus}</span><a href="${root}pages/program-detail.html?id=${p.id}">Learn more</a></article>`;
const mx=$("#matrix");if(mx){const S={goal:"strength",level:"beginner",freq:3};
const opts={goal:["strength","conditioning","performance","beginner","recovery"],level:["beginner","intermediate","advanced"],freq:[2,3,4,5]};
const render=()=>{const sc=D.programs.map(p=>({p,s:(p.goal==S.goal?3:0)+(p.level==S.level?2:0)+(Math.abs(p.freq-S.freq)<=1?1:0)})).filter(x=>x.s>=3).sort((a,b)=>b.s-a.s).slice(0,3);
const out=$("#mx-out");out.innerHTML=sc.length?sc.map(x=>progCard(x.p)+`<p class="mono" style="margin:0 0 .5rem">Match score ${x.s}/6 · Suggested coach: ${D.coaches.find(c=>c.id==x.p.coach).name}</p>`).join(""):`<div class="empty"><h3>No close match</h3><p>Try a different goal or level, or book a trial and talk to a coach.</p></div>`;
if(window.gsap&&!rm)gsap.from(out.children,{y:16,opacity:0,stagger:.06,duration:.4,clearProps:"all"})};
mx.querySelectorAll("[data-k]").forEach(f=>{const k=f.dataset.k;f.innerHTML=`<legend class="mono">${f.dataset.l}</legend><div class="chips">${opts[k].map(v=>`<button type="button" class="chip" data-v="${v}" aria-pressed="${S[k]==v}">${v}${k=="freq"?"x/wk":""}</button>`).join("")}</div>`;
f.onclick=e=>{const b=e.target.closest(".chip");if(!b)return;S[k]=k=="freq"?+b.dataset.v:b.dataset.v;f.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));render()}});render()}
const tt=$("#tt");if(tt){const days=Object.keys(D.classes);let cur=days[(new Date().getDay()+6)%7];
const draw=()=>{$("#tt-tabs").innerHTML=days.map(d=>`<button class="chip" aria-pressed="${d==cur}" data-d="${d}">${d}</button>`).join("");
const L=D.classes[cur];$("#tt-list").innerHTML=L.length?L.map(c=>`<div class="slot"><span class="time">${c[0]}</span><div><strong>${c[1]}</strong><br><span class="mono">${c[2]} · ${c[3]}</span></div><span class="mono">${c[4]}</span></div>`).join(""):`<div class="empty"><p>No classes on this day. Pick another day above.</p></div>`};
$("#tt-tabs").onclick=e=>{const b=e.target.closest("[data-d]");if(b){cur=b.dataset.d;draw();$(`[data-d=${cur}]`).focus()}};draw()}
const pl=$("#plans");if(pl)pl.innerHTML=D.plans.map(p=>`<div class="plan ${p.feat?"feat":""}"><span class="mono">${p.code} · example pricing</span><h3>${p.n}</h3><div class="price">${inr(p.price)}<small class="mono"> /month</small></div><ul>${p.perks.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("");
document.querySelectorAll("[data-count]").forEach(el=>{const n=+el.dataset.count;let i=0;const io=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;io.disconnect();if(rm){el.textContent=n;return}const t=setInterval(()=>{i+=Math.max(1,n/30);if(i>=n){i=n;clearInterval(t)}el.textContent=Math.round(i)},30)});io.observe(el)});
const pg=$("#prog-grid");if(pg){const F={goal:"all",level:"all",freq:"all"};
const draw=()=>{const r=D.programs.filter(p=>(F.goal=="all"||p.goal==F.goal)&&(F.level=="all"||p.level==F.level)&&(F.freq=="all"||p.freq==F.freq));
pg.innerHTML=r.length?r.map(progCard).join(""):`<div class="empty" style="grid-column:1/-1"><h3>No matching programs</h3><p>Clear a filter to see more sample programs.</p><button class="btn" id="clr">Clear filters</button></div>`;
const c=$("#clr");if(c)c.onclick=()=>{Object.keys(F).forEach(k=>F[k]="all");document.querySelectorAll("select").forEach(s=>s.value="all");draw()}};
document.querySelectorAll("select[data-f]").forEach(s=>s.onchange=()=>{F[s.dataset.f]=s.value;draw()});draw()}
})();
