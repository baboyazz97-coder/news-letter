# 뉴스레터 디자인 리디자인 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** React Email 컴포넌트로 티얼 컬러의 한국어 뉴스레터 HTML 템플릿을 만들고, 렌더링 스크립트로 Gmail 드래프트 파이프라인에 연결한다.

**Architecture:** `emails/newsletter.tsx`가 React Email 컴포넌트로 레이아웃을 정의하고, `scripts/render-newsletter.ts`가 JSON 데이터를 stdin으로 받아 `render()`로 HTML을 생성해 stdout으로 출력한다. 트리거 프롬프트는 이 스크립트를 호출해 HTML을 Gmail 드래프트에 삽입한다.

**Tech Stack:** react-email (render, Html, Head, Body, Container, Section, Heading, Text, Link, Hr, Preview, Tailwind, pixelBasedPreset), tsx (TypeScript 실행), Node.js v25.9.0

---

## 파일 구조

| 파일 | 역할 |
|------|------|
| `package.json` | 의존성 선언 (react-email, react, tsx) |
| `tsconfig.json` | TypeScript + JSX 설정 |
| `emails/newsletter.tsx` | React Email 컴포넌트 (레이아웃 + 디자인) |
| `scripts/render-newsletter.ts` | stdin JSON → stdout HTML 변환 스크립트 |
| `tests/newsletter.test.ts` | 렌더링 정합성 테스트 |
| `newsletter.md` | 프롬프트 지시문 추가 (한국어화, 쉬운 설명) |

---

## Task 1: 패키지 초기화

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`

- [ ] **Step 1: package.json 생성**

```json
{
  "name": "news-letter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "node --import tsx --test tests/**/*.test.ts",
    "render": "tsx scripts/render-newsletter.ts"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-email": "^3.0.7"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "tsx": "^4.19.2",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **Step 2: tsconfig.json 생성**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["emails/**/*", "scripts/**/*", "tests/**/*"]
}
```

- [ ] **Step 3: 의존성 설치**

```bash
cd /Users/gyuri/news-letter
npm install
```

Expected: `node_modules/` 생성, `package-lock.json` 생성, 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add package.json tsconfig.json package-lock.json
git commit -m "chore: initialize react-email project"
```

---

## Task 2: Newsletter 컴포넌트 작성

**Files:**
- Create: `tests/newsletter.test.ts`
- Create: `emails/newsletter.tsx`

- [ ] **Step 1: 테스트 파일 생성**

```bash
mkdir -p tests
```

`tests/newsletter.test.ts`:

```typescript
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { render } from 'react-email'
import { createElement } from 'react'
import { NewsletterEmail } from '../emails/newsletter.js'

const sampleData = {
  issueDate: '2026년 4월 4주차',
  intro: '안녕하세요 👋 이번 주 핵심 소식을 전해드려요.',
  highlights: [
    { title: 'Claude Code 터미널 직접 제어', summary: 'AI가 명령어를 대신 실행해줘요.' },
  ],
  toolUpdates: [
    { title: 'Cursor 0.45 출시', summary: '자동완성이 더 빨라졌어요.', url: 'https://cursor.sh' },
  ],
  readings: [
    { title: '혼자서 앱 만들기 도전기', summary: '비개발자가 AI로 서비스를 만든 경험담.', url: 'https://example.com' },
  ],
}

test('헤더에 바이브코딩 위클리가 포함되어야 한다', async () => {
  const html = await render(createElement(NewsletterEmail, sampleData))
  assert.ok(html.includes('바이브코딩 위클리'), '뉴스레터 제목 누락')
})

test('issueDate가 HTML에 포함되어야 한다', async () => {
  const html = await render(createElement(NewsletterEmail, sampleData))
  assert.ok(html.includes('2026년 4월 4주차'), 'issueDate 누락')
})

test('핵심 기사 제목이 HTML에 포함되어야 한다', async () => {
  const html = await render(createElement(NewsletterEmail, sampleData))
  assert.ok(html.includes('Claude Code 터미널 직접 제어'), '핵심 기사 제목 누락')
})

test('툴 업데이트 링크가 HTML에 포함되어야 한다', async () => {
  const html = await render(createElement(NewsletterEmail, sampleData))
  assert.ok(html.includes('https://cursor.sh'), '툴 업데이트 링크 누락')
})

test('domesticNews 없으면 국내 소식 섹션이 없어야 한다', async () => {
  const html = await render(createElement(NewsletterEmail, sampleData))
  assert.ok(!html.includes('국내 소식'), '국내 소식 섹션이 있으면 안 됨')
})

test('domesticNews 있으면 국내 소식 섹션이 있어야 한다', async () => {
  const html = await render(
    createElement(NewsletterEmail, { ...sampleData, domesticNews: '카카오가 AI 코딩 툴을 출시했어요.' })
  )
  assert.ok(html.includes('국내 소식'), '국내 소식 섹션 누락')
  assert.ok(html.includes('카카오가 AI 코딩 툴을 출시했어요.'), '국내 소식 내용 누락')
})
```

