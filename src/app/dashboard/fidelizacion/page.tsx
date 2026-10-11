'use client'

import { useState } from 'react'
import {
  HeartHandshake,
  QrCode,
  Gift,
  Share2,
  Users,
  Trophy,
  Copy,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

export default function FidelizacionPage() {
  const [copied, setCopied] = useState(false)

  const topReferrers = [
    { rank: 1, name: 'Mateo Morales Ruiz', code: 'MM-4422', referrals: 3, ltv: 18400, points: 1840, reward: '1 Profilaxis Gratis disponible' },
    { rank: 2, name: 'Laura Patricia Vega', code: 'LV-9921', referrals: 2, ltv: 12500, points: 1250, reward: 'Descuento 15% en Prótesis' },
    { rank: 3, name: 'Daniela Montes', code: 'DM-1104', referrals: 1, ltv: 7000, points: 700, reward: 'Kit de Higiene Premium' },
  ]

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://audenti.mx/registro?promo=FAMILIA2026')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Programa de Lealtad &amp; Red de Referidos
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Fidelización &amp; Recompensas</h1>
          <p className="text-xs text-slate-500 mt-0.5">Trazabilidad de pacientes embajadores, puntos por referidos y planes preventivos familiares.</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {copied ? '¡Enlace de Campaña Copiado!' : 'Copiar Enlace de Campaña'}
        </button>
      </div>

      {/* Tarjetas KPI de Fidelización */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pacientes Fieles</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">142</p>
          <span className="text-xs text-emerald-700 font-bold">57% de la base activa</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">LTV de Referidos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">$84,200 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <span className="text-xs text-amber-700 font-bold">Ventas generadas por boca a boca</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Beneficios Canjeados</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">28</p>
          <span className="text-xs text-slate-500 font-medium">Profilaxis y kits este trimestre</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tasa de Retención</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-emerald-700">88.4%</p>
          <span className="text-xs text-emerald-800 font-bold">Excelente retención clínica</span>
        </div>
      </div>

      {/* Ranking de Pacientes Embajadores */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Top Pacientes Embajadores (Ranking por LTV)</h2>
            <p className="text-xs text-slate-500">Pacientes que recomiendan la clínica a través de su código QR personal</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Posición</th>
                <th className="px-6 py-3.5">Paciente Embajador</th>
                <th className="px-6 py-3.5">Código QR</th>
                <th className="px-6 py-3.5">Referidos Convertidos</th>
                <th className="px-6 py-3.5">LTV Aportado</th>
                <th className="px-6 py-3.5 text-right">Recompensa Disponible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {topReferrers.map((r) => (
                <tr key={r.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                      r.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{r.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{r.name}</td>
                  <td className="px-6 py-4 font-mono font-bold text-amber-800 bg-amber-50/50 px-2 py-0.5 rounded-md inline-block my-3">
                    {r.code}
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">{r.referrals} pacientes nuevos</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${r.ltv.toLocaleString('es-MX')} MXN</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {r.reward}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
