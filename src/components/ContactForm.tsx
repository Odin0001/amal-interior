'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/use-locale'

type FormState = 'idle' | 'loading' | 'success'

export default function ContactForm() {
  const { t } = useLocale()
  const f = t.form

  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    await new Promise((r) => setTimeout(r, 1600))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col justify-center min-h-[400px]">
        <div className="w-12 h-px bg-frost mb-8" />
        <p className="text-frost text-[11px] tracking-[0.3em] uppercase mb-6">
          {f.successLabel}
        </p>
        <h3 className="font-display font-bold text-frost text-3xl mb-4">
          {f.successTitle} {form.name.split(' ')[0]}.
        </h3>
        <p className="text-muted text-lg leading-relaxed max-w-sm">
          {f.successBody}
        </p>
        <p className="text-frost/40 text-xs tracking-[0.3em] uppercase mt-8">
          Amal Studio — New York
        </p>
      </div>
    )
  }

  const inputClass =
    'bg-transparent border-b border-border pb-3 text-frost placeholder:text-muted/40 text-sm focus:outline-none focus:border-frost transition-colors duration-300 w-full'

  const labelClass =
    'text-[10px] tracking-[0.3em] uppercase text-muted/60'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="flex flex-col gap-2.5">
          <label className={labelClass}>
            {f.fullName} <span className="text-frost">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={inputClass}
            placeholder="Elena Voss"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className={labelClass}>
            {f.email} <span className="text-frost">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="flex flex-col gap-2.5">
          <label className={labelClass}>{f.phone}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className={inputClass}
            placeholder="+1 (212) 000-0000"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className={labelClass}>
            {f.projectType} <span className="text-frost">*</span>
          </label>
          <select
            required
            value={form.projectType}
            onChange={(e) => set('projectType', e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-glass text-muted">
              {f.projectTypeSelect}
            </option>
            {f.projectTypes.map((type) => (
              <option key={type} value={type} className="bg-glass">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className={labelClass}>
          {f.aboutProject} <span className="text-frost">*</span>
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder={f.projectPlaceholder}
        />
      </div>

      <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
        <p className="text-[10px] text-muted/40 tracking-widest uppercase">
          {f.respondTime}
        </p>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="bg-frost text-void font-semibold text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-frost disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-3"
        >
          {state === 'loading' ? (
            <>
              <span className="w-4 h-4 border border-void/40 border-t-void rounded-full animate-spin" />
              {f.sending}
            </>
          ) : (
            f.sendMessage
          )}
        </button>
      </div>
    </form>
  )
}
