'use strict';
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL = value => { try { const url = new URL(value, location.origin); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
const dialog = document.querySelector('#project-dialog');
let lastTrigger;
function topology(project) {
  if (project.id === 'smdc') {
    const leaves = ['BORDER', 'FR / SLB', 'WEB 1', 'APP 1', 'DB / FW2', 'INF', 'MGMT'];
    const edges = leaves.map((_, i) => { const x = 50 + i * 100; return `<path d="M245 50 L${x} 150"/><path d="M455 50 L${x} 150"/>`; }).join('');
    return `<svg class="spine-diagram" role="img" aria-label="두 Spine 각각에 7개 Leaf가 연결된 동일 계층 구성" viewBox="0 0 700 215"><g class="spine-edges">${edges}</g><g class="spine-boxes"><rect x="185" y="10" width="120" height="40" rx="6"/><rect x="395" y="10" width="120" height="40" rx="6"/>${leaves.map((_,i)=>`<rect x="${i*100+7}" y="150" width="86" height="36" rx="5"/>`).join('')}</g><g class="spine-labels"><text x="245" y="35">SPINE 01</text><text x="455" y="35">SPINE 02</text>${leaves.map((label,i)=>`<text x="${50+i*100}" y="172">${label}</text>`).join('')}<text x="350" y="210" class="spine-caption">7 LEAVES · SAME TIER</text></g></svg>`;
  }
  return `<div class="art-topology" aria-label="${escapeHTML(project.title)} 구성 개념도">${project.diagram.map(row=>`<div class="diagram-row">${row.map(node=>`<span class="diagram-node">${escapeHTML(node)}</span>`).join('')}</div>`).join('')}</div>`;
}
function projectCard(p) {
  return `<article class="project-card"><div class="project-art"><div class="art-heading"><span>PROJECT ${escapeHTML(p.number)} / ${escapeHTML(p.label)}</span><span>↗</span></div><div class="art-title">${escapeHTML(p.title)}<small>${p.id === 'smdc' ? 'SPINE–LEAF DATA CENTER' : 'GAME SERVICE INFRASTRUCTURE'}</small></div>${topology(p)}<div class="art-footer">${p.id === 'smdc' ? '2 SPINES / 7 LEAVES · INITIAL SCOPE' : 'KOREA — JAPAN / NETWORK & SERVICE'}</div></div><div class="project-copy"><div class="project-meta"><span class="tag ${p.id === 'smdc' ? 'purple' : ''}">${escapeHTML(p.team)}</span><span class="status">${escapeHTML(p.status)}</span></div><h3>${escapeHTML(p.title)}<br>${escapeHTML(p.subtitle)}</h3><p>${escapeHTML(p.summary)}</p><div class="role-line"><b>MY ROLE</b>${escapeHTML(p.role)}</div><div class="project-tags">${p.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div><button class="project-button" data-project="${escapeHTML(p.id)}">구축 과정과 문제 해결 살펴보기 <span>↗</span></button></div></article>`;
}
function caseStudy(p) {
  const list = items => `<ul>${items.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul>`;
  const galleries = (p.images || []).filter(x=>safeURL(x.url));
  return `<article class="case"><span class="tag">${escapeHTML(p.label)} · ${escapeHTML(p.status)}</span><h2 id="dialog-title">${escapeHTML(p.title)}<br><em>${escapeHTML(p.subtitle)}</em></h2><p class="case-intro">${escapeHTML(p.overview)}</p><div class="case-facts"><div><span>PERIOD</span><b>${escapeHTML(p.period)}</b></div><div><span>TEAM</span><b>${escapeHTML(p.team)}</b></div><div><span>MY ROLE</span><b>${escapeHTML(p.role)}</b></div></div><section class="case-section"><h3>01. 구성과 설계 의도</h3><div class="diagram-box">${topology(p)}<p class="diagram-caption">${escapeHTML(p.diagramCaption)}</p></div>${list(p.decisions)}</section><section class="case-section"><h3>02. 직접 수행한 작업</h3><div class="case-table-wrap" role="region" aria-label="구축 항목과 검증 범위" tabindex="0"><table><thead><tr><th scope="col">구성 요소</th><th scope="col">수행 내용</th><th scope="col">확인 범위</th></tr></thead><tbody>${p.components.map(row=>`<tr>${row.map(c=>`<td>${escapeHTML(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section><section class="case-section"><h3>03. 문제를 확인하고 해결한 과정</h3><div class="trouble-grid">${p.troubles.map(t=>`<article class="trouble"><h4>${escapeHTML(t.title)}</h4><dl><dt>상황</dt><dd>${escapeHTML(t.symptom)}</dd><dt>확인</dt><dd>${escapeHTML(t.investigation)}</dd><dt>조치</dt><dd>${escapeHTML(t.action)}</dd><dt>결과</dt><dd>${escapeHTML(t.result)}</dd></dl></article>`).join('')}</div></section><section class="case-section"><h3>04. 확인한 결과와 현재 범위</h3>${list(p.results)}<p class="case-note">${escapeHTML(p.scopeNote)}</p></section>${galleries.length ? `<section class="case-section"><h3>실제 구축 화면</h3><div class="gallery">${galleries.map(g=>`<figure><img src="${escapeHTML(safeURL(g.url))}" alt="${escapeHTML(g.caption || p.title)}" loading="lazy"><figcaption>${escapeHTML(g.caption || '')}</figcaption></figure>`).join('')}</div></section>` : ''}<section class="case-section"><h3>다음으로 이어갈 작업</h3>${list(p.next)}</section><div class="case-bottom">내용 기준 · 2026.10.26 <span> / </span> ${escapeHTML(p.team)} · Version 1.0.0</div></article>`;
}
let projects = [];
function openProject(id, trigger) {
  const project = projects.find(p=>p.id === id);
  if (!project) return;
  lastTrigger = trigger || document.activeElement;
  document.querySelector('#dialog-content').innerHTML = caseStudy(project);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector('#close-dialog').focus();
}
function closeProject() { dialog.close(); if (location.hash.startsWith('#project-')) history.replaceState(null, '', '#projects'); }
document.querySelector('#close-dialog').addEventListener('click', closeProject);
dialog.addEventListener('click', event=>{if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) closeProject();}});
dialog.addEventListener('close', ()=>{if(location.hash.startsWith('#project-')) history.replaceState(null,'','#projects');lastTrigger?.focus();});
document.querySelector('#project-list').addEventListener('click', event=>{const button=event.target.closest('[data-project]');if(button){history.replaceState(null,'',`#project-${button.dataset.project}`);openProject(button.dataset.project,button);}});
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#project-')) openProject(location.hash.slice(9));else if(dialog.open)dialog.close();});
const menuButton=document.querySelector('.menu-button');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');document.querySelector('nav').classList.toggle('open',open);});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('nav').classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}});},{rootMargin:'-20% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
fetch('/content.json').then(response=>{if(!response.ok)throw new Error('Content unavailable');return response.json();}).then(content=>{projects=content.projects;document.querySelector('#project-list').innerHTML=projects.map(projectCard).join('');if(location.hash.startsWith('#project-'))openProject(location.hash.slice(9));}).catch(()=>{document.querySelector('#project-list').innerHTML='<p>프로젝트 내용을 불러오지 못했습니다. 잠시 후 새로고침해 주세요. <a href="https://github.com/sdydy0298-dotcom/portfolio" target="_blank" rel="noopener noreferrer">GitHub에서 확인하기 ↗</a></p>';});
