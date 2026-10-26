'use strict';
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL=value=>{if(typeof value!=='string'||!value.trim())return '';try{const url=new URL(value,location.origin);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}};
const compact={
 'aleph-arena':{type:'팀 프로젝트 · 5인',period:'2026.09.17 — 09.23',cover:'/assets/arena/web-main-v2.jpg',coverWidth:1513,coverHeight:1039,coverAlt:'ALEPH Arena 웹사이트 메인 화면',coverLabel:'웹사이트 · 게임 클라이언트',subtitle:'한국·일본 거점을 연결한 게임 회사 인프라',role:'전체 네트워크 공통 설계 주도, 한국 IDC 구축과 웹·게임 서버 배포',fix:'웹 403 오류의 SELinux 컨텍스트를 확인하고 수정해 접근 복구',result:'웹 메인·Web–WAS 응답 확인, Windows 클라이언트와 Linux 서버 간 실제 게임 플레이',stack:'Rocky Linux · Nginx · Tomcat · MariaDB · BIND · VLAN · OSPF · Static Route · Godot',work:[['네트워크 설계','거점별 IP·VLAN과 내부·WAN 연결 기준 설계, 구간별 통신 점검'],['한국 IDC 구축','Linux 웹·WAS·DB·DNS 환경 구성 및 게임 서버 배포'],['동작 검증','Web–WAS 응답과 게임 클라이언트 접속·플레이 확인']],network:[['거점 연결','한국 본사·개발/QA 센터·한국 IDC·일본 지사·일본 IDC를 WAN으로 연결'],['망 분리','사용자·서비스·DB/스토리지·인프라·운영관리망을 VLAN으로 구분'],['라우팅','한국 IDC의 OSPF 학습·정적 경로를 확인하고, 거점 연결에 필요한 기본·반환 경로를 점검'],['팀 환경 연동','서로 다른 실습 환경을 UDP Tunnel과 WAN 인계 주소로 연결']],teamResult:'팀 전체 결과에는 일본 IDC의 Nginx–Tomcat–MariaDB 연동, Health API 응답, Game Token 발급·검증과 사용 기록 반영이 포함됩니다.',note:'한국 IDC 구축과 웹·게임 서버 배포는 직접 맡았으며, 다른 거점의 개별 구축은 팀원이 담당했습니다. 한국 환경의 게임 플레이 확인과 일본 IDC 외부 클라이언트의 UDP 접속 전체 시험은 별개입니다. 일본 IDC의 전체 게임 접속 시험과 게이트웨이·회선 이중화는 후속 검증·확장 범위입니다.',troubles:[{title:'웹 배포 후 403 Forbidden',symptom:'파일이 존재하고 권한도 설정했지만 웹페이지에 접근할 수 없었습니다.',action:'ls -Z로 user_tmp_t 컨텍스트를 확인했습니다. 배포 경로에 httpd_sys_content_t를 등록하고 restorecon으로 적용했습니다.',result:'SELinux를 유지한 상태에서 메인 페이지 접근을 복구했습니다.'},{title:'주소에 따라 달랐던 /api/ 응답',symptom:'localhost/api/는 404, 실제 Web IP에서는 Tomcat HTTP 200이 반환됐습니다.',action:'curl -v로 IPv6 ::1의 기본 server block과 실제 IPv4 서비스 요청을 구분했습니다.',result:'실제 서비스 주소의 Web–WAS 프록시 응답이 정상임을 확인했습니다.'}]},
 'smdc':{type:'개인 프로젝트 · 진행 중',period:'2026.10 — 현재',cover:'/assets/enterprise/homepc-login-success.png',coverWidth:1917,coverHeight:952,coverAlt:'가정 PC에서 StarMall 로그인 후 사용자명이 표시된 화면',coverLabel:'StarMall · 고객망 접속 확인',subtitle:'본사·지사·IDC·가정 고객망을 연결한 기업 네트워크',role:'전체 네트워크 설계, Linux 서버·서비스 구축 및 고객망 접속 검증',fix:'Spine–Leaf로 IDC 구성, HAProxy·Keepalived로 부하 분산과 VIP 절체 구현',result:'OSPF FULL·Front/Backend VIP 동시 절체 확인, 가정 PC에서 쇼핑몰 접속·로그인 확인',stack:'OSPF · pfSense · HAProxy · Keepalived · Nginx · Tomcat · MariaDB · Chrony',work:[['전체 망 설계','본사·지사·ISP/IX·FTTH·IDC의 주소와 연결 경로 구성'],['IDC 구축','Spine–Leaf·SLB·WEB–WAS–DB와 운영 서비스 구성'],['검증 기록','두 Spine의 OSPF FULL, VIP 절체와 고객망 쇼핑몰 접속 확인']],network:[['IDC','Spine–Leaf에 WEB·WAS·DB·인프라·관리망을 배치'],['본사·지사','서버팜·사무망·관리망을 나누고 WAN 구간과 연결'],['FTTH 고객망','가정 PC → Home Router → ISP/IX → IDC 서비스의 접속 경로 구성']],note:'구축·검증 진행 중입니다. DB 복제·장애 전환, WAS 세션 복제와 전체 운영 서비스의 통합 검증은 후속 작업입니다. 100대는 IDC의 설계상 수용 목표입니다.',troubles:[{title:'NTP 서비스 실행과 실제 동기화 구분',symptom:'서비스가 실행 중이어도 클라이언트가 실제로 시간을 동기화했는지는 별도 확인이 필요했습니다.',action:'Reference ID·Stratum·Leap status·UDP 123 리스닝을 확인하고 클라이언트 응답 수신을 별도 점검 항목으로 분리했습니다.',result:'NTP1의 로컬 시간원 동작을 확인했습니다. 외부 표준시각·전체 클라이언트 동기화는 추가 검증 대상으로 남겼습니다.'}]}
};
const detailViews = [
  { id: 'notes', label: '구축·문제 해결' },
  { id: 'topology', label: '토폴로지' },
  { id: 'images', label: '서비스 화면' }
];
let projects = [];
let lastTrigger;
const dialog = document.querySelector('#project-dialog');

