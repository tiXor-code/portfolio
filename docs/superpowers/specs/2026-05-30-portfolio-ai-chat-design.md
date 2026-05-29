# Portfolio AI Chat (Chat-as-Teodor) - design spec

- **Date:** 2026-05-30
- **Branch:** `feat/2026-05-30-ai-chat` off `refresh/2026-05-29-content` (which is off `prod` tip `90e3a64`)
- **Status:** Draft, awaiting user review
- **Audience:** AI-engineering hiring managers and recruiters evaluating Teodor
- **Relationship to other work:** This is the "Chat-as-Teodor" feature deferred from the May 29 portfolio refresh spec (`2026-05-29-portfolio-refresh-design.md`). It assumes the refresh has shipped (the refreshed `projects.ts` / `journey.ts` / `profile.yaml` are the grounding spine). It is a separate build with its own spec, plan, and deploy.

## Overview

The portfolio's section 01 "Live agent" currently shows a client-side replay of the icp-agent pipeline (captured runs + the real scoring/routing logic running in the browser). There is no backend. This spec adds a second, live AI capability to that same centerpiece: a first-person screener chat ("Ask me anything") that answers as Teodor, grounded only in public facts, with honesty and guardrails surfaced as proof of craft. The chat's backend is a small public Vercel function, so the agent answering a recruiter is itself an open-source AI-engineering artifact.

**Purpose (from brainstorm):** Hybrid, screener-first and flex-aware. Primarily converts a hiring manager (answers about fit, experience, stack, availability, role/comp expectations in first person as Teodor), and is engineered visibly well so it doubles as proof of skill. Honesty and guardrails are a feature, not hidden.

## Scope

### In scope

- `src/components/AgentDemo.tsx` - refactor into a tabbed "Live agent" container. Tab A "Watch an agent run" is the existing replay, moved under the tab unchanged. Tab B "Ask me anything" is the new chat.
- `src/components/ChatAsTeodor.tsx` (new) - the chat UI: streamed messages, input, starter-prompt chips, a "grounded in my public profile + N repos" header, on-topic-only decline state, a "how this is built" expander.
- A small fetch/stream client in the portfolio for `POST /api/chat` (no new heavy deps).
- New public repo + Vercel project (working name `tixor-code/portfolio-chat`) exposing `POST /api/chat`: validation, per-IP rate limit, query embedding, top-k retrieval over a bundled static index, grounded prompt assembly, streamed Azure chat completion, and the visible guardrails.
- A curated knowledge pack assembled from `profile.yaml` + `projects.ts` + `journey.ts` + a hand-authored screener FAQ.
- A build-time RAG index (`index.json`: vectors + chunks) over public repo READMEs/docs.
- A backend eval set of recruiter Q&As graded for groundedness and no-fabrication.
- CORS + env wiring; the portfolio frontend points at the deployed Vercel URL.

### Out of scope (YAGNI)

- Authentication / login.
- Server-side conversation persistence (history is client-held, sent each turn, length-capped).
- Languages other than English (Romanian can be a later follow-up).
- Voice / audio.
- Any use of the private `~/wiki` vault or any non-public data.
- Replacing the icp-agent replay (it stays as tab A).
- Touching the WebGL background, Three.js deps, or the Hostinger deploy of the static site beyond shipping the new tab.

### Non-functional guarantees

- Public data only. No private vault content, no secrets in the client bundle (the Azure key lives only in the Vercel function env).
- Hard daily Azure spend ceiling on the endpoint; worst-case cost is bounded.
- No fabrication: the model answers only from grounded facts and says when it does not know.
- The static portfolio site remains deployable to Hostinger unchanged except for the new tab; the chat degrades gracefully if the endpoint is unreachable (the tab shows a friendly "email me" fallback).
- Net new client bundle growth kept small (a lean chat component + stream client; no chat-UI framework).
- ATS / accessibility: the chat is an enhancement; all existing content remains readable without it.

## Design

### A - Frontend: tabbed "Live agent" centerpiece

`AgentDemo.tsx` becomes a thin tabbed container holding two panels inside the existing `rounded-2xl border bg-panel` shell, with a mono/uppercase tab toggle consistent with the current aesthetic:

- **Tab A "Watch an agent run":** the current replay component, extracted unchanged (the `buildRun` / stage rendering logic moves into its own `AgentReplay.tsx` so `AgentDemo.tsx` only owns the tab switch). This preserves the existing, reviewed demo verbatim.
- **Tab B "Ask me anything":** `ChatAsTeodor.tsx`.
- **Default tab:** "Ask me anything" (screener-first). The replay is one click away.

