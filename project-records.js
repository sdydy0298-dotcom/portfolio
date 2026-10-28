'use strict';
const projectRecords = {
  "smdc": {
    "design": [
      {
        "title": "전체 기업망과 외부 고객망",
        "why": "사내 업무 통신과 외부 고객의 쇼핑몰 접속을 한 환경에서 연결하고, 거점과 서비스의 경계를 구분했습니다.",
        "build": "본사·지사에 UTM과 업무망을 구성하고 Site-to-Site VPN으로 연결했습니다. IDC와 FTTH 고객망은 ISP/IX로 연결하고 Home Router의 WAN·LAN DHCP와 NAT/PAT를 구성했습니다.",
        "images": [
          "gns_all_topology.png",
          "topology-head-office.png",
          "gns_ho_topology.png",
          "topology-branch-office.png",
          "gns_bo_topology.png",
          "topology-ftth.png",
          "gns_home_topology.png"
        ]
      },
      {
        "title": "IDC 네트워크와 서비스 배치",
        "why": "서버 간 통신과 향후 확장을 고려해 3-Tier에서 Spine–Leaf로 변경하고 WEB·APP·DB·INF·MGMT 역할별로 망을 나눴습니다.",
        "build": "Spine 2대와 역할별 Leaf를 연결하고 OSPF로 경로를 구성했습니다. WEB1~3의 Nginx와 WAS1~2의 Tomcat을 연동하고 MariaDB DB1→DB2 복제를 구성했습니다.",
        "images": [
          "topology.png",
          "topology-idc.png",
          "gns_idc_topology.png"
        ]
      },
      {
        "title": "보안 경계와 서비스 이중화",
        "why": "서비스 진입 구간과 DB 접근 경계를 분리하고, SLB 한 대의 장애에 대비하도록 구성했습니다.",
        "build": "FW·IPS와 IDS 관측 구간을 배치하고 DB-FW1으로 DB 경계를 분리했습니다. SLB1/2에 HAProxy·Keepalived와 Front·Backend VIP를 구성했습니다.",
        "images": [
          "gns_idc_topology.png"
        ]
      },
      {
        "title": "공통 인프라와 운영망",
        "why": "이름 조회·메일·시간 동기화·로그 수집을 공통 서비스로 제공하고 관리망을 분리했습니다.",
        "build": "BIND9 DNS·캐시 DNS, Postfix·Dovecot MX1, Chrony NTP1, rsyslog LOG1을 구성했습니다. 관리망에는 Jump Server를 배치했으며 경유 접속·ACL은 추가 검증 범위입니다.",
        "images": [
          "gns_idc_topology.png"
        ]
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
        "pending": false,
        "note": "요청 처리 흐름을 요약한 그림입니다. 내부 전달 경로는 OSPF·부하분산 상태에 따라 달라집니다."
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
        "pending": false,
        "note": "검증 범위는 서버의 로컬 메일 전달과 IMAP 수신입니다. 외부 인터넷 메일 송수신·SMTP 587 클라이언트 발송은 포함하지 않습니다."
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
        "pending": true,
        "note": ""
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
        "pending": true,
        "note": ""
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
        "pending": false,
        "note": "VIP 인계 확인 범위입니다. 전환 중 사용자 요청 성공률·중단 시간과 복구 후 재인계는 별도 측정이 필요합니다."
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
        "pending": false,
        "note": "DB 자동 장애 전환·Replica 자동 승격은 미구현입니다. DB 복제를 복구 성공으로 표시하지 않습니다."
      }
    ],
    "issues": [
      {
        "stage": "design",
        "title": "3-Tier에서 Spine–Leaf로 구조 개선",
        "goal": "데이터센터의 서버 간 통신과 향후 역할별 서버 확장을 고려한 구조를 구성하려 했습니다.",
        "symptom": "초기 3-Tier 구축 이후 서버 간 통신과 증설을 고려해 네트워크 구조를 재검토했습니다.",
        "analysis": "기존 구조와 역할별 서버 배치를 바탕으로 Spine 2대와 Leaf 중심의 연결 구조로 재설계했습니다.",
        "action": "역할별 Leaf와 OSPF 경로를 구성하고 기존 서버를 새 구조에 배치했습니다.",
        "result": "Spine–Leaf 구조로 재구축했습니다. 처리량·지연 개선은 별도로 측정하지 않았습니다.",
        "evidence": [
          "topology-idc.png",
          "gns_idc_topology.png"
        ]
      },
      {
        "stage": "implementation",
        "title": "SELinux로 인한 Keepalived 감시 스크립트 실행 실패",
        "goal": "HAProxy 상태를 감시하고 SLB 장애 시 대기 장비에 VIP를 인계하려 했습니다.",
        "symptom": "HAProxy는 실행 중이었지만 감시 스크립트가 코드 126을 반환하면서 Keepalived가 FAULT 상태에 진입했습니다.",
        "analysis": "SELinux가 스크립트의 systemctl 실행을 차단하는 것을 확인했습니다. 서비스 실행 상태와 감시 스크립트의 실행 가능 여부를 구분했습니다.",
        "action": "SELinux를 유지하고 /proc에서 프로세스를 확인하는 방식으로 감시 스크립트를 변경했습니다.",
        "result": "감시 스크립트가 정상 동작하고 SLB1 Keepalived 중지 시 SLB2가 Front·Backend VIP를 인계받았습니다.",
        "evidence": [],
        "note": "해결 과정은 기존 수행 기록 기준입니다. 오류 로그·수정 전후 스크립트 캡처는 아직 연결하지 않았습니다."
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
        ]
      },
      {
        "title": "한국 IDC의 역할별 망 분리",
        "why": "서비스 서버·DB·인프라·관리 단말의 역할을 구분하고 각 망 사이에 라우팅 경계를 구성했습니다.",
        "build": "IDC-Core1–Dist1/Dist2–Access를 연결했습니다. Acc1은 WEB/WAS/GAME, Acc2는 DB, Acc3은 NS1/CNS1, Acc4는 관리자 PC를 연결합니다. 초기 설계와 실제 주소·장비 배치에는 차이가 있어 실제 GNS3를 기준으로 설명합니다.",
        "images": [
          "idc-gns-original.png",
          "idc-design-original.png"
        ]
      },
      {
        "title": "웹·런처·멀티플레이 서비스",
        "why": "웹 서비스와 게임 실행·접속까지 직접 구현해 구축한 IDC에서 서비스가 동작하는지 확인했습니다.",
        "build": "Nginx–Java WAS–MariaDB를 연동하고 C#/.NET 런처의 버전 조회·게임 ZIP 다운로드·실행을 구현했습니다. Godot 클라이언트와 Linux Dedicated Server로 2인 게임 흐름을 구성했습니다.",
        "images": [
          "web-main-v2.jpg",
          "game-main-v2.jpg"
        ]
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
        "pending": false,
        "note": "로그인·회원가입 화면 캡처와 API 응답 확인 범위를 구분합니다."
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
        "result": "런처 빌드·배포와 다운로드·실행 흐름을 구성했고 두 플레이어의 방 참가·준비·게임 시작을 확인했습니다.",
        "evidence": [
          "game-main-v2.jpg",
          "game-play-v2.jpg"
        ],
        "pending": false,
        "note": "게임 화면은 플레이 증빙입니다. 런처 원본 캡처는 현재 자료에 포함되어 있지 않습니다."
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
        "pending": false,
        "note": ""
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
        "pending": true,
        "note": ""
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
        "pending": true,
        "note": ""
      }
    ],
    "issues": [
      {
        "stage": "design",
        "title": "거점 연결을 위한 공통 네트워크 기준 조율",
        "goal": "팀원이 각각 구축한 5개 거점을 연결하고 한국 IDC 서비스를 제공하려 했습니다.",
        "symptom": "거점별 구축을 통합하려면 IP·VLAN·WAN 연결 기준과 개인 담당 구간을 맞춰야 했습니다.",
        "analysis": "팀 공통 연결 기준과 한국 IDC의 네트워크·서버 배치를 함께 점검했습니다.",
        "action": "공통 기준을 공유하고 한국 IDC를 구축한 뒤 UDP Tunnel로 거점을 연결하며 통신 경로와 서비스 접근을 함께 점검했습니다.",
        "result": "거점 간 통신과 한국 IDC 서비스 접근을 확인했습니다. 다른 거점의 개별 구축은 팀원 담당입니다.",
        "evidence": [
          "topology.png",
          "idc-gns-original.png"
        ]
      },
      {
        "stage": "implementation",
        "title": "웹사이트 배포 후 Nginx 403 오류 해결",
        "goal": "SELinux를 유지한 Linux 서버에서 게임 웹사이트를 제공하려 했습니다.",
        "symptom": "Nginx 설정과 일반 파일 권한에 문제가 없었지만 배포한 웹사이트에서 403 오류가 발생했습니다.",
        "analysis": "임시 폴더에서 웹 서버 경로로 파일을 이동하면서 기존 SELinux 컨텍스트가 유지된 것으로 판단했습니다.",
        "action": "웹 서버가 파일에 접근할 수 있도록 보안 컨텍스트를 수정했습니다.",
        "result": "SELinux를 비활성화하지 않고 웹사이트 정상 접속을 확인했습니다.",
        "evidence": [
          "web-main-v2.jpg"
        ],
        "note": "아래 사진은 해결 후 접속 결과입니다. 원인 분석 로그와 컨텍스트 수정 전후 캡처는 현재 연결된 자료에 없습니다."
      }
    ]
  }
};
