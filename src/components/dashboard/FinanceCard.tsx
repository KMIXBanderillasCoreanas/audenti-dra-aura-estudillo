'use client'

import {
  Banknote,
  CreditCard,
  Clock,
  ShoppingBag,
  FileSpreadsheet,
  PlusCircle,
  Wallet
} from 'lucide-react'
import { useBranchStore } from '@/stores/branchStore'

export function FinanceCard() {
  const currentBranch = useBranchStore((state) => state.getCurrentBranch())
  const metrics = currentBranch.dailyMetrics

  // Split income proportionally for realistic display
  const cashPortion = Math.round(metrics.shiftIncomeRaw * 0.3)
  const digitalPortion = metrics.shiftIncomeRaw - cashPortion

  const items = [
    {
      icon: Banknote,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      label: 'Efectivo en gaveta',
      desc: 'Recepción y caja chica',
      amount: `$${cashPortion.toLocaleString('es-MX')}`,
      negative: false,
      highlight: false,
    },
    {
      icon: CreditCard,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100',
      label: 'Pagos Digitales (Terminal / SPEI)',
      desc: 'Cobros procesados',
      amount: `$${digitalPortion.toLocaleString('es-MX')}`,
      negative: false,
      highlight: false,
    },
    {
      icon: Clock,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      label: 'Pendiente por liquidar hoy',
      desc: metrics.pendingPatients,
      amount: metrics.pendingToCollect,
      negative: false,
      highlight: true,
      badge: 'Por cobrar',
    },
    {
      icon: ShoppingBag,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
      label: 'Gastos menores de hoy',
      desc: 'Material descartable e instrumental',
      amount: metrics.minorExpenses,
      negative: true,
      highlight: false,
      badge: 'Egreso',
    },
  ]


  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Cobros &amp; Finanzas</h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Caja abierta
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Desglose de ingresos del día en consultorio</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
          <Wallet className="w-5 h-5" />
        </div>
      </div>

      {/* Lista de transacciones */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                item.highlight
                  ? 'bg-amber-50/40 border-amber-200/80 shadow-xs'
                  : 'bg-slate-50/70 border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        item.negative
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] text-slate-500 truncate">{item.desc}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-sm font-bold block ${
                  item.negative
                    ? 'text-rose-600'
                    : item.highlight
                    ? 'text-amber-800'
                    : 'text-slate-900'
                }`}>
                  {item.amount} <span className="text-[10px] font-normal text-slate-500">MXN</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Acciones */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          Ver corte de caja x turno
        </button>
        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          + Registrar egreso
        </button>
      </div>
    </div>
  )
}