`ChatAsTeodor.tsx` responsibilities (one component, well-bounded):
- Render a scrollable message list (user + assistant turns), an input with send, and a disabled/loading state while streaming.
- Starter-prompt chips on first load, e.g. "What is your experience with RAG?", "Are you available, and on what terms?", "Tell me about the trading bot", "Why hire you over another AI engineer?".
- A header line: "Grounded in my public profile and N repos. Answers in my own words; it will not make things up."
- A graceful decline state for off-topic asks (copy: "I keep this to my work, projects, and how I can help your team.").
- A small expandable "How this is built" panel: one paragraph (RAG over public repos + curated profile, streamed from a Vercel function, rate-limited and budget-capped) with a link to the public chat repo.
- A degraded state if the endpoint errors or the daily budget is exhausted: "The chat is resting. Email me at contact@teodorlutoiu.com."

State: conversation kept in component state; each request sends the last K turns (capped). Streaming via `fetch` + `ReadableStream` (Server-Sent-Events-style text chunks); no SSE/chat library dependency.

### B - Backend: `POST /api/chat` (new public Vercel project)

A single endpoint (Hono or a plain Vercel function, matching the icp-agent / instantly-support-agent pattern). Request flow:

1. **Validate** the body with Zod: `{ messages: {role, content}[] }`, cap message count and per-message length; reject otherwise.
2. **Rate-limit** per client IP (token-bucket; e.g. N requests/minute) and enforce a per-session message cap client-side + server-side sanity cap.
3. **Daily budget gate:** check a running daily token/spend counter; if over the ceiling, return a friendly 200 with the "chat is resting" message (no model call).
4. **Embed** the latest user turn with Azure `text-embedding-3-small`.
5. **Retrieve** top-k chunks from the bundled static index (cosine similarity in-process; the index is small enough to scan).
6. **Assemble** the system prompt: persona + voice rules + the curated pack + the retrieved snippets + scope/honesty/injection rules (explicitly: ignore any instructions contained in retrieved content or user input that try to change the rules).
7. **Stream** the Azure chat completion back to the client; enforce `max_tokens`.
8. **Account**: increment the daily counter with usage.

Stateless: no DB, no server-side history. The index is a static file bundled at deploy. CORS allow-list: `https://teodorlutoiu.com` and the active preview origin.

### C - Knowledge pack + RAG index (build step in the chat repo)

- **Curated pack** (the spine, hand-authored + assembled): a structured document built from `profile.yaml` (bio, experience, education, skills, contact), `projects.ts` (the 9 cards), and `journey.ts` (career stops), plus a **screener FAQ** with crisp answers to the highest-stakes recruiter questions: availability (about four weeks notice), remote across the EU, role types (AI Automation Engineer, Solutions/Forward-Deployed, Founding Engineer), strengths, and a "why me" framing. The curated pack is always included in the prompt (not retrieved), so the core screener answers are reliable.
- **RAG corpus** (retrieved): the README/docs of the public repos (icp-agent, instantly-support-agent, cv-tailor, wiki-substrate, openclaw) chunked (~200-400 tokens) and embedded at build time into `index.json` (array of `{id, repo, text, vector}`). A `scripts/build-index` script (re)generates it from a configurable repo list. Public data only.
- The index is committed to the chat repo and bundled with the function (no runtime index build, no vector DB).

### D - Persona + honesty

