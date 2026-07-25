'use client'

import { useActionState } from 'react'
import type { AwardFormState } from './actions'

const inputClass =
  'w-full border border-border bg-void px-3 py-2.5 text-sm focus:outline-none focus:border-frost/50'
const labelClass = 'block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5'

export type AwardDefaultValues = {
  year: string
  title_en: string
  title_ar: string
  org_en: string
  org_ar: string
}

export default function AwardForm({
  mode,
  action,
  defaultValues,
}: {
  mode: 'create' | 'edit'
  action: (prevState: AwardFormState, formData: FormData) => Promise<AwardFormState>
  defaultValues?: AwardDefaultValues
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-lg flex flex-col gap-6">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <div className="max-w-[160px]">
        <label htmlFor="year" className={labelClass}>
          Year
        </label>
        <input id="year" name="year" defaultValue={defaultValues?.year} className={inputClass} />
        {errors.year && <p className="text-red-600 text-xs mt-1">{errors.year[0]}</p>}
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
          <label htmlFor="org_en" className={labelClass}>
            Organization (English)
          </label>
          <input id="org_en" name="org_en" defaultValue={defaultValues?.org_en} className={inputClass} />
          {errors.org_en && <p className="text-red-600 text-xs mt-1">{errors.org_en[0]}</p>}
        </div>
        <div>
          <label htmlFor="org_ar" className={labelClass}>
            Organization (Arabic)
          </label>
          <input id="org_ar" name="org_ar" dir="rtl" defaultValue={defaultValues?.org_ar} className={inputClass} />
          {errors.org_ar && <p className="text-red-600 text-xs mt-1">{errors.org_ar[0]}</p>}
        </div>
      </div>

      <button
        disabled={pending}
        type="submit"
        className="self-start bg-frost text-void text-xs tracking-[0.25em] uppercase px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Saving…' : mode === 'create' ? 'Add award' : 'Save changes'}
      </button>
    </form>
  )
}
