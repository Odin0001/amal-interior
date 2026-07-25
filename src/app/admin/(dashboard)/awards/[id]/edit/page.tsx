import { notFound } from 'next/navigation'
import { getAwardById } from '@/lib/db/queries'
import AwardForm from '../../award-form'
import { updateAwardAction } from '../../actions'

export default async function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const award = await getAwardById(id)
  if (!award) notFound()

  const boundUpdate = updateAwardAction.bind(null, id)

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Edit award</h1>
      <AwardForm mode="edit" action={boundUpdate} defaultValues={award} />
    </div>
  )
}
