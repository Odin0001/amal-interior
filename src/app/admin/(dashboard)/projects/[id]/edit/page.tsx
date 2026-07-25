import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/db/queries'
import ProjectForm from '../../project-form'
import { updateProjectAction, deleteProjectImageAction } from '../../actions'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  const boundUpdate = updateProjectAction.bind(null, id)

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Edit project</h1>
      <ProjectForm mode="edit" action={boundUpdate} defaultValues={project} />

      {project.images.length > 0 && (
        <div className="max-w-2xl mt-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-3">Gallery images</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {project.images.map((img) => (
              <div key={img.id} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt="" className="w-full aspect-square object-cover border border-border" />
                <form action={deleteProjectImageAction.bind(null, id, img.id)} className="absolute top-1 right-1">
                  <button
                    type="submit"
                    className="bg-void/90 text-red-600 text-[10px] tracking-widest uppercase px-2 py-1 border border-border hover:border-red-600"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
