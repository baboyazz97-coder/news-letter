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
