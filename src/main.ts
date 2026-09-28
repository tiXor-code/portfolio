import './style.css'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches
const EMAIL = 'contact@teodorlutoiu.com'

function $<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing #${id}`)
  return el as T
}

/* Hero: the rotating highlighted word */
function startRotatingWord(): void {
  const rot = document.getElementById('rot')
  if (!rot || reduce) return
  const items = Array.from(rot.children) as HTMLElement[]
  let i = 0
  window.setInterval(() => {
    const cur = items[i]
    const next = items[(i + 1) % items.length]
    cur.className = 'out'
    next.className = 'on'
    window.setTimeout(() => { if (cur.className === 'out') cur.className = '' }, 600)
    i = (i + 1) % items.length
  }, 2000)
}

/* Work: a wall of index cards. Messy by default, tidy on demand, drag to move, click to flip. */
const board = $('board')
const tiles = Array.from(board.querySelectorAll<HTMLElement>('.tile'))
const tidyBtn = $<HTMLButtonElement>('tidy')
let tidy = false
let zTop = 20
// Room a messy card needs beside and below it: its tilt, the taped sticky note
// hanging off its corner, and the tape strip on top.
const MESSY_GAP_X = 40
const MESSY_GAP_Y = 58

function place(t: HTMLElement, x: number, y: number, r: number): void {
  t.style.left = `${Math.round(x)}px`
  t.style.top = `${Math.round(y)}px`
  t.style.setProperty('--r', `${r}deg`)
  t.style.setProperty('--dx', '0px')
  t.style.setProperty('--dy', '0px')
  t.dataset.dx = '0'
  t.dataset.dy = '0'
}

function layoutBoard(): void {
  const W = board.clientWidth
  const tw = tiles[0].offsetWidth
  const th = tiles[0].offsetHeight
  const narrow = W < 560
  let H: number
  if (tidy) {
    const gap = narrow ? 18 : 30
    const cols = Math.max(1, Math.floor((W + gap) / (tw + gap)))
    const rows = Math.ceil(tiles.length / cols)
    const off = (W - (cols * tw + (cols - 1) * gap)) / 2
    tiles.forEach((t, i) => place(t, off + (i % cols) * (tw + gap), Math.floor(i / cols) * (th + gap + 8), 0))
    H = rows * (th + gap + 8) + 10
  } else if (narrow) {
    const rowH = th + 22
    tiles.forEach((t, i) => {
      const c = i % 2
      const r = Math.floor(i / 2)
      const jx = ((i * 37) % 9) - 4
      const jy = ((i * 53) % 11) - 5
      const rot = ((i * 29) % 7) - 3
      place(t, c ? W - tw - Math.abs(jx) : Math.abs(jx), r * rowH + (c ? th * 0.5 : 0) + jy, rot)
    })
    H = Math.ceil(tiles.length / 2) * rowH + th * 0.5 + 30
  } else {
    // Messy, but never overlapping: one card per cell, jittered and tilted inside it.
    const cols = Math.max(2, Math.floor((W + MESSY_GAP_X) / (tw + MESSY_GAP_X)))
    const cellW = W / cols
    const cellH = th + MESSY_GAP_Y
    const free = Math.max(0, cellW - tw - MESSY_GAP_X)
    const drop = cellH * 0.12
    tiles.forEach((t, i) => {
      const c = i % cols
      const r = Math.floor(i / cols)
      const jx = free * (((i * 37) % 10) / 10)
      const jy = ((i * 53) % 13) - 6 + (c % 2 ? drop : 0)
      const rot = ((i * 29) % 11) - 5
      place(t, c * cellW + jx + MESSY_GAP_X / 2, r * cellH + jy + 14, rot)
    })
    H = Math.ceil(tiles.length / cols) * cellH + drop + 24
  }
  board.style.height = `${Math.round(H)}px`
}

function flip(t: HTMLElement): void {
  t.classList.toggle('flipped')
  t.style.zIndex = String(++zTop)
}

tidyBtn.addEventListener('click', () => {
  tidy = !tidy
  tidyBtn.textContent = tidy ? 'Make a mess' : 'Tidy up'
  tidyBtn.setAttribute('aria-pressed', String(tidy))
  tiles.forEach((t) => t.classList.remove('flipped'))
  layoutBoard()
  window.setTimeout(buildStoryPath, 800)
})

