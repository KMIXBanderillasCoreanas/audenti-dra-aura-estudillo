'use client'

import {
  PhoneCall,
  Truck,
  MessageSquare,
  CheckCircle2,
  CalendarCheck2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react'

export function PriorityTasksCard() {
  const tasks = [
    {
      icon: PhoneCall,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-800',
      type: 'Llamada postoperatoria',
      time: 'Ayer 18:00',
      timeHighlight: false,
      title: 'Carlos Mendoza • Extracción pza 38',
      desc: "Reporte recepcionista: 'Paciente refiere evolución favorable, sin dolor agudo ni hemorragia activa'.",
      action: 'Marcar seguimiento cerrado',
      actionIcon: CheckCircle2,
    },
    {
      icon: Truck,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-800',
      type: 'Laboratorio Dental ProArt',
      time: 'Hoy 14:00 hrs',
      timeHighlight: true,
      title: 'Corona de Zirconio Monolítico (Pza 25)',
      desc: 'Para paciente Mariana Cordero (Cita mañana viernes 09:30). Envío en tránsito confirmado por mensajería.',
      footer: 'Guía: #LAB-9921',
      action: 'Confirmar recepción',
      actionIcon: CheckCircle2,
    },
    {
      icon: MessageSquare,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      type: 'Recordatorio preventivo',
      time: 'Campaña automática',
      timeHighlight: false,
      title: 'Profilaxis semestral pendiente',
      desc: '4 pacientes cumplen 6 meses desde su última limpieza. Mensaje de reactivación vía WhatsApp listo para envío.',
      action: 'Enviar a los 4 pacientes (WhatsApp)',
      actionIcon: ArrowRight,
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Seguimiento &amp; Prioridades</h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              3 activas
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Compromisos de calidad clínica y laboratorio</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
          <CalendarCheck2 className="w-5 h-5" />
        </div>
      </div>

      {/* Tarjetas de Tareas */}
      <div className="space-y-3">
        {tasks.map((task, i) => {
          const Icon = task.icon
          const ActionIcon = task.actionIcon
          return (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-50 transition-all space-y-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span className={`p-1 rounded-md border flex items-center justify-center ${task.iconColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  {task.type}
                </span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  task.timeHighlight
                    ? 'bg-amber-100 text-amber-800 font-bold border border-amber-200'
                    : 'bg-slate-200/60 text-slate-600'
                }`}>
                  <Clock className="w-3 h-3" />
                  {task.time}
                </span>
              </div>

              <div>
                <span className="text-sm font-bold text-slate-900 block leading-snug">{task.title}</span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-white/70 p-2 rounded-lg border border-slate-100">
                  {task.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                {task.footer ? (
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {task.footer}
                  </span>
                ) : <span />}

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-xs transition-colors"
                >
                  <ActionIcon className="w-3.5 h-3.5" />
                  {task.action}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
