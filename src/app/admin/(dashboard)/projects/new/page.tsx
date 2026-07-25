import ProjectForm from '../project-form'
import { createProjectAction } from '../actions'

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">New project</h1>
      <ProjectForm mode="create" action={createProjectAction} />
    </div>
  )
}
