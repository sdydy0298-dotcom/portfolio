# 서동연 · Portfolio

Version **1.0.0** · 기준일 2026-10-26

개발·서버·네트워크 경험을 소개하는 개인 포트폴리오 1차 초안입니다. 프로젝트는 **ALEPH Arena**와 **Enterprise Network 본사·지사·IDC·FTTH 통합 네트워크** 두 개만 소개합니다. 백엔드 개발 1년 9개월과 Windows 보안 솔루션 개발 1년 3개월은 경력으로 소개합니다.

## 로컬 확인

Node.js 24.x. 외부 런타임 의존성 없이 동작합니다.

```bash
npm run check
npm run build
python3 -m http.server 8000 --directory dist
```

## 파일 구조

- `index.html`: 소개·경력·기술·교육·자격증·연락 창구
- `styles.css`: PC·태블릿·모바일·인쇄 레이아웃
- `app.js`: 프로젝트 카드·상세 모달·딥링크·모바일 메뉴
- `content.json`: 버전 관리되는 프로젝트 콘텐츠 및 로컬 미리보기 데이터
- `assets/`: 파비콘과 나중에 추가할 실제 구축 이미지
- `scripts/build.mjs`: Supabase 공개 콘텐츠를 조회하고 `dist` 정적 사이트 생성
- `supabase/001_portfolio.sql`: 적용된 전용 테이블 및 RLS 정책
- `scripts/sync-content.mjs`: 로컬 콘텐츠를 DB에 반영할 SQL 생성

## GitHub → Vercel → Supabase

GitHub `main` 변경을 Vercel이 배포합니다. Vercel은 빌드 시 Supabase `aleph_common`의 `defense.se_portfolio_content`에서 `id=main`, `is_published=true`의 `payload`를 읽습니다. REST 조회에는 `Accept-Profile: defense`를 명시합니다. 기존 API가 defense만 노출하므로 다른 스키마의 노출 설정을 변경하지 않습니다. 브라우저는 빌드된 정적 JSON만 읽으며 Supabase 키를 전달받지 않습니다.

Vercel 환경 변수:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` (publishable key만 사용)

테이블은 RLS 활성화, 공개 게시 행 SELECT만 허용합니다. 익명·일반 인증 사용자의 쓰기 권한은 없습니다. 관리자 편집은 Supabase SQL Editor/Table Editor에서 수행합니다. 다른 앱의 테이블과 정책은 변경하지 않습니다.

## 이후 내용 추가

**DB 콘텐츠가 배포의 기준 데이터입니다.**

1. 가벼운 변경은 Supabase Table Editor의 `se_portfolio_content` → `main` → `payload`를 수정합니다.
2. 같은 내용을 `content.json`에도 반영해 로컬 자료와 일치시킵니다.
3. DB 반영용 SQL이 필요하면 `npm run sync:sql`로 생성하고 Supabase SQL Editor에서 실행합니다. 이 스크립트는 DB에 직접 쓰지 않습니다.
4. 변경 파일을 GitHub `main`에 커밋해 배포합니다. DB만 변경한 경우에는 Vercel에서 Redeploy합니다.
5. 실제 수행·확인한 결과만 `components`, `results`, `troubles`에 추가합니다.

### 이미지 추가

실제 캡처를 `assets/`에 저장하고 프로젝트 `images`에 아래처럼 추가합니다. 이미지가 없으면 빈 자리나 임시 이미지를 표시하지 않습니다.

```json
{"url":"/assets/aleph-game.png","caption":"Linux 전용 게임 서버에 접속한 Windows 클라이언트"}
```

프로젝트 딥링크: `/#project-aleph-arena`, `/#project-smdc`.

## 내용·공개 범위

- 팀원의 실명·연락처·회사 소스코드 및 내부 문서는 공개하지 않습니다.
- 팀 공통 성과와 본인 역할, 설계 목표와 실제 검증 상태를 구분합니다.
- 100대는 수용 설계 기준이며 실제 가동 수가 아닙니다.
- DB 자동 무중단·EVPN/VXLAN 구축·정량 성능 개선 수치를 주장하지 않습니다.
- 공개 이메일이 확정되지 않아 하단 GitHub 연락 버튼은 표시하지 않습니다.
