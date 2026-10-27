'use strict';
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL=value=>{if(typeof value!=='string'||!value.trim())return '';try{const url=new URL(value,location.origin);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}};
const compact = {
  "aleph-arena": {
    "type": "팀 프로젝트 · 5인",
    "period": "2026.09.17 — 09.23",
    "sortDate": "2026-09-17",
    "cover": "/assets/arena/web-main-v2.jpg",
    "coverWidth": 1513,
    "coverHeight": 1039,
    "coverAlt": "게임 서비스 웹사이트 메인 화면",
    "coverLabel": "게임 서비스 · 글로벌 거점 네트워크",
    "subtitle": "게임 서비스를 제공하기 위해 한국·일본의 본사·지사·데이터센터와 개발·QA 센터를 연결하는 네트워크 및 서비스 환경을 설계하고 구축한 프로젝트입니다.",
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
        "Core · IDC-Core1",
        "상위 라우터와 Distribution을 연결해 IDC 안팎의 트래픽을 전달합니다."
      ],
      [
        "Distribution · IDC-Dist1·2",
        "역할별 VLAN의 게이트웨이와 망 간 라우팅을 담당합니다."
      ],
      [
        "Access · IDC-Acc1",
        "서비스 서버망의 WEB·WAS·GAME 서버를 연결합니다."
      ],
      [
        "Access · IDC-Acc2",
        "DB·스토리지망의 DB 서버를 연결합니다."
      ],
      [
        "Access · IDC-Acc3",
        "인프라 서버망의 NS1·CNS1을 연결합니다."
      ],
      [
        "Access · IDC-Acc4",
        "관리망의 관리자 PC를 연결합니다."
      ]
    ],
    "teamResult": "각자 구축한 환경을 공통 IP·VLAN·WAN 기준에 맞춰 UDP Tunnel로 연결했습니다. 이후 거점 간 경로와 IDC 서비스 접근을 함께 확인했습니다.",
    "note": "담당 범위는 한국 IDC와 웹·런처·게임 개발입니다. 다른 거점은 팀원이 구축하고, 거점 연결과 서비스 접근은 함께 점검했습니다.",
    "troubles": [
      {
        "title": "웹사이트 접속 차단",
        "symptom": "웹사이트를 배포한 뒤 접근 권한 오류로 페이지가 열리지 않았습니다.",
        "action": "일반 파일 권한 외에 서버의 보안 정책을 확인하고, 웹 서비스가 배포 파일에 접근할 수 있도록 설정을 수정했습니다.",
        "result": "보안 기능을 끄지 않고 웹사이트 접속을 복구했습니다."
      },
      {
        "title": "접속 주소에 따라 달랐던 응답",
        "symptom": "같은 서버에서도 접속 주소에 따라 웹과 WAS의 응답이 달랐습니다.",
        "action": "요청이 전달되는 웹 서버 설정을 비교해 기본 접속 경로와 실제 서비스 경로를 구분했습니다.",
        "result": "실제 서비스 주소에서 웹과 WAS가 정상적으로 연결되는 것을 확인했습니다."
      },
      {
        "title": "내부 도메인 조회 실패",
        "symptom": "DNS 서버에 직접 요청하면 응답했지만, 캐시 DNS를 거치면 조회에 실패했습니다.",
        "action": "요청 경로와 응답을 비교해 DNS 검증 과정에서 문제가 발생하는 것을 확인했습니다.",
        "result": "장애 원인을 캐시 DNS의 검증 설정으로 좁혔습니다. 최종 해결까지 확인한 사례와 구분해 기록했습니다."
      }
    ],
    "scope": "웹사이트 · 런처 · 게임 개발 / 한국 IDC 구축",
    "coverView": "images",
    "technologies": [
      "rockylinux",
      "windows",
      "nginx",
      "tomcat",
      "mariadb",
      "java",
      "javascript",
      "csharp",
      "dotnet",
      "godot"
    ],
    "tools": [
      "GNS3",
      "Oracle VirtualBox"
    ],
    "techAreas": [
      [
        "네트워크",
        "VLAN · OSPF · Static Route · DHCP · UDP Tunnel"
      ],
      [
        "인프라",
        "Linux · BIND DNS · Nginx–Tomcat · MariaDB · Linux 게임 서버"
      ]
    ],
    "roleSummary": "5인 팀에서 한국 IDC 네트워크와 서버 구성을 맡았습니다. 게임 웹사이트, Windows 런처, Godot 게임을 만들어 한국 IDC에 배포하고 웹 접속과 게임 플레이를 확인했습니다.",
    "teamRoles": [
      {
        "area": "한국 본사",
        "scope": "본사 사용자·관리망과 ISP·국제 WAN 연결",
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
        "area": "일본 IDC",
        "scope": "일본 IDC 네트워크·서버 구성",
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
        "body": "C#/.NET 8 런처를 제작하고 Windows 실행 파일로 빌드·배포했습니다. 버전 정보 조회, 게임 ZIP 다운로드·압축 해제와 게임 실행 흐름을 구현했습니다."
      },
      {
        "title": "Godot 게임 직접 개발",
        "body": "Godot 게임 클라이언트와 Linux 전용 게임 서버를 구축했습니다. AI·로컬 플레이, 온라인 방 접속·READY·시작 흐름과 Windows↔Linux 실제 플레이를 확인했습니다."
      },
      {
        "title": "한국 IDC와 네트워크 구축",
        "body": "팀의 공통 IP·VLAN·연결 기준을 맞추고 한국 IDC의 WEB·WAS·DB·DNS 및 게임 서버 운영 환경을 구축했습니다."
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
    ],
    "checks": []
  },
  "smdc": {
    "type": "개인 프로젝트",
    "period": "2026.10.14 — 10.26",
    "sortDate": "2026-10-14",
    "cover": "/assets/enterprise/gns_all_topology.png",
    "coverWidth": 1600,
    "coverHeight": 1556,
    "coverAlt": "직접 구축한 Enterprise Network 전체 GNS3 원본 구성도",
    "coverLabel": "StarMall 쇼핑몰 · 서비스 인프라·이중화",
    "subtitle": "쇼핑몰 서비스를 제공하기 위해 본사·지사·데이터센터와 외부 고객 접속 환경을 설계하고 구축한 프로젝트입니다.",
    "role": "네트워크 설계부터 Linux 서버 설치, 쇼핑몰 배포, 보안 정책과 공통 서비스 설정까지 전체 구간을 구성했습니다.",
    "fix": "UTM·DMZ·VPN, OSPF, SLB/VIP 이중화, WEB–WAS–DB·MX·운영 서비스 구현",
    "result": "가정 PC의 쇼핑몰 접속·로그인, SLB VIP 절체, Thunderbird 메일 수신 확인",
    "stack": "Linux · Nginx · Tomcat · MariaDB · HAProxy · Keepalived · pfSense · Suricata · BIND9 · Postfix · Dovecot · Chrony · rsyslog",
    "work": [
      [
        "쇼핑몰 서비스",
        "Nginx–Tomcat–MariaDB를 연동하고 StarMall 회원가입·로그인 서비스를 배포"
      ],
      [
        "서비스 이중화",
        "HAProxy 부하 분산과 Keepalived VRRP로 SLB 이중화 및 Front·Backend VIP 구성"
      ],
      [
        "IDC 네트워크",
        "Spine–Leaf와 OSPF, 역할별 VLAN으로 WEB·WAS·DB·인프라·관리망 분리"
      ],
      [
        "거점·고객망",
        "본사·지사 VPN, ISP/IX·FTTH 고객망과 DHCP·NAT/PAT 구성"
      ],
      [
        "보안 경계",
        "pfSense FW/UTM·DMZ·Suricata IPS/IDS 및 서비스 접근 정책 구성"
      ],
      [
        "공통 서비스",
        "BIND9 DNS, Postfix·Dovecot 메일, Chrony NTP, rsyslog 중앙 로그 수집"
      ],
      [
        "검증",
        "OSPF·VIP 절체 점검, 가정 PC의 쇼핑몰 접속·로그인과 Thunderbird 메일 수신 확인"
      ]
    ],
    "network": [
      [
        "거점 연결",
        "본사와 지사는 VPN으로 연결하고, IDC·외부 고객망은 ISP/IX 구간으로 연결했습니다."
      ],
      [
        "IDC 내부",
        "Spine 2대와 역할별 Leaf를 연결했습니다. OSPF로 경로를 구성하고 WEB·WAS·DB·인프라·관리망을 분리했습니다."
      ],
      [
        "고객 접속",
        "가정 PC에서 Home Router와 ISP/IX를 거쳐 쇼핑몰에 접속하도록 DHCP·NAT·라우팅을 설정했습니다."
      ]
    ],
    "note": "100대 수용을 기준으로 설계하고, 실습 환경에서는 역할별 대표 장비와 서버로 구성했습니다.",
    "troubles": [
      {
        "title": "가정 라우터가 WAN 주소를 받지 못한 문제",
        "symptom": "Home Router가 WAN DHCP 주소를 수신하지 못했습니다.",
        "action": "상위 L3 스위치의 DHCP 설정을 확인하다 서비스가 꺼져 있는 것을 발견했습니다. service dhcp를 적용한 뒤 주소 할당을 다시 확인했습니다.",
        "result": "Home Router WAN DHCP와 가정 PC 주소 할당을 확인했습니다."
      }
    ],
    "scope": "기업망·보안·IDC·고객망 전 구간 구축",
    "coverView": "images",
    "technologies": [
      "rockylinux",
      "ubuntu",
      "windows",
      "pfsense",
      "haproxy",
      "nginx",
      "tomcat",
      "java",
      "mariadb"
    ],
    "tools": [
      "GNS3",
      "Oracle VirtualBox"
    ],
    "techAreas": [
      [
        "네트워크",
        "Spine–Leaf · VLAN · OSPF · Static Route · DHCP · NAT/PAT · Site-to-Site VPN"
      ],
      [
        "보안·이중화",
        "pfSense FW/UTM · DMZ · Suricata IPS/IDS · HAProxy · Keepalived · VRRP/VIP"
      ],
      [
        "쇼핑몰 서버",
        "Rocky Linux · Ubuntu · Windows · Nginx · Tomcat · Java Servlet · MariaDB · WEB–WAS–DB"
      ],
      [
        "공통 서비스",
        "BIND9 DNS · Postfix·Dovecot 메일 · Chrony NTP · rsyslog 중앙 로그"
      ]
    ],
    "checks": [
      [
        "쇼핑몰",
        "가정 PC에서 StarMall 접속, 회원가입 화면과 로그인 후 사용자명 표시를 확인했습니다."
      ],
      [
        "이중화",
        "HAProxy·Keepalived로 Front·Backend VIP를 구성하고 SLB 장애 시 VIP 절체를 확인했습니다."
      ],
      [
        "메일",
        "Postfix의 사용자 간 메일 전달과 Dovecot IMAP을 설정하고 Thunderbird에서 수신을 확인했습니다."
      ],
      [
        "운영",
        "rsyslog 중앙 로그 수집을 구성했습니다. Chrony는 로컬 시간원 동작을 확인했으며 외부 표준시각과 전체 단말의 동기화는 추가 확인이 필요합니다."
      ]
    ]
  }
};
const technologyNames = {
  rockylinux: 'Rocky Linux',
  ubuntu: 'Ubuntu',
  windows: 'Windows',
  c: 'C',
  javascript: 'JavaScript',
  dotnet: '.NET',
  pfsense: 'pfSense',
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
  { id: 'notes', label: '수행 내용' },
  { id: 'topology', label: '설계도' },
  { id: 'images', label: '실제 구현 화면' }
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
  const coverAction = '실제 구현 화면 보기';
  return `<article class="project-row">
    <div class="project-art${project.id === 'smdc' ? ' enterprise-art' : ''}">
      <button class="cover-button" type="button" data-project="${id}" data-view="${coverView}" aria-label="${escapeHTML(project.title)} ${coverAction}">
        ${project.id === 'smdc' ? `<span class="enterprise-cover-title"><span>NETWORK · SECURITY · IDC</span><strong>StarMall<br>Infrastructure<span class="cover-dot">.</span></strong></span><span class="enterprise-cover-evidence"><img class="cover-network-capture" src="/assets/enterprise/gns_idc_topology.png" alt="직접 구축한 IDC의 GNS3 원본 구성" width="980" height="727" decoding="async"><img class="cover-service-capture" src="/assets/enterprise/homepc-web.png" alt="FTTH 고객 PC의 StarMall 실제 접속 화면" width="1010" height="841" decoding="async"></span>` : `<img class="project-cover" src="${c.cover}" alt="${c.coverAlt}" width="${c.coverWidth}" height="${c.coverHeight}" decoding="async">`}
      </button>
      <p class="cover-caption"><span>${c.coverLabel}</span><button type="button" data-project="${id}" data-view="${coverView}">${coverAction} ↗</button></p>
    </div>
    <div class="project-copy">
      <div class="project-topline"><span class="project-type">${c.type}</span></div>
      <h2>${escapeHTML(project.title)}</h2>
      <p class="project-period"><span>프로젝트 기간</span><strong>${c.period}</strong></p>
      <p class="project-subtitle">${c.subtitle}</p>
      <section class="project-technologies" aria-label="프로젝트 사용 기술">
        <h3>사용 기술</h3>
        <ul class="technology-list">${c.technologies.map(key => `<li><img src="/assets/tech/${key}.svg" alt="" aria-hidden="true" width="32" height="32" loading="lazy" decoding="async"><span>${technologyNames[key]}</span></li>`).join('')}</ul>
        <dl class="technology-areas"><div><dt>사용 도구</dt><dd>${c.tools.map(escapeHTML).join(' · ')}</dd></div></dl>
      </section>
      <div class="project-actions">
        <button type="button" data-project="${id}" data-view="notes">수행 내용 ↗</button>
        <button type="button" data-project="${id}" data-view="topology">설계도 ↗</button>
        <button type="button" data-project="${id}" data-view="images">실제 구현 화면 ↗</button>
      </div>
    </div>
  </article>`;
}

