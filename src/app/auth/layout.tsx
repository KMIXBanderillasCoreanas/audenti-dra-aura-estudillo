import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión — AUDENTI',
  description: 'Accede a tu plataforma clínica dental',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#202D4C] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E3A033] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#202D4C] text-[24px]">dentistry</span>
            </div>
            <div className="text-left">
              <p className="font-headline text-[28px] font-bold text-white leading-none">AUDENTI</p>
              <p className="text-[#E3A033] text-[11px] font-semibold tracking-widest uppercase">Clinical Suite</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