tiles.forEach((t) => {
  let sx = 0, sy = 0, ox = 0, oy = 0
  let down = false, moved = false
  t.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('a')) return
    down = true
    moved = false
    sx = e.clientX
    sy = e.clientY
    ox = Number(t.dataset.dx) || 0
    oy = Number(t.dataset.dy) || 0
    if (finePointer) {
      try { t.setPointerCapture(e.pointerId) } catch { /* pointer already released */ }
    }
  })
  t.addEventListener('pointermove', (e) => {
    if (!down || !finePointer) return
    const dx = e.clientX - sx
    const dy = e.clientY - sy
    if (!moved && Math.hypot(dx, dy) > 6) {
      moved = true
      t.classList.add('dragging')
      t.style.zIndex = String(++zTop)
    }
    if (moved) {
      t.dataset.dx = String(ox + dx)
      t.dataset.dy = String(oy + dy)
      t.style.setProperty('--dx', `${ox + dx}px`)
      t.style.setProperty('--dy', `${oy + dy}px`)
    }
  })
  t.addEventListener('pointerup', () => {
    if (!down) return
    down = false
    if (moved) { t.classList.remove('dragging'); return }
    flip(t)
  })
  t.addEventListener('pointercancel', () => {
    down = false
    moved = false
    t.classList.remove('dragging')
  })
  t.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(t) }
  })
})

/* Numbers: count up once when they scroll into view, from a readable resting state */
function countUp(b: HTMLElement): void {
  const to = Number(b.dataset.to)
  const pre = b.dataset.pre ?? ''
  const suf = b.dataset.suf ?? ''
  const t0 = performance.now()
  const dur = 1300
  const step = (now: number): void => {
    const p = Math.min(1, (now - t0) / dur)
    const e = 1 - Math.pow(1 - p, 3)
    b.textContent = `${pre}${Math.round(to * e)}${suf}`
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const stamp = $('stamp')
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      io.unobserve(en.target)
      if (en.target === stamp) stamp.classList.add('thunk')
      else countUp(en.target as HTMLElement)
    })
  }, { threshold: 0.55 })
  document.querySelectorAll<HTMLElement>('[data-to]').forEach((b) => io.observe(b))
  io.observe(stamp)
}

/* Hand-drawn circles start drawing only once they are on screen */
const doodles = document.querySelectorAll<HTMLElement>('.circ, .ringwrap')
if ('IntersectionObserver' in window && !reduce) {
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      en.target.classList.add('inview')
      seen.unobserve(en.target)
    })
  }, { threshold: 0.6 })
  doodles.forEach((d) => seen.observe(d))
} else {
  doodles.forEach((d) => d.classList.add('inview'))
}

/* Story: a marker line that draws itself through the pins as you scroll */
const story = $('story')
const storySvg = document.getElementById('storySvg') as SVGSVGElement | null
const storyLine = document.getElementById('storyLine') as SVGPathElement | null
const pins = Array.from(story.querySelectorAll<HTMLElement>('.pin'))
let lineLength = 0
let pinYs: number[] = []

function buildStoryPath(): void {
  if (!storySvg || !storyLine) return
  const r = story.getBoundingClientRect()
  const w = story.clientWidth
  const h = story.clientHeight
  storySvg.setAttribute('width', String(w))
  storySvg.setAttribute('height', String(h))
  storySvg.setAttribute('viewBox', `0 0 ${w} ${h}`)
  const centres = pins.map((p) => {
    const b = p.getBoundingClientRect()
    return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top] as [number, number]
  })
  if (centres.length < 2) return
  const pts: Array<[number, number]> = []
  centres.forEach((c, i) => {
    pts.push(c)
    if (i < centres.length - 1) {
      const vb = (pins[i].parentNode as HTMLElement).getBoundingClientRect()
      pts.push([c[0], vb.bottom - r.top - 24])
    }
  })
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 4.5
    const c1y = p1[1] + (p2[1] - p0[1]) / 4.5
    const c2x = p2[0] - (p3[0] - p1[0]) / 4.5
    const c2y = p2[1] - (p3[1] - p1[1]) / 4.5
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  storyLine.setAttribute('d', d)
  lineLength = storyLine.getTotalLength()
  storyLine.style.strokeDasharray = `${lineLength} ${lineLength}`
  pinYs = centres.map((c) => c[1])
  drawStory()
}

function drawStory(): void {
  if (!lineLength || !storyLine) return
  if (reduce) {
    storyLine.style.strokeDashoffset = '0'
    pins.forEach((p) => p.classList.add('lit'))
    return
  }
  const r = story.getBoundingClientRect()
  const reach = window.innerHeight * 0.6 - r.top
  const first = pinYs[0]
  const last = pinYs[pinYs.length - 1]
  const p = Math.max(0, Math.min(1, (reach - first) / Math.max(1, last - first)))
  storyLine.style.strokeDashoffset = (lineLength * (1 - p)).toFixed(1)
  pins.forEach((pin, i) => pin.classList.toggle('lit', reach >= pinYs[i] - 4))
}

