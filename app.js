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
    "result": "웹·WAS 서비스 응답과 Windows 클라이언트↔Linux 게임 서버의 방 참가·매치 시작 확인",
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
    "note": "담당 범위는 한국 IDC와 웹·런처·게임 개발입니다. 다른 거점은 팀원이 구축하고 거점 연결과 서비스 접근은 함께 점검했습니다.",
    "troubles": [
      {
        "title": "SELinux 보안 설정으로 인한 웹사이트 403 오류",
        "symptom": "게임 웹사이트 배포 후 Nginx 설정과 일반 파일 권한에는 문제가 없었지만, 웹사이트 접속 시 403 오류가 발생했습니다.",
        "action": "임시 폴더에서 웹 서버 경로로 파일을 이동하는 과정에서 기존 SELinux 보안 설정이 유지된 것으로 판단했습니다. 웹 서버가 파일에 접근할 수 있도록 보안 컨텍스트를 수정했습니다.",
        "result": "SELinux를 비활성화하지 않고 웹사이트 정상 접속을 확인했습니다."
      },
      {
        "kind": "collaboration",
        "title": "거점별 네트워크를 연결하기 위한 팀 협업",
        "symptom": "5인 팀에서 한국 본사·개발/QA 센터·한국 IDC·일본 지사·일본 IDC를 나누어 구축했습니다. 서로 다른 거점을 연결하기 위해 공통 네트워크 기준을 맞춰야 했습니다.",
        "action": "팀원들과 IP·VLAN·WAN 연결 기준을 공유했습니다. 한국 IDC의 네트워크와 서버를 구성하고 각 거점을 UDP Tunnel로 연결하는 과정에서 통신 경로와 IDC 서비스 접근을 함께 점검했습니다.",
        "result": "팀원들이 구축한 거점을 연결한 뒤 거점 간 통신과 한국 IDC의 서비스 접근을 확인했습니다."
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
    "roleSummary": "5인 팀에서 한국 IDC 네트워크와 서버 구성을 맡았습니다. 게임 웹사이트·Windows 런처·Godot 게임을 개발하고 Linux 게임 서버의 2인 방 생성·참가·게임 시작 흐름을 검증했습니다.",
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
        "body": "Godot 게임 클라이언트와 Linux 게임 서버를 구성하고 두 플레이어가 방 생성·참가·준비·게임 시작을 진행하도록 구현했습니다. 게임 진행 상황은 서버에서 관리해 각 클라이언트에 전달했습니다."
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
        "tech": "Godot · Linux Dedicated Server · ENet/UDP",
        "body": "두 플레이어가 Linux 게임 서버에 접속해 같은 방에서 플레이하도록 구현했습니다. 서버에서 게임 진행을 처리하고 각 플레이어에게 결과를 전달하는 구조입니다.",
        "points": [
          "방 생성 → 다른 플레이어 참가 → 준비 완료 → 게임 시작",
          "서버에서 게임 진행을 관리하고 각 플레이어의 화면에 상태를 전달"
        ]
      },
      {
        "title": "한국 IDC",
        "tech": "Linux · Nginx · Tomcat · MariaDB",
        "body": "네트워크·DNS·WEB·WAS·DB·게임 서버 환경 구축과 연동"
      }
    ],
    "checks": [
      [
        "웹·WAS 연동",
        "게임 웹사이트 접속과 IPv4 서비스 주소의 /api/ 프록시를 통한 Tomcat HTTP 200 응답을 확인했습니다."
      ],
      [
        "Windows 런처",
        "C#/.NET 8 기반 Windows 런처의 빌드·배포와 게임 ZIP 다운로드·실행 흐름을 구성했습니다."
      ],
      [
        "온라인 멀티플레이",
        "게임 서버에서 두 플레이어의 방 참가·준비·게임 시작 흐름을 확인했습니다."
      ],
      [
        "거점 연동",
        "팀별 거점의 UDP Tunnel 연결 후 한국 IDC 서비스 접근과 거점 간 경로를 확인했습니다."
      ]
    ]
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
    "result": "가정 PC의 쇼핑몰 접속·로그인, SLB 장애 시 VIP 인계, Thunderbird 메일 수신 확인",
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
        "OSPF 경로·VIP 인계 점검, 가정 PC의 쇼핑몰 접속·로그인과 Thunderbird 메일 수신 확인"
      ]
    ],
    "network": [
      [
        "거점 연결",
        "본사와 지사는 VPN으로 연결하고 IDC·외부 고객망은 ISP/IX 구간으로 연결했습니다."
      ],
      [
        "IDC 내부",
        "Spine 2대와 역할별 Leaf를 연결했습니다. OSPF로 경로를 구성하고 WEB·WAS·DB·인프라·관리망을 분리했습니다."
      ],
      [
        "고객 접속",
        "가정 PC에서 Home Router와 ISP/IX를 거쳐 쇼핑몰에 접속하도록 DHCP·NAT·라우팅을 설정했습니다."
      ],
      [
        "관리망",
        "관리망에 Jump Server를 배치했습니다. 서버 관리는 관리자 PC에서 수행했습니다. Jump Server 경유 접속과 ACL 기반 접근 통제는 향후 검증할 계획입니다."
      ]
    ],
    "note": "100대 수용을 기준으로 설계하고 실습 환경에서는 역할별 대표 장비와 서버로 구성했습니다.",
    "troubles": [
      {
        "title": "SELinux 때문에 SLB 장애 전환이 실패한 문제",
        "symptom": "HAProxy는 실행 중이었지만 Keepalived의 HAProxy 감시 스크립트가 실행 오류(코드 126)를 내면서 FAULT 상태에 진입했습니다.",
        "action": "SELinux가 감시 스크립트의 systemctl 실행을 차단하는 것을 확인했습니다. SELinux를 끄지 않고 프로세스를 /proc에서 확인하는 방식으로 감시 스크립트를 변경했습니다.",
        "result": "감시 스크립트가 정상 동작하고 SLB1의 Keepalived 중지 시 SLB2가 Front·Backend VIP를 인계받는 것을 확인했습니다."
      },
      {
        "kind": "design",
        "title": "데이터센터 네트워크 구조 개선",
        "symptom": "초기에는 3-Tier 구조로 데이터센터 네트워크를 구축했습니다. 이후 데이터센터 내부의 서버 간 통신(East-West 트래픽)과 향후 서버 증설을 고려해 Spine–Leaf 구조로 변경하기로 했습니다.",
        "action": "기존 3-Tier 구조를 Spine 2대와 역할별 Leaf로 재설계했습니다. 각 Leaf에 서비스별 네트워크를 구성하고 OSPF를 적용해 장비 간 통신 경로를 설정했습니다.",
        "result": "Spine–Leaf 구조로 네트워크를 재구축했습니다. 서버 증설 시 Leaf를 추가해 네트워크를 확장할 수 있도록 구성했습니다."
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
        "pfSense FW/UTM · DMZ · Suricata IPS/IDS · HAProxy/Keepalived SLB · VRRP/VIP · WEB/WAS 다중 구성"
      ],
      [
        "쇼핑몰 서버",
        "Rocky Linux · Ubuntu · Windows · WEB1~3(Nginx) · WAS1~2(Tomcat) · MariaDB"
      ],
      [
        "공통 서비스",
        "BIND9 DNS · Postfix SMTP · Dovecot IMAP · Chrony NTP1 서버 시간 동기화 · rsyslog LOG1(TCP 514) 중앙 로그"
      ],
      [
        "관리망",
        "MGMT VLAN · Jump Server · PuTTY(SSH) · FileZilla(SFTP)"
      ]
    ],
    "components": [
      {
        "title": "기업 네트워크",
        "tech": "Spine–Leaf · OSPF · VLAN · VPN · DHCP · NAT/PAT",
        "body": "본사·지사·IDC와 외부 고객망을 연결하는 네트워크 경로를 구성했습니다.",
        "points": [
          "100대 수용 기준으로 설계하고 Spine 2대와 역할별 Leaf, VLAN·OSPF 경로를 구성",
          "본사–지사 Site-to-Site VPN과 ISP/IX·FTTH 고객망의 통신 경로 구성",
          "Home Router WAN DHCP·가정 LAN DHCP·NAT/PAT를 설정하고 쇼핑몰 접속 경로 점검",
          "관리망에 Jump Server를 배치했으며 관리 접속 경유·접근 제어 정책은 추후 검증 대상으로 구분"
        ]
      },
      {
        "title": "쇼핑몰 서버·서비스",
        "tech": "WEB 3대 · WAS 2대 · DB 2대 · Nginx · Tomcat · MariaDB",
        "body": "WEB–WAS–DB 다중 서버 환경을 구성하고 StarMall 회원가입·로그인 서비스를 배포했습니다.",
        "points": [
          "Nginx WEB1~3과 Tomcat WAS1~2를 구축하고 웹 서버–WAS 연동",
          "WAS 2대 환경을 구성하고 WAS2 서비스 상태 URL에서 HTTP 200 응답 확인",
          "MariaDB DB1(Primary) → DB2(Replica) 복제 구성과 기존 회원 데이터 일치 확인",
          "DB 자동 장애 전환과 복제본 자동 승격은 별도 구현 범위로 구분"
        ]
      },
      {
        "title": "보안·이중화",
        "tech": "pfSense · Suricata · HAProxy · Keepalived · VRRP/VIP",
        "body": "서비스 접근을 보호하고 부하 분산·장애 대응 구조를 구성했습니다.",
        "points": [
          "pfSense FW/UTM·DMZ·DB 접근 경계, Suricata IPS/IDS 및 접근 정책 구성",
          "HAProxy 부하 분산과 Keepalived VRRP로 SLB 이중화, Front·Backend VIP 구성",
          "SLB 장애 시 대기 장비의 VIP 인계 확인, WEB·WAS 다중 구성 및 DB Primary–Replica 복제 적용"
        ]
      },
      {
        "title": "공통 인프라",
        "tech": "BIND9 · Postfix · Dovecot · Thunderbird · Chrony · rsyslog",
        "body": "DNS·메일·시간 동기화·중앙 로그 서비스를 연계해 인프라 운영 환경을 구축했습니다.",
        "points": [
          "BIND9 기반 DNS·캐시 DNS를 구성해 서비스 도메인 조회 환경 제공",
          "Postfix SMTP 메일 전송과 Dovecot IMAP 수신을 설정하고 Thunderbird에서 수신 확인",
          "Chrony NTP1을 공통 시간원으로 사용해 서비스 서버들의 시간을 동기화",
          "서버별 rsyslog 로그를 LOG1(TCP 514)에 모아 동일한 시간 기준으로 이벤트 확인"
        ]
      }
    ],
    "checks": [
      [
        "쇼핑몰 접속",
        "가정 PC에서 StarMall 접속, 회원가입 화면 및 로그인 후 사용자명 표시를 확인했습니다."
      ],
      [
        "SLB 이중화",
        "HAProxy·Keepalived의 Front·Backend VIP를 구성하고 SLB 장애 시 대기 장비가 VIP를 넘겨받는 것을 확인했습니다."
      ],
      [
        "WEB·WAS 구성",
        "Nginx WEB 3대와 Tomcat WAS 2대를 구성했습니다. WAS2 서비스 상태 URL에서 HTTP 200 응답을 확인했습니다."
      ],
      [
        "DB 복제",
        "MariaDB DB1 Primary→DB2 Replica 복제에서 회원 데이터 일치와 복제 스레드 정상 동작을 확인했습니다. 자동 장애 전환은 미구현입니다."
      ],
      [
        "메일 서비스",
        "Postfix를 통한 메일 전달과 Dovecot IMAP 설정 후 Thunderbird의 수신 동작을 확인했습니다."
      ],
      [
        "시간 동기화·로그",
        "Chrony NTP1 기준으로 서버 간 시각을 맞추고 rsyslog로 LOG1에 로그를 중앙 수집해 같은 시간 기준으로 확인하도록 구성했습니다."
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
  { id: 'design', label: '설계' },
  { id: 'build', label: '구현' },
  { id: 'issues', label: '문제 및 해결' }
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
  const coverView = 'notes';
  const coverAction = '수행 내용 보기';
  const isMall = project.id === 'smdc';
  const thumbnailSrc = isMall ? '/assets/enterprise/homepc-web.png' : '/assets/arena/web-main-v2.jpg';
  const thumbnailAlt = isMall ? 'StarMall 쇼핑몰 메인 화면' : 'ALEPH Arena 게임 웹사이트 메인 화면';
  const thumbnailWidth = isMall ? 1010 : 1513;
  const thumbnailHeight = isMall ? 841 : 1039;
  return `<article class="project-row">
    <div class="project-art project-art-screenshot ${isMall ? 'enterprise-art' : 'arena-art'}">
      <button class="cover-button" type="button" data-project="${id}" data-view="${coverView}" aria-label="${escapeHTML(project.title)} ${coverAction}">
        <img class="project-cover project-cover-screenshot" src="${thumbnailSrc}" alt="${thumbnailAlt}" width="${thumbnailWidth}" height="${thumbnailHeight}" decoding="async">
      </button>
      <p class="cover-caption"><span>${c.coverLabel}</span></p>
    </div>
    <div class="project-copy">
      <div class="project-topline"><span class="project-type">${c.type}</span></div>
      <h2>${escapeHTML(project.title)}</h2>
      <div class="project-actions">
        <button type="button" data-project="${id}" data-view="notes">수행 내용 ↗</button>
      </div>
      <p class="project-period"><span>프로젝트 기간</span><strong>${c.period}</strong></p>
      <p class="project-subtitle">${c.subtitle}</p>
      <section class="project-technologies" aria-label="프로젝트 사용 기술">
        <h3>사용 기술</h3>
        <ul class="technology-list">${c.technologies.map(key => `<li><img src="/assets/tech/${key}.svg" alt="" aria-hidden="true" width="32" height="32" loading="lazy" decoding="async"><span>${technologyNames[key]}</span></li>`).join('')}</ul>
        <dl class="technology-areas"><div><dt>사용 도구</dt><dd>${c.tools.map(escapeHTML).join(' · ')}</dd></div></dl>
      </section>
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
    : c.components;
  return `<div class="build-scope-grid execution-cards">${cards.map((item,i)=>`<article class="build-scope-card">
    <span class="execution-card-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span>
    <h4>${cleanProjectText(item.title)}</h4>
    <strong>${cleanProjectText(item.tech)}</strong>
    <p>${cleanProjectText(item.body)}</p>
    ${Array.isArray(item.points)&&item.points.length ? `<ul class="execution-card-points">${item.points.map(line=>`<li>${cleanProjectText(line)}</li>`).join('')}</ul>`:''}
  </article>`).join('')}</div>`;
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
    <header><span>CASE ${String(i+1).padStart(2,'0')}${issue.kind==='collaboration'?' · 팀 협업':issue.kind==='design'?' · 설계 개선':''}</span><h4>${cleanProjectText(issue.title)}</h4></header>
    <dl><div><dt>상황</dt><dd>${cleanProjectText(issue.symptom)}</dd></div>
        <div><dt>${issue.kind==='collaboration'?'협업 과정':issue.kind==='design'?'설계 변경':'분석·조치'}</dt><dd>${cleanProjectText(issue.action)}</dd></div>
        <div><dt>${issue.kind==='collaboration'||issue.kind==='design'?'결과':'확인 결과'}</dt><dd>${cleanProjectText(issue.result)}</dd></div></dl>
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

function recordToolSummary(c) {
  const areas=c.techAreas.map(([label,value])=>`<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('');
  return `<section class="execution-tech" aria-label="사용 기술·도구">
    <dl class="technology-areas">${areas}<div><dt>사용 도구</dt><dd>${c.tools.map(escapeHTML).join(' · ')}</dd></div></dl>
  </section>`;
}
function notes(project) {
  const c=compact[project.id];
  return `<div class="execution-record">
    ${recordHeading('01','담당 역할','담당 범위와 팀 업무 분담',recordRoles(c))}
    ${recordHeading('02','사용 기술·도구','',recordToolSummary(c))}
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
  const count = () => null;
  document.querySelector('#dialog-content').innerHTML = `<article class="project-detail">
    <p class="kicker">${c.type} / ${c.period}</p>
    <h2 id="dialog-title">${escapeHTML(project.title)}</h2>
    <p class="detail-intro">${c.subtitle}</p>
    <div class="detail-nav" role="tablist" aria-label="프로젝트 상세 선택">
      ${detailViews.map(item => `<button id="tab-${item.id}" type="button" role="tab" aria-selected="${view === item.id}" aria-controls="detail-panel" tabindex="${view === item.id ? 0 : -1}" data-detail-view="${item.id}">${item.label}${count(item.id) === null ? '' : ` ${count(item.id)}`}</button>`).join('')}
    </div>
    <div id="detail-panel" role="tabpanel" aria-labelledby="tab-${view}" tabindex="0">${view === 'design' ? designView(project) : view === 'build' ? buildView(project) : view === 'issues' ? issueView(project) : notes(project)}</div>
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


// Evidence is shown in the relevant context, never in a separate photo-only tab.
// Only images registered in content.json are linked; unknown names cannot create broken images.
function evidenceFor(project, names = [], kind = 'any') {
  const all = [...(project.images || []), ...(project.topologies || [])];
  const unique = [...new Set(names)];
  const images = unique.map(name => all.find(item =>
    item.url.split('/').pop() === name &&
    (kind === 'any' || (kind === 'design' ? item.kind !== 'implementation' && (project.images || []).indexOf(item) === -1 : kind === 'implementation' ? item.kind === 'implementation' : true))
  )).filter(Boolean);
  return images.length ? `<div class="gallery record-evidence">${images.map(item => {
    const isNetwork = item.kind === 'implementation';
    const figure = imageFigure(item, kind === 'design' || isNetwork);
    return isNetwork ? figure.replace('class="topology-figure', 'class="topology-figure network-evidence') : figure;
  }).join('')}</div>` : '';
}
function recordFields(fields) {
  return `<dl class="process-fields">${fields.filter(x=>x[1]).map(([label,value])=>
    `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl>`;
}
function workflowFor(items) {
  if(!Array.isArray(items)||!items.length) return '';
  return `<div class="flow-block"><p class="flow-label">요청·처리 흐름</p>
    <ol class="workflow-path">${items.map((step,i)=>
      `<li><span>${String(i+1).padStart(2,'0')}</span>${escapeHTML(step)}</li>`).join('')}</ol></div>`;
}
function designView(project) {
  const info=projectRecords[project.id];
  return `<div class="project-work">
    <div class="work-intro"><h3>시스템 설계</h3>
      <p>네트워크와 서버의 배치, 영역 간 연결 및 보안 경계를 최종 설계도와 함께 정리했습니다. </p>
    </div>
    <div class="work-sections">${info.design.map((entry,i)=>
      `<details class="work-case" ${i===0?'open':''}>
        <summary><span class="work-number">${String(i+1).padStart(2,'0')}</span>
          <span class="work-case-name"><strong>${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.architecture || entry.why)}</small></span>
          <span class="expand-sign" aria-hidden="true"></span>
        </summary>
        <div class="work-case-body">
          ${recordFields([['설계 목적',entry.why],['설계 구성',entry.architecture || entry.build],...(entry.decision?[['판단 기준',entry.decision]]:[])])}
          ${evidenceFor(project,entry.images,'design')}
        </div>
      </details>`).join('')}</div>
  </div>`;
}
function buildView(project) {
  const info=projectRecords[project.id];
  return `<div class="project-work">
    <div class="work-intro"><h3>실제 구현 및 검증</h3>
      <p>실제 구축한 네트워크·서버와 서비스 동작, 통신 검증 결과를 정리했습니다.</p>
    </div>
    <div class="work-sections">${(info.implementations || []).map((entry,i)=>
      `<details class="work-case" ${i===0?'open':''}>
        <summary><span class="work-number">${String(i+1).padStart(2,'0')}</span>
          <span class="work-case-name"><strong>${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.summary || entry.build)}</small></span>
          <span class="expand-sign" aria-hidden="true"></span>
        </summary>
        <div class="work-case-body">
          ${recordFields([['구현 내용',entry.build]])}
          ${workflowFor(entry.flow)}
          ${entry.result ? `<div class="work-result"><strong>동작·통신 확인</strong><p>${escapeHTML(entry.result)}</p></div>` : ''}
          ${evidenceFor(project,entry.evidence)}
        </div>
      </details>`).join('')}</div>
  </div>`;
}
function issueView(project) {
  const info=projectRecords[project.id];
  return `<div class="project-work">
    <div class="work-intro"><h3>문제 및 해결</h3>
      <p>설계 개선과 장애 대응 과정, 원인 분석 및 조치 결과를 정리했습니다.</p>
    </div>
    <div class="work-sections">${info.issues.map((entry,i)=>
      `<details class="work-case" ${i===0?'open':''}>
        <summary><span class="work-number">${String(i+1).padStart(2,'0')}</span>
          <span class="work-case-name">
            <small class="work-tag">${entry.stage==='design'?'설계 개선':'장애 대응'}</small>
            <strong>${escapeHTML(entry.title)}</strong>
            <small>${escapeHTML(entry.symptom)}</small>
          </span><span class="expand-sign" aria-hidden="true"></span>
        </summary>
        <div class="work-case-body">
          ${recordFields([['문제 상황',entry.symptom],['원인 분석',entry.analysis],['해결 방법',entry.action],[entry.pending?'조치 결과':'검증 결과',entry.result]])}
          ${evidenceFor(project,entry.evidence)}
        </div>
      </details>`).join('')}</div>
  </div>`;
}
