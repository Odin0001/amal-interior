import * as z from 'zod'
import { PROJECT_CATEGORIES } from '@/lib/constants'

export const projectSchema = z.object({
  category: z.enum(PROJECT_CATEGORIES, { error: 'Select a category.' }),
  title_en: z.string({ error: 'Title (English) is required.' }).trim().min(1, { error: 'Title (English) is required.' }),
  title_ar: z.string({ error: 'Title (Arabic) is required.' }).trim().min(1, { error: 'Title (Arabic) is required.' }),
  location_en: z.string({ error: 'Location (English) is required.' }).trim().min(1, { error: 'Location (English) is required.' }),
  location_ar: z.string({ error: 'Location (Arabic) is required.' }).trim().min(1, { error: 'Location (Arabic) is required.' }),
  year: z.string({ error: 'Year is required.' }).trim().min(4, { error: 'Enter a valid year.' }).max(4, { error: 'Enter a valid year.' }),
  description_en: z.string().trim().default(''),
  description_ar: z.string().trim().default(''),
  featured: z.boolean().default(false),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

export const clientSchema = z.object({
  name: z.string({ error: 'Client name is required.' }).trim().min(1, { error: 'Client name is required.' }),
  category: z.enum(PROJECT_CATEGORIES, { error: 'Select a category.' }),
})

export type ClientFormValues = z.infer<typeof clientSchema>

export const awardSchema = z.object({
  year: z.string({ error: 'Year is required.' }).trim().min(4, { error: 'Enter a valid year.' }).max(4, { error: 'Enter a valid year.' }),
  title_en: z.string({ error: 'Title (English) is required.' }).trim().min(1, { error: 'Title (English) is required.' }),
  title_ar: z.string({ error: 'Title (Arabic) is required.' }).trim().min(1, { error: 'Title (Arabic) is required.' }),
  org_en: z.string({ error: 'Organization (English) is required.' }).trim().min(1, { error: 'Organization (English) is required.' }),
  org_ar: z.string({ error: 'Organization (Arabic) is required.' }).trim().min(1, { error: 'Organization (Arabic) is required.' }),
})

export type AwardFormValues = z.infer<typeof awardSchema>

export const loginSchema = z.object({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  password: z.string().min(1, { error: 'Password is required.' }),
})