- [ ] **Step 2: 테스트 실행 — FAIL 확인**

```bash
npm test
```

Expected: `Error: Cannot find module '../emails/newsletter.js'` — 컴포넌트가 없으므로 실패해야 정상

- [ ] **Step 3: emails/newsletter.tsx 생성**

```bash
mkdir -p emails
```

`emails/newsletter.tsx`:

```tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
  Tailwind,
  pixelBasedPreset,
} from 'react-email'

export interface Article {
  title: string
  summary: string
  url?: string
}

export interface NewsletterProps {
  issueDate: string
  intro: string
  highlights: Article[]
  toolUpdates: Article[]
  readings: Article[]
  domesticNews?: string
}

const colors = {
  tealDark: '#0d9488',
  tealMid: '#0f766e',
  tealLight: '#ccfbf1',
  mintBg: '#f0fdf9',
  mintBorder: '#e0fdf4',
  textDark: '#111827',
  textBody: '#374151',
  textMuted: '#6b7280',
  white: '#ffffff',
} as const

export function NewsletterEmail({
  issueDate,
  intro,
  highlights,
  toolUpdates,
  readings,
  domesticNews,
}: NewsletterProps) {
  return (
    <Html lang="ko">
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>바이브코딩 위클리 — {issueDate}</Preview>
        <Body style={{ backgroundColor: colors.mintBg, margin: '0', padding: '0', fontFamily: "'Apple SD Gothic Neo','Malgun Gothic',sans-serif" }}>
          <Container style={{ maxWidth: '600px', margin: '0 auto' }}>

            {/* 헤더 */}
            <Section style={{ backgroundColor: colors.tealDark, padding: '28px 32px 24px' }}>
              <Text style={{ margin: '0 0 8px', fontSize: '11px', color: '#99f6e4', letterSpacing: '2px', fontWeight: '600' }}>
                VIBE CODING WEEKLY
              </Text>
              <Heading as="h1" style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: colors.white, lineHeight: '1.3' }}>
                바이브코딩 위클리
              </Heading>
              <Text style={{ margin: '0', fontSize: '13px', color: '#ccfbf1' }}>
                {issueDate} · AI·코딩 도구 핵심 소식
              </Text>
            </Section>

            {/* 인트로 */}
            <Section style={{ backgroundColor: colors.white, padding: '20px 32px', borderBottom: `1px solid ${colors.mintBorder}`, marginTop: '8px' }}>
              <Text style={{ margin: '0', fontSize: '14px', color: colors.textBody, lineHeight: '1.8' }}>
                {intro}
              </Text>
            </Section>

            {/* 이번 주 핵심 */}
            {highlights.length > 0 && (
              <Section style={{ backgroundColor: colors.white, padding: '24px 32px', marginTop: '8px' }}>
                <span style={{ backgroundColor: colors.tealDark, color: colors.white, fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
                  이번 주 핵심
                </span>
                {highlights.map((item, i) => (
                  <div key={i} style={{ backgroundColor: colors.mintBg, borderLeft: `3px solid ${colors.tealDark}`, padding: '14px 16px', borderRadius: '0 8px 8px 0', marginBottom: i < highlights.length - 1 ? '10px' : '0' }}>
                    <Text style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: colors.tealMid }}>
                      {item.title}
                    </Text>
                    <Text style={{ margin: '0', fontSize: '12px', color: colors.textBody, lineHeight: '1.7' }}>
                      {item.summary}
                    </Text>
                  </div>
                ))}
              </Section>
            )}

            {/* 툴 업데이트 */}
            {toolUpdates.length > 0 && (
              <Section style={{ backgroundColor: colors.white, padding: '24px 32px', marginTop: '8px' }}>
                <span style={{ backgroundColor: colors.tealLight, color: colors.tealMid, fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
                  🔧 툴 업데이트
                </span>
                {toolUpdates.map((item, i) => (
                  <div key={i}>
                    <Text style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '700', color: colors.textDark }}>
                      {item.title}
                    </Text>
                    <Text style={{ margin: '0 0 4px', fontSize: '12px', color: colors.textMuted, lineHeight: '1.6' }}>
                      {item.summary}{' '}
                      {item.url && (
                        <Link href={item.url} style={{ color: colors.tealDark }}>자세히 보기 →</Link>
                      )}
                    </Text>
                    {i < toolUpdates.length - 1 && (
                      <Hr style={{ borderColor: colors.mintBorder, borderStyle: 'solid', margin: '12px 0' }} />
                    )}
                  </div>
                ))}
              </Section>
            )}

            {/* 읽을 만한 글 */}
            {readings.length > 0 && (
              <Section style={{ backgroundColor: colors.white, padding: '24px 32px', marginTop: '8px' }}>
                <span style={{ backgroundColor: colors.tealLight, color: colors.tealMid, fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
                  📖 읽을 만한 글
                </span>
                {readings.map((item, i) => (
                  <div key={i}>
                    <Text style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '700', color: colors.textDark }}>
                      {item.title}
                    </Text>
                    <Text style={{ margin: '0 0 4px', fontSize: '12px', color: colors.textMuted, lineHeight: '1.6' }}>
                      {item.summary}{' '}
                      {item.url && (
                        <Link href={item.url} style={{ color: colors.tealDark }}>읽기 →</Link>
                      )}
                    </Text>
                    {i < readings.length - 1 && (
                      <Hr style={{ borderColor: colors.mintBorder, borderStyle: 'solid', margin: '12px 0' }} />
                    )}
                  </div>
                ))}
              </Section>
            )}

            {/* 국내 소식 (선택) */}
            {domesticNews && (
              <Section style={{ backgroundColor: colors.white, padding: '24px 32px', marginTop: '8px' }}>
                <span style={{ backgroundColor: colors.tealLight, color: colors.tealMid, fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
                  🇰🇷 국내 소식
                </span>
                <Text style={{ margin: '0', fontSize: '12px', color: colors.textMuted, lineHeight: '1.7' }}>
                  {domesticNews}
                </Text>
              </Section>
            )}

            {/* 푸터 */}
            <Section style={{ backgroundColor: colors.tealDark, padding: '24px 32px', marginTop: '8px', textAlign: 'center' }}>
              <Text style={{ margin: '0 0 12px', fontSize: '12px', color: '#ccfbf1', lineHeight: '1.8' }}>
                이번 주 뉴스레터 어떠셨나요?<br />
                더 보고 싶은 주제가 있으면 이 메일에 답장으로 알려주세요 😊
              </Text>
              <Text style={{ margin: '0', fontSize: '10px', color: '#99f6e4' }}>
                바이브코딩 위클리 · 매주 월요일 발송
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

NewsletterEmail.PreviewProps = {
  issueDate: '2026년 4월 4주차',
  intro: '안녕하세요 👋 이번 주 AI·바이브코딩 업계에서 꼭 알아야 할 소식만 골라 전해드려요.',
  highlights: [
    { title: 'Claude Code, 터미널을 직접 제어하게 됐어요', summary: '이제 AI가 코드를 짜는 것을 넘어, 터미널 명령어도 직접 실행할 수 있어요. 마치 옆에 개발자 동료가 앉아서 컴퓨터를 직접 조작해주는 느낌이에요.' },
    { title: 'GPT-5 출시 — 코딩 속도 40% 빨라졌어요', summary: 'OpenAI의 새 모델이 나왔어요. 코딩 테스트에서 이전 버전보다 40% 빠른 속도를 기록했고, 한국어 이해도도 크게 좋아졌다고 해요.' },
  ],
  toolUpdates: [
    { title: 'Cursor 0.45 — 자동완성이 더 똑똑해졌어요', summary: '긴 코드를 작성할 때 AI가 다음 줄을 미리 예측해주는 기능이 개선됐어요.', url: 'https://cursor.sh' },
  ],
  readings: [
    { title: '"혼자서 앱을 만드는 시대가 진짜로 왔다"', summary: '비개발자가 AI 툴로 실제 서비스를 만든 경험담. 어떤 도구를 어떻게 썼는지 단계별로 설명해요.', url: 'https://example.com' },
  ],
  domesticNews: '카카오가 자체 AI 코딩 어시스턴트 출시를 예고했어요. 한국어 코드 주석과 문서 작성에 특화됐다고 하네요.',
} satisfies NewsletterProps

export default NewsletterEmail
```