function cleanProjectText(value) {
  return escapeHTML(String(value ?? '').replace(/직접\s*/g, ''));
}

function recordHeading(number,title,description,body) {
  return `<section class="record-section" aria-labelledby="record-title-${number}">
    <header class="record-heading"><span class="record-number" aria-hidden="true">${number}</span>
    <div><h3 id="record-title-${number}">${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></div></header>
    ${body}</section>`;
}

function recordRoles(c) {
  const hasTeam=Array.isArray(c.teamRoles)&&c.teamRoles.length>0;
  const title=c.scope;
  const description=hasTeam?c.roleSummary:c.role;
  const team=hasTeam?`<section class="record-team" aria-labelledby="record-team-title">
    <h4 id="record-team-title">팀 업무 분담</h4>
    <table class="team-table" aria-label="5인 팀 역할 분담"><thead><tr><th scope="col">담당 영역</th><th scope="col">주요 업무</th></tr></thead>
    <tbody>${c.teamRoles.map(item=>`<tr${item.mine?' class="my-role"':''}>
      <th scope="row">${cleanProjectText(item.area)}<span>${item.mine?'서동연 · 본인 담당':'팀원 담당'}</span></th>
      <td>${cleanProjectText(item.scope)}</td></tr>`).join('')}</tbody></table></section>`:'';
  return `<div class="role-summary record-role"><div class="record-role-meta"><strong>MY ROLE</strong><span>${escapeHTML(c.type)}</span></div>
    <h4>${cleanProjectText(title)}</h4><p>${cleanProjectText(description)}</p></div>${team}`;
}

