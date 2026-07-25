import ClientForm from '../client-form'
import { createClientAction } from '../actions'

export default function NewClientPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">New client</h1>
      <ClientForm mode="create" action={createClientAction} />
    </div>
  )
}
