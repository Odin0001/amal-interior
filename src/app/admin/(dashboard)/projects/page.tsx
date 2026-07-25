import Link from 'next/link'
import { listProjects } from '@/lib/db/queries'
import { deleteProjectAction } from './actions'

export default async function AdminProjectsPage() {
  const projects = await listProjects()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-2xl">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-frost text-void text-xs tracking-[0.2em] uppercase px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted text-sm">No projects yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover_image_url} alt="" className="w-16 h-16 object-cover shrink-0 border border-border" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{p.title_en}</p>
                <p className="text-muted text-xs truncate">
                  {p.location_en} · {p.category} · {p.year}
                </p>
              </div>
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="text-xs tracking-[0.15em] uppercase border border-border px-3 py-2 hover:border-frost/40 transition-colors"
              >
                Edit
              </Link>
              <form action={deleteProjectAction.bind(null, p.id)}>
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
