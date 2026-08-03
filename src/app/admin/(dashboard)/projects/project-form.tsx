'use client'

import { useActionState } from 'react'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/constants'
import type { ProjectFormState } from './actions'

const inputClass =
  'w-full border border-border bg-void px-3 py-2.5 text-sm focus:outline-none focus:border-frost/50'
const labelClass = 'block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5'

export type ProjectDefaultValues = {
  category: ProjectCategory
  title_en: string
  title_ar: string
  location_en: string
  location_ar: string
  year: string
  description_en: string
  description_ar: string
  cover_image_url?: string
  featured?: boolean
}

export default function ProjectForm({
  mode,
  action,
  defaultValues,
}: {
  mode: 'create' | 'edit'
  action: (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>
  defaultValues?: ProjectDefaultValues
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-2xl flex flex-col gap-6">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? PROJECT_CATEGORIES[0]}
          className={inputClass}
        >
          {PROJECT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category[0]}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title_en" className={labelClass}>
            Title (English)
          </label>
          <input id="title_en" name="title_en" defaultValue={defaultValues?.title_en} className={inputClass} />
          {errors.title_en && <p className="text-red-600 text-xs mt-1">{errors.title_en[0]}</p>}
        </div>
        <div>
          <label htmlFor="title_ar" className={labelClass}>
            Title (Arabic)
          </label>
          <input
            id="title_ar"
            name="title_ar"
            dir="rtl"
            defaultValue={defaultValues?.title_ar}
            className={inputClass}
          />
          {errors.title_ar && <p className="text-red-600 text-xs mt-1">{errors.title_ar[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location_en" className={labelClass}>
            Location (English)
          </label>
          <input
            id="location_en"
            name="location_en"
            defaultValue={defaultValues?.location_en}
            className={inputClass}
          />
          {errors.location_en && <p className="text-red-600 text-xs mt-1">{errors.location_en[0]}</p>}
        </div>
        <div>
          <label htmlFor="location_ar" className={labelClass}>
            Location (Arabic)
          </label>
          <input
            id="location_ar"
            name="location_ar"
            dir="rtl"
            defaultValue={defaultValues?.location_ar}
            className={inputClass}
          />
          {errors.location_ar && <p className="text-red-600 text-xs mt-1">{errors.location_ar[0]}</p>}
        </div>
      </div>

      <div className="max-w-[200px]">
        <label htmlFor="year" className={labelClass}>
          Year
        </label>
        <input id="year" name="year" defaultValue={defaultValues?.year} className={inputClass} />
        {errors.year && <p className="text-red-600 text-xs mt-1">{errors.year[0]}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="description_en" className={labelClass}>
            Description (English)
          </label>
          <textarea
            id="description_en"
            name="description_en"
            rows={5}
            defaultValue={defaultValues?.description_en}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="description_ar" className={labelClass}>
            Description (Arabic)
          </label>
          <textarea
            id="description_ar"
            name="description_ar"
            dir="rtl"
            rows={5}
            defaultValue={defaultValues?.description_ar}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cover" className={labelClass}>
          Cover image {mode === 'edit' && '(leave empty to keep current)'}
        </label>
        {defaultValues?.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={defaultValues.cover_image_url} alt="" className="w-40 h-28 object-cover mb-2 border border-border" />
        )}
        <input id="cover" name="cover" type="file" accept="image/*" className={inputClass} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={defaultValues?.featured ?? false}
          className="size-4"
        />
        <label htmlFor="featured" className="text-sm text-frost cursor-pointer">
          Feature on homepage (shows in the top 3 featured projects)
        </label>
      </div>

      <div>
        <label htmlFor="gallery" className={labelClass}>
          Add gallery images
        </label>
        <input id="gallery" name="gallery" type="file" accept="image/*" multiple className={inputClass} />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="self-start bg-frost text-void text-xs tracking-[0.25em] uppercase px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Saving…' : mode === 'create' ? 'Create project' : 'Save changes'}
      </button>
    </form>
  )
}
