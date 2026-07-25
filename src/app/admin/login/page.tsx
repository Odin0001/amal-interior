'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-void px-6">
      <form action={formAction} className="w-full max-w-sm border border-border bg-glass p-8">
        <h1 className="font-bold text-2xl mb-1">Amal Admin</h1>
        <p className="text-muted text-sm mb-8">Sign in to manage site content.</p>

        <label htmlFor="username" className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="w-full mb-4 border border-border bg-void px-3 py-2.5 text-sm focus:outline-none focus:border-frost/50"
        />

        <label htmlFor="password" className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full mb-6 border border-border bg-void px-3 py-2.5 text-sm focus:outline-none focus:border-frost/50"
        />

        {state?.error && <p className="text-red-600 text-sm mb-4">{state.error}</p>}

        <button
          disabled={pending}
          type="submit"
          className="w-full bg-frost text-void text-xs tracking-[0.25em] uppercase px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
