# 뉴스 소스 목록

뉴스레터 생성 시 아래 소스에서 기사를 수집한다.
우선순위: ★★★ > ★★ > ★

---

## 커뮤니티 집계 (Reddit 대체 — 접근 가능 확인)

Reddit RSS는 서버 사이드 접근 차단. 아래 소스가 동일한 커뮤니티 이슈를 더 빠르게 커버한다.

| 소스 | RSS URL | 특징 | 우선순위 |
|------|---------|------|---------|
| Hacker News | `https://news.ycombinator.com/rss` | AI 이슈 가장 빠른 커뮤니티 집계, 기술 종사자 중심 | ★★★ |
| Latent Space AINews | `https://www.latent.space/feed` | X·Reddit·HN 핫이슈를 매일 한 곳에 요약 | ★★★ |
| vibecodingtrends.com | `https://vibecodingtrends.com/` | 바이브코딩 특화 X+Reddit 실시간 집계 (RSS 없음, WebFetch) | ★★★ |

---

## 공식 발표

| 소스 | RSS URL | 우선순위 |
|------|---------|---------|
| Anthropic News | `https://www.anthropic.com/rss.xml` | ★★★ |
| Hugging Face Blog | `https://huggingface.co/blog/feed.xml` | ★★★ |

---

## 해외 B2B

| 소스 | RSS URL | 우선순위 |
|------|---------|---------|
| The Register | `https://www.theregister.com/headlines.atom` | ★★ |

---

## 국내 B2B

| 소스 | RSS URL | 우선순위 |
|------|---------|---------|
| GeekNews | `https://news.hada.io/rss` | ★★★ |
| 요즘IT | 사이트 내 RSS 버튼 | ★★ |
| ZDNet Korea | `https://zdnet.co.kr/rss/` | ★★ |

---

## 접근 불가 소스 (제외)

| 소스 | 사유 |
|------|------|
| Reddit RSS | 서버 사이드 접근 차단 |
| TLDR AI RSS | 404 오류 |
| news.hada.io/rss | 403 오류 (GeekNews 대체 필요 시 직접 접속) |
