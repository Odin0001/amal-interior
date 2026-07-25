import Link from 'next/link'
import { listClients } from '@/lib/db/queries'
import { deleteClientAction } from './actions'

export default async function AdminClientsPage() {
  const clients = await listClients()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-2xl">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="bg-frost text-void text-xs tracking-[0.2em] uppercase px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
        >
          New client
        </Link>
      </div>

      {clients.length === 0 ? (
        <p className="text-muted text-sm">No clients yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border">
          {clients.map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4">
              <div className="w-16 h-16 shrink-0 border border-border bg-glass flex items-center justify-center">
                {c.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logo_url} alt="" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-muted text-[9px] tracking-widest uppercase">No logo</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{c.name}</p>
                <p className="text-muted text-xs truncate">{c.category}</p>
              </div>
              <Link
                href={`/admin/clients/${c.id}/edit`}
                className="text-xs tracking-[0.15em] uppercase border border-border px-3 py-2 hover:border-frost/40 transition-colors"
              >
                Edit
              </Link>
              <form action={deleteClientAction.bind(null, c.id)}>
                <button
                  type="submit"
                  className="text-xs tracking-[0.15em] uppercase border border-border px-3 py-2 text-red-600 hover:border-red-600 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
