const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const ini=s=>esc([...(s||"?")][0]);
// 丸いアイコン（画像が無い・読めないときは頭文字）
const av=(name,src,cls="")=>`<span class="av ${cls}">${src?`<img src="${esc(src)}" alt="" data-i="${ini(name)}" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:this.dataset.i}))">`:`<b>${ini(name)}</b>`}</span>`;
const ph=(src,alt)=>`<div class="ph">${src?`<img src="${esc(src)}" alt="${esc(alt||"")}" loading="lazy" onerror="this.parentNode.textContent='🍁'">`:"🍁"}</div>`;

document.title=`${SITE.name} | ${SITE.circle}`;
$("heroJa").textContent=SITE.name;
$("heroEn").textContent=SITE.circle;
$("tagline").textContent=SITE.tagline;

const works=(SITE.works||[]), links=(SITE.links||[]).filter(l=>l.url), BLOG=SITE.blog?SITE.blog.replace(/\/?$/,"/"):"";

// ヘッダー
const menu=[["about","私について"],works.length&&["works","作品・活動"],BLOG&&["journal","雑記"],links.length&&["links","リンク"]].filter(Boolean);
$("nav").innerHTML=`<a class="logo" href="#top" aria-label="トップへ"><img src="${esc(SITE.logo)}" alt="" onerror="this.parentNode.textContent=SITE.name"></a>
  <ul>${menu.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join("")}</ul>`;

// トップのボタン
$("cta").innerHTML=(works.length?`<a class="btn" href="#works">作品を見る</a>`:`<a class="btn" href="#about">私について</a>`)+(BLOG?`<a class="btn sub" href="${esc(BLOG)}">雑記を読む</a>`:"");

// 私について
const A=SITE.about||{};
$("aboutBox").innerHTML=`<div class="paper"><div class="ab">${av(SITE.name,SITE.icon)}<div>
  ${A.lead?`<p class="lead">${esc(A.lead)}</p>`:""}
  <dl>${(A.items||[]).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl></div></div></div>`;
// 画像が読めたときは頭文字を出さず、そのまま画像だけにする（avの仕組みを共通で使っている）

// 作品・活動
if(works.length){
  $("worksBox").className="cards";
  $("worksBox").innerHTML=works.map(w=>`<article class="note">
    <div class="mt">${w.date?`<time>${esc(w.date)}</time>`:""}${(w.tags||[]).map(t=>`<span class="tg">#${esc(t)}</span>`).join("")}</div>
    ${ph(w.img,w.title)}
    <h3>${w.url?`<a href="${esc(w.url)}" target="_blank" rel="noopener">${esc(w.title)}</a>`:esc(w.title)}</h3>
    ${w.desc?`<p>${esc(w.desc)}</p>`:""}</article>`).join("");
}else $("works").hidden=true;

// リンク
if(links.length)$("linksBox").innerHTML=links.map(l=>`<a class="lk" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");
else $("links").hidden=true;

// 雑記（ブログの posts.json から最新の記事を読み込む）
if(BLOG){
  $("blogBtn").href=BLOG;
  const abs=p=>/^(https?:|data:)/.test(p)?p:BLOG+p, get=u=>fetch(u,{cache:"no-store"});
  Promise.all([get(BLOG+"posts.json").then(r=>{if(!r.ok)throw 0;return r.json()}),get(BLOG+"authors.json").then(r=>r.ok?r.json():{}).catch(()=>({}))])
  .then(([j,au])=>{
    const ps=j.posts.filter(p=>!p.hidden).slice(0,SITE.latest||3);if(!ps.length)throw 0;
    $("journalBox").className="cards";
    $("journalBox").innerHTML=ps.map(p=>`<article class="note">
      <div class="mt"><time>${esc(p.date.replace(/-/g,"."))}</time>${(p.tags||[]).slice(0,2).map(t=>`<a class="tg" href="${esc(BLOG)}index.html?tag=${encodeURIComponent(t)}">#${esc(t)}</a>`).join("")}</div>
      ${ph(p.thumb&&abs(p.thumb),"")}
      <h3><a href="${esc(BLOG)}post.html?p=${encodeURIComponent(p.slug)}">${esc(p.title)}</a></h3>
      ${p.excerpt?`<p>${esc(p.excerpt)}</p>`:""}
      ${p.author?`<div class="ft"><span class="au">${av(p.author,au[p.author]&&abs(au[p.author]))}<span class="nm">${esc(p.author)}</span></span></div>`:""}</article>`).join("");
    reveal([...$("journalBox").querySelectorAll(".note")]);
  })
  .catch(()=>{$("journal").hidden=true;const a=document.querySelector('#nav a[href="#journal"]');if(a)a.parentNode.remove()});
}else $("journal").hidden=true;

// フッター
$("foot").innerHTML=`${SITE.notice?`<p>${esc(SITE.notice)}</p>`:""}<p>© ${new Date().getFullYear()} ${esc(SITE.name)} / ${esc(SITE.circle)}</p>`;

// 落ち葉
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  const L=$("leaves");
  for(let i=0;i<9;i++){const l=document.createElement("span");l.className="leaf";l.textContent=i%2?"🍂":"🍁";
    l.style.cssText=`left:${Math.random()*100}%;--dx:${(Math.random()*160-80)|0}px;--rot:${(Math.random()*540-270)|0}deg;animation-duration:${14+Math.random()*12}s;animation-delay:${-Math.random()*20}s;font-size:${14+Math.random()*14}px`;
    L.append(l)}
}
// 下からフェードイン
function reveal(els){
  document.documentElement.classList.add("js");
  els.forEach((e,i)=>{e.classList.add("rv");e.style.setProperty("--d",((i%3)*.1).toFixed(2)+"s")});
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("in"));return}
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12,rootMargin:"0px 0px -4% 0px"});
  els.forEach(e=>io.observe(e));
}
reveal([...document.querySelectorAll("h2.sec"),...document.querySelectorAll("#aboutBox .paper,#worksBox .note,.lks")]);
