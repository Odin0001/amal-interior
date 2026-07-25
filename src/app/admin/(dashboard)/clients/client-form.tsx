'use client'

import { useActionState } from 'react'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/constants'
import type { ClientFormState } from './actions'

const inputClass =
  'w-full border border-border bg-void px-3 py-2.5 text-sm focus:outline-none focus:border-frost/50'
const labelClass = 'block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5'

export type ClientDefaultValues = {
  name: string
  category: ProjectCategory
  logo_url?: string | null
}

export default function ClientForm({
  mode,
  action,
  defaultValues,
}: {
  mode: 'create' | 'edit'
  action: (prevState: ClientFormState, formData: FormData) => Promise<ClientFormState>
  defaultValues?: ClientDefaultValues
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-lg flex flex-col gap-6">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <div>
        <label htmlFor="name" className={labelClass}>
          Client name
        </label>
        <input id="name" name="name" defaultValue={defaultValues?.name} className={inputClass} />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
      </div>

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

      <div>
        <label htmlFor="logo" className={labelClass}>
          Logo {mode === 'edit' && '(leave empty to keep current)'}
        </label>
        {defaultValues?.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={defaultValues.logo_url} alt="" className="w-32 h-20 object-contain mb-2 border border-border bg-glass" />
        )}
        <input id="logo" name="logo" type="file" accept="image/*" className={inputClass} />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="self-start bg-frost text-void text-xs tracking-[0.25em] uppercase px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Saving…' : mode === 'create' ? 'Add client' : 'Save changes'}
      </button>
    </form>
  )
}
