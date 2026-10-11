import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <div className="pl-72">
        <Header />
        <main className="relative pt-20 bg-[#fdf9f1] min-h-screen px-8 py-6 w-full">
          {children}
        </main>
      </div>
    </>
  )
}
