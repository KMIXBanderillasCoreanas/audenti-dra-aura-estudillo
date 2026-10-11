'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [showPw, setShowPw]     = useState(false)
  const router  = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos. Verifica tus datos.'
        : err.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-[#1c1c17]">Bienvenido de regreso</h1>
        <p className="text-[14px] text-[#555f6f] mt-1">Ingresa tus credenciales para acceder al sistema clínico.</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[12px] font-bold uppercase tracking-wider text-[#514535]">
            Correo electrónico
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#837563] text-[20px]">
              mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="doctor@audenti.mx"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#E3A033] transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[12px] font-bold uppercase tracking-wider text-[#514535]">
            Contraseña
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#837563] text-[20px]">
              lock
            </span>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#E3A033] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#837563] hover:text-[#514535]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPw ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-[#514535] cursor-pointer">
            <input type="checkbox" className="accent-[#E3A033]" />
            Recordarme
          </label>
          <a href="/auth/reset-password" className="text-[13px] text-[#E3A033] font-semibold hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#E3A033] text-[#121c2a] font-headline font-bold text-[16px] hover:opacity-95 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              Ingresando...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">login</span>
              Iniciar Sesión
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e6e2da]" />
        <span className="text-[12px] text-[#837563]">O continúa con</span>
        <div className="flex-1 h-px bg-[#e6e2da]" />
      </div>

      {/* Google SSO */}
      <button
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
          })
        }}
        className="w-full py-3 rounded-xl border-2 border-[#e6e2da] text-[#1c1c17] text-[14px] font-semibold hover:bg-[#f7f3eb] transition-colors flex items-center justify-center gap-3"
      >
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
        Continuar con Google
      </button>

      <p className="text-center text-[12px] text-[#837563]">
        ¿No tienes cuenta?{' '}
        <a href="/auth/register" className="text-[#E3A033] font-semibold hover:underline">
          Solicitar acceso
        </a>
      </p>
    </div>
  )
}
