import { notFound } from 'next/navigation'
import { getClientById } from '@/lib/db/queries'
import ClientForm from '../../client-form'
import { updateClientAction } from '../../actions'

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClientById(id)
  if (!client) notFound()

  const boundUpdate = updateClientAction.bind(null, id)

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Edit client</h1>
      <ClientForm mode="edit" action={boundUpdate} defaultValues={client} />
    </div>
  )
}
