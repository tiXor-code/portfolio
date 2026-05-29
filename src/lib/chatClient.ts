export interface ChatMsg { role: 'user' | 'assistant'; content: string }

export async function streamChat(
  url: string,
  messages: ChatMsg[],
  onDelta: (t: string) => void,
): Promise<string> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok || !res.body) throw new Error(`chat unavailable (${res.status})`)
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let full = ''
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    const text = dec.decode(value, { stream: true })
    if (text) { full += text; onDelta(text) }
  }
  return full
}
