# 교훈 기록 (Lessons Learned)

개발 중 발견한 교훈. /wrap 세션에서 기록됩니다.
반복되는 패턴은 CLAUDE.md "하지 않는 것" 섹션으로 승급됩니다.

---

## RSS 수집

### Reddit RSS는 서버 사이드에서 차단됨 #tooling
`reddit.com`과 `old.reddit.com`의 RSS URL은 Claude Code WebFetch에서 접근 불가 (연결 거부). 대신 vibecodingtrends.com(바이브코딩 집계), Hacker News RSS, Latent Space AINews를 사용한다.

### 집계 사이트가 Reddit보다 빠를 수 있다 #strategy
Latent Space AINews는 X·Reddit·HN 핫이슈를 매일 한 번에 요약해 제공한다. 개별 Reddit 피드를 구독하는 것보다 이 집계를 1차 소스로 쓰는 것이 효율적이다.
