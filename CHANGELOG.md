# Changelog

## 현재 상태
<!-- /wrap이 매 세션 이 섹션을 업데이트합니다 -->
- **상태:** 자동화 완료 + HTML 디자인 리디자인 완료
- **주요 기능:**
  - 뉴스레터 자동화 트리거 (매주 월요일 9시 KST) — WebSearch 5개 쿼리 → 키워드 스코어링 → React Email HTML → Gmail 드래프트
  - 피드백 수집 트리거 (매주 금요일 9시 KST) — 독자 답장 감지 → feedback-pending.md → 알림 드래프트
  - `emails/newsletter.tsx` — 티얼(#0d9488) 디자인 React Email 컴포넌트 (한국어 섹션, 조건부 국내 소식)
  - `scripts/render-newsletter.ts` — stdin JSON → stdout HTML 렌더 스크립트 (런타임 구조 검증 포함)
  - `newsletter.md` — 소제목 한국어화 규칙, 비전문가용 쉬운 설명 지침, JSON→HTML 렌더 방법 포함
  - GitHub 저장소 연동 완료 (baboyazz97-coder/news-letter, main 브랜치)
- **알려진 이슈:** Reddit RSS 서버 사이드 접근 차단 (대체 소스로 운영 중)
- **마지막 발행:** Issue 1 (2026-04-22, 수동 발행)

## 세션 로그
<!-- ⚠️ APPEND ONLY — 아래 항목을 절대 삭제/수정하지 마세요. 새 항목은 이 줄 바로 아래에 추가합니다. -->

### 2026-04-22 (세션 5)
- CCR 원격 트리거 환경에서 Bash curl RSS 수집 불가(네트워크 샌드박스) 확인
- 뉴스레터 트리거 STEP 4-5를 WebSearch 5개 쿼리 방식으로 교체

### 2026-04-22 (세션 4)
- `resend/react-email` 스킬 설치, 뉴스레터 디자인 리디자인 (티얼 컬러, 웜 스타일, 한국어 소제목, 비전문가용)
- `emails/newsletter.tsx` React Email 컴포넌트, `scripts/render-newsletter.ts` 렌더 스크립트, 6개 TDD 테스트 추가
- 뉴스레터 트리거 프롬프트 업데이트 — 소제목 한국어화 강제, render script 연동, 즉시 실행 테스트

### 2026-04-22 (세션 3)
- 뉴스레터 트리거 프롬프트 고도화 (curl + Python 스코어링, Issue 번호 추적, 카테고리 색상)
- `newsletter.md` — 키워드 스코어링 룰 30개/제외 15개, 카테고리 색상표, 피드백 문구 추가
- 피드백 수집 트리거 신규 생성 (매주 금요일 9시 KST, `trig_01KVMboqRmRKpYSMsWJcvku2`)
- GitHub 연동 완료 및 모든 변경사항 main 브랜치에 푸시

### 2026-04-22 (세션 2)
- `sources.md`, `newsletter.md` 설정 파일 분리 생성
- Reddit RSS 접근 차단 확인 → Hacker News·Latent Space·vibecodingtrends.com으로 대체
- 수신자 이메일 설정 (baboyazz97@gmail.com), 첫 Gmail 드래프트 발송 성공

### 2026-04-22
- CC 프로젝트 부트스트랩 완료 (CLAUDE.md, CHANGELOG.md, Retros/LESSONS.md, .gitignore)
- 바이브코딩 RSS 소스 목록 작성 (`vibe-coding-rss-sources.md`)
- 프로젝트 방향 확정: RSS 수집 → 한국어 요약 → Gmail 드래프트 자동화