- [ ] **Step 4: 테스트 실행 — PASS 확인**

```bash
npm test
```

Expected: 6개 테스트 모두 PASS

- [ ] **Step 5: 커밋**

```bash
git add emails/newsletter.tsx tests/newsletter.test.ts
git commit -m "feat: add NewsletterEmail React Email component"
```

---

## Task 3: 렌더링 스크립트 작성

**Files:**
- Create: `scripts/render-newsletter.ts`

- [ ] **Step 1: scripts 디렉토리 생성**

```bash
mkdir -p scripts
```

- [ ] **Step 2: render-newsletter.ts 생성**

`scripts/render-newsletter.ts`:

```typescript
import { render } from 'react-email'
import { createElement } from 'react'
import { NewsletterEmail, type NewsletterProps } from '../emails/newsletter.js'

async function main() {
  // stdin에서 JSON 읽기
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf-8').trim()

  if (!raw) {
    process.stderr.write('Error: stdin에 JSON 데이터가 없습니다.\n')
    process.exit(1)
  }

  let data: NewsletterProps
  try {
    data = JSON.parse(raw) as NewsletterProps
  } catch {
    process.stderr.write('Error: JSON 파싱 실패 — 올바른 JSON을 입력해주세요.\n')
    process.exit(1)
  }

  const html = await render(createElement(NewsletterEmail, data))
  process.stdout.write(html)
}

main().catch((err) => {
  process.stderr.write(`Error: ${String(err)}\n`)
  process.exit(1)
})
```

