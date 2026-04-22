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
import { createElement } from 'react'

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

const C = {
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

function Badge({ bg, color, children }: { bg: string; color: string; children: string }) {
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        fontSize: '10px',
        fontWeight: '700',
        padding: '3px 10px',
        borderRadius: '12px',
        display: 'inline-block',
        marginBottom: '16px',
      }}
    >
      {children}
    </span>
  )
}

function ArticleItem({
  item,
  isLast,
  linkLabel,
}: {
  item: Article
  isLast: boolean
  linkLabel: string
}) {
  return (
    <div>
      <Text style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '700', color: C.textDark }}>
        {item.title}
      </Text>
      <Text style={{ margin: '0 0 4px', fontSize: '12px', color: C.textMuted, lineHeight: '1.6' }}>
        {item.summary}{' '}
        {item.url && (
          <Link href={item.url} style={{ color: C.tealDark }}>
            {linkLabel} →
          </Link>
        )}
      </Text>
      {!isLast && (
        <Hr style={{ borderColor: C.mintBorder, borderStyle: 'solid', borderTopWidth: '1px', margin: '12px 0' }} />
      )}
    </div>
  )
}

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
        <Body
          style={{
            backgroundColor: C.mintBg,
            margin: '0',
            padding: '0',
            fontFamily: "'Apple SD Gothic Neo','Malgun Gothic',sans-serif",
          }}
        >
          <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* 헤더 */}
            <Section style={{ backgroundColor: C.tealDark, padding: '28px 32px 24px' }}>
              <Text
                style={{ margin: '0 0 8px', fontSize: '11px', color: '#99f6e4', letterSpacing: '2px', fontWeight: '600' }}
              >
                VIBE CODING WEEKLY
              </Text>
              <Heading
                as="h1"
                style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: C.white, lineHeight: '1.3' }}
              >
                바이브코딩 위클리
              </Heading>
              <Text style={{ margin: '0', fontSize: '13px', color: '#ccfbf1' }}>
                {issueDate} · AI·코딩 도구 핵심 소식
              </Text>
            </Section>

            {/* 인트로 */}
            <Section
              style={{
                backgroundColor: C.white,
                padding: '20px 32px',
                borderBottom: `1px solid ${C.mintBorder}`,
                marginTop: '8px',
              }}
            >
              <Text style={{ margin: '0', fontSize: '14px', color: C.textBody, lineHeight: '1.8' }}>
                {intro}
              </Text>
            </Section>

            {/* 이번 주 핵심 */}
            {highlights.length > 0 && (
              <Section style={{ backgroundColor: C.white, padding: '24px 32px', marginTop: '8px' }}>
                <Badge bg={C.tealDark} color={C.white}>이번 주 핵심</Badge>
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: C.mintBg,
                      borderLeft: `3px solid ${C.tealDark}`,
                      borderStyle: 'none none none solid',
                      padding: '14px 16px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: i < highlights.length - 1 ? '10px' : '0',
                    }}
                  >
                    <Text style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: C.tealMid }}>
                      {item.title}
                    </Text>
                    <Text style={{ margin: '0', fontSize: '12px', color: C.textBody, lineHeight: '1.7' }}>
                      {item.summary}
                    </Text>
                  </div>
                ))}
              </Section>
            )}

            {/* 툴 업데이트 */}
            {toolUpdates.length > 0 && (
              <Section style={{ backgroundColor: C.white, padding: '24px 32px', marginTop: '8px' }}>
                <Badge bg={C.tealLight} color={C.tealMid}>🔧 툴 업데이트</Badge>
                {toolUpdates.map((item, i) => (
                  <ArticleItem key={i} item={item} isLast={i === toolUpdates.length - 1} linkLabel="자세히 보기" />
                ))}
              </Section>
            )}

            {/* 읽을 만한 글 */}
            {readings.length > 0 && (
              <Section style={{ backgroundColor: C.white, padding: '24px 32px', marginTop: '8px' }}>
                <Badge bg={C.tealLight} color={C.tealMid}>📖 읽을 만한 글</Badge>
                {readings.map((item, i) => (
                  <ArticleItem key={i} item={item} isLast={i === readings.length - 1} linkLabel="읽기" />
                ))}
              </Section>
            )}

            {/* 국내 소식 (선택) */}
            {domesticNews && (
              <Section style={{ backgroundColor: C.white, padding: '24px 32px', marginTop: '8px' }}>
                <Badge bg={C.tealLight} color={C.tealMid}>🇰🇷 국내 소식</Badge>
                <Text style={{ margin: '0', fontSize: '12px', color: C.textMuted, lineHeight: '1.7' }}>
                  {domesticNews}
                </Text>
              </Section>
            )}

            {/* 푸터 */}
            <Section style={{ backgroundColor: C.tealDark, padding: '24px 32px', marginTop: '8px', textAlign: 'center' }}>
              <Text style={{ margin: '0 0 12px', fontSize: '12px', color: '#ccfbf1', lineHeight: '1.8' }}>
                이번 주 뉴스레터 어떠셨나요?{'\n'}
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
    {
      title: 'Claude Code, 터미널을 직접 제어하게 됐어요',
      summary: '이제 AI가 코드를 짜는 것을 넘어, 터미널 명령어도 직접 실행할 수 있어요. 마치 옆에 개발자 동료가 앉아서 컴퓨터를 직접 조작해주는 느낌이에요.',
    },
    {
      title: 'GPT-5 출시 — 코딩 속도 40% 빨라졌어요',
      summary: 'OpenAI의 새 모델이 나왔어요. 코딩 테스트에서 이전 버전보다 40% 빠른 속도를 기록했고, 한국어 이해도도 크게 좋아졌다고 해요.',
    },
  ],
  toolUpdates: [
    {
      title: 'Cursor 0.45 — 자동완성이 더 똑똑해졌어요',
      summary: '긴 코드를 작성할 때 AI가 다음 줄을 미리 예측해주는 기능이 개선됐어요.',
      url: 'https://cursor.sh',
    },
  ],
  readings: [
    {
      title: '"혼자서 앱을 만드는 시대가 진짜로 왔다"',
      summary: '비개발자가 AI 툴로 실제 서비스를 만든 경험담. 어떤 도구를 어떻게 썼는지 단계별로 설명해요.',
      url: 'https://example.com',
    },
  ],
  domesticNews: '카카오가 자체 AI 코딩 어시스턴트 출시를 예고했어요. 한국어 코드 주석과 문서 작성에 특화됐다고 하네요.',
} satisfies NewsletterProps

export default NewsletterEmail
