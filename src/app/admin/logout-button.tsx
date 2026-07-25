import { logout } from './actions'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="w-full border border-border text-muted text-xs tracking-[0.2em] uppercase px-3 py-2.5 hover:text-frost hover:border-frost/40 transition-colors"
      >
        Log out
      </button>
    </form>
  )
}