function recordCards(project,c) {
  const cards=project.id==='aleph-arena'
    ? c.components.map((x,i)=>({...x,body:c.contributions?.[i]?.body||x.body}))
    : [
      {title:'기업 네트워크',tech:'Spine–Leaf · OSPF · VLAN · VPN · NAT/PAT',body:'IDC의 Spine 2대와 역할별 Leaf, VLAN·OSPF 경로를 구성했습니다. 본사·지사 VPN과 ISP/IX·FTTH 고객망의 DHCP·NAT/PAT를 설정했습니다.'},
      {title:'쇼핑몰 서버·서비스',tech:'Rocky Linux · Ubuntu · Nginx · Tomcat · MariaDB',body:'WEB–WAS–DB 서비스를 연동하고 StarMall 회원가입·로그인 환경을 구축·배포했습니다.'},
      {title:'보안·이중화',tech:'pfSense · Suricata · HAProxy · Keepalived',body:'FW/UTM·DMZ·IPS/IDS 및 서비스 접근 정책을 구성하고, HAProxy·Keepalived로 SLB와 Front·Backend VIP를 이중화했습니다.'},
      {title:'공통 인프라',tech:'BIND9 · Postfix · Dovecot · Chrony · rsyslog',body:'DNS·메일·NTP·중앙 로그 수집 환경을 구성했습니다.'}
    ];
  return `<div class="build-scope-grid execution-cards">${cards.map((item,i)=>`<article class="build-scope-card">
    <span class="execution-card-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span>
    <h4>${cleanProjectText(item.title)}</h4>
    <strong>${cleanProjectText(item.tech)}</strong>
    <p>${cleanProjectText(item.body)}</p></article>`).join('')}</div>`;
}

