import Link from 'next/link'
import { listAwards } from '@/lib/db/queries'
import { deleteAwardAction } from './actions'

export default async function AdminAwardsPage() {
  const awards = await listAwards()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-2xl">Awards</h1>
        <Link
          href="/admin/awards/new"
          className="bg-frost text-void text-xs tracking-[0.2em] uppercase px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
        >
          New award
        </Link>
      </div>

      {awards.length === 0 ? (
        <p className="text-muted text-sm">No awards yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border">
          {awards.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4">
              <p className="w-14 shrink-0 font-bold">{a.year}</p>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{a.title_en}</p>
                <p className="text-muted text-xs truncate">{a.org_en}</p>
              </div>
              <Link
                href={`/admin/awards/${a.id}/edit`}
                className="text-xs tracking-[0.15em] uppercase border border-border px-3 py-2 hover:border-frost/40 transition-colors"
              >
                Edit
              </Link>
              <form action={deleteAwardAction.bind(null, a.id)}>
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
