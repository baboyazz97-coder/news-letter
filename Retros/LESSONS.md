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

## npm 패키지

### react-email은 버전별로 역할이 다르다 #coding #tooling
`react-email` v3.x는 CLI/프리뷰 툴이라 programmatic import 불가. v6.x부터 컴포넌트 + `render()` 함수를 단일 패키지로 export한다. `@react-email/components`, `@react-email/render` 등 개별 패키지는 deprecated. 설치 시 `react-email@latest`를 쓰되, import 가능 여부를 항상 확인한다.

### 서브에이전트에게 npm 패키지 지정 시 버전과 import 가능 여부를 명시하라 #coding #strategy
패키지가 CLI와 라이브러리 두 역할을 혼용하거나 메이저 버전 간 API가 크게 다를 수 있다. 스킬 문서가 오래됐을 경우 실제 설치된 버전의 동작과 다를 수 있으므로, 서브에이전트 프롬프트에 "버전 X.Y, `import { render } from 'package'` 확인됨" 같이 명시하면 시행착오를 줄일 수 있다.

---

## Routines / 스케줄

### GitHub Private 저장소는 Claude App 설치가 별도 필요 #tooling
claude.ai에서 GitHub OAuth 연결(연결됨 표시)만으로는 Private 저장소 클론이 안 된다. github.com/settings/installations에서 Claude App이 설치되어 있어야 하며, 없으면 Public으로 전환하거나 재연결 시 앱 설치를 명시적으로 수행해야 한다.

### 에이전트 프롬프트는 설정 파일을 읽게 설계하라 #strategy
리모트 에이전트 프롬프트에 설정값을 하드코딩하지 말고, 저장소의 설정 파일(newsletter.md, sources.md)을 읽어서 동작하도록 설계하면 프롬프트 수정 없이 설정만 바꿀 수 있다.
