'use strict';
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL=value=>{if(typeof value!=='string'||!value.trim())return '';try{const url=new URL(value,location.origin);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}};
const compact = {
  "aleph-arena": {
    "type": "팀 프로젝트 · 5인",
    "period": "2026.09.17 — 09.23",
    "cover": "/assets/arena/web-main-v2.jpg",
    "coverWidth": 1513,
    "coverHeight": 1039,
    "coverAlt": "ALEPH Arena 웹사이트 메인 화면",
    "coverLabel": "직접 개발 · 웹사이트 · 런처 · 게임",
    "subtitle": "직접 개발한 웹사이트·런처·게임을 한국 IDC에 배포한 5인 팀 프로젝트",
    "role": "게임 웹사이트·C#/.NET 런처·Godot 게임 직접 개발, 한국 IDC 네트워크·서버 구축",
    "fix": "웹·게임 개발과 IDC 배포, SELinux 403 오류 해결",
    "result": "Web–WAS 응답, Windows 클라이언트↔Linux 게임 서버 실제 플레이 확인",
    "stack": "Rocky Linux · Nginx · Tomcat · MariaDB · BIND · VLAN · OSPF · Static Route · Godot",
    "work": [
      [
        "웹사이트",
        "HTML·CSS·JavaScript, Java WAS, MariaDB 연동"
      ],
      [
        "런처",
        "C#/.NET 8 Windows 런처 직접 개발"
      ],
      [
        "게임",
        "Godot 클라이언트와 Linux Dedicated Server 제작"
      ],
      [
        "IDC",
        "네트워크·WEB·WAS·DB·DNS·게임 서버 구축"
      ],
      [
        "검증",
        "웹/게임 실제 접속·플레이, 문제 해결"
      ]
    ],
    "network": [
      [
        "거점 연결",
        "한국 본사·개발/QA 센터·한국 IDC·일본 지사·일본 IDC를 WAN으로 연결"
      ],
      [
        "망 분리",
        "사용자·서비스·DB/스토리지·인프라·운영관리망을 VLAN으로 구분"
      ],
      [
        "라우팅",
        "한국 IDC의 OSPF 학습·정적 경로를 확인하고, 거점 연결에 필요한 기본·반환 경로를 점검"
      ],
      [
        "팀 환경 연동",
        "서로 다른 실습 환경을 UDP Tunnel과 WAN 인계 주소로 연결"
      ]
    ],
    "teamResult": "공통 IP·VLAN·WAN 기준을 맞춘 뒤 각자의 환경을 UDP Tunnel로 연결했습니다. 거점 간 라우팅, 목적지·반환 경로, IDC 서비스 접근은 팀이 함께 점검했습니다.",
    "note": "웹사이트·런처·게임·한국 IDC는 본인이 직접 개발·구축했습니다. 타 거점의 개별 네트워크는 팀원 담당이며, 일본 IDC 게임 서버의 미확인 통합 시험을 본인 검증 실적으로 포함하지 않습니다.",
    "troubles": [
      {
        "title": "웹 배포 후 403 Forbidden",
        "symptom": "파일이 존재하고 권한도 설정했지만 웹페이지에 접근할 수 없었습니다.",
        "action": "ls -Z로 user_tmp_t 컨텍스트를 확인했습니다. 배포 경로에 httpd_sys_content_t를 등록하고 restorecon으로 적용했습니다.",
        "result": "SELinux를 유지한 상태에서 메인 페이지 접근을 복구했습니다."
      },
      {
        "title": "주소에 따라 달랐던 /api/ 응답",
        "symptom": "localhost/api/는 404, 실제 Web IP에서는 Tomcat HTTP 200이 반환됐습니다.",
        "action": "curl -v로 IPv6 ::1의 기본 server block과 실제 IPv4 서비스 요청을 구분했습니다.",
        "result": "실제 서비스 주소의 Web–WAS 프록시 응답이 정상임을 확인했습니다."
      },
      {
        "title": "DNS 질의 경로에 따른 SERVFAIL",
        "symptom": "Auth DNS에 직접 질의하면 내부 서버 레코드가 응답했지만, Cache DNS를 거치면 SERVFAIL이 발생했습니다.",
        "action": "같은 이름에 대한 Auth DNS 직접 질의, Cache DNS 일반 질의, +cdflag 질의 결과를 비교했습니다.",
        "result": "+cdflag에서 NOERROR와 A 레코드가 반환되어 Cache DNS의 검증 단계로 원인 범위를 좁혔습니다."
      }
    ],
    "scope": "웹사이트 · 런처 · 게임 개발 / 한국 IDC 구축",
    "coverView": "images",
    "technologies": [
      "java",
      "csharp",
      "godot",
      "mariadb",
      "nginx",
      "linux"
    ],
    "roleSummary": "5인 팀의 한국 IDC 담당자로 네트워크·서버를 구축했습니다. 이에 더해 웹사이트, Windows C#/.NET 런처, Godot 게임을 직접 개발·배포하고 한국 IDC에서 서비스를 연동했습니다.",
    "teamRoles": [
      {
        "area": "한국 본사",
        "scope": "본사 사용자·관리망과 상위 회선·WAN 연결",
        "owner": "팀원"
      },
      {
        "area": "개발 / QA 센터",
        "scope": "개발·테스트망 분리와 부서 VLAN·라우팅",
        "owner": "팀원"
      },
      {
        "area": "한국 IDC",
        "scope": "한국 IDC 네트워크·서버·DNS 구축, 웹사이트·런처·게임 직접 개발과 서비스 배포",
        "owner": "본인",
        "mine": true
      },
      {
        "area": "일본 지사",
        "scope": "일본 사용자·관리망과 한국 IDC 접근 경로",
        "owner": "팀원"
      },
      {
        "area": "일본 IDC · ISP",
        "scope": "일본 IDC 구성과 ISP·WAN 회선·라우팅 연결",
        "owner": "팀원"
      }
    ],
    "contributions": [
      {
        "title": "게임 웹사이트 직접 개발",
        "body": "HTML·CSS·JavaScript 웹사이트와 로그인·회원가입 화면을 제작하고 Java WAS·MariaDB 연동, Nginx /api/ 프록시를 구현했습니다."
      },
      {
        "title": "Windows 런처 직접 개발",
        "body": "C#/.NET 8 런처를 제작하고 Windows 실행 파일로 빌드·배포했습니다."
      },
      {
        "title": "Godot 게임 직접 개발",
        "body": "Godot 게임 클라이언트와 Linux 전용 게임 서버를 구축했습니다. AI·로컬 플레이, 온라인 방 접속·READY·시작 흐름과 Windows↔Linux 실제 플레이를 확인했습니다."
      },
      {
        "title": "한국 IDC와 네트워크 구축",
        "body": "5인 팀의 IP·VLAN·WAN 설계를 조율하고 한국 IDC의 WEB·WAS·DB·DNS 및 게임 서버 운영 환경을 구축했습니다."
      },
      {
        "title": "장애 해결과 검증",
        "body": "SELinux 컨텍스트를 수정해 웹 403을 해결했고 실제 IPv4 /api/ 요청, DNS 질의와 한국 IDC의 게임 접속을 검증했습니다."
      }
    ],
    "components": [
      {
        "title": "게임 웹사이트",
        "tech": "HTML · CSS · JavaScript · Java",
        "body": "로그인·회원가입, Java WAS·MariaDB와 연동되는 게임 웹사이트 직접 제작"
      },
      {
        "title": "Windows 런처",
        "tech": "C# · .NET 8",
        "body": "게임 런처 직접 제작, Windows용 실행 파일 빌드 및 배포"
      },
      {
        "title": "게임 클라이언트·서버",
        "tech": "Godot · ENet/UDP",
        "body": "게임 클라이언트·Linux Dedicated Server 구현과 실제 접속·플레이 검증"
      },
      {
        "title": "한국 IDC",
        "tech": "Linux · Nginx · Tomcat · MariaDB",
        "body": "네트워크·DNS·WEB·WAS·DB·게임 서버 환경 구축과 연동"
      }
    ]
  },
  "smdc": {
    "type": "개인 프로젝트 · 구축 완료",
    "period": "2026.10",
    "cover": "/assets/enterprise/overview.svg",
    "coverWidth": 960,
    "coverHeight": 600,
    "coverAlt": "본사·지사 VPN, ISP·IX, 고객망과 IDC를 연결하고 UTM·DMZ·HA 구축 범위를 요약한 개념도",
    "coverLabel": "기업망 · 보안 · IDC 구성 요약",
    "subtitle": "본사·지사·IDC·가정 고객망을 연결한 기업 네트워크",
    "role": "본사·지사 VPN, UTM·DMZ·IPS, Spine–Leaf, Linux·DNS·MX·중앙 로그 서버 구축",
    "fix": "UTM·DMZ·VPN, OSPF, SLB/VIP 이중화, WEB–WAS–DB·MX·운영 서비스 구현",
    "result": "OSPF·VIP 절체, FTTH 쇼핑몰 로그인, MX1→Thunderbird 메일 수신 확인",
    "stack": "OSPF · pfSense · HAProxy · Keepalived · Nginx · Tomcat · MariaDB · Chrony",
    "work": [
      [
        "기업망",
        "본사·지사 VLAN·OSPF·VPN과 ISP/IX·FTTH 고객망 구축"
      ],
      [
        "보안망",
        "pfSense FW/UTM·DMZ·IPS/IDS 및 서비스 NAT·접근 정책"
      ],
      [
        "IDC",
        "Spine–Leaf·HAProxy·Keepalived Front/Backend VIP, WEB–WAS–DB 구성"
      ],
      [
        "공통 서비스",
        "BIND9 DNS, Postfix·Dovecot MX, Chrony NTP, rsyslog 중앙 로그 수집"
      ],
      [
        "검증",
        "VIP 절체·OSPF·FTTH 접속·로그인·Thunderbird IMAP 수신 확인"
      ]
    ],
    "network": [
      [
        "본사·지사",
        "서버팜·사무망·관리망을 구분하고 UTM·VPN으로 거점 연결"
      ],
      [
        "보안 경계",
        "DMZ와 접근 경계를 구성하고 내부 업무망·서비스망을 분리"
      ],
      [
        "IDC",
        "역할별 Leaf에 WEB·WAS·DB·인프라·관리망 배치"
      ],
      [
        "고객 접근",
        "가정 PC → Home Router → ISP/IX → IDC 서비스의 접속 경로 구성"
      ],
      [
        "메일·로그",
        "MX1 Postfix·Dovecot 메일 전달과 Thunderbird IMAP 수신 확인, rsyslog 중앙 로그 수집 구성"
      ]
    ],
    "note": "개인 프로젝트 구축을 완료했습니다. 100대는 데이터센터 수용 목표 설계이지 실제 서버 100대 가동 기록은 아닙니다. DB3/Galera 등 별도 심화 설계는 구축 완료 성과에 포함하지 않습니다.",
    "troubles": [
      {
        "title": "NTP 서비스 실행과 실제 동기화 구분",
        "symptom": "서비스가 실행 중이어도 클라이언트가 실제로 시간을 동기화했는지는 별도 확인이 필요했습니다.",
        "action": "Reference ID·Stratum·Leap status·UDP 123 리스닝을 확인하고 클라이언트 응답 수신을 별도 점검 항목으로 분리했습니다.",
        "result": "NTP1의 로컬 시간원 동작을 확인했습니다. 외부 표준시각·전체 클라이언트 동기화는 추가 검증 대상으로 남겼습니다."
      },
      {
        "title": "FTTH WAN DHCP 장애 해결",
        "symptom": "Home Router가 WAN DHCP 주소를 수신하지 못했습니다.",
        "action": "LG-L3-1 설정에서 비활성화된 DHCP 서비스를 확인해 service dhcp를 활성화했습니다.",
        "result": "Home Router WAN DHCP와 가정 PC 주소 할당을 확인했습니다."
      },
      {
        "title": "MX1 메일 수신 검증",
        "symptom": "서버 프로세스 실행만으로 실제 클라이언트 수신을 입증하기 어려웠습니다.",
        "action": "Postfix·Dovecot 메일 처리를 구성하고 Windows 가상 PC Thunderbird에서 테스트 계정을 조회했습니다.",
        "result": "mailuser2@starmall.com 받은 편지함에서 mailuser1@starmall.com의 MX1 test 메일을 확인했습니다."
      }
    ],
    "scope": "기업망·보안·IDC·고객망 전 구간 구축",
    "coverView": "topology",
    "technologies": [
      "java",
      "nginx",
      "tomcat",
      "mariadb",
      "haproxy",
      "linux"
    ],
    "techAreas": [
      [
        "네트워크",
        "Spine–Leaf · VLAN · OSPF · NAT/PAT · Site-to-Site VPN"
      ],
      [
        "보안·가용성",
        "pfSense · FW/UTM · DMZ · Suricata IPS · Keepalived · VIP"
      ],
      [
        "운영 서비스",
        "BIND9 · Postfix · Dovecot · Chrony · rsyslog"
      ]
    ]
  }
};
const technologyNames = {
  java: 'Java',
  csharp: 'C#',
  godot: 'Godot',
  mariadb: 'MariaDB',
  nginx: 'Nginx',
  linux: 'Linux',
  tomcat: 'Tomcat',
  haproxy: 'HAProxy'
};
const detailViews = [
  { id: 'notes', label: '역할·구축 기록' },
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
  const coverView = c.coverView || 'images';
  const coverAction = coverView === 'topology' ? '구성도 보기' : '서비스 화면 보기';
  return `<article class="project-row">
    <div class="project-art">
      <button class="cover-button" type="button" data-project="${id}" data-view="${coverView}" aria-label="${escapeHTML(project.title)} ${coverAction}">
        <img class="project-cover" src="${c.cover}" alt="${c.coverAlt}" width="${c.coverWidth}" height="${c.coverHeight}" decoding="async">
      </button>
      <p class="cover-caption"><span>${c.coverLabel}</span><button type="button" data-project="${id}" data-view="${coverView}">${coverAction} ↗</button></p>
    </div>
    <div class="project-copy">
      <div class="project-topline"><span class="project-type">${c.type}</span><span>${c.period}</span></div>
      <h2>${escapeHTML(project.title)}</h2>
      <p class="project-subtitle">${c.subtitle}</p>
      <p class="project-scope">${escapeHTML(c.scope)}</p>
      <dl class="project-facts">
        <div><dt>내 역할</dt><dd>${c.role}</dd></div>
        <div><dt>${project.id === 'smdc' ? '주요 구현' : '문제 해결'}</dt><dd>${c.fix}</dd></div>
        <div><dt>확인 결과</dt><dd>${c.result}</dd></div>
      </dl>
      <section class="project-technologies" aria-label="프로젝트 사용 기술">
        <h3>사용 기술</h3>
        <ul class="technology-list">${c.technologies.map(key => `<li><img src="/assets/tech/${key}.svg" alt="" aria-hidden="true" width="32" height="32" loading="lazy" decoding="async"><span>${technologyNames[key]}</span></li>`).join('')}</ul>
        ${Array.isArray(c.techAreas) ? `<dl class="technology-areas">${c.techAreas.map(([label, body]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(body)}</dd></div>`).join('')}</dl>` : ''}
      </section>
      <div class="project-actions">
        <button type="button" data-project="${id}" data-view="notes">${project.id === 'aleph-arena' ? '역할·구축 기록' : '구축·검증 기록'} ↗</button>
        <button type="button" data-project="${id}" data-view="topology">토폴로지 보기 ↗</button>
        <button type="button" data-project="${id}" data-view="images">서비스 화면 ↗</button>
      </div>
    </div>
  </article>`;
}

function workList(items) {
  return `<ul class="work-list">${items.map(([title, body]) => `<li><b>${escapeHTML(title)}</b> ${escapeHTML(body)}</li>`).join('')}</ul>`;
}

function responsibilities(c) {
  return `<section class="role-summary" aria-label="본인 담당 영역">
      <span>MY ROLE</span><h3>웹사이트 · 런처 · 게임 개발 / 한국 IDC 구축</h3><p>${escapeHTML(c.roleSummary)}</p>
    </section>
    ${Array.isArray(c.components) ? `<div class="build-scope-grid">${c.components.map(item => `<section class="build-scope-card"><h4>${escapeHTML(item.title)}</h4><strong>${escapeHTML(item.tech)}</strong><p>${escapeHTML(item.body)}</p></section>`).join('')}</div>` : ''}
    <h3 class="detail-section-title">팀 업무 분담과 나의 담당</h3>
    <table class="team-table" aria-label="5인 팀의 거점별 업무 분담">
      <thead><tr><th scope="col">담당 영역</th><th scope="col">주요 업무</th></tr></thead>
      <tbody>${c.teamRoles.map(row => `<tr${row.mine ? ' class="my-role"' : ''}>
        <th scope="row">${escapeHTML(row.area)}<span>${row.mine ? '서동연 · 본인 담당' : '팀원 담당'}</span></th>
        <td>${escapeHTML(row.scope)}</td></tr>`).join('')}</tbody>
    </table>
    <h3 class="detail-section-title">직접 수행한 작업</h3>
    <ol class="contribution-list">${c.contributions.map(item => `<li><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.body)}</p></li>`).join('')}</ol>`;
}

function notes(project) {
  const c = compact[project.id];
  return `${c.teamRoles ? responsibilities(c) : `<p class="detail-role"><b>직접 맡은 범위</b>${c.role}</p>
    <h3 class="detail-section-title">수행한 작업</h3>${workList(c.work)}
    <h3 class="detail-section-title">네트워크 구성</h3>${workList(c.network)}`}
    ${c.teamResult ? `<h3 class="detail-section-title">팀 공동 통합 검증</h3><p class="detail-intro">${c.teamResult}</p>` : ''}
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
    <a class="${topology ? 'topology-image' : 'gallery-image'}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${title} 원본 보기">
      <img src="${url}" alt="${escapeHTML(item.caption || item.title)}" width="${width}" height="${height}" decoding="async" loading="lazy">
    </a>
    <figcaption><strong>${title}</strong>${topology && item.caption ? `<span>${escapeHTML(item.caption)}</span>` : ''}
      ${topology && Array.isArray(item.details) ? `<dl class="topology-details">${item.details.map(detail => `<div><dt>${escapeHTML(detail.label)}</dt><dd>${escapeHTML(detail.text)}</dd></div>`).join('')}</dl>` : ''}
    </figcaption>
  </figure>`;
}

function gallery(project) {
  const items = (project.images || []).filter(item => safeURL(item.url));
  return `<p class="gallery-intro">사진을 누르면 원본 크기로 볼 수 있습니다.</p>
    <div class="gallery">${items.map(item => imageFigure(item)).join('')}</div>`;
}

function topology(project) {
  const items = (project.topologies || []).filter(item => safeURL(item.url));
  return `${project.id === 'aleph-arena' ? `<section class="role-summary" aria-label="전체 구성에서 본인 담당 범위"><span>MY SCOPE</span><h3>전체 5개 거점 중, 한국 IDC 담당</h3><p>공통 토폴로지·IP·VLAN·WAN 설계를 주도하고 한국 IDC의 네트워크·서버·서비스를 직접 구축했습니다. 다른 거점의 개별 구축은 팀원이 담당했습니다.</p></section>` : ''}
    <p class="topology-intro">${project.id === 'smdc' ? '전체 연결 구조와 구간별 구축 내용입니다.' : '팀 전체 연결 구조와 담당 범위입니다.'} 그림을 누르면 원본 크기로 볼 수 있습니다.</p>
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