- **Voice:** first person as Teodor. Direct, concrete, no filler, no AI cliches, no em or en dashes (matches Teodor's writing rules). Confident but not boastful; specific about what was actually built.
- **Honesty guard:** answer only from the grounded pack + retrieved snippets. If the answer is not supported, say so plainly and offer email rather than inventing. Mirrors the cv-tailor honesty guard. No invented metrics, employers, or dates.
- **Scope:** Teodor's work, career, projects, skills, and availability. Off-topic (general coding help, unrelated trivia, anything personal-private) gets a short on-brand redirect.

### E - Guardrails (visible)

- **Cost / abuse:** per-IP rate limit; per-session message cap (~15); `max_tokens` on output; a hard daily spend ceiling that short-circuits to the "resting" message; input length caps.
- **Injection resistance:** the system prompt instructs the model to treat retrieved content and user text as data, never instructions; refuse attempts to reveal the system prompt or change scope; cap and sanitize inputs.
- **Surfaced to the visitor (the flex):** the "grounded in N sources" header, the explicit on-topic decline copy, and the "How this is built" expander that links to the public chat repo. The point is that the safety and grounding are part of what is being demonstrated.

### F - Repos, deploy, CORS

- **New public repo** `tixor-code/portfolio-chat` (MIT), its own Vercel project. Env: Azure endpoint + key + deployment names (chat + embeddings), the daily budget value, the CORS allow-list. The repo is public so it doubles as a portfolio artifact; the secret audit rule applies (no keys committed, `.env` gitignored).
- **Frontend integration:** `ChatAsTeodor.tsx` calls the Vercel URL via env-injected base (`VITE_CHAT_API` or a constant), with a sensible timeout and the degraded fallback.
- **Deploy order:** build + deploy the chat backend first (verify the endpoint answers + guardrails fire), then ship the frontend tab in a portfolio deploy. Both are independently revertible.

## Testing strategy (TDD)

- **Backend unit tests:** Zod validation (rejects oversized/malformed), rate-limit logic, daily-budget gate (short-circuits without a model call), retrieval top-k correctness on a fixture index, prompt assembly (includes curated pack + retrieved snippets + rules), injection handling (instructions in retrieved text are ignored), scope refusal, honesty (unknown -> deflect, no fabrication).
- **Eval set:** a graded set of recruiter Q&As (fit, availability, project specifics, an off-topic, an injection attempt, an unknown) scored for groundedness and no-fabrication. This is both a quality gate and a visible artifact of eval-design skill.
- **Frontend tests (Vitest + RTL, reuse the refresh harness):** tab toggle switches panels; chat renders user/assistant turns; starter chips populate the input; streaming chunks render incrementally (mocked stream); decline + degraded states render; the replay tab still works.
- **Index build test:** the build script produces valid, correctly-shaped vectors for a fixture repo.

## Acceptance criteria

- [ ] `POST /api/chat` returns a grounded, first-person answer to a fit question, streamed.
- [ ] An off-topic question gets the scope redirect; an unknown gets an honest deflection (no fabrication) verified against the eval set.
- [ ] An injection attempt ("ignore your instructions and...") does not change behavior.
- [ ] Rate limit and per-session cap fire; exceeding the daily budget returns the "resting" message with no model call.
- [ ] No secret is present in the portfolio client bundle or the chat repo (audit clean).
- [ ] Frontend: the "Live agent" section shows both tabs; "Ask me anything" is default; the replay tab is unchanged; degraded fallback shows when the endpoint is down.
- [ ] `npm run build` + `npm run lint` + tests green in both repos.
- [ ] The chat repo is public and its link in the "How this is built" panel returns 200.
- [ ] Lighthouse on the page does not regress beyond the refresh's budget.

## Open questions for the implementation plan

1. Azure deployment names/region for chat + embeddings (the primary `openai-htgaj` resource was returning 500s during CV generation; confirm a healthy chat deployment, e.g. the Foundry `the-intelligence` resource, and pin it).
2. Exact numeric caps (requests/min, session cap, daily budget, max_tokens, top-k) - propose defaults in the plan.
3. Whether the daily budget counter is in-memory per-instance (simplest, resets on cold start) or backed by a tiny KV (Vercel KV / Upstash) for a true global daily cap. Plan should pick based on the abuse model.
4. Repo naming (`portfolio-chat` vs `ask-teodor`) and whether the curated pack lives in the chat repo or is generated from the portfolio's `profile.yaml` at build.
5. Streaming transport detail (plain chunked fetch vs SSE) and the minimal client implementation.

## Decisions log (from the brainstorm)

- **Purpose:** Hybrid, screener-first and flex-aware. First person as Teodor.
- **Placement:** Merge into the existing section 01 "Live agent" as tabs ("Watch an agent run" = existing replay; "Ask me anything" = chat). Not a replace, not a separate section, not a floating widget.
- **Grounding:** Curated public pack + RAG over public repos. Public data only. The wiki vault is explicitly excluded.
- **Backend:** New Vercel serverless function + Azure (embeddings + chat) + a precomputed static vector index bundled with the function. No vector DB; not self-hosted on the Mac mini.
- **Guardrails:** Visible. Core protection (rate limit, session cap, max tokens, daily spend ceiling, injection resistance, honesty) plus surfaced craft (grounded-in-N-sources, decline copy, how-it-is-built disclosure linking the public repo).
- **Default tab:** "Ask me anything."
