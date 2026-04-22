# 교훈 기록 (Lessons Learned)

개발 중 발견한 교훈. /wrap 세션에서 기록됩니다.
반복되는 패턴은 CLAUDE.md "하지 않는 것" 섹션으로 승급됩니다.

---

## RSS 수집

### Reddit RSS는 서버 사이드에서 차단됨 #tooling
`reddit.com`과 `old.reddit.com`의 RSS URL은 Claude Code WebFetch에서 접근 불가 (연결 거부). 대신 vibecodingtrends.com(바이브코딩 집계), Hacker News RSS, Latent Space AINews를 사용한다.

### 집계 사이트가 Reddit보다 빠를 수 있다 #strategy
Latent Space AINews는 X·Reddit·HN 핫이슈를 매일 한 번에 요약해 제공한다. 개별 Reddit 피드를 구독하는 것보다 이 집계를 1차 소스로 쓰는 것이 효율적이다.

---

## Routines / 스케줄

### GitHub Private 저장소는 Claude App 설치가 별도 필요 #tooling
claude.ai에서 GitHub OAuth 연결(연결됨 표시)만으로는 Private 저장소 클론이 안 된다. github.com/settings/installations에서 Claude App이 설치되어 있어야 하며, 없으면 Public으로 전환하거나 재연결 시 앱 설치를 명시적으로 수행해야 한다.

### 에이전트 프롬프트는 설정 파일을 읽게 설계하라 #strategy
리모트 에이전트 프롬프트에 설정값을 하드코딩하지 말고, 저장소의 설정 파일(newsletter.md, sources.md)을 읽어서 동작하도록 설계하면 프롬프트 수정 없이 설정만 바꿀 수 있다.
