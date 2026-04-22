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

---

## 뉴스레터 포맷

### 콘텐츠 생성 규칙

**소제목 완전 한국어화:**
- 모든 기사 제목을 영어 원문 그대로 쓰지 않는다
- 한국어로 자연스럽게 재작성한다 (번역이 아닌 의역)
- 영어 제목을 병기하지 않는다

**비전문가용 쉬운 설명 필수:**
- 각 기사마다 비전문가가 이해할 수 있는 설명 1-2줄을 추가한다
- 기술 용어가 필요하면 괄호로 풀어준다
  - 예: "LLM(대형 언어 모델, ChatGPT 같은 AI)"
  - 예: "토큰(AI가 글을 처리하는 단위, 단어 조각)"
- 일상적인 비유로 설명한다
  - 예: "마치 옆에 개발자 동료가 앉아서 컴퓨터를 직접 조작해주는 느낌"

### JSON 데이터 구조

콘텐츠를 수집·선별한 후 아래 JSON 형식으로 데이터를 구성한다:

```json
{
  "issueDate": "YYYY년 M월 N주차",
  "intro": "안녕하세요 👋 이번 주 AI·바이브코딩 업계에서 꼭 알아야 할 소식만 골라 전해드려요.",
  "highlights": [
    {
      "title": "한국어로 재작성한 핵심 소식 제목",
      "summary": "비전문가가 이해할 수 있는 쉬운 설명 1-2줄"
    }
  ],
  "toolUpdates": [
    {
      "title": "툴명 — 한국어로 재작성한 변경사항",
      "summary": "한 줄 쉬운 설명",
      "url": "https://원문링크"
    }
  ],
  "readings": [
    {
      "title": "한국어로 재작성한 글 제목",
      "summary": "무슨 내용인지 쉽게 설명한 1-2줄",
      "url": "https://원문링크"
    }
  ]
}
```

국내 소식이 있을 때만 `"domesticNews"` 필드를 추가한다:
```json
  "domesticNews": "국내 소식 한 줄 요약"
```

### HTML 생성

JSON 데이터를 구성한 후 렌더링 스크립트로 HTML을 생성한다:

```bash
echo '<위에서 구성한 JSON>' | npx tsx scripts/render-newsletter.ts
```

이 명령의 stdout 출력이 Gmail 드래프트의 HTML 본문이다.

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
