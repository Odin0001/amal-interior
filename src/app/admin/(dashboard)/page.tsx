import Link from 'next/link'
import { listProjects, listClients, listAwards } from '@/lib/db/queries'

export default async function AdminDashboardPage() {
  const [projects, clients, awards] = await Promise.all([listProjects(), listClients(), listAwards()])

  const cards = [
    { label: 'Projects', count: projects.length, href: '/admin/projects' },
    { label: 'Clients', count: clients.length, href: '/admin/clients' },
    { label: 'Awards', count: awards.length, href: '/admin/awards' },
  ]

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-border bg-glass p-6 hover:border-frost/40 transition-colors"
          >
            <p className="font-bold text-4xl mb-2">{card.count}</p>
            <p className="text-muted text-xs tracking-[0.2em] uppercase">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