function recordImplementation(project,c) {
  const tech=c.techAreas.map(([label,value])=>`<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('');
  const network=c.network.map(([label,value])=>`<div><dt>${cleanProjectText(label)}</dt><dd>${cleanProjectText(value)}</dd></div>`).join('');
  const note=project.id==='smdc'?`<p class="execution-build-note"><b>설계 범위</b>${cleanProjectText(c.note)}</p>`:'';
  return `${recordCards(project,c)}${note}
    <section class="execution-tech" aria-label="상세 사용 기술과 도구">
      <h4>사용 기술·도구</h4><dl class="technology-areas">${tech}<div><dt>사용 도구</dt><dd>${c.tools.map(escapeHTML).join(' · ')}</dd></div></dl>
    </section>
    <details class="execution-network"><summary>네트워크 구성 상세 보기</summary><dl>${network}</dl></details>`;
}

function recordTroubles(c) {
  return `<div class="execution-issues">${c.troubles.map((issue,i)=>`<article class="execution-issue">
    <header><span>CASE ${String(i+1).padStart(2,'0')}</span><h4>${cleanProjectText(issue.title)}</h4></header>
    <dl><div><dt>상황</dt><dd>${cleanProjectText(issue.symptom)}</dd></div>
        <div><dt>분석·조치</dt><dd>${cleanProjectText(issue.action)}</dd></div>
        <div><dt>확인 결과</dt><dd>${cleanProjectText(issue.result)}</dd></div></dl>
  </article>`).join('')}</div>`;
}

function recordResults(project,c) {
  const items=c.checks?.length?c.checks:[
    ['웹·WAS 연동','게임 웹사이트 접속과 Java WAS /api/ 요청, 데이터베이스 연동을 확인했습니다.'],
    ['Windows 런처','C#/.NET 8 런처 실행 파일을 빌드·배포하고 게임 실행 흐름을 구현했습니다.'],
    ['온라인 게임','Windows 게임 클라이언트에서 Linux Dedicated Server에 접속해 실제 게임 플레이를 확인했습니다.'],
    ['거점 연결',c.teamResult]
  ];
  return `<div class="execution-results">${items.map(([label,value],i)=>`<article class="execution-result">
    <span>CHECK ${String(i+1).padStart(2,'0')}</span><h4>${cleanProjectText(label)}</h4><p>${cleanProjectText(value)}</p>
  </article>`).join('')}</div>
  <p class="execution-results-tip">관련 증빙은 ‘설계도’ 및 ‘실제 구현 화면’ 탭에서 확인할 수 있습니다.</p>`;
}

function notes(project) {
  const c=compact[project.id];
  return `<div class="execution-record">
    ${recordHeading('01','담당 역할','담당 범위와 역할 구분',recordRoles(c))}
    ${recordHeading('02','주요 구현 내용','구현한 기능과 인프라를 영역별로 정리',recordImplementation(project,c))}
    ${recordHeading('03','문제 해결','상황 · 분석 및 조치 · 확인 결과',recordTroubles(c))}
    ${recordHeading('04','검증 결과','구축 후 실제 확인한 기능과 서비스',recordResults(project,c))}
  </div>`;
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
    <figcaption><strong>${title}</strong>${item.caption ? `<span>${escapeHTML(item.caption)}</span>` : ''}
      ${topology && Array.isArray(item.details) ? `<dl class="topology-details">${item.details.map(detail => `<div><dt>${escapeHTML(detail.label)}</dt><dd>${escapeHTML(detail.text)}</dd></div>`).join('')}</dl>` : ''}
    </figcaption>
  </figure>`;
}

function gallery(project) {
  const service = (project.images || []).filter(item => safeURL(item.url));
  const network = (project.topologies || []).filter(item => item.kind === 'implementation' && safeURL(item.url));
  return `<p class="gallery-intro">구현한 서비스와 네트워크 환경입니다. 이미지를 누르면 원본 전체를 확인할 수 있습니다.</p>
    <section class="evidence-section"><h3 class="detail-section-title">서비스 동작 · 실제 확인 화면</h3><div class="gallery">${service.map(item => imageFigure(item)).join('')}</div></section>
    ${network.length ? `<section class="evidence-section"><h3 class="detail-section-title">네트워크 · GNS3 실제 구성</h3><p class="detail-intro">${project.id === 'aleph-arena' ? '한국 IDC의 실제 GNS3 구성입니다. 초기 설계도와 장비·주소 배치에 차이가 있습니다.' : 'IDC·본사·지사·고객망을 직접 연결한 환경입니다. 설계도 탭의 구성과 비교해 볼 수 있습니다.'}</p><div class="gallery implementation-gallery">${network.map(item => imageFigure(item)).join('')}</div></section>` : ''}`;
}

function topology(project) {
  const items = (project.topologies || []).filter(item => item.kind !== 'implementation' && safeURL(item.url));
  return `${project.id === 'aleph-arena' ? `<section class="role-summary" aria-label="전체 구성에서 본인 담당 범위"><span>MY SCOPE</span><h3>전체 5개 거점 중, 한국 IDC 담당</h3><p>팀의 공통 IP·VLAN·연결 기준을 맞추고 한국 IDC의 네트워크·서버·서비스 구축을 맡았습니다. 다른 거점의 개별 구축은 팀원이 담당했습니다.</p></section>` : ''}
    <p class="topology-intro">${project.id === 'smdc' ? '전체 연결 구조와 영역별 설계입니다. 실제 GNS3 구성과 서비스 검증 캡처는 실제 구현 화면 탭에서 볼 수 있습니다.' : '팀 전체 네트워크와 본인 담당 영역을 보여주는 구성도입니다.'} 이미지를 누르면 원본 전체를 확인할 수 있습니다.</p>
    <div class="topology-grid">${items.map(item => imageFigure(item, true)).join('')}</div>`;
}

function setDetailView(project, requestedView) {
  const view = detailViews.some(item => item.id === requestedView) ? requestedView : 'notes';
  const c = compact[project.id];
  const count = id => id === 'images' ? (project.images?.length || 0) + (project.topologies || []).filter(item => item.kind === 'implementation').length : id === 'topology' ? (project.topologies || []).filter(item => item.kind !== 'implementation').length : null;
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
    projects = data.projects.filter(project => compact[project.id])
      .sort((a, b) => compact[b.id].sortDate.localeCompare(compact[a.id].sortDate));
    document.querySelector('#project-list').innerHTML = projects.map(projectRow).join('');
  })
  .catch(() => {
    document.querySelector('#project-list').innerHTML = '<p class="loading-error">프로젝트를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>';
  });
