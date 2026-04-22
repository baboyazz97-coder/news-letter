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