function route() {
  const current = location.hash === '#projects' ? 'projects' : 'profile';
  document.querySelectorAll('main > .page').forEach(page => {
    page.hidden = page.id !== current;
  });
  document.querySelectorAll('.masthead nav a').forEach(link => {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = `${current === 'projects' ? 'Project' : '서동연'} — 포트폴리오`;
}

function projectRow(project) {
  const c = compact[project.id];
  if (!c) return '';
  const id = escapeHTML(project.id);
  return `<article class="project-row">
    <div class="project-art">
      <button class="cover-button" type="button" data-project="${id}" data-view="images" aria-label="${escapeHTML(project.title)} 서비스 화면 보기">
        <img class="project-cover" src="${c.cover}" alt="${c.coverAlt}" width="${c.coverWidth}" height="${c.coverHeight}" decoding="async">
      </button>
      <p class="cover-caption"><span>${c.coverLabel}</span><button type="button" data-project="${id}" data-view="images">사진 모아보기 ↗</button></p>
    </div>
    <div class="project-copy">
      <div class="project-topline"><span class="project-type">${c.type}</span><span>${c.period}</span></div>
      <h2>${escapeHTML(project.title)}</h2>
      <p class="project-subtitle">${c.subtitle}</p>
      <dl class="project-facts">
        <div><dt>내 역할</dt><dd>${c.role}</dd></div>
        <div><dt>${project.id === 'smdc' ? '주요 구현' : '문제 해결'}</dt><dd>${c.fix}</dd></div>
        <div><dt>확인 결과</dt><dd>${c.result}</dd></div>
      </dl>
      <p class="project-stack">${c.stack}</p>
      <div class="project-actions">
        <button type="button" data-project="${id}" data-view="notes">구축·문제 해결 ↗</button>
        <button type="button" data-project="${id}" data-view="topology">토폴로지 보기 ↗</button>
      </div>
    </div>
  </article>`;
}

function workList(items) {
  return `<ul class="work-list">${items.map(([title, body]) => `<li><b>${escapeHTML(title)}</b> ${escapeHTML(body)}</li>`).join('')}</ul>`;
}

function notes(project) {
  const c = compact[project.id];
  return `<p class="detail-role"><b>직접 맡은 범위</b>${c.role}</p>
    <h3 class="detail-section-title">수행한 작업</h3>${workList(c.work)}
    <h3 class="detail-section-title">네트워크 구성</h3>${workList(c.network)}
    ${c.teamResult ? `<h3 class="detail-section-title">팀 전체 연동 결과</h3><p class="detail-intro">${c.teamResult}</p>` : ''}
    <h3 class="detail-section-title">문제를 확인하고 해결한 과정</h3>
    ${c.troubles.map(trouble => `<article class="trouble-note">
      <h4>${trouble.title}</h4><dl>
        <div><dt>상황</dt><dd>${trouble.symptom}</dd></div>
        <div><dt>조치</dt><dd>${trouble.action}</dd></div>
        <div><dt>결과</dt><dd>${trouble.result}</dd></div>
      </dl></article>`).join('')}
    <p class="detail-note">${c.note}</p>`;
}

function imageFigure(item, topology = false) {
  const url = escapeHTML(safeURL(item.url));
  const title = escapeHTML(item.title);
  const width = Math.max(1, Number(item.width) || 1920);
  const height = Math.max(1, Number(item.height) || 1080);
  const figureClass = topology ? `topology-figure${item.overview ? ' topology-overview' : ''}` : 'gallery-figure';
  return `<figure class="${figureClass}">
    <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${title} 원본 보기">
      <img src="${url}" alt="${escapeHTML(item.caption || item.title)}" width="${width}" height="${height}" decoding="async" loading="lazy">
    </a>
    <figcaption><strong>${title}</strong>${topology && item.caption ? `<span>${escapeHTML(item.caption)}</span>` : ''}</figcaption>
  </figure>`;
}

function gallery(project) {
  const items = (project.images || []).filter(item => safeURL(item.url));
  return `<p class="gallery-intro">사진을 누르면 원본 크기로 볼 수 있습니다.</p>
    <div class="gallery">${items.map(item => imageFigure(item)).join('')}</div>`;
}

function topology(project) {
  const items = (project.topologies || []).filter(item => safeURL(item.url));
  return `<p class="topology-intro">${project.id === 'smdc' ? '전체 연결 구조와 구간별 상세 구성입니다.' : '한국·일본 거점과 게임 서비스의 연결 구조입니다.'} 그림을 누르면 원본 크기로 볼 수 있습니다.</p>
    <div class="topology-grid">${items.map(item => imageFigure(item, true)).join('')}</div>`;
}

function setDetailView(project, requestedView) {
  const view = detailViews.some(item => item.id === requestedView) ? requestedView : 'notes';
  const c = compact[project.id];
  const count = id => id === 'images' ? project.images?.length || 0 : id === 'topology' ? project.topologies?.length || 0 : null;
  document.querySelector('#dialog-content').innerHTML = `<article class="project-detail">
    <p class="kicker">${c.type} / ${c.period}</p>
    <h2 id="dialog-title">${escapeHTML(project.title)}</h2>
    <p class="detail-intro">${c.subtitle}</p>
    <div class="detail-nav" role="tablist" aria-label="프로젝트 상세 선택">
      ${detailViews.map(item => `<button id="tab-${item.id}" type="button" role="tab" aria-selected="${view === item.id}" aria-controls="detail-panel" tabindex="${view === item.id ? 0 : -1}" data-detail-view="${item.id}">${item.label}${count(item.id) === null ? '' : ` ${count(item.id)}`}</button>`).join('')}
    </div>
    <div id="detail-panel" role="tabpanel" aria-labelledby="tab-${view}" tabindex="0">${view === 'images' ? gallery(project) : view === 'topology' ? topology(project) : notes(project)}</div>
  </article>`;
  dialog.dataset.project = project.id;
  dialog.dataset.view = view;
  dialog.scrollTop = 0;
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('button[data-project]');
  if (trigger) {
    const project = projects.find(item => item.id === trigger.dataset.project);
    if (!project) return;
    lastTrigger = trigger;
    setDetailView(project, trigger.dataset.view || 'notes');
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.querySelector('#close-dialog').focus();
  }
  const tab = event.target.closest('[data-detail-view]');
  if (tab) {
    const project = projects.find(item => item.id === dialog.dataset.project);
    if (!project) return;
    setDetailView(project, tab.dataset.detailView);
    document.querySelector(`#tab-${tab.dataset.detailView}`).focus();
  }
});

dialog.addEventListener('keydown', event => {
  if (!event.target.matches('[role="tab"]') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const project = projects.find(item => item.id === dialog.dataset.project);
  if (!project) return;
  const index = detailViews.findIndex(item => item.id === dialog.dataset.view);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? detailViews.length - 1
    : (index + (event.key === 'ArrowRight' ? 1 : -1) + detailViews.length) % detailViews.length;
  const view = detailViews[next].id;
  setDetailView(project, view);
  document.querySelector(`#tab-${view}`).focus();
});

document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastTrigger?.focus();
});
window.addEventListener('hashchange', () => {
  route();
  window.scrollTo({ top: 0, behavior: 'instant' });
});
route();

fetch('/content.json')
  .then(response => {
    if (!response.ok) throw new Error('Content load failed');
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data.projects)) throw new Error('Invalid projects');
    projects = data.projects.filter(project => compact[project.id]);
    document.querySelector('#project-list').innerHTML = projects.map(projectRow).join('');
  })
  .catch(() => {
    document.querySelector('#project-list').innerHTML = '<p class="loading-error">프로젝트를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>';
  });
