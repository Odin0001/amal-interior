export const PROJECT_CATEGORIES = ['residential', 'commercial', 'governmental'] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
