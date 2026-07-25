export const PROJECT_CATEGORIES = ['residential', 'hospitality', 'commercial', 'cultural'] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
