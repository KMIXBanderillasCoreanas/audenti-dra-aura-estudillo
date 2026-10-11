'use client'

import { useState } from 'react'
import {
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  CreditCard,
  Banknote,
  Receipt,
  Download,
  Plus
} from 'lucide-react'

export default function FinanzasPage() {
  const transactions = [
    { id: 'TRX-101', date: 'Hoy 09:45', patient: 'Laura Patricia Vega', desc: 'Profilaxis Profunda', type: 'income', amount: 1200, method: 'Terminal BBVA', doctor: 'Dra. Sofía Valero' },
    { id: 'TRX-102', date: 'Hoy 10:30', patient: 'Gasto Clínica', desc: 'Campos quirúrgicos estériles & Guantes nitrilo', type: 'expense', amount: 420, method: 'Caja Chica', doctor: 'Recepción' },
    { id: 'TRX-103', date: 'Ayer 17:15', patient: 'Mateo Morales Ruiz', desc: 'Anticipo Biopulpectomía Pza 16', type: 'income', amount: 1900, method: 'Transferencia SPEI', doctor: 'Dr. Cortés' },
    { id: 'TRX-104', date: 'Ayer 12:00', patient: 'Daniela Montes', desc: 'Mensualidad Ortodoncia', type: 'income', amount: 1500, method: 'Efectivo', doctor: 'Dr. Ramírez López' },
    { id: 'TRX-105', date: '08/Oct 16:30', patient: 'Mariana Cordero', desc: 'Liquidación Corona Zirconio', type: 'income', amount: 7000, method: 'Terminal Santander', doctor: 'Dra. Sofía Valero' },
    { id: 'TRX-106', date: '08/Oct 11:20', patient: 'Pago Laboratorio', desc: 'Laboratorio Dental ProArt (Guía #9921)', type: 'expense', amount: 2100, method: 'SPEI', doctor: 'Administración' },
  ]

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Caja &amp; Tesorería
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Módulo Financiero &amp; Arqueo de Caja</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control de ingresos, cobros por terminal, transferencias y egresos de consultorio.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/export?format=excel"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-200 shadow-2xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Exportar Excel
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            + Registrar Transacción
          </button>
        </div>
      </div>

      {/* Tarjetas de Resumen Financiero */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ingresos Totales (Mes)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">$257,900 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <span className="text-xs text-emerald-700 font-bold">▲ +18.4% vs mes anterior</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Egresos / Gastos</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">$48,250 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <span className="text-xs text-slate-500 font-medium">Insumos y laboratorio</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Comisiones Médicas</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900">$18,350 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <span className="text-xs text-slate-500 font-medium">4 doctores en red</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Utilidad Operativa</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight text-amber-900">$191,300 <span className="text-xs font-normal text-slate-500">MXN</span></p>
          <span className="text-xs text-amber-800 font-bold">Margen neto: 74.2%</span>
        </div>
      </div>

      {/* Historial de Transacciones */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Movimientos de Caja Recientes</h2>
          <span className="text-xs text-slate-500">Mostrando últimas transacciones sincronizadas con RLS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Folio / Fecha</th>
                <th className="px-6 py-3.5">Concepto / Paciente</th>
                <th className="px-6 py-3.5">Método</th>
                <th className="px-6 py-3.5">Responsable</th>
                <th className="px-6 py-3.5 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 block">{tx.id}</span>
                    <span className="text-[11px] text-slate-400">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900 block">{tx.desc}</span>
                    <span className="text-[11px] text-slate-500">{tx.patient}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{tx.doctor}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('es-MX')} MXN
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