- [ ] **Step 3: 스크립트 단독 실행 검증**

```bash
echo '{
  "issueDate": "2026년 4월 4주차",
  "intro": "안녕하세요 👋",
  "highlights": [{"title": "테스트 핵심 소식", "summary": "테스트 설명입니다."}],
  "toolUpdates": [],
  "readings": []
}' | npx tsx scripts/render-newsletter.ts | grep -c '바이브코딩 위클리'
```

Expected: `1` (바이브코딩 위클리가 HTML에 1번 이상 포함됨)

- [ ] **Step 4: 국내 소식 포함 케이스 검증**

```bash
echo '{
  "issueDate": "2026년 4월 4주차",
  "intro": "안녕하세요 👋",
  "highlights": [],
  "toolUpdates": [],
  "readings": [],
  "domesticNews": "카카오 AI 코딩 툴 출시 예고"
}' | npx tsx scripts/render-newsletter.ts | grep -c '국내 소식'
```

Expected: `1`

- [ ] **Step 5: 커밋**

```bash
git add scripts/render-newsletter.ts
git commit -m "feat: add render-newsletter script (stdin JSON -> stdout HTML)"
```

---

## Task 4: newsletter.md 프롬프트 지시문 업데이트

**Files:**
- Modify: `newsletter.md`

뉴스레터 생성 프롬프트에 한국어화 규칙과 렌더링 스크립트 호출 방법을 추가한다.

- [ ] **Step 1: newsletter.md의 뉴스레터 포맷 섹션 교체**

`newsletter.md`의 `## 뉴스레터 포맷` 섹션을 아래로 교체한다:

````markdown
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
  ],
  "domesticNews": "국내 소식이 없으면 이 필드 자체를 제외한다"
}
```

### HTML 생성

JSON 데이터를 구성한 후 렌더링 스크립트로 HTML을 생성한다:

```bash
echo '<위에서 구성한 JSON>' | npx tsx /Users/gyuri/news-letter/scripts/render-newsletter.ts
```

이 명령의 stdout 출력이 Gmail 드래프트의 HTML 본문이다.
````

- [ ] **Step 2: 변경 내용 확인**

```bash
grep -n "소제목 완전 한국어화" /Users/gyuri/news-letter/newsletter.md
```

Expected: 해당 줄 번호 출력 (문자열 존재 확인)

- [ ] **Step 3: 커밋**

```bash
git add newsletter.md
git commit -m "docs: add Korean content rules and render script usage to newsletter.md"
```

---

## 자체 검토

**스펙 커버리지:**
- ✅ 티얼 컬러 디자인 시스템 → Task 2 (colors 상수)
- ✅ 소제목 완전 한국어화 → Task 4 (newsletter.md 지시문)
- ✅ 쉬운 설명 필수 → Task 4 (newsletter.md 지시문)
- ✅ 섹션별 구조 (핵심/툴/읽기/국내) → Task 2 (컴포넌트)
- ✅ 국내 소식 선택적 렌더링 → Task 2 (conditonal render) + Task 2 Step 1 테스트
- ✅ stdin JSON → stdout HTML → Task 3
- ✅ Gmail 드래프트 파이프라인 유지 → 별도 파이프라인 변경 없음

**플레이스홀더:** 없음
**타입 일관성:** `NewsletterProps`, `Article` 인터페이스가 `newsletter.tsx`에 export되고 `newsletter.test.ts`와 `render-newsletter.ts` 양쪽에서 import됨
