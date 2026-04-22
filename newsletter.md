# 뉴스레터 설정

---

## 선별 기준

아래 기준에 해당하는 기사만 포함한다.

**포함:**
- AI 코딩 툴 신기능·업데이트 (Cursor, Claude Code, Copilot, Lovable 등)
- 바이브코딩·에이전틱 워크플로우 실무 사례
- 주요 모델 릴리즈 (GPT, Claude, Gemini, 오픈소스 LLM)
- 개발자 생산성에 직접 영향을 주는 연구·통계
- 국내 AI 개발 생태계 동향

**제외:**
- 일반 소비자 대상 AI 서비스 (챗봇 리뷰, 이미지 생성 등)
- 투자·M&A 단순 보도 (기술적 맥락 없는 것)
- 중복 보도 (같은 이슈를 다룬 기사 중 하나만 선택)
- 1주일 이상 지난 기사

---

## 키워드 스코어링 룰

각 기사의 제목+본문 요약에 아래 키워드 매칭을 적용한다.
**포함 키워드 (+1점씩):**
cursor, claude, copilot, lovable, bolt, windsurf, devin, replit,
vibe coding, vibe-coding, vibecoding, agentic, agent, mcp,
llm, gpt, gemini, mistral, llama, qwen, deepseek,
coding tool, code editor, developer productivity,
ai coding, ai agent, code generation, context window,
open source model, model release, benchmark

**제외 키워드 (-2점씩):**
image generation, text to image, dall-e, midjourney, stable diffusion,
chatbot review, consumer, subscription price, acquisition rumor,
nfl, sports, cooking, fashion, travel, celebrity

**판정:** 합산 점수 > 0인 기사만 후보. score 내림차순 정렬.

---

## 카테고리 색상 (HTML)

| 카테고리 | 색상 코드 |
|----------|-----------|
| 툴 업데이트 | `#0066cc` (파랑) |
| 모델 릴리즈 | `#7c3aed` (보라) |
| 실무 사례 | `#059669` (초록) |
| 연구·통계 | `#d97706` (주황) |

---

## 뉴스레터 포맷

```
제목: [바이브코딩 위클리] YYYY-MM-DD

안녕하세요,
이번 주 AI·바이브코딩 업계 주요 소식입니다.

---

## 이번 주 핵심 (3개 이내)
짧고 굵은 한 줄 요약. 가장 중요한 것만.

## 툴 업데이트
- [툴명] 변경사항 요약 (출처 링크)

## 읽을 만한 글
- 제목 (출처, 한 줄 요약)

## 국내 소식
- 국내 관련 동향 (있을 때만)

---
소스: sources.md 참조
```

---

## 분량 기준

- 전체: 600~900자 (한국어 기준)
- 핵심 섹션: 최대 3개 항목
- 툴 업데이트: 최대 5개 항목
- 읽을 만한 글: 최대 3개 항목

---

## 수신자 설정

| 항목 | 값 |
|------|-----|
| 수신자 이메일 | baboyazz97@gmail.com |
| 발송 주기 | 매주 월요일 |
| 제목 형식 | `[바이브코딩 위클리] YYYY-MM-DD` |
| 언어 | 한국어 (원문 영어 기사도 한국어 요약) |
