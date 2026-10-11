'use client'

import { useState } from 'react'
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  Database,
  TrendingUp,
  UserCheck,
  Activity,
  ArrowDownToLine
} from 'lucide-react'

export default function ReportesPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const triggerExport = (format: string) => {
    setDownloading(format)
    const link = document.createElement('a')
    link.href = `/api/export?format=${format}`
    link.download = ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(null), 1000)
  }

  const services = [
    { category: 'Ortodoncia / Alineadores', income: 86400, pct: 34, count: 14 },
    { category: 'Implantología',            income: 54000, pct: 21, count: 9  },
    { category: 'Prótesis / Rehabilitación',income: 42000, pct: 16, count: 6  },
    { category: 'Estética Dental',          income: 29000, pct: 11, count: 12 },
    { category: 'Endodoncia',               income: 28500, pct: 11, count: 15 },
    { category: 'Prevención / Profilaxis',  income: 18000, pct: 7,  count: 30 },
  ]

  const total = services.reduce((s, i) => s + i.income, 0)

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header con Botones de Descarga Reales */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Analítica Financiera &amp; Exportaciones
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Reportes &amp; Desempeño Clínico</h1>
          <p className="text-xs text-slate-500 mt-0.5">Rentabilidad por servicio, cálculo de comisiones y exportación funcional multi-formato.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => triggerExport('word')}
            disabled={downloading === 'word'}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            {downloading === 'word' ? 'Generando...' : 'Word (.doc)'}
          </button>
          <button
            type="button"
            onClick={() => triggerExport('excel')}
            disabled={downloading === 'excel'}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            {downloading === 'excel' ? 'Generando...' : 'Excel (.xls)'}
          </button>
          <button
            type="button"
            onClick={() => triggerExport('csv')}
            disabled={downloading === 'csv'}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs"
          >
            <FileCode className="w-4 h-4 text-amber-600" />
            {downloading === 'csv' ? 'Generando...' : 'CSV Dump'}
          </button>
          <button
            type="button"
            onClick={() => triggerExport('json')}
            disabled={downloading === 'json'}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors shadow-2xs"
          >
            <Database className="w-4 h-4 text-amber-600" />
            {downloading === 'json' ? 'Generando...' : 'JSON Dump'}
          </button>
          <button
            type="button"
            onClick={() => triggerExport('sql')}
            disabled={downloading === 'sql'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Database className="w-4 h-4 text-amber-400" />
            {downloading === 'sql' ? 'Generando...' : 'Backup (.sql)'}
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ingresos del Mes</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">${total.toLocaleString('es-MX')} <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <p className="text-xs text-emerald-700 font-bold">▲ +18.4% vs Octubre anterior</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Comisiones Médicas</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">$18,350 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <p className="text-xs text-slate-500">4 doctores • Promedio 7.2%</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Servicios Realizados</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">86 <span className="text-xs font-normal text-slate-500">citas</span></p>
          <p className="text-xs text-slate-500">Completadas en sucursal</p>
        </div>
      </div>

      {/* Gráfico de barras de rentabilidad */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Servicios Más Rentables</h2>
          <span className="text-xs text-slate-500">Distribución de facturación clínica</span>
        </div>
        <div className="space-y-4">
          {services.sort((a, b) => b.income - a.income).map((s) => (
            <div key={s.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">{s.category}</span>
                  <span className="text-[11px] text-slate-500">({s.count} intervenciones)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600">{s.pct}%</span>
                  <span className="text-xs font-bold text-slate-900">${s.income.toLocaleString('es-MX')}</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${s.pct}%`,
                    background: s.pct > 25 ? '#E3A033' : s.pct > 15 ? '#202D4C' : '#94a3b8'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comisiones por Doctor */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm overflow-hidden">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Comisiones y Rendimiento por Doctor</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                {['Doctor', 'Especialidad', 'Servicios', 'Ingresos generados', 'Comisión %', 'Comisión $'].map(h => (
                  <th key={h} className="px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {[
                { name: 'Dra. Sofía Valero',  specialty: 'Integral',     count: 28, income: 54200, rate: 8, commission: 4336 },
                { name: 'Dr. Ramírez López',  specialty: 'Ortodoncia',    count: 22, income: 86400, rate: 6, commission: 5184 },
                { name: 'Dra. Gutiérrez',     specialty: 'Implantología', count: 18, income: 54000, rate: 7, commission: 3780 },
                { name: 'Dr. Cortés',         specialty: 'Endodoncia',    count: 18, income: 28500, rate: 7, commission: 1995 },
              ].map((d) => (
                <tr key={d.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{d.name}</td>
                  <td className="px-5 py-4 text-slate-600">{d.specialty}</td>
                  <td className="px-5 py-4 text-slate-600">{d.count}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">${d.income.toLocaleString('es-MX')}</td>
                  <td className="px-5 py-4 text-amber-700 font-bold">{d.rate}%</td>
                  <td className="px-5 py-4 font-bold text-emerald-700">${d.commission.toLocaleString('es-MX')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
