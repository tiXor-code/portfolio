import { describe, it, expect, vi } from 'vitest'
import { streamChat } from '../../src/lib/chatClient'

function mockResponse(chunks: string[]) {
  const enc = new TextEncoder()
  return {
    ok: true,
    body: new ReadableStream({ start(c) { chunks.forEach((t) => c.enqueue(enc.encode(t))); c.close() } }),
  } as Response
}

describe('streamChat', () => {
  it('invokes onDelta for each streamed chunk and resolves the full text', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => mockResponse(['Hel', 'lo'])))
    const out: string[] = []
    const full = await streamChat('https://x/api/chat', [{ role: 'user', content: 'hi' }], (t) => out.push(t))
    expect(out).toEqual(['Hel', 'lo'])
    expect(full).toBe('Hello')
  })
  it('throws a friendly error on a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 429 }) as Response))
    await expect(streamChat('https://x/api/chat', [{ role: 'user', content: 'hi' }], () => {})).rejects.toThrow()
  })
})
