'use client'

import { useState } from 'react'
import { AudentiLogo } from '@/components/ui/AudentiLogo'
import { QrCode, Copy, Check, Share2, Sparkles, ExternalLink, Smartphone } from 'lucide-react'

interface DynamicQrWithLogoProps {
  url?: string
  title?: string
  subtitle?: string
  size?: number
  patientId?: string
  referralCode?: string
  showShareActions?: boolean
  className?: string
}

export function DynamicQrWithLogo({
  url = 'http://localhost:3000/welcome',
  title = 'Portal Audenti • PWA Digital',
  subtitle = 'Dra. Aura Estudillo — Red de Pacientes & Referidos',
  size = 200,
  patientId,
  referralCode = 'REF-AURA-2026',
  showShareActions = true,
  className = '',
}: DynamicQrWithLogoProps) {
  const [copied, setCopied] = useState(false)

  // Construct target link with referral parameter if provided
  const targetUrl = patientId
    ? `${url}?ref=${patientId}`
    : `${url}?ref=${referralCode}`

  // Generación matemática de matriz de módulos QR decorativa de alta fidelidad 21x21
  const modulesGrid = [
    // Fila 0 a 20 con patrones estables de esquina (Finders) y datos pseudo-aleatorios
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,1,0, 0, 1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1, 0, 1,1,0,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 0,1,1,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,0,1,0, 0, 1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,1,1, 0, 1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0, 0, 0,0,1,0,0, 0, 0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1, 1, 1,0,1,0,1, 1, 1,0,1,0,1,0,1],
    [0,1,0,1,0,1,0, 0, 0,0,0,0,0, 0, 0,1,0,1,0,1,0],
    [1,0,1,0,1,0,1, 1, 0,0,0,0,0, 1, 1,0,1,0,1,0,1],
    [0,1,0,1,0,1,0, 0, 0,0,0,0,0, 0, 0,1,0,1,0,1,0],
    [1,0,1,0,1,0,1, 1, 1,0,1,0,1, 1, 1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0, 0, 0,1,0,1,0, 0, 0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,1,0, 1, 0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1, 0, 1,1,0,0,1, 0, 1,0,1,1,0,1,1],
    [1,0,1,1,1,0,1, 0, 0,0,1,1,0, 1, 0,1,1,0,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,0,1,0, 0, 1,0,0,1,0,1,0],
    [1,0,0,0,0,0,1, 0, 0,1,1,0,1, 1, 0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,0,1,0,1,0,1],
  ]

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Audenti — Dra. Aura Estudillo',
        text: 'Únete o consulta tu expediente dental en la plataforma oficial de la Dra. Aura Estudillo:',
        url: targetUrl,
      }).catch(() => {})
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 text-center ${className}`}>
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wide mb-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Acceso PWA &amp; Red Familiar
        </div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      {/* Contenedor del Código QR con Logotipo Centrado */}
      <div className="relative inline-flex items-center justify-center p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner mx-auto group">
        <svg
          width={size}
          height={size}
          viewBox="0 0 210 210"
          className="rounded-lg bg-white p-2 shadow-xs"
        >
          {modulesGrid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              // Dejar espacio libre en el centro (filas 8-12, cols 8-12) para el Isotipo
              const isCenterHole = rIdx >= 8 && rIdx <= 12 && cIdx >= 8 && cIdx <= 12
              if (isCenterHole || cell === 0) return null

              return (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx * 10}
                  y={rIdx * 10}
                  width="10"
                  height="10"
                  fill="#0F172A"
                  rx="1.5"
                />
              )
            })
          )}
        </svg>

        {/* Isotipo Oficial AUDENTI incrustado en el centro del QR */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-amber-400 shadow-md flex items-center justify-center">
            <AudentiLogo variant="icon" size={44} />
          </div>
        </div>
      </div>

      {/* Código de referido / Folio */}
      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Enlace de Vinculación</span>
        <span className="font-mono font-bold text-slate-800 text-[11px] break-all">
          {targetUrl}
        </span>
      </div>

      {/* Acciones de compartir */}
      {showShareActions && (
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '¡Copiado!' : 'Copiar Link'}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartir QR
          </button>
        </div>
      )}
    </div>
  )
}
