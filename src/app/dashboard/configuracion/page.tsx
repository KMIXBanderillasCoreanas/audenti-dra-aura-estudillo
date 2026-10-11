'use client'

import { useState } from 'react'
import {
  Settings,
  Building2,
  Users,
  Shield,
  Clock,
  Save,
  CheckCircle2,
  Bell,
  Cpu
} from 'lucide-react'

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false)
  const [clinicName, setClinicName] = useState('DentalCloud Pro — Dirección General Dra. Aura Estudillo')
  const [licenseKey, setLicenseKey] = useState('DCL-PRO-2026-AE01')
  const [autoInactivation, setAutoInactivation] = useState(true)
  const [inactivationMonths, setInactivationMonths] = useState(6)
  const [defaultCommission, setDefaultCommission] = useState(7)
  const [whatsappNotifications, setWhatsappNotifications] = useState(true)
  const [aiModel, setAiModel] = useState('gc/gemini-2.5-flash')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Administración del Sistema
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Configuración de Sucursal &amp; Franquicia</h1>
          <p className="text-xs text-slate-500 mt-0.5">Parámetros operativos de la clínica, reglas automáticas de pacientes y motor AI.</p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Save className="w-4 h-4 text-amber-400" />
          {saved ? '¡Configuración Guardada!' : 'Guardar Cambios'}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parámetros de Franquicia & Sucursal */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Datos de Sucursal (Tenant)</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Nombre Comercial de la Clínica</label>
              <input
                value={clinicName}
                onChange={e => setClinicName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Licencia de Franquicia</label>
              <input
                disabled
                value={licenseKey}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Aislamiento por Row Level Security (RLS) verificado en Supabase.</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Comisión Base Médica (%)</label>
                <input
                  type="number"
                  value={defaultCommission}
                  onChange={e => setDefaultCommission(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Moneda del Sistema</label>
                <input
                  disabled
                  value="MXN (Pesos Mexicanos)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Automatizaciones Clínicas & AI */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Reglas Automáticas &amp; Motor AI</h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* Auto-inactivación */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Auto-Inactivación de Pacientes</span>
                  <span className="text-[11px] text-slate-500">Cambiar estado a 'Inactivo' si no tienen cita en el periodo fijado.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoInactivation}
                  onChange={e => setAutoInactivation(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
              {autoInactivation && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-600">Periodo límite:</span>
                  <select
                    value={inactivationMonths}
                    onChange={e => setInactivationMonths(Number(e.target.value))}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                  >
                    <option value={3}>3 meses</option>
                    <option value={6}>6 meses (Recomendado Odontológico)</option>
                    <option value={12}>12 meses</option>
                  </select>
                </div>
              )}
            </div>

            {/* Modelo 9Router */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Modelo de Inteligencia Artificial (9Router Gateway)
              </label>
              <select
                value={aiModel}
                onChange={e => setAiModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              >
                <option value="gc/gemini-2.5-flash">gc/gemini-2.5-flash (Ultra Rápido • Odontología General)</option>
                <option value="ag/claude-sonnet-4-6">ag/claude-sonnet-4-6 (Razonamiento Clínico Complejo)</option>
                <option value="kr/deepseek-3.2">kr/deepseek-3.2 (Optimización de Presupuestos)</option>
                <option value="openrouter/free">openrouter/free (Plan Básico)</option>
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">Conectado a http://localhost:20128 con la API Key configurada.</span>
            </div>

            {/* WhatsApp Recordatorios */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Notificaciones Automáticas por WhatsApp</span>
                <span className="text-[11px] text-slate-500">Enviar confirmaciones 24 hrs antes de la cita programada.</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappNotifications}
                onChange={e => setWhatsappNotifications(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
