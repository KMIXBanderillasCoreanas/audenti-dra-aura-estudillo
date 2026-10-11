'use client'

import { useState } from 'react'
import {
  UserPlus,
  TrendingUp,
  ThumbsUp,
  RotateCcw,
  UserX,
  Mail,
  Calendar,
  Stethoscope,
  Receipt,
  Activity,
  CheckCircle,
  MessageCircle,
  Clock,
  Sparkles,
  Copy,
  Send,
  Sparkle,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react'

export default function CrmPage() {
  const [copied, setCopied] = useState(false)

  const kpis = [
    { label: 'Nuevos Contactos del Mes', value: '38', delta: '+14%', icon: UserPlus, note: 'Meta mensual: 40', progress: 95 },
    { label: 'Tasa Conversión a Plan',   value: '68.2%', delta: '+3.4 pt', icon: ThumbsUp, note: 'Aceptados: 26 de 38 presupuestos', quality: 'Excelente' },
    { label: 'Pacientes Reactivados',    value: '11', icon: RotateCcw, note: 'Reactivados tras recordatorio semestral' },
    { label: 'Inactivos (>6 meses)',     value: '34', icon: UserX, isError: true, tags: ['22 Sin respuesta', '7 Domicilio', '5 Alta'] },
  ]

  const funnelStages = [
    { n: '01', label: 'Contacto Nuevo',     sub: 'Solicitudes entrantes', count: 24, color: 'text-amber-800 bg-amber-50 border-amber-200', icon: Mail, value: '$48,000 MXN',
      details: [['QR Audenti:', '14'], ['Recomendación:', '6'], ['WhatsApp:', '4']] },
    { n: '02', label: 'Cita de Valoración', sub: 'Agendada en consultorio', count: 18, color: 'text-blue-800 bg-blue-50 border-blue-200', icon: Calendar, value: 'Confirmación al 88%',
      details: [['Próx. 48 hrs:', '11'], ['Esta semana:', '7'], ['Recordatorio auto:', 'Activo']] },
    { n: '03', label: 'Primera Atención',   sub: 'Diagnóstico y escaneo', count: 15, color: 'text-slate-800 bg-slate-50 border-slate-200', icon: Stethoscope, value: 'Atendidos en el período',
      details: [['Odontograma OK:', '15'], ['RX / Tomografía:', '12'], ['Fotografía intraoral:', '14']] },
    { n: '04', label: 'Plan Presentado',    sub: 'En decisión / Cotización', count: 12, color: 'text-amber-900 bg-amber-100/50 border-amber-300', icon: Receipt, value: '$86,400 MXN abiertos',
      details: [['Día 1-5:', '4'], ['Día 6-10:', '5'], ['>10 días (Alerta):', '3']] },
    { n: '05', label: 'Tx en Curso',        sub: 'Tratamientos activos', count: 29, color: 'text-indigo-800 bg-indigo-50 border-indigo-200', icon: Activity, value: 'Asistencia puntual 96%',
      details: [['Ortodoncia:', '14'], ['Implantología:', '9'], ['Rehabilitación:', '6']] },
    { n: '06', label: 'Paciente Fiel',      sub: 'Control preventivo', count: 142, color: 'text-emerald-800 bg-emerald-50 border-emerald-200', icon: CheckCircle, value: 'Salud óptima',
      details: [['Profilaxis al día:', '108'], ['Cita próx. mes:', '23'], ['Programa Familia:', '11']] },
  ]

  const trackingPatients = [
    {
      initials: 'MR', name: 'Mariana Ruíz', age: '34 años • ID #AUD-9821', tag: 'Ortodoncia Alineadores',
      contact: 'Ayer vía WhatsApp', budget: '$24,000 MXN en revisión',
      next: 'Enviar simulación 3D de sonrisa (Hoy)',
      action: { label: 'Contactar WhatsApp', icon: MessageCircle, bg: 'bg-emerald-600 text-white hover:bg-emerald-700' },
    },
    {
      initials: 'RG', name: 'Roberto Garza', age: '45 años • ID #AUD-6419', tag: 'Implante Pza 36',
      contact: 'Hace 3 días', budget: 'Esperando cicatrización ósea (Semana 8)',
      next: 'Agendar cita de torque y toma de impresión corona',
      action: { label: 'Agendar Cita', icon: Calendar, bg: 'bg-slate-900 text-white hover:bg-slate-800' },
    },
    {
      initials: 'SH', name: 'Sofía Hernández', age: '(Mamá de Mateo, 8 años)', tag: 'Odontopediatría',
      contact: 'Hace 1 semana', budget: 'Recordatorio preventivo semestral',
      next: 'Cita sábado matutino propuesta (Pendiente confirmación)',
      action: { label: 'Ver Historial', icon: Stethoscope, bg: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50' },
    },
    {
      initials: 'CM', name: 'Carlos Mendoza', age: '29 años • ID #AUD-3104', tag: 'Post-extracción Molares',
      contact: 'Hoy 09:30 AM (Check-in postoperatorio)', budget: 'Evolución favorable',
      next: 'Confirmar retiro de puntos con asistente clínico',
      action: { label: 'Ficha Clínica', icon: Receipt, bg: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50' },
    },
  ]

  const copyMessage = () => {
    const text = 'Hola Mariana, te compartimos el plan de pagos diferidos para tu tratamiento de alineadores que revisamos en tu última consulta. ¿Te gustaría agendar una llamada de 5 minutos con la Dra. Sofía?'
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
              Módulo CRM & Fidelización
            </span>
            <span className="text-slate-500 text-xs">• Sincronizado en tiempo real</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            CRM Dental &amp; Fidelización de Pacientes
          </h1>
          <p className="text-xs text-slate-500 max-w-3xl mt-0.5">
            Gestión del ciclo de vida del paciente, recordatorios de prevención semestral y seguimiento activo de presupuestos.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          + Nuevo Contacto / Paciente
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{k.label}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${k.isError ? 'text-rose-600' : 'text-amber-600'}`} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className={`text-3xl font-bold tracking-tight ${k.isError ? 'text-rose-600' : 'text-slate-900'}`}>
                  {k.value}
                </span>
                {k.delta && (
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    {k.delta}
                  </span>
                )}
              </div>
              <div className="mt-2.5">
                {k.progress && (
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">{k.note}</span>
                      <span className="font-bold text-slate-900">{k.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${k.progress}%` }} />
                    </div>
                  </div>
                )}
                {k.quality && <p className="text-xs font-bold text-amber-700">{k.quality}</p>}
                {k.note && !k.progress && !k.quality && (
                  <p className="text-[11px] text-slate-500">{k.note}</p>
                )}
                {k.tags && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {k.tags.map(t => (
                      <span key={t} className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] text-slate-600">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Embudo de Conversión (Funnel) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Embudo Integral de Conversión &amp; Atención</h2>
          <p className="text-xs text-slate-500">Monitoreo dinámico del ciclo clínico desde el primer contacto hasta el régimen preventivo regular.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-1">
          {funnelStages.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.n} className="bg-slate-50/80 border border-slate-200/70 p-4 rounded-xl flex flex-col justify-between hover:bg-slate-50 transition-all cursor-pointer group shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500">ETAPA {s.n}</span>
                    <Icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{s.label}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.sub}</p>
                  <div className="mt-2.5 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900">{s.count}</span>
                    <span className="text-[10px] text-slate-500">pacientes</span>
                  </div>
                  <div className="mt-1 text-[11px] font-bold text-slate-700">{s.value}</div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
                  {s.details.map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className="font-bold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tablero de Seguimiento + Panel de Audenti Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tablero de Pacientes */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Tablero de Seguimiento Activo</h2>
              <p className="text-xs text-slate-500">Acciones programadas para pacientes en seguimiento crítico y presupuestos abiertos.</p>
            </div>
          </div>

          <div className="space-y-3">
            {trackingPatients.map((p) => {
              const ActionIcon = p.action.icon
              return (
                <div key={p.name} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      {p.initials}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                        <span className="text-[11px] text-slate-500">{p.age}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">{p.tag}</span>
                      </div>
                      <p className="text-xs text-slate-600">Último contacto: {p.contact}</p>
                      <p className="text-xs font-semibold text-slate-900">{p.budget}</p>
                      <div className="flex items-center gap-1.5 text-xs pt-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-white font-bold text-amber-700 border border-amber-200 text-[10px]">Próxima acción:</span>
                        <span className="text-slate-700 text-xs">{p.next}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs shrink-0 ${p.action.bg}`}
                  >
                    <ActionIcon className="w-3.5 h-3.5" />
                    {p.action.label}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Panel Audenti Intelligence (Conectado a 9Router) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider text-amber-700 uppercase">Motor 9Router Activo</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Audenti Intelligence</h3>
              <p className="text-xs text-slate-500">Asistente de Retención y Copiloto Dental</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-100/60 text-slate-900 border border-amber-200">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>Soporte decisional clínico. Toda sugerencia requiere aprobación médica antes del envío.</span>
          </div>

          {/* Borrador Generado por IA */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900">Para: Mariana Ruíz (Alineadores)</span>
              <span className="text-slate-500">Canal: WhatsApp</span>
            </div>
            <p className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs italic text-slate-700 leading-relaxed shadow-2xs">
              “Hola Mariana, esperamos que estés excelente. Te comparto el esquema de pagos diferidos para tu tratamiento de alineadores que revisamos en tu última consulta. ¿Te gustaría agendar una llamada de 5 minutos con la Dra. Sofía?”
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={copyMessage}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? '¡Copiado al portapapeles!' : 'Copiar Texto'}
              </button>
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar con Aprobación Médica
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
