import AwardForm from '../award-form'
import { createAwardAction } from '../actions'

export default function NewAwardPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">New award</h1>
      <AwardForm mode="create" action={createAwardAction} />
    </div>
  )
}
