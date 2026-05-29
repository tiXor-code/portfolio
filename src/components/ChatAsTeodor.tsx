import { useRef, useState } from 'react'
import { streamChat, type ChatMsg } from '../lib/chatClient'

const API = import.meta.env.VITE_CHAT_API ?? '/api/chat'
const STARTERS = [
  'What is your experience with RAG?',
  'Are you available, and on what terms?',
  'Tell me about the trading bot',
  'Why hire you over another AI engineer?',
]
const FALLBACK = 'The chat is resting. Email me at contact@teodorlutoiu.com and I will reply within a day.'
const SESSION_CAP = 15

export default function ChatAsTeodor() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [howOpen, setHowOpen] = useState(false)
  const liveRef = useRef('')

  const userTurns = msgs.filter((m) => m.role === 'user').length
  const capped = userTurns >= SESSION_CAP

  async function send(text: string) {
    const q = text.trim()
    if (!q || busy || capped) return
    setDraft('')
    const next = [...msgs, { role: 'user' as const, content: q }]
    setMsgs([...next, { role: 'assistant', content: '' }])
    setBusy(true)
    liveRef.current = ''
    try {
      await streamChat(API, next, (delta) => {
        liveRef.current += delta
        setMsgs((cur) => {
          const copy = cur.slice()
          copy[copy.length - 1] = { role: 'assistant', content: liveRef.current }
          return copy
        })
      })
    } catch {
      setMsgs((cur) => {
        const copy = cur.slice()
        copy[copy.length - 1] = { role: 'assistant', content: FALLBACK }
        return copy
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex h-full min-h-[360px] flex-col">
      <div className="mono border-b border-line px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        Grounded in my public profile and repos. I answer in my own words and I will not make things up.
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {msgs.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="mono rounded-full border border-line px-3 py-1.5 text-[12px] text-ink-dim transition-colors hover:border-accent/40 hover:text-ink">
                {s}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <span className={'inline-block max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ' +
              (m.role === 'user' ? 'bg-accent/15 text-ink' : 'border border-line bg-base text-ink-dim')}>
              {m.content || (busy ? 'thinking...' : '')}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-line p-4">
        <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="flex gap-2">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} disabled={busy || capped}
            placeholder={capped ? 'Session limit reached. Email me at contact@teodorlutoiu.com' : 'Ask me about my work...'}
            className="mono flex-1 rounded-xl border border-line bg-panel-2 px-4 py-2.5 text-[13px] text-ink outline-none focus:border-accent/40" />
          <button type="submit" disabled={busy || capped || !draft.trim()}
            className="mono rounded-xl bg-accent px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-base disabled:opacity-50">
            Send
          </button>
        </form>
        <button onClick={() => setHowOpen((v) => !v)} className="mono mt-3 text-[11px] uppercase tracking-[0.12em] text-ink-faint hover:text-ink">
          How this is built {howOpen ? '-' : '+'}
        </button>
        {howOpen && (
          <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
            Retrieval over my public repos plus a curated profile, streamed from a small Vercel function. It is rate-limited and budget-capped, and it answers only from grounded facts. Source:{' '}
            <a href="https://github.com/tiXor-code/portfolio-chat" target="_blank" rel="noreferrer" className="text-ink-dim hover:text-accent">github.com/tiXor-code/portfolio-chat</a>.
          </p>
        )}
      </div>
    </div>
  )
}