/* Talk: pick a note for my answer, or write your own and it opens as an email to me */
const desk = $('desk')
const qnotes = $('qnotes')
const askForm = $<HTMLFormElement>('ask')
const askInput = $<HTMLInputElement>('q')
const ANSWERS: Record<string, string> = {
  'What have you shipped?': "An AI search agent: on one live site, 51 of 55 target searches are now cited by AI assistants like ChatGPT and Gemini. Also a lead qualifier, a support reply agent that only answers when it's confident, and the watchdogs that keep 33 systems running.",
  'Are you available?': "Yes. AI build work right now, and the right full-time role with about four weeks' notice. Remote across the EU, from Bucharest.",
  'Can you build something for us?': "Probably. Tell me the process that eats your team's time and I'll tell you honestly whether AI helps. You get a running system and the code.",
}
let writing = false

function lockNotes(v: boolean): void {
  qnotes.querySelectorAll<HTMLButtonElement>('button').forEach((b) => { b.disabled = v })
}

function passNote(question: string, colour: string, answer: string): void {
  if (writing) return
  writing = true
  lockNotes(true)
  const pair = document.createElement('div')
  pair.className = 'pair fly'
  const qc = document.createElement('div')
  qc.className = `qcard${colour && colour !== 'y' ? ` ${colour}` : ''}`
  qc.textContent = question
  const ac = document.createElement('div')
  ac.className = 'acard typing'
  pair.append(qc, ac)
  desk.insertBefore(pair, desk.firstChild)
  while (desk.children.length > 3) desk.lastElementChild?.remove()
  const words = answer.split(' ')
  let i = 0
  const step = (): void => {
    if (i === 0) ac.classList.remove('typing')
    if (i >= words.length) {
      const sig = document.createElement('span')
      sig.className = 'sig'
      sig.textContent = 'T.'
      ac.appendChild(sig)
      writing = false
      lockNotes(false)
      return
    }
    ac.appendChild(document.createTextNode((i ? ' ' : '') + words[i++]))
    window.setTimeout(step, reduce ? 0 : 28 + Math.random() * 34)
  }
  window.setTimeout(step, reduce ? 0 : 700)
}

qnotes.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest('button')
  if (!b || b.disabled) return
  const q = b.textContent ?? ''
  passNote(q, b.dataset.c ?? 'y', ANSWERS[q] ?? '')
})

askForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const note = askInput.value.trim()
  if (!note) return
  askInput.value = ''
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent('A note from teodorlutoiu.com')}&body=${encodeURIComponent(note)}`
  passNote(note, 'y', `Thanks! Your email app should now open with this note, addressed to me. If it didn't, write to ${EMAIL} and I'll reply within a day.`)
  window.location.href = href
})

/* Contact: copy the address, with a select-the-text fallback */
const copyBtn = $<HTMLButtonElement>('copy')
const mail = $('mail')
copyBtn.addEventListener('click', () => {
  const done = (): void => {
    copyBtn.textContent = 'Copied'
    window.setTimeout(() => { copyBtn.textContent = 'Copy address' }, 1800)
  }
  const selectText = (): void => {
    const range = document.createRange()
    range.selectNodeContents(mail)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    copyBtn.textContent = 'Selected, press copy'
  }
  if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, selectText)
  else selectText()
})

/* Floating "Say hi" button, shown between the hero and the talk section */
const sayhi = $('sayhi')
const hero = $('top')
const talk = $('talk')
const contact = $('contact')
function onScroll(): void {
  const vh = window.innerHeight
  const tr = talk.getBoundingClientRect()
  const inTalk = tr.top < vh * 0.7 && tr.bottom > vh * 0.3
  const atEnd = contact.getBoundingClientRect().top < vh * 0.85
  sayhi.classList.toggle('show', hero.getBoundingClientRect().bottom < 0 && !inTalk && !atEnd)
  drawStory()
}

function relayout(): void {
  layoutBoard()
  buildStoryPath()
}

startRotatingWord()
window.addEventListener('scroll', onScroll, { passive: true })
let resizeTimer = 0
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(relayout, 120)
})
relayout()
onScroll()
document.fonts?.ready.then(relayout)
window.addEventListener('load', relayout)
