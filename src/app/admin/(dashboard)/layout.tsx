import Link from 'next/link'
import { verifySession } from '@/lib/auth/dal'
import LogoutButton from '@/app/admin/logout-button'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/awards', label: 'Awards' },
]

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await verifySession()

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-glass p-6 flex flex-col gap-8">
        <p className="font-bold text-lg">AMAL Admin</p>
        <nav className="flex flex-row lg:flex-col gap-1 flex-1 flex-wrap">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-frost/80 hover:bg-surface hover:text-frost transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="flex-1 p-6 lg:p-10 max-w-5xl">{children}</main>
    </div>
  )
}
