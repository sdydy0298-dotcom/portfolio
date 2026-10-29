'use strict';
const projectRecords = {
  "smdc": {
    "design": [
      {
        "title": "전체 기업망과 외부 고객망",
        "why": "사내 업무 통신과 외부 고객의 쇼핑몰 접속을 한 환경에서 연결하고, 거점과 서비스의 경계를 구분했습니다.",
        "build": "본사·지사에 UTM과 업무망을 구성하고 Site-to-Site VPN으로 연결했습니다. IDC와 FTTH 고객망은 ISP/IX로 연결하고 Home Router의 WAN·LAN DHCP와 NAT/PAT를 구성했습니다.",
        "images": [
          "topology.png",
          "topology-head-office.png",
          "topology-branch-office.png",
          "topology-ftth.png"
        ],
        "architecture": "본사·지사 업무망, 쇼핑몰 IDC와 외부 고객망의 연결 경계를 정의했습니다. 본사와 지사는 VPN으로 연결하고 외부 고객은 WAN을 통해 서비스 진입 경계에 접근하도록 설계했습니다."
      },
      {
        "title": "IDC 네트워크와 서비스 배치",
        "why": "WEB·WAS·DB 서비스 그룹의 네트워크를 구분하고 서버 증설을 고려했습니다.",
        "build": "Spine 2대와 Border·FR·WEB·APP·DB·INF·MGMT Leaf를 구성했습니다. 역할별 Leaf에 서버망의 게이트웨이를 배치하고 OSPF로 장비 간 경로를 설정했습니다.",
        "images": [
          "topology-idc.png"
        ],
        "decision": "VLAN과 Leaf 역할을 기준으로 서버망을 구분하고 외부에서 내부 DB에 직접 접근하지 않도록 경로를 분리했습니다.",
        "result": "기존 구조를 Spine–Leaf로 재구축하고 역할별 서버망의 통신 경로를 구성했습니다.",
        "architecture": "Spine 두 대와 역할별 Leaf, OSPF 기반 언더레이 라우팅, 서버별 VLAN·게이트웨이 및 서비스·DB 경계를 설계했습니다."
      },
      {
        "title": "보안 경계와 서비스 이중화",
        "why": "서비스 진입 구간과 DB 접근 경계를 분리하고, SLB 한 대의 장애에 대비하도록 구성했습니다.",
        "build": "FW·IPS와 IDS 관측 구간을 배치하고 DB-FW1으로 DB 경계를 분리했습니다. SLB1/2에 HAProxy·Keepalived와 Front·Backend VIP를 구성했습니다.",
        "images": [],
        "result": "SLB1의 Keepalived를 중지했을 때 SLB2가 Front·Backend VIP를 넘겨받는 것을 확인했습니다.",
        "architecture": "외부 진입 FW와 IPS, DB 구간 방화벽, SLB1·SLB2의 Front/Backend VIP로 서비스 진입 및 장애 대응 구간을 설계했습니다."
      },
      {
        "title": "공통 인프라와 운영망",
        "why": "이름 조회·메일·시간 동기화·로그 수집을 공통 서비스로 제공하고 관리망을 분리했습니다.",
        "build": "BIND9 DNS·캐시 DNS, Postfix·Dovecot MX1, Chrony NTP1, rsyslog LOG1을 구성했습니다. 관리망에는 Jump Server를 배치했으며 경유 접속·ACL은 추가 검증 범위입니다.",
        "images": [],
        "result": "Thunderbird에서 MX1 수신을 확인하고 Chrony 시간 동기화 및 rsyslog 중앙 로그 환경을 구성했습니다.",
        "architecture": "INF와 MGMT 영역을 분리해 DNS·메일·NTP·중앙 로그 및 Jump Server를 배치했습니다."
      }
    ],
    "scenarios": [
      {
        "category": "normal",
        "title": "고객망에서 쇼핑몰 접속·로그인",
        "flow": [
          "가정 PC",
          "Home Router",
          "ISP · IX",
          "IDC 진입",
          "SLB → WEB → WAS → DB"
        ],
        "purpose": "IDC 내부 접속에 더해 외부 고객 위치에서 서비스 이용 흐름을 확인했습니다.",
        "procedure": "PC의 DHCP 주소 확인 → 쇼핑몰 접속 → 회원가입·로그인 화면 확인 → 로그인 후 사용자 표시 확인",
        "result": "가정 PC의 주소 할당과 StarMall 접속, 로그인 성공 후 사용자명 표시를 확인했습니다.",
        "evidence": [
          "homepc-dhcp.png",
          "homepc-web.png",
          "homepc-join.png",
          "homepc-login.png",
          "homepc-login-success.png"
        ],
        "pending": false
      },
      {
        "category": "normal",
        "title": "외부 도메인 조회와 쇼핑몰 서비스 응답",
        "flow": [
          "가정 PC의 도메인 조회",
          "공개 IP 확인",
          "방화벽·SLB",
          "쇼핑몰 웹 응답"
        ],
        "purpose": "외부 고객이 내부 VIP가 아닌 공개 서비스 주소로 정상 접속하는지 확인했습니다.",
        "procedure": "외부 PC에서 nslookup starmall.com 실행 → 공개 IP 확인 → 브라우저 접속과 HTTP 응답 확인",
        "result": "113.61.104.254가 반환되고 쇼핑몰 HTTP 200 응답과 화면 출력을 확인했습니다.",
        "evidence": [],
        "pending": false
      },
      {
        "category": "normal",
        "title": "MX1 메일 전달·수신",
        "flow": [
          "MX1 Postfix",
          "로컬 메일 전달",
          "Dovecot IMAP",
          "Thunderbird"
        ],
        "purpose": "메일 서버와 사용자 클라이언트 사이의 수신 동작을 확인했습니다.",
        "procedure": "MX1의 mailuser1→mailuser2 메일 전달 → Thunderbird에서 IMAP 수신 확인",
        "result": "Thunderbird에서 “MX1 test” 메일과 본문을 확인했습니다.",
        "evidence": [
          "HomePc_MX.png"
        ],
        "pending": false
      },
      {
        "category": "security",
        "title": "서비스 진입·DB 접근 경계",
        "flow": [
          "외부 요청",
          "FW · IPS",
          "서비스망",
          "DB-FW1",
          "DB망"
        ],
        "purpose": "서비스 접근 경계와 DB망 분리가 의도대로 동작하는지 확인할 시험 항목입니다.",
        "procedure": "허용 서비스 접속 → 비허용 출발지·포트 요청 → 방화벽 로그 비교 → Suricata 탐지·차단 기록 확인",
        "result": "FW/UTM·IPS/IDS·DB 경계 구성은 완료했습니다. 허용·차단 시험과 탐지 로그를 연결한 검증 기록은 추가 정리 대상입니다.",
        "evidence": [
          "gns_idc_topology.png"
        ],
        "pending": true
      },
      {
        "category": "security",
        "title": "관리망과 Jump Server 접근 통제",
        "flow": [
          "관리자 PC",
          "관리망",
          "Jump Server",
          "대상 서버"
        ],
        "purpose": "관리 접속이 지정 경로로 제한되는지 확인할 시험 항목입니다.",
        "procedure": "Jump Server 경유 SSH/SFTP → 비관리망 직접 접근 시도 → 허용·거부 로그 확인",
        "result": "Jump Server 배치 완료. 경유 접속과 ACL 기반 접근 통제는 검증 예정입니다.",
        "evidence": [
          "gns_idc_topology.png"
        ],
        "pending": true
      },
      {
        "category": "operations",
        "title": "SLB 장애 시 Front·Backend VIP 인계",
        "flow": [
          "SLB1 정상",
          "Keepalived 중지",
          "SLB2 VIP 인계",
          "전환 상태 확인"
        ],
        "purpose": "주 SLB 장애 시 대기 장비가 VIP를 인계하는지 확인했습니다.",
        "procedure": "감시 스크립트 정상 동작 확인 → SLB1 Keepalived 중지 → SLB2 Front·Backend VIP 상태 확인",
        "result": "SLB2가 Front·Backend VIP를 인계받는 것을 확인했습니다.",
        "evidence": [
          "gns_idc_topology.png"
        ],
        "pending": false
      },
      {
        "category": "operations",
        "title": "DB 복제와 운영 로그 확인",
        "flow": [
          "DB1 Primary",
          "DB2 Replica",
          "복제 상태·회원 데이터 확인"
        ],
        "purpose": "복제 상태를 확인하고 서버 이벤트를 공통 시각으로 확인할 환경을 구성했습니다.",
        "procedure": "DB1/DB2 회원 데이터 비교 및 복제 스레드 확인. NTP1 시각 동기화와 LOG1 중앙 수집 구성 확인",
        "result": "회원 데이터 일치와 복제 스레드 정상 동작을 확인했습니다. Chrony·rsyslog로 시간 동기화·중앙 로그 환경을 구성했습니다.",
        "evidence": [],
        "pending": false
      }
    ],
    "issues": [
      {
        "stage": "design",
        "title": "3-Tier에서 Spine–Leaf로 구조 개선",
        "goal": "데이터센터의 서버 간 통신과 향후 역할별 서버 확장을 고려한 구조를 구성하려 했습니다.",
        "symptom": "초기 3-Tier 구축 이후 서버 간 통신과 증설을 고려해 네트워크 구조를 재검토했습니다.",
        "analysis": "기존 3-Tier 구조를 기반으로 서버 증설과 역할별 네트워크 확장 방식을 검토했습니다.",
        "action": "Spine 2대와 역할별 Leaf로 구성하고 OSPF 기반으로 경로를 재설계·구축했습니다.",
        "result": "Spine 2대와 역할별 Leaf를 구성해 Spine–Leaf 네트워크로 전환했습니다.",
        "evidence": []
      },
      {
        "stage": "implementation",
        "title": "SELinux로 인한 Keepalived 감시 스크립트 실행 실패",
        "goal": "HAProxy 상태를 감시하고 SLB 장애 시 대기 장비가 Front·Backend VIP를 넘겨받게 구성했습니다.",
        "symptom": "HAProxy는 정상 실행 중인데 Keepalived 감시 스크립트에서 실행 오류(코드 126)가 발생해 FAULT 상태에 진입했습니다.",
        "analysis": "서비스 상태와 Keepalived 로그를 비교했습니다. SELinux 보안 정책이 감시 스크립트의 systemctl 명령 실행을 차단하고 있음을 확인했습니다.",
        "action": "SELinux를 끄지 않고 HAProxy가 실제 실행 중인지 직접 확인하는 방식으로 감시 스크립트를 변경했습니다.",
        "result": "수정 후 감시 기능이 정상 동작했습니다. SLB1의 Keepalived를 중지하자 SLB2가 Front·Backend VIP를 넘겨받았습니다.",
        "evidence": []
      },
      {
        "stage": "implementation",
        "title": "외부 고객 접속 시 내부 IP가 반환된 DNS 문제",
        "goal": "IDC 내부 서비스와 외부 고객망에서 동일한 쇼핑몰 도메인으로 정상 접속할 수 있도록 구성했습니다.",
        "symptom": "IDC 내부에서는 쇼핑몰 접속이 정상이었지만 외부 고객 PC에서 도메인을 조회하면 내부 SLB 주소가 반환되어 쇼핑몰에 접속할 수 없었습니다.",
        "analysis": "외부 고객의 nslookup 결과 starmall.com이 내부 VIP 192.168.30.18로 조회됐습니다. 외부에서는 FW 공개 주소 113.61.104.254를 사용해야 했습니다.",
        "action": "BIND9 View를 적용해 내부에는 SLB VIP, 외부 고객에는 공개 IP를 반환하도록 DNS 응답을 분리했습니다.",
        "result": "외부 PC에서 공개 IP가 조회되는 것을 확인했습니다. 이후 HTTP 200 응답과 브라우저의 쇼핑몰 화면 출력을 확인했습니다.",
        "evidence": []
      },
      {
        "stage": "planned",
        "pending": true,
        "title": "DB 이중화 및 장애 전환",
        "symptom": "MariaDB 서버를 구성했으나, DB 장애 시 서비스를 계속 제공하기 위한 이중화 및 자동 장애 전환까지 구현하지 못했습니다.",
        "analysis": "데이터 복제 상태 관리와 장애 전환 시 데이터 일관성, 장애 복구 절차를 함께 고려해야 해 구현 범위를 확장하지 못했습니다.",
        "action": "향후 Primary–Replica 복제 구성부터 검증하고, 장애 감지·전환·복구 절차를 단계적으로 구현할 계획입니다.",
        "result": "향후 개선 과제로 남겨두었습니다.",
        "evidence": []
      }
    ],
    "implementations": [
      {
        "title": "IDC 네트워크 및 서버 구성",
        "summary": "Spine–Leaf · OSPF · WEB–WAS–DB",
        "build": "Spine 2대와 역할별 Leaf를 연결해 OSPF로 경로를 구성했습니다. WEB·WAS·DB·INF·MGMT 영역을 구분하고 Linux 서버를 서비스 역할에 맞게 배치했습니다.",
        "result": "GNS3에서 IDC의 Spine–Leaf 연결과 WEB·WAS·DB 등 역할별 네트워크 구성을 확인했습니다.",
        "evidence": [
          "gns_all_topology.png",
          "gns_idc_topology.png"
        ]
      },
      {
        "title": "쇼핑몰 서비스 및 고객 접속",
        "summary": "WEB–WAS–DB 연동 · 외부 고객 접근 · 로그인",
        "build": "WEB1~3에 Nginx, WAS1~2에 Tomcat, DB1·DB2에 MariaDB를 구성했습니다. 외부 고객 PC가 DHCP로 주소를 받아 쇼핑몰에 접속하고 회원가입·로그인을 진행하도록 연동했습니다.",
        "flow": [
          "가정 고객 PC",
          "Home Router·WAN",
          "IDC FW·SLB",
          "WEB(Nginx)",
          "WAS(Tomcat)",
          "DB(MariaDB)"
        ],
        "result": "고객 PC의 IP 할당, 쇼핑몰 메인 화면, 회원가입·로그인 후 사용자명이 표시되는 것을 확인했습니다.",
        "evidence": [
          "gns_home_topology.png",
          "homepc-dhcp.png",
          "homepc-web.png",
          "homepc-join.png",
          "homepc-login-success.png"
        ]
      },
      {
        "title": "본사·지사 연결 및 IPsec VPN",
        "summary": "Site-to-Site VPN · 거점 네트워크 · SSH",
        "build": "본사·지사 업무망을 구분하고 Sophos UTM 기반 Site-to-Site IPsec VPN을 구성했습니다. 지사 클라이언트에서 본사 개발 서버에 접근하는 경로를 점검했습니다.",
        "flow": [
          "지사 PC",
          "지사 UTM",
          "IPsec VPN 터널",
          "본사 UTM",
          "본사 개발 서버"
        ],
        "result": "IPsec SA 연결 상태를 확인하고 지사에서 본사 개발 서버로 SSH 접속에 성공했습니다.",
        "evidence": [
          "gns_ho_topology.png",
          "gns_bo_topology.png",
          "vpn-ipsec-connection.png",
          "vpn-ipsec-established.png",
          "vpn-branch-source-ip.png"
        ]
      },
      {
        "title": "방화벽·NAT 및 관리 접근",
        "summary": "pfSense WAN 정책 · Jump Server · 접근 통제",
        "build": "pfSense에서 외부 HTTP·DNS·메일·관리 접근 정책과 NAT을 구성했습니다. 관리 접속은 Jump Server를 사용하도록 구간을 분리하고 허용·비허용 접근을 비교했습니다.",
        "flow": [
          "외부·관리 단말",
          "FW 정책 검사",
          "허용 시 NAT·Jump Server",
          "대상 서버"
        ],
        "result": "WAN 방화벽 규칙과 NAT을 설정하고 Jump Server SSH 접속 성공 및 다른 출발지의 연결 시간 초과를 확인했습니다.",
        "evidence": [
          "fw-wan-rules.png",
          "fw-nat.png",
          "jump-ssh-allowed.png",
          "jump-ssh-denied.png",
          "jump-homepc-blocked.png"
        ]
      },
      {
        "title": "로드밸런싱 및 VIP 이중화",
        "summary": "HAProxy · Round Robin · Keepalived · Front/Backend VIP",
        "build": "HAProxy에 WEB1~3을 Round Robin 방식으로 구성하고, Keepalived에서 Front·Backend VRRP 인스턴스와 VIP를 설정했습니다.",
        "flow": [
          "고객 요청",
          "SLB Front VIP",
          "HAProxy Round Robin",
          "WEB1·WEB2·WEB3"
        ],
        "result": "HAProxy 백엔드와 Keepalived VRRP 설정, SLB1의 Front·Backend VIP 할당 상태를 확인했습니다.",
        "evidence": [
          "slb_haproxy.png",
          "slb_keepalived.png",
          "slb_vip.png"
        ]
      },
      {
        "title": "DNS·메일·시간·로그 운영 인프라",
        "summary": "BIND9 · Postfix/Dovecot · Chrony · rsyslog",
        "build": "NS1에 BIND9 DNS, MX1에 Postfix·Dovecot, NTP1에 Chrony, LOG1에 rsyslog를 구성했습니다. rsyslog는 IDC 서버 로그를 수집하고 호스트별 파일로 분리하도록 설정했습니다.",
        "result": "Thunderbird에서 테스트 메일 수신을 확인하고, LOG1에 서버별 로그 파일이 생성된 것을 확인했습니다.",
        "evidence": [
          "HomePc_MX.png",
          "log_cfg.png",
          "srv_logs.png"
        ]
      }
    ]
  },
  "aleph-arena": {
    "design": [
      {
        "title": "팀 전체 거점과 한국 IDC 담당 범위",
        "why": "5개 거점이 함께 통신하도록 공통 기준을 맞추면서 개인 담당 범위를 구분했습니다.",
        "build": "본사·개발/QA·한국 IDC·일본 지사·일본 IDC를 팀원이 나누어 구축했습니다. 공통 IP·VLAN·WAN 기준을 공유하고 UDP Tunnel로 연결했습니다. 본인 담당은 한국 IDC와 웹·런처·게임 개발입니다.",
        "images": [
          "topology.png"
        ],
        "architecture": "한국·일본의 본사·지사·IDC와 개발/QA 거점 간 연결을 설계하고, 한국 IDC의 서비스 제공 역할과 공통 네트워크 기준을 정했습니다."
      },
      {
        "title": "한국 IDC의 역할별 망 분리",
        "why": "서비스 서버·DB·인프라·관리 단말의 역할을 구분하고 각 망 사이에 라우팅 경계를 구성했습니다.",
        "build": "IDC-Core1–Dist1/Dist2–Access를 연결했습니다. Acc1은 WEB/WAS/GAME, Acc2는 DB, Acc3은 NS1/CNS1, Acc4는 관리자 PC를 연결합니다. 초기 설계와 실제 주소·장비 배치에는 차이가 있어 실제 GNS3를 기준으로 설명합니다.",
        "images": [
          "idc-design-original.png"
        ],
        "result": "한국 IDC의 네트워크와 서비스 서버를 연결하고 다른 팀 거점과의 통신 및 IDC 서비스 접근을 확인했습니다.",
        "architecture": "IDC-Core–Dist–Access의 계층 구조와 서버 역할별 VLAN을 설계했습니다. Acc1은 WEB·WAS·GAME, Acc2는 DB, Acc3은 NS·CNS, Acc4는 관리망 담당으로 구분했습니다."
      },
      {
        "title": "웹·런처·멀티플레이 서비스",
        "why": "웹 서비스와 게임 실행·접속까지 직접 구현해 구축한 IDC에서 서비스가 동작하는지 확인했습니다.",
        "build": "Nginx–Java WAS–MariaDB를 연동하고 C#/.NET 런처의 버전 조회·게임 ZIP 다운로드·실행을 구현했습니다. Godot 클라이언트와 Linux Dedicated Server로 2인 게임 흐름을 구성했습니다.",
        "images": [],
        "decision": "HTTP 기반 웹·API 요청과 UDP 기반 실시간 게임 상태 전송을 역할별 서버로 분리했습니다.",
        "result": "Nginx–Tomcat API 응답과 Linux Dedicated Server의 두 플레이어 접속·준비·경기 시작 단계까지 확인했습니다.",
        "architecture": "Linux 서버의 WEB·WAS·DB와 Godot Dedicated Server를 분리하고, Windows 런처를 통해 게임 파일을 받아 실행하는 이용 경로를 설계했습니다."
      }
    ],
    "scenarios": [
      {
        "category": "normal",
        "title": "웹사이트와 API 요청",
        "flow": [
          "사용자",
          "한국 IDC",
          "Nginx /api/",
          "Tomcat",
          "MariaDB"
        ],
        "purpose": "한국 IDC에 배포한 웹과 WAS의 연동을 확인했습니다.",
        "procedure": "웹사이트 접속 → 로그인·회원가입 화면 확인 → IPv4 서비스 주소의 /api/ 응답 확인",
        "result": "게임 웹사이트 접속과 Tomcat HTTP 200 응답을 확인했습니다.",
        "evidence": [
          "web-main-v2.jpg",
          "web-login-v2.jpg",
          "web-signup-v2.jpg"
        ],
        "pending": false
      },
      {
        "category": "normal",
        "title": "런처 실행과 온라인 멀티플레이",
        "flow": [
          "버전 조회·다운로드",
          "게임 실행",
          "방 생성·참가",
          "준비 완료",
          "서버에서 게임 시작"
        ],
        "purpose": "Windows 클라이언트와 Linux 게임 서버의 연동을 확인했습니다.",
        "procedure": "게임 ZIP 다운로드·압축 해제·실행 흐름 구성 → 두 플레이어의 방 참가 → 준비 → 게임 시작",
        "result": "런처 빌드·배포와 실행 흐름을 구성하고 두 플레이어의 방 참가·준비·경기 시작까지 확인했습니다. 이후 게임 멈춤 문제는 별도 사례로 기록했습니다.",
        "evidence": [
          "game-main-v2.jpg",
          "game-play-v2.jpg"
        ],
        "pending": false
      },
      {
        "category": "normal",
        "title": "거점 간 한국 IDC 서비스 접근",
        "flow": [
          "거점 사용자망",
          "거점 게이트웨이",
          "WAN · UDP Tunnel",
          "IDC-Core1",
          "대상 서비스망"
        ],
        "purpose": "팀별로 구축한 거점과 한국 IDC의 연결을 확인했습니다.",
        "procedure": "공통 IP·VLAN·WAN 기준 확인 → 터널 연결 → 거점 간 경로와 IDC 서비스 접근 점검",
        "result": "팀 거점 연결 후 거점 간 통신과 한국 IDC 서비스 접근을 함께 확인했습니다.",
        "evidence": [
          "topology.png",
          "idc-gns-original.png"
        ],
        "pending": false
      },
      {
        "category": "security",
        "title": "역할별 망 분리와 접근 통제",
        "flow": [
          "서비스망",
          "Distribution 라우팅",
          "DB · 인프라 · 관리망"
        ],
        "purpose": "VLAN 분리와 실제 접근 통제를 구분해 검증할 항목입니다.",
        "procedure": "출발지·목적지·포트별 허용 기준 정리 → 허용 요청·비허용 요청 비교 → 정책·로그 확인",
        "result": "역할별 망 분리 구성은 확인했습니다. ACL·방화벽 기반 차단 시험 기록은 현재 공개 자료에 없어 검증 완료로 포함하지 않습니다.",
        "evidence": [
          "idc-gns-original.png"
        ],
        "pending": true
      },
      {
        "category": "operations",
        "title": "서비스 중지·재시작 후 복구 시험",
        "flow": [
          "정상 접속",
          "서비스 중지",
          "재시작",
          "웹 · 게임 재접속"
        ],
        "purpose": "운영 중 서비스 중단과 재기동 후 상태를 확인할 추가 시험 항목입니다.",
        "procedure": "정상 상태 기록 → 대상 서비스 중지 → 실패 증상 확인 → 재시작 → 웹/API와 게임 재접속 확인",
        "result": "현재 자료는 정상 접속과 멀티플레이 검증 중심입니다. 중지·재시작 복구 시험 기록은 추가 검증 대상입니다.",
        "evidence": [],
        "pending": true
      }
    ],
    "issues": [
      {
        "stage": "design",
        "title": "5개 거점 간 네트워크 기준 조율",
        "goal": "팀원이 각각 구축한 5개 거점을 연결하고 한국 IDC 서비스를 제공하려 했습니다.",
        "symptom": "거점별 구축을 통합하려면 IP·VLAN·WAN 연결 기준과 개인 담당 구간을 맞춰야 했습니다.",
        "analysis": "팀 공통 연결 기준과 한국 IDC의 네트워크·서버 배치를 함께 점검했습니다.",
        "action": "공통 기준을 공유하고 한국 IDC를 구축한 뒤 UDP Tunnel로 거점을 연결하며 통신 경로와 서비스 접근을 함께 점검했습니다.",
        "result": "공통 IP·VLAN·WAN 기준에 따라 한국 IDC와 다른 거점의 통신 경로를 연결했습니다.",
        "evidence": []
      },
      {
        "stage": "implementation",
        "title": "웹사이트 배포 후 Nginx 403 오류 해결",
        "goal": "SELinux를 유지한 Linux 서버에서 게임 웹사이트를 제공하려 했습니다.",
        "symptom": "웹사이트 파일이 서버에 있고 일반 파일 권한에도 문제가 없었지만 웹 브라우저에서 403 Forbidden 오류가 발생했습니다.",
        "analysis": "Nginx 설정과 파일 권한을 점검한 뒤 SELinux 컨텍스트를 확인했습니다. 웹 파일에 임시 파일용 보안 타입 user_tmp_t가 적용돼 있었습니다.",
        "action": "웹 콘텐츠에 맞는 httpd_sys_content_t 보안 타입을 설정하고 restorecon으로 적용했습니다. SELinux는 비활성화하지 않았습니다.",
        "result": "403 오류가 사라지고 ALEPH Arena 메인 페이지가 정상 표시되는 것을 확인했습니다.",
        "evidence": []
      },
      {
        "stage": "implementation",
        "title": "게임 시작 직후 양쪽 클라이언트 멈춤과 MTU 초과",
        "goal": "Linux 게임 서버에서 두 클라이언트의 게임 상태를 안정적으로 동기화하도록 구성했습니다.",
        "symptom": "두 클라이언트가 게임 서버에 접속해 방 참가·READY까지 마쳤으나 경기 시작 후 3·2·1 카운트다운이 끝나자 양쪽 게임이 멈췄고 이후 연결 해제 기록도 나타났습니다.",
        "analysis": "게임 서버 로그에서 상태 동기화 데이터 4,040바이트가 ENet MTU 1,392바이트를 초과한다는 경고를 확인했습니다.",
        "action": "게임 상태 동기화 코드를 수정해 전송 데이터를 줄이고 패킷 크기를 검사해 기준을 초과한 데이터의 전송을 제한했습니다.",
        "result": "게임 상태 전송량을 줄이고 패킷 크기 검사 및 초과 전송 제한 로직을 적용했습니다.",
        "pending": true,
        "evidence": []
      }
    ],
    "implementations": [
      {
        "title": "한국 IDC 네트워크 및 서버 구성",
        "summary": "GNS3 실제 토폴로지 · Core·Dist·Access · VLAN",
        "build": "한국 IDC의 IDC-Core1, IDC-Dist1/2, Access 스위치를 구성하고 WEB·WAS·게임·DB·DNS와 관리망을 역할별 네트워크에 연결했습니다.",
        "result": "실제 GNS3 구성 화면에서 서버 배치 및 장비 연결을 확인했습니다.",
        "evidence": [
          "idc-gns-original.png"
        ]
      },
      {
        "title": "게임 웹사이트와 API 연동",
        "summary": "Nginx · Java WAS · MariaDB · 웹 로그인",
        "build": "웹 서버에 게임 소개·회원가입·로그인 페이지를 배포하고 Nginx /api/ 요청을 Tomcat WAS로 전달하도록 연동했습니다.",
        "flow": [
          "사용자 웹 브라우저",
          "Nginx WEB",
          "/api/ 요청",
          "Tomcat WAS",
          "MariaDB"
        ],
        "result": "게임 웹사이트의 메인·로그인·회원가입 화면과 WAS API의 HTTP 200 응답을 확인했습니다.",
        "evidence": [
          "web-main-v2.jpg",
          "web-login-v2.jpg",
          "web-signup-v2.jpg"
        ]
      },
      {
        "title": "Windows 런처·Godot 멀티플레이",
        "summary": "C#/.NET 런처 · Dedicated Server · 두 플레이어",
        "build": "C#/.NET 런처와 Godot 클라이언트, Linux Dedicated Server를 구성했습니다. 서버에서 방 생성·참가·READY·게임 시작을 처리하도록 제작했습니다.",
        "flow": [
          "런처 설치·실행",
          "게임 파일 다운로드",
          "게임 서버 접속",
          "방 생성·참가",
          "READY",
          "MATCH START"
        ],
        "result": "두 플레이어의 방 생성·참가, READY 및 게임 시작 로그를 확인했습니다.",
        "evidence": [
          "game-main-v2.jpg",
          "game-play-v2.jpg"
        ]
      },
      {
        "title": "거점 간 연결 및 서비스 접근",
        "summary": "5개 거점 연결 · 한국 IDC 서비스 접근",
        "build": "한국·일본에 분산된 팀별 거점의 공통 IP·VLAN·WAN 연결 기준을 맞추고 한국 IDC 네트워크를 다른 거점과 연결했습니다.",
        "flow": [
          "거점별 접속망",
          "WAN·UDP 터널",
          "한국 IDC Core",
          "서버 VLAN"
        ],
        "result": "팀 거점 간 통신 및 한국 IDC 서비스 접근을 확인했습니다.",
        "evidence": []
      }
    ]
  }
};
