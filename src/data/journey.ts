export interface JourneyStop {
  period: string
  org: string
  role: string
  note: string
}

export const JOURNEY: JourneyStop[] = [
  {
    period: '2017 - 2022',
    org: 'University of Worcester',
    role: 'BSc Computer Games Design & Development',
    note: 'Dissertation on AI in games, written before the LLM wave. The interest started early.',
  },
  {
    period: '2023 - 2024',
    org: 'Play For Democracy / Arden',
    role: 'Producer & Game Designer',
    note: 'Shipped a mobile game with a team of eight. The work was invited to the European Parliament in Brussels.',
  },
  {
    period: '2024',
    org: 'Ubisoft',
    role: 'QA, Rainbow Six Siege',
    note: 'The foot in the door of a major studio. Learned what shipping at scale actually demands.',
  },
  {
    period: '2024 - Present',
    org: 'Electronic Arts',
    role: 'Assistant Content Producer, EA FC Ultimate Team',
    note: 'Data-driven content timing for a live game played by millions. On-time delivery, every cycle.',
  },
  {
    period: '2026 - Present',
    org: "Ministeru' Creativ",
    role: 'Founder · AI automation engineer',
    note: 'Four-person studio plus contractors, live since March 2026. Where the AI automation work meets paying clients. Co-founded JobMap on the side.',
  },
]
